import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import type { PulseContent, PulseOp } from "@/lib/pulse/content";

export type ReminderSettings = {
  enabled: boolean;
  channels: Array<"email" | "sms">;
  hoursBefore: number[];
  reviewDelayHours: number;
};

export type PulseSite = {
  id: string;
  site_key: string;
  access_token: string;
  client_name: string;
  owner_email: string | null;
  plan: string;
  timezone: string;
  whatsapp_numbers: string[];
  content: PulseContent;
  google_review_url: string | null;
  reminder_settings: ReminderSettings;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type PulseAppointment = {
  id: string;
  site_id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  service: string | null;
  starts_at: string;
  status: "scheduled" | "cancelled" | "done";
  consent: boolean;
  reminders_sent: Array<{ kind: string; at: string; channels: string[] }>;
  review_requested_at: string | null;
  source: string;
  created_at: string;
};

export const DEFAULT_REMINDERS: ReminderSettings = {
  enabled: false,
  channels: ["email"],
  hoursBefore: [24, 2],
  reviewDelayHours: 3,
};

let client: SupabaseClient | null = null;

export function isPulseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Serveur uniquement : tables protégées par RLS sans politique, accès via clé service. */
export function db(): SupabaseClient {
  if (!isPulseConfigured()) throw new Error("Supabase (service role) non configuré.");
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
  }
  return client;
}

export function newToken() {
  return randomBytes(24).toString("base64url");
}

export async function getSiteByKey(siteKey: string): Promise<PulseSite | null> {
  const { data } = await db().from("pulse_sites").select("*").eq("site_key", siteKey).eq("active", true).maybeSingle();
  return (data as PulseSite | null) ?? null;
}

export async function getSiteByToken(token: string): Promise<PulseSite | null> {
  if (!token || token.length < 20 || token.length > 80) return null;
  const { data } = await db().from("pulse_sites").select("*").eq("access_token", token).eq("active", true).maybeSingle();
  return (data as PulseSite | null) ?? null;
}

export async function getSiteByWhatsApp(number: string): Promise<PulseSite | null> {
  const { data } = await db().from("pulse_sites").select("*").contains("whatsapp_numbers", [number]).eq("active", true).limit(1);
  return ((data as PulseSite[] | null) ?? [])[0] ?? null;
}

export async function saveContent(siteId: string, content: PulseContent) {
  const { error } = await db().from("pulse_sites").update({ content, updated_at: new Date().toISOString() }).eq("id", siteId);
  if (error) throw error;
}

export async function logUpdate(params: {
  siteId: string;
  source: "web" | "whatsapp" | "admin" | "demo";
  message: string;
  ops: PulseOp[] | null;
  reply: string;
  status: "applied" | "needs_clarification" | "rejected" | "error";
}) {
  await db().from("pulse_updates").insert({
    site_id: params.siteId,
    source: params.source,
    message: params.message.slice(0, 1000),
    ops: params.ops,
    reply: params.reply.slice(0, 1000),
    status: params.status,
  });
}

export async function recentUpdates(siteId: string, limit = 8) {
  const { data } = await db()
    .from("pulse_updates")
    .select("id,source,message,reply,status,created_at")
    .eq("site_id", siteId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as Array<{ id: string; source: string; message: string; reply: string; status: string; created_at: string }> | null) ?? [];
}

export async function listAppointments(siteId: string, fromIso: string, limit = 100) {
  const { data } = await db()
    .from("pulse_appointments")
    .select("*")
    .eq("site_id", siteId)
    .gte("starts_at", fromIso)
    .order("starts_at", { ascending: true })
    .limit(limit);
  return (data as PulseAppointment[] | null) ?? [];
}
