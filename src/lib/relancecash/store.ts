import { createClient } from "@supabase/supabase-js";
import type { ParsedInvoice } from "./csv";

export type Account = { id: string; email: string; name: string | null };
export type Invoice = {
  id: string; account_id: string; number: string; client_name: string; client_email: string | null; amount_cents: number;
  currency: "EUR" | "CHF" | "USD"; issue_date: string | null; due_date: string; status: "open" | "paid"; paid_at: string | null;
};
export type InvoiceEvent = { id: string; invoice_id: string; type: "imported" | "reminder_sent" | "paid" | "reopened"; level: number | null; created_at: string };

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function findAccount(email: string): Promise<Account | null> {
  const { data } = await db().from("relancecash_accounts").select("id,email,name").eq("email", email.toLowerCase()).maybeSingle();
  return data ?? null;
}

export async function listInvoices(accountId: string): Promise<Invoice[]> {
  const { data } = await db().from("relancecash_invoices").select("*").eq("account_id", accountId).order("due_date", { ascending: true }).limit(5000);
  return (data ?? []) as Invoice[];
}

export async function listEvents(invoiceIds: string[]): Promise<InvoiceEvent[]> {
  if (!invoiceIds.length) return [];
  const out: InvoiceEvent[] = [];
  for (let i = 0; i < invoiceIds.length; i += 200) {
    const { data } = await db().from("relancecash_events").select("*").in("invoice_id", invoiceIds.slice(i, i + 200)).order("created_at", { ascending: true });
    out.push(...((data ?? []) as InvoiceEvent[]));
  }
  return out;
}

/** Importe ou met à jour (par numéro) sans toucher au statut payé ni à l'historique des relances. */
export async function importInvoices(accountId: string, rows: ParsedInvoice[]) {
  const client = db();
  const { data: existing } = await client.from("relancecash_invoices").select("number").eq("account_id", accountId).in("number", rows.map((r) => r.number));
  const known = new Set((existing ?? []).map((e) => e.number as string));
  const payload = rows.map((r) => ({
    account_id: accountId, number: r.number, client_name: r.clientName, client_email: r.clientEmail, amount_cents: r.amountCents,
    currency: r.currency, issue_date: r.issueDate, due_date: r.dueDate,
  }));
  for (let i = 0; i < payload.length; i += 500) {
    const { error } = await client.from("relancecash_invoices").upsert(payload.slice(i, i + 500), { onConflict: "account_id,number" });
    if (error) throw error;
  }
  const created = rows.filter((r) => !known.has(r.number)).map((r) => r.number);
  if (created.length) {
    const { data: fresh } = await client.from("relancecash_invoices").select("id").eq("account_id", accountId).in("number", created);
    if (fresh?.length) await client.from("relancecash_events").insert(fresh.map((f) => ({ invoice_id: f.id, type: "imported" })));
  }
  return { created: created.length, updated: rows.length - created.length };
}

async function owned(accountId: string, invoiceId: string) {
  const { data } = await db().from("relancecash_invoices").select("id,status").eq("id", invoiceId).eq("account_id", accountId).maybeSingle();
  return data as { id: string; status: "open" | "paid" } | null;
}

export async function markPaid(accountId: string, invoiceId: string) {
  const inv = await owned(accountId, invoiceId);
  if (!inv || inv.status === "paid") return;
  await db().from("relancecash_invoices").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", invoiceId);
  await db().from("relancecash_events").insert({ invoice_id: invoiceId, type: "paid" });
}

export async function reopen(accountId: string, invoiceId: string) {
  const inv = await owned(accountId, invoiceId);
  if (!inv || inv.status === "open") return;
  await db().from("relancecash_invoices").update({ status: "open", paid_at: null }).eq("id", invoiceId);
  await db().from("relancecash_events").insert({ invoice_id: invoiceId, type: "reopened" });
}

export async function markReminderSent(accountId: string, invoiceId: string, level: number) {
  const inv = await owned(accountId, invoiceId);
  if (!inv || inv.status !== "open") return;
  await db().from("relancecash_events").insert({ invoice_id: invoiceId, type: "reminder_sent", level });
}
