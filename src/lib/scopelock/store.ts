import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

export type RequestStatus = "draft" | "sent" | "accepted" | "refused";
export type Currency = "EUR" | "CHF" | "USD";

export type ScopeAccount = { id: string; email: string; name: string | null };
export type ScopeProject = { id: string; account_id: string; name: string; client_name: string; client_email: string; created_at: string };
export type ScopeRequest = {
  id: string; project_id: string; title: string; description: string; price_cents: number; currency: Currency;
  delay_days: number; status: RequestStatus; token: string; sent_at: string | null; decided_at: string | null;
  decision_note: string | null; created_at: string;
};
export type ScopeEvent = { id: string; request_id: string; type: string; note: string | null; created_at: string };

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}

export const newToken = () => randomBytes(24).toString("base64url");

export async function findAccount(email: string): Promise<ScopeAccount | null> {
  const { data } = await db().from("scopelock_accounts").select("id,email,name").eq("email", email.toLowerCase()).maybeSingle();
  return data ?? null;
}

export async function listProjects(accountId: string): Promise<ScopeProject[]> {
  const { data } = await db().from("scopelock_projects").select("*").eq("account_id", accountId).order("created_at", { ascending: false });
  return data ?? [];
}

export async function createProject(accountId: string, name: string, clientName: string, clientEmail: string) {
  const { error } = await db().from("scopelock_projects").insert({ account_id: accountId, name, client_name: clientName, client_email: clientEmail });
  if (error) throw error;
}

export async function listRequests(projectIds: string[]): Promise<ScopeRequest[]> {
  if (!projectIds.length) return [];
  const { data } = await db().from("scopelock_requests").select("*").in("project_id", projectIds).order("created_at", { ascending: false });
  return data ?? [];
}

export async function getOwnedProject(accountId: string, projectId: string): Promise<ScopeProject | null> {
  const { data } = await db().from("scopelock_projects").select("*").eq("id", projectId).eq("account_id", accountId).maybeSingle();
  return data ?? null;
}

export async function getOwnedRequest(accountId: string, requestId: string) {
  const { data } = await db().from("scopelock_requests").select("*, scopelock_projects!inner(*)").eq("id", requestId).eq("scopelock_projects.account_id", accountId).maybeSingle();
  return data as (ScopeRequest & { scopelock_projects: ScopeProject }) | null;
}

export async function createRequest(input: { projectId: string; title: string; description: string; priceCents: number; currency: Currency; delayDays: number }) {
  const { data, error } = await db().from("scopelock_requests").insert({
    project_id: input.projectId, title: input.title, description: input.description,
    price_cents: input.priceCents, currency: input.currency, delay_days: input.delayDays, token: newToken(),
  }).select("id").single();
  if (error) throw error;
  await addEvent(data.id, "created");
  return data.id as string;
}

export async function addEvent(requestId: string, type: string, note?: string | null) {
  await db().from("scopelock_events").insert({ request_id: requestId, type, note: note ?? null });
}

export async function listEvents(requestIds: string[]): Promise<ScopeEvent[]> {
  if (!requestIds.length) return [];
  const { data } = await db().from("scopelock_events").select("*").in("request_id", requestIds).order("created_at", { ascending: true });
  return data ?? [];
}

export async function markSent(requestId: string) {
  await db().from("scopelock_requests").update({ status: "sent", sent_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", requestId);
  await addEvent(requestId, "sent");
}

export async function getByToken(token: string) {
  const { data } = await db().from("scopelock_requests").select("*, scopelock_projects!inner(name,client_name,account_id)").eq("token", token).maybeSingle();
  return data as (ScopeRequest & { scopelock_projects: { name: string; client_name: string; account_id: string } }) | null;
}

// Décision unique : n'agit que si la demande est encore « envoyée ».
export async function decide(token: string, decision: "accepted" | "refused", note: string) {
  const now = new Date().toISOString();
  const { data } = await db().from("scopelock_requests")
    .update({ status: decision, decided_at: now, decision_note: note || null, updated_at: now })
    .eq("token", token).eq("status", "sent").select("id").maybeSingle();
  if (!data) return false;
  await addEvent(data.id, decision, note || null);
  return true;
}

export function formatMoney(cents: number, currency: Currency) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(cents / 100);
}

export async function findAccountById(id: string): Promise<ScopeAccount | null> {
  const { data } = await db().from("scopelock_accounts").select("id,email,name").eq("id", id).maybeSingle();
  return data ?? null;
}
