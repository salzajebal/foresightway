import { createHmac, timingSafeEqual } from "node:crypto";

export const COOKIE_NAME = "foresight_admin";
const TOKEN_VALUE = "foresight-admin";

export function signature() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET must be configured");
  return createHmac("sha256", secret).update(TOKEN_VALUE).digest("hex");
}

export function isAdmin(cookieHeader?: string) {
  const token = cookieHeader
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1);
  if (!token) return false;
  const expected = signature();
  if (token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}