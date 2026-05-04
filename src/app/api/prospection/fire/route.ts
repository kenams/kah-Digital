import { waitUntil } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";
import { PROSPECTION_EMAILS_PER_RUN, runProspectionBatch } from "@/lib/prospection-runner";

export const maxDuration = 300;

const FIRE_KEY = process.env.FIRE_API_KEY ?? "KAH2026FIRE";

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (key !== FIRE_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  waitUntil(runProspectionBatch({ source: "manual", maxEmails: PROSPECTION_EMAILS_PER_RUN }));

  return NextResponse.json({
    ok: true,
    message: "Batch lance en background. Resultats dans /admin/prospection.",
  });
}
