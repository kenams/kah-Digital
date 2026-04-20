/**
 * Gmail Sender via Nodemailer + App Password
 * Expéditeur : kahdigital42@gmail.com
 */

import nodemailer from "nodemailer";

function createTransport() {
  const user = process.env.GMAIL_USER ?? "kahdigital42@gmail.com";
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!pass) {
    throw new Error("GMAIL_APP_PASSWORD manquant dans les variables d'environnement");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export async function sendGmail(opts: SendEmailOptions): Promise<void> {
  const transport = createTransport();
  const from = `KAH-Digital <${process.env.GMAIL_USER ?? "kahdigital42@gmail.com"}>`;

  await transport.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo ?? from,
  });
}

// Notification admin (email rapide pour signaler une réponse ou ouverture)
export async function sendAdminNotification(opts: {
  subject: string;
  body: string;
}): Promise<void> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL ?? "kahdigital42@gmail.com";
  const transport = createTransport();
  const from = `KAH-Digital System <${process.env.GMAIL_USER ?? "kahdigital42@gmail.com"}>`;

  await transport.sendMail({
    from,
    to: adminEmail,
    subject: `[KAH-Digital] ${opts.subject}`,
    html: `<div style="font-family:Arial,sans-serif;padding:20px;max-width:500px;">
      <h2 style="color:#1e3a8a;">${opts.subject}</h2>
      <p style="color:#4b5563;line-height:1.6;">${opts.body}</p>
      <p style="margin-top:20px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital-site.vercel.app"}/admin/prospection"
           style="background:#7c3aed;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600;">
          Voir dans l'admin →
        </a>
      </p>
    </div>`,
    text: opts.body,
  });
}
