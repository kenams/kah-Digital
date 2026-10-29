import Link from "next/link";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";
import { orderHref } from "@/lib/order-links";
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
          price: "49 € / mois",
          desc: "On s'occupe de tout : hébergement, domaine, sécurité, sauvegardes.",
          items: ["Hébergement, domaine, sécurité, sauvegardes", "1 petite modification par mois", "Surveillance du site", "Réponse sous 72 h"],
        },
        {
          name: "Confort",
          price: "99 € / mois",
          desc: "Tout Essentiel + modifications régulières, rapport mensuel et suivi des avis.",
          items: ["Tout du plan Essentiel", "Mises à jour du site par message (KAH Pulse)", "3 modifications de fond par mois", "Rapport mensuel + suivi des avis Google", "Réponse sous 24 h"],
          popular: true,
        },
        {
          name: "Pro",
          price: "199 € / mois",
          desc: "Tout Confort + accompagnement renforcé.",
          items: ["Tout du plan Confort", "Rappels de RDV + demandes d'avis Google automatiques", "Modifications de fond illimitées (usage raisonnable)", "Support WhatsApp direct, réponse sous 4 h ouvrées"],
        },
      ],
      note: "Le niveau de support est ajusté après livraison selon votre autonomie, vos priorités et le rythme d'évolution souhaité.",
      cta: "Discuter du support",
    },
    // 2026-08-02 : réaligné sur les 3 forfaits de la home (pricing-section.tsx)
    // — cette page avait sa propre grille de prix (490 à 2990€) totalement
    // déconnectée des prix affichés sur la home (290/390/2 490€), ce qui rendait
    // le site incohérent pour un visiteur qui compare les deux. Même 3
    // forfaits, mêmes prix, partout.
    offers: [
      {
        id: "starter",
        tag: null,
        title: "Starter",
        price: "290 €",
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
        timeline: "5 jours ouvrés",
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
        price: "2 490 €",
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
        { label: "Application mobile", price: "devis sur mesure" },
        { label: "E-commerce complet", price: "devis sur mesure" },
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
          price: "€49 / month",
          desc: "We take care of everything: hosting, domain, security, backups.",
          items: ["Hosting, domain, security, backups", "1 small edit per month", "Site monitoring", "Reply within 72 h"],
        },
        {
          name: "Comfort",
          price: "€99 / month",
          desc: "Everything in Essential + regular edits, monthly report and reviews follow-up.",
          items: ["Everything in Essential", "Site updates by message (KAH Pulse)", "3 deeper edits per month", "Monthly report + Google reviews follow-up", "Reply within 24 h"],
          popular: true,
        },
        {
          name: "Pro",
          price: "€199 / month",
          desc: "Everything in Comfort + enhanced support.",
          items: ["Everything in Comfort", "Automatic appointment reminders + Google review requests", "Unlimited deeper edits (fair use)", "Direct WhatsApp support, reply within 4 working hours"],
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
        price: "€290",
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
        timeline: "5 business days",
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
        price: "€2 490",
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
        { label: "Mobile app", price: "custom quote" },
        { label: "Full e-commerce", price: "custom quote" },
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
          name: "Essentiel",
          price: "CHF 49 / Monat",
          desc: "Wir kümmern uns um alles: Hosting, Domain, Sicherheit, Backups.",
          items: ["Hosting, Domain, Sicherheit, Backups", "1 kleine Änderung pro Monat", "Überwachung der Website", "Antwort innert 72 h"],
        },
        {
          name: "Confort",
          price: "CHF 99 / Monat",
          desc: "Alles aus Essentiel + regelmässige Änderungen, Monatsbericht und Bewertungs-Monitoring.",
          items: ["Alles aus Essentiel", "Website-Updates per Nachricht (KAH Pulse)", "3 grössere Änderungen pro Monat", "Monatsbericht + Google-Bewertungen im Blick", "Antwort innert 24 h"],
          popular: true,
        },
        {
          name: "Pro",
          price: "CHF 199 / Monat",
          desc: "Alles aus Confort + verstärkte Betreuung.",
          items: ["Alles aus Confort", "Automatische Terminerinnerungen + Google-Bewertungsanfragen", "Unbegrenzte grössere Änderungen (angemessene Nutzung)", "Direkter WhatsApp-Support, Antwort innert 4 Arbeitsstunden"],
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
        price: "CHF 290",
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
        timeline: "5 Werktage",
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
        price: "CHF 2'490",
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

  const cyberCopy: Record<string, { eyebrow: string; title: string; body: string; items: { label: string; price: string }[]; addon: string; cta: string }> = {
    fr: {
      eyebrow: "Nouveau",
      title: "Cybersécurité & conformité",
      body: "Avec Vincent L’helgoual’ch, expert cybersécurité : diagnostic, RGPD, analyse de risques, sensibilisation, RSSI à temps partagé. Périmètre clair, prix annoncé avant de commencer.",
      items: [
        { label: "Diagnostic cybersécurité", price: "dès 1 000 € HT" },
        { label: "Mise en conformité RGPD", price: "dès 3 000 € HT" },
        { label: "Sensibilisation des équipes", price: "dès 1 000 € HT" },
        { label: "RSSI à temps partagé", price: "dès 1 900 € HT / mois" },
      ],
      addon: "Pour nos clients web : revue de sécurité du site + RGPD (mentions, cookies, formulaires) en option, dès 490 € HT.",
      cta: "Voir la cybersécurité",
    },
    en: {
      eyebrow: "New",
      title: "Cybersecurity & compliance",
      body: "With Vincent L’helgoual’ch, cybersecurity expert: assessment, GDPR, risk analysis, awareness training, part-time security officer. Clear scope, price agreed before we start.",
      items: [
        { label: "Cybersecurity assessment", price: "from €1,000 excl. tax" },
        { label: "GDPR compliance", price: "from €3,000 excl. tax" },
        { label: "Team awareness training", price: "from €1,000 excl. tax" },
        { label: "Part-time security officer", price: "from €1,900 excl. tax / month" },
      ],
      addon: "For our web clients: optional site security review + GDPR (notices, cookies, forms), from €490 excl. tax.",
      cta: "See cybersecurity",
    },
    de: {
      eyebrow: "Neu",
      title: "Cybersicherheit & Compliance",
      body: "Mit Vincent L’helgoual’ch, Experte für Cybersicherheit: Analyse, DSGVO, Risikoanalyse, Sensibilisierung, Sicherheitsverantwortlicher auf Teilzeit. Klarer Umfang, Preis vor Projektbeginn.",
      items: [
        { label: "Cybersicherheits-Analyse", price: "ab 1 000 € netto" },
        { label: "DSGVO-Konformität", price: "ab 3 000 € netto" },
        { label: "Sensibilisierung der Teams", price: "ab 1 000 € netto" },
        { label: "Sicherheitsverantwortlicher auf Teilzeit", price: "ab 1 900 € netto / Monat" },
      ],
      addon: "Für unsere Web-Kunden: optionale Sicherheitsprüfung der Website + DSGVO (Impressum, Cookies, Formulare), ab 490 € netto.",
      cta: "Cybersicherheit ansehen",
    },
  };
  const cyber = cyberCopy[locale];

  // Offre de lancement : réelle et tenue (5 premières places, jusqu'au 31/12/2026).
  const launchCopy: Record<string, { badge: string; title: string; body: string; terms: string; cta: string }> = {
    fr: {
      badge: "Offre de lancement",
      title: "Site + réservation en ligne : 1 290 € au lieu de 1 490 €",
      body: "Pour les 5 premiers clients, jusqu'au 31 décembre 2026. Site pro, prise de rendez-vous en autonomie, espace admin, livré en 5 jours ouvrés après réception du contenu.",
      terms: "Acompte 30 %, solde à la livraison · une série de retouches incluse · paiement en 2 fois possible",
      cta: "Réserver ma place",
    },
    en: {
      badge: "Launch offer",
      title: "Website + online booking: €1,290 instead of €1,490",
      body: "For our first 5 clients, until 31 December 2026. Professional site, self-service booking, admin area, delivered 5 working days after we receive your content.",
      terms: "30% deposit, balance on delivery · one round of revisions included · payment in 2 instalments available",
      cta: "Reserve my spot",
    },
    de: {
      badge: "Startangebot",
      title: "Website + Online-Terminbuchung: CHF 1'290 statt CHF 1'490",
      body: "Für unsere ersten 5 Kunden, bis 31. Dezember 2026. Professionelle Website, Terminbuchung in Eigenregie, Admin-Bereich, Lieferung 5 Werktage nach Erhalt der Inhalte.",
      terms: "30 % Anzahlung, Rest bei Lieferung · eine Korrekturrunde inklusive · Zahlung in 2 Raten möglich",
      cta: "Platz sichern",
    },
  };
  const launch = launchCopy[locale] ?? launchCopy.fr;

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

        {/* Offre de lancement */}
        <section
          aria-label={launch.badge}
          className="mb-10 overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-500/10 via-blue-500/5 to-transparent p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-300">
                <FiZap size={11} />
                {launch.badge}
              </span>
              <h2 className="text-xl font-bold text-white sm:text-2xl">{launch.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">{launch.body}</p>
              <p className="mt-3 text-xs text-gray-500">{launch.terms}</p>
            </div>
            <Link
              href={quoteHref}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
            >
              {launch.cta}
              <FiArrowRight size={14} />
            </Link>
          </div>
        </section>

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
                      {locale === "fr" ? "Prix" : locale === "en" ? "Price" : "Preis"}
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
                {offer.id === "starter" || offer.id === "business" ? (
                  <>
                    <Link
                      href={orderHref(locale, { pack: offer.id, currency: locale === "en" ? "eur" : undefined })}
                      className={`inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
                        isPopular
                          ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 shadow-md"
                          : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      {locale === "en" ? "Order" : locale === "de" ? "Bestellen" : "Commander"} — {offer.price}
                      <FiArrowRight size={14} />
                    </Link>
                    <Link href={quoteHref} className="mt-2 block text-center text-xs text-gray-500 transition hover:text-gray-300">
                      {locale === "en" ? "or request a custom quote" : locale === "de" ? "oder individuelle Offerte anfragen" : "ou demander un devis sur mesure"}
                    </Link>
                  </>
                ) : (
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
                )}
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

        {/* Cybersécurité & conformité */}
        <div className="mt-12 rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/[0.07] to-transparent p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">{cyber.eyebrow}</p>
          <h2 className="mt-1 text-xl font-bold text-white">{cyber.title}</h2>
          <p className="mt-2 max-w-3xl text-sm text-gray-300">{cyber.body}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {cyber.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-gray-950 px-5 py-4"
              >
                <span className="text-sm text-gray-300">{item.label}</span>
                <span className="shrink-0 text-sm font-semibold text-emerald-300">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm text-gray-300">
            <span className="font-semibold text-white">Vincent L’helgoual’ch</span> ·{" "}
            <a href="tel:+33762607458" className="font-semibold text-emerald-300 underline-offset-4 hover:underline">+33 7 62 60 74 58</a> ·{" "}
            <a href="mailto:vlhelgoualch@gmail.com" className="font-semibold text-emerald-300 underline-offset-4 hover:underline">vlhelgoualch@gmail.com</a>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-2xl text-sm text-gray-400">{cyber.addon}</p>
            <Link
              href={withLocalePrefix("/cybersecurite", locale)}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-bold text-[#04120c] transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
            >
              {cyber.cta}
              <FiArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Création d'auto-entreprise (FR uniquement) */}
        {locale === "fr" && (
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 p-8 sm:flex-row">
            <div>
              <p className="text-xs uppercase tracking-widest text-sky-300">Bonus</p>
              <h2 className="mt-1 text-xl font-bold text-white">Pas encore d'auto-entreprise ?</h2>
              <p className="mt-1 text-sm text-gray-400">
                On lance ton immatriculation INPI gratuitement si couplée à un pack site.
              </p>
            </div>
            <Link
              href="/creation-entreprise"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              Créer mon auto-entreprise
              <FiArrowRight size={13} />
            </Link>
          </div>
        )}

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
