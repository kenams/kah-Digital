/**
 * Offres « IA utile » (formation + mise en place + accompagnement) — créées le 13/11/2026.
 * Produits, prix et Payment Links Stripe LIVE (compte acct_1TDQW0GSZgm5QCNL).
 * Un lien par langue : même prix Stripe, page de remerciement dans la langue du client.
 * Prix en euros, TVA non applicable (art. 293 B du CGI).
 */

export type IaLocale = "fr" | "en" | "de";

export type IaOfferId =
  | "atelier-decouverte"
  | "atelier-metier"
  | "mise-en-place"
  | "accompagnement"
  | "session-perso"
  | "parcours-perso";

export type IaOfferCopy = {
  name: string;
  format: string;
  pitch: string;
  includes: string[];
};

export type IaPaymentLink = { url: string; linkId: string };

export type IaOffer = {
  id: IaOfferId;
  audience: "entreprise" | "particulier";
  price: number;
  /** Préfixe « à partir de » (prix sur devis). */
  from?: boolean;
  /** Abonnement mensuel. */
  monthly?: boolean;
  featured?: boolean;
  stripePriceId: string | null;
  /** Payment Links Stripe par langue (null = sur devis). */
  payment: Record<IaLocale, IaPaymentLink> | null;
  copy: Record<IaLocale, IaOfferCopy>;
};

export const IA_OFFERS: IaOffer[] = [
  {
    id: "atelier-decouverte",
    audience: "entreprise",
    price: 390,
    stripePriceId: "price_1UbO1yGSZgm5QCNLMGsrePff",
    payment: {
      fr: { url: "https://buy.stripe.com/bJe8wP64RbAm2Vjd0S1oI05", linkId: "plink_1UbO22GSZgm5QCNLGEgeHHRU" },
      en: { url: "https://buy.stripe.com/aFa8wPctfawieE1bWO1oI0a", linkId: "plink_1UbOCCGSZgm5QCNLggviB9Pg" },
      de: { url: "https://buy.stripe.com/dRm3cvbpb0VI8fDe4W1oI0b", linkId: "plink_1UbOCCGSZgm5QCNLDjQvrG9Y" },
    },
    copy: {
      fr: {
        name: "Atelier IA Découverte",
        format: "3 h à distance · jusqu'à 6 personnes",
        pitch: "Votre équipe apprend à utiliser l'IA sur ses propres tâches, pas sur des exemples génériques.",
        includes: [
          "Questionnaire préparatoire : vos tâches répétitives",
          "Démonstrations sur 2 cas réels de votre activité",
          "Règles simples : ce qu'on confie ou non à l'IA",
          "Fiche récapitulative des consignes utilisées",
        ],
      },
      en: {
        name: "AI Discovery Workshop",
        format: "3 hours, remote · up to 6 people",
        pitch: "Your team learns to use AI on its own tasks, not on generic examples.",
        includes: [
          "Preparation questionnaire: your repetitive tasks",
          "Live demos on 2 real cases from your business",
          "Simple rules: what to hand over to AI and what not to",
          "Summary sheet of the prompts used",
        ],
      },
      de: {
        name: "KI-Einstiegsworkshop",
        format: "3 Std. online · bis zu 6 Personen",
        pitch: "Ihr Team lernt, KI für die eigenen Aufgaben zu nutzen – nicht an allgemeinen Beispielen.",
        includes: [
          "Vorbereitender Fragebogen: Ihre wiederkehrenden Aufgaben",
          "Demonstration an 2 echten Fällen aus Ihrem Betrieb",
          "Einfache Regeln: was man der KI anvertraut und was nicht",
          "Merkblatt mit den verwendeten Anweisungen",
        ],
      },
    },
  },
  {
    id: "atelier-metier",
    audience: "entreprise",
    price: 890,
    featured: true,
    stripePriceId: "price_1UbO22GSZgm5QCNLizdHSyXH",
    payment: {
      fr: { url: "https://buy.stripe.com/14A7sLgJv47U7bz0e61oI06", linkId: "plink_1UbO22GSZgm5QCNLEyQEdM4w" },
      en: { url: "https://buy.stripe.com/7sYcN550N6g23ZnaSK1oI0c", linkId: "plink_1UbOCDGSZgm5QCNLWbgX7j8F" },
      de: { url: "https://buy.stripe.com/fZubJ1bpb8oa53r0e61oI0d", linkId: "plink_1UbOCDGSZgm5QCNL56kRVZ1I" },
    },
    copy: {
      fr: {
        name: "Atelier IA Métier",
        format: "1 journée (2 × 3 h 30) à distance · jusqu'à 8 personnes",
        pitch: "On part de 3 tâches de votre métier et on construit ensemble la méthode que vos salariés réutiliseront.",
        includes: [
          "Entretien de cadrage avant l'atelier",
          "3 tâches réelles traitées : devis, comptes rendus, e-mails, documents…",
          "Guide d'usage interne adapté à votre entreprise",
          "Charte de confidentialité et de vérification des résultats",
          "Point de suivi de 30 min un mois après",
        ],
      },
      en: {
        name: "AI Workshop for Your Trade",
        format: "1 day (2 × 3.5 h), remote · up to 8 people",
        pitch: "We start from 3 tasks in your line of work and build together the method your staff will reuse.",
        includes: [
          "Scoping call before the workshop",
          "3 real tasks covered: quotes, minutes, e-mails, documents…",
          "Internal usage guide tailored to your company",
          "Confidentiality and output-checking policy",
          "30-minute follow-up call one month later",
        ],
      },
      de: {
        name: "KI-Praxisworkshop",
        format: "1 Tag (2 × 3,5 Std.) online · bis zu 8 Personen",
        pitch: "Wir gehen von 3 Aufgaben aus Ihrem Arbeitsalltag aus und erarbeiten gemeinsam die Methode, die Ihr Team weiter nutzt.",
        includes: [
          "Vorgespräch vor dem Workshop",
          "3 echte Aufgaben: Angebote, Protokolle, E-Mails, Dokumente…",
          "Interner Nutzungsleitfaden für Ihr Unternehmen",
          "Richtlinie zu Vertraulichkeit und Ergebnisprüfung",
          "30-minütiges Nachgespräch einen Monat später",
        ],
      },
    },
  },
  {
    id: "mise-en-place",
    audience: "entreprise",
    price: 1490,
    from: true,
    stripePriceId: null,
    payment: null,
    copy: {
      fr: {
        name: "Mise en place IA",
        format: "Projet sur devis · 1 processus automatisé",
        pitch: "La partie technique : on installe l'outil, on le branche à vos logiciels et on forme ceux qui l'utilisent.",
        includes: [
          "Analyse d'un processus (relances, devis, tri d'e-mails, base documentaire…)",
          "Installation et connexion à vos outils",
          "Validation humaine avant tout envoi automatique",
          "Formation des utilisateurs et documentation",
        ],
      },
      en: {
        name: "AI Implementation",
        format: "Quoted project · 1 automated process",
        pitch: "The technical part: we install the tool, connect it to your software and train the people who use it.",
        includes: [
          "Analysis of one process (follow-ups, quotes, e-mail sorting, knowledge base…)",
          "Installation and connection to your tools",
          "Human approval before anything is sent automatically",
          "User training and documentation",
        ],
      },
      de: {
        name: "KI-Einführung",
        format: "Projekt nach Angebot · 1 automatisierter Prozess",
        pitch: "Der technische Teil: Wir installieren das Werkzeug, verbinden es mit Ihrer Software und schulen die Nutzer.",
        includes: [
          "Analyse eines Prozesses (Mahnungen, Angebote, E-Mail-Sortierung, Wissensdatenbank…)",
          "Installation und Anbindung an Ihre Werkzeuge",
          "Menschliche Freigabe vor jedem automatischen Versand",
          "Schulung der Nutzer und Dokumentation",
        ],
      },
    },
  },
  {
    id: "accompagnement",
    audience: "entreprise",
    price: 190,
    monthly: true,
    stripePriceId: "price_1UbO23GSZgm5QCNLF8V6nRK6",
    payment: {
      fr: { url: "https://buy.stripe.com/fZu00j64Rawi2Vj2me1oI07", linkId: "plink_1UbO23GSZgm5QCNLdjaqeEKa" },
      en: { url: "https://buy.stripe.com/00wdR90Kx47UeE19OG1oI0e", linkId: "plink_1UbOCEGSZgm5QCNL06JjCAwk" },
      de: { url: "https://buy.stripe.com/7sY3cv3WJbAmgM93qi1oI0f", linkId: "plink_1UbOCFGSZgm5QCNLlYckLUy5" },
    },
    copy: {
      fr: {
        name: "Accompagnement IA",
        format: "Sans engagement · résiliable chaque mois",
        pitch: "Un référent IA externe pour suivre les nouveautés, ajuster vos outils et former les nouveaux arrivants.",
        includes: [
          "1 séance d'1 h par mois",
          "Questions par e-mail, réponse sous 48 h ouvrées",
          "Ajustement de vos consignes et automatisations",
          "Point sur les nouveaux outils utiles à votre activité",
        ],
      },
      en: {
        name: "AI Support Plan",
        format: "No commitment · cancel any month",
        pitch: "An external AI lead who tracks what's new, fine-tunes your tools and trains new hires.",
        includes: [
          "One 1-hour session per month",
          "Questions by e-mail, answered within 2 business days",
          "Fine-tuning of your prompts and automations",
          "Update on new tools useful to your business",
        ],
      },
      de: {
        name: "KI-Begleitung",
        format: "Ohne Mindestlaufzeit · monatlich kündbar",
        pitch: "Ein externer KI-Ansprechpartner, der Neuerungen verfolgt, Ihre Werkzeuge anpasst und neue Mitarbeitende schult.",
        includes: [
          "1 Sitzung à 1 Std. pro Monat",
          "Fragen per E-Mail, Antwort innerhalb von 2 Werktagen",
          "Anpassung Ihrer Anweisungen und Automatisierungen",
          "Überblick über neue, für Sie nützliche Werkzeuge",
        ],
      },
    },
  },
  {
    id: "session-perso",
    audience: "particulier",
    price: 69,
    stripePriceId: "price_1UbO24GSZgm5QCNL0M5ckfGN",
    payment: {
      fr: { url: "https://buy.stripe.com/3cI9AT8cZawigM96Cu1oI08", linkId: "plink_1UbO24GSZgm5QCNLPBJ8kSHe" },
      en: { url: "https://buy.stripe.com/7sY3cv3WJ9se7bz1ia1oI0g", linkId: "plink_1UbOCGGSZgm5QCNLfZPT64Tj" },
      de: { url: "https://buy.stripe.com/00wbJ1al7dIu53rgd41oI0h", linkId: "plink_1UbOCGGSZgm5QCNLy1O1F3ZP" },
    },
    copy: {
      fr: {
        name: "Session IA perso",
        format: "1 h 30 à distance · en individuel",
        pitch: "Un objectif concret, traité ensemble avec les bons outils.",
        includes: [
          "Recherche d'emploi : CV, lettres, préparation d'entretien",
          "Démarches administratives : courriers, dossiers, compréhension de documents",
          "Lancer son activité : offre, textes, organisation",
        ],
      },
      en: {
        name: "Personal AI Session",
        format: "1.5 hours, remote · one-to-one",
        pitch: "One concrete goal, worked on together with the right tools.",
        includes: [
          "Job hunting: CV, cover letters, interview prep",
          "Paperwork: letters, applications, understanding documents",
          "Starting a business: offer, copy, organisation",
        ],
      },
      de: {
        name: "Persönliche KI-Sitzung",
        format: "1,5 Std. online · Einzelsitzung",
        pitch: "Ein konkretes Ziel, gemeinsam mit den passenden Werkzeugen umgesetzt.",
        includes: [
          "Jobsuche: Lebenslauf, Anschreiben, Vorbereitung aufs Gespräch",
          "Behördengänge: Briefe, Anträge, Dokumente verstehen",
          "Selbstständig machen: Angebot, Texte, Organisation",
        ],
      },
    },
  },
  {
    id: "parcours-perso",
    audience: "particulier",
    price: 179,
    featured: true,
    stripePriceId: "price_1UbO25GSZgm5QCNLWtSCvok2",
    payment: {
      fr: { url: "https://buy.stripe.com/bJe5kD9h347UanLaSK1oI09", linkId: "plink_1UbO25GSZgm5QCNLHRA1JvWh" },
      en: { url: "https://buy.stripe.com/aFabJ178V9sedzX7Gy1oI0i", linkId: "plink_1UbOCHGSZgm5QCNLnCYjqri8" },
      de: { url: "https://buy.stripe.com/3cIbJ1ctfbAmcvTd0S1oI0j", linkId: "plink_1UbOCHGSZgm5QCNLu3NPJgsC" },
    },
    copy: {
      fr: {
        name: "Parcours IA perso",
        format: "3 sessions d'1 h 30 · à planifier sous 2 mois",
        pitch: "Pour devenir autonome : on avance par étapes et vous repartez avec vos propres méthodes.",
        includes: [
          "Les sujets de la session perso, sur 3 rendez-vous",
          "Exercices entre les sessions",
          "Fiche de méthodes personnalisée",
        ],
      },
      en: {
        name: "Personal AI Programme",
        format: "3 sessions of 1.5 hours · within 2 months",
        pitch: "To become independent: we go step by step and you leave with your own methods.",
        includes: [
          "The personal session topics, over 3 meetings",
          "Exercises between sessions",
          "Personalised method sheet",
        ],
      },
      de: {
        name: "Persönlicher KI-Kurs",
        format: "3 Sitzungen à 1,5 Std. · innerhalb von 2 Monaten",
        pitch: "Um selbstständig zu werden: Schritt für Schritt, und Sie gehen mit Ihren eigenen Methoden nach Hause.",
        includes: [
          "Die Themen der Einzelsitzung, verteilt auf 3 Termine",
          "Übungen zwischen den Sitzungen",
          "Persönliches Methodenblatt",
        ],
      },
    },
  },
];

export function iaOfferById(id: string | null | undefined) {
  return IA_OFFERS.find((o) => o.id === id) ?? null;
}

/** Retrouve l'offre et la langue à partir de l'ID du Payment Link (webhook). */
export function iaOfferByPaymentLink(paymentLinkId: string | null | undefined): { offer: IaOffer; locale: IaLocale } | null {
  if (!paymentLinkId) return null;
  for (const offer of IA_OFFERS) {
    if (!offer.payment) continue;
    for (const locale of ["fr", "en", "de"] as const) {
      if (offer.payment[locale].linkId === paymentLinkId) return { offer, locale };
    }
  }
  return null;
}

const THOUSANDS: Record<IaLocale, string> = { fr: " ", en: ",", de: "." };

/** Séparateur de milliers fixe, indépendant de l'ICU du serveur (FR : espace fine insécable). */
export function formatIaAmount(value: number, locale: IaLocale = "fr") {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS[locale]);
}

const PRICE_WORDS: Record<IaLocale, { from: string; month: string }> = {
  fr: { from: "à partir de ", month: "mois" },
  en: { from: "from ", month: "month" },
  de: { from: "ab ", month: "Monat" },
};

export function formatIaPrice(o: Pick<IaOffer, "price" | "from" | "monthly">, locale: IaLocale = "fr") {
  const w = PRICE_WORDS[locale];
  const amount = locale === "en" ? `€${formatIaAmount(o.price, locale)}` : `${formatIaAmount(o.price, locale)} €`;
  return `${o.from ? w.from : ""}${amount}${o.monthly ? ` / ${w.month}` : ""}`;
}
