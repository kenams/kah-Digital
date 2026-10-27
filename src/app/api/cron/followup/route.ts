/**
 * Cron Relance — UNE seule relance par prospect, 4 à 12 jours après le premier mail.
 *
 * Règles (peu mais sûr) :
 *  - jamais de relance si le prospect a cliqué (c'est un humain intéressé : Kenams répond lui-même),
 *  - jamais "vous avez ouvert / consulté" : le pixel d'ouverture est déclenché par les scanners anti-spam,
 *  - jamais de fausse rareté ni d'offre inventée,
 *  - même contrôle final que le premier mail (ciblage, contenu, domaine mail),
 *  - coupe-circuit : à l'arrêt si les rebonds dépassent le seuil.
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getResendFromAddress } from "@/lib/mail";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isPlaceholderEmail } from "@/lib/prospect-email-guard";
import { checkSendable } from "@/lib/prospect-send-gate";
import { getSendBudget } from "@/lib/prospection-safety";

export const maxDuration = 120;

const MAX_PER_RUN = 3;
const MIN_DAYS = 4;
const MAX_DAYS = 12;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

type Copy = {
  subject: (name: string) => string;
  body: (name: string) => string;
  text: (name: string) => string;
  signoff: string;
  unsubscribe: string;
  unsubscribeLink: string;
};

const COPY: Record<string, Copy> = {
  fr: {
    subject: (n) => `Suite à mon message — ${n}`,
    body: (n) => `Bonjour,<br><br>
Je vous ai écrit il y a quelques jours à propos d'un site avec prise de rendez-vous en ligne pour <strong>${n}</strong>. Je reviens une seule fois, au cas où mon message se serait perdu.<br><br>
Si le sujet vous intéresse, répondez simplement à cet email ou appelez le 07 59 55 84 14. Sinon, aucun souci : je ne vous relancerai plus.`,
    text: (n) => `Bonjour,\n\nJe vous ai écrit il y a quelques jours à propos d'un site avec prise de rendez-vous en ligne pour ${n}. Je reviens une seule fois, au cas où mon message se serait perdu.\n\nSi le sujet vous intéresse, répondez simplement à cet email ou appelez le 07 59 55 84 14. Sinon, aucun souci : je ne vous relancerai plus.`,
    signoff: "Cordialement,",
    unsubscribe: "Pas intéressé(e) ? Répondez juste « stop ».",
    unsubscribeLink: "Se désinscrire",
  },
  en: {
    subject: (n) => `Following up on my message — ${n}`,
    body: (n) => `Hello,<br><br>
I wrote to you a few days ago about a website with online booking for <strong>${n}</strong>. I'm following up just once, in case my message got lost.<br><br>
If it's of interest, just reply to this email or call +33 7 59 55 84 14. If not, no problem: I won't contact you again.`,
    text: (n) => `Hello,\n\nI wrote to you a few days ago about a website with online booking for ${n}. I'm following up just once, in case my message got lost.\n\nIf it's of interest, just reply to this email or call +33 7 59 55 84 14. If not, no problem: I won't contact you again.`,
    signoff: "Best regards,",
    unsubscribe: "Not interested? Just reply \"stop\".",
    unsubscribeLink: "Unsubscribe",
  },
  de: {
    subject: (n) => `Nachfrage zu meiner Nachricht — ${n}`,
    body: (n) => `Guten Tag,<br><br>
ich habe Ihnen vor ein paar Tagen wegen einer Website mit Online-Terminbuchung für <strong>${n}</strong> geschrieben. Ich melde mich nur dieses eine Mal, falls meine Nachricht untergegangen ist.<br><br>
Bei Interesse antworten Sie einfach auf diese E-Mail oder rufen Sie +33 7 59 55 84 14 an. Andernfalls kein Problem: Ich melde mich nicht mehr.`,
    text: (n) => `Guten Tag,\n\nich habe Ihnen vor ein paar Tagen wegen einer Website mit Online-Terminbuchung für ${n} geschrieben. Ich melde mich nur dieses eine Mal, falls meine Nachricht untergegangen ist.\n\nBei Interesse antworten Sie einfach auf diese E-Mail oder rufen Sie +33 7 59 55 84 14 an. Andernfalls kein Problem: Ich melde mich nicht mehr.`,
    signoff: "Freundliche Grüsse,",
    unsubscribe: "Kein Interesse? Antworten Sie einfach \"stop\".",
    unsubscribeLink: "Abmelden",
  },
};

function getCopy(lang: string | null | undefined): Copy {
  return COPY[lang ?? "fr"] ?? COPY.fr;
}

function buildFollowupHtml(body: string, c: Copy, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 12px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:560px;">
  <tr><td style="padding:28px 28px 20px;">
    <div style="font-size:15px;color:#374151;line-height:1.7;">${body}</div>
    <div style="margin-top:24px;font-size:14px;color:#374151;">${c.signoff}<br/>
    <strong>KAH Digital</strong><br/>
    <span style="color:#6b7280;font-size:12px;">kah-digital.ch</span></div>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:12px 28px;">
    <p style="margin:0;font-size:11px;color:#9ca3af;">${c.unsubscribe} &mdash; <a href="${unsubscribeUrl}" style="color:#9ca3af;text-decoration:underline;">${c.unsubscribeLink}</a></p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

async function sendFollowup(to: string, subject: string, html: string, text: string, prospectId: string): Promise<void> {
  if (isPlaceholderEmail(to)) throw new Error(`Adresse non prospectable: ${to}`);
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { error } = await resend.emails.send({
    from: getResendFromAddress(),
    to,
    replyTo: "kahdigital42@gmail.com",
    subject,
    html,
    text,
    tags: [{ name: "prospect_id", value: prospectId }],
  });
  if (error) throw new Error(error.message);
}

export async function POST(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  const hasCronAuth = cronSecret && authHeader === `Bearer ${cronSecret}`;
  if (!hasCronAuth) {
    try {
      const supabaseAuth = await createSupabaseServerClient();
      if (!supabaseAuth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const { data: { user } } = await supabaseAuth.auth.getUser();
      if (!user || !isAdminUser(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const dryRun = new URL(req.url).searchParams.get("dry") === "1";
  const supabase = getSupabase();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch").trim();
  const now = Date.now();

  // Interrupteur manuel ou coupe-circuit rebonds : aucune relance non plus.
  const budget = await getSendBudget(supabase, MAX_PER_RUN);
  if (budget.paused) {
    return NextResponse.json({ ok: true, relanceSent: 0, skipped: budget.reason, paused: true });
  }

  const newest = new Date(now - MIN_DAYS * 86400000).toISOString();
  const oldest = new Date(now - MAX_DAYS * 86400000).toISOString();

  const { data: candidates } = await supabase
    .from("prospects")
    .select("id, businessName, website, email, language")
    .eq("status", "sent")
    .is("followup1SentAt", null)
    .is("clickedAt", null)
    .is("bouncedAt", null)
    .not("email", "is", null)
    .lte("sentAt", newest)
    .gte("sentAt", oldest)
    .order("sentAt", { ascending: true })
    .limit(25);

  let relanceSent = 0;
  let blocked = 0;
  let errors = 0;
  const preview: { to: string; subject: string; verdict: string }[] = [];

  for (const p of candidates ?? []) {
    if (relanceSent >= MAX_PER_RUN) break;
    try {
      const c = getCopy(p.language);
      const name = (p.businessName ?? "").trim();
      const html = buildFollowupHtml(c.body(name), c, `${siteUrl}/api/unsubscribe?id=${p.id}`);
      const subject = c.subject(name);

      const verdict = await checkSendable({ to: p.email!, website: p.website, businessName: name, subject, html });
      if (!verdict.ok) {
        blocked++;
        console.log(`[followup] bloqué ${p.website}: ${verdict.reasons.join(", ")}`);
        preview.push({ to: p.email!, subject, verdict: `BLOQUÉ: ${verdict.reasons.join(", ")}` });
        continue;
      }
      if (dryRun) {
        preview.push({ to: p.email!, subject, verdict: "ENVOYABLE" });
        relanceSent++;
        continue;
      }

      await sendFollowup(p.email!, subject, html, `${c.text(name)}\n\n${c.unsubscribe} ${siteUrl}/api/unsubscribe?id=${p.id}`, p.id);
      await supabase.from("prospects").update({ followup1SentAt: new Date().toISOString() }).eq("id", p.id);
      relanceSent++;
      await new Promise((r) => setTimeout(r, 1500));
    } catch (err) {
      errors++;
      console.error("[followup] erreur", p.website, err instanceof Error ? err.message : err);
    }
  }

  return NextResponse.json({ ok: true, relanceSent, blocked, errors, ...(dryRun ? { dryRun: true, preview } : {}) });
}

export async function GET(req: Request) {
  return POST(req);
}
