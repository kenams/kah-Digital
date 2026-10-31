import { NextRequest, NextResponse } from "next/server";
import { runDue } from "@/lib/sitewatch/runner";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/** Vérifications SiteWatch échues. Appelé toutes les 15 min par GitHub Actions (Vercel Hobby = crons limités). */
async function handle(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const summary = await runDue();
  return NextResponse.json({ ok: true, ...summary });
}

export const GET = handle;
export const POST = handle;
