import { Resend } from "resend";
import { escapeHtml } from "@/lib/html-escape";
import { getResendFromAddress } from "@/lib/mail";
import { SITE_URL } from "@/lib/shared-metadata";

async function send(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY missing");
  const { error } = await new Resend(key).emails.send({ from: getResendFromAddress(), to, subject, html, replyTo });
  if (error) throw new Error(error.message);
}

const shell = (body: string) =>
  `<div style="font-family:Arial,sans-serif;max-width:560px;color:#1f2937;font-size:15px;line-height:1.6">${body}<hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 10px"/><p style="font-size:12px;color:#6b7280">ScopeLock, pilote KAH Digital Studio · kah-digital.ch</p></div>`;

const button = (href: string, label: string) =>
  `<p><a href="${href}" style="display:inline-block;background:#d6b36a;color:#11131b;font-weight:bold;padding:12px 22px;border-radius:999px;text-decoration:none">${escapeHtml(label)}</a></p>`;

export function sendLoginLink(email: string, loginToken: string) {
  const link = `${SITE_URL}/api/scopelock/verify?t=${encodeURIComponent(loginToken)}`;
  return send(email, "Votre lien de connexion ScopeLock", shell(
    `<p>Bonjour,</p><p>Voici votre lien de connexion à ScopeLock. Il est valable 15 minutes.</p>${button(link, "Ouvrir ScopeLock")}<p style="font-size:13px;color:#6b7280">Si vous n'avez rien demandé, ignorez ce message.</p>`,
  ));
}

export function sendRequestToClient(p: { to: string; ownerEmail: string; ownerName: string; clientName: string; projectName: string; title: string; description: string; price: string; delay: string; token: string }) {
  const link = `${SITE_URL}/scopelock/v/${p.token}`;
  return send(p.to, `Demande de changement à valider : ${p.title}`, shell(
    `<p>Bonjour ${escapeHtml(p.clientName)},</p>
     <p>${escapeHtml(p.ownerName)} vous soumet une demande de changement sur le projet <strong>${escapeHtml(p.projectName)}</strong>, à valider avant de commencer.</p>
     <p><strong>${escapeHtml(p.title)}</strong><br/>${escapeHtml(p.description).replace(/\n/g, "<br/>")}</p>
     <p>Estimation : <strong>${escapeHtml(p.price)}</strong> · délai : <strong>${escapeHtml(p.delay)}</strong></p>
     ${button(link, "Voir et répondre")}
     <p style="font-size:13px;color:#6b7280">Votre réponse est horodatée. Ce n'est pas une signature électronique certifiée.</p>`,
  ), p.ownerEmail);
}

export function sendDecisionToOwner(p: { to: string; title: string; clientName: string; decision: "accepted" | "refused"; note: string }) {
  const verb = p.decision === "accepted" ? "accepté" : "refusé";
  return send(p.to, `${p.clientName} a ${verb} : ${p.title}`, shell(
    `<p>${escapeHtml(p.clientName)} a <strong>${verb}</strong> la demande « ${escapeHtml(p.title)} ».</p>${p.note ? `<p>Message : ${escapeHtml(p.note)}</p>` : ""}${button(`${SITE_URL}/scopelock/app`, "Ouvrir ScopeLock")}`,
  ));
}
