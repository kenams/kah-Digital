/**
 * Follow-up kah-support-prospects
 * J+3 : pas répondu → relance courte
 * J+7 : toujours pas répondu → dernier contact + offre démo
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function authorize(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  return !secret || auth === `Bearer ${secret}`;
}

function esc(s: string | null | undefined) {
  return (s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildFollowup1Html(firstName: string, company: string): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<div style="max-width:560px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:22px 32px;">
    <span style="color:#fff;font-size:14px;font-weight:700;">🤖 KAH Digital — Assistant IT</span>
  </div>
  <div style="padding:28px 32px;">
    <p style="color:#111827;font-size:15px;margin:0 0 14px;">Bonjour ${esc(firstName)},</p>
    <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 18px;">
      Je voulais m'assurer que mon message précédent vous est bien parvenu concernant <strong>${esc(company)}</strong>.
    </p>
    <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 22px;">
      En une phrase : notre assistant IA répond automatiquement aux demandes IT répétitives de vos utilisateurs 24h/24, et les tickets sont créés dans votre outil de ticketing sans intervention manuelle.
    </p>
    <div style="text-align:center;margin-bottom:20px;">
      <a href="https://kah-support.ch"
         style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
        Voir la démo gratuite →
      </a>
    </div>
    <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.6;">
      Si ce n'est pas le bon moment, pas de problème — répondez simplement "plus tard" et je ne vous recontacte pas avant 3 mois.
    </p>
  </div>
  <div style="padding:14px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">KAH Digital · kah-support.ch · kahdigital42@gmail.com</p>
  </div>
</div>
</body></html>`;
}

function buildFollowup2Html(firstName: string, company: string): string {
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<div style="max-width:560px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:22px 32px;">
    <span style="color:#fff;font-size:14px;font-weight:700;">🤖 KAH Digital — Assistant IT</span>
  </div>
  <div style="padding:28px 32px;">
    <p style="color:#111827;font-size:15px;margin:0 0 14px;">Bonjour ${esc(firstName)},</p>
    <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 18px;">
      C'est mon dernier message concernant <strong>${esc(company)}</strong>. Je comprends que le timing n'est peut-être pas le bon.
    </p>
    <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 22px;">
      Si jamais vous cherchez à réduire la charge de votre support IT dans les prochains mois, notre assistant est disponible à tout moment sur <a href="https://kah-support.ch" style="color:#6366f1;">kah-support.ch</a> avec un essai gratuit de 14 jours.
    </p>
    <p style="color:#374151;font-size:14px;line-height:1.7;margin:0 0 18px;padding:12px;background:#fef9c3;border-left:3px solid #f59e0b;border-radius:0 6px 6px 0;">
      <strong>Offre spéciale :</strong> Si vous répondez à cet email cette semaine, je vous offre une session de configuration personnalisée de 30 min — gratuite, sans engagement.
    </p>
    <div style="text-align:center;margin-bottom:16px;">
      <a href="https://kah-support.ch"
         style="display:inline-block;background:#1f2937;color:#fff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">
        Démarrer l'essai gratuit →
      </a>
    </div>
  </div>
  <div style="padding:14px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;text-align:center;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">KAH Digital · kah-support.ch · kahdigital42@gmail.com</p>
  </div>
</div>
</body></html>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "KAH Digital <contact@kah-digital.ch>",
      to: [to],
      reply_to: ["kahdigital42@gmail.com"],
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend HTTP ${res.status}`);
}

export async function GET(req: Request) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabase();
  const now = new Date();
  const j3Cutoff  = new Date(now.getTime() - 3  * 86400000).toISOString();
  const j7Cutoff  = new Date(now.getTime() - 7  * 86400000).toISOString();
  const j14Cutoff = new Date(now.getTime() - 14 * 86400000).toISOString();

  let f1 = 0, f2 = 0, errors = 0;

  // ── Follow-up 1 (J+3) : envoyé il y a 3-7 jours, pas répondu, pas encore relancé ──
  const { data: f1Prospects } = await supabase
    .from("kah_support_prospects")
    .select("id, name, email, company")
    .eq("status", "sent")
    .is("replied_at", null)
    .is("unsubscribed_at", null)
    .is("followup1_sent_at", null)
    .lte("sent_at", j3Cutoff)
    .gte("sent_at", j7Cutoff)
    .not("email", "is", null)
    .limit(10);

  for (const p of (f1Prospects ?? [])) {
    try {
      const firstName = (p.name ?? "").split(" ").pop() ?? "Bonjour";
      const html = buildFollowup1Html(firstName, p.company ?? "votre organisation");
      await sendEmail(p.email, `Re: support IT de ${p.company ?? "votre organisation"}`, html);
      await supabase.from("kah_support_prospects")
        .update({ followup1_sent_at: now.toISOString() })
        .eq("id", p.id);
      f1++;
      await new Promise((r) => setTimeout(r, 1200));
    } catch { errors++; }
  }

  // ── Follow-up 2 (J+7) : envoyé il y a 7-14 jours, pas répondu, pas encore relancé J+7 ──
  const { data: f2Prospects } = await supabase
    .from("kah_support_prospects")
    .select("id, name, email, company")
    .eq("status", "sent")
    .is("replied_at", null)
    .is("unsubscribed_at", null)
    .is("followup2_sent_at", null)
    .lte("sent_at", j7Cutoff)
    .gte("sent_at", j14Cutoff)
    .not("email", "is", null)
    .limit(10);

  for (const p of (f2Prospects ?? [])) {
    try {
      const firstName = (p.name ?? "").split(" ").pop() ?? "Bonjour";
      const html = buildFollowup2Html(firstName, p.company ?? "votre organisation");
      await sendEmail(p.email, `Dernier message — ${p.company ?? "votre organisation"}`, html);
      await supabase.from("kah_support_prospects")
        .update({ followup2_sent_at: now.toISOString() })
        .eq("id", p.id);
      f2++;
      await new Promise((r) => setTimeout(r, 1200));
    } catch { errors++; }
  }

  return NextResponse.json({ ok: true, followup1: f1, followup2: f2, errors });
}

export async function POST(req: Request) { return GET(req); }
