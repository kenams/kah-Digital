import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";

export const metadata: Metadata = {
  title: "Projektanfrage",
  description: "Kurze Anfrage fuer Website-, App- oder Support-Projekte mit KAH-Digital.",
  alternates: {
    canonical: "/de/devis",
    languages: {
      fr: "/devis",
      en: "/en/devis",
    },
  },
};

export default function QuotePageDe() {
  return <QuotePageContent locale="de" />;
}
