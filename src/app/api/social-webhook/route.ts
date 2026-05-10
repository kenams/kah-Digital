import { NextRequest, NextResponse } from "next/server";
import { insertSocialLog } from "@/lib/social-store";

const WEBHOOK_SECRET = process.env.SOCIAL_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-webhook-secret") ?? "";
    if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { platform, lang, status, content, error, runId } = body;

    if (!platform || !lang || !status) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await insertSocialLog({ platform, lang, status, content, error, runId });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[social-webhook]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
