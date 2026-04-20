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
  locale: "de",
  path: "/",
  title: "Websites, Apps und digitale Loesungen",
  description:
    "KAH-Digital entwickelt Websites, Anwendungen und klarere Support-Parcours fuer frankophone, englischsprachige und internationale Unternehmen.",
  keywords: ["Webagentur", "Unternehmenswebsite", "Next.js", "Landingpage", "Digitalstudio", "KAH-Digital"],
});

export default function HomePageDe() {
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
