import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, performanceBondsTable } from "@workspace/db";
import {
  GetPerformanceBondsResponse,
  UpdateAdminPerformanceBondsBody,
  UpdateAdminPerformanceBondsResponse,
} from "@workspace/api-zod";
import { isAdmin } from "../lib/admin-auth";

const router: IRouter = Router();
const SINGLETON_ID = 1;

const DEFAULT_HOLDINGS = [
  { bondName: "3년국채 F 202609", duration: 2.7751, weight: 100.00 },
  { bondName: "전자단기사채(한양증권 20260427-91-14(단))", duration: 0.0712, weight: 9.46 },
  { bondName: "CP(비엔케이투자증권 20251216-364-17)", duration: 0.4575, weight: 6.21 },
  { bondName: "CP(비엔케이투자증권 20251216-364-17)", duration: 0.457, weight: 6.21 },
  { bondName: "CP(비엔케이투자증권 20251216-364-17)", duration: 0.46, weight: 6.21 },
  { bondName: "CP(비엔케이투자증권 20251216-364-17)", duration: 0.4575, weight: 6.21 },
  { bondName: "CP(비엔케이투자증권 20251216-364-17)", duration: 0, weight: 6.21 },
  { bondName: "신한카드2207-3", duration: 1.5019, weight: 5.08 },
  { bondName: "케이비캐피탈580-3", duration: 1.6888, weight: 5.07 },
  { bondName: "하나캐피탈477-1", duration: 1.6816, weight: 5.07 },
] as const;

function hasSensibleValues(data: { holdings: Array<{ bondName: string; duration: number; weight: number }> }) {
  return data.holdings.length === 10 && data.holdings.every((item) => (
    item.bondName.trim().length > 0
    && Number.isFinite(item.duration)
    && item.duration >= 0
    && Number.isFinite(item.weight)
    && item.weight >= 0
  ));
}

async function upsertPerformance(
  holdings: Array<{ bondName: string; duration: number; weight: number }>,
  updatedAt = new Date(),
) {
  const [row] = await db
    .insert(performanceBondsTable)
    .values({ id: SINGLETON_ID, holdings, updatedAt })
    .onConflictDoUpdate({
      target: performanceBondsTable.id,
      set: { holdings, updatedAt },
    })
    .returning();
  return row;
}

router.get("/performance-bonds", async (req, res): Promise<void> => {
  const [row] = await db
    .select()
    .from(performanceBondsTable)
    .where(eq(performanceBondsTable.id, SINGLETON_ID));

  if (!row) {
    req.log.info("Initializing default bond holdings dataset");
    const created = await upsertPerformance([...DEFAULT_HOLDINGS]);
    res.json(GetPerformanceBondsResponse.parse({
      holdings: created.holdings,
      updatedAt: created.updatedAt,
    }));
    return;
  }

  const data = UpdateAdminPerformanceBondsBody.parse({ holdings: row.holdings });
  if (!hasSensibleValues(data)) {
    req.log.error("Stored bond holdings dataset failed validation");
    res.status(500).json({ error: "저장된 채권 보유 데이터가 올바르지 않습니다." });
    return;
  }
  res.json(GetPerformanceBondsResponse.parse({ ...data, updatedAt: row.updatedAt }));
});

router.put("/admin/performance-bonds", async (req, res): Promise<void> => {
  if (!isAdmin(req.headers.cookie)) {
    res.status(401).json({ error: "관리자 로그인이 필요합니다." });
    return;
  }

  const parsed = UpdateAdminPerformanceBondsBody.safeParse(req.body);
  if (!parsed.success || !hasSensibleValues(parsed.data)) {
    req.log.warn({ errors: parsed.success ? undefined : parsed.error.message }, "Invalid bond holdings data");
    res.status(400).json({ error: "채권 보유 데이터를 다시 확인해 주세요." });
    return;
  }

  const row = await upsertPerformance(parsed.data.holdings, new Date());
  res.json(UpdateAdminPerformanceBondsResponse.parse({
    holdings: row.holdings,
    updatedAt: row.updatedAt,
  }));
});

export default router;