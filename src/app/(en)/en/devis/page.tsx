import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "en",
  path: "/devis",
  title: "Quick quote",
  description: "Request a clear estimate for your website, app, or AI project. Structured reply within 24 hours.",
});

export default function DevisPageEn() {
  return <QuotePageContent locale="en" />;
}
