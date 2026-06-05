import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const FROM = "KAH Digital <contact@kah-digital.ch>";
const REPLY_TO = "kahdigital42@gmail.com";
const EMAILS_PER_RUN = 15;
const APP_URL = "https://kah-support.ch";

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

function esc(s: string | null | undefined) {
  return (s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type Prospect = {
  id: string; name: string; email: string; company: string;
  sector: string | null; contact_role: string | null; personal_note: string | null;
};

// ── EMAIL J0 — Cold outreach ──────────────────────────────────────────────────
function buildJ0(p: Prospect) {
  const first = esc(p.name?.split(" ").pop() ?? "Bonjour");
  const co = esc(p.company ?? "votre organisation");
  const note = p.personal_note ? `<p style="color:#374151;font-size:14px;margin:0 0 18px;padding:12px 14px;background:#f9fafb;border-left:3px solid #6366f1;border-radius:0 6px 6px 0;line-height:1.5;">${esc(p.personal_note)}</p>` : "";
  const subject = `${esc(p.company)} — 70% des tickets IT résolus sans technicien`;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:28px 36px;">
    <span style="color:#fff;font-size:15px;font-weight:700;">🤖 Assistant IT — KAH Digital</span><br>
    <span style="color:rgba(255,255,255,.7);font-size:12px;">${APP_URL} · Essai 14j gratuit</span>
  </div>
  <div style="padding:32px 36px;">
    <p style="color:#111;font-size:16px;margin:0 0 16px;">Bonjour ${first},</p>
    ${note}
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.65;">
      Dans la plupart des équipes IT de PME comme <strong>${co}</strong>, 60 à 70% des tickets sont des demandes répétitives — mots de passe, accès logiciels, VPN, imprimantes.
    </p>
    <p style="color:#374151;font-size:15px;margin:0 0 22px;line-height:1.65;">
      Notre assistant IA prend ces demandes en charge 24h/24, répond à l'utilisateur en langage naturel, et crée automatiquement le ticket dans votre GLPI, Freshdesk ou Zendesk — avec priorité, catégorie et description prêtes.
    </p>
    <div style="background:#f0f0ff;border:1px solid #c7d2fe;border-radius:8px;padding:18px 22px;margin-bottom:26px;">
      <p style="color:#4338ca;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;margin:0 0 12px;">Résultats chez nos clients</p>
      <table style="width:100%;text-align:center;"><tr>
        <td><div style="font-size:26px;font-weight:900;color:#6366f1;">70%</div><div style="font-size:11px;color:#6b7280;">tickets auto-résolus</div></td>
        <td><div style="font-size:26px;font-weight:900;color:#6366f1;">&lt;5min</div><div style="font-size:11px;color:#6b7280;">pour déployer</div></td>
        <td><div style="font-size:26px;font-weight:900;color:#6366f1;">24/7</div><div style="font-size:11px;color:#6b7280;">disponible</div></td>
      </tr></table>
    </div>
    <div style="text-align:center;margin-bottom:20px;">
      <a href="${APP_URL}?utm_source=cold&utm_campaign=j0" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Voir une démo de 2 minutes →</a>
    </div>
    <p style="text-align:center;color:#6b7280;font-size:12px;margin:0 0 20px;">Essai 14 jours gratuit · Sans CB · Déploiement en 5 minutes</p>
  </div>
  <div style="padding:16px 36px;background:#fef9c3;border-top:1px solid #fef08a;">
    <p style="color:#78350f;font-size:13px;margin:0;line-height:1.6;"><strong>PS :</strong> Répondez "démo" à cet email — je vous montre l'assistant sur votre helpdesk en 10 minutes.</p>
  </div>
  <div style="padding:14px 36px;text-align:center;border-top:1px solid #f3f4f6;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">KAH Digital · <a href="${APP_URL}" style="color:#9ca3af;">${APP_URL}</a> · ${REPLY_TO}</p>
  </div>
</div></body></html>`;
  return { subject, html };
}

// ── EMAIL J+3 — Relance douce ────────────────────────────────────────────────
function buildJ3(p: Prospect) {
  const first = esc(p.name?.split(" ").pop() ?? "Bonjour");
  const co = esc(p.company ?? "votre organisation");
  const subject = `Re: ${esc(p.company)} — vous avez 2 minutes ?`;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:#1e1b4b;padding:20px 36px;">
    <span style="color:#a5b4fc;font-size:13px;font-weight:700;">🤖 KAH Support · Suivi</span>
  </div>
  <div style="padding:32px 36px;">
    <p style="color:#111;font-size:16px;margin:0 0 16px;">Bonjour ${first},</p>
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.65;">
      Je reviens vers vous brièvement suite à mon message de l'autre jour sur le support IT de <strong>${co}</strong>.
    </p>
    <p style="color:#374151;font-size:15px;margin:0 0 20px;line-height:1.65;">
      Je comprends que ce n'est peut-être pas une priorité en ce moment. Mais si vous avez ne serait-ce que <strong>2 minutes</strong>, je voudrais juste vous poser une question :
    </p>
    <div style="background:#f9fafb;border-radius:10px;padding:20px 24px;margin-bottom:24px;border-left:4px solid #6366f1;">
      <p style="color:#111827;font-size:16px;font-weight:700;margin:0 0 8px;">Combien de tickets répétitifs votre équipe traite par semaine ?</p>
      <p style="color:#6b7280;font-size:13px;margin:0;">Si c'est plus de 20 — notre assistant peut en prendre 70% en charge automatiquement. Résultat : vos techniciens se concentrent sur les vrais problèmes.</p>
    </div>
    <div style="text-align:center;margin-bottom:20px;">
      <a href="${APP_URL}?utm_source=cold&utm_campaign=j3" style="display:inline-block;background:#6366f1;color:#fff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Calculer mes économies en 30 secondes →</a>
    </div>
    <p style="color:#6b7280;font-size:13px;text-align:center;margin:0;">Pas de démo forcée, pas d'engagement. Juste un calcul honnête.</p>
  </div>
  <div style="padding:14px 36px;text-align:center;border-top:1px solid #f3f4f6;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">KAH Digital · ${REPLY_TO}</p>
  </div>
</div></body></html>`;
  return { subject, html };
}

// ── EMAIL J+7 — Last call ─────────────────────────────────────────────────────
function buildJ7(p: Prospect) {
  const first = esc(p.name?.split(" ").pop() ?? "Bonjour");
  const co = esc(p.company ?? "votre organisation");
  const subject = `Dernier message — ${esc(p.company)} et le support IT`;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:#1e1b4b;padding:20px 36px;">
    <span style="color:#a5b4fc;font-size:13px;font-weight:700;">KAH Support · Message final</span>
  </div>
  <div style="padding:32px 36px;">
    <p style="color:#111;font-size:16px;margin:0 0 16px;">Bonjour ${first},</p>
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.65;">
      C'est mon dernier message — je ne veux pas encombrer votre boîte mail.
    </p>
    <p style="color:#374151;font-size:15px;margin:0 0 20px;line-height:1.65;">
      Juste une info concrète avant de partir : une PME de taille comparable à <strong>${co}</strong> a réduit son volume de tickets de 68% en 3 semaines avec notre assistant. Ses techniciens traitent maintenant uniquement les incidents critiques.
    </p>
    <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
      <p style="color:#166534;font-size:14px;font-weight:700;margin:0 0 6px;">Offre valable encore 48h</p>
      <p style="color:#166534;font-size:13px;margin:0;">Essai 14 jours gratuit + onboarding personnalisé offert (valeur 150€) si vous démarrez cette semaine.</p>
    </div>
    <div style="text-align:center;margin-bottom:20px;">
      <a href="${APP_URL}?utm_source=cold&utm_campaign=j7&promo=ONBOARDING_OFFERT" style="display:inline-block;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Démarrer l'essai gratuit →</a>
    </div>
    <p style="color:#6b7280;font-size:13px;text-align:center;margin:0;">Si ce n'est pas le bon moment, pas de souci — bonne continuation à ${co}.</p>
  </div>
  <div style="padding:14px 36px;text-align:center;border-top:1px solid #f3f4f6;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">KAH Digital · ${REPLY_TO} · <a href="https://kah-digital.ch/unsubscribe" style="color:#9ca3af;">Se désabonner</a></p>
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
  const d3ago = new Date(now.getTime() - 3 * 86400000).toISOString();
  const d7ago = new Date(now.getTime() - 7 * 86400000).toISOString();

  let sent = 0, failed = 0;
  const results: { email: string; step: string; ok: boolean; error?: string }[] = [];

  // ── J0 — Cold outreach ──
  const { data: coldProspects } = await supabase
    .from("kah_support_prospects")
    .select("id, name, email, company, sector, contact_role, personal_note")
    .in("sequence_status", ["pending", null as never])
    .is("sent_at", null)
    .limit(EMAILS_PER_RUN);

  for (const p of (coldProspects ?? []) as Prospect[]) {
    try {
      const { subject, html } = buildJ0(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("kah_support_prospects").update({ status: "sent", sent_at: now.toISOString(), sequence_status: "j0_sent" }).eq("id", p.id);
      results.push({ email: p.email, step: "J0", ok: true }); sent++;
    } catch (e) { results.push({ email: p.email, step: "J0", ok: false, error: String(e) }); failed++; }
  }

  // ── J+3 — Relance ──
  const { data: j3Prospects } = await supabase
    .from("kah_support_prospects")
    .select("id, name, email, company, sector, contact_role, personal_note")
    .eq("sequence_status", "j0_sent")
    .is("followup1_sent_at", null)
    .lte("sent_at", d3ago)
    .limit(EMAILS_PER_RUN);

  for (const p of (j3Prospects ?? []) as Prospect[]) {
    try {
      const { subject, html } = buildJ3(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("kah_support_prospects").update({ followup1_sent_at: now.toISOString(), sequence_status: "j3_sent" }).eq("id", p.id);
      results.push({ email: p.email, step: "J3", ok: true }); sent++;
    } catch (e) { results.push({ email: p.email, step: "J3", ok: false, error: String(e) }); failed++; }
  }

  // ── J+7 — Last call ──
  const { data: j7Prospects } = await supabase
    .from("kah_support_prospects")
    .select("id, name, email, company, sector, contact_role, personal_note")
    .eq("sequence_status", "j3_sent")
    .is("followup2_sent_at", null)
    .lte("followup1_sent_at", d7ago)
    .limit(EMAILS_PER_RUN);

  for (const p of (j7Prospects ?? []) as Prospect[]) {
    try {
      const { subject, html } = buildJ7(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("kah_support_prospects").update({ followup2_sent_at: now.toISOString(), sequence_status: "completed" }).eq("id", p.id);
      results.push({ email: p.email, step: "J7", ok: true }); sent++;
    } catch (e) { results.push({ email: p.email, step: "J7", ok: false, error: String(e) }); failed++; }
  }

  return NextResponse.json({ sent, failed, breakdown: { j0: results.filter(r => r.step === "J0").length, j3: results.filter(r => r.step === "J3").length, j7: results.filter(r => r.step === "J7").length }, results });
}

export async function POST(req: Request) { return GET(req); }
