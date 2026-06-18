import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// SERVER-ONLY. Uses the Supabase secret key, which bypasses RLS so we can
// read pending reviews and change their status. Never import this from a
// client component — the secret key must never reach the browser.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;

let admin: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient | null {
  if (!url || !secret) return null;
  if (!admin) {
    admin = createClient(url, secret, { auth: { persistSession: false } });
  }
  return admin;
}
