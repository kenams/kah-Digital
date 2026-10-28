import { Resend } from "resend";
import type Stripe from "stripe";
import { renderBrandedEmail, getSiteUrl } from "@/lib/email-template";
import { getResendFromAddress } from "@/lib/mail";
import { sendAdminEmail, sendTelegramAlert } from "@/lib/notify";
import {
  ORDER_CONTACT,
  PACKS,
  SUBSCRIPTIONS,
  SUBSCRIPTION_TRIAL_DAYS,
  escapeTelegramHtml,
  formatEuro,
  isPackId,
  isSubscriptionId,
} from "@/lib/pack-orders";

const handledSessions = new Set<string>();

export type ParsedOrder = {
  sessionId: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  packName: string;
  packPrice: number;
  planName: string;
  planPrice: number;
  hasSubscription: boolean;
  amountPaidNow: number;
};

export function parsePackOrder(session: Stripe.Checkout.Session): ParsedOrder | null {
  const m = session.metadata ?? {};
  if (m.paymentType !== "pack_order" || !isPackId(m.pack) || !isSubscriptionId(m.plan)) return null;

  const pack = PACKS[m.pack];
  const plan = SUBSCRIPTIONS[m.plan];
  return {
    sessionId: session.id,
    email: session.customer_details?.email ?? session.customer_email ?? m.email ?? "",
    name: m.name || session.customer_details?.name || "",
    company: m.company || "",
    phone: session.customer_details?.phone || m.phone || "",
    packName: pack.name,
    packPrice: pack.price,
    planName: plan.name,
    planPrice: plan.price,
    hasSubscription: Boolean(plan.stripePriceId),
    amountPaidNow: (session.amount_total ?? 0) / 100,
  };
}

function briefUrl(sessionId: string) {
  return `${getSiteUrl()}/commander/merci?session_id=${encodeURIComponent(sessionId)}`;
}

export function buildAdminTelegramMessage(o: ParsedOrder) {
  const e = escapeTelegramHtml;
  return [
    `💰 <b>NOUVELLE COMMANDE — Pack ${e(o.packName)}</b>`,
    `Payé : <b>${formatEuro(o.amountPaidNow)}</b>`,
    o.hasSubscription
      ? `Abonnement : <b>${e(o.planName)} ${formatEuro(o.planPrice)}/mois</b> (1er prélèvement à J+${SUBSCRIPTION_TRIAL_DAYS})`
      : "Abonnement : aucun",
    `Client : ${e(o.name)}${o.company ? ` — ${e(o.company)}` : ""}`,
    `E-mail : ${e(o.email)}`,
    o.phone ? `Tél : ${e(o.phone)}` : "",
    `⏱ Livraison sous 5 jours ouvrés dès réception des contenus.`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendClientEmail(o: ParsedOrder) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !o.email) return;

  const html = renderBrandedEmail({
    eyebrow: "Commande confirmée",
    title: `Merci ${o.name.split(" ")[0] || ""}, votre pack ${o.packName} est lancé`.replace("  ", " "),
    intro:
      "Votre paiement est bien reçu. Pour tenir le délai de 5 jours ouvrés, il me manque vos contenus : cela prend 5 minutes.",
    metrics: [
      { label: "Pack", value: `${o.packName} — ${formatEuro(o.packPrice)}` },
      {
        label: "Abonnement",
        value: o.hasSubscription ? `${o.planName} — ${formatEuro(o.planPrice)}/mois` : "Aucun",
      },
    ],
    sections: [
      {
        title: "La suite",
        items: [
          { label: "1. Vos contenus", value: "Remplissez le formulaire de démarrage (lien ci-dessous) : activité, textes, photos, couleurs." },
          { label: "2. Réalisation", value: "Livraison sous 5 jours ouvrés après réception de vos contenus." },
          {
            label: "3. Abonnement",
            value: o.hasSubscription
              ? `Le premier prélèvement de ${formatEuro(o.planPrice)} aura lieu ${SUBSCRIPTION_TRIAL_DAYS} jours après la commande, puis chaque mois. Sans engagement, résiliable avec un mois de préavis.`
              : "Vous recevrez les accès à la livraison. Hébergement et mises à jour restent à votre charge.",
          },
        ],
      },
    ],
    ctaLabel: "Remplir mon formulaire de démarrage",
    ctaUrl: briefUrl(o.sessionId),
    footer: `Une question ? ${ORDER_CONTACT.email} · ${ORDER_CONTACT.phone}`,
  });

  const resend = new Resend(apiKey);
  await resend.emails
    .send({
      from: getResendFromAddress(),
      to: o.email,
      replyTo: ORDER_CONTACT.email,
      subject: `Commande confirmée — Pack ${o.packName} KAH Digital Studio`,
      html,
    })
    .catch((error) => console.warn("[pack-order] client email failed", error));
}

/** Appelé par le webhook Stripe (checkout.session.completed). Idempotent au mieux dans une instance. */
export async function handlePackOrderCompleted(session: Stripe.Checkout.Session) {
  const order = parsePackOrder(session);
  if (!order) return false;
  if (handledSessions.has(session.id)) return true;
  handledSessions.add(session.id);

  await Promise.allSettled([
    sendTelegramAlert(buildAdminTelegramMessage(order)),
    sendAdminEmail(
      `💰 Commande ${order.packName} — ${order.name}`,
      renderBrandedEmail({
        eyebrow: "Nouvelle commande",
        title: `Pack ${order.packName} — ${formatEuro(order.amountPaidNow)} payés`,
        metrics: [
          { label: "Pack", value: `${order.packName} — ${formatEuro(order.packPrice)}` },
          {
            label: "Abonnement",
            value: order.hasSubscription ? `${order.planName} — ${formatEuro(order.planPrice)}/mois` : "Aucun",
          },
        ],
        sections: [
          {
            title: "Client",
            items: [
              { label: "Nom", value: order.name },
              { label: "Entreprise", value: order.company || "—" },
              { label: "E-mail", value: order.email },
              { label: "Téléphone", value: order.phone || "—" },
            ],
          },
          {
            title: "À faire",
            items: [
              { label: "1", value: "Attendre le formulaire de démarrage du client (alerte dédiée)." },
              { label: "2", value: "Livrer sous 5 jours ouvrés après réception des contenus." },
              { label: "3", value: "Ajouter le client dans MRR-SUIVI-ABONNES.csv si abonnement." },
            ],
          },
        ],
        ctaLabel: "Voir dans Stripe",
        ctaUrl: `https://dashboard.stripe.com/checkout/sessions/${order.sessionId}`,
      }),
    ),
    sendClientEmail(order),
  ]);
  return true;
}

export type BriefInput = {
  businessName: string;
  activity: string;
  city: string;
  services: string;
  tone: string;
  existingDomain: string;
  links: string;
  assets: string;
  notes: string;
};

export async function handleBriefSubmitted(order: ParsedOrder, brief: BriefInput) {
  const e = escapeTelegramHtml;
  const tg = [
    `📝 <b>BRIEF REÇU — ${e(order.name)}${order.company ? ` (${e(order.company)})` : ""}</b>`,
    `Pack ${e(order.packName)} — ${order.hasSubscription ? `${e(order.planName)} ${order.planPrice} €/mois` : "sans abonnement"}`,
    `Activité : ${e(brief.activity)}`,
    brief.city ? `Ville : ${e(brief.city)}` : "",
    "⏱ Le délai de 5 jours ouvrés démarre maintenant.",
  ]
    .filter(Boolean)
    .join("\n");

  const sections = [
    {
      title: "Entreprise",
      items: [
        { label: "Nom affiché", value: brief.businessName || order.company || order.name },
        { label: "Activité", value: brief.activity },
        { label: "Ville / zone", value: brief.city || "—" },
        { label: "Services / offre", value: brief.services || "—" },
      ],
    },
    {
      title: "Contenus et style",
      items: [
        { label: "Ton / couleurs", value: brief.tone || "—" },
        { label: "Domaine existant", value: brief.existingDomain || "—" },
        { label: "Liens (réseaux, ancien site)", value: brief.links || "—" },
        { label: "Photos / logo (liens)", value: brief.assets || "—" },
        { label: "Remarques", value: brief.notes || "—" },
      ],
    },
  ];

  await Promise.allSettled([
    sendTelegramAlert(tg),
    sendAdminEmail(
      `📝 Brief reçu — ${order.name} (${order.packName})`,
      renderBrandedEmail({
        eyebrow: "Brief client",
        title: `${order.name} — Pack ${order.packName}`,
        intro: `E-mail : ${order.email}${order.phone ? ` · Tél : ${order.phone}` : ""}`,
        sections,
      }),
    ),
    (async () => {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey || !order.email) return;
      await new Resend(apiKey).emails
        .send({
          from: getResendFromAddress(),
          to: order.email,
          replyTo: ORDER_CONTACT.email,
          subject: "Votre brief est bien reçu — KAH Digital Studio",
          html: renderBrandedEmail({
            eyebrow: "Brief reçu",
            title: "Merci, je m'y mets",
            intro: "Voici le récapitulatif de ce que vous m'avez envoyé. Le délai de 5 jours ouvrés démarre maintenant. Si quelque chose est faux, répondez simplement à cet e-mail.",
            sections,
            footer: `${ORDER_CONTACT.email} · ${ORDER_CONTACT.phone}`,
          }),
        })
        .catch((error) => console.warn("[pack-order] brief copy failed", error));
    })(),
  ]);
}
