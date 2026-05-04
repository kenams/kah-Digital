import { waitUntil } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PROSPECTION_EMAILS_PER_RUN, runProspectionBatch } from "@/lib/prospection-runner";
import { createProspectionBatch, getProspectionSlot } from "@/lib/prospection-batches";

export const maxDuration = 300;

const FIRE_KEY = process.env.FIRE_API_KEY ?? "KAH2026FIRE";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== FIRE_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const slot = getProspectionSlot();
  const batchId = await createProspectionBatch(supabase, slot);

  waitUntil(runProspectionBatch({ source: "manual", maxEmails: PROSPECTION_EMAILS_PER_RUN, batchId, slot }));

  return NextResponse.json({
    ok: true,
    batchId,
    message: "Batch lance en background. Resultats dans /admin/prospection.",
  });
}
