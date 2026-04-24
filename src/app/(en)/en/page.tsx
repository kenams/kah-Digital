import { buildPageMetadata } from "@/lib/shared-metadata";
import { CTASection } from "@/components/cta-section";
import { FAQSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ProblemSection } from "@/components/problem-section";
import { ProcessSection } from "@/components/process-section";
import { ServicesGrid } from "@/components/services-grid";
import { GlobalTrustSection } from "@/components/global-trust-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { TrustBar } from "@/components/trust-bar";
import { WhyChooseSection } from "@/components/why-choose-section";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/",
  title: "Web agency Lausanne — Websites, apps & AI automation | KAH-Digital",
  description:
    "KAH-Digital builds websites, custom applications and AI automations that convert. Digital studio in Lausanne, available remotely. Free quote within 24h.",
  keywords: ["web agency Lausanne", "business website Switzerland", "AI automation", "digital studio", "KAH-Digital"],
});

export default function HomePageEn() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <ServicesGrid />
      <WhyChooseSection />
      <TestimonialsSection />
      <ProcessSection />
      <GlobalTrustSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
