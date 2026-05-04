import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PROSPECTION_EMAILS_PER_RUN, runProspectionBatch } from "@/lib/prospection-runner";

export const maxDuration = 300;

async function authorize(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");

  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;

  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;

    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();

    return Boolean(user && isAdminUser(user));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runProspectionBatch({ source: "cron", maxEmails: PROSPECTION_EMAILS_PER_RUN });
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[cron:prospection] critical error", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
