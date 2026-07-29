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
  title: "KAH Digital — Agents IA verticaux pour indépendants · Lausanne · International",
  description:
    "KAH Digital conçoit des agents IA verticaux — pas des sites de plus. Chef de cabinet IA pour artistes indépendants (KAH Workforce), automatisations métier sur-mesure. Studio basé à Lausanne, opérant à l'international.",
  keywords: [
    "agent IA vertical",
    "agence IA Lausanne",
    "chef de cabinet IA artiste",
    "automatisation métier IA",
    "AI agent for musicians",
    "KAH Workforce",
    "agence automatisation IA Suisse",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce qu'un agent IA vertical ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un agent IA vertical est branché sur un seul métier, du début à la fin — contrairement à ChatGPT ou Claude génériques. Il connaît vos process, vos outils, votre vocabulaire, et agit à votre place (admin, suivi, relances, décisions courantes). Exemple en production : KAH Workforce, chef de cabinet IA pour artistes indépendants.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi pas juste utiliser ChatGPT ou Claude directement ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un chatbot générique ne connaît ni votre historique, ni vos outils, ni les spécificités de votre métier — vous reformulez tout à chaque fois. Un agent KAH Digital est intégré à vos outils réels, se souvient de tout, et agit de façon autonome sans que vous ayez à le piloter au prompt.",
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
    "KAH Digital construit des agents IA verticaux — pas des sites de plus. Chef de cabinet IA pour artistes indépendants (KAH Workforce), automatisations métier sur-mesure pour indépendants et PME.",
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
