import type { Metadata } from "next";
import { CTASection } from "@/components/cta-section";
import { FAQSection } from "@/components/faq-section";
import { GlobalTrustSection } from "@/components/global-trust-section";
import { HeroSection } from "@/components/hero-section";
import { ProcessSection } from "@/components/process-section";
import { ServicesGrid } from "@/components/services-grid";
import { TrustBar } from "@/components/trust-bar";
import { WhyChooseSection } from "@/components/why-choose-section";

export const metadata: Metadata = {
  title: "Premium-Websites, nuetzliche KI und Automatisierung",
  description:
    "KAH-Digital entwickelt Premium-Websites, KI-Assistenten und Automatisierungen, die Angebote schaerfen, manuellen Support reduzieren und die Umsetzung verbessern.",
  keywords: ["Webagentur", "KI-Assistent", "Automatisierung", "Unternehmenswebsite", "Landingpage", "KAH-Digital"],
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
    description: "Premium-Websites, KI-Assistenten und Automatisierung mit klarem Prozess fuer internationale Unternehmen und Teams.",
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
    description: "Premium-Websites, nuetzliche KI und Automatisierung mit klarem Prozess.",
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
      <GlobalTrustSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
