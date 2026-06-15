import { NextResponse } from "next/server";
import { sendTelegramAlert } from "@/lib/notify";
import { sendAdminNotification } from "@/lib/gmail";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const CALENDLY = "https://calendly.com/kahdigital42";

async function sendConfirmation(to: string, name: string | undefined, agent: string | undefined) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const firstName = name?.split(" ")[0] ?? "vous";
  const agentLabel = agent && agent !== "" ? agent : "un agent IA";

  await resend.emails.send({
    from: "KAH Digital <contact@kah-digital.ch>",
    to,
    replyTo: "kahdigital42@gmail.com",
    subject: "Votre demande reçue · KAH Digital",
    html: `<div style="font-family:-apple-system,Arial,sans-serif;max-width:520px;color:#1f2937;font-size:15px;line-height:1.75;">
<p>Bonjour ${firstName},</p>
<p>J'ai bien reçu votre demande concernant <strong>${agentLabel}</strong>.</p>
<p>Je reviens vers vous dans les <strong>2 heures</strong> avec une proposition adaptée à votre activité.</p>
<p>Si vous voulez avancer plus vite, vous pouvez réserver directement un créneau de démo ici :</p>
<p style="text-align:center;margin:28px 0;">
  <a href="${CALENDLY}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:9999px;">
    📅 Réserver ma démo gratuite
  </a>
</p>
<p style="font-size:13px;color:#6b7280;">La démo dure 20 min. On analyse votre cas en direct et je vous montre l'agent IA en fonctionnement sur votre activité.</p>
<p style="margin-top:28px;">À très bientôt,<br/><strong style="color:#111827;">KAH Digital</strong><br/><a href="https://kah-digital.ch" style="color:#7c3aed;font-size:13px;">kah-digital.ch</a></p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
<p style="font-size:11px;color:#9ca3af;">Vous recevez cet email car vous avez soumis un formulaire sur kah-digital.ch.</p>
</div>`,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      agent?: string;
      message?: string;
    };

    const { name, email, agent, message } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    void sendTelegramAlert(
      `🤖 <b>NOUVEAU LEAD AGENTS IA !</b>\n\n` +
      `👤 <b>${name ?? "Anonyme"}</b>\n` +
      `📧 ${email}\n` +
      `🎯 Agent : ${agent ?? "Non précisé"}\n` +
      `${message ? `💬 ${message}\n` : ""}` +
      `\n<a href="https://kah-digital.ch/admin/prospection">📊 Admin</a>`
    ).catch(console.error);

    void sendAdminNotification({
      subject: `🤖 LEAD AGENTS IA — ${name ?? email}`,
      body: `<strong style="color:#7c3aed;font-size:17px;">Nouveau lead page Agents IA !</strong><br/><br/>
<strong>Nom :</strong> ${name ?? "?"}<br/>
<strong>Email :</strong> <a href="mailto:${email}">${email}</a><br/>
<strong>Agent demandé :</strong> ${agent ?? "Non précisé"}<br/>
${message ? `<br/><strong>Message :</strong><br/><div style="background:#f9fafb;border-left:3px solid #7c3aed;padding:12px;margin-top:6px;border-radius:0 6px 6px 0;">${message}</div>` : ""}`,
    }).catch(console.error);

    await sendConfirmation(email, name, agent).catch(console.error);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
