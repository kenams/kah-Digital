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
  title: "KAH-Digital | Sites, applications et solutions pour entreprises",
  description:
    "Sites web, applications et solutions de support pour entreprises. Accompagnement professionnel a distance depuis la Suisse vers l'international.",
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
