import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, passwordMatches } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
  }
  const { password } = await req.json().catch(() => ({ password: undefined }));
  if (!passwordMatches(password)) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
