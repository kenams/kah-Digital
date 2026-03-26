import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";

export const metadata: Metadata = {
  title: "Projektanfrage",
  description: "Schnelle Anfrage fuer Website-, App- oder KI-Projekte mit klarer Rueckmeldung innerhalb von 24 Stunden.",
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
