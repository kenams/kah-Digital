/**
 * One-shot blast aux prospects qui ont cliqué mais pas répondu.
 * Email court, humain, direct — propose un appel 20min.
 * Marque les prospects comme "hot" après envoi.
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { sendTelegramAlert } from "@/lib/notify";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { checkSendable } from "@/lib/prospect-send-gate";
import { getSendBudget, isScannerClick } from "@/lib/prospection-safety";
import { PROSPECTION_FROM } from "@/lib/prospection-sender";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const CALENDLY = "https://calendly.com/kahdigital42";
const SITE = "https://kah-digital.ch";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function authorize(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") === `Bearer ${secret}`) return true;
  try {
    const sb = await createSupabaseServerClient();
    if (!sb) return false;
    const { data: { user } } = await sb.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch { return false; }
}

// ─── Templates par langue ────────────────────────────────────────────────────

const COPY: Record<string, {
  subject: (name: string) => string;
  body: (name: string, id: string) => string;
}> = {
  fr: {
    subject: (n) => `Re: ${n} — vous avez consulté notre proposition`,
    body: (n, id) => `Bonjour,

Je vois que vous avez consulté notre analyse pour <strong>${n}</strong>.

Je ne veux pas vous noyer de messages — juste vous proposer un appel de 20 minutes pour voir si on peut vous aider concrètement.

Pas de présentation commerciale. On regarde votre situation ensemble et je vous dis franchement si ça a du sens ou pas.

<a href="${CALENDLY}?utm_source=blast&utm_medium=email&utm_campaign=clickers" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:13px 32px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:15px;">📅 Choisir un créneau →</a>

Ou répondez directement à cet email si vous préférez.`,
  },
  en: {
    subject: (n) => `Re: ${n} — you checked out our proposal`,
    body: (n, id) => `Hi,

I saw you had a look at our analysis for <strong>${n}</strong>.

I'll keep this short — would a 20-minute call make sense to see if we can genuinely help?

No pitch, no slides. Just an honest look at your situation and I'll tell you straight if it's worth pursuing.

<a href="${CALENDLY}?utm_source=blast&utm_medium=email&utm_campaign=clickers" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:13px 32px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:15px;">📅 Pick a time →</a>

Or just reply to this email — whichever is easier.`,
  },
  es: {
    subject: (n) => `Re: ${n} — revisó nuestra propuesta`,
    body: (n, id) => `Hola,

Vi que revisó nuestro análisis para <strong>${n}</strong>.

Le escribo brevemente para proponer una llamada de 20 minutos — sin presentación comercial, solo una conversación honesta sobre si podemos ayudarle de verdad.

<a href="${CALENDLY}?utm_source=blast&utm_medium=email&utm_campaign=clickers" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:13px 32px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:15px;">📅 Elegir un horario →</a>

O responda directamente a este email si lo prefiere.`,
  },
  de: {
    subject: (n) => `Re: ${n} — Sie haben unser Angebot angesehen`,
    body: (n, id) => `Hallo,

Ich habe gesehen, dass Sie unsere Analyse für <strong>${n}</strong> angeschaut haben.

Ich halte es kurz — würde ein 20-minütiges Gespräch Sinn machen, um zu sehen ob wir wirklich helfen können?

Keine Präsentation, kein Verkaufsgespräch. Nur ein ehrlicher Blick auf Ihre Situation.

<a href="${CALENDLY}?utm_source=blast&utm_medium=email&utm_campaign=clickers" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:13px 32px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:15px;">📅 Termin auswählen →</a>

Oder antworten Sie direkt auf diese E-Mail.`,
  },
  it: {
    subject: (n) => `Re: ${n} — ha visto la nostra proposta`,
    body: (n, id) => `Buongiorno,

Ho visto che ha consultato la nostra analisi per <strong>${n}</strong>.

Propongo una chiamata di 20 minuti — senza presentazione commerciale, solo una conversazione onesta per capire se possiamo aiutarla concretamente.

<a href="${CALENDLY}?utm_source=blast&utm_medium=email&utm_campaign=clickers" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:13px 32px;border-radius:9999px;text-decoration:none;font-weight:700;font-size:15px;">📅 Scegliere un orario →</a>

O risponda direttamente a questa email.`,
  },
};

function buildHtml(body: string, lang: string, id: string): string {
  const unsub = lang === "fr" ? "Se désabonner" : lang === "es" ? "Darse de baja" : lang === "de" ? "Abmelden" : "Unsubscribe";
  return `<!DOCTYPE html><html lang="${lang}">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 12px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:560px;">
  <tr><td style="background:linear-gradient(135deg,#1e3a8a,#7c3aed);padding:18px 28px;">
    <div style="color:#fff;font-size:18px;font-weight:800;">KAH Digital Studio</div>
    <div style="color:rgba(255,255,255,0.6);font-size:11px;">Studio digital — sites, apps & IA</div>
  </td></tr>
  <tr><td style="padding:28px 28px 20px;">
    <div style="font-size:15px;color:#374151;line-height:1.8;white-space:pre-line;">${body}</div>
    <div style="margin-top:28px;font-size:14px;color:#374151;">
      KAH Digital Studio<br/>
      <span style="color:#6b7280;font-size:12px;">kahdigital42@gmail.com · <a href="${SITE}" style="color:#7c3aed;">kah-digital.ch</a></span>
    </div>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:12px 28px;">
    <p style="margin:0;font-size:11px;color:#9ca3af;">
      <a href="${SITE}/api/unsubscribe?id=${id}" style="color:#9ca3af;">${unsub}</a>
    </p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

// ─── Route ───────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const sb = getSupabase();
  const resend = new Resend(process.env.RESEND_API_KEY!);

  // Peu mais sûr : 3 envois maximum par passage, interrupteur et coupe-circuit rebonds respectés.
  const MAX_PER_PASS = 3;
  const budget = await getSendBudget(sb, MAX_PER_PASS);
  if (budget.paused) return NextResponse.json({ ok: true, sent: 0, paused: true, message: budget.reason });

  // Prospects qui ont cliqué mais pas répondu + pas encore "hot"
  const { data: clickers } = await sb
    .from("prospects")
    .select("id, businessName, website, email, language, clickedAt, sentAt, followup1SentAt, followup2SentAt, followup3SentAt")
    .not("clickedAt", "is", null)
    .not("status", "in", '("replied","rejected","hot","unsubscribed")')
    .is("bouncedAt", null)
    .order("clickedAt", { ascending: false })
    .limit(30);

  if (!clickers?.length) {
    return NextResponse.json({ ok: true, sent: 0, message: "Aucun cliqueur à relancer" });
  }

  let sent = 0;
  const failed: string[] = [];

  for (const p of clickers) {
    if (sent >= MAX_PER_PASS) break;
    if (!p.email) continue;
    // Clic dans les 2 minutes après un envoi = scanner anti-spam, pas une personne.
    if (isScannerClick(Date.parse(p.clickedAt), [p.sentAt, p.followup1SentAt, p.followup2SentAt, p.followup3SentAt])) continue;
    const lang = p.language ?? "fr";
    const copy = COPY[lang] ?? COPY.fr;
    const name = p.businessName ?? p.website ?? "votre entreprise";
    const body = copy.body(name, p.id);
    const html = buildHtml(body, lang, p.id);

    try {
      const verdict = await checkSendable({ to: p.email, website: p.website, businessName: name, subject: copy.subject(name), html });
      if (!verdict.ok) {
        failed.push(`${p.email}: bloqué (${verdict.reasons.join(", ")})`);
        continue;
      }
      const { error } = await resend.emails.send({
        from: PROSPECTION_FROM,
        to: p.email,
        replyTo: "kahdigital42@gmail.com",
        subject: copy.subject(name),
        html,
      });
      if (error) throw new Error(error.message);

      await sb.from("prospects").update({
        status: "hot",
        followup2SentAt: new Date().toISOString(),
      }).eq("id", p.id);

      sent++;
      await new Promise((r) => setTimeout(r, 1200));
    } catch (e) {
      failed.push(`${p.email}: ${e}`);
    }
  }

  await sendTelegramAlert(
    `🔥 <b>BLAST CLIQUEURS ENVOYÉ</b>\n\n` +
    `✅ ${sent} emails envoyés\n` +
    `${failed.length ? `❌ ${failed.length} échecs\n` : ""}` +
    `\nCes prospects sont maintenant marqués <b>hot</b> 🔥\nSuive les réponses sur <a href="${SITE}/admin/prospection">l'admin</a>`
  ).catch(console.error);

  return NextResponse.json({ ok: true, sent, failed });
}

// GET ne déclenche JAMAIS d'envoi (un simple aperçu de lien ou un rechargement ne doit pas envoyer de mails).
export async function GET(req: Request) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, info: "POST pour lancer (3 envois maximum par passage)" });
}
