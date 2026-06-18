/**
 * Relance ciblée des prospects qui ont cliqué mais n'ont pas répondu.
 * Email ultra-court, texte simple, ton humain — pas de HTML lourd.
 * POST /api/admin/followup-clickers
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getResendFromAddress } from "@/lib/mail";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const REPLY_TO = "kahdigital42@gmail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function authorize(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`) return true;
  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;
    const { data: { user } } = await supabaseAuth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch { return false; }
}

type Prospect = {
  id: string;
  businessName: string | null;
  website: string;
  email: string;
  sector: string | null;
  language: string | null;
  clickedAt: string;
  sentAt: string | null;
};

// Email de relance ultra-court, texte simple, 1 seule question
function buildClickerFollowup(p: Prospect): { subject: string; html: string } {
  const lang = p.language ?? "fr";
  const name = p.businessName ?? p.website.replace(/https?:\/\/(www\.)?/, "").split("/")[0];
  const prospectPageUrl = `${SITE_URL}/p/${p.id}`;

  const copy: Record<string, { subject: string; body: string; signoff: string }> = {
    fr: {
      subject: `Re: ${name}`,
      body: `Bonjour,\n\nJ'ai vu que vous avez consulté l'analyse de votre site.\n\nEst-ce que c'est quelque chose qui vous intéresse en ce moment, ou ce n'est pas le bon timing ?\n\nUne ligne suffit — je m'adapte à votre réponse.`,
      signoff: `Kenams — KAH Digital\n${REPLY_TO}`,
    },
    en: {
      subject: `Re: ${name}`,
      body: `Hello,\n\nI noticed you checked the analysis of your website.\n\nIs this something you're interested in right now, or is the timing not right?\n\nOne line is enough — I'll take it from there.`,
      signoff: `Kenan — KAH Digital\n${REPLY_TO}`,
    },
    de: {
      subject: `Re: ${name}`,
      body: `Hallo,\n\nIch habe gesehen, dass Sie die Analyse Ihrer Website angeschaut haben.\n\nIst das gerade ein Thema für Sie, oder passt der Zeitpunkt nicht?\n\nEine kurze Antwort genügt — ich passe mich an.`,
      signoff: `Kenan — KAH Digital\n${REPLY_TO}`,
    },
    es: {
      subject: `Re: ${name}`,
      body: `Hola,\n\nVi que consultó el análisis de su sitio web.\n\n¿Es esto algo que le interesa ahora, o no es el momento adecuado?\n\nUna línea es suficiente — me adapto a su respuesta.`,
      signoff: `Kenan — KAH Digital\n${REPLY_TO}`,
    },
    it: {
      subject: `Re: ${name}`,
      body: `Buongiorno,\n\nHo visto che ha consultato l'analisi del suo sito.\n\nÈ qualcosa che la interessa in questo momento, o il momento non è giusto?\n\nUna riga basta — mi adatto alla sua risposta.`,
      signoff: `Kenan — KAH Digital\n${REPLY_TO}`,
    },
  };

  const c = copy[lang] ?? copy.fr;
  const htmlBody = c.body.replace(/\n/g, "<br>") + `<br><br>${c.signoff.replace(/\n/g, "<br>")}`;

  const html = `<!DOCTYPE html><html lang="${lang}"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#fff;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:36px 24px;">
<p style="font-size:15px;color:#111;line-height:1.7;white-space:pre-line;">${htmlBody}</p>
<p style="margin-top:16px;font-size:12px;color:#9ca3af;">
  <a href="${prospectPageUrl}" style="color:#9ca3af;">Voir l'analyse →</a>
</p>
</div>
</body></html>`;

  return { subject: c.subject, html };
}

export async function POST(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({})) as { limit?: number; minHoursAgo?: number };
  const limit = Math.min(body.limit ?? 20, 50);
  const minHoursAgo = body.minHoursAgo ?? 24; // ne pas relancer trop vite

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY manquant" }, { status: 500 });
  }

  const supabase = getSupabase();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = getResendFromAddress();
  const cutoff = new Date(Date.now() - minHoursAgo * 3600 * 1000).toISOString();

  const { data: prospects } = await supabase
    .from("prospects")
    .select("id, businessName, website, email, sector, language, clickedAt, sentAt")
    .not("clickedAt", "is", null)
    .is("repliedAt", null)
    .is("followup3SentAt", null) // pas encore eu la relance J+10
    .neq("status", "rejected")
    .not("email", "is", null)
    .lte("clickedAt", cutoff) // a cliqué il y a plus de X heures
    .order("clickedAt", { ascending: false })
    .limit(limit);

  if (!prospects?.length) {
    return NextResponse.json({ ok: true, sent: 0, message: "Aucun cliqueur éligible" });
  }

  let sent = 0;
  let failed = 0;
  const results: Array<{ email: string; ok: boolean; error?: string }> = [];

  for (const p of prospects as Prospect[]) {
    try {
      const { subject, html } = buildClickerFollowup(p);
      await resend.emails.send({
        from,
        to: [p.email],
        replyTo: [REPLY_TO],
        subject,
        html,
        tags: [{ name: "prospect_id", value: p.id }, { name: "type", value: "clicker_followup" }],
      });

      // Marquer followup3 pour ne pas re-envoyer
      await supabase.from("prospects")
        .update({ followup3SentAt: new Date().toISOString() })
        .eq("id", p.id);

      results.push({ email: p.email, ok: true });
      sent++;
    } catch (e) {
      results.push({ email: p.email, ok: false, error: String(e) });
      failed++;
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: prospects.length, results });
}

export async function GET(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Si appelé par le cron (Bearer token) → déclencher la relance automatiquement
  const cronSecret = process.env.CRON_SECRET;
  const isCron = cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`;
  if (isCron) return POST(req);

  const supabase = getSupabase();
  const { count } = await supabase
    .from("prospects")
    .select("id", { count: "exact", head: true })
    .not("clickedAt", "is", null)
    .is("repliedAt", null)
    .is("followup3SentAt", null)
    .neq("status", "rejected")
    .not("email", "is", null);

  return NextResponse.json({ eligible: count ?? 0 });
}
