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

export async function updateQuoteStatus(params: {
  id?: string | null;
  submittedAt: string;
  feasibility: "pending" | "feasible" | "blocked";
  deposit: "none" | "deposit" | "servers";
}) {
  const client = requireSupabaseClient();
  let query = client.from("quotes").update({
    feasibility: params.feasibility,
    deposit: params.deposit,
  });

  if (params.id) {
    query = query.eq("id", params.id);
  } else {
    query = query.eq("submittedAt", params.submittedAt);
  }

  const { error } = await query;
  if (error) {
    console.error("[quote-store] Failed to update quote status", error);
    throw new Error("Impossible de mettre à jour le statut.");
  }
}
