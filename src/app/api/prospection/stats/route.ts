import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  const supabase = getSupabase();

  const [prospectsRes, batchesRes, hotRes, noEmailRes, followupRes] = await Promise.all([
    supabase.from("prospects").select("status, openedAt, clickedAt, repliedAt, sentAt, email, createdAt"),
    supabase.from("prospect_batches").select("*").order("createdAt", { ascending: false }).limit(20),
    supabase.from("prospects")
      .select("id, businessName, website, email, status, openedAt, clickedAt, repliedAt, sentAt, sector, country, audit, draftReply")
      .or("status.eq.replied,clickedAt.not.is.null,openedAt.not.is.null")
      .order("clickedAt", { ascending: false })
      .limit(20),
    // Prospects sans email (analysés mais pas envoyables automatiquement)
    supabase.from("prospects")
      .select("id, businessName, website, sector, country, audit, createdAt")
      .eq("status", "analyzed")
      .is("email", null)
      .order("createdAt", { ascending: false })
      .limit(10),
    // Stats relances
    supabase.from("prospects")
      .select("followup1SentAt, followup2SentAt")
      .or("followup1SentAt.not.is.null,followup2SentAt.not.is.null"),
  ]);

  const prospects = prospectsRes.data ?? [];
  const followups = followupRes.data ?? [];
  const stats = {
    total: prospects.length,
    sent: prospects.filter((p) => p.sentAt).length,
    opened: prospects.filter((p) => p.openedAt).length,
    clicked: prospects.filter((p) => p.clickedAt).length,
    replied: prospects.filter((p) => p.status === "replied").length,
    noEmail: prospects.filter((p) => !p.email && !p.sentAt).length,
    j3Sent: followups.filter((p) => p.followup1SentAt).length,
    j7Sent: followups.filter((p) => p.followup2SentAt).length,
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
    batches: batchesRes.data ?? [],
    hotProspects: hotRes.data ?? [],
    noEmailProspects: noEmailRes.data ?? [],
  });
}
