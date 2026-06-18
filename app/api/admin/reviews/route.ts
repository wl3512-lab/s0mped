import { NextRequest, NextResponse } from "next/server";
import { isAuthed } from "@/lib/adminAuth";
import { getAdminClient } from "@/lib/supabaseAdmin";

// List all reviews (pending first), for moderation.
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const sb = getAdminClient();
  if (!sb) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const { data, error } = await sb
    .from("reviews")
    .select("id, body, tag, status, created_at")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ reviews: data });
}

// Update a review's status (approve / reject / unpublish).
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, status } = await req.json().catch(() => ({}));
  if (typeof id !== "string" || !["approved", "pending", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const sb = getAdminClient();
  if (!sb) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const { error } = await sb.from("reviews").update({ status }).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

// Permanently delete a review.
export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json().catch(() => ({}));
  if (typeof id !== "string") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const sb = getAdminClient();
  if (!sb) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const { error } = await sb.from("reviews").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
