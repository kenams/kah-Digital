import Link from "next/link";
import { FiArrowRight, FiCheck, FiGlobe, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type GlobalAcquisitionPageKey =
  | "site-web-entreprise"
  | "refonte-site-web"
  | "application-web-sur-mesure"
  | "automatisation-ia-entreprise";

type Props = {
  locale: Locale;
  page: GlobalAcquisitionPageKey;
};

const content = {
  fr: {
    "site-web-entreprise": {
      eyebrow: "Site vitrine, corporate, presentation claire",
      title: "Site web d'entreprise pour mieux presenter l'offre et convertir sans friction",
      intro:
        "KAH-Digital conçoit des sites web clairs, rapides et credibles pour entreprises francophones, anglophones et internationales. L'objectif n'est pas juste d'etre en ligne, mais d'expliquer l'offre proprement, rassurer et faire avancer les prises de contact.",
      benefitsTitle: "Ce qu'un bon site doit apporter",
      benefits: [
        "Une presentation plus lisible de l'offre et du positionnement",
        "Une image plus serieuse pour clients, partenaires ou recrutement",
        "Un parcours de contact simple pour appel, devis ou premier echange",
        "Une base solide pour SEO, campagnes et prospection",
      ],
      profilesTitle: "Profils concernes",
      profiles: [
        "PME, cabinets, agences et structures de service",
        "Entreprises B2B avec un site faible ou trop ancien",
        "Marques qui lancent une nouvelle offre",
        "Equipes qui veulent un site propre sans process inutile",
      ],
      contextTitle: "Notre positionnement",
      contextBody:
        "Nous travaillons des sites qui servent le business avant tout : structure claire, bon niveau de finition, contenu utile et mise en ligne propre. Le projet peut rester simple ou inclure un paiement, une reservation ou un espace client si le besoin existe.",
      highlights: [
        { icon: FiGlobe, title: "Execution internationale", body: "Nous travaillons a distance sans limiter les projets a un marche local." },
        { icon: FiUsers, title: "Cadrage business", body: "On clarifie l'offre, la cible et le parcours avant de parler animations." },
        { icon: FiTrendingUp, title: "Conversion propre", body: "Le site doit faire avancer des demandes, pas seulement flatter l'image." },
      ],
      ctaTitle: "Besoin d'un site plus net pour votre entreprise ?",
      ctaBody: "On peut cadrer rapidement le bon format, le bon budget et le bon niveau de finition selon votre marche.",
    },
    "refonte-site-web": {
      eyebrow: "Refonte, repositionnement, clarte commerciale",
      title: "Refonte de site web pour reprendre une base propre et plus convaincante",
      intro:
        "Une refonte devient utile quand le site ne reflète plus le niveau reel de l'entreprise, ne convertit pas ou freine l'evolution du business. KAH-Digital reprend la structure, les contenus et l'experience pour repartir sur une base claire.",
      benefitsTitle: "Ce qu'une refonte doit corriger",
      benefits: [
        "Un message flou ou un positionnement mal compris",
        "Un design faible ou incoherent avec le niveau de service",
        "Des pages difficiles a mettre a jour",
        "Un parcours trop lent entre visite et prise de contact",
      ],
      profilesTitle: "Quand lancer une refonte",
      profiles: [
        "Site ancien qui ne donne plus confiance",
        "Evolution de l'offre, du marche ou de la cible",
        "Besoin d'un socle plus propre avant campagnes SEO ou Ads",
        "Envie de mieux filtrer et qualifier les demandes entrantes",
      ],
      contextTitle: "Comment nous abordons une refonte",
      contextBody:
        "Nous ne recosmetisons pas juste une homepage. Nous recadrons le role du site, la hierarchie des pages, les contenus utiles et le niveau de conversion attendu. L'objectif est une base durable, plus propre et plus lisible pour l'equipe comme pour les clients.",
      highlights: [
        { icon: FiZap, title: "Refonte orientee resultat", body: "On reprend ce qui sert, on supprime ce qui brouille, on renforce ce qui convertit." },
        { icon: FiUsers, title: "Decision plus simple", body: "Structure, priorites et arbitrages sont clarifies des le cadrage." },
        { icon: FiTrendingUp, title: "Base relancable", body: "Le nouveau site devient une vraie base pour le contenu, le SEO et les campagnes." },
      ],
      ctaTitle: "Besoin de repartir sur une base web plus propre ?",
      ctaBody: "On peut cadrer une refonte utile, rapide a decider et adaptee au niveau de votre entreprise.",
    },
    "application-web-sur-mesure": {
      eyebrow: "Portail, outil metier, dashboard, espace client",
      title: "Application web sur mesure pour structurer un besoin metier concret",
      intro:
        "KAH-Digital conçoit des applications web utiles : portails, extranets, dashboards, espaces clients et outils internes. Le but n'est pas d'empiler des fonctions, mais de resoudre proprement un besoin operationnel.",
      benefitsTitle: "Ce que l'application doit ameliorer",
      benefits: [
        "Moins de taches manuelles et de double saisie",
        "Une information plus centrale et plus lisible",
        "Un acces propre pour clients, equipes ou partenaires",
        "Une base evolutive pour ajouter des modules plus tard",
      ],
      profilesTitle: "Cas d'usage frequents",
      profiles: [
        "Portail client B2B ou extranet",
        "Dashboard de suivi, reporting ou operations",
        "Mini-outil metier interne",
        "Espace membre, reservation, suivi ou planning",
      ],
      contextTitle: "Notre logique de production",
      contextBody:
        "Nous cadrons une V1 utile, simple a comprendre et realiste a lancer. Ensuite seulement, on ajoute les couches suivantes. Cela permet de livrer plus vite, mieux tester l'usage et garder un budget lisible.",
      highlights: [
        { icon: FiGlobe, title: "Projet ouvert a tout marche", body: "Nous travaillons sur des besoins produit et business, pas sur une geographie precise." },
        { icon: FiUsers, title: "Cadrage par usage", body: "On part du flux reel, pas d'une liste de modules generiques." },
        { icon: FiTrendingUp, title: "Base evolutive", body: "La premiere version est utile tout de suite et sert de socle pour la suite." },
      ],
      ctaTitle: "Besoin d'un portail ou d'un outil plus adapte a votre activite ?",
      ctaBody: "On peut cadrer le perimetre, le budget et la bonne premiere version sans complexite inutile.",
    },
    "automatisation-ia-entreprise": {
      eyebrow: "IA utile, support, leads, automatisation",
      title: "Automatisation IA pour entreprises qui veulent gagner du temps sans perdre le controle",
      intro:
        "KAH-Digital met en place des automatisations IA utiles : qualification de leads, premier niveau d'assistance, routage de demandes, generation de reponses ou aide interne. L'idee n'est pas de vendre une IA magique, mais un usage concret.",
      benefitsTitle: "Ce que l'automatisation doit faire",
      benefits: [
        "Filtrer et qualifier plus vite les demandes entrantes",
        "Reduire le temps perdu sur les taches repetitives",
        "Donner un premier niveau d'aide avant reprise humaine",
        "Mieux connecter support, CRM, formulaires ou workflow interne",
      ],
      profilesTitle: "Cas d'usage concrets",
      profiles: [
        "Chatbot oriente projet ou devis",
        "Prequalification commerciale",
        "Support avec passage propre vers humain ou ticket",
        "Resume automatique et routage des echanges",
      ],
      contextTitle: "Notre approche",
      contextBody:
        "Nous partons d'un flux reel, d'un gain de temps mesurable et d'une limite claire entre automatisation et reprise humaine. Cela permet d'avoir une IA utile, discretement integree et exploitable par l'equipe.",
      highlights: [
        { icon: FiZap, title: "Usage concret", body: "Chaque automatisation part d'un probleme reel, pas d'une mode." },
        { icon: FiUsers, title: "Humain + IA", body: "L'escalade vers un humain reste propre quand le bot atteint sa limite." },
        { icon: FiTrendingUp, title: "ROI lisible", body: "Temps gagne, meilleure qualification, meilleure reactivite." },
      ],
      ctaTitle: "Besoin d'une automatisation IA utile pour votre entreprise ?",
      ctaBody: "On peut identifier rapidement les bons use cases et cadrer une mise en place simple, propre et mesurable.",
    },
  },
  en: {
    "site-web-entreprise": {
      eyebrow: "Business website, showcase site, clearer positioning",
      title: "Business website development built to explain the offer and convert cleanly",
      intro:
        "KAH-Digital builds clear, fast, credible websites for French-speaking, English-speaking, and international companies. The goal is not just to be online, but to explain the offer properly, build trust, and move contact requests forward.",
      benefitsTitle: "What the website should deliver",
      benefits: [
        "A clearer presentation of your offer and positioning",
        "A stronger image for clients, partners, or hiring",
        "A simpler path to call, quote, or first contact",
        "A solid base for SEO, campaigns, and outbound work",
      ],
      profilesTitle: "Who this fits",
      profiles: [
        "SMBs, consultancies, agencies, and service firms",
        "B2B companies with an outdated or weak site",
        "Brands launching a new offer",
        "Teams that want a clean website without unnecessary process",
      ],
      contextTitle: "How we position this work",
      contextBody:
        "We build websites that serve the business first: clear structure, the right level of finish, useful content, and a clean launch. The project can stay simple or include payments, booking, or a client area when needed.",
      highlights: [
        { icon: FiGlobe, title: "International delivery", body: "We work remotely without limiting projects to one local market." },
        { icon: FiUsers, title: "Business-first scoping", body: "We clarify offer, audience, and conversion path before visual polish." },
        { icon: FiTrendingUp, title: "Clean conversion logic", body: "The website should move enquiries forward, not just look good." },
      ],
      ctaTitle: "Need a sharper website for your company?",
      ctaBody: "We can scope the right format, budget, and level of finish quickly and clearly.",
    },
    "refonte-site-web": {
      eyebrow: "Redesign, repositioning, cleaner structure",
      title: "Website redesign to rebuild on a cleaner and more convincing base",
      intro:
        "A redesign becomes useful when the site no longer reflects the actual level of the company, does not convert, or slows down business growth. KAH-Digital revisits structure, messaging, and experience to rebuild on a stronger base.",
      benefitsTitle: "What the redesign should fix",
      benefits: [
        "Unclear messaging or weak positioning",
        "A visual direction that no longer matches the real level of service",
        "Pages that are hard to update internally",
        "Too much friction between visit and contact",
      ],
      profilesTitle: "When to launch a redesign",
      profiles: [
        "An old website that no longer inspires trust",
        "A shift in offer, market, or audience",
        "A need for a cleaner base before SEO or ads",
        "A need to filter and qualify incoming leads better",
      ],
      contextTitle: "How we handle a redesign",
      contextBody:
        "We do not just refresh a homepage. We redefine the role of the site, page hierarchy, useful content, and expected conversion level. The objective is a durable and cleaner base for both the team and the market.",
      highlights: [
        { icon: FiZap, title: "Result-oriented redesign", body: "We keep what helps, remove what confuses, and strengthen what converts." },
        { icon: FiUsers, title: "Clearer decisions", body: "Structure, priorities, and trade-offs are clarified early." },
        { icon: FiTrendingUp, title: "Ready for growth", body: "The new site becomes a stronger base for content, SEO, and paid acquisition." },
      ],
      ctaTitle: "Need to restart on a cleaner web base?",
      ctaBody: "We can scope a redesign that is useful, realistic, and aligned with your business level.",
    },
    "application-web-sur-mesure": {
      eyebrow: "Portal, dashboard, business tool, client area",
      title: "Custom web application development for concrete business needs",
      intro:
        "KAH-Digital designs useful web applications: portals, extranets, dashboards, client spaces, and internal tools. The goal is not to stack features, but to solve an operational need cleanly.",
      benefitsTitle: "What the application should improve",
      benefits: [
        "Less manual work and duplicate entry",
        "More centralised and readable information",
        "A proper access layer for clients, teams, or partners",
        "An evolutive base for future modules",
      ],
      profilesTitle: "Common use cases",
      profiles: [
        "B2B client portals or extranets",
        "Reporting or operations dashboards",
        "Light internal business tools",
        "Member areas, booking, planning, or follow-up tools",
      ],
      contextTitle: "Our production logic",
      contextBody:
        "We scope a useful first version that is clear to understand and realistic to launch. Then we add the next layers only when they matter. This keeps delivery faster, testing easier, and budgets clearer.",
      highlights: [
        { icon: FiGlobe, title: "Built for any market", body: "We work on product and business needs, not on one geography." },
        { icon: FiUsers, title: "Use-case-first scoping", body: "We start from the real workflow, not from a generic module list." },
        { icon: FiTrendingUp, title: "Evolutive base", body: "Version one is useful immediately and supports future growth." },
      ],
      ctaTitle: "Need a portal or tool that fits your activity better?",
      ctaBody: "We can scope the perimeter, budget, and first useful version without unnecessary complexity.",
    },
    "automatisation-ia-entreprise": {
      eyebrow: "Useful AI, support, leads, automation",
      title: "AI automation for companies that want to save time without losing control",
      intro:
        "KAH-Digital implements useful AI automations: lead qualification, first-level support, request routing, reply generation, and internal assistance. The goal is not to sell magic AI, but a concrete business use case.",
      benefitsTitle: "What the automation should do",
      benefits: [
        "Filter and qualify incoming requests faster",
        "Reduce time wasted on repetitive work",
        "Provide a first useful answer before human takeover",
        "Connect support, CRM, forms, or internal workflows more cleanly",
      ],
      profilesTitle: "Concrete use cases",
      profiles: [
        "Project or quote-oriented chatbot",
        "Sales prequalification",
        "Support with clean handoff to human or ticketing",
        "Automatic summaries and routing",
      ],
      contextTitle: "Our approach",
      contextBody:
        "We start from a real workflow, a measurable time gain, and a clear limit between automation and human takeover. That keeps the AI useful, discreetly integrated, and realistic for the team to run.",
      highlights: [
        { icon: FiZap, title: "Concrete usage", body: "Every automation starts from a real problem, not hype." },
        { icon: FiUsers, title: "Human + AI", body: "Escalation stays clean when the bot reaches its limit." },
        { icon: FiTrendingUp, title: "Readable ROI", body: "Time saved, better qualification, better response quality." },
      ],
      ctaTitle: "Need useful AI automation for your company?",
      ctaBody: "We can identify the right use cases quickly and scope a simple, measurable setup.",
    },
  },
  de: {
    "site-web-entreprise": {
      eyebrow: "Business-Website, Showcase, klare Positionierung",
      title: "Business-Website fuer Unternehmen, die ihr Angebot klarer und glaubwuerdiger praesentieren wollen",
      intro:
        "KAH-Digital entwickelt klare, schnelle und glaubwuerdige Websites fuer frankophone, englischsprachige und internationale Unternehmen. Ziel ist nicht nur online zu sein, sondern Angebot, Vertrauen und Kontakt sauber nach vorn zu bringen.",
      benefitsTitle: "Was die Website liefern soll",
      benefits: [
        "Klarere Darstellung von Angebot und Positionierung",
        "Staerkeres Bild fuer Kunden, Partner oder Recruiting",
        "Einfacherer Weg zu Call, Offerte oder Erstkontakt",
        "Solide Basis fuer SEO, Kampagnen und Outbound",
      ],
      profilesTitle: "Fuer wen das passt",
      profiles: [
        "KMU, Beratungen, Agenturen und Dienstleister",
        "B2B-Unternehmen mit veralteter oder schwacher Website",
        "Marken mit neuem Angebot",
        "Teams, die eine saubere Website ohne unnötigen Overhead wollen",
      ],
      contextTitle: "Unser Ansatz",
      contextBody:
        "Wir entwickeln Websites, die zuerst dem Geschaeft dienen: klare Struktur, passendes Finish, nuetzlicher Inhalt und sauberer Launch. Das Projekt kann schlicht bleiben oder Zahlung, Buchung oder Kundenbereich aufnehmen, wenn es sinnvoll ist.",
      highlights: [
        { icon: FiGlobe, title: "Internationale Umsetzung", body: "Wir arbeiten remote und beschraenken Projekte nicht auf eine lokale Zone." },
        { icon: FiUsers, title: "Business-first Scoping", body: "Angebot, Zielgruppe und Conversion-Pfad werden vor dem Finish geklaert." },
        { icon: FiTrendingUp, title: "Saubere Conversion-Logik", body: "Die Website soll Anfragen voranbringen, nicht nur gut aussehen." },
      ],
      ctaTitle: "Braucht ihr eine schaerfere Website fuer euer Unternehmen?",
      ctaBody: "Wir koennen Format, Budget und Finish schnell und klar scopen.",
    },
    "refonte-site-web": {
      eyebrow: "Refonte, Repositionierung, klarere Struktur",
      title: "Website-Refonte fuer Unternehmen, die auf einer saubereren Basis neu starten wollen",
      intro:
        "Eine Refonte wird sinnvoll, wenn die Website das echte Niveau des Unternehmens nicht mehr zeigt, kaum konvertiert oder das Wachstum bremst. KAH-Digital ueberarbeitet Struktur, Botschaft und Erlebnis fuer eine staerkere Grundlage.",
      benefitsTitle: "Was die Refonte korrigieren soll",
      benefits: [
        "Unklare Botschaft oder schwache Positionierung",
        "Ein Design, das nicht mehr zum Leistungsniveau passt",
        "Seiten, die intern schwer zu pflegen sind",
        "Zu viel Reibung zwischen Besuch und Kontakt",
      ],
      profilesTitle: "Wann eine Refonte sinnvoll wird",
      profiles: [
        "Eine alte Website, die kein Vertrauen mehr schafft",
        "Ein Wechsel bei Angebot, Markt oder Zielgruppe",
        "Bedarf nach einer sauberen Basis vor SEO oder Ads",
        "Wunsch nach besserer Filterung eingehender Leads",
      ],
      contextTitle: "Wie wir eine Refonte angehen",
      contextBody:
        "Wir polieren nicht nur eine Homepage. Wir definieren Rolle, Seitenhierarchie, relevante Inhalte und Conversion-Niveau neu. Ziel ist eine dauerhafte, klarere Basis fuer Team und Markt.",
      highlights: [
        { icon: FiZap, title: "Resultatorientierte Refonte", body: "Wir behalten, was hilft, entfernen, was verwirrt, und staerken, was konvertiert." },
        { icon: FiUsers, title: "Klarere Entscheidungen", body: "Struktur, Prioritaeten und Trade-offs werden frueh sauber geklaert." },
        { icon: FiTrendingUp, title: "Wachstumsfaehige Basis", body: "Die neue Website wird zur besseren Basis fuer Content, SEO und Akquise." },
      ],
      ctaTitle: "Braucht ihr einen sauberen Neustart fuer eure Website?",
      ctaBody: "Wir koennen eine Refonte scopen, die nuetzlich, realistisch und passend zum Unternehmensniveau ist.",
    },
    "application-web-sur-mesure": {
      eyebrow: "Portal, Dashboard, Business-Tool, Kundenbereich",
      title: "Massgeschneiderte Web-Anwendung fuer konkrete Business-Beduerfnisse",
      intro:
        "KAH-Digital entwickelt nuetzliche Web-Anwendungen: Portale, Extranets, Dashboards, Kundenbereiche und interne Tools. Ziel ist nicht Feature-Inflation, sondern ein sauber geloestes operatives Problem.",
      benefitsTitle: "Was die Anwendung verbessern soll",
      benefits: [
        "Weniger manuelle Arbeit und doppelte Eingaben",
        "Zentralere und besser lesbare Informationen",
        "Ein sauberer Zugang fuer Kunden, Teams oder Partner",
        "Eine evolutive Basis fuer spaetere Module",
      ],
      profilesTitle: "Typische Use Cases",
      profiles: [
        "B2B-Kundenportale oder Extranets",
        "Reporting- oder Operations-Dashboards",
        "Leichte interne Business-Tools",
        "Member Areas, Buchung, Planung oder Follow-up",
      ],
      contextTitle: "Unsere Produktionslogik",
      contextBody:
        "Wir scopen zuerst eine nuetzliche V1, die klar zu verstehen und realistisch zu launchen ist. Danach kommen weitere Ebenen nur dann dazu, wenn sie wirklich etwas bringen. Das haelt Delivery schneller und Budgets klarer.",
      highlights: [
        { icon: FiGlobe, title: "Fuer jeden Markt gedacht", body: "Wir arbeiten an Produkt- und Business-Bedarf, nicht an einer einzelnen Geografie." },
        { icon: FiUsers, title: "Use-Case-first", body: "Wir starten vom realen Ablauf, nicht von einer generischen Modulliste." },
        { icon: FiTrendingUp, title: "Evolutive Basis", body: "Version eins ist sofort nuetzlich und traegt spaeteres Wachstum." },
      ],
      ctaTitle: "Braucht ihr ein Portal oder Tool, das besser zu eurer Aktivitaet passt?",
      ctaBody: "Wir koennen Umfang, Budget und erste sinnvolle Version ohne unnötige Komplexitaet scopen.",
    },
    "automatisation-ia-entreprise": {
      eyebrow: "Nuetzliche KI, Support, Leads, Automation",
      title: "KI-Automatisierung fuer Unternehmen, die Zeit sparen wollen ohne Kontrolle zu verlieren",
      intro:
        "KAH-Digital implementiert nuetzliche KI-Automationen: Lead-Qualifizierung, First-Level-Support, Routing von Anfragen, Antwortentwuerfe und interne Hilfe. Ziel ist kein Zaubertrick, sondern ein konkreter Business-Use-Case.",
      benefitsTitle: "Was die Automation leisten soll",
      benefits: [
        "Eingehende Anfragen schneller filtern und qualifizieren",
        "Weniger Zeitverlust bei repetitiver Arbeit",
        "Eine erste nuetzliche Antwort vor menschlicher Uebernahme",
        "Support, CRM, Formulare oder interne Workflows sauberer verbinden",
      ],
      profilesTitle: "Konkrete Use Cases",
      profiles: [
        "Projekt- oder Offerten-Chatbot",
        "Vertriebliche Vorqualifizierung",
        "Support mit sauberer Uebergabe an Mensch oder Ticketing",
        "Automatische Zusammenfassungen und Routing",
      ],
      contextTitle: "Unser Ansatz",
      contextBody:
        "Wir starten mit einem realen Ablauf, einem messbaren Zeitgewinn und einer klaren Grenze zwischen Automation und menschlicher Uebernahme. So bleibt die KI nuetzlich, diskret integriert und realistisch betreibbar.",
      highlights: [
        { icon: FiZap, title: "Konkreter Einsatz", body: "Jede Automation startet bei einem echten Problem, nicht beim Hype." },
        { icon: FiUsers, title: "Mensch + KI", body: "Die Eskalation bleibt sauber, wenn der Bot an seine Grenze kommt." },
        { icon: FiTrendingUp, title: "Lesbarer ROI", body: "Zeitgewinn, bessere Qualifizierung, bessere Reaktionsqualitaet." },
      ],
      ctaTitle: "Braucht ihr nuetzliche KI-Automatisierung fuer euer Unternehmen?",
      ctaBody: "Wir identifizieren schnell die richtigen Use Cases und scopen eine einfache, messbare Umsetzung.",
    },
  },
} as const;

export function GlobalAcquisitionPageContent({ locale, page }: Props) {
  const pageContent = content[locale][page];

  return (
    <>
      <section className="bg-gradient-to-r from-slate-950 via-blue-900 to-slate-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">{pageContent.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-bold sm:text-5xl">{pageContent.title}</h1>
          <p className="mt-6 max-w-3xl text-lg text-white/80 sm:text-xl">{pageContent.intro}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={withLocalePrefix("/devis", locale)}
              className="rounded-full bg-white px-8 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              {locale === "fr" ? "Demander un devis" : locale === "en" ? "Request a quote" : "Projekt anfragen"}
            </Link>
            <Link
              href={withLocalePrefix("/contact", locale)}
              className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              {locale === "fr" ? "Echanger sur le projet" : locale === "en" ? "Discuss the project" : "Projekt besprechen"}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-bold text-slate-900">{pageContent.benefitsTitle}</h2>
            <ul className="mt-6 space-y-4">
              {pageContent.benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <FiCheck className="mt-1 shrink-0 text-emerald-600" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h2 className="text-2xl font-bold text-slate-900">{pageContent.profilesTitle}</h2>
            <ul className="mt-6 space-y-4">
              {pageContent.profiles.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <FiArrowRight className="mt-1 shrink-0 text-blue-700" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">{pageContent.contextTitle}</h2>
            <p className="mt-4 text-lg text-slate-600">{pageContent.contextBody}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pageContent.highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                  <Icon className="text-blue-700" size={28} />
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-slate-950 p-10 text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-white/55">KAH-Digital</p>
            <h2 className="mt-4 text-3xl font-bold">{pageContent.ctaTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg text-white/75">{pageContent.ctaBody}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href={withLocalePrefix("/devis", locale)}
                className="rounded-full bg-white px-8 py-3 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                {locale === "fr" ? "Demander un devis" : locale === "en" ? "Request a quote" : "Projekt anfragen"}
              </Link>
              <Link
                href={withLocalePrefix("/services", locale)}
                className="rounded-full border border-white/25 px-8 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
              >
                {locale === "fr" ? "Voir les services" : locale === "en" ? "See services" : "Leistungen ansehen"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
