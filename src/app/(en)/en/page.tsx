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
  title: "Premium websites, apps, and digital solutions",
  description:
    "KAH-Digital builds websites, applications, and clearer support journeys. Based in Lausanne, active in Switzerland and internationally.",
  keywords: ["web agency", "business website", "Next.js", "landing page", "digital studio", "KAH-Digital"],
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
    description:
      "Websites, applications, and digital solutions with a clear process for companies in Switzerland and beyond.",
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
    description: "Websites, applications, and digital solutions with a clear process.",
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
      <SwissTrustSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
