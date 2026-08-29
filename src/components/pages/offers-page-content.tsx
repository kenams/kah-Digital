import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";
import { FiCheck, FiArrowRight, FiZap, FiRefreshCw } from "react-icons/fi";

type OffersPageContentProps = {
  locale: Locale;
};

const copy = {
  fr: {
    eyebrow: "Prestations sur mesure",
    title: "Pas de formule rigide. Un accompagnement ajusté à votre besoin.",
    body: "Chaque projet est étudié selon votre contexte, la complexité, les délais, le niveau d'accompagnement souhaité et le budget disponible. L'objectif est de proposer une solution utile, pas une formule inutile ou trop chère.",
    popular: "Le plus demandé",
    requestQuote: "Recevoir une proposition sur mesure",
    startChat: "Démarrer le chat",
    customNote: "Besoin spécifique ? Un premier échange permet de définir le bon périmètre.",
    customCta: "Planifier un échange",
    timeline: "Délai",
    includes: "Ce qui est inclus",
    idealFor: "Idéal pour",
    maintenance: {
      eyebrow: "Support & maintenance",
      title: "Après livraison, on reste là",
      body: "Chaque projet livré peut être suivi par une formule mensuelle. Mises à jour, corrections, ajouts légers, suivi des performances.",
      plans: [
        {
          name: "Essentiel",
          price: "79 € / mois",
          desc: "Mises à jour sécurité, sauvegardes, monitoring uptime.",
          items: ["Mises à jour CMS / dépendances", "Sauvegarde hebdomadaire", "Monitoring uptime 24/7", "Support email (48h)"],
        },
        {
          name: "Confort",
          price: "149 € / mois",
          desc: "Tout Essentiel + corrections mineures et ajouts de contenu.",
          items: ["Tout du plan Essentiel", "2h de modifications / mois", "Ajouts textes et images", "Support prioritaire (24h)"],
          popular: true,
        },
        {
          name: "Pro",
          price: "299 € / mois",
          desc: "Tout Confort + développement léger et suivi analytique mensuel.",
          items: ["Tout du plan Confort", "5h de développement / mois", "Rapport analytique mensuel", "Support dédié (réponse jour-même)"],
        },
      ],
      note: "Le niveau de support est ajusté après livraison selon votre autonomie, vos priorités et le rythme d'évolution souhaité.",
      cta: "Discuter du support",
    },
    // 2026-08-02 : réaligné sur les 3 forfaits de la home (pricing-section.tsx)
    // — cette page avait sa propre grille de prix (490 à 2990€) totalement
    // déconnectée des prix affichés sur la home (142/390/1 690€), ce qui rendait
    // le site incohérent pour un visiteur qui compare les deux. Même 3
    // forfaits, mêmes prix, partout.
    offers: [
      {
        id: "starter",
        tag: null,
        title: "Starter",
        price: "142 €",
        timeline: "5 jours",
        summary: "Présence en ligne propre et rapide. Une page qui donne confiance dès le premier regard.",
        includes: [
          "1 landing page complète",
          "Section hero + services + contact",
          "Formulaire de contact",
          "Design responsive mobile",
          "SEO technique de base",
        ],
        idealFor: ["Particuliers", "Freelances", "Projets à tester"],
        accent: "from-pink-500/20 to-rose-600/10",
        border: "border-pink-500/20",
      },
      {
        id: "business",
        tag: "Le plus demandé",
        title: "Business",
        price: "790 €",
        timeline: "14 jours",
        summary: "Le site professionnel complet qui convertit les visiteurs en clients et s'impose face à la concurrence.",
        includes: [
          "Jusqu'à 6 pages incluses",
          "Logo & identité visuelle inclus",
          "SEO technique complet inclus",
          "Design premium niveau SaaS",
          "Formulaire devis + WhatsApp",
          "2 mois de support offert",
        ],
        idealFor: ["Indépendants", "TPE/PME", "Professions libérales"],
        accent: "from-violet-500/20 to-purple-600/10",
        border: "border-violet-500/30",
      },
      {
        id: "agent-ia",
        tag: "Agent inclus",
        title: "Agent IA vertical",
        price: "1 690 €",
        timeline: "28 jours",
        summary: "Un agent IA branché sur votre métier, qui travaille pour vous 24h/24 — sur le modèle de KAH Workforce.",
        includes: [
          "Tout le plan Business",
          "Agent IA vertical personnalisé",
          "Qualification leads automatique",
          "Automatisation emails & CRM",
          "3 mois de support prioritaire",
        ],
        idealFor: ["PME en croissance", "Métiers avec beaucoup d'admin", "Marques ambitieuses"],
        accent: "from-amber-500/20 to-orange-600/10",
        border: "border-amber-500/20",
      },
    ],
    customOffers: {
      title: "Projet hors catalogue ?",
      body: "Application mobile, e-commerce avancé, parcours GLPI, refonte complète. Tout besoin est évalué sur mesure.",
      items: [
        { label: "Application mobile", price: "dès 3 500 €" },
        { label: "E-commerce complet", price: "dès 1 990 €" },
        { label: "Parcours support GLPI", price: "devis sur mesure" },
        { label: "Refonte + migration", price: "dès 790 €" },
      ],
    },
  },
  en: {
    eyebrow: "Custom services",
    title: "No rigid package. Support adjusted to your need.",
    body: "Each project is studied according to context, complexity, timeline, support level and available budget. The goal is to propose a useful solution, not an unnecessary or oversized package.",
    popular: "Most requested",
    requestQuote: "Receive a custom proposal",
    startChat: "Start chat",
    customNote: "Specific need? A first exchange helps define the right scope.",
    customCta: "Book a call",
    timeline: "Timeline",
    includes: "What's included",
    idealFor: "Ideal for",
    maintenance: {
      eyebrow: "Support & maintenance",
      title: "After delivery, we stay with you",
      body: "Every delivered project can be followed by a monthly plan. Updates, fixes, minor additions, performance monitoring.",
      plans: [
        {
          name: "Essential",
          price: "€79 / month",
          desc: "Security updates, backups, uptime monitoring.",
          items: ["CMS / dependency updates", "Weekly backup", "24/7 uptime monitoring", "Email support (48h)"],
        },
        {
          name: "Comfort",
          price: "€149 / month",
          desc: "Everything in Essential + minor fixes and content additions.",
          items: ["Everything in Essential", "2h of changes / month", "Text and image updates", "Priority support (24h)"],
          popular: true,
        },
        {
          name: "Pro",
          price: "€299 / month",
          desc: "Everything in Comfort + light development and monthly analytics report.",
          items: ["Everything in Comfort", "5h of development / month", "Monthly analytics report", "Dedicated support (same-day)"],
        },
      ],
      note: "Support level is adjusted after delivery according to autonomy, priorities and desired pace of evolution.",
      cta: "Discuss support",
    },
    // Realigned 2026-08-02 with the 3 homepage plans — same prices everywhere.
    offers: [
      {
        id: "starter",
        tag: null,
        title: "Starter",
        price: "€142",
        timeline: "5 days",
        summary: "Clean and fast online presence. One page that builds trust from the first look.",
        includes: [
          "1 complete landing page",
          "Hero + services + contact sections",
          "Contact form",
          "Mobile responsive design",
          "Basic technical SEO",
        ],
        idealFor: ["Individuals", "Freelancers", "Projects to test"],
        accent: "from-pink-500/20 to-rose-600/10",
        border: "border-pink-500/20",
      },
      {
        id: "business",
        tag: "Most requested",
        title: "Business",
        price: "€790",
        timeline: "14 days",
        summary: "The complete professional site that converts visitors into clients and stands out from competitors.",
        includes: [
          "Up to 6 pages included",
          "Logo & visual identity included",
          "Full technical SEO included",
          "SaaS-level premium design",
          "Quote form + WhatsApp",
          "2 months of free support",
        ],
        idealFor: ["Freelancers", "Small businesses", "Professionals"],
        accent: "from-violet-500/20 to-purple-600/10",
        border: "border-violet-500/30",
      },
      {
        id: "agent-ia",
        tag: "Agent included",
        title: "Vertical AI Agent",
        price: "€1 690",
        timeline: "28 days",
        summary: "An AI agent wired into your business, working for you 24/7 — on the KAH Workforce model.",
        includes: [
          "Everything in Business",
          "Custom vertical AI agent",
          "Automatic lead qualification",
          "Email & CRM automation",
          "3 months of priority support",
        ],
        idealFor: ["Growing SMBs", "Admin-heavy businesses", "Ambitious brands"],
        accent: "from-amber-500/20 to-orange-600/10",
        border: "border-amber-500/20",
      },
    ],
    customOffers: {
      title: "Off-catalogue project?",
      body: "Mobile app, advanced e-commerce, GLPI workflow, full redesign. Any need is evaluated on a custom basis.",
      items: [
        { label: "Mobile app", price: "from €3,500" },
        { label: "Full e-commerce", price: "from €1,990" },
        { label: "GLPI support flow", price: "custom quote" },
        { label: "Redesign + migration", price: "from €790" },
      ],
    },
  },
  de: {
    eyebrow: "Individuelle Leistungen",
    title: "Keine starre Formel. Begleitung passend zum Bedarf.",
    body: "Jedes Projekt wird nach Kontext, Komplexität, Zeitplan, gewünschter Begleitung und verfügbarem Budget betrachtet. Ziel ist eine nützliche Lösung, kein unnötig großes Paket.",
    popular: "Am häufigsten gefragt",
    requestQuote: "Individuelle Offerte erhalten",
    startChat: "Chat starten",
    customNote: "Spezieller Bedarf? Ein Erstgespräch hilft, den passenden Umfang zu definieren.",
    customCta: "Gespräch planen",
    timeline: "Dauer",
    includes: "Enthalten",
    idealFor: "Ideal für",
    maintenance: {
      eyebrow: "Support & Wartung",
      title: "Nach der Lieferung bleiben wir dabei",
      body: "Jedes gelieferte Projekt kann durch einen Monatsplan ergänzt werden. Updates, Korrekturen, kleine Ergänzungen, Performance-Monitoring.",
      plans: [
        {
          name: "Basis",
          price: "Leichter Support",
          desc: "Sicherheitsupdates, Backups, Uptime-Monitoring.",
          items: ["CMS- / Abhängigkeits-Updates", "Wöchentliches Backup", "24/7 Uptime-Monitoring", "E-Mail-Support (48h)"],
        },
        {
          name: "Komfort",
          price: "Erweiterter Support",
          desc: "Alles aus Basis + kleinere Korrekturen und Inhaltsaktualisierungen.",
          items: ["Alles aus Basis", "2h Änderungen / Monat", "Text- und Bildaktualisierungen", "Prioritäts-Support (24h)"],
          popular: true,
        },
        {
          name: "Pro",
          price: "Priorisierte Begleitung",
          desc: "Alles aus Komfort + leichte Entwicklung und monatlicher Analytics-Bericht.",
          items: ["Alles aus Komfort", "5h Entwicklung / Monat", "Monatlicher Analytics-Bericht", "Dedizierter Support (am selben Tag)"],
        },
      ],
      note: "Der Support wird nach Lieferung an Autonomie, Prioritäten und gewünschtes Entwicklungstempo angepasst.",
      cta: "Support besprechen",
    },
    // Am 2026-08-02 an die 3 Pläne der Startseite angeglichen — gleiche Preise überall.
    offers: [
      {
        id: "starter",
        tag: null,
        title: "Starter",
        price: "CHF 149",
        timeline: "5 Tage",
        summary: "Saubere und schnelle Online-Präsenz. Eine Seite, die vom ersten Blick an Vertrauen schafft.",
        includes: [
          "1 vollständige Landing Page",
          "Hero + Services + Kontakt",
          "Kontaktformular",
          "Responsives mobiles Design",
          "Technisches Basis-SEO",
        ],
        idealFor: ["Privatpersonen", "Freelancer", "Testprojekte"],
        accent: "from-pink-500/20 to-rose-600/10",
        border: "border-pink-500/20",
      },
      {
        id: "business",
        tag: "Beste Wahl",
        title: "Business",
        price: "CHF 790",
        timeline: "14 Tage",
        summary: "Die vollständige professionelle Website, die Besucher in Kunden verwandelt und Mitbewerber aussticht.",
        includes: [
          "Bis zu 6 Seiten inklusive",
          "Logo & visuelle Identität inklusive",
          "Vollständiges technisches SEO",
          "SaaS-Level Premium-Design",
          "Angebotsformular + WhatsApp",
          "2 Monate Support inklusive",
        ],
        idealFor: ["Selbstständige", "KMU", "Freie Berufe"],
        accent: "from-violet-500/20 to-purple-600/10",
        border: "border-violet-500/30",
      },
      {
        id: "agent-ia",
        tag: "Agent inklusive",
        title: "Vertikaler KI-Agent",
        price: "CHF 1'690",
        timeline: "28 Tage",
        summary: "Ein KI-Agent, der in Ihr Geschäft eingebettet ist und 24/7 für Sie arbeitet — nach dem Vorbild von KAH Workforce.",
        includes: [
          "Alles aus Business",
          "Individueller vertikaler KI-Agent",
          "Automatische Lead-Qualifizierung",
          "E-Mail- & CRM-Automatisierungen",
          "3 Monate Prioritäts-Support",
        ],
        idealFor: ["Wachsende KMU", "Admin-intensive Betriebe", "Ambitionierte Marken"],
        accent: "from-amber-500/20 to-orange-600/10",
        border: "border-amber-500/20",
      },
    ],
    customOffers: {
      title: "Projekt außerhalb des Katalogs?",
      body: "Mobile App, erweiterter E-Commerce, GLPI-Workflow, vollständige Neugestaltung. Jeder Bedarf wird individuell bewertet.",
      items: [
        { label: "Mobile App", price: "Schätzung nach Scoping" },
        { label: "Vollständiger E-Commerce", price: "Umfang gemeinsam definiert" },
        { label: "GLPI-Support-Workflow", price: "An eure Organisation angepasst" },
        { label: "Redesign + Migration", price: "ab CHF 790" },
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

                {/* Scope + timeline */}
                <div className="mb-5 flex items-end justify-between rounded-xl border border-white/8 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500">
                      {locale === "fr" ? "Type de besoin" : locale === "en" ? "Need type" : "Bedarf"}
                    </p>
                    <p className="mt-0.5 text-xl font-extrabold text-white">{offer.price}</p>
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

        {/* Maintenance section */}
        <div className="mt-16">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400">
              <FiRefreshCw size={13} />
              {content.maintenance.eyebrow}
            </span>
            <h2 className="mb-3 mt-4 text-3xl font-extrabold tracking-tight text-white">{content.maintenance.title}</h2>
            <p className="mx-auto max-w-xl text-gray-400">{content.maintenance.body}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {content.maintenance.plans.map((plan) => {
              const isPopular = "popular" in plan && plan.popular === true;
              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl border p-6 ${
                    isPopular
                      ? "border-emerald-500/40 bg-gradient-to-b from-emerald-500/10 to-emerald-600/5 shadow-lg shadow-emerald-500/10"
                      : "border-white/8 bg-gray-900"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-emerald-500/40 bg-emerald-500/20 px-3 py-0.5 text-xs font-semibold text-emerald-300">
                      Recommandé
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                    <p className="mt-0.5 text-2xl font-extrabold text-white">{plan.price}</p>
                    <p className="mt-1 text-sm text-gray-400">{plan.desc}</p>
                  </div>
                  <ul className="mb-6 flex-1 space-y-2.5">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <FiCheck size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={quoteHref}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                      isPopular
                        ? "bg-emerald-500 text-white hover:bg-emerald-400"
                        : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {content.maintenance.cta}
                    <FiArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">{content.maintenance.note}</p>
        </div>

      </div>
    </div>
  );
}
