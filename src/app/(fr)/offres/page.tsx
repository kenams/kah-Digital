import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";

export const metadata: Metadata = {
  title: "Offres claires",
  description: "Details simples des offres, du budget et des livrables.",
  alternates: {
    canonical: "/offres",
    languages: {
      en: "/en/offres",
      de: "/de/offres",
    },
  },
  openGraph: {
    type: "website",
    title: "Offres claires",
    description: "Details simples des offres, du budget et des livrables.",
    url: "/offres",
    images: [
      {
        url: "/og-kah-digital.png",
        width: 1200,
        height: 630,
        alt: "Offres Kah-Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Offres claires",
    description: "Details simples des offres, du budget et des livrables.",
    images: ["/og-kah-digital.png"],
  },
};

export default function OffresPage() {
  return <OffersPageContent locale="fr" />;
}
