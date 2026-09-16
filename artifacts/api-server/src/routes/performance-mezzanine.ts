import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, performanceMezzanineTable } from "@workspace/db";
import {
  GetPerformanceMezzanineResponse,
  UpdateAdminPerformanceMezzanineBody,
  UpdateAdminPerformanceMezzanineResponse,
} from "@workspace/api-zod";
import { isAdmin } from "../lib/admin-auth";

const router: IRouter = Router();
const SINGLETON_ID = 1;

type MezzanineHolding = {
  company: string;
  type: string;
  investmentPeriod: string;
  exitPeriod: string;
  returnRate: string;
};

const DEFAULT_HOLDINGS = [
  { company: "제이에스글로벌", type: "사모BW", investmentPeriod: "2021.01", exitPeriod: "2023.08", returnRate: "18%" },
  { company: "티로보틱스", type: "사모CB", investmentPeriod: "2022.11", exitPeriod: "2024.11", returnRate: "152%" },
  { company: "SK리츠", type: "사모CB", investmentPeriod: "2022.12", exitPeriod: "2025.03", returnRate: "21%" },
  { company: "오브젠", type: "사모CB", investmentPeriod: "2024.11", exitPeriod: "보유중", returnRate: "보유중" },
  { company: "다스코", type: "사모BW", investmentPeriod: "2024.12", exitPeriod: "보유중", returnRate: "보유중" },
] as const;

function hasSensibleValues(data: { holdings: MezzanineHolding[] }) {
  return data.holdings.length === 5 && data.holdings.every((item) => (
    item.company.trim().length > 0
    && item.type.trim().length > 0
    && item.investmentPeriod.trim().length > 0
    && item.exitPeriod.trim().length > 0
    && item.returnRate.trim().length > 0
  ));
}

async function upsertPerformance(holdings: MezzanineHolding[], updatedAt = new Date()) {
  const [row] = await db
    .insert(performanceMezzanineTable)
    .values({ id: SINGLETON_ID, holdings, updatedAt })
    .onConflictDoUpdate({
      target: performanceMezzanineTable.id,
      set: { holdings, updatedAt },
    })
    .returning();
  return row;
}

router.get("/performance-mezzanine", async (req, res): Promise<void> => {
  const [row] = await db
    .select()
    .from(performanceMezzanineTable)
    .where(eq(performanceMezzanineTable.id, SINGLETON_ID));

  if (!row) {
    req.log.info("Initializing default mezzanine performance dataset");
    const created = await upsertPerformance([...DEFAULT_HOLDINGS]);
    res.json(GetPerformanceMezzanineResponse.parse({
      holdings: created.holdings,
      updatedAt: created.updatedAt,
    }));
    return;
  }

  const data = UpdateAdminPerformanceMezzanineBody.parse({ holdings: row.holdings });
  if (!hasSensibleValues(data)) {
    req.log.error("Stored mezzanine performance dataset failed validation");
    res.status(500).json({ error: "저장된 메자닌 성과 데이터가 올바르지 않습니다." });
    return;
  }
  res.json(GetPerformanceMezzanineResponse.parse({ ...data, updatedAt: row.updatedAt }));
});

router.put("/admin/performance-mezzanine", async (req, res): Promise<void> => {
  if (!isAdmin(req.headers.cookie)) {
    res.status(401).json({ error: "관리자 로그인이 필요합니다." });
    return;
  }

  const parsed = UpdateAdminPerformanceMezzanineBody.safeParse(req.body);
  if (!parsed.success || !hasSensibleValues(parsed.data)) {
    req.log.warn({ errors: parsed.success ? undefined : parsed.error.message }, "Invalid mezzanine performance data");
    res.status(400).json({ error: "메자닌 성과 데이터를 다시 확인해 주세요." });
    return;
  }

  const row = await upsertPerformance(parsed.data.holdings, new Date());
  res.json(UpdateAdminPerformanceMezzanineResponse.parse({
    holdings: row.holdings,
    updatedAt: row.updatedAt,
  }));
});

export default router;