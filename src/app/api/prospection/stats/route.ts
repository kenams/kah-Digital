import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getSendBudget } from "@/lib/prospection-safety";

type ProspectStatRow = {
  status: string | null;
  openedAt: string | null;
  clickedAt: string | null;
  repliedAt: string | null;
  sentAt: string | null;
  email: string | null;
  createdAt: string | null;
};

type BatchRow = {
  id: string;
  createdAt?: string | null;
  runAt?: string | null;
  slot: string | null;
  found: number | null;
  sent: number | null;
  errors: unknown;
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

function getBatchDate(batch: BatchRow | null | undefined) {
  return batch?.createdAt ?? batch?.runAt ?? null;
}

function getErrors(errors: unknown) {
  return Array.isArray(errors) ? errors.filter((error): error is string => typeof error === "string") : [];
}

async function fetchBatches(supabase: ReturnType<typeof getSupabase>) {
  const createdAtRes = await supabase.from("prospect_batches").select("*").order("createdAt", { ascending: false }).limit(20);
  if (!createdAtRes.error) return createdAtRes;

  const runAtRes = await supabase.from("prospect_batches").select("*").order("runAt", { ascending: false }).limit(20);
  return runAtRes.error ? createdAtRes : runAtRes;
}

export const STATS_SINCE_KEY = "prospection_stats_since";
// Une ouverture dans les 2 minutes qui suivent l'envoi vient d'un filtre anti-spam, pas d'une personne.
const HUMAN_OPEN_DELAY_MS = 120_000;

function isHumanOpen(row: { sentAt: string | null; openedAt: string | null }) {
  if (!row.openedAt || !row.sentAt) return false;
  return new Date(row.openedAt).getTime() - new Date(row.sentAt).getTime() >= HUMAN_OPEN_DELAY_MS;
}

function isReplied(row: { status: string | null; repliedAt: string | null }) {
  return Boolean(row.repliedAt) || row.status === "replied";
}

async function fetchAllProspects(supabase: ReturnType<typeof getSupabase>, since: string | null) {
  // Pagination : Supabase plafonne une requête à 1 000 lignes.
  const rows: ProspectStatRow[] = [];
  for (let from = 0; from < 20_000; from += 1000) {
    let query = supabase.from("prospects").select("status, openedAt, clickedAt, repliedAt, sentAt, email, createdAt").range(from, from + 999);
    if (since) query = query.or(`createdAt.gte.${since},sentAt.gte.${since}`);
    const { data, error } = await query;
    if (error || !data) break;
    rows.push(...(data as ProspectStatRow[]));
    if (data.length < 1000) break;
  }
  return rows;
}

function hoursSince(value: string | null) {
  if (!value) return null;
  return Math.round((Date.now() - new Date(value).getTime()) / 36_000) / 100;
}

async function isAuthorized(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`) return true;
  try {
    const auth = await createSupabaseServerClient();
    if (!auth) return false;
    const { data: { user } } = await auth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  // Ces statistiques commerciales internes ne doivent pas être publiques.
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getSupabase();
  const { data: sinceRow } = await supabase.from("app_settings").select("value").eq("key", STATS_SINCE_KEY).maybeSingle();
  const statsSince = sinceRow?.value && !Number.isNaN(Date.parse(sinceRow.value)) ? new Date(sinceRow.value).toISOString() : null;
  const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const dailyFrom = statsSince && statsSince > since30d ? statsSince : since30d;
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const [
    prospectsRes,
    batchesRes,
    hotRes,
    noEmailRes,
    followupRes,
    lastProspectRes,
    backlogCountRes,
    sent24hRes,
    blockedCountRes,
    dailyRawRes,
    manualRes,
  ] = await Promise.all([
    fetchAllProspects(supabase, statsSince),
    fetchBatches(supabase),
    supabase.from("prospects")
      .select("id, businessName, website, email, status, openedAt, clickedAt, repliedAt, sentAt, sector, country, audit, draftReply")
      .or("status.eq.replied,clickedAt.not.is.null,openedAt.not.is.null")
      .order("clickedAt", { ascending: false })
      .limit(20),
    supabase.from("prospects")
      .select("id, businessName, website, sector, country, audit, createdAt")
      .eq("status", "analyzed")
      .is("email", null)
      .order("createdAt", { ascending: false })
      .limit(10),
    supabase.from("prospects")
      .select("followup1SentAt, followup2SentAt")
      .or(statsSince
        ? `followup1SentAt.gte.${statsSince},followup2SentAt.gte.${statsSince}`
        : "followup1SentAt.not.is.null,followup2SentAt.not.is.null")
      .range(0, 9999),
    supabase.from("prospects")
      .select("createdAt, status, sentAt")
      .order("createdAt", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("prospects")
      .select("id", { count: "exact", head: true })
      .eq("status", "analyzed")
      .eq("emailGuessed", false)
      .not("email", "is", null)
      .not("emailBody", "is", null),
    supabase.from("prospects")
      .select("id", { count: "exact", head: true })
      .gte("sentAt", since24h),
    supabase.from("prospects")
      .select("id", { count: "exact", head: true })
      .eq("status", "rejected"),
    supabase.from("prospects")
      .select("sentAt, openedAt, clickedAt, repliedAt")
      .gte("sentAt", dailyFrom)
      .not("sentAt", "is", null)
      .range(0, 9999),
    (() => {
      let query = supabase.from("pilot_prospects").select("campaign, status, contacted_at, replied_at").range(0, 9999);
      if (statsSince) query = query.or(`contacted_at.gte.${statsSince},replied_at.gte.${statsSince}`);
      return query;
    })(),
  ]);

  const prospects = prospectsRes;
  const followups = (followupRes.data ?? []) as Array<{ followup1SentAt: string | null; followup2SentAt: string | null }>;
  const batches = (batchesRes.data ?? []) as BatchRow[];
  const latestBatch = batches[0] ?? null;
  const latestBatchAt = getBatchDate(latestBatch);
  const latestProspectAt = lastProspectRes.data?.createdAt ?? null;
  const staleBatchHours = hoursSince(latestBatchAt);
  const recentErrors = batches.flatMap((batch) => getErrors(batch.errors)).slice(0, 6);
  const warnings: string[] = [];

  const budget = await getSendBudget(supabase, 1).catch(() => null);
  if (budget?.reason && (budget.paused || budget.reason.startsWith("coupe-circuit"))) {
    warnings.push(`${budget.paused ? "Envois en pause" : "Envois limités"} : ${budget.reason}.`);
  }

  if (batchesRes.error) {
    warnings.push("Historique des batches inaccessible.");
  }

  if (!latestBatchAt) {
    warnings.push("Aucun batch enregistre.");
  }

  if (staleBatchHours !== null && staleBatchHours > 24) {
    warnings.push(`Aucun batch depuis ${staleBatchHours}h.`);
  }

  if ((backlogCountRes.count ?? 0) > 0) {
    warnings.push(`${backlogCountRes.count} emails prets dans le backlog.`);
  }

  if (recentErrors.some((error) => error.toLowerCase().includes("subject"))) {
    warnings.push("Des objets email invalides ont ete detectes recemment.");
  }

  // Daily breakdown — last 30 days
  type DailyRow = { sentAt: string | null; openedAt: string | null; clickedAt: string | null; repliedAt: string | null };
  // Prospection manuelle (Agent KAH : campagnes pilotes et cyber envoyées depuis Gmail).
  type ManualRow = { campaign: string | null; status: string | null; contacted_at: string | null; replied_at: string | null };
  const manualRows = (manualRes.data ?? []) as ManualRow[];
  const manualByCampaign = new Map<string, { contacted: number; replied: number; optOut: number }>();
  for (const row of manualRows) {
    const key = row.campaign ?? "autre";
    if (!manualByCampaign.has(key)) manualByCampaign.set(key, { contacted: 0, replied: 0, optOut: 0 });
    const m = manualByCampaign.get(key)!;
    if (row.contacted_at && (!statsSince || row.contacted_at >= statsSince)) m.contacted++;
    if (row.replied_at || row.status === "refus" || row.status === "interesse" || row.status === "repondu") m.replied++;
    if (row.status === "opposition") m.optOut++;
  }
  const manual = {
    contacted: Array.from(manualByCampaign.values()).reduce((sum, m) => sum + m.contacted, 0),
    replied: Array.from(manualByCampaign.values()).reduce((sum, m) => sum + m.replied, 0),
    optOut: Array.from(manualByCampaign.values()).reduce((sum, m) => sum + m.optOut, 0),
    campaigns: Array.from(manualByCampaign.entries()).map(([campaign, counts]) => ({ campaign, ...counts })),
  };
  const dailyMap = new Map<string, { sent: number; opened: number; clicked: number; replied: number }>();
  for (const row of (dailyRawRes.data ?? []) as DailyRow[]) {
    if (!row.sentAt) continue;
    const day = row.sentAt.slice(0, 10);
    if (!dailyMap.has(day)) dailyMap.set(day, { sent: 0, opened: 0, clicked: 0, replied: 0 });
    const d = dailyMap.get(day)!;
    d.sent++;
    if (isHumanOpen(row)) d.opened++;
    if (row.clickedAt) d.clicked++;
    if (row.repliedAt) d.replied++;
  }
  const dailyStats = Array.from(dailyMap.entries())
    .map(([date, counts]) => ({ date, ...counts }))
    .sort((a, b) => b.date.localeCompare(a.date));

  const sentRows = prospects.filter((prospect) => prospect.sentAt && (!statsSince || prospect.sentAt >= statsSince));
  const stats = {
    total: prospects.length,
    sent: sentRows.length,
    opened: sentRows.filter(isHumanOpen).length,
    openedRaw: sentRows.filter((prospect) => prospect.openedAt).length,
    clicked: sentRows.filter((prospect) => prospect.clickedAt).length,
    replied: sentRows.filter(isReplied).length,
    noEmail: prospects.filter((prospect) => prospect.status === "no_email" || (!prospect.email && !prospect.sentAt)).length,
    j3Sent: followups.filter((prospect) => prospect.followup1SentAt && (!statsSince || prospect.followup1SentAt >= statsSince)).length,
    j7Sent: followups.filter((prospect) => prospect.followup2SentAt && (!statsSince || prospect.followup2SentAt >= statsSince)).length,
    openRate: 0,
    clickRate: 0,
    replyRate: 0,
  };

  if (stats.sent > 0) {
    stats.openRate = Math.round((stats.opened / stats.sent) * 100);
    stats.clickRate = Math.round((stats.clicked / stats.sent) * 100);
    stats.replyRate = Math.round((stats.replied / stats.sent) * 100);
  }

  return NextResponse.json({
    stats,
    statsSince,
    manual,
    dailyStats,
    batches,
    hotProspects: hotRes.data ?? [],
    noEmailProspects: noEmailRes.data ?? [],
    diagnostics: {
      checkedAt: new Date().toISOString(),
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      resendFromConfigured: Boolean(process.env.RESEND_FROM),
      cronSecretConfigured: Boolean(process.env.CRON_SECRET),
      webhookSecretConfigured: Boolean(process.env.RESEND_WEBHOOK_SECRET),
      aiProvider: process.env.ANTHROPIC_API_KEY ? "anthropic" : process.env.OPENAI_API_KEY ? "openai" : "none",
      latestBatchAt,
      latestProspectAt,
      staleBatchHours,
      backlogReady: backlogCountRes.count ?? 0,
      sentLast24h: sent24hRes.count ?? 0,
      blockedDomains: blockedCountRes.count ?? 0,
      recentErrors,
      warnings,
    },
  });
}
