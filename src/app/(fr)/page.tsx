import { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { FAQSection } from "@/components/faq-section";
import { GlobalTrustSection } from "@/components/global-trust-section";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/process-section";
import { ServicesGrid } from "@/components/services-grid";
import { TrustBar } from "@/components/trust-bar";
import { WhyChooseSection } from "@/components/why-choose-section";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/",
  title: "Sites premium, IA utile et automatisation pour entreprises",
  description:
    "KAH-Digital concoit des sites premium, assistants IA et automatisations qui rendent les offres plus claires, reduisent le support manuel et accelerent l'execution.",
  keywords: ["site web entreprise", "assistant IA entreprise", "automatisation IA", "agence web suisse"],
});

export default function Home() {
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
