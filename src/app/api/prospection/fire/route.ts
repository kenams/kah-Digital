import { waitUntil } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { PROSPECTION_EMAILS_PER_RUN, runProspectionBatch } from "@/lib/prospection-runner";
import { createProspectionBatch, getProspectionSlot } from "@/lib/prospection-batches";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const maxDuration = 300;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function authorize(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;

  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;
    const { data: { user } } = await supabaseAuth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  if (!(await authorize(req))) {
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

export async function POST(req: NextRequest) {
  return GET(req);
}
