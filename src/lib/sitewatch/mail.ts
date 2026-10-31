import { Resend } from "resend";
import { escapeHtml } from "@/lib/html-escape";
import { getResendFromAddress } from "@/lib/mail";
import { SITE_URL } from "@/lib/shared-metadata";

async function send(to: string, subject: string, body: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY missing");
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;color:#1f2937;font-size:15px;line-height:1.6">${body}<p><a href="${SITE_URL}/sitewatch/app" style="display:inline-block;background:#d6b36a;color:#11131b;font-weight:bold;padding:12px 22px;border-radius:999px;text-decoration:none">Ouvrir SiteWatch</a></p><hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 10px"/><p style="font-size:12px;color:#6b7280">SiteWatch, pilote KAH Digital Studio · kah-digital.ch</p></div>`;
  const { error } = await new Resend(key).emails.send({ from: getResendFromAddress(), to, subject, html });
  if (error) throw new Error(error.message);
}

export function sendAlert(p: { to: string; name: string; url: string; error: string }) {
  return send(p.to, `Alerte SiteWatch : ${p.name} ne répond plus correctement`, `<p>Le point de contrôle <strong>${escapeHtml(p.name)}</strong> échoue sur deux vérifications de suite.</p><p>Adresse : ${escapeHtml(p.url)}<br/>Problème constaté : <strong>${escapeHtml(p.error)}</strong></p><p>Vous recevrez un second email dès que le point d'entrée refonctionnera.</p>`);
}

export function sendRecovery(p: { to: string; name: string; url: string }) {
  return send(p.to, `SiteWatch : ${p.name} fonctionne à nouveau`, `<p>Le point de contrôle <strong>${escapeHtml(p.name)}</strong> répond de nouveau correctement.</p><p>Adresse : ${escapeHtml(p.url)}</p>`);
}
