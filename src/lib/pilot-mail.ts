import { Resend } from "resend";
import { getResendFromAddress } from "@/lib/mail";
import { SITE_URL } from "@/lib/shared-metadata";

export async function sendPilotLoginLink(opts: { product: string; label: string; to: string; token: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY missing");
  const link = `${SITE_URL}/api/${opts.product}/verify?t=${encodeURIComponent(opts.token)}`;
  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;color:#1f2937;font-size:15px;line-height:1.6"><p>Bonjour,</p><p>Voici votre lien de connexion à ${opts.label}. Il est valable 15 minutes.</p><p><a href="${link}" style="display:inline-block;background:#d6b36a;color:#11131b;font-weight:bold;padding:12px 22px;border-radius:999px;text-decoration:none">Ouvrir ${opts.label}</a></p><p style="font-size:13px;color:#6b7280">Si vous n'avez rien demandé, ignorez ce message.</p><hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 10px"/><p style="font-size:12px;color:#6b7280">${opts.label}, pilote KAH Digital Studio · kah-digital.ch</p></div>`;
  const { error } = await new Resend(key).emails.send({
    from: getResendFromAddress(),
    to: opts.to,
    subject: `Votre lien de connexion ${opts.label}`,
    html,
  });
  if (error) throw new Error(error.message);
}
