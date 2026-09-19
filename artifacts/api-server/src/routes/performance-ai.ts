import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import {
  db,
  performanceAiTable,
  type PerformanceAiMonth,
  type PerformanceAiTrade,
} from "@workspace/db";
import {
  GetPerformanceAiResponse,
  UpdateAdminPerformanceAiBody,
  UpdateAdminPerformanceAiResponse,
} from "@workspace/api-zod";
import { isAdmin } from "../lib/admin-auth";

const router: IRouter = Router();
const SINGLETON_ID = 1;

type PerformanceAiDataset = {
  months: PerformanceAiMonth[];
  recentTrades: PerformanceAiTrade[];
  annualAverageReturn: number;
  annualAverageStockCount: number;
  annualWinRate: number;
};

const DEFAULT_PERFORMANCE: PerformanceAiDataset = {
  months: [
    { month: "25.10", return: 11.8, cumulativeReturn: 236 },
    { month: "25.11", return: -6.3 },
    { month: "25.12", return: 1.3 },
    { month: "26.01", return: 29.4 },
    { month: "26.02", return: 13.2 },
    { month: "26.03", return: -14.8 },
    { month: "26.04", return: 19.9 },
    { month: "26.05", return: 10.2 },
    { month: "26.06", return: -9.2 },
    { month: "26.07", return: -11.3 },
    { month: "26.08", return: 3.9 },
    { month: "26.09", return: -1.8 },
  ],
  recentTrades: [
    { stockName: "코스메카코리아", tradeDetail: "오늘 매도 · 4일 보유", return: -3.8 },
    { stockName: "한텍코리아", tradeDetail: "오늘 매도 · 30일 보유", return: 15.7 },
    { stockName: "풍산", tradeDetail: "오늘 매도 · 38일 보유", return: 8.4 },
    { stockName: "삼성SDI", tradeDetail: "4일 매도 · 3일 보유", return: -6.6 },
    { stockName: "대한항공", tradeDetail: "5일 매도 · 2일 보유", return: 2.8 },
  ],
  annualAverageReturn: 32.8,
  annualAverageStockCount: 204,
  annualWinRate: 93,
};

function normalizePerformance(data: PerformanceAiDataset): PerformanceAiDataset {
  const hasCumulativeReturn = data.months.some((item) => item.cumulativeReturn !== undefined);
  if (hasCumulativeReturn) return data;

  return {
    ...data,
    months: data.months.map((item, index) => (
      index === 0 ? { ...item, cumulativeReturn: 236 } : item
    )),
  };
}

function responseData(data: PerformanceAiDataset, updatedAt: Date) {
  return {
    ...UpdateAdminPerformanceAiBody.parse(normalizePerformance(data)),
    updatedAt,
  };
}

function hasSensibleValues(data: PerformanceAiDataset) {
  return data.months.length === 12
    && data.months.every((item) => (
      item.month.trim().length > 0
      && Number.isFinite(item.return)
      && (item.cumulativeReturn === undefined || Number.isFinite(item.cumulativeReturn))
    ))
    && data.recentTrades.length === 5
    && data.recentTrades.every((item) => (
      item.stockName.trim().length > 0
      && item.tradeDetail.trim().length > 0
      && Number.isFinite(item.return)
    ))
    && Number.isFinite(data.annualAverageReturn)
    && Number.isInteger(data.annualAverageStockCount)
    && data.annualAverageStockCount > 0
    && Number.isFinite(data.annualWinRate);
}

async function upsertPerformance(data: PerformanceAiDataset, updatedAt = new Date()) {
  const [row] = await db
    .insert(performanceAiTable)
    .values({
      id: SINGLETON_ID,
      ...data,
      updatedAt,
    })
    .onConflictDoUpdate({
      target: performanceAiTable.id,
      set: {
        months: data.months,
        recentTrades: data.recentTrades,
        annualAverageReturn: data.annualAverageReturn,
        annualAverageStockCount: data.annualAverageStockCount,
        annualWinRate: data.annualWinRate,
        updatedAt,
      },
    })
    .returning();
  return row;
}

router.get("/performance-ai", async (req, res): Promise<void> => {
  const [row] = await db
    .select()
    .from(performanceAiTable)
    .where(eq(performanceAiTable.id, SINGLETON_ID));

  if (!row) {
    req.log.info("Initializing default AI performance dataset");
    const created = await upsertPerformance(DEFAULT_PERFORMANCE);
    res.json(GetPerformanceAiResponse.parse(responseData(DEFAULT_PERFORMANCE, created.updatedAt)));
    return;
  }

  const data = normalizePerformance(UpdateAdminPerformanceAiBody.parse({
    months: row.months,
    recentTrades: row.recentTrades,
    annualAverageReturn: row.annualAverageReturn,
    annualAverageStockCount: row.annualAverageStockCount,
    annualWinRate: row.annualWinRate,
  }));
  if (!hasSensibleValues(data)) {
    req.log.error("Stored AI performance dataset failed validation");
    res.status(500).json({ error: "저장된 성과 데이터가 올바르지 않습니다." });
    return;
  }
  res.json(GetPerformanceAiResponse.parse({ ...data, updatedAt: row.updatedAt }));
});

router.put("/admin/performance-ai", async (req, res): Promise<void> => {
  if (!isAdmin(req.headers.cookie)) {
    res.status(401).json({ error: "관리자 로그인이 필요합니다." });
    return;
  }

  const parsed = UpdateAdminPerformanceAiBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid AI performance data");
    res.status(400).json({ error: "성과 데이터를 다시 확인해 주세요." });
    return;
  }
  if (!hasSensibleValues(parsed.data)) {
    req.log.warn("AI performance data failed numeric validation");
    res.status(400).json({ error: "성과 데이터를 다시 확인해 주세요." });
    return;
  }

  const updatedAt = new Date();
  const row = await upsertPerformance(parsed.data, updatedAt);
  res.json(
    UpdateAdminPerformanceAiResponse.parse({
      months: row.months,
      recentTrades: row.recentTrades,
      annualAverageReturn: row.annualAverageReturn,
      annualAverageStockCount: row.annualAverageStockCount,
      annualWinRate: row.annualWinRate,
      updatedAt: row.updatedAt,
    }),
  );
});

export default router;