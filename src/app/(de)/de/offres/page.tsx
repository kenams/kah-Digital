import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";

export const metadata: Metadata = {
  title: "Klare Angebote",
  description: "Einfache Details zu Angeboten, Budget und Lieferumfang.",
  alternates: {
    canonical: "/de/offres",
    languages: {
      fr: "/offres",
      en: "/en/offres",
    },
  },
};

export default function OffresPageDe() {
  return <OffersPageContent locale="de" />;
}
