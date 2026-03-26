import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";

export const metadata: Metadata = {
  title: "Clear offers",
  description: "Simple offer details, budgets, and deliverables.",
  alternates: {
    canonical: "/en/offres",
    languages: {
      fr: "/offres",
      de: "/de/offres",
    },
  },
  openGraph: {
    type: "website",
    title: "Clear offers",
    description: "Simple offer details, budgets, and deliverables.",
    url: "/en/offres",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "Kah-Digital offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clear offers",
    description: "Simple offer details, budgets, and deliverables.",
    images: ["/og-kah-digital.png"],
  },
};

export default function OffresPageEn() {
  return <OffersPageContent locale="en" />;
}
