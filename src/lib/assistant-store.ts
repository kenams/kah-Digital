import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { assistantRecordSchema, type AssistantRecord } from "@/lib/assistant/schema";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: {
          headers: { "x-application-name": "kah-digital-assistant" },
        },
      })
    : null;

function requireSupabaseClient() {
  if (!supabase) {
    throw new Error("Supabase non configure (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).");
  }
  return supabase;
}

function isMissingTableError(code?: string) {
  return code === "42P01" || code === "PGRST205";
}

export async function saveAssistantRecord(record: AssistantRecord) {
  const client = requireSupabaseClient();
  const payload = assistantRecordSchema.parse(record);

  const { error } = await client.from("assistant_leads").insert({
    ...payload,
    summary: payload.summary,
    transcript: payload.transcript,
  });

  if (error) {
    if (isMissingTableError(error.code)) {
      console.warn("[assistant-store] assistant_leads table missing, skipping persistence");
      return { persisted: false, reason: "missing-table" as const };
    }

    console.error("[assistant-store] Failed to persist assistant record", error);
    throw new Error("Impossible de persister la demande assistant.");
  }

  return { persisted: true as const };
}

export async function getRecentAssistantRecords(limit = 50) {
  const client = requireSupabaseClient();
  const { data, error } = await client
    .from("assistant_leads")
    .select("*")
    .order("submittedAt", { ascending: false })
    .limit(limit);

  if (error) {
    if (isMissingTableError(error.code)) {
      console.warn("[assistant-store] assistant_leads table missing, returning empty list");
      return [];
    }

    console.error("[assistant-store] Failed to read assistant records", error);
    throw new Error("Impossible de charger les demandes assistant.");
  }

  return (data ?? []).map((item) => assistantRecordSchema.parse(item));
}
