import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const FROM = "KAH Digital <contact@kah-digital.ch>";
const REPLY_TO = "kahdigital42@gmail.com";
const EMAILS_PER_RUN = 5;
const APP_URL = "https://kah-workforce.vercel.app";

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

// ── EMAIL J0 — Cold outreach ──────────────────────────────────────────────
function buildJ0(p: Prospect) {
  const first = esc(p.name?.split(" ").pop() ?? "");
  const greeting = first ? `Bonjour ${first},` : "Bonjour,";
  const subject = `Une équipe qui gère ton administratif à ta place`;
  const noteHtml = p.personal_note
    ? `<p style="font-size:14px;color:#374151;margin:0 0 14px;font-style:italic;">${esc(p.personal_note)}</p>`
    : "";
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#fff;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:15px;color:#111;margin:0 0 16px;line-height:1.6;">${greeting}</p>
  ${noteHtml}
  <p style="font-size:15px;color:#374151;margin:0 0 14px;line-height:1.7;">
    Je te contacte parce que j'ai construit KAH Workforce — une équipe d'employés IA qui trient tes emails, préparent tes relances de factures et suivent tes échéances, chaque matin, sans que tu aies à y penser.
  </p>
  <p style="font-size:15px;color:#374151;margin:0 0 14px;line-height:1.7;">
    Tu gardes toujours le contrôle — aucune action n'est envoyée sans ta validation. Le palier de base (Email Manager + Mémoire) est gratuit.
  </p>
  <p style="font-size:15px;color:#374151;margin:0 0 20px;line-height:1.7;">
    Ça vaut le coup d'y jeter un œil ?
  </p>
  <p style="margin:0 0 8px;">
    <a href="${APP_URL}?utm_source=cold&utm_campaign=j0" style="display:inline-block;background:#6366f1;color:#fff;padding:11px 26px;border-radius:7px;text-decoration:none;font-weight:700;font-size:14px;">Voir KAH Workforce →</a>
  </p>
  <p style="font-size:13px;color:#6b7280;margin:0 0 28px;">Gratuit pour commencer, sans carte bancaire.</p>
  <p style="font-size:15px;color:#374151;margin:0 0 6px;line-height:1.6;">Bonne journée,<br>KAH Digital</p>
  <p style="font-size:12px;color:#9ca3af;margin:0;">${APP_URL} · ${REPLY_TO}</p>
</div>
</body></html>`;
  return { subject, html };
}

// ── EMAIL J+3 — Relance ──────────────────────────────────────────────────
function buildJ3(p: Prospect) {
  const first = esc(p.name?.split(" ").pop() ?? "");
  const greeting = first ? `Bonjour ${first},` : "Bonjour,";
  const subject = `Re: une équipe qui gère ton administratif`;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#fff;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:15px;color:#111;margin:0 0 16px;line-height:1.6;">${greeting}</p>
  <p style="font-size:15px;color:#374151;margin:0 0 14px;line-height:1.7;">
    Je reviens brièvement — pas eu de retour sur mon message précédent.
  </p>
  <p style="font-size:15px;color:#374151;margin:0 0 20px;line-height:1.7;">
    Question directe : combien de temps tu perds chaque semaine entre emails à trier, factures à relancer et échéances à suivre ? KAH Workforce prend ça en charge, gratuitement pour commencer.
  </p>
  <p style="margin:0 0 28px;">
    <a href="${APP_URL}?utm_source=cold&utm_campaign=j3" style="display:inline-block;background:#6366f1;color:#fff;padding:11px 26px;border-radius:7px;text-decoration:none;font-weight:700;font-size:14px;">Voir comment ça marche →</a>
  </p>
  <p style="font-size:15px;color:#374151;margin:0 0 6px;line-height:1.6;">KAH Digital</p>
  <p style="font-size:12px;color:#9ca3af;margin:0;">${REPLY_TO}</p>
</div>
</body></html>`;
  return { subject, html };
}

// ── EMAIL J+7 — Last call ────────────────────────────────────────────────
function buildJ7(p: Prospect) {
  const first = esc(p.name?.split(" ").pop() ?? "");
  const greeting = first ? `Bonjour ${first},` : "Bonjour,";
  const subject = `Dernier message`;
  const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#fff;font-family:Arial,Helvetica,sans-serif;">
<div style="max-width:560px;margin:0 auto;padding:40px 24px;">
  <p style="font-size:15px;color:#111;margin:0 0 16px;line-height:1.6;">${greeting}</p>
  <p style="font-size:15px;color:#374151;margin:0 0 14px;line-height:1.7;">
    C'est mon dernier message, je ne veux pas encombrer ta boîte.
  </p>
  <p style="font-size:15px;color:#374151;margin:0 0 14px;line-height:1.7;">
    Si ce n'est pas le bon moment, pas de souci — bonne continuation.
  </p>
  <p style="font-size:15px;color:#374151;margin:0 0 20px;line-height:1.7;">
    Si tu veux voir ce que KAH Workforce peut faire, le palier gratuit reste disponible à tout moment.
  </p>
  <p style="margin:0 0 28px;">
    <a href="${APP_URL}?utm_source=cold&utm_campaign=j7" style="display:inline-block;background:#374151;color:#fff;padding:11px 26px;border-radius:7px;text-decoration:none;font-weight:700;font-size:14px;">Démarrer gratuitement →</a>
  </p>
  <p style="font-size:15px;color:#374151;margin:0 0 6px;line-height:1.6;">KAH Digital</p>
  <p style="font-size:12px;color:#9ca3af;margin:0;">${APP_URL} · ${REPLY_TO}</p>
</div>
</body></html>`;
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

  const { data: coldProspects } = await supabase
    .from("kah_workforce_prospects")
    .select("id, name, email, company, sector, contact_role, personal_note")
    .in("sequence_status", ["pending", null as never])
    .is("sent_at", null)
    .limit(EMAILS_PER_RUN);

  for (const p of (coldProspects ?? []) as Prospect[]) {
    try {
      const { subject, html } = buildJ0(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("kah_workforce_prospects").update({ status: "sent", sent_at: now.toISOString(), sequence_status: "j0_sent" }).eq("id", p.id);
      results.push({ email: p.email, step: "J0", ok: true }); sent++;
    } catch (e) { results.push({ email: p.email, step: "J0", ok: false, error: String(e) }); failed++; }
  }

  const { data: j3Prospects } = await supabase
    .from("kah_workforce_prospects")
    .select("id, name, email, company, sector, contact_role, personal_note")
    .eq("sequence_status", "j0_sent")
    .is("followup1_sent_at", null)
    .lte("sent_at", d3ago)
    .limit(EMAILS_PER_RUN);

  for (const p of (j3Prospects ?? []) as Prospect[]) {
    try {
      const { subject, html } = buildJ3(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("kah_workforce_prospects").update({ followup1_sent_at: now.toISOString(), sequence_status: "j3_sent" }).eq("id", p.id);
      results.push({ email: p.email, step: "J3", ok: true }); sent++;
    } catch (e) { results.push({ email: p.email, step: "J3", ok: false, error: String(e) }); failed++; }
  }

  const { data: j7Prospects } = await supabase
    .from("kah_workforce_prospects")
    .select("id, name, email, company, sector, contact_role, personal_note")
    .eq("sequence_status", "j3_sent")
    .is("followup2_sent_at", null)
    .lte("followup1_sent_at", d7ago)
    .limit(EMAILS_PER_RUN);

  for (const p of (j7Prospects ?? []) as Prospect[]) {
    try {
      const { subject, html } = buildJ7(p);
      await sendEmail(p.email, subject, html);
      await supabase.from("kah_workforce_prospects").update({ followup2_sent_at: now.toISOString(), sequence_status: "completed" }).eq("id", p.id);
      results.push({ email: p.email, step: "J7", ok: true }); sent++;
    } catch (e) { results.push({ email: p.email, step: "J7", ok: false, error: String(e) }); failed++; }
  }

  return NextResponse.json({ sent, failed, breakdown: { j0: results.filter(r => r.step === "J0").length, j3: results.filter(r => r.step === "J3").length, j7: results.filter(r => r.step === "J7").length }, results });
}

export async function POST(req: Request) { return GET(req); }
