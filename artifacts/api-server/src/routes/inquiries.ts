import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, inquiriesTable } from "@workspace/db";
import {
  AdminLoginBody,
  AdminLoginResponse,
  AdminLogoutResponse,
  CreateInquiryBody,
  CreateInquiryResponse,
  ListAdminInquiriesResponse,
} from "@workspace/api-zod";
import { COOKIE_NAME, isAdmin, signature } from "../lib/admin-auth";

const router: IRouter = Router();

router.post("/inquiries", async (req, res): Promise<void> => {
  const parsed = CreateInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "입력 내용을 다시 확인해 주세요." });
    return;
  }
  const [inquiry] = await db.insert(inquiriesTable).values(parsed.data).returning();
  res.status(201).json(CreateInquiryResponse.parse(inquiry));
});

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!parsed.success || !adminPassword || parsed.data.password !== adminPassword) {
    res.status(401).json({ error: "비밀번호가 올바르지 않습니다." });
    return;
  }
  res.cookie(COOKIE_NAME, signature(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 12 * 60 * 60 * 1000,
    path: "/",
  });
  res.json(AdminLoginResponse.parse({ authenticated: true }));
});

router.post("/admin/logout", (_req, res): void => {
  res.clearCookie(COOKIE_NAME, { path: "/" });
  res.json(AdminLogoutResponse.parse({ authenticated: false }));
});

router.get("/admin/session", (req, res): void => {
  res.json({ authenticated: isAdmin(req.headers.cookie) });
});

router.get("/admin/inquiries", async (req, res): Promise<void> => {
  if (!isAdmin(req.headers.cookie)) {
    res.status(401).json({ error: "관리자 로그인이 필요합니다." });
    return;
  }
  const inquiries = await db.select().from(inquiriesTable).orderBy(desc(inquiriesTable.createdAt));
  res.json(ListAdminInquiriesResponse.parse(inquiries));
});

export default router;