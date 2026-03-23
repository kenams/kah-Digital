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
    throw new Error("Supabase non configure (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }

  return supabase;
}

export async function saveQuoteRecord(quote: QuoteRecord) {
  const client = requireSupabaseClient();
  const { data, error } = await client.from("quotes").insert({ ...quote }).select("*").single();
  if (error || !data) {
    console.error("[quote-store] Failed to persist quote to Supabase", error);
    throw new Error("Impossible de persister la demande.");
  }

  return data as QuoteRecord;
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

export async function getQuoteRecord(params: { id?: string | null; submittedAt: string }) {
  const client = requireSupabaseClient();
  const { data, error } = await (params.id
    ? client.from("quotes").select("*").eq("id", params.id).limit(1).maybeSingle()
    : client
        .from("quotes")
        .select("*")
        .eq("submittedAt", params.submittedAt)
        .limit(1)
        .maybeSingle());

  if (error) {
    console.error("[quote-store] Failed to read quote from Supabase", error);
    throw new Error("Impossible de charger la demande.");
  }

  return (data as QuoteRecord | null) ?? null;
}

export async function updateQuoteRecord(params: {
  id?: string | null;
  submittedAt: string;
  patch: Partial<QuoteRecord>;
}) {
  const client = requireSupabaseClient();
  const payload = Object.fromEntries(
    Object.entries(params.patch).filter(([, value]) => value !== undefined)
  );
  const { error } = await (params.id
    ? client.from("quotes").update(payload).eq("id", params.id)
    : client.from("quotes").update(payload).eq("submittedAt", params.submittedAt));
  if (error) {
    console.error("[quote-store] Failed to update quote", error);
    throw new Error("Impossible de mettre a jour la demande.");
  }
}

export async function updateQuoteStatus(params: {
  id?: string | null;
  submittedAt: string;
  feasibility: "pending" | "feasible" | "blocked";
  deposit: "none" | "deposit" | "servers";
  pipeline?: "new" | "qualified" | "quote" | "negotiation" | "won" | "lost";
}) {
  await updateQuoteRecord({
    id: params.id,
    submittedAt: params.submittedAt,
    patch: {
      feasibility: params.feasibility,
      deposit: params.deposit,
      pipeline: params.pipeline,
    },
  });
}
