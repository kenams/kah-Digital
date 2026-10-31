import { createClient } from "@supabase/supabase-js";

export type Kind = "page" | "form" | "booking" | "payment";
export type Account = { id: string; email: string; name: string | null };
export type Check = {
  id: string; account_id: string; name: string; kind: Kind; url: string; must_contain: string | null; frequency_minutes: number;
  active: boolean; last_ok: boolean | null; last_status: number | null; last_latency_ms: number | null; last_error: string | null;
  last_checked_at: string | null; failures: number; incident_open: boolean; created_at: string;
};
export type Incident = { id: string; check_id: string; started_at: string; resolved_at: string | null; error: string | null };

export const MAX_CHECKS = 10;

export function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function findAccount(email: string): Promise<Account | null> {
  const { data } = await db().from("sitewatch_accounts").select("id,email,name").eq("email", email.toLowerCase()).maybeSingle();
  return data ?? null;
}

export async function findAccountById(id: string): Promise<Account | null> {
  const { data } = await db().from("sitewatch_accounts").select("id,email,name").eq("id", id).maybeSingle();
  return data ?? null;
}

export async function listChecks(accountId: string): Promise<Check[]> {
  const { data } = await db().from("sitewatch_checks").select("*").eq("account_id", accountId).order("created_at", { ascending: true });
  return (data ?? []) as Check[];
}

export async function getOwnedCheck(accountId: string, checkId: string): Promise<Check | null> {
  const { data } = await db().from("sitewatch_checks").select("*").eq("id", checkId).eq("account_id", accountId).maybeSingle();
  return (data as Check | null) ?? null;
}

export async function countChecks(accountId: string) {
  const { count } = await db().from("sitewatch_checks").select("id", { count: "exact", head: true }).eq("account_id", accountId);
  return count ?? 0;
}

export async function createCheck(accountId: string, c: { name: string; kind: Kind; url: string; mustContain: string | null; frequency: number }) {
  const { error } = await db().from("sitewatch_checks").insert({
    account_id: accountId, name: c.name, kind: c.kind, url: c.url, must_contain: c.mustContain, frequency_minutes: c.frequency,
  });
  if (error) throw error;
}

export async function setActive(accountId: string, checkId: string, active: boolean) {
  await db().from("sitewatch_checks").update({ active }).eq("id", checkId).eq("account_id", accountId);
}

export async function deleteCheck(accountId: string, checkId: string) {
  await db().from("sitewatch_checks").delete().eq("id", checkId).eq("account_id", accountId);
}

export async function listIncidents(checkIds: string[], limit = 20): Promise<Incident[]> {
  if (!checkIds.length) return [];
  const { data } = await db().from("sitewatch_incidents").select("*").in("check_id", checkIds).order("started_at", { ascending: false }).limit(limit);
  return (data ?? []) as Incident[];
}

const DAY = 24 * 60 * 60 * 1000;

/** Disponibilité sur 7 jours : comptages en base, sans rapatrier les résultats. */
export async function uptime7d(checkId: string): Promise<{ total: number; ok: number }> {
  const since = new Date(Date.now() - 7 * DAY).toISOString();
  const base = () => db().from("sitewatch_results").select("id", { count: "exact", head: true }).eq("check_id", checkId).gte("created_at", since);
  const [all, good] = await Promise.all([base(), base().eq("ok", true)]);
  return { total: all.count ?? 0, ok: good.count ?? 0 };
}

export async function incidentCount30d(checkId: string): Promise<number> {
  const since = new Date(Date.now() - 30 * DAY).toISOString();
  const { count } = await db().from("sitewatch_incidents").select("id", { count: "exact", head: true }).eq("check_id", checkId).gte("started_at", since);
  return count ?? 0;
}
