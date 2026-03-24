import Link from "next/link";
import { FiArrowRight, FiCheck, FiMapPin, FiTrendingUp, FiUsers } from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type SwissAcquisitionPageKey =
  | "site-web-geneve"
  | "site-web-lausanne"
  | "application-web-suisse"
  | "automatisation-ia-suisse";

type Props = {
  locale: Locale;
  page: SwissAcquisitionPageKey;
};

const content = {
  fr: {
    "site-web-geneve": {
      eyebrow: "Geneve, PME, cabinets, structures de service",
      title: "Creation de site web a Geneve pour entreprises qui veulent convertir proprement",
      intro:
        "KAH-Digital conçoit des sites web clairs, rapides et credibles pour entreprises a Geneve. L'objectif n'est pas juste d'etre en ligne, mais de presenter l'offre clairement et declencher plus de prises de contact.",
      benefitsTitle: "Ce qu'un site doit apporter",
      benefits: [
        "Une image plus credible face a des clients exigeants",
        "Une presentation simple de l'offre et des services",
        "Un parcours de contact plus direct pour devis ou appel",
        "Une base SEO propre pour travailler la visibilite locale",
      ],
      profilesTitle: "Pour quels profils ?",
      profiles: [
        "Cabinets de conseil, finance, RH ou recrutement",
        "Entreprises B2B qui veulent un site plus serieux",
        "Structures de service avec une offre encore floue",
        "Societes qui veulent une refonte rapide sans process inutile",
      ],
      localTitle: "Pourquoi cette approche fonctionne en Suisse romande",
      localBody:
        "Le marche genevois demande une presentation sobre, structuree et rassurante. Nous travaillons ce niveau de clarte sans alourdir le projet, avec des budgets lisibles en CHF et un cadrage rapide depuis Lausanne.",
      highlights: [
        { icon: FiMapPin, title: "Base a Lausanne", body: "Proche des attentes suisses romandes, sans friction de communication." },
        { icon: FiUsers, title: "Cadrage business", body: "On parle offre, conversion et credibilite avant de parler design." },
        { icon: FiTrendingUp, title: "Site oriente contact", body: "L'objectif est de faire avancer le business, pas d'empiler des pages." },
      ],
      ctaTitle: "Besoin d'un site plus propre pour votre entreprise a Geneve ?",
      ctaBody: "On peut cadrer rapidement le bon format, le bon budget et le bon niveau de finition pour votre marche.",
    },
    "site-web-lausanne": {
      eyebrow: "Lausanne, Vaud, entreprises en croissance",
      title: "Creation de site web a Lausanne pour PME, societes de service et marques locales",
      intro:
        "Depuis Lausanne, KAH-Digital accompagne les entreprises qui veulent un site web plus clair, plus rapide et plus credible. Le but est de mieux presenter l'activite, simplifier le contact et donner une vraie base de conversion.",
      benefitsTitle: "Ce qu'un nouveau site change vraiment",
      benefits: [
        "Une meilleure premiere impression aupres des prospects",
        "Des pages services enfin lisibles et orientees besoin client",
        "Un site plus simple a maintenir et a faire evoluer",
        "Un support plus solide pour SEO, campagnes et prospection",
      ],
      profilesTitle: "Profils souvent concernes",
      profiles: [
        "PME vaudoises avec un site trop ancien ou faible",
        "Entreprises locales qui veulent mieux cadrer leur offre",
        "Independants premium qui ont besoin d'une image plus serieuse",
        "Marques qui lancent une nouvelle offre ou une nouvelle activite",
      ],
      localTitle: "Pourquoi Lausanne est un bon point d'ancrage",
      localBody:
        "Le marche local demande de la clarte, du rythme et de la credibilite. Nous pouvons cadrer vite, travailler en francais, et livrer un site propre sans rallonger le projet avec des couches inutiles.",
      highlights: [
        { icon: FiMapPin, title: "Presence locale", body: "Meme fuseau, meme langue, meme niveau d'exigence de cadrage." },
        { icon: FiUsers, title: "Process court", body: "Decisions plus rapides, moins d'allers-retours et une vision nette du perimetre." },
        { icon: FiTrendingUp, title: "Objectif conversion", body: "Le site sert les demandes entrantes, pas seulement l'image de marque." },
      ],
      ctaTitle: "Besoin d'une refonte de site a Lausanne ou dans le canton de Vaud ?",
      ctaBody: "On peut cadrer un site vitrine ou corporate avec un budget clair, un delai credible et un vrai niveau de finition.",
    },
    "application-web-suisse": {
      eyebrow: "Suisse, extranet, portail, outil metier",
      title: "Developpement d'application web en Suisse pour outils metier, portails et espaces clients",
      intro:
        "KAH-Digital conçoit des applications web utiles pour entreprises en Suisse : portails clients, dashboards, outils internes, espaces membres ou workflows simples a exploiter.",
      benefitsTitle: "Ce que l'application doit ameliorer",
      benefits: [
        "Reduire les taches manuelles et doubles saisies",
        "Centraliser l'information utile dans une interface claire",
        "Donner un acces client ou equipe a des donnees propres",
        "Creer une base evolutive pour d'autres modules plus tard",
      ],
      profilesTitle: "Cas d'usage frequents",
      profiles: [
        "Portail client ou extranet B2B",
        "Dashboard de suivi, reporting ou operations",
        "Outil interne pour equipes terrain ou back-office",
        "Espace membre, reservation, suivi ou planning",
      ],
      localTitle: "Notre positionnement sur ce type de projet",
      localBody:
        "Nous cadrons des applications utiles, avec une structure claire, des etapes lisibles et un niveau de complexite realiste. Pas de promesse floue : un perimetre simple, une base propre, un vrai suivi.",
      highlights: [
        { icon: FiMapPin, title: "Approche Suisse", body: "Budgets en CHF, cadrage propre et logique projet lisible." },
        { icon: FiUsers, title: "Outil adapte", body: "L'application suit votre fonctionnement reel, pas un modele generique." },
        { icon: FiTrendingUp, title: "Base evolutive", body: "On construit une V1 utile, puis on ajoute les modules qui comptent." },
      ],
      ctaTitle: "Besoin d'un portail ou d'une application web sur mesure en Suisse ?",
      ctaBody: "On peut cadrer rapidement le perimetre, le budget et la bonne premiere version a lancer.",
    },
    "automatisation-ia-suisse": {
      eyebrow: "Suisse, IA utile, automatisation et qualification",
      title: "Automatisation IA en Suisse pour gagner du temps sur le support, les leads et l'operationnel",
      intro:
        "KAH-Digital met en place des automatisations IA simples a exploiter : qualification de leads, premier niveau d'assistance, generation de reponses, tri de demandes ou aide interne.",
      benefitsTitle: "Ce qu'une automatisation IA doit faire",
      benefits: [
        "Filtrer et qualifier plus vite les demandes entrantes",
        "Reduire le temps perdu sur les taches repetitives",
        "Donner un premier niveau d'aide avant reprise humaine",
        "Connecter l'assistant a vos outils, votre CRM ou votre support",
      ],
      profilesTitle: "Cas d'usage concrets",
      profiles: [
        "Chatbot oriente projet ou devis",
        "Prequalification commerciale avant contact humain",
        "Routage support avec passage propre vers ticket",
        "Automatisation de reponses et resume d'echanges",
      ],
      localTitle: "Ce que nous faisons reellement",
      localBody:
        "Nous ne vendons pas une IA magique. Nous cadrons des cas d'usage precis, branches a vos vrais flux, avec une mesure claire du gain de temps et de la reprise humaine.",
      highlights: [
        { icon: FiMapPin, title: "Cadrage concret", body: "On part d'un besoin metier reel, pas d'une mode technologique." },
        { icon: FiUsers, title: "Humain + IA", body: "La reprise humaine reste propre quand l'automatisation a atteint sa limite." },
        { icon: FiTrendingUp, title: "ROI lisible", body: "Temps gagne, demandes filtrees, meilleure qualite de qualification." },
      ],
      ctaTitle: "Besoin d'une automatisation IA utile pour votre entreprise en Suisse ?",
      ctaBody: "On peut identifier rapidement les bons use cases et cadrer une mise en place propre, simple et mesurable.",
    },
  },
  en: {
    "site-web-geneve": {
      eyebrow: "Geneva, SMBs, consultancies, service firms",
      title: "Website development in Geneva for companies that need a cleaner conversion flow",
      intro:
        "KAH-Digital builds clear, fast, credible websites for companies in Geneva. The goal is not just to be online, but to present the offer clearly and generate more qualified contact requests.",
      benefitsTitle: "What the website should improve",
      benefits: [
        "A more credible image for demanding prospects",
        "A simpler presentation of your offer and services",
        "A more direct contact path for quotes or calls",
        "A clean SEO base for local visibility work",
      ],
      profilesTitle: "Who this is for",
      profiles: [
        "Consulting, finance, HR, and recruiting firms",
        "B2B companies that need a more serious website",
        "Service businesses with an unclear current offer",
        "Teams that want a fast redesign without waste",
      ],
      localTitle: "Why this works in French-speaking Switzerland",
      localBody:
        "The Geneva market expects a sober, structured, reassuring presentation. We focus on clarity, readable CHF budgets, and fast scoping from Lausanne.",
      highlights: [
        { icon: FiMapPin, title: "Based in Lausanne", body: "Close to Swiss expectations and easy to work with." },
        { icon: FiUsers, title: "Business-first scoping", body: "Offer, trust, and conversion come before visual effects." },
        { icon: FiTrendingUp, title: "Contact-oriented site", body: "The website is built to move the business forward." },
      ],
      ctaTitle: "Need a cleaner business website for Geneva?",
      ctaBody: "We can scope the right format, budget, and level of finish quickly.",
    },
    "site-web-lausanne": {
      eyebrow: "Lausanne, Vaud, growing companies",
      title: "Website development in Lausanne for SMBs, service firms, and local brands",
      intro:
        "From Lausanne, KAH-Digital helps companies that need a clearer, faster, more credible website. The goal is better presentation, easier contact, and a real conversion base.",
      benefitsTitle: "What a new website really changes",
      benefits: [
        "A stronger first impression",
        "Service pages that finally explain the offer clearly",
        "A site that is easier to maintain and evolve",
        "A better support layer for SEO and campaigns",
      ],
      profilesTitle: "Typical profiles",
      profiles: [
        "SMBs in Vaud with an outdated website",
        "Local companies that need sharper positioning",
        "Premium independents who need more trust",
        "Brands launching a new offer or activity",
      ],
      localTitle: "Why Lausanne is a strong base",
      localBody:
        "The local market expects clarity, pace, and credibility. We can scope quickly, work in French, and ship a solid website without useless complexity.",
      highlights: [
        { icon: FiMapPin, title: "Local presence", body: "Same timezone, same language, same project expectations." },
        { icon: FiUsers, title: "Short process", body: "Faster decisions and fewer loops." },
        { icon: FiTrendingUp, title: "Conversion focus", body: "The website supports incoming leads, not just image." },
      ],
      ctaTitle: "Need a website redesign in Lausanne or Vaud?",
      ctaBody: "We can scope a clear showcase or corporate website with a realistic budget and timeline.",
    },
    "application-web-suisse": {
      eyebrow: "Switzerland, portals, dashboards, business tools",
      title: "Web application development in Switzerland for portals, dashboards, and business tools",
      intro:
        "KAH-Digital designs useful web applications for companies in Switzerland: client portals, dashboards, internal tools, member areas, and operational workflows.",
      benefitsTitle: "What the app should improve",
      benefits: [
        "Reduce manual tasks and duplicate entries",
        "Centralize useful information in a clear interface",
        "Give clients or teams a proper access layer",
        "Build an evolutive base for future modules",
      ],
      profilesTitle: "Common use cases",
      profiles: [
        "B2B client portals and extranets",
        "Operations and reporting dashboards",
        "Internal tools for field or back-office teams",
        "Member areas, booking, planning, and follow-up",
      ],
      localTitle: "Our position on this kind of project",
      localBody:
        "We scope useful applications with a clear structure, readable phases, and a realistic level of complexity. No vague promise, just a clean first version and solid follow-up.",
      highlights: [
        { icon: FiMapPin, title: "Swiss approach", body: "CHF budgets and clear scoping." },
        { icon: FiUsers, title: "Tool fit", body: "The app follows your real workflow, not a generic template." },
        { icon: FiTrendingUp, title: "Evolutive base", body: "We ship a useful V1, then expand what matters." },
      ],
      ctaTitle: "Need a custom portal or business web application in Switzerland?",
      ctaBody: "We can scope the right perimeter, budget, and first version quickly.",
    },
    "automatisation-ia-suisse": {
      eyebrow: "Switzerland, useful AI, automation, support and leads",
      title: "AI automation in Switzerland for support, lead qualification, and operations",
      intro:
        "KAH-Digital implements useful AI automations for companies: lead qualification, first-level support, reply generation, request routing, and internal assistance.",
      benefitsTitle: "What the automation should achieve",
      benefits: [
        "Filter and qualify incoming requests faster",
        "Reduce time lost on repetitive tasks",
        "Provide a first answer before human takeover",
        "Connect the assistant to your CRM or support tools",
      ],
      profilesTitle: "Concrete use cases",
      profiles: [
        "Project or quote-oriented chatbot",
        "Sales prequalification before human contact",
        "Support routing with clean ticket handoff",
        "Reply automation and conversation summaries",
      ],
      localTitle: "What we actually deliver",
      localBody:
        "We do not sell magic AI. We scope precise use cases tied to real workflows, with measurable time savings and a clean human takeover when needed.",
      highlights: [
        { icon: FiMapPin, title: "Concrete scoping", body: "We start from a real business need, not hype." },
        { icon: FiUsers, title: "Human + AI", body: "Human takeover stays clean when automation reaches its limit." },
        { icon: FiTrendingUp, title: "Readable ROI", body: "Time saved, better filtering, better qualification." },
      ],
      ctaTitle: "Need useful AI automation for your company in Switzerland?",
      ctaBody: "We can identify the right use cases and scope a simple, measurable setup.",
    },
  },
  de: {
    "site-web-geneve": {
      eyebrow: "Genf, KMU, Beratungen, Dienstleister",
      title: "Website-Entwicklung in Genf fuer Unternehmen mit klarem Vertriebsziel",
      intro:
        "KAH-Digital entwickelt klare, schnelle und glaubwuerdige Websites fuer Unternehmen in Genf. Ziel ist nicht nur online zu sein, sondern das Angebot sauber zu praesentieren und mehr qualifizierte Kontakte zu erzeugen.",
      benefitsTitle: "Was die Website verbessern soll",
      benefits: [
        "Ein glaubwuerdigeres Bild fuer anspruchsvolle Interessenten",
        "Eine klarere Darstellung von Angebot und Leistungen",
        "Ein direkterer Kontaktweg fuer Anfragen oder Calls",
        "Eine saubere SEO-Basis fuer lokale Sichtbarkeit",
      ],
      profilesTitle: "Fuer wen das passt",
      profiles: [
        "Beratungen, Finance-, HR- und Recruiting-Firmen",
        "B2B-Unternehmen mit zu schwacher Website",
        "Dienstleister mit unklarer Angebotsdarstellung",
        "Teams mit Bedarf nach schneller, sauberer Refonte",
      ],
      localTitle: "Warum dieser Ansatz in der Romandie funktioniert",
      localBody:
        "Der Genfer Markt erwartet eine ruhige, strukturierte und vertrauenswuerdige Praesentation. Wir fokussieren auf Klarheit, lesbare CHF-Budgets und schnelles Scoping aus Lausanne.",
      highlights: [
        { icon: FiMapPin, title: "Basis in Lausanne", body: "Nah an Schweizer Erwartungen und leicht in der Zusammenarbeit." },
        { icon: FiUsers, title: "Business-first", body: "Angebot, Vertrauen und Conversion vor Effekten." },
        { icon: FiTrendingUp, title: "Kontaktorientiert", body: "Die Website soll das Geschaeft wirklich voranbringen." },
      ],
      ctaTitle: "Braucht ihr eine klarere Business-Website fuer Genf?",
      ctaBody: "Wir koennen Format, Budget und Finish schnell sauber scopen.",
    },
    "site-web-lausanne": {
      eyebrow: "Lausanne, Waadt, wachsende Unternehmen",
      title: "Website-Entwicklung in Lausanne fuer KMU, Dienstleister und lokale Marken",
      intro:
        "Von Lausanne aus begleitet KAH-Digital Unternehmen, die eine klarere, schnellere und glaubwuerdigere Website brauchen. Ziel sind bessere Praesentation, einfacherer Kontakt und eine solide Conversion-Basis.",
      benefitsTitle: "Was eine neue Website wirklich aendert",
      benefits: [
        "Ein besserer erster Eindruck",
        "Leistungsseiten, die das Angebot endlich sauber erklaeren",
        "Eine Website, die leichter zu pflegen und auszubauen ist",
        "Eine bessere Basis fuer SEO und Kampagnen",
      ],
      profilesTitle: "Typische Profile",
      profiles: [
        "KMU in der Waadt mit veralteter Website",
        "Lokale Firmen mit Bedarf nach klarerer Positionierung",
        "Premium-Solos mit Bedarf nach mehr Vertrauen",
        "Marken mit neuem Angebot oder neuem Launch",
      ],
      localTitle: "Warum Lausanne eine starke Basis ist",
      localBody:
        "Der lokale Markt erwartet Klarheit, Tempo und Glaubwuerdigkeit. Wir scopen schnell, arbeiten auf Franzoesisch und liefern eine saubere Website ohne nutzlose Komplexitaet.",
      highlights: [
        { icon: FiMapPin, title: "Lokale Praesenz", body: "Gleiche Zeitzone, gleiche Sprache, gleiche Projekterwartung." },
        { icon: FiUsers, title: "Kurzer Prozess", body: "Schnellere Entscheidungen und weniger Schleifen." },
        { icon: FiTrendingUp, title: "Conversion-Fokus", body: "Die Website unterstuetzt Leads, nicht nur die Marke." },
      ],
      ctaTitle: "Braucht ihr eine Website-Refonte in Lausanne oder der Waadt?",
      ctaBody: "Wir koennen eine klare Showcase- oder Corporate-Site mit realistischem Budget und Timing scopen.",
    },
    "application-web-suisse": {
      eyebrow: "Schweiz, Portale, Dashboards, Business-Tools",
      title: "Web-App-Entwicklung in der Schweiz fuer Portale, Dashboards und Business-Tools",
      intro:
        "KAH-Digital entwickelt nuetzliche Web-Anwendungen fuer Unternehmen in der Schweiz: Kundenportale, Dashboards, interne Tools, Member Areas und operative Workflows.",
      benefitsTitle: "Was die Anwendung verbessern soll",
      benefits: [
        "Weniger manuelle Aufgaben und doppelte Eingaben",
        "Nuetzliche Informationen zentral in einer klaren Oberflaeche",
        "Ein sauberer Zugang fuer Kunden oder Teams",
        "Eine evolutive Basis fuer spaetere Module",
      ],
      profilesTitle: "Haeufige Use Cases",
      profiles: [
        "B2B-Kundenportale und Extranets",
        "Operations- und Reporting-Dashboards",
        "Interne Tools fuer Feld- und Backoffice-Teams",
        "Member Areas, Buchung, Planung und Follow-up",
      ],
      localTitle: "Unser Ansatz bei solchen Projekten",
      localBody:
        "Wir strukturieren nuetzliche Anwendungen mit klarer Architektur, lesbaren Phasen und realistischer Komplexitaet. Keine diffuse Versprechung, sondern eine saubere erste Version.",
      highlights: [
        { icon: FiMapPin, title: "Schweizer Ansatz", body: "CHF-Budgets und klares Scoping." },
        { icon: FiUsers, title: "Passendes Tool", body: "Die Anwendung folgt eurem echten Ablauf, nicht einem generischen Modell." },
        { icon: FiTrendingUp, title: "Evolutive Basis", body: "Wir liefern eine nuetzliche V1 und bauen gezielt aus." },
      ],
      ctaTitle: "Braucht ihr ein Custom-Portal oder eine Web-Anwendung in der Schweiz?",
      ctaBody: "Wir koennen Scope, Budget und erste Version schnell sauber definieren.",
    },
    "automatisation-ia-suisse": {
      eyebrow: "Schweiz, nuetzliche KI, Automatisierung, Support und Leads",
      title: "KI-Automatisierung in der Schweiz fuer Support, Lead-Qualifizierung und Operations",
      intro:
        "KAH-Digital implementiert nuetzliche KI-Automationen fuer Unternehmen: Lead-Qualifizierung, First-Level-Support, Antwortentwuerfe, Routing von Anfragen und interne Hilfe.",
      benefitsTitle: "Was die Automatisierung leisten soll",
      benefits: [
        "Eingehende Anfragen schneller filtern und qualifizieren",
        "Weniger Zeitverlust bei repetitiven Aufgaben",
        "Eine erste Hilfe vor der menschlichen Uebernahme",
        "Verbindung zum CRM oder Support-Setup",
      ],
      profilesTitle: "Konkrete Use Cases",
      profiles: [
        "Projekt- oder Angebots-Chatbot",
        "Vertriebliche Vorqualifizierung",
        "Support-Routing mit sauberer Ticket-Uebergabe",
        "Automatisierte Antworten und Zusammenfassungen",
      ],
      localTitle: "Was wir tatsaechlich liefern",
      localBody:
        "Wir verkaufen keine magische KI. Wir scopen konkrete Use Cases mit realem Nutzen, messbarem Zeitgewinn und sauberer menschlicher Uebernahme.",
      highlights: [
        { icon: FiMapPin, title: "Konkretes Scoping", body: "Wir starten beim echten Bedarf, nicht beim Hype." },
        { icon: FiUsers, title: "Mensch + KI", body: "Die menschliche Uebernahme bleibt sauber, wenn die Automation endet." },
        { icon: FiTrendingUp, title: "Lesbarer ROI", body: "Zeitgewinn, besseres Filtern, bessere Qualifizierung." },
      ],
      ctaTitle: "Braucht ihr nuetzliche KI-Automatisierung fuer euer Unternehmen in der Schweiz?",
      ctaBody: "Wir identifizieren die richtigen Use Cases und scopen eine einfache, messbare Umsetzung.",
    },
  },
} as const;

export function SwissAcquisitionPageContent({ locale, page }: Props) {
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
            <h2 className="text-3xl font-bold text-slate-900">{pageContent.localTitle}</h2>
            <p className="mt-4 text-lg text-slate-600">{pageContent.localBody}</p>
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
