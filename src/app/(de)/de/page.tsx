import { buildPageMetadata } from "@/lib/shared-metadata";
import { HeroSection } from "@/components/hero-section";
import { AiSystemsSection } from "@/components/ai-systems-section";
import { TrustBar } from "@/components/trust-bar";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { CyberBandSection } from "@/components/cyber-band-section";
// Nettoyage 2026-08-02 — voir (fr)/page.tsx pour le détail.

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/",
  title: "KAH Digital Studio — Websites, KI-Agenten & Cybersicherheit · Toulouse",
  description:
    "KAH Digital Studio baut Websites mit Online-Terminbuchung und massgeschneiderte KI-Agenten für Selbstständige und KMU. Fester Preis, Lieferung in wenigen Tagen. Studio in Toulouse, Kunden in Frankreich und der Schweiz.",
  keywords: [
    "vertikaler KI-Agent",
    "KI Agentur Schweiz", "KI Agentur Frankreich",
    "KI-Kabinettschef für Künstler",
    "Business-Prozess-KI-Automatisierung",
    "KI-Agent für Musiker",
    "KAH Workforce",
    "KI Automatisierung Agentur Schweiz",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist ein vertikaler KI-Agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein vertikaler KI-Agent ist Ende-zu-Ende auf einen einzigen Job spezialisiert — im Gegensatz zu generischem ChatGPT oder Claude. Er kennt Ihre Prozesse, Ihre Tools, Ihr Vokabular und handelt für Sie (Verwaltung, Follow-ups, alltägliche Entscheidungen). Live-Beispiel: KAH Workforce, ein KI-Kabinettschef für unabhängige Künstler.",
      },
    },
    {
      "@type": "Question",
      name: "Warum nicht einfach ChatGPT oder Claude direkt nutzen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ein generischer Chatbot kennt weder Ihre Historie noch Ihre Tools noch die Besonderheiten Ihres Geschäfts — Sie erklären jedes Mal alles neu. Ein KAH Digital Studio Agent ist in Ihre echten Tools integriert, erinnert sich an alles und handelt autonom, ohne dass Sie ihn per Prompt steuern müssen.",
      },
    },
    {
      "@type": "Question",
      name: "Wie lange dauert die Lieferung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter (Website): 2–3 Wochen. Business (komplette Website): 2 Wochen. Vertikaler KI-Agent: je nach Umfang, ab 4 Wochen.",
      },
    },
    {
      "@type": "Question",
      name: "Arbeiten Sie mit Kunden ausserhalb der Schweiz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. KAH Digital Studio ist international tätig — Schweiz, Frankreich, Belgien, Kanada, frankophones Afrika, UK, USA. Alles läuft remote, ohne Reibungsverluste.",
      },
    },
    {
      "@type": "Question",
      name: "Wie läuft das kostenlose Audit ab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sie senden Ihre Website und E-Mail-Adresse. Innerhalb von 24h erhalten Sie einen personalisierten Bericht: Performance, SEO, Conversion, priorisierte Empfehlungen — unverbindlich.",
      },
    },
    {
      "@type": "Question",
      name: "Gibt es eine Verpflichtung oder ein Abonnement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nein. Jedes Projekt läuft über eine akzeptierte Offerte, ohne Abo-Zwang. Monatliche Support-Pläne sind nach der Lieferung verfügbar, aber nie verpflichtend.",
      },
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "KAH Digital Studio",
  alternateName: "KAH Digital Studio",
  url: "https://kah-digital.ch",
  logo: "https://kah-digital.ch/favicon.svg",
  email: "kahdigital42@gmail.com",
  telephone: "+33759558414",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toulouse",
    addressRegion: "Occitanie",
    addressCountry: "FR",
  },
  areaServed: ["CH", "FR", "BE", "LU", "MA", "SN", "CI", "US", "GB", "DE"],
  availableLanguage: ["French", "English", "German"],
  description:
    "KAH Digital Studio baut Websites mit Online-Terminbuchung und massgeschneiderte KI-Agenten für Selbstständige und KMU. Fester Preis, Lieferung in wenigen Tagen. Studio in Toulouse, Kunden in Frankreich und der Schweiz.",
  serviceType: [
    "Vertical AI Agents",
    "AI Chief of Staff for Artists",
    "Business Process Automation",
    "Custom AI Agents",
    "Premium Web Platforms",
    "SaaS Development",
  ],
  sameAs: [
    "https://www.linkedin.com/in/kah-digital-95128b408/",
    "https://x.com/DigitalKah42",
  ],
};

export default function HomePageDe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <HeroSection />
      <AiSystemsSection />
      <TrustBar />
      <PricingSection />
      <CyberBandSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
