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
  locale: "en",
  path: "/",
  title: "KAH Digital — Vertical AI Agents for Independents · Lausanne · International",
  description:
    "KAH Digital builds vertical AI agents — not another website. AI chief-of-staff for independent artists (KAH Workforce), custom business automation. Studio based in Lausanne, operating internationally.",
  keywords: [
    "vertical AI agent",
    "AI agency Lausanne",
    "AI chief of staff for artists",
    "business process AI automation",
    "AI agent for musicians",
    "KAH Workforce",
    "AI automation agency Switzerland",
  ],
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a vertical AI agent?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A vertical AI agent is wired into one job, end to end — unlike generic ChatGPT or Claude. It knows your process, your tools, your vocabulary, and acts in your place (admin, follow-ups, everyday decisions). Live example: KAH Workforce, an AI chief-of-staff for independent artists.",
      },
    },
    {
      "@type": "Question",
      name: "Why not just use ChatGPT or Claude directly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A generic chatbot knows nothing of your history, your tools, or the specifics of your trade — you re-explain everything each time. A KAH Digital agent is integrated into your real tools, remembers everything, and acts autonomously without you having to prompt it.",
      },
    },
    {
      "@type": "Question",
      name: "How long does delivery take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Starter (showcase site): 2–3 weeks. Business (complete site): 2 weeks. Vertical AI Agent: 4 weeks, depending on scope.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with clients outside Switzerland?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. KAH Digital operates internationally — Switzerland, France, Belgium, Canada, French-speaking Africa, UK, US. Everything is done remotely, without friction.",
      },
    },
    {
      "@type": "Question",
      name: "How does the free audit work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You submit your website and email. Within 24h, you receive a personalised report: performance, SEO, conversion, priority recommendations — no commitment.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a commitment or subscription?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Every project runs on an accepted quote, with no mandatory subscription. Monthly support plans are available after delivery, but never imposed.",
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
    "KAH Digital builds vertical AI agents — not another website. AI chief-of-staff for independent artists (KAH Workforce), custom business automation for independents and SMEs.",
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

export default function HomePageEn() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <HeroSection />
      <StatsBar />
      <SaasPortfolioSection lang="en" />
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
