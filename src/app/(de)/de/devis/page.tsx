import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "de",
  path: "/devis",
  title: "Projektanfrage",
  description: "Schnelle Anfrage fuer Website-, App- oder KI-Projekte mit klarer Rueckmeldung innerhalb von 24 Stunden.",
});

export default function QuotePageDe() {
  return <QuotePageContent locale="de" />;
}
