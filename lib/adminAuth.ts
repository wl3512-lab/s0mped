import { timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "admin_auth";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** True when the request carries a valid admin session cookie. */
export function isAuthed(req: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!expected || !token) return false;
  return safeEqual(token, expected);
}

/** True when the supplied password matches the configured admin password. */
export function passwordMatches(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof password !== "string") return false;
  return safeEqual(password, expected);
}
