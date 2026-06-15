/**
 * Cron matin — audit complet prospects + auto-fix + rapport Telegram
 * Tourne tous les jours à 06:00 UTC (08:00 CET)
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendTelegramAlert } from "@/lib/notify";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function authorize(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

// ─── Types ───────────────────────────────────────────────────────────────────

type Fix = { type: string; detail: string; count: number };

// ─── Checks & fixes ──────────────────────────────────────────────────────────

async function fixStuckPending(sb: ReturnType<typeof getSupabase>): Promise<Fix | null> {
  // Prospects en "pending" depuis plus de 48h sans email → reset to null pour relance
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const { data, error } = await sb
    .from("prospects")
    .select("id")
    .eq("status", "pending")
    .lt("created_at", cutoff)
    .limit(50);

  if (error || !data?.length) return null;

  const ids = data.map((r: { id: string }) => r.id);
  await sb.from("prospects").update({ status: null }).in("id", ids);

  return { type: "stuck_pending_reset", detail: "Prospects bloqués en pending >48h remis en file", count: ids.length };
}

async function fixDuplicateEmails(sb: ReturnType<typeof getSupabase>): Promise<Fix | null> {
  // Doublons email : garder le plus récent, supprimer les autres en statut null/pending
  const { data: dupes } = await sb
    .rpc("find_duplicate_prospect_emails")
    .limit(100);

  // Si la fonction RPC n'existe pas, on fait en JS
  const { data: allProspects } = await sb
    .from("prospects")
    .select("id, email, status, created_at")
    .in("status", [null, "pending"])
    .order("created_at", { ascending: true });

  if (!allProspects?.length) return null;

  const seen = new Map<string, string>(); // email → id_le_plus_recent
  const toDelete: string[] = [];

  // Regrouper par email
  const byEmail = new Map<string, typeof allProspects>();
  for (const p of allProspects) {
    if (!p.email) continue;
    const key = p.email.toLowerCase().trim();
    if (!byEmail.has(key)) byEmail.set(key, []);
    byEmail.get(key)!.push(p);
  }

  for (const [, group] of byEmail) {
    if (group.length < 2) continue;
    // garder le dernier (le plus récent), supprimer les autres
    const sorted = group.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    toDelete.push(...sorted.slice(1).map((p) => p.id));
  }

  if (!toDelete.length) return null;

  await sb.from("prospects").delete().in("id", toDelete);
  return { type: "duplicate_emails_deleted", detail: "Doublons email supprimés (statut null/pending uniquement)", count: toDelete.length };
}

async function fixInvalidEmails(sb: ReturnType<typeof getSupabase>): Promise<Fix | null> {
  // Emails manifestement invalides (sans @, sans point, etc.) → status = "rejected"
  const { data } = await sb
    .from("prospects")
    .select("id, email")
    .in("status", [null, "pending"])
    .limit(500);

  if (!data?.length) return null;

  const invalidIds: string[] = [];
  for (const p of data) {
    if (!p.email) { invalidIds.push(p.id); continue; }
    const e = p.email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
    if (!valid) invalidIds.push(p.id);
  }

  if (!invalidIds.length) return null;

  await sb.from("prospects").update({ status: "rejected", notes: "email invalide détecté par morning-audit" })
    .in("id", invalidIds);

  return { type: "invalid_emails_rejected", detail: "Emails invalides marqués rejected", count: invalidIds.length };
}

async function fixStuckFollowup(sb: ReturnType<typeof getSupabase>): Promise<Fix | null> {
  // Prospects "sent" depuis >30 jours sans followup → reset followup_count pour reprise
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data } = await sb
    .from("prospects")
    .select("id, followup_count, sent_at")
    .eq("status", "sent")
    .lt("sent_at", cutoff)
    .is("followup_count", null)
    .limit(100);

  if (!data?.length) return null;

  const ids = data.map((r: { id: string }) => r.id);
  await sb.from("prospects").update({ followup_count: 0 }).in("id", ids);

  return { type: "stuck_followup_reset", detail: "Prospects envoyés >30j sans suivi → followup_count remis à 0", count: ids.length };
}

// ─── Stats du jour ───────────────────────────────────────────────────────────

async function getStats(sb: ReturnType<typeof getSupabase>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString();

  const [
    { count: total },
    { count: sent },
    { count: replied },
    { count: hotLeads },
    { count: sentToday },
    { count: repliedYesterday },
    { data: recentReplies },
  ] = await Promise.all([
    sb.from("prospects").select("id", { count: "exact", head: true }),
    sb.from("prospects").select("id", { count: "exact", head: true }).eq("status", "sent"),
    sb.from("prospects").select("id", { count: "exact", head: true }).eq("status", "replied"),
    sb.from("prospects").select("id", { count: "exact", head: true }).eq("status", "hot"),
    sb.from("prospects").select("id", { count: "exact", head: true }).gte("sent_at", todayStr),
    sb.from("prospects").select("id", { count: "exact", head: true }).eq("status", "replied").gte("replied_at", yStr).lt("replied_at", todayStr),
    sb.from("prospects").select("id, company, email, replied_at").eq("status", "replied").order("replied_at", { ascending: false }).limit(3),
  ]);

  return { total, sent, replied, hotLeads, sentToday, repliedYesterday, recentReplies };
}

// ─── Main ────────────────────────────────────────────────────────────────────

export async function GET(req: Request) {
  if (!authorize(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabase();
  const fixes: Fix[] = [];
  const errors: string[] = [];

  // Lancer tous les checks en parallèle
  const [f1, f2, f3, f4, stats] = await Promise.all([
    fixStuckPending(sb).catch((e) => { errors.push(`stuck_pending: ${e.message}`); return null; }),
    fixDuplicateEmails(sb).catch((e) => { errors.push(`duplicates: ${e.message}`); return null; }),
    fixInvalidEmails(sb).catch((e) => { errors.push(`invalid_emails: ${e.message}`); return null; }),
    fixStuckFollowup(sb).catch((e) => { errors.push(`stuck_followup: ${e.message}`); return null; }),
    getStats(sb).catch((e) => { errors.push(`stats: ${e.message}`); return null; }),
  ]);

  for (const f of [f1, f2, f3, f4]) {
    if (f) fixes.push(f);
  }

  // ── Rapport Telegram ──────────────────────────────────────────────────────
  const dateStr = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Paris" });
  const fixLines = fixes.length
    ? fixes.map((f) => `  🔧 ${f.count}x ${f.detail}`).join("\n")
    : "  ✅ Rien à corriger";

  const errorLines = errors.length
    ? `\n⚠️ <b>Erreurs audit :</b>\n${errors.map((e) => `  • ${e}`).join("\n")}`
    : "";

  let statsBlock = "";
  if (stats) {
    const recentNames = (stats.recentReplies ?? [])
      .map((r: { company?: string; email?: string }) => r.company || r.email || "?")
      .join(", ");

    statsBlock = `\n📊 <b>Tableau de bord :</b>
  • Total base : <b>${stats.total ?? "?"}</b> prospects
  • Envoyés : <b>${stats.sent ?? "?"}</b> | Réponses : <b>${stats.replied ?? "?"}</b> | Chauds 🔥 : <b>${stats.hotLeads ?? "?"}</b>
  • Envoyés aujourd'hui : <b>${stats.sentToday ?? 0}</b>
  • Réponses hier : <b>${stats.repliedYesterday ?? 0}</b>${recentNames ? `\n  • Dernières réponses : ${recentNames}` : ""}`;
  }

  const msg = `☀️ <b>Audit matin — ${dateStr}</b>\n${statsBlock}\n\n🛠 <b>Corrections auto :</b>\n${fixLines}${errorLines}`;

  await sendTelegramAlert(msg).catch(console.error);

  return NextResponse.json({ ok: true, fixes, errors, stats });
}

export async function POST(req: Request) {
  return GET(req);
}
