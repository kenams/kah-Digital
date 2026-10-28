import { NextRequest, NextResponse } from "next/server";
import { isPulseConfigured } from "@/lib/pulse/store";
import { runReminders } from "@/lib/pulse/reminders";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/** Rappels de RDV + demandes d'avis. Appelé toutes les 30 min par GitHub Actions (Vercel Hobby = crons limités). */
async function handle(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!isPulseConfigured()) return NextResponse.json({ error: "not configured" }, { status: 503 });

  const summary = await runReminders();
  return NextResponse.json({ ok: true, ...summary });
}

export const GET = handle;
export const POST = handle;
