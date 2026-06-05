import { buildPageMetadata } from "@/lib/shared-metadata";
import { HeroSection } from "@/components/hero-section";
import { StatsBar } from "@/components/stats-bar";
import { AiSystemsSection } from "@/components/ai-systems-section";
import { FreeCallSection } from "@/components/free-call-section";
import { TrustBar } from "@/components/trust-bar";
import { ProblemSection } from "@/components/problem-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CaseStudySection } from "@/components/case-study-section";
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
  locale: "fr",
  path: "/",
  title: "KAH Digital — AI-Powered Growth Systems · Lausanne · International",
  description:
    "KAH Digital conçoit des systèmes de croissance digitale : automatisation IA, plateformes premium, infrastructure scalable. Studio basé à Lausanne, opérant à l'international. Audit gratuit sous 24h.",
  keywords: [
    "AI automation agency",
    "agence automatisation IA Lausanne",
    "système digital croissance",
    "création site web premium Suisse",
    "agence IA Suisse",
    "automatisation business",
    "digital growth systems",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce qu'un AI-Powered Growth System ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un système de croissance digitale combine site web premium, automatisation IA, agents intelligents et infrastructure scalable. L'objectif : faire croître votre business de façon autonome, sans recruter ni complexifier vos opérations.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la différence avec une agence web classique ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une agence web livre un site. KAH Digital livre un système complet : acquisition de leads automatisée, conversion optimisée, reporting temps réel, automatisations métier. Le site n'est qu'une pièce du puzzle.",
      },
    },
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour livrer ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter (site vitrine) : 2–3 semaines. Professional (système complet) : 4–6 semaines. Elite (infrastructure IA) : selon le scope, de 6 semaines à 4 mois.",
      },
    },
    {
      "@type": "Question",
      name: "Travaillez-vous avec des clients en dehors de la Suisse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. KAH Digital opère à l'international — Suisse, France, Belgique, Canada, Afrique francophone, UK, US. Tout se fait à distance sans friction.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se passe l'audit gratuit ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous soumettez votre site web et votre email. En moins de 24h, vous recevez un rapport personnalisé : performance, SEO, conversion, recommandations prioritaires — sans engagement.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il un engagement ou abonnement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Chaque projet est sur devis accepté, sans abonnement obligatoire. Des formules de support mensuel sont disponibles après livraison, mais jamais imposées.",
      },
    },
  ],
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "KAH Digital",
  alternateName: "KAH-Digital",
  url: "https://kah-digital.ch",
  logo: "https://kah-digital.ch/favicon.svg",
  email: "kahdigital42@gmail.com",
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
    "KAH Digital construit des AI-Powered Growth Systems — automatisation IA, plateformes premium, infrastructure digitale scalable — pour les entreprises qui veulent croître.",
  serviceType: [
    "AI Automation",
    "Digital Growth Systems",
    "Premium Web Platforms",
    "Custom AI Agents",
    "SaaS Development",
    "Digital Infrastructure",
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <HeroSection />
      <StatsBar />
      <SaasPortfolioSection lang="fr" />
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
