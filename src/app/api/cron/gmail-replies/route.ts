/**
 * Cron Gmail Replies — détecte les vraies réponses Gmail et met à jour les prospects
 * Schedule : toutes les 4h (vercel.json)
 * Auth : GMAIL_USER + GMAIL_APP_PASSWORD (IMAP)
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAdminNotification } from "@/lib/gmail";
import { sendTelegramAlert } from "@/lib/notify";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function checkGmailReplies(): Promise<{
  checked: number;
  matched: number;
  newReplies: Array<{ prospectId: string; from: string; subject: string }>;
}> {
  const gmailUser = process.env.GMAIL_USER ?? "kahdigital42@gmail.com";
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailPass) throw new Error("GMAIL_APP_PASSWORD manquant");

  // Import dynamique pour éviter les erreurs d'initialisation au cold start
  const { ImapFlow } = await import("imapflow");

  const client = new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: { user: gmailUser, pass: gmailPass },
    logger: false,
  });

  await client.connect();

  const newReplies: Array<{ prospectId: string; from: string; subject: string }> = [];
  let checked = 0;

  try {
    await client.mailboxOpen("INBOX");

    // Cherche les emails reçus dans les dernières 48h
    const since = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const messages = (await client.search({ since }, { uid: true })) as number[] | false;
    const messageUids = Array.isArray(messages) ? messages : [];

    if (messageUids.length === 0) {
      return { checked: 0, matched: 0, newReplies: [] };
    }

    // Récupère les headers (from, subject) de ces messages
    const fromAddresses: string[] = [];
    const messageData: Array<{ uid: number; from: string; subject: string }> = [];

    for await (const msg of client.fetch(messageUids.slice(-100), { envelope: true })) {
      const from = msg.envelope?.from?.[0]?.address?.toLowerCase() ?? "";
      if (from) {
        fromAddresses.push(from);
        messageData.push({
          uid: msg.uid,
          from,
          subject: msg.envelope?.subject ?? "",
        });
      }
    }

    checked = messageData.length;
    if (fromAddresses.length === 0) {
      return { checked, matched: 0, newReplies: [] };
    }

    // Cherche dans Supabase les prospects avec ces emails qui n'ont pas encore repliedAt
    const supabase = getSupabase();
    const { data: prospects } = await supabase
      .from("prospects")
      .select("id, email, businessName, website, repliedAt, status")
      .in("email", fromAddresses)
      .is("repliedAt", null)
      .eq("status", "sent");

    if (!prospects || prospects.length === 0) {
      return { checked, matched: 0, newReplies: [] };
    }

    // Pour chaque prospect matché, marquer comme replied
    for (const prospect of prospects) {
      const match = messageData.find((m) => m.from === (prospect.email ?? "").toLowerCase());
      if (!match) continue;

      await supabase
        .from("prospects")
        .update({
          repliedAt: new Date().toISOString(),
          status: "replied",
        })
        .eq("id", prospect.id);

      newReplies.push({
        prospectId: prospect.id,
        from: match.from,
        subject: match.subject,
      });

      // Notification admin
      const name = prospect.businessName ?? prospect.website;
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch";

      // Telegram — alerte instantanée
      void sendTelegramAlert(
        `🔥 <b>RÉPONSE PROSPECT !</b>\n\n` +
        `🏢 <b>${name}</b>\n` +
        `📧 ${match.from}\n` +
        `💬 ${match.subject}\n\n` +
        `<a href="https://mail.google.com/mail/u/0/#inbox">📬 Voir Gmail</a> · <a href="${siteUrl}/admin/prospection">📊 Admin</a>`
      ).catch(console.error);

      void sendAdminNotification({
        subject: `🔥 RÉPONSE — ${name}`,
        body: `<strong style="font-size:15px;">${name}</strong> a répondu à ton email de prospection !<br><br>
Email : ${match.from}<br>
Sujet : ${match.subject}<br><br>
<a href="https://mail.google.com/mail/u/0/#inbox" style="display:inline-block;background:#ea4335;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:700;margin-right:8px;">📬 Voir dans Gmail</a>
<a href="${siteUrl}/admin/prospection" style="display:inline-block;background:#7c3aed;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:700;">📊 Admin</a>`,
      }).catch(console.error);
    }

    return { checked, matched: newReplies.length, newReplies };
  } finally {
    await client.logout();
  }
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await checkGmailReplies();
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[gmail-replies]", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
