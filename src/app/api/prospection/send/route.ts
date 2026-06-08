import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getResendFromAddress } from "@/lib/mail";
import { sanitizeEmailSubject } from "@/lib/prospection-email";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

async function requireAdmin(): Promise<boolean> {
  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;
    const { data: { user } } = await supabaseAuth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json() as { prospectId?: string; overrideEmail?: string; overrideSubject?: string; overrideBody?: string };
    const { prospectId, overrideEmail, overrideSubject, overrideBody } = body;

    if (!prospectId) {
      return NextResponse.json({ error: "prospectId requis" }, { status: 400 });
    }

    const supabase = getSupabase();
    const { data: prospect, error } = await supabase
      .from("prospects")
      .select("*")
      .eq("id", prospectId)
      .single();

    if (error || !prospect) {
      return NextResponse.json({ error: "Prospect introuvable" }, { status: 404 });
    }

    const toEmail = overrideEmail ?? prospect.email;
    if (!toEmail) {
      return NextResponse.json({ error: "Email destinataire manquant" }, { status: 400 });
    }

    const subject = sanitizeEmailSubject(
      overrideSubject ?? prospect.emailSubject ?? "Votre site web - analyse gratuite par KAH Digital"
    );
    const htmlBody = overrideBody ?? prospect.emailBody;

    if (!htmlBody) {
      return NextResponse.json({ error: "Corps email manquant — lancez d'abord l'analyse" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json({ error: "RESEND_API_KEY manquant" }, { status: 500 });
    }

    const resend = new Resend(resendKey);
    const emailHtml = wrapEmailHtml(prospect.businessName ?? prospect.website, htmlBody);

    const { error: sendError } = await resend.emails.send({
      from: getResendFromAddress(),
      to: toEmail,
      replyTo: "kahdigital42@gmail.com",
      subject,
      html: emailHtml,
    });

    if (sendError) {
      return NextResponse.json({ error: `Resend: ${sendError.message}` }, { status: 500 });
    }

    await supabase
      .from("prospects")
      .update({ status: "sent", sentAt: new Date().toISOString(), email: toEmail })
      .eq("id", prospectId);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function wrapEmailHtml(businessName: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Audit gratuit de votre site web</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
      <tr>
        <td style="background:linear-gradient(135deg,#1e40af,#7c3aed);padding:28px 32px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">KAH Digital</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">Studio digital — sites, apps &amp; solutions</p>
        </td>
      </tr>
      <tr>
        <td style="padding:32px;">
          <div style="font-size:15px;line-height:1.7;color:#374151;">
            ${body}
          </div>
        </td>
      </tr>
      <tr>
        <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:12px;color:#6b7280;line-height:1.5;">
            KAH Digital — Studio digital &bull;
            <a href="https://KAH Digital.ch" style="color:#3b82f6;text-decoration:none;">KAH Digital.ch</a><br/>
            Cet email vous a été envoyé car votre site web est publiquement accessible.
            Pour ne plus recevoir de communications de notre part, répondez avec "STOP".
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}
