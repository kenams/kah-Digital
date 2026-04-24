import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";
import { FiCheck, FiArrowRight, FiZap } from "react-icons/fi";

type OffersPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    eyebrow: "Offres & tarifs",
    title: "Budgets clairs. Périmètre défini. Pas de surprise.",
    body: "Chaque offre liste ce qui est inclus, le délai de production moyen et pourquoi ce budget. Devis personnalisé disponible pour tout besoin hors catalogue.",
    popular: "Le plus demandé",
    requestQuote: "Demander un devis",
    startChat: "Démarrer le chat",
    customNote: "Besoin hors catalogue ? Devis personnalisé sous 24h.",
    customCta: "Nous contacter",
    timeline: "Délai",
    includes: "Ce qui est inclus",
    idealFor: "Idéal pour",
    offers: [
      {
        id: "landing-portfolio",
        tag: null,
        title: "Landing / Portfolio",
        price: "€ 300 – 600",
        timeline: "1 – 2 semaines",
        summary: "Page unique, design propre, adapté mobile. Idéal pour un portfolio personnel, une activité freelance ou un projet à tester.",
        includes: [
          "1 à 3 sections sur une page",
          "Design responsive personnalisé",
          "Formulaire de contact ou lien email",
          "Mise en ligne sur votre domaine",
        ],
        idealFor: ["Particuliers", "Freelances", "Projets personnels"],
        accent: "from-pink-500/20 to-rose-600/10",
        border: "border-pink-500/20",
      },
      {
        id: "site-vitrine",
        tag: null,
        title: "Site vitrine",
        price: "€ 900 – 1 500",
        timeline: "2 – 3 semaines",
        summary: "Présence professionnelle en ligne, design soigné, SEO de base et formulaire de contact.",
        includes: [
          "5 à 8 pages responsive",
          "Design moderne sur mesure",
          "SEO de base (titres, meta, sitemap)",
          "Formulaire de contact",
          "Mise en ligne sur votre domaine",
        ],
        idealFor: ["Indépendants", "TPE", "Professions libérales"],
        accent: "from-sky-500/20 to-blue-600/10",
        border: "border-sky-500/20",
      },
      {
        id: "site-corporate",
        tag: "Le plus demandé",
        title: "Site corporate",
        price: "€ 2 200 – 4 500",
        timeline: "3 – 5 semaines",
        summary: "Site complet avec pages services, blog ou actualités, design premium et optimisation SEO avancée.",
        includes: [
          "10 à 20 pages responsive",
          "Design premium + animations",
          "SEO avancé + blog/actualités",
          "Formulaire + intégration CRM",
          "Analytics + suivi des conversions",
          "Mise en ligne + QA complète",
        ],
        idealFor: ["PME", "Cabinets", "Marques en croissance"],
        accent: "from-violet-500/20 to-purple-600/10",
        border: "border-violet-500/30",
      },
      {
        id: "application-web",
        tag: null,
        title: "Application web sur mesure",
        price: "€ 4 000 – 12 000",
        timeline: "4 – 10 semaines",
        summary: "Outil métier, portail, dashboard ou SaaS avec authentification, base de données et logique métier.",
        includes: [
          "Architecture technique structurée",
          "Auth + rôles + gestion comptes",
          "Dashboard et pages dynamiques",
          "Intégrations API / paiement",
          "Back-office simple",
          "Tests + QA + mise en ligne",
        ],
        idealFor: ["Startups", "Équipes internes", "SaaS B2B"],
        accent: "from-emerald-500/20 to-teal-600/10",
        border: "border-emerald-500/20",
      },
      {
        id: "automatisation-ia",
        tag: null,
        title: "Automatisation IA",
        price: "€ 1 500 – 8 000",
        timeline: "2 – 6 semaines",
        summary: "Workflows automatisés, assistant IA, traitement de documents ou intégration LLM dans vos outils existants.",
        includes: [
          "Audit du flux à automatiser",
          "Intégration LLM (Claude, GPT, etc.)",
          "Connexion à vos outils (Notion, CRM, email)",
          "Interface ou webhook selon le besoin",
          "Documentation + formation",
        ],
        idealFor: ["Direction", "Ops & Admin", "Support client"],
        accent: "from-amber-500/20 to-orange-600/10",
        border: "border-amber-500/20",
      },
    ],
    customOffers: {
      title: "Projet hors catalogue ?",
      body: "Application mobile, e-commerce avancé, parcours GLPI, refonte complète — tout besoin est évalué sur mesure.",
      items: [
        { label: "Application mobile", price: "€ 6 000 – 20 000" },
        { label: "E-commerce complet", price: "€ 3 500 – 9 000" },
        { label: "Parcours support GLPI", price: "€ 2 500 – 8 000" },
        { label: "Refonte + migration", price: "Sur devis" },
      ],
    },
  },
  en: {
    eyebrow: "Offers & pricing",
    title: "Clear budgets. Defined scope. No surprises.",
    body: "Each offer lists what is included, the average production timeline, and why that budget. Custom quotes available for any off-catalogue need.",
    popular: "Most requested",
    requestQuote: "Request a quote",
    startChat: "Start chat",
    customNote: "Need something off-catalogue? Custom quote within 24h.",
    customCta: "Contact us",
    timeline: "Timeline",
    includes: "What's included",
    idealFor: "Ideal for",
    offers: [
      {
        id: "landing-portfolio",
        tag: null,
        title: "Landing / Portfolio",
        price: "€ 300 – 600",
        timeline: "1 – 2 weeks",
        summary: "Single page, clean design, mobile-ready. Perfect for a personal portfolio, freelance activity, or a project to test.",
        includes: [
          "1 to 3 sections on one page",
          "Custom responsive design",
          "Contact form or email link",
          "Live on your domain",
        ],
        idealFor: ["Individuals", "Freelancers", "Personal projects"],
        accent: "from-pink-500/20 to-rose-600/10",
        border: "border-pink-500/20",
      },
      {
        id: "site-vitrine",
        tag: null,
        title: "Showcase site",
        price: "€ 900 – 1,500",
        timeline: "2 – 3 weeks",
        summary: "Professional online presence, clean design, basic SEO, and contact form.",
        includes: [
          "5 to 8 responsive pages",
          "Modern custom design",
          "Basic SEO (titles, meta, sitemap)",
          "Contact form",
          "Live deployment on your domain",
        ],
        idealFor: ["Freelancers", "Small businesses", "Professionals"],
        accent: "from-sky-500/20 to-blue-600/10",
        border: "border-sky-500/20",
      },
      {
        id: "site-corporate",
        tag: "Most requested",
        title: "Corporate site",
        price: "€ 2,200 – 4,500",
        timeline: "3 – 5 weeks",
        summary: "Full site with services pages, blog or news, premium design, and advanced SEO.",
        includes: [
          "10 to 20 responsive pages",
          "Premium design + animations",
          "Advanced SEO + blog/news",
          "Form + CRM integration",
          "Analytics + conversion tracking",
          "Deployment + full QA",
        ],
        idealFor: ["SMBs", "Professional firms", "Growing brands"],
        accent: "from-violet-500/20 to-purple-600/10",
        border: "border-violet-500/30",
      },
      {
        id: "application-web",
        tag: null,
        title: "Custom web app",
        price: "€ 4,000 – 12,000",
        timeline: "4 – 10 weeks",
        summary: "Business tool, portal, dashboard, or SaaS with auth, database, and business logic.",
        includes: [
          "Structured technical architecture",
          "Auth + roles + account management",
          "Dashboard and dynamic pages",
          "API / payment integrations",
          "Simple back-office",
          "Testing + QA + deployment",
        ],
        idealFor: ["Startups", "Internal teams", "B2B SaaS"],
        accent: "from-emerald-500/20 to-teal-600/10",
        border: "border-emerald-500/20",
      },
      {
        id: "automatisation-ia",
        tag: null,
        title: "AI automation",
        price: "€ 1,500 – 8,000",
        timeline: "2 – 6 weeks",
        summary: "Automated workflows, AI assistant, document processing, or LLM integration into your existing tools.",
        includes: [
          "Flow audit",
          "LLM integration (Claude, GPT, etc.)",
          "Connection to your tools (Notion, CRM, email)",
          "Interface or webhook as needed",
          "Documentation + training",
        ],
        idealFor: ["Management", "Ops & Admin", "Customer support"],
        accent: "from-amber-500/20 to-orange-600/10",
        border: "border-amber-500/20",
      },
    ],
    customOffers: {
      title: "Off-catalogue project?",
      body: "Mobile app, advanced e-commerce, GLPI workflow, full redesign — any need is evaluated on a custom basis.",
      items: [
        { label: "Mobile app", price: "€ 6,000 – 20,000" },
        { label: "Full e-commerce", price: "€ 3,500 – 9,000" },
        { label: "GLPI support flow", price: "€ 2,500 – 8,000" },
        { label: "Redesign + migration", price: "On quote" },
      ],
    },
  },
  de: {
    eyebrow: "Angebote & Preise",
    title: "Klare Budgets. Definierter Scope. Keine Ueberraschungen.",
    body: "Jedes Angebot zeigt was enthalten ist, die durchschnittliche Produktionsdauer und warum dieses Budget. Individuelle Offerte fuer jeden Sonderbedarf.",
    popular: "Am haeuﬁgsten gefragt",
    requestQuote: "Projekt anfragen",
    startChat: "Chat starten",
    customNote: "Bedarf ausserhalb des Katalogs? Individuelle Offerte in 24h.",
    customCta: "Kontakt aufnehmen",
    timeline: "Dauer",
    includes: "Enthalten",
    idealFor: "Ideal fuer",
    offers: [
      {
        id: "landing-portfolio",
        tag: null,
        title: "Landing / Portfolio",
        price: "€ 300 – 600",
        timeline: "1 – 2 Wochen",
        summary: "Eine Seite, sauberes Design, mobil optimiert. Ideal fuer ein persoenliches Portfolio, freiberufliche Taetigkeit oder ein Testprojekt.",
        includes: [
          "1 bis 3 Sektionen auf einer Seite",
          "Individuelles responsives Design",
          "Kontaktformular oder E-Mail-Link",
          "Live auf Ihrer Domain",
        ],
        idealFor: ["Privatpersonen", "Freelancer", "Persoenliche Projekte"],
        accent: "from-pink-500/20 to-rose-600/10",
        border: "border-pink-500/20",
      },
      {
        id: "site-vitrine",
        tag: null,
        title: "Unternehmenswebsite",
        price: "€ 900 – 1.500",
        timeline: "2 – 3 Wochen",
        summary: "Professionelle Online-Praesenz, sauberes Design, Basis-SEO und Kontaktformular.",
        includes: [
          "5 bis 8 responsive Seiten",
          "Modernes individuelles Design",
          "Basis-SEO (Titel, Meta, Sitemap)",
          "Kontaktformular",
          "Live-Deployment auf Ihrer Domain",
        ],
        idealFor: ["Selbststaendige", "Kleinbetriebe", "Freie Berufe"],
        accent: "from-sky-500/20 to-blue-600/10",
        border: "border-sky-500/20",
      },
      {
        id: "site-corporate",
        tag: "Am haeuﬁgsten gefragt",
        title: "Corporate-Website",
        price: "€ 2.200 – 4.500",
        timeline: "3 – 5 Wochen",
        summary: "Vollstaendige Website mit Leistungsseiten, Blog oder News, Premium-Design und erweitertem SEO.",
        includes: [
          "10 bis 20 responsive Seiten",
          "Premium-Design + Animationen",
          "Erweitertes SEO + Blog/News",
          "Formular + CRM-Integration",
          "Analytics + Conversion-Tracking",
          "Deployment + vollstaendige QA",
        ],
        idealFor: ["KMU", "Kanzleien", "Wachsende Marken"],
        accent: "from-violet-500/20 to-purple-600/10",
        border: "border-violet-500/30",
      },
      {
        id: "application-web",
        tag: null,
        title: "Massgeschneiderte Web-App",
        price: "€ 4.000 – 12.000",
        timeline: "4 – 10 Wochen",
        summary: "Business-Tool, Portal, Dashboard oder SaaS mit Auth, Datenbank und Geschaftslogik.",
        includes: [
          "Strukturierte technische Architektur",
          "Auth + Rollen + Kontoverwaltung",
          "Dashboard und dynamische Seiten",
          "API- / Zahlungsintegrationen",
          "Einfaches Backoffice",
          "Tests + QA + Deployment",
        ],
        idealFor: ["Startups", "Interne Teams", "B2B SaaS"],
        accent: "from-emerald-500/20 to-teal-600/10",
        border: "border-emerald-500/20",
      },
      {
        id: "automatisation-ia",
        tag: null,
        title: "KI-Automatisierung",
        price: "€ 1.500 – 8.000",
        timeline: "2 – 6 Wochen",
        summary: "Automatisierte Workflows, KI-Assistent, Dokumentenverarbeitung oder LLM-Integration in bestehende Tools.",
        includes: [
          "Workflow-Audit",
          "LLM-Integration (Claude, GPT etc.)",
          "Anbindung Ihrer Tools (Notion, CRM, E-Mail)",
          "Interface oder Webhook je nach Bedarf",
          "Dokumentation + Schulung",
        ],
        idealFor: ["Fuehrungsebene", "Ops & Admin", "Kundensupport"],
        accent: "from-amber-500/20 to-orange-600/10",
        border: "border-amber-500/20",
      },
    ],
    customOffers: {
      title: "Projekt ausserhalb des Katalogs?",
      body: "Mobile App, erweiterter E-Commerce, GLPI-Workflow, vollstaendige Neugestaltung — jeder Bedarf wird individuell bewertet.",
      items: [
        { label: "Mobile App", price: "€ 6.000 – 20.000" },
        { label: "Vollstaendiger E-Commerce", price: "€ 3.500 – 9.000" },
        { label: "GLPI-Support-Workflow", price: "€ 2.500 – 8.000" },
        { label: "Redesign + Migration", price: "Auf Anfrage" },
      ],
    },
  },
} as const;

export function OffersPageContent({ locale }: OffersPageContentProps) {
  const content = copy[locale];
  const quoteHref = withLocalePrefix("/devis", locale);
  const contactHref = withLocalePrefix("/contact", locale);

  return (
    <div className="min-h-screen bg-gray-950 pb-24 pt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {content.eyebrow}
          </span>
          <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{content.title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{content.body}</p>
        </div>

        {/* Offer cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {content.offers.map((offer) => {
            const isPopular = Boolean(offer.tag);
            return (
              <div
                key={offer.id}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${offer.accent} ${isPopular ? offer.border + " shadow-lg shadow-violet-500/10" : "border-white/8"} p-6`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-violet-500/20 px-3 py-1 text-xs font-semibold text-violet-300 border border-violet-500/30">
                    <FiZap size={11} />
                    {offer.tag}
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-xl font-bold text-white">{offer.title}</h2>
                  <p className="mt-1 text-sm text-gray-400">{offer.summary}</p>
                </div>

                {/* Price + timeline */}
                <div className="mb-5 flex items-end justify-between rounded-xl border border-white/8 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500">Budget</p>
                    <p className="mt-0.5 text-2xl font-extrabold text-white">{offer.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-gray-500">{content.timeline}</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-300">{offer.timeline}</p>
                  </div>
                </div>

                {/* Includes */}
                <div className="mb-5">
                  <p className="mb-3 text-xs uppercase tracking-widest text-gray-500">{content.includes}</p>
                  <ul className="space-y-2">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <FiCheck size={14} className="mt-0.5 shrink-0 text-green-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal for */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {offer.idealFor.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={quoteHref}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                    isPopular
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 shadow-md"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  }`}
                >
                  {content.requestQuote}
                  <FiArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Custom offers table */}
        <div className="mt-12 rounded-2xl border border-white/8 bg-gray-900 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">{content.customOffers.title}</h2>
            <p className="mt-1 text-sm text-gray-400">{content.customOffers.body}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.customOffers.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-white/8 bg-gray-950 px-5 py-4"
              >
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="text-sm font-semibold text-white">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-gray-500">{content.customNote}</p>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              {content.customCta}
              <FiArrowRight size={13} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
