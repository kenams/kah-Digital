import type { SupabaseClient } from "@supabase/supabase-js";

export type ProspectionSlot = "morning" | "noon" | "evening";

export function getProspectionSlot(date = new Date()): ProspectionSlot {
  const hour = date.getUTCHours();
  if (hour < 10) return "morning";
  if (hour < 14) return "noon";
  return "evening";
}

export function compactProspectionError(message: string, maxLength = 500) {
  const cleaned = message.replace(/\s+/g, " ").trim();
  return cleaned.length > maxLength ? `${cleaned.slice(0, maxLength - 3)}...` : cleaned;
}

export async function createProspectionBatch(client: SupabaseClient, slot: ProspectionSlot) {
  const { data, error } = await client
    .from("prospect_batches")
    .insert({ slot, found: 0, sent: 0, errors: [] })
    .select("id")
    .single();

  if (error) {
    console.warn("[prospection-batch] start log failed", error.message);
    return null;
  }

  return typeof data?.id === "string" ? data.id : null;
}

export async function updateProspectionBatch(
  client: SupabaseClient,
  batchId: string | null,
  update: { found?: number; sent?: number; errors?: string[] }
) {
  if (!batchId) return;

  const patch: Record<string, unknown> = {};
  if (typeof update.found === "number") patch.found = update.found;
  if (typeof update.sent === "number") patch.sent = update.sent;
  if (update.errors) patch.errors = update.errors.slice(-80).map((error) => compactProspectionError(error));

  if (Object.keys(patch).length === 0) return;

  const { error } = await client.from("prospect_batches").update(patch).eq("id", batchId);
  if (error) {
    console.warn("[prospection-batch] update failed", error.message);
  }
}
