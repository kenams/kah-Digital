import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";

export const metadata: Metadata = {
  title: "Quick quote",
  description: "Request a clear estimate for your website, app, or AI project. Structured reply within 24 hours.",
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
