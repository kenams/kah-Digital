import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type OffersPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    backHome: "Retour à l'accueil",
    requestQuote: "Demander un devis",
    openConfigurator: "Ouvrir le configurateur",
    eyebrow: "Offres claires",
    title: "Ce que couvre chaque offre, et pourquoi.",
    body: "Objectif: rendre les budgets transparents. Chaque offre liste ce qui est inclus et le temps de production moyen.",
    offerLabel: "Offre",
    budgetLabel: "Budget indicatif en CHF",
    timelineLabel: "Délai moyen",
    whyLabel: "Pourquoi ce prix",
    includedLabel: "Inclus",
    idealLabel: "Idéal pour",
    offers: [
      {
        id: "landing-conversion",
        title: "Landing conversion",
        price: "1'900 CHF",
        timeline: "3 semaines",
        summary: "Une page unique, rapide et orientée conversion pour capter des leads qualifiés.",
        why: "Le budget couvre la stratégie de message, un design sur mesure, l'intégration du formulaire et la QA avant mise en ligne.",
        includes: [
          "Workshop express + structure du message",
          "Design premium + animations légères",
          "Formulaire + tracking basique",
          "Mise en ligne + QA",
        ],
        ideal: ["Campagne produit", "Lancement marque", "Offre premium"],
      },
      {
        id: "portail-membres",
        title: "Portail membres privé",
        price: "5'900 CHF",
        timeline: "5 semaines",
        summary: "Espace sécurisé pour contenus, abonnements et tableaux de bord internes.",
        why: "Le prix inclut l'authentification, la gestion des rôles, la base de données et les paiements récurrents.",
        includes: [
          "Auth + rôles + gestion comptes",
          "Dashboard et pages membres",
          "Paiements récurrents (Stripe)",
          "Back-office simple",
        ],
        ideal: ["Communautes", "Formations", "SaaS B2B"],
      },
      {
        id: "configurateur-deck",
        title: "Devis interactif + dossier PDF",
        price: "7'900 CHF",
        timeline: "6 semaines",
        summary: "Un parcours simple pour estimer un projet et générer un PDF clair.",
        why: "Le budget couvre les écrans, le calcul du devis et la génération automatique du PDF.",
        includes: [
          "Parcours en quelques étapes",
          "Synthèse devis + export PDF",
          "Connexion CRM / Notion",
          "Modèle de dossier PDF",
        ],
        ideal: ["Agences", "Studios", "Équipes sales"],
      },
    ],
  },
  en: {
    backHome: "Back to home",
    requestQuote: "Request a quote",
    openConfigurator: "Open quick quote",
    eyebrow: "Clear offers",
    title: "What each offer includes, and why.",
    body: "Goal: make budgets transparent. Each offer lists what is included and the typical delivery time.",
    offerLabel: "Offer",
    budgetLabel: "Indicative budget in CHF",
    timelineLabel: "Average timeline",
    whyLabel: "Why this price",
    includedLabel: "Included",
    idealLabel: "Ideal for",
    offers: [
      {
        id: "landing-conversion",
        title: "Conversion landing",
        price: "CHF 1,900",
        timeline: "3 weeks",
        summary: "A single, fast page focused on capturing qualified leads.",
        why: "The budget covers messaging strategy, custom design, form integration, and QA before launch.",
        includes: [
          "Quick workshop + message structure",
          "Premium design + light animations",
          "Form + basic tracking",
          "Launch + QA",
        ],
        ideal: ["Product campaign", "Brand launch", "Premium offer"],
      },
      {
        id: "portail-membres",
        title: "Private member portal",
        price: "CHF 5,900",
        timeline: "5 weeks",
        summary: "Secure space for content, subscriptions, and internal dashboards.",
        why: "The price includes authentication, roles, database setup, and recurring payments.",
        includes: [
          "Auth + roles + account management",
          "Member dashboards",
          "Recurring payments (Stripe)",
          "Simple back-office",
        ],
        ideal: ["Communities", "Training", "B2B SaaS"],
      },
      {
        id: "configurateur-deck",
        title: "Interactive quote + PDF pack",
        price: "CHF 7,900",
        timeline: "6 weeks",
        summary: "A simple path to estimate a project and generate a clear PDF.",
        why: "The budget covers the flow, the quote logic, and automatic PDF generation.",
        includes: [
          "Multi-step flow",
          "Quote summary + PDF export",
          "CRM / Notion connection",
          "PDF pack template",
        ],
        ideal: ["Agencies", "Studios", "Sales teams"],
      },
    ],
  },
  de: {
    backHome: "Zur Startseite",
    requestQuote: "Projekt anfragen",
    openConfigurator: "Konfigurator oeffnen",
    eyebrow: "Klare Angebote",
    title: "Was jedes Angebot umfasst und warum.",
    body: "Ziel: Budgets transparent machen. Jedes Angebot zeigt klar, was enthalten ist und wie lange die Umsetzung im Schnitt dauert.",
    offerLabel: "Angebot",
    budgetLabel: "Richtbudget in CHF",
    timelineLabel: "Durchschnittliche Dauer",
    whyLabel: "Warum dieser Preis",
    includedLabel: "Enthalten",
    idealLabel: "Ideal fuer",
    offers: [
      {
        id: "landing-conversion",
        title: "Conversion-Landingpage",
        price: "CHF 1'900",
        timeline: "3 Wochen",
        summary: "Eine schnelle Einzelseite mit klarer Conversion-Logik, um qualifizierte Leads zu gewinnen.",
        why: "Das Budget deckt die Messaging-Strategie, ein individuelles Design, die Formular-Integration und die QA vor dem Launch ab.",
        includes: [
          "Kurzworkshop + Botschaftsstruktur",
          "Premium-Design + leichte Animationen",
          "Formular + Basis-Tracking",
          "Launch + QA",
        ],
        ideal: ["Produktkampagne", "Markenstart", "Premium-Angebot"],
      },
      {
        id: "portail-membres",
        title: "Privates Mitgliederportal",
        price: "CHF 5'900",
        timeline: "5 Wochen",
        summary: "Geschuetzter Bereich fuer Inhalte, Abos und interne Dashboards.",
        why: "Der Preis umfasst Authentifizierung, Rollenverwaltung, Datenbank-Setup und wiederkehrende Zahlungen.",
        includes: [
          "Auth + Rollen + Kontoverwaltung",
          "Mitglieder-Dashboard",
          "Wiederkehrende Zahlungen (Stripe)",
          "Einfaches Backoffice",
        ],
        ideal: ["Communities", "Trainings", "B2B SaaS"],
      },
      {
        id: "configurateur-deck",
        title: "Interaktive Offerte + PDF-Dossier",
        price: "CHF 7'900",
        timeline: "6 Wochen",
        summary: "Ein klarer Ablauf, um ein Projekt zu schaetzen und ein sauberes PDF zu erzeugen.",
        why: "Das Budget deckt die Screens, die Angebotslogik und die automatische PDF-Erstellung ab.",
        includes: [
          "Mehrstufiger Ablauf",
          "Offerten-Zusammenfassung + PDF-Export",
          "CRM- / Notion-Anbindung",
          "PDF-Dossier-Vorlage",
        ],
        ideal: ["Agenturen", "Studios", "Sales-Teams"],
      },
    ],
  },
} as const;

export function OffersPageContent({ locale }: OffersPageContentProps) {
  const content = copy[locale];
  const homeHref = withLocalePrefix("/", locale);
  const quoteHref = withLocalePrefix("/devis", locale);
  const configuratorHref = withLocalePrefix("/configurateur", locale);

  return (
    <div className="section-shell space-y-10">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href={homeHref}
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          {content.backHome}
        </Link>
        <Link
          href={quoteHref}
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          {content.requestQuote}
        </Link>
      </div>

      <header className="premium-card rounded-[36px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">{content.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{content.title}</h1>
        <p className="mt-3 max-w-3xl text-white/70">{content.body}</p>
      </header>

      <div className="space-y-6">
        {content.offers.map((offer) => (
          <section
            key={offer.id}
            id={offer.id}
            className="premium-card rounded-[32px] border border-white/10 bg-black/40 p-6 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{content.offerLabel}</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{offer.title}</h2>
                <p className="mt-2 max-w-2xl text-white/70">{offer.summary}</p>
              </div>
              <div className="premium-card rounded-3xl border border-white/15 bg-white/5 p-4 text-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{content.budgetLabel}</p>
                <p className="mt-1 text-2xl font-semibold">{offer.price}</p>
                <p className="mt-1 text-white/60">
                  {content.timelineLabel}: {offer.timeline}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{content.whyLabel}</p>
                <p className="mt-3 text-white/70">{offer.why}</p>
              </div>
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{content.includedLabel}</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {offer.includes.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
              <div className="premium-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">{content.idealLabel}</p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {offer.ideal.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <Link
                href={quoteHref}
                className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200"
              >
                {content.requestQuote}
              </Link>
              <Link
                href={configuratorHref}
                className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
              >
                {content.openConfigurator}
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
