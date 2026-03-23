import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { assistantRecordSchema, type AssistantRecord } from "@/lib/assistant/schema";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        global: {
          headers: { "x-application-name": "kah-digital-assistant" },
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

export async function getAssistantRecord(params: { id?: string | null; submittedAt: string }) {
  const client = requireSupabaseClient();
  const { data, error } = await (params.id
    ? client.from("assistant_leads").select("*").eq("id", params.id).limit(1).maybeSingle()
    : client
        .from("assistant_leads")
        .select("*")
        .eq("submittedAt", params.submittedAt)
        .limit(1)
        .maybeSingle());

  if (error) {
    if (isMissingTableError(error.code)) {
      console.warn("[assistant-store] assistant_leads table missing, returning null record");
      return null;
    }

    console.error("[assistant-store] Failed to read assistant record", error);
    throw new Error("Impossible de charger la demande assistant.");
  }

  return data ? assistantRecordSchema.parse(data) : null;
}

export async function updateAssistantRecord(params: {
  id?: string | null;
  submittedAt: string;
  patch: Partial<AssistantRecord>;
}) {
  const client = requireSupabaseClient();
  const payload = Object.fromEntries(
    Object.entries(params.patch).filter(([, value]) => value !== undefined)
  );

  const { error } = await (params.id
    ? client.from("assistant_leads").update(payload).eq("id", params.id)
    : client.from("assistant_leads").update(payload).eq("submittedAt", params.submittedAt));

  if (error) {
    if (isMissingTableError(error.code)) {
      console.warn("[assistant-store] assistant_leads table missing, assistant update skipped");
      return;
    }

    console.error("[assistant-store] Failed to update assistant record", error);
    throw new Error("Impossible de mettre a jour la demande assistant.");
  }
}
