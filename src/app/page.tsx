import { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { TrustBar } from "@/components/trust-bar";
import { ServicesGrid } from "@/components/services-grid";
import { WhyChooseSection } from "@/components/why-choose-section";
import { ProcessSection } from "@/components/process-section";
import { SwissTrustSection } from "@/components/swiss-trust-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Solutions digitales pour la Suisse et l'international",
  description: "Sites web, applications et système GLPI pour PME. Accompagnement professionnel à distance pour votre transformation digitale.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesGrid />
      <WhyChooseSection />
      <ProcessSection />
      <SwissTrustSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
