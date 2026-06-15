import { NextResponse } from "next/server";
import { sendTelegramAlert } from "@/lib/notify";
import { sendAdminNotification } from "@/lib/gmail";

export const dynamic = "force-dynamic";

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

    // Telegram — alerte immédiate
    void sendTelegramAlert(
      `🤖 <b>NOUVEAU LEAD AGENTS IA !</b>\n\n` +
      `👤 <b>${name ?? "Anonyme"}</b>\n` +
      `📧 ${email}\n` +
      `🎯 Agent : ${agent ?? "Non précisé"}\n` +
      `${message ? `💬 ${message}\n` : ""}` +
      `\n<a href="https://kah-digital.ch/admin/prospection">📊 Admin</a>`
    ).catch(console.error);

    // Email admin
    void sendAdminNotification({
      subject: `🤖 LEAD AGENTS IA — ${name ?? email}`,
      body: `<strong style="color:#7c3aed;font-size:17px;">Nouveau lead page Agents IA !</strong><br/><br/>
<strong>Nom :</strong> ${name ?? "?"}<br/>
<strong>Email :</strong> <a href="mailto:${email}">${email}</a><br/>
<strong>Agent demandé :</strong> ${agent ?? "Non précisé"}<br/>
${message ? `<br/><strong>Message :</strong><br/><div style="background:#f9fafb;border-left:3px solid #7c3aed;padding:12px;margin-top:6px;border-radius:0 6px 6px 0;">${message}</div>` : ""}`,
    }).catch(console.error);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
