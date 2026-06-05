/**
 * Prospection Vellio — créateurs de contenu lifestyle/déco/design
 * Angle : programme d'affiliation (10% sur chaque vente générée)
 * Cible : micro-influenceurs Instagram/TikTok déco, lifestyle, minimalisme (5k-50k followers)
 * Logique : 1 seul email — proposition directe, simple, rentable pour eux
 */
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const FROM = "Vellio <contact@kah-digital.ch>";
const REPLY_TO = "kahdigital42@gmail.com";
const APP_URL = "https://vellio-shop.vercel.app";

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

type VProspect = { id: string; name: string; email: string; instagram_handle?: string | null; follower_count?: number | null };

function buildVellioAffiliate(p: VProspect) {
  const first = esc(p.name?.split(" ").pop() ?? "Bonjour");
  const handle = p.instagram_handle ? `@${esc(p.instagram_handle)}` : "votre audience";
  const subject = `Collaboration Vellio × ${esc(p.name)} — 10% sur chaque vente`;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f7f3ea;font-family:Georgia,serif;">
<div style="max-width:560px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e8e2d8;">
  <div style="background:#0b0b0c;padding:28px 36px;text-align:center;">
    <div style="color:#c8a96e;font-size:24px;font-weight:700;letter-spacing:0.08em;">V e l l i o</div>
    <div style="color:rgba(255,255,255,.4);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-top:4px;">Maison de sélection contemporaine</div>
  </div>
  <div style="height:2px;background:linear-gradient(90deg,transparent,#c8a96e,transparent);"></div>
  <div style="padding:36px;">
    <p style="color:#0b0b0c;font-size:16px;margin:0 0 16px;">Bonjour ${first},</p>
    <p style="color:#444;font-size:15px;line-height:1.7;margin:0 0 16px;">
      Je suis tombé sur ${handle} et votre univers correspond exactement à ce que Vellio défend : des objets pensés pour clarifier le quotidien, sans compromis sur la qualité.
    </p>
    <p style="color:#444;font-size:15px;line-height:1.7;margin:0 0 24px;">
      Je vous propose une collaboration simple et rentable :
    </p>
    <div style="background:#f7f3ea;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
      <p style="color:#c8a96e;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;margin:0 0 12px;">Programme affiliation Vellio</p>
      <div style="color:#333;font-size:14px;line-height:1.8;">
        <div>✦ <strong>10% de commission</strong> sur chaque vente générée par votre lien</div>
        <div>✦ Lien tracké unique — paiement mensuel automatique</div>
        <div>✦ Accès anticipé aux nouvelles pièces avant tout le monde</div>
        <div>✦ 1 sélection offerte à vous présenter (valeur 80-150€)</div>
      </div>
    </div>
    <p style="color:#444;font-size:14px;line-height:1.7;margin:0 0 24px;">
      Pas de quota minimum, pas d'exclusivité. Vous partagez quand ça vous parle — et vous êtes commissionnés à chaque achat.
    </p>
    <div style="text-align:center;margin-bottom:20px;">
      <a href="${APP_URL}?utm_source=affiliate_cold&utm_campaign=creator" style="display:inline-block;background:#0b0b0c;color:#c8a96e;padding:14px 32px;border-radius:999px;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.04em;">Découvrir la collection →</a>
    </div>
    <p style="color:#888;font-size:13px;text-align:center;margin:0;">Répondez à cet email pour que je vous envoie votre lien affilié personnalisé.</p>
  </div>
  <div style="padding:16px 36px;background:#f7f3ea;border-top:1px solid #e8e2d8;text-align:center;">
    <p style="color:#999;font-size:11px;margin:0;">Vellio · <a href="https://kah-digital.ch/unsubscribe" style="color:#999;">Se désabonner</a></p>
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
  const { data: pending } = await supabase.from("vellio_prospects").select("*").eq("status", "pending").is("sent_at", null).limit(15);

  let sent = 0, failed = 0;
  for (const p of (pending ?? []) as VProspect[]) {
    try {
      const { subject, html } = buildVellioAffiliate(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("vellio_prospects").update({ status: "sent", sent_at: new Date().toISOString() }).eq("id", p.id);
      sent++;
    } catch { failed++; }
  }

  return NextResponse.json({ sent, failed });
}

export async function POST(req: Request) { return GET(req); }
