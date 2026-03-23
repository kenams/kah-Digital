import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { QuoteActivityAction, QuoteActivityRecord } from "@/lib/quote";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: {
          headers: { "x-application-name": "kah-digital-admin-activity" },
        },
      })
    : null;

type AppendQuoteActivityInput = {
  quoteId?: string | null;
  quoteSubmittedAt: string;
  actorUserId?: string | null;
  actorEmail?: string | null;
  action: QuoteActivityAction;
  summary: string;
  payload?: Record<string, unknown> | null;
};

function requireSupabaseClient() {
  if (!supabase) {
    throw new Error("Supabase non configuré (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }

  return supabase;
}

export async function appendQuoteActivity(input: AppendQuoteActivityInput) {
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from("quote_activity")
    .insert({
      quoteId: input.quoteId ?? null,
      quoteSubmittedAt: input.quoteSubmittedAt,
      actorUserId: input.actorUserId ?? null,
      actorEmail: input.actorEmail ?? null,
      action: input.action,
      summary: input.summary,
      payload: input.payload ?? {},
    })
    .select("*")
    .single();

  if (error || !data) {
    console.error("[admin-activity-store] Failed to append activity", error);
    throw new Error("Impossible d'enregistrer l'activité.");
  }

  return data as QuoteActivityRecord;
}

export async function getQuoteActivity(params: { id?: string | null; submittedAt: string; limit?: number }) {
  const client = requireSupabaseClient();
  let query = client
    .from("quote_activity")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(params.limit ?? 50);

  if (params.id) {
    query = query.eq("quoteId", params.id);
  } else {
    query = query.eq("quoteSubmittedAt", params.submittedAt);
  }

  const { data, error } = await query;
  if (error) {
    if (error.code === "42P01") {
      console.warn("[admin-activity-store] quote_activity table missing");
      return [] as QuoteActivityRecord[];
    }

    console.error("[admin-activity-store] Failed to load activity", error);
    throw new Error("Impossible de charger le journal d'activité.");
  }

  return (data as QuoteActivityRecord[]) ?? [];
}
