/**
 * Achat en ligne des packs (Starter / Business) + abonnement mensuel — FR / EN / DE, EUR / CHF / USD.
 * Source de vérité des prix : OFFRE-2026.md (v2). Parité nominale entre devises (290 € = CHF 290 = $290),
 * comme sur les pages du site. Les textes sont dans `order-copy.ts`.
 */
import type { Locale } from "@/lib/locales";

export type PackId = "starter" | "business";
export type SubscriptionId = "none" | "essentiel" | "confort" | "pro";
export type Currency = "eur" | "chf" | "usd";

export type Pack = { id: PackId; price: number };
export type SubscriptionPlan = {
  id: SubscriptionId;
  price: number; // par mois, même nombre dans chaque devise
  stripeProductId: string | null;
  /** Price Stripe LIVE en EUR. Pour CHF / USD on passe par price_data sur le même produit. */
  stripePriceIdEur: string | null;
};

export const PACKS: Record<PackId, Pack> = {
  starter: { id: "starter", price: 290 },
  business: { id: "business", price: 790 },
};

export const SUBSCRIPTIONS: Record<SubscriptionId, SubscriptionPlan> = {
  essentiel: { id: "essentiel", price: 49, stripeProductId: "prod_VWXVoMJpP2Wjzi", stripePriceIdEur: "price_1UVUQ3GSZgm5QCNLCVqkGom2" },
  confort: { id: "confort", price: 99, stripeProductId: "prod_VWXWo3G3cJjh0J", stripePriceIdEur: "price_1UVUR6GSZgm5QCNL92S2ZOvG" },
  pro: { id: "pro", price: 199, stripeProductId: "prod_VWXXxt3XQgK39L", stripePriceIdEur: "price_1UVUSDGSZgm5QCNLSjt4vVEC" },
  none: { id: "none", price: 0, stripeProductId: null, stripePriceIdEur: null },
};

/** Le premier prélèvement de l'abonnement a lieu à la livraison, pas à la commande. */
export const SUBSCRIPTION_TRIAL_DAYS = 7;

export const ORDER_CONTACT = {
  email: "kahdigital42@gmail.com",
  phone: "07 59 55 84 14",
} as const;

export function isPackId(value: unknown): value is PackId {
  return value === "starter" || value === "business";
}

export function isSubscriptionId(value: unknown): value is SubscriptionId {
  return value === "none" || value === "essentiel" || value === "confort" || value === "pro";
}

export function isCurrency(value: unknown): value is Currency {
  return value === "eur" || value === "chf" || value === "usd";
}

export function isOrderLocale(value: unknown): value is Locale {
  return value === "fr" || value === "en" || value === "de";
}

/** Devise par défaut selon la langue de la page ; `devise=chf` sur les pages suisses en français. */
export function defaultCurrency(locale: Locale): Currency {
  if (locale === "en") return "usd";
  if (locale === "de") return "chf";
  return "eur";
}

export function resolveCurrency(locale: Locale, raw: unknown): Currency {
  return isCurrency(raw) ? raw : defaultCurrency(locale);
}

export function formatMoney(value: number, currency: Currency) {
  if (currency === "chf") return `CHF ${value.toLocaleString("de-CH").replace(/’/g, "'")}`;
  if (currency === "usd") return `$${value.toLocaleString("en-US")}`;
  return `${value.toLocaleString("fr-FR")} €`;
}

/** Compatibilité : formatage en euros. */
export function formatEuro(value: number) {
  return formatMoney(value, "eur");
}

export type PackOrderMeta = {
  paymentType: "pack_order";
  pack: PackId;
  plan: SubscriptionId;
  currency: Currency;
  locale: Locale;
  name: string;
  company: string;
  phone: string;
};

export function escapeTelegramHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
