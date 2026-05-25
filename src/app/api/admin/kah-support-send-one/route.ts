import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const FROM = "KAH Digital <contact@kah-digital.ch>";
const REPLY_TO = "kahdigital42@gmail.com";

type Prospect = {
  id: string;
  name: string;
  email: string;
  company: string;
  sector: string | null;
  contact_role: string | null;
  personal_note: string | null;
};

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function requireAdmin(): Promise<boolean> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch { return false; }
}

function esc(s: string | null | undefined) {
  return (s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildHtml(p: Prospect): string {
  const firstName = (p.name ?? "").split(" ").pop() ?? "Bonjour";
  const company = p.company ?? "votre organisation";
  const role = p.contact_role ?? "votre équipe IT";
  const note = p.personal_note ?? "";
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:28px 36px;">
    <span style="color:#fff;font-size:15px;font-weight:700;">🤖 Assistant IT — KAH Digital</span><br/>
    <span style="color:rgba(255,255,255,.7);font-size:12px;">kah-support.ch</span>
  </div>
  <div style="padding:32px 36px;">
    <p style="color:#111827;font-size:16px;margin:0 0 16px;">Bonjour ${esc(firstName)},</p>
    ${note ? `<p style="color:#374151;font-size:14px;margin:0 0 18px;padding:12px 14px;background:#f9fafb;border-left:3px solid #6366f1;border-radius:0 6px 6px 0;">${esc(note)}</p>` : ""}
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.65;">
      Si vous gérez GLPI pour <strong>${esc(company)}</strong>, vous savez que le niveau 1 prend la majorité du temps de ${esc(role)} — mots de passe, VPN, impressions, accès logiciels.
    </p>
    <p style="color:#374151;font-size:15px;margin:0 0 22px;line-height:1.65;">
      Notre assistant IA se connecte à votre GLPI en <strong>5 minutes</strong> et traite ces demandes 24h/24 — il répond à l'utilisateur et crée automatiquement le ticket avec priorité et catégorie.
    </p>
    <div style="background:#f0f0ff;border:1px solid #c7d2fe;border-radius:8px;padding:18px 22px;margin-bottom:26px;text-align:center;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:6px;"><div style="font-size:26px;font-weight:900;color:#6366f1;">70%</div><div style="font-size:11px;color:#6b7280;">tickets auto-résolus</div></td>
          <td style="padding:6px;"><div style="font-size:26px;font-weight:900;color:#6366f1;">8 min</div><div style="font-size:11px;color:#6b7280;">économisées/ticket</div></td>
          <td style="padding:6px;"><div style="font-size:26px;font-weight:900;color:#6366f1;">&lt;1 mois</div><div style="font-size:11px;color:#6b7280;">pour le ROI</div></td>
        </tr>
      </table>
    </div>
    <div style="text-align:center;margin-bottom:26px;">
      <a href="https://kah-support.ch/glpi" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Voir l'intégration GLPI →</a>
    </div>
    <p style="color:#6b7280;font-size:13px;line-height:1.6;">Compatible GLPI 9.5.x et 10.x — on-premise et cloud. Aucun plugin à installer.</p>
  </div>
  <div style="padding:18px 36px;background:#f9fafb;border-top:1px solid #e5e7eb;">
    <p style="color:#6b7280;font-size:13px;margin:0;"><strong>PS :</strong> Si vous voulez voir ça sur un GLPI réel, répondez à cet email pour une démo de 10 min.</p>
  </div>
  <div style="padding:14px 36px;text-align:center;border-top:1px solid #f3f4f6;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">KAH Digital · <a href="https://kah-support.ch" style="color:#9ca3af;">kah-support.ch</a></p>
  </div>
</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "RESEND_API_KEY manquant" }, { status: 500 });
  }

  const { id } = await req.json() as { id: string };
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = getSupabase();

  const { data: row, error: fetchError } = await supabase
    .from("kah_support_prospects")
    .select("id, name, email, company, sector, contact_role, personal_note, status")
    .eq("id", id)
    .single();

  if (fetchError || !row) {
    return NextResponse.json({ error: "Prospect introuvable" }, { status: 404 });
  }

  const p = row as Prospect & { status: string };
  if (p.status !== "pending") {
    return NextResponse.json({ error: "Déjà envoyé", skipped: true });
  }

  const subject = `${p.company} + IA : 70% de tickets GLPI en moins`;
  const html = buildHtml(p);

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM, to: [p.email], reply_to: [REPLY_TO], subject, html }),
  });

  const resendData = await resendRes.json() as { id?: string; message?: string };
  if (!resendRes.ok) {
    return NextResponse.json({ error: resendData.message ?? `Resend HTTP ${resendRes.status}`, email: p.email }, { status: 500 });
  }

  await supabase
    .from("kah_support_prospects")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", id);

  return NextResponse.json({ ok: true, email: p.email, company: p.company, resendId: resendData.id });
}
