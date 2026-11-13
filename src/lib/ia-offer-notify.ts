import type Stripe from "stripe";
import { iaOfferByPaymentLink, formatIaPrice } from "@/data/ia-offers";
import { escapeHtml } from "@/lib/html-escape";
import { sendAdminEmail } from "@/lib/notify";

const handled = new Set<string>();

/** Paiement d'une offre IA (Payment Link Stripe) → e-mail d'alerte à Kenams. Renvoie false si ce n'est pas une offre IA. */
export async function handleIaOfferCompleted(session: Stripe.Checkout.Session): Promise<boolean> {
  const linkId = typeof session.payment_link === "string" ? session.payment_link : session.payment_link?.id;
  const offer = iaOfferByPaymentLink(linkId);
  if (!offer) return false;
  if (handled.has(session.id)) return true;
  handled.add(session.id);

  const d = session.customer_details;
  const company = session.custom_fields?.find((f) => f.key === "entreprise")?.text?.value ?? "";
  const paid = ((session.amount_total ?? 0) / 100).toLocaleString("fr-FR", { minimumFractionDigits: 2 });
  const rows: [string, string][] = [
    ["Offre", `${offer.name} (${formatIaPrice(offer)})`],
    ["Montant payé", `${paid} ${(session.currency ?? "eur").toUpperCase()}`],
    ["Nom", d?.name ?? ""],
    ["Entreprise", company],
    ["E-mail", d?.email ?? ""],
    ["Téléphone", d?.phone ?? ""],
    ["Session Stripe", session.id],
  ];
  const html = `<h2>Nouvelle réservation IA</h2><table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p>À faire : contacter le client sous 48 h ouvrées pour fixer la date.</p>`;
  await sendAdminEmail(`💰 Réservation IA : ${offer.name} — ${d?.name ?? d?.email ?? "client"}`, html);
  return true;
}
