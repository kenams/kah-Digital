import { buildPageMetadata } from "@/lib/shared-metadata";
import { HeroSection } from "@/components/hero-section";
import { StatsBar } from "@/components/stats-bar";
import { AiSystemsSection } from "@/components/ai-systems-section";
import { FreeCallSection } from "@/components/free-call-section";
import { TrustBar } from "@/components/trust-bar";
import { ProblemSection } from "@/components/problem-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { CaseStudySection } from "@/components/case-study-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { PricingSection } from "@/components/pricing-section";
import { ProcessSection } from "@/components/process-section";
import { GlobalTrustSection } from "@/components/global-trust-section";
import { FAQSection } from "@/components/faq-section";
import { BuiltForSection } from "@/components/built-for-section";
import { SocialProofSection } from "@/components/social-proof-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ROICalculator } from "@/components/roi-calculator";
import { BookingSection } from "@/components/booking-section";
import { SocialContentSection } from "@/components/social-content-section";
import { CTASection } from "@/components/cta-section";
import { SaasPortfolioSection } from "@/components/saas-portfolio-section";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/",
  title: "KAH Digital — Vertikale KI-Agenten für Selbstständige · Lausanne · Schweiz",
  description:
    "KAH Digital baut vertikale KI-Agenten — keine weitere Website. KI-Kabinettschef für unabhängige Künstler (KAH Workforce), massgeschneiderte Business-Automatisierung. Studio in Lausanne, international tätig.",
  keywords: [
    "vertikaler KI-Agent",
    "KI Agentur Lausanne",
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
        text: "Ein generischer Chatbot kennt weder Ihre Historie noch Ihre Tools noch die Besonderheiten Ihres Geschäfts — Sie erklären jedes Mal alles neu. Ein KAH Digital Agent ist in Ihre echten Tools integriert, erinnert sich an alles und handelt autonom, ohne dass Sie ihn per Prompt steuern müssen.",
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
        text: "Ja. KAH Digital ist international tätig — Schweiz, Frankreich, Belgien, Kanada, frankophones Afrika, UK, USA. Alles läuft remote, ohne Reibungsverluste.",
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
  name: "KAH Digital",
  alternateName: "KAH Digital",
  url: "https://kah-digital.ch",
  logo: "https://kah-digital.ch/favicon.svg",
  email: "contact@kah-digital.ch",
  telephone: "+41759558414",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rue de Bourg 27",
    postalCode: "1003",
    addressLocality: "Lausanne",
    addressCountry: "CH",
  },
  areaServed: ["CH", "FR", "BE", "LU", "MA", "SN", "CI", "US", "GB", "DE"],
  availableLanguage: ["French", "English", "German"],
  description:
    "KAH Digital baut vertikale KI-Agenten — keine weitere Website. KI-Kabinettschef für unabhängige Künstler (KAH Workforce), massgeschneiderte Business-Automatisierung für Selbstständige und KMU.",
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
      <StatsBar />
      <SaasPortfolioSection lang="de" />
      <AiSystemsSection />
      <FreeCallSection />
      <TrustBar />
      <ProblemSection />
      <WhyChooseSection />
      <CaseStudySection />
      <SocialProofSection />
      <ROICalculator />
      <TestimonialsSection />
      <BuiltForSection />
      <PortfolioSection />
      <PricingSection />
      <BookingSection />
      <ProcessSection />
      <GlobalTrustSection />
      <SocialContentSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
