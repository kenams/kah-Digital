import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { FAQSection } from "@/components/faq-section";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/process-section";
import { ServicesGrid } from "@/components/services-grid";
import { SwissTrustSection } from "@/components/swiss-trust-section";
import { TrustBar } from "@/components/trust-bar";
import { WhyChooseSection } from "@/components/why-choose-section";

export const metadata: Metadata = {
  title: "Websites, Apps und digitale Loesungen",
  description:
    "KAH-Digital entwickelt Websites, Anwendungen und klarere Support-Parcours. Basis in Lausanne, aktiv in der Schweiz und international.",
  keywords: ["Webagentur", "Unternehmenswebsite", "Next.js", "Landingpage", "Digitalstudio", "KAH-Digital"],
  alternates: {
    canonical: "/de",
    languages: {
      fr: "/",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_CH",
    alternateLocale: ["fr_FR", "en_US"],
    title: "KAH-Digital",
    description:
      "Websites, Anwendungen und digitale Loesungen mit klarem Prozess fuer Unternehmen in der Schweiz und international.",
    url: "/de",
    siteName: "KAH-Digital",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "KAH-Digital - digitales Premium-Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAH-Digital",
    description: "Websites, Anwendungen und digitale Loesungen mit klarem Prozess.",
    images: ["/og-kah-digital.png"],
  },
};

export default function HomePageDe() {
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
