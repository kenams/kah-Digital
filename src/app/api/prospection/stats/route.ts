import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

function hoursSince(value: string | null) {
  if (!value) return null;
  return Math.round((Date.now() - new Date(value).getTime()) / 36_000) / 100;
}

export async function GET() {
  const supabase = getSupabase();
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
  ] = await Promise.all([
    supabase.from("prospects").select("status, openedAt, clickedAt, repliedAt, sentAt, email, createdAt"),
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
      .or("followup1SentAt.not.is.null,followup2SentAt.not.is.null"),
    supabase.from("prospects")
      .select("createdAt, status, sentAt")
      .order("createdAt", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("prospects")
      .select("id", { count: "exact", head: true })
      .eq("status", "analyzed")
      .not("email", "is", null)
      .not("emailBody", "is", null),
    supabase.from("prospects")
      .select("id", { count: "exact", head: true })
      .gte("sentAt", since24h),
    supabase.from("prospects")
      .select("id", { count: "exact", head: true })
      .not("status", "eq", "rejected"),
  ]);

  const prospects = (prospectsRes.data ?? []) as ProspectStatRow[];
  const followups = followupRes.data ?? [];
  const batches = (batchesRes.data ?? []) as BatchRow[];
  const latestBatch = batches[0] ?? null;
  const latestBatchAt = getBatchDate(latestBatch);
  const latestProspectAt = lastProspectRes.data?.createdAt ?? null;
  const staleBatchHours = hoursSince(latestBatchAt);
  const recentErrors = batches.flatMap((batch) => getErrors(batch.errors)).slice(0, 6);
  const warnings: string[] = [];

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

  const stats = {
    total: prospects.length,
    sent: prospects.filter((prospect) => prospect.sentAt).length,
    opened: prospects.filter((prospect) => prospect.openedAt).length,
    clicked: prospects.filter((prospect) => prospect.clickedAt).length,
    replied: prospects.filter((prospect) => prospect.status === "replied").length,
    noEmail: prospects.filter((prospect) => !prospect.email && !prospect.sentAt).length,
    j3Sent: followups.filter((prospect) => prospect.followup1SentAt).length,
    j7Sent: followups.filter((prospect) => prospect.followup2SentAt).length,
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
    batches,
    hotProspects: hotRes.data ?? [],
    noEmailProspects: noEmailRes.data ?? [],
    diagnostics: {
      checkedAt: new Date().toISOString(),
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
      resendFromConfigured: Boolean(process.env.RESEND_FROM),
      cronSecretConfigured: Boolean(process.env.CRON_SECRET),
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
