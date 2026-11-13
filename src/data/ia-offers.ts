/**
 * Offres « IA utile » (formation + mise en place + accompagnement) — créées le 13/11/2026.
 * Produits, prix et Payment Links Stripe LIVE (compte acct_1TDQW0GSZgm5QCNL).
 * Prix en euros, TVA non applicable (art. 293 B du CGI).
 */

export type IaOfferId =
  | "atelier-decouverte"
  | "atelier-metier"
  | "mise-en-place"
  | "accompagnement"
  | "session-perso"
  | "parcours-perso";

export type IaOffer = {
  id: IaOfferId;
  audience: "entreprise" | "particulier";
  name: string;
  price: number;
  /** Préfixe « à partir de » (prix sur devis). */
  from?: boolean;
  period?: "mois";
  format: string;
  pitch: string;
  includes: string[];
  /** Lien Stripe Payment Link (null = devis). */
  paymentUrl: string | null;
  stripePaymentLinkId: string | null;
  stripePriceId: string | null;
  featured?: boolean;
};

export const IA_OFFERS: IaOffer[] = [
  {
    id: "atelier-decouverte",
    audience: "entreprise",
    name: "Atelier IA Découverte",
    price: 390,
    format: "3 h à distance · jusqu'à 6 personnes",
    pitch: "Votre équipe apprend à utiliser l'IA sur ses propres tâches, pas sur des exemples génériques.",
    includes: [
      "Questionnaire préparatoire : vos tâches répétitives",
      "Démonstrations sur 2 cas réels de votre activité",
      "Règles simples : ce qu'on confie ou non à l'IA",
      "Fiche récapitulative des consignes utilisées",
    ],
    paymentUrl: "https://buy.stripe.com/bJe8wP64RbAm2Vjd0S1oI05",
    stripePaymentLinkId: "plink_1UbO22GSZgm5QCNLGEgeHHRU",
    stripePriceId: "price_1UbO1yGSZgm5QCNLMGsrePff",
  },
  {
    id: "atelier-metier",
    audience: "entreprise",
    name: "Atelier IA Métier",
    price: 890,
    format: "1 journée (2 × 3 h 30) à distance · jusqu'à 8 personnes",
    pitch: "On part de 3 tâches de votre métier et on construit ensemble la méthode que vos salariés réutiliseront.",
    includes: [
      "Entretien de cadrage avant l'atelier",
      "3 tâches réelles traitées : devis, comptes rendus, e-mails, documents…",
      "Guide d'usage interne adapté à votre entreprise",
      "Charte de confidentialité et de vérification des résultats",
      "Point de suivi de 30 min un mois après",
    ],
    paymentUrl: "https://buy.stripe.com/14A7sLgJv47U7bz0e61oI06",
    stripePaymentLinkId: "plink_1UbO22GSZgm5QCNLEyQEdM4w",
    stripePriceId: "price_1UbO22GSZgm5QCNLizdHSyXH",
    featured: true,
  },
  {
    id: "mise-en-place",
    audience: "entreprise",
    name: "Mise en place IA",
    price: 1490,
    from: true,
    format: "Projet sur devis · 1 processus automatisé",
    pitch: "La partie technique : on installe l'outil, on le branche à vos logiciels et on forme ceux qui l'utilisent.",
    includes: [
      "Analyse d'un processus (relances, devis, tri d'e-mails, base documentaire…)",
      "Installation et connexion à vos outils",
      "Validation humaine avant tout envoi automatique",
      "Formation des utilisateurs et documentation",
    ],
    paymentUrl: null,
    stripePaymentLinkId: null,
    stripePriceId: null,
  },
  {
    id: "accompagnement",
    audience: "entreprise",
    name: "Accompagnement IA",
    price: 190,
    period: "mois",
    format: "Sans engagement · résiliable chaque mois",
    pitch: "Un référent IA externe pour suivre les nouveautés, ajuster vos outils et former les nouveaux arrivants.",
    includes: [
      "1 séance d'1 h par mois",
      "Questions par e-mail, réponse sous 48 h ouvrées",
      "Ajustement de vos consignes et automatisations",
      "Point sur les nouveaux outils utiles à votre activité",
    ],
    paymentUrl: "https://buy.stripe.com/fZu00j64Rawi2Vj2me1oI07",
    stripePaymentLinkId: "plink_1UbO23GSZgm5QCNLdjaqeEKa",
    stripePriceId: "price_1UbO23GSZgm5QCNLF8V6nRK6",
  },
  {
    id: "session-perso",
    audience: "particulier",
    name: "Session IA perso",
    price: 69,
    format: "1 h 30 à distance · en individuel",
    pitch: "Un objectif concret, traité ensemble avec les bons outils.",
    includes: [
      "Recherche d'emploi : CV, lettres, préparation d'entretien",
      "Démarches administratives : courriers, dossiers, compréhension de documents",
      "Lancer son activité : offre, textes, organisation",
    ],
    paymentUrl: "https://buy.stripe.com/3cI9AT8cZawigM96Cu1oI08",
    stripePaymentLinkId: "plink_1UbO24GSZgm5QCNLPBJ8kSHe",
    stripePriceId: "price_1UbO24GSZgm5QCNL0M5ckfGN",
  },
  {
    id: "parcours-perso",
    audience: "particulier",
    name: "Parcours IA perso",
    price: 179,
    format: "3 sessions d'1 h 30 · à planifier sous 2 mois",
    pitch: "Pour devenir autonome : on avance par étapes et vous repartez avec vos propres méthodes.",
    includes: [
      "Les sujets de la session perso, sur 3 rendez-vous",
      "Exercices entre les sessions",
      "Fiche de méthodes personnalisée",
    ],
    paymentUrl: "https://buy.stripe.com/bJe5kD9h347UanLaSK1oI09",
    stripePaymentLinkId: "plink_1UbO25GSZgm5QCNLHRA1JvWh",
    stripePriceId: "price_1UbO25GSZgm5QCNLWtSCvok2",
    featured: true,
  },
];

export function iaOfferById(id: string | null | undefined) {
  return IA_OFFERS.find((o) => o.id === id) ?? null;
}

export function iaOfferByPaymentLink(paymentLinkId: string | null | undefined) {
  if (!paymentLinkId) return null;
  return IA_OFFERS.find((o) => o.stripePaymentLinkId === paymentLinkId) ?? null;
}

/** Séparateur de milliers fixe (espace fine insécable), indépendant de l'ICU du serveur. */
export function formatIaAmount(value: number) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatIaPrice(o: Pick<IaOffer, "price" | "from" | "period">) {
  const amount = `${formatIaAmount(o.price)} €`;
  return `${o.from ? "à partir de " : ""}${amount}${o.period ? ` / ${o.period}` : ""}`;
}
