"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

/**
 * Browser-side Supabase client, scoped by RLS to anonymous chat access
 * only (see supabase/schema.sql). Safe to use the public anon key here.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  if (!browserClient) {
    browserClient = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
  }
  return browserClient;
}

/**
 * Ensures the visitor has an anonymous Supabase auth identity (persisted
 * in localStorage across reloads), which RLS uses to scope them to their
 * own conversation. Returns the user id, or null if Supabase isn't
 * configured or the anonymous sign-in fails.
 */
export async function ensureVisitorSession(): Promise<string | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data: existing } = await supabase.auth.getSession();
  if (existing.session?.user?.id) return existing.session.user.id;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error || !data.session) {
    console.error("Anonymous sign-in failed:", error?.message);
    return null;
  }
  return data.session.user.id;
}
