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
import { CTASection } from "@/components/cta-section";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/",
  title: "KAH Digital — AI-Powered Growth Systems · Lausanne · International",
  description:
    "KAH Digital builds AI-powered growth systems: automation, premium platforms, scalable infrastructure. Based in Lausanne, operating internationally. Free audit within 24h.",
  keywords: [
    "AI automation agency",
    "AI-powered growth systems",
    "digital growth agency",
    "premium web platform",
    "AI agency Switzerland",
    "business automation",
    "digital infrastructure",
  ],
});

export default function HomePageEn() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AiSystemsSection />
      <FreeCallSection />
      <TrustBar />
      <ProblemSection />
      <WhyChooseSection />
      <CaseStudySection />
      <TestimonialsSection />
      <BuiltForSection />
      <PricingSection />
      <ProcessSection />
      <GlobalTrustSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
