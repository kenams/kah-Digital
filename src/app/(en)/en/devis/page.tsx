import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";

export const metadata: Metadata = {
  title: "Quick quote",
  description: "Short form to estimate a website or digital experience.",
  alternates: {
    canonical: "/en/devis",
    languages: {
      fr: "/devis",
      de: "/de/devis",
    },
  },
};

export default function DevisPageEn() {
  return <QuotePageContent locale="en" />;
}
