import { randomUUID } from "node:crypto";
import { mkdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { raw, Router, type IRouter } from "express";
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
  imageUrl?: string;
};

const IMAGE_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;
const IPO_IMAGE_DIR = process.env["IPO_IMAGE_DIR"]
  ?? path.resolve(process.cwd(), "data", "ipo-images");

function detectImageExtension(buffer: Buffer): "jpg" | "png" | "webp" | null {
  const isPng = buffer.length >= 33
    && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    && buffer.subarray(12, 16).toString("ascii") === "IHDR"
    && buffer.readUInt32BE(16) > 0
    && buffer.readUInt32BE(20) > 0
    && buffer.subarray(buffer.length - 8).equals(Buffer.from([0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]));
  if (isPng) return "png";

  const isJpeg = buffer.length >= 16
    && buffer[0] === 0xff
    && buffer[1] === 0xd8
    && buffer[2] === 0xff
    && buffer[buffer.length - 2] === 0xff
    && buffer[buffer.length - 1] === 0xd9;
  if (isJpeg) return "jpg";

  const webpChunk = buffer.subarray(12, 16).toString("ascii");
  const isWebp = buffer.length >= 30
    && buffer.subarray(0, 4).toString("ascii") === "RIFF"
    && buffer.subarray(8, 12).toString("ascii") === "WEBP"
    && ["VP8 ", "VP8L", "VP8X"].includes(webpChunk)
    && buffer.readUInt32LE(4) + 8 === buffer.length;
  return isWebp ? "webp" : null;
}

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
    && (item.imageUrl === undefined
      || /^\/api\/ipo-images\/[a-f0-9-]+\.(jpg|png|webp)$/.test(item.imageUrl))
  ));
}

router.get("/ipo-images/:filename", async (req, res): Promise<void> => {
  const filename = req.params["filename"];
  if (!filename || !/^[a-f0-9-]+\.(jpg|png|webp)$/.test(filename)) {
    res.setHeader("Cache-Control", "no-store");
    res.status(404).end();
    return;
  }

  try {
    const imagePath = path.join(IPO_IMAGE_DIR, filename);
    const imageStat = await stat(imagePath);
    if (!imageStat.isFile()) throw new Error("Not a file");
  } catch {
    res.setHeader("Cache-Control", "no-store");
    res.status(404).end();
    return;
  }

  res.sendFile(filename, {
    root: IPO_IMAGE_DIR,
    maxAge: "1y",
    immutable: true,
  });
});

router.post(
  "/admin/ipo-images",
  (req, res, next) => {
    if (!isAdmin(req.headers.cookie)) {
      res.status(401).json({ error: "관리자 로그인이 필요합니다." });
      return;
    }
    next();
  },
  raw({ type: ["image/jpeg", "image/png", "image/webp"], limit: "5mb" }),
  async (req, res): Promise<void> => {
    const declaredExtension = IMAGE_TYPES[req.headers["content-type"] as keyof typeof IMAGE_TYPES];
    const detectedExtension = Buffer.isBuffer(req.body) ? detectImageExtension(req.body) : null;
    if (!declaredExtension || !detectedExtension || declaredExtension !== detectedExtension) {
      req.log.warn("Rejected invalid or mismatched IPO image upload");
      res.status(400).json({ error: "JPG, PNG 또는 WebP 이미지를 선택해 주세요." });
      return;
    }

    await mkdir(IPO_IMAGE_DIR, { recursive: true });
    const filename = `${randomUUID()}.${detectedExtension}`;
    const finalPath = path.join(IPO_IMAGE_DIR, filename);
    const temporaryPath = `${finalPath}.uploading`;
    try {
      await writeFile(temporaryPath, req.body, { flag: "wx" });
      await rename(temporaryPath, finalPath);
    } catch (error) {
      await unlink(temporaryPath).catch(() => undefined);
      req.log.error({ error }, "Failed to persist IPO image");
      res.status(500).json({ error: "이미지를 안전하게 저장하지 못했습니다. 다시 시도해 주세요." });
      return;
    }
    res.status(201).json({ imageUrl: `/api/ipo-images/${filename}` });
  },
);

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