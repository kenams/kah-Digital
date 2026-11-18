/**
 * Cron Gmail Replies — détecte les vraies réponses Gmail et met à jour les prospects
 * Schedule : toutes les 4h (vercel.json)
 * Auth : GMAIL_USER + GMAIL_APP_PASSWORD (IMAP)
 */

import { cleanUrl } from "@/lib/clean-url";
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

// Domaines partagés (messageries grand public, anti-spam à challenge) : jamais de rapprochement par domaine.
const SHARED_DOMAINS = [
  "gmail.com", "googlemail.com", "outlook.", "hotmail.", "live.", "yahoo.", "orange.fr", "wanadoo.fr", "free.fr",
  "sfr.fr", "neuf.fr", "laposte.net", "icloud.com", "me.com", "bluewin.ch", "gmx.", "proton.me", "protonmail.com",
  "sunrise.ch", "hispeed.ch", "bbox.fr", "mailinblack.com", "kah-digital.ch",
];

function professionalDomain(email: string): string | null {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain || SHARED_DOMAINS.some((shared) => domain === shared || domain.endsWith(`.${shared}`) || (shared.endsWith(".") && domain.startsWith(shared)))) return null;
  return domain;
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
    // « Tous les messages » : les filtres Gmail archivent une partie des réponses hors de la boîte de réception.
    const boxes = await client.list();
    const allMail =
      boxes.find((box) => box.specialUse === "\\All" || box.flags?.has("\\All"))?.path ??
      boxes.find((box) => ["[Gmail]/All Mail", "[Gmail]/Tous les messages", "[Google Mail]/All Mail"].includes(box.path))?.path ??
      "INBOX";
    await client.mailboxOpen(allMail);

    // Fenêtre de 7 jours : rattrape une réponse même si un passage du robot a sauté.
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const messages = (await client.search({ since }, { uid: true })) as number[] | false;
    const messageUids = Array.isArray(messages) ? messages : [];

    if (messageUids.length === 0) {
      return { checked: 0, matched: 0, newReplies: [] };
    }

    // Récupère les headers (from, subject) de ces messages
    const fromAddresses: string[] = [];
    const messageData: Array<{ uid: number; from: string; subject: string }> = [];

    for await (const msg of client.fetch(messageUids.slice(-400), { envelope: true }, { uid: true })) {
      const from = msg.envelope?.from?.[0]?.address?.toLowerCase() ?? "";
      const subject = msg.envelope?.subject ?? "";
      // Les absences et réponses automatiques ne sont pas de vraies réponses.
      const autoReply = /(absen|out of office|automatic reply|auto(matische)?[- ]?(reply|antwort)|réponse automatique|abwesen|accusé de réception)/i.test(subject);
      if (from && !autoReply) {
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

    // Un prospect répond souvent depuis une autre adresse du même domaine (contact@ → prenom@).
    const fromDomains = new Set(fromAddresses.map(professionalDomain).filter((d): d is string => Boolean(d)));
    const findMatch = (email: string | null) => {
      const lower = (email ?? "").toLowerCase();
      if (!lower) return undefined;
      const domain = professionalDomain(lower);
      return messageData.find((m) => m.from === lower) ?? (domain && fromDomains.has(domain) ? messageData.find((m) => professionalDomain(m.from) === domain) : undefined);
    };

    const supabase = getSupabase();

    // Prospection manuelle (campagnes pilotes et cyber d'Agent KAH).
    const { data: manualProspects } = await supabase
      .from("pilot_prospects")
      .select("id, email, status")
      .not("contacted_at", "is", null)
      .is("replied_at", null)
      .range(0, 4999);
    for (const manual of manualProspects ?? []) {
      if (manual.status === "opposition" || !findMatch(manual.email)) continue;
      await supabase
        .from("pilot_prospects")
        .update({ replied_at: new Date().toISOString(), status: manual.status === "contacte" ? "repondu" : manual.status, updated_at: new Date().toISOString() })
        .eq("id", manual.id);
    }

    const { data: candidates } = await supabase
      .from("prospects")
      .select("id, email, businessName, website, repliedAt, status")
      .not("sentAt", "is", null)
      .is("repliedAt", null)
      .in("status", ["sent", "clicked"])
      .range(0, 9999);
    const prospects = (candidates ?? []).filter((prospect) => findMatch(prospect.email));

    if (prospects.length === 0) {
      return { checked, matched: 0, newReplies: [] };
    }

    // Pour chaque prospect matché, marquer comme replied
    for (const prospect of prospects) {
      const match = findMatch(prospect.email);
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
      const siteUrl = cleanUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://kah-digital.ch";

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
