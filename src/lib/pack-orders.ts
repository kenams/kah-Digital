/**
 * Achat en ligne des packs (Starter / Business) + abonnement mensuel.
 * Source de vérité des prix : OFFRE-2026.md (v2). Les prix d'abonnement sont des Price Stripe LIVE.
 */

export type PackId = "starter" | "business";
export type SubscriptionId = "none" | "essentiel" | "confort" | "pro";

export type Pack = {
  id: PackId;
  name: string;
  price: number; // EUR, une seule fois
  delivery: string;
  summary: string;
  points: string[];
};

export type SubscriptionPlan = {
  id: SubscriptionId;
  name: string;
  price: number; // EUR / mois
  stripePriceId: string | null;
  tagline: string;
  points: string[];
};

export const PACKS: Record<PackId, Pack> = {
  starter: {
    id: "starter",
    name: "Starter",
    price: 290,
    delivery: "5 jours ouvrés",
    summary: "Une landing page propre et rapide qui donne confiance dès le premier regard.",
    points: [
      "1 landing page complète (hero, services, contact)",
      "Formulaire de contact + design mobile",
      "SEO technique de base",
      "Livraison en 5 jours ouvrés après réception de vos contenus",
    ],
  },
  business: {
    id: "business",
    name: "Business",
    price: 790,
    delivery: "5 jours ouvrés",
    summary: "Le site professionnel complet, jusqu'à 6 pages, pensé pour transformer les visiteurs en clients.",
    points: [
      "Jusqu'à 6 pages, logo et identité visuelle inclus",
      "SEO technique complet, design premium",
      "Formulaire de devis + WhatsApp",
      "3 retouches incluses",
      "Livraison en 5 jours ouvrés après réception de vos contenus",
    ],
  },
};

export const SUBSCRIPTIONS: Record<SubscriptionId, SubscriptionPlan> = {
  essentiel: {
    id: "essentiel",
    name: "Essentiel",
    price: 49,
    stripePriceId: "price_1UVUQ3GSZgm5QCNLCVqkGom2",
    tagline: "On s'occupe de tout",
    points: ["Hébergement, domaine, sécurité, sauvegardes", "1 petite modification par mois", "Réponse sous 72 h"],
  },
  confort: {
    id: "confort",
    name: "Confort",
    price: 99,
    stripePriceId: "price_1UVUR6GSZgm5QCNL92S2ZOvG",
    tagline: "Pour un site qui évolue",
    points: ["Tout Essentiel", "3 modifications par mois", "Rapport mensuel + suivi des avis Google", "Réponse sous 24 h"],
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 199,
    stripePriceId: "price_1UVUSDGSZgm5QCNLSjt4vVEC",
    tagline: "Accompagnement renforcé",
    points: ["Tout Confort", "Modifications illimitées (usage raisonnable)", "Support WhatsApp direct", "Réponse sous 4 h ouvrées"],
  },
  none: {
    id: "none",
    name: "Sans abonnement",
    price: 0,
    stripePriceId: null,
    tagline: "Je gère l'hébergement moi-même",
    points: ["Je reçois les accès à la livraison", "Hébergement, domaine et mises à jour à ma charge"],
  },
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

export function formatEuro(value: number) {
  return `${value.toLocaleString("fr-FR")} €`;
}

export type PackOrderMeta = {
  paymentType: "pack_order";
  pack: PackId;
  plan: SubscriptionId;
  name: string;
  company: string;
  phone: string;
};

export function escapeTelegramHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
