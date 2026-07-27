import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

const FROM = "KAH Digital <contact@kah-digital.ch>";
const REPLY_TO = "kahdigital42@gmail.com";
const APP_URL = "https://kah-workforce.vercel.app";

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
  const note = p.personal_note ?? "";
  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08);">
  <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:28px 36px;">
    <span style="color:#fff;font-size:15px;font-weight:700;">🤖 KAH Workforce — KAH Digital</span><br/>
    <span style="color:rgba(255,255,255,.7);font-size:12px;">kah-workforce.vercel.app</span>
  </div>
  <div style="padding:32px 36px;">
    <p style="color:#111827;font-size:16px;margin:0 0 16px;">Bonjour ${esc(firstName)},</p>
    ${note ? `<p style="color:#374151;font-size:14px;margin:0 0 18px;padding:12px 14px;background:#f9fafb;border-left:3px solid #6366f1;border-radius:0 6px 6px 0;">${esc(note)}</p>` : ""}
    <p style="color:#374151;font-size:15px;margin:0 0 16px;line-height:1.65;">
      Entre les emails à trier, les factures à relancer et les échéances à suivre, l'administratif prend vite plus de temps que le travail lui-même.
    </p>
    <p style="color:#374151;font-size:15px;margin:0 0 22px;line-height:1.65;">
      KAH Workforce est une équipe d'employés IA qui s'en charge à ta place — un vrai résumé chaque matin, aucune action envoyée sans ta validation.
    </p>
    <div style="text-align:center;margin-bottom:26px;">
      <a href="${APP_URL}" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">Voir KAH Workforce →</a>
    </div>
    <p style="color:#6b7280;font-size:13px;line-height:1.6;">Gratuit pour commencer, sans carte bancaire.</p>
  </div>
  <div style="padding:18px 36px;background:#f9fafb;border-top:1px solid #e5e7eb;">
    <p style="color:#6b7280;font-size:13px;margin:0;"><strong>PS :</strong> Une question ? Répondez directement à cet email.</p>
  </div>
  <div style="padding:14px 36px;text-align:center;border-top:1px solid #f3f4f6;">
    <p style="color:#9ca3af;font-size:11px;margin:0;">KAH Digital · <a href="${APP_URL}" style="color:#9ca3af;">kah-workforce.vercel.app</a></p>
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
    .from("kah_workforce_prospects")
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

  const subject = `Une équipe qui gère ton administratif à ta place`;
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
    .from("kah_workforce_prospects")
    .update({ status: "sent", sent_at: new Date().toISOString(), sequence_status: "j0_sent" })
    .eq("id", id);

  return NextResponse.json({ ok: true, email: p.email, company: p.company, resendId: resendData.id });
}
