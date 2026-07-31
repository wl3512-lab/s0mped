import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabaseAdmin";

// Supabase pauses free-tier projects after ~7 days with no API traffic. A
// paused project takes the reviews section down silently (it falls back to the
// seed testimonials), so a daily read keeps the project marked active.
// Scheduled from vercel.json → runs on production deployments only.

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Vercel Cron sends `Authorization: Bearer $CRON_SECRET` when CRON_SECRET is
  // set. Enforce it when configured so the endpoint isn't publicly pollable.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sb = getAdminClient();
  if (!sb) {
    // Misconfiguration, not an outage — surface it loudly in the cron logs.
    return NextResponse.json(
      { ok: false, error: "Supabase not configured (missing URL or SUPABASE_SECRET_KEY)" },
      { status: 500 },
    );
  }

  // Cheapest possible query that still hits Postgres through PostgREST.
  const started = Date.now();
  const { count, error } = await sb
    .from("reviews")
    .select("id", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message, ms: Date.now() - started },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    reviews: count ?? 0,
    ms: Date.now() - started,
    at: new Date().toISOString(),
  });
}
