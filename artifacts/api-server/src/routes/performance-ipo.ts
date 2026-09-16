import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, performanceIpoTable } from "@workspace/db";
import {
  GetPerformanceIpoResponse,
  UpdateAdminPerformanceIpoBody,
  UpdateAdminPerformanceIpoResponse,
} from "@workspace/api-zod";
import { isAdmin } from "../lib/admin-auth";

const router: IRouter = Router();
const SINGLETON_ID = 1;

type IpoInvestment = {
  stockName: string;
  purchasePrice: string;
  purchasePeriod: string;
  listingDate: string;
  return: number;
};

const DEFAULT_INVESTMENTS = [
  { stockName: "퓨런티어", purchasePrice: "7,000원", purchasePeriod: "2021년 11월", listingDate: "2022년 2월 23일", return: 256.8 },
  { stockName: "가온칩스", purchasePrice: "7,000원", purchasePeriod: "2022년 2월", listingDate: "2022년 5월", return: 228.3 },
  { stockName: "오픈엣지테크놀로지", purchasePrice: "3,000원", purchasePeriod: "2022년 6월", listingDate: "2022년 9월", return: 260.3 },
  { stockName: "미래반도체", purchasePrice: "3,000원", purchasePeriod: "2022년 10월", listingDate: "2023년 1월", return: 299.7 },
  { stockName: "필에너지", purchasePrice: "20,000원", purchasePeriod: "2023년 4월", listingDate: "2023년 7월", return: 399.7 },
  { stockName: "DS단석", purchasePrice: "70,000원", purchasePeriod: "2023년 9월", listingDate: "2023년 12월", return: 471.1 },
  { stockName: "이닉스", purchasePrice: "8,000원", purchasePeriod: "2023년 11월", listingDate: "2024년 2월", return: 274.7 },
  { stockName: "라메디텍", purchasePrice: "8,000원", purchasePeriod: "2024년 3월", listingDate: "2024년 6월", return: 374.7 },
  { stockName: "아이언디바이스", purchasePrice: "4,000원", purchasePeriod: "2024년 6월", listingDate: "2024년 9월", return: 224.7 },
  { stockName: "아이에스티이", purchasePrice: "8,000원", purchasePeriod: "2024년 11월", listingDate: "2025년 2월", return: 209.7 },
  { stockName: "도우인시스", purchasePrice: "12,000원", purchasePeriod: "2025년 4월", listingDate: "2025년 7월", return: 316.4 },
  { stockName: "세나테크놀로지", purchasePrice: "18,000원", purchasePeriod: "2025년 6월", listingDate: "2025년 9월", return: 483.3 },
  { stockName: "리브스메드", purchasePrice: "6,000원", purchasePeriod: "2025년 12월", listingDate: "2026년 3월", return: 533.3 },
] as const;

function hasSensibleValues(data: { investments: IpoInvestment[] }) {
  return data.investments.length === 13 && data.investments.every((item) => (
    item.stockName.trim().length > 0
    && item.purchasePrice.trim().length > 0
    && item.purchasePeriod.trim().length > 0
    && item.listingDate.trim().length > 0
    && Number.isFinite(item.return)
  ));
}

async function upsertPerformance(investments: IpoInvestment[], updatedAt = new Date()) {
  const [row] = await db
    .insert(performanceIpoTable)
    .values({ id: SINGLETON_ID, investments, updatedAt })
    .onConflictDoUpdate({
      target: performanceIpoTable.id,
      set: { investments, updatedAt },
    })
    .returning();
  return row;
}

router.get("/performance-ipo", async (req, res): Promise<void> => {
  const [row] = await db
    .select()
    .from(performanceIpoTable)
    .where(eq(performanceIpoTable.id, SINGLETON_ID));

  if (!row) {
    req.log.info("Initializing default IPO performance dataset");
    const created = await upsertPerformance([...DEFAULT_INVESTMENTS]);
    res.json(GetPerformanceIpoResponse.parse({
      investments: created.investments,
      updatedAt: created.updatedAt,
    }));
    return;
  }

  const data = UpdateAdminPerformanceIpoBody.parse({ investments: row.investments });
  if (!hasSensibleValues(data)) {
    req.log.error("Stored IPO performance dataset failed validation");
    res.status(500).json({ error: "저장된 IPO 성과 데이터가 올바르지 않습니다." });
    return;
  }
  res.json(GetPerformanceIpoResponse.parse({ ...data, updatedAt: row.updatedAt }));
});

router.put("/admin/performance-ipo", async (req, res): Promise<void> => {
  if (!isAdmin(req.headers.cookie)) {
    res.status(401).json({ error: "관리자 로그인이 필요합니다." });
    return;
  }

  const parsed = UpdateAdminPerformanceIpoBody.safeParse(req.body);
  if (!parsed.success || !hasSensibleValues(parsed.data)) {
    req.log.warn({ errors: parsed.success ? undefined : parsed.error.message }, "Invalid IPO performance data");
    res.status(400).json({ error: "IPO 성과 데이터를 다시 확인해 주세요." });
    return;
  }

  const row = await upsertPerformance(parsed.data.investments, new Date());
  res.json(UpdateAdminPerformanceIpoResponse.parse({
    investments: row.investments,
    updatedAt: row.updatedAt,
  }));
});

export default router;