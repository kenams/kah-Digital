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
  title: "Premium websites, useful AI, and automation",
  description:
    "KAH-Digital builds premium websites, AI assistants, and automation systems that sharpen offers, reduce manual support work, and improve execution.",
  keywords: ["web agency", "ai assistant", "automation", "business website", "landing page", "KAH-Digital"],
  alternates: {
    canonical: "/en",
    languages: {
      fr: "/",
      de: "/de",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_FR", "de_CH"],
    title: "KAH-Digital",
    description: "Premium websites, AI assistants, and automation with a clear process for international companies and teams.",
    url: "/en",
    siteName: "KAH-Digital",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "KAH-Digital - premium digital studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KAH-Digital",
    description: "Premium websites, useful AI, and automation with a clear process.",
    images: ["/og-kah-digital.png"],
  },
};

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
