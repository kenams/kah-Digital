import { NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PROSPECTION_EMAILS_PER_RUN, runProspectionBatch } from "@/lib/prospection-runner";
import { Resend } from "resend";
import { PROSPECTION_FROM, PROSPECTION_REPLY_TO } from "@/lib/prospection-sender";

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
    // ?selftest=1 : envoie UN mail de test réel (expéditeur de prospection) vers la boîte admin.
    if (new URL(req.url).searchParams.get("selftest") === "1") {
      const resend = new Resend(process.env.RESEND_API_KEY!);
      const { data, error } = await resend.emails.send({
        from: PROSPECTION_FROM,
        to: PROSPECTION_REPLY_TO,
        replyTo: PROSPECTION_REPLY_TO,
        subject: "Test d'envoi prospection (go.kah-digital.ch)",
        text: "Ce mail confirme que l'expéditeur de prospection fonctionne (SPF/DKIM via go.kah-digital.ch). Aucun prospect n'a été contacté.",
      });
      return NextResponse.json({ ok: !error, from: PROSPECTION_FROM, id: data?.id, error: error?.message });
    }

    // ?dry=1 : simulation complète (découverte, audit, rédaction, contrôle) sans rien envoyer ni écrire.
    const dryRun = new URL(req.url).searchParams.get("dry") === "1";
    const result = await runProspectionBatch({ source: "cron", maxEmails: PROSPECTION_EMAILS_PER_RUN, dryRun });
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
