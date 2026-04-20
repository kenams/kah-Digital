import { buildPageMetadata } from "@/lib/shared-metadata";
import { CTASection } from "@/components/cta-section";
import { FAQSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/process-section";
import { ServicesGrid } from "@/components/services-grid";
import { GlobalTrustSection } from "@/components/global-trust-section";
import { TrustBar } from "@/components/trust-bar";
import { WhyChooseSection } from "@/components/why-choose-section";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/",
  title: "Premium websites, apps, and digital solutions",
  description:
    "KAH-Digital builds websites, applications, and clearer support journeys for French-speaking, English-speaking, and international companies.",
  keywords: ["web agency", "business website", "Next.js", "landing page", "digital studio", "KAH-Digital"],
});

export default function HomePageEn() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <WhyChooseSection />
      <ProcessSection />
      <GlobalTrustSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
