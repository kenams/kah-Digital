/**
 * Séquence prospection Kotizy — 2 emails
 * Cible : organisateurs de tontines, leaders d'associations diaspora, chefs de communautés africaines
 * Angle : "vous gérez déjà une tontine, on la digitalise pour vous — gratuit"
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const FROM = "Kotizy <contact@kah-digital.ch>";
const REPLY_TO = "kahdigital42@gmail.com";
const APP_URL = "https://tontineapp-web.vercel.app";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function authorize(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && req.headers.get("authorization") === `Bearer ${cronSecret}`) return true;
  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;
    const { data: { user } } = await supabaseAuth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch { return false; }
}

function esc(s?: string | null) {
  return (s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type KProspect = {
  id: string; name: string; email: string; company: string;
  country?: string | null; personal_note?: string | null;
};

// ── J0 — Cold warm ──────────────────────────────────────────────────────────
function buildKotizyJ0(p: KProspect) {
  const first = esc(p.name?.split(" ").pop() ?? "Bonjour");
  const org = esc(p.company ?? "votre association");
  const note = p.personal_note ? `<p style="color:#374151;font-size:14px;margin:0 0 16px;padding:12px 14px;background:#f0fdf4;border-left:3px solid #22c55e;border-radius:0 6px 6px 0;">${esc(p.personal_note)}</p>` : "";
  const subject = `${esc(p.company)} — votre tontine mérite mieux que WhatsApp`;

  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f0fdf4;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.1);">
  <div style="background:linear-gradient(135deg,#16a34a,#059669);padding:28px 36px;">
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="width:36px;height:36px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900;color:#16a34a;font-size:18px;">K</div>
      <div><span style="color:#fff;font-size:16px;font-weight:700;">Kotizy</span><br><span style="color:rgba(255,255,255,.7);font-size:11px;">La tontine digitale de la diaspora</span></div>
    </div>
  </div>
  <div style="padding:32px 36px;">
    <p style="color:#111;font-size:16px;margin:0 0 16px;">Bonjour ${first},</p>
    ${note}
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.65;">
      Je pense que <strong>${org}</strong> organise peut-être des tontines ou des épargnes collectives — c'est au cœur de beaucoup d'associations de la diaspora.
    </p>
    <p style="color:#374151;font-size:15px;margin:0 0 20px;line-height:1.65;">
      Si c'est le cas, j'imagine que ça se passe encore sur WhatsApp, par virement manuel, avec des tableurs — et que les relances sont épuisantes.
    </p>
    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
      <p style="color:#15803d;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin:0 0 12px;">Ce que Kotizy fait pour vous</p>
      <div style="display:grid;gap:8px;">
        ${["✅ Cotisations automatiques — chaque membre paye en 1 clic",
           "✅ Wallet multi-devises — EUR en Europe, XOF/NGN/GHS en Afrique",
           "✅ Ordre de passage automatique + relances 3 jours avant",
           "✅ Fonds d'urgence + protection si quelqu'un ne paie pas",
           "✅ App Android + PWA iPhone — gratuit pour commencer"].map(t => `<div style="font-size:14px;color:#374151;">${t}</div>`).join("")}
      </div>
    </div>
    <div style="text-align:center;margin-bottom:20px;">
      <a href="${APP_URL}?utm_source=diaspora_cold&utm_campaign=j0" style="display:inline-block;background:linear-gradient(135deg,#16a34a,#059669);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Créer ma tontine en 2 minutes →</a>
    </div>
    <p style="text-align:center;color:#6b7280;font-size:12px;">Gratuit · Sans carte bancaire · APK Android disponible</p>
  </div>
  <div style="padding:16px 36px;background:#fef9c3;border-top:1px solid #fef08a;">
    <p style="color:#78350f;font-size:13px;margin:0;line-height:1.6;"><strong>PS :</strong> Si vous gérez déjà une tontine active, je peux vous aider à la migrer sur Kotizy en 15 minutes. Répondez à cet email.</p>
  </div>
  <div style="padding:12px 36px;text-align:center;border-top:1px solid #f3f4f6;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">Kotizy by KAH Digital · <a href="https://kah-digital.ch/unsubscribe" style="color:#9ca3af;">Se désabonner</a></p>
  </div>
</div></body></html>`;
  return { subject, html };
}

// ── J+5 — Relance avec preuve sociale ──────────────────────────────────────
function buildKotizyJ5(p: KProspect) {
  const first = esc(p.name?.split(" ").pop() ?? "Bonjour");
  const subject = `Re: votre tontine — 1 question rapide`;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f0fdf4;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.1);">
  <div style="background:#1a2e1a;padding:20px 36px;">
    <span style="color:#86efac;font-size:13px;font-weight:700;">Kotizy · Suivi</span>
  </div>
  <div style="padding:32px 36px;">
    <p style="color:#111;font-size:16px;margin:0 0 16px;">Bonjour ${first},</p>
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.65;">
      Je reviens brièvement — juste une question directe :
    </p>
    <div style="background:#f9fafb;border-radius:10px;padding:20px;border-left:4px solid #22c55e;margin-bottom:24px;">
      <p style="color:#111;font-size:16px;font-weight:700;margin:0 0 8px;">Qui gère les relances dans votre tontine actuelle ?</p>
      <p style="color:#6b7280;font-size:13px;margin:0;">Si c'est vous — vous passez probablement des heures chaque mois à relancer, calculer, vérifier. Kotizy automatise tout ça.</p>
    </div>
    <p style="color:#374151;font-size:14px;margin:0 0 20px;line-height:1.6;">
      En ce moment, <strong>des groupes diaspora en France, Suisse et Belgique</strong> gèrent leurs tontines sur Kotizy. Leurs membres paient depuis l'Europe, et les familles reçoivent directement en XOF, NGN ou GHS.
    </p>
    <div style="text-align:center;margin-bottom:20px;">
      <a href="${APP_URL}/register?utm_source=diaspora_cold&utm_campaign=j5" style="display:inline-block;background:#22c55e;color:#0a0a0a;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Essayer Kotizy gratuitement →</a>
    </div>
    <p style="color:#6b7280;font-size:12px;text-align:center;">APK Android · PWA iPhone · Multi-devises EUR/XOF/NGN</p>
  </div>
  <div style="padding:12px 36px;text-align:center;border-top:1px solid #f3f4f6;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">Kotizy · <a href="https://kah-digital.ch/unsubscribe" style="color:#9ca3af;">Se désabonner</a></p>
  </div>
</div></body></html>`;
  return { subject, html };
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [to], reply_to: [REPLY_TO], subject, html }),
  });
  const data = await res.json() as { id?: string; message?: string };
  if (!res.ok) throw new Error(data.message ?? `HTTP ${res.status}`);
  return data.id;
}

export async function GET(req: Request) {
  if (!(await authorize(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "RESEND_API_KEY manquant" }, { status: 500 });

  const supabase = getSupabase();
  const now = new Date();
  const d5ago = new Date(now.getTime() - 5 * 86400000).toISOString();

  let sent = 0, failed = 0;
  const results: { email: string; step: string; ok: boolean }[] = [];

  // J0 — cold
  const { data: cold } = await supabase.from("kotizy_prospects").select("*").eq("status", "pending").is("sent_at", null).limit(20);
  for (const p of (cold ?? []) as KProspect[]) {
    try {
      const { subject, html } = buildKotizyJ0(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("kotizy_prospects").update({ status: "sent", sent_at: now.toISOString() }).eq("id", p.id);
      results.push({ email: p.email, step: "J0", ok: true }); sent++;
    } catch { results.push({ email: p.email, step: "J0", ok: false }); failed++; }
  }

  // J+5 — relance
  const { data: follow } = await supabase.from("kotizy_prospects").select("*").eq("status", "sent").is("followup1_sent_at", null).lte("sent_at", d5ago).limit(20);
  for (const p of (follow ?? []) as KProspect[]) {
    try {
      const { subject, html } = buildKotizyJ5(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("kotizy_prospects").update({ followup1_sent_at: now.toISOString(), status: "completed" }).eq("id", p.id);
      results.push({ email: p.email, step: "J5", ok: true }); sent++;
    } catch { results.push({ email: p.email, step: "J5", ok: false }); failed++; }
  }

  return NextResponse.json({ sent, failed, results });
}

export async function POST(req: Request) { return GET(req); }
