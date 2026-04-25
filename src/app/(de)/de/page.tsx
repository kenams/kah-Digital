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
  locale: "de",
  path: "/",
  title: "Webagentur Lausanne — Websites, Apps & KI-Automatisierung | KAH-Digital",
  description:
    "KAH-Digital entwickelt Websites, maßgeschneiderte Anwendungen und KI-Automatisierungen, die konvertieren. Digitalstudio in Lausanne, remote verfügbar. Kostenloses Angebot in 24h.",
  keywords: ["Webagentur Lausanne", "Unternehmenswebsite Schweiz", "KI-Automatisierung", "Digitalstudio", "KAH-Digital"],
});

export default function HomePageDe() {
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
