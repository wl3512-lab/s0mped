import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public env vars — safe to expose. Row-level security on the `reviews`
// table is what actually protects writes/reads (see supabase/migrations).
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client, or `null` when the env vars are not
 * set. Callers fall back to seed data so the UI never breaks pre-config.
 */
export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export type ReviewRow = {
  id: string;
  body: string;
  tag: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};
