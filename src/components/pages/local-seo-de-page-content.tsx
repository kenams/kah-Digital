import { DE_AGENCY_CITIES } from "./local-seo-de-cities";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiClock, FiMapPin, FiMessageCircle, FiZap } from "react-icons/fi";

const WA_URL = "https://wa.me/33759558414?text=Hallo%20KAH%20Digital%2C%20ich%20m%C3%B6chte%20ein%20Projekt%20besprechen.";

export type DeCity = {
  city: string;
  country: string;
  region: string;
  slug: string;
  headline: string;
  subline: string;
  intro: string;
  sectors: string[];
  proofLine: string;
  faq: Array<{ q: string; a: string }>;
};

const BASE_DE_CITY_PAGES: Record<string, DeCity> = {
  "webentwicklung-zuerich": {
    city: "Zürich",
    country: "Schweiz",
    region: "Zürich",
    slug: "webentwicklung-zuerich",
    headline: "Webentwicklung Zürich",
    subline: "Premium Webentwicklung für Zürich — Next.js 15, SaaS-Level Design, Lighthouse 95+. In 5 Werktagen geliefert.",
    intro: "KAH Digital Studio entwickelt professionelle Websites und Web-Anwendungen für Unternehmen in Zürich und der ganzen Deutschschweiz. FinTech, Beratung, E-Commerce, KMU — wir liefern Websites, die konvertieren. Remote-Studio für ganz Europa. Kostenlose Offerte innerhalb von 24h.",
    sectors: ["FinTech & Banking", "Beratung & Consulting", "KMU & Handwerk", "Restaurants & Gastronomie", "Startups & Scale-ups", "Anwaltskanzleien & Treuhänder"],
    proofLine: "Antwort in 24h · Kostenlose Offerte · Unverbindlich",
    faq: [
      { q: "Arbeiten Sie mit Kunden in Zürich?", a: "Ja, wir arbeiten remote für ganz Zürich und die Deutschschweiz. Der gesamte Prozess läuft online — Briefing per Video, Lieferung digital. Bei Bedarf kommen wir nach Zürich." },
      { q: "Was kostet eine Website für ein Zürcher Unternehmen?", a: "Starter ab CHF 290 (Landing Page, 5 Tage). Business ab CHF 790 (bis 6 Seiten, 5 Werktage, SEO inklusive). Vertikaler KI-Agent ab CHF 2'490 (komplettes System mit KI-Automatisierung). Fester Preis garantiert." },
      { q: "Wie lange dauert die Entwicklung?", a: "Starter: 5 Werktage. Business-Website: 5 Werktage. Individuelle Web-App: 4-6 Wochen. Alle Fristen werden vor Projektbeginn schriftlich fixiert." },
      { q: "Liefern Sie den kompletten Quellcode?", a: "Ja, 100%. Code, Domain, Hosting — alles gehört Ihnen. Kein Lock-in, keine monatlichen Gebühren, keine Anbieterabhängigkeit." },
    ],
  },
  "ki-agentur-zuerich": {
    city: "Zürich",
    country: "Schweiz",
    region: "Zürich",
    slug: "ki-agentur-zuerich",
    headline: "KI-Agentur Zürich",
    subline: "GPT-4 Agenten, KI-Automatisierung und Chatbots für Zürcher Unternehmen. ROI messbar ab Monat 1.",
    intro: "KAH Digital Studio ist die KI-Agentur für Zürcher Unternehmen: GPT-4-Agenten, Lead-Qualifizierung, 24/7-Support-Chatbots, CRM-Automatisierung. Wir implementieren KI-Lösungen, die in der Produktion funktionieren — keine Demos, keine Versprechen, nur messbare Ergebnisse. Remote-Studio für die ganze Schweiz.",
    sectors: ["FinTech & Versicherungen", "Beratung & Consulting", "E-Commerce & Retail", "Immobilien", "Gesundheit & Medizin", "SaaS & Tech-Startups"],
    proofLine: "Kostenloses KI-Audit · Antwort in 24h · Unverbindlich",
    faq: [
      { q: "Was automatisiert eine KI-Agentur für mein Zürcher Unternehmen?", a: "Lead-Qualifizierung, Kundensupport 24/7, E-Mail-Automatisierung, CRM-Updates, Dokumentenverarbeitung, intelligentes Routing. Wir identifizieren die 3 ROI-stärksten Anwendungsfälle im kostenlosen Audit." },
      { q: "Wie schnell ist die KI einsatzbereit?", a: "Deployment in 10 Tagen. Erste messbare Ergebnisse in 30 Tagen. Kein 6-Monat-Workshop, keine unnötige Komplexität." },
      { q: "Was kostet eine KI-Automatisierung?", a: "KI-Chatbot ab CHF 490. Vollautomatisiertes Lead-System im Paket „Vertikaler KI-Agent“ ab CHF 2'490. Fester Preis, keine versteckten Kosten." },
      { q: "Funktioniert die KI mit unserem bestehenden CRM?", a: "Ja, wir integrieren in Salesforce, HubSpot, Pipedrive, Notion und alle gängigen Tools via API oder Zapier/Make/n8n." },
    ],
  },
  "webentwicklung-muenchen": {
    city: "München",
    country: "Deutschland",
    region: "Bayern",
    slug: "webentwicklung-muenchen",
    headline: "Webentwicklung München",
    subline: "Premium Webentwicklung für München — Next.js, SaaS-Design, Lighthouse 95+. Deutsch-Schweizer Qualität.",
    intro: "KAH Digital Studio entwickelt professionelle Websites und Web-Anwendungen für Unternehmen in München und Bayern. Tech-Startups, Beratung, E-Commerce, Mittelstand — wir liefern Websites auf dem Niveau von Stripe, Linear und Framer. Remote, schnell, kein Lock-in.",
    sectors: ["Tech-Startups & Scale-ups", "Beratung & Consulting", "E-Commerce & Marktplätze", "Restaurants & Gastronomie", "Mittelstand & Industrie", "Medien & Kreativwirtschaft"],
    proofLine: "Antwort in 24h · Kostenlose Offerte · Fester Preis",
    faq: [
      { q: "Arbeiten Sie mit Kunden in München remote?", a: "Ja, der gesamte Prozess läuft online. Briefing per Video, wöchentliche Updates, Lieferung digital. Kein Münchener Agenturaufschlag." },
      { q: "Was kostet eine Website für ein Münchner Unternehmen?", a: "Starter ab €290 (Landing Page, 5 Tage). Business ab €790 (bis 6 Seiten, 5 Werktage). Vertikaler KI-Agent ab €2 490 (komplettes System). Fester Preis, keine Überraschungen." },
      { q: "Warum einen Schweizer Studio statt einer Münchner Agentur?", a: "Schweizer Qualität zu einem Bruchteil der lokalen Agenturpreise. Direkt zum Gründer, kein Account Manager, kein Overhead. Ergebnisorientiert, nicht stundenbezogen." },
      { q: "Liefern Sie SEO für den deutschen Markt?", a: "Ja, technisches SEO, strukturierte Daten, Core Web Vitals 95+, saubere URLs — alles inklusive ab Business. Suchmaschinen-optimiert für Google Deutschland." },
    ],
  },
  "webentwicklung-berlin": {
    city: "Berlin",
    country: "Deutschland",
    region: "Berlin",
    slug: "webentwicklung-berlin",
    headline: "Webentwicklung Berlin",
    subline: "Startup-Level Webentwicklung für Berlin — Next.js 15, premium Design, schnelle Lieferung. Kein Lock-in.",
    intro: "KAH Digital Studio entwickelt websites und web-Anwendungen für Berliner Startups, Agenturen und Unternehmen. Berlin ist Europas Startup-Hauptstadt — wir liefern das passende Webniveau: Stripe-Design, SaaS-Performance, technisches SEO. Remote aus der Schweiz, ohne lokale Agenturpreise.",
    sectors: ["Startups & Venture-backed", "Agenturen & Kreativwirtschaft", "E-Commerce & D2C Brands", "NGOs & Non-profit", "Fintech & PropTech", "Freelancer & Solopreneure"],
    proofLine: "Antwort in 24h · Fester Preis · 100% Eigentum",
    faq: [
      { q: "Warum KAH Digital Studio für ein Berliner Startup?", a: "Wir kennen die Sprache der Startups: schnell, iterativ, kein Overhead. Starter in 5 Tagen. Business in 5 Werktagen. Kein 2-Monats-Workshop, kein unnötiger Prozess." },
      { q: "Können Sie für Berliner Startups skalierbare Systeme bauen?", a: "Ja, Next.js 15 + Supabase + TypeScript strict. Dieselbe Stack wie gut finanzierte Startups. Skalierbar von Tag 1, ohne Refactoring in 6 Monaten." },
      { q: "Was kostet eine Startup-Website in Berlin?", a: "Starter €290 (Landing Page, 5 Tage). Business €790 (bis 6 Seiten, SEO, Animationen, 5 Werktage). Vertikaler KI-Agent €2 490 (komplettes System, KI-Chatbot, 28 Tage)." },
      { q: "Bauen Sie auch MVPs und Web-Apps für Berliner Startups?", a: "Ja, eine Pilot-V1 in 7 Tagen im klar abgegrenzten Umfang. Next.js 15 + Supabase. Alles gehört Ihnen — kein Lock-in, kein Vendor-Abhängigkeit." },
    ],
  },
  "ki-agentur-berlin": {
    city: "Berlin",
    country: "Deutschland",
    region: "Berlin",
    slug: "ki-agentur-berlin",
    headline: "KI-Agentur Berlin",
    subline: "GPT-4 Agenten & KI-Automatisierung für Berliner Startups und Scale-ups. Deployment in 10 Tagen.",
    intro: "KAH Digital Studio baut KI-Automatisierungssysteme für Berliner Unternehmen: Lead-Qualifizierung, 24/7-Kundensupport, CRM-Integration, individuelle GPT-4-Agenten. Berlin ist Europas Startup-Hauptstadt — wir liefern das passende KI-Niveau. Remote aus der Schweiz, ohne Berliner Agenturpreise.",
    sectors: ["Tech-Startups & Venture-backed", "E-Commerce & D2C Brands", "Agenturen & Kreativwirtschaft", "FinTech & InsurTech", "B2B SaaS", "NGOs & Non-profit"],
    proofLine: "Kostenloses KI-Audit · Antwort in 24h · ROI in 30 Tagen",
    faq: [
      { q: "Welche KI-Anwendungsfälle eignen sich für Berliner Startups?", a: "Lead-Scoring und Qualifizierung, 24/7 Kundensupport mit sauberem Escalation-Flow, E-Mail-Drip-Automatisierung, CRM-Enrichment, Onboarding-Assistenten. Wir identifizieren Ihre Top-3-ROI-Automationen kostenlos." },
      { q: "Wie schnell ist die KI live?", a: "10 Tage Deployment. Erste messbare Ergebnisse an T+30. Kein monatelanger Workshop — direkt starten, bauen, testen, live gehen." },
      { q: "Kann Ihre KI in unseren bestehenden Tech-Stack integriert werden?", a: "Ja, wir integrieren in Notion, Linear, Slack, HubSpot, Intercom, Stripe und praktisch jedes Tool via API, Zapier, Make oder n8n." },
      { q: "Was kostet ein GPT-4-Agent für ein Berliner Startup?", a: "KI-Chatbot-Add-on ab €490. Vollständiges KI-System (Vertikaler KI-Agent) ab €2 490 — Website, Chatbot, Lead-Automatisierung, Akquisitionsstrategie und 3 Monate Support." },
    ],
  },
  "ki-agentur-muenchen": {
    city: "München",
    country: "Deutschland",
    region: "Bayern",
    slug: "ki-agentur-muenchen",
    headline: "KI-Agentur München",
    subline: "GPT-4 Agenten, Automatisierung und KI-Chatbots für Münchner Unternehmen. Deployment in 10 Tagen.",
    intro: "KAH Digital Studio automatisiert Geschäftsprozesse für Münchner Unternehmen mit KI: Lead-Qualifizierung, Kundensupport, CRM-Integration, individuelle GPT-4-Agenten. Kein Marketing-KI — echte Automatisierungen mit messbarem ROI ab dem ersten Monat. Remote aus der Schweiz, ohne Münchner Agenturpreise.",
    sectors: ["Tech-Startups & Scale-ups", "Mittelstand & Industrie", "E-Commerce & Retail", "Beratung & Consulting", "Immobilien & PropTech", "Medizin & Gesundheit"],
    proofLine: "Kostenloses KI-Audit · Antwort in 24h · ROI in 30 Tagen",
    faq: [
      { q: "Was kann KI für mein Münchner Unternehmen automatisieren?", a: "Lead-Qualifizierung (nur heiße Leads erreichen Sie), 24/7 Kundensupport, E-Mail-Sequenzen, CRM-Updates, Dokumentenverarbeitung, Angebotsassistenten. Wir identifizieren die 3 besten Anwendungsfälle im kostenlosen Audit." },
      { q: "Wie lange dauert die KI-Implementierung?", a: "10 Tage Deployment, messbare Ergebnisse in 30 Tagen. Kein monatelanger Workshop. Wir starten, bauen, testen und liefern — schnell und direkt." },
      { q: "Was kostet ein KI-Chatbot für Bayern?", a: "KI-Chatbot-Add-on ab €490. Vollständiges KI-System (Vertikaler KI-Agent) ab €2 490 inklusive Website, Chatbot, Lead-Automatisierung und 3 Monate Support." },
      { q: "Funktioniert Ihre KI auf Deutsch?", a: "Ja, unsere GPT-4-Agenten werden auf Ihren deutschen Inhalten trainiert und antworten auf Deutsch, Englisch oder Französisch — je nach Bedarf Ihres Unternehmens." },
    ],
  },
};

export const DE_CITY_PAGES: Record<string, DeCity> = { ...BASE_DE_CITY_PAGES, ...DE_AGENCY_CITIES };

type Props = { data: DeCity };

export function LocalSeoDePageContent({ data }: Props) {
  const devisUrl = `/de/devis?city=${encodeURIComponent(data.city)}&ref=local-seo-de`;
  // Pages Allemagne (Berlin, Munich) : prix en euros, commande en EUR ; pages suisses : CHF.
  const eur = data.country === "Deutschland";
  const orderUrl = eur ? "/de/commander?devise=eur" : "/de/commander";
  const price = (chf: string, euro: string) => (eur ? euro : chf);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "KAH Digital Studio",
    description: `Webentwicklung & KI-Automatisierung für ${data.city} — Premium Next.js Websites, GPT-4 Agenten, messbare Ergebnisse.`,
    url: `https://kah-digital.ch/de/${data.slug}`,
    telephone: "+33759558414",
    email: "kahdigital42@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
    areaServed: { "@type": "City", name: data.city },
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: ["https://www.linkedin.com/company/kah-digital"],
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id={`ld-de-${data.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#050509] pb-16 pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-32 left-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-blue-600/12 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-300">
            <FiMapPin size={13} className="text-blue-400" />
            {data.city}, {data.country}
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {data.headline}
          </h1>
          <p className="mb-8 text-lg text-gray-400">{data.subline}</p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={devisUrl}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:gap-3 hover:shadow-blue-500/40"
            >
              Kostenlose Offerte in 24h <FiArrowRight size={15} />
            </Link>
            <Link href={orderUrl} className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-8 py-3.5 font-bold text-[#f3d089] transition hover:bg-[#e0c48e]/20">
              Ab {price("CHF 290", "290 €")} bestellen
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              WhatsApp — Antwort in 2h
            </a>
          </div>
          <p className="mt-5 text-sm text-gray-500">{data.proofLine}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-lg leading-relaxed text-gray-300">{data.intro}</p>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white">
            Branchen in {data.city}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {data.sectors.map((s) => (
              <div key={s} className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-gray-900 px-4 py-3">
                <FiCheck size={14} className="shrink-0 text-blue-400" />
                <span className="text-sm text-gray-300">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-extrabold tracking-tight text-white">
            Warum KAH Digital Studio für {data.city}?
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { icon: FiZap, title: "Lieferung in 5 Werktagen", body: "Starter in 5 Tagen. Business in 5 Werktagen. Kein monatelanger Workshop. Kurzes Briefing, klare Entscheidungen, sofortiger Start." },
              { icon: FiClock, title: "Antwort in 24h", body: "Erste Antwort am nächsten Werktag nach Ihrer Anfrage. Direktzugang zum Gründer — kein Vermittler, kein Verzug." },
              { icon: FiMapPin, title: "Fester Preis garantiert", body: "Festes Angebot vor dem Start. Keine Überraschungen, keine versteckten Kosten. 100% Code-Eigentum bei Lieferung." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
                <item.icon size={20} className="mb-3 text-blue-400" />
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-white">Preise für {data.city}</h2>
          <p className="mb-8 text-gray-400">Transparente Festpreise. Kein Stundensatz, kein Lock-in, 100% Eigentum.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Starter", price: price("CHF 290", "290 €"), sub: "Landing Page · 5 Tage" },
              { label: "Business", price: price("CHF 790", "790 €"), sub: "Bis 6 Seiten · 5 Werktage · SEO" },
              { label: "Vertikaler KI-Agent", price: price("CHF 2'490", "2 490 €"), sub: "KI-System · 28 Tage · komplett" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/8 bg-gray-900 p-5 text-left">
                <div className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">{item.label}</div>
                <div className="text-2xl font-black text-white">{item.price}</div>
                <div className="mt-1 text-xs text-gray-500">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-900/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-white">Häufige Fragen</h2>
          <div className="space-y-4">
            {data.faq.map((item) => (
              <div key={item.q} className="rounded-xl border border-white/8 bg-gray-900 p-5">
                <h3 className="mb-2 font-semibold text-white">{item.q}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-white">
            Ihr Projekt in {data.city} — wir sprechen?
          </h2>
          <p className="mb-8 text-gray-400">Kostenlose Offerte · Antwort in 24h · Unverbindlich</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={devisUrl}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-10 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40"
            >
              Kostenlose Offerte anfragen <FiArrowRight size={15} />
            </Link>
            <Link href={orderUrl} className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-8 py-4 font-bold text-[#f3d089] transition hover:bg-[#e0c48e]/20">
              Online bestellen
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              WhatsApp direkt
            </a>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-t border-white/6 bg-gray-950 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="mb-5 text-center text-xs font-bold uppercase tracking-widest text-gray-600">Verwandte Leistungen</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "KI-Agentur Schweiz", href: "/de/agence-ia" },
              { label: "Website-Redesign", href: "/de/refonte-site-web" },
              { label: "Web-App Entwicklung", href: "/de/application-web-sur-mesure" },
              { label: "KI-Automatisierung", href: "/de/automatisation-ia-entreprise" },
              { label: "Webentwicklung Zürich", href: "/de/webentwicklung-zuerich" },
              { label: "KI-Agentur Zürich", href: "/de/ki-agentur-zuerich" },
              { label: "Webentwicklung München", href: "/de/webentwicklung-muenchen" },
              { label: "KI-Agentur Berlin", href: "/de/ki-agentur-berlin" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/8 bg-gray-900 px-4 py-2 text-xs text-gray-400 transition hover:border-blue-500/40 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
