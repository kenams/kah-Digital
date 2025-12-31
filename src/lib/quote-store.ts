import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { QuoteRecord } from "@/lib/quote";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: {
          headers: { "x-application-name": "kah-digital-admin" },
        },
      })
    : null;

export function isSupabaseConfigured() {
  return supabaseConfigured;
}

function requireSupabaseClient() {
  if (!supabase) {
    throw new Error("Supabase non configuré (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }
  return supabase;
}

export async function saveQuoteRecord(quote: QuoteRecord) {
  const client = requireSupabaseClient();
  const { error } = await client.from("quotes").insert({ ...quote });
  if (error) {
    console.error("[quote-store] Failed to persist quote to Supabase", error);
    throw new Error("Impossible de persister la demande.");
  }
}

export async function getRecentQuotes(limit = 50) {
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from("quotes")
    .select("*")
    .order("submittedAt", { ascending: false })
    .limit(limit);
  if (error || !data) {
    console.error("[quote-store] Failed to read quotes from Supabase", error);
    throw new Error("Impossible de charger les demandes.");
  }

  return data as QuoteRecord[];
}
