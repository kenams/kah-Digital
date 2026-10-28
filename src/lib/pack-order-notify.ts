import { Resend } from "resend";
import type Stripe from "stripe";
import { renderBrandedEmail, getSiteUrl } from "@/lib/email-template";
import { withLocalePrefix, type Locale } from "@/lib/locales";
import { getResendFromAddress } from "@/lib/mail";
import { sendAdminEmail, sendTelegramAlert } from "@/lib/notify";
import { ORDER_COPY } from "@/lib/order-copy";
import {
  ORDER_CONTACT,
  PACKS,
  SUBSCRIPTIONS,
  SUBSCRIPTION_TRIAL_DAYS,
  escapeTelegramHtml,
  formatMoney,
  isCurrency,
  isOrderLocale,
  isPackId,
  isSubscriptionId,
  type Currency,
  type PackId,
  type SubscriptionId,
} from "@/lib/pack-orders";

const handledSessions = new Set<string>();

export type ParsedOrder = {
  sessionId: string;
  email: string;
  name: string;
  company: string;
  phone: string;
  pack: PackId;
  plan: SubscriptionId;
  currency: Currency;
  locale: Locale;
  packPrice: number;
  planPrice: number;
  hasSubscription: boolean;
  amountPaidNow: number;
};

export function parsePackOrder(session: Stripe.Checkout.Session): ParsedOrder | null {
  const m = session.metadata ?? {};
  if (m.paymentType !== "pack_order" || !isPackId(m.pack) || !isSubscriptionId(m.plan)) return null;

  const currency: Currency = isCurrency(m.currency) ? m.currency : "eur";
  const locale: Locale = isOrderLocale(m.locale) ? m.locale : "fr";
  const plan = SUBSCRIPTIONS[m.plan];
  return {
    sessionId: session.id,
    email: session.customer_details?.email ?? session.customer_email ?? m.email ?? "",
    name: m.name || session.customer_details?.name || "",
    company: m.company || "",
    phone: session.customer_details?.phone || m.phone || "",
    pack: m.pack,
    plan: m.plan,
    currency,
    locale,
    packPrice: PACKS[m.pack].price,
    planPrice: plan.price,
    hasSubscription: Boolean(plan.stripeProductId),
    amountPaidNow: (session.amount_total ?? 0) / 100,
  };
}

function briefUrl(o: ParsedOrder) {
  return `${getSiteUrl()}${withLocalePrefix("/commander/merci", o.locale)}?session_id=${encodeURIComponent(o.sessionId)}`;
}

/** Noms français pour les alertes admin (c'est Kenams qui les lit). */
function adminPackName(o: ParsedOrder) {
  return ORDER_COPY.fr.packs[o.pack].name;
}
function adminPlanName(o: ParsedOrder) {
  return ORDER_COPY.fr.plans[o.plan].name;
}
function localeTag(o: ParsedOrder) {
  return `${o.locale.toUpperCase()} · ${o.currency.toUpperCase()}`;
}

export function buildAdminTelegramMessage(o: ParsedOrder) {
  const e = escapeTelegramHtml;
  return [
    `💰 <b>NOUVELLE COMMANDE — Pack ${e(adminPackName(o))}</b>`,
    `Payé : <b>${formatMoney(o.amountPaidNow, o.currency)}</b> (${localeTag(o)})`,
    o.hasSubscription
      ? `Abonnement : <b>${e(adminPlanName(o))} ${formatMoney(o.planPrice, o.currency)}/mois</b> (1er prélèvement à J+${SUBSCRIPTION_TRIAL_DAYS})`
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

  const c = ORDER_COPY[o.locale];
  const packName = c.packs[o.pack].name;
  const planName = c.plans[o.plan].name;
  const first = o.name.split(" ")[0] || "";
  const planPriceText = formatMoney(o.planPrice, o.currency);

  const html = renderBrandedEmail({
    eyebrow: c.email.confirmedEyebrow,
    title: c.email.title(first, packName).replace("  ", " "),
    intro: c.email.intro,
    metrics: [
      { label: c.email.packLabel, value: `${packName} — ${formatMoney(o.packPrice, o.currency)}` },
      {
        label: c.email.planLabel,
        value: o.hasSubscription ? `${planName} — ${planPriceText}${c.perMonth}` : c.email.planNone,
      },
    ],
    sections: [
      {
        title: c.email.nextTitle,
        items: [
          { label: c.email.step1[0], value: c.email.step1[1] },
          { label: c.email.step2[0], value: c.email.step2[1] },
          {
            label: c.email.step3[0],
            value: o.hasSubscription ? c.email.step3Sub(planPriceText, SUBSCRIPTION_TRIAL_DAYS) : c.email.step3None,
          },
        ],
      },
    ],
    ctaLabel: c.email.cta,
    ctaUrl: briefUrl(o),
    footer: `${ORDER_CONTACT.email} · ${ORDER_CONTACT.phone}`,
  });

  await new Resend(apiKey).emails
    .send({
      from: getResendFromAddress(),
      to: o.email,
      replyTo: ORDER_CONTACT.email,
      subject: c.email.subject(packName),
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

  const packName = adminPackName(order);
  await Promise.allSettled([
    sendTelegramAlert(buildAdminTelegramMessage(order)),
    sendAdminEmail(
      `💰 Commande ${packName} — ${order.name}`,
      renderBrandedEmail({
        eyebrow: "Nouvelle commande",
        title: `Pack ${packName} — ${formatMoney(order.amountPaidNow, order.currency)} payés`,
        metrics: [
          { label: "Pack", value: `${packName} — ${formatMoney(order.packPrice, order.currency)}` },
          {
            label: "Abonnement",
            value: order.hasSubscription ? `${adminPlanName(order)} — ${formatMoney(order.planPrice, order.currency)}/mois` : "Aucun",
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
              { label: "Langue · devise", value: localeTag(order) },
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
  const packName = adminPackName(order);
  const tg = [
    `📝 <b>BRIEF REÇU — ${e(order.name)}${order.company ? ` (${e(order.company)})` : ""}</b>`,
    `Pack ${e(packName)} — ${order.hasSubscription ? `${e(adminPlanName(order))} ${formatMoney(order.planPrice, order.currency)}/mois` : "sans abonnement"} (${localeTag(order)})`,
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

  const c = ORDER_COPY[order.locale];
  await Promise.allSettled([
    sendTelegramAlert(tg),
    sendAdminEmail(
      `📝 Brief reçu — ${order.name} (${packName})`,
      renderBrandedEmail({
        eyebrow: "Brief client",
        title: `${order.name} — Pack ${packName}`,
        intro: `E-mail : ${order.email}${order.phone ? ` · Tél : ${order.phone}` : ""} · ${localeTag(order)}`,
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
          subject: c.email.briefSubject,
          html: renderBrandedEmail({
            eyebrow: c.email.briefEyebrow,
            title: c.email.briefTitle,
            intro: c.email.briefIntro,
            sections,
            footer: `${ORDER_CONTACT.email} · ${ORDER_CONTACT.phone}`,
          }),
        })
        .catch((error) => console.warn("[pack-order] brief copy failed", error));
    })(),
  ]);
}
