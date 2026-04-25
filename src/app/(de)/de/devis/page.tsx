import type { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/devis",
  title: "Kostenlose Offerte — Website, App oder KI | KAH-Digital",
  description: "Kostenlose Offerte für dein digitales Projekt. Klare Rückmeldung mit Budget, Zeitplan und Empfehlungen in 24h. Unverbindlich.",
  keywords: ["kostenlose Website Offerte", "Webagentur Angebot Schweiz", "Web-App Offerte", "KI-Projekt Anfrage"],
});

export default function QuotePageDe() {
  return <QuotePageContent locale="de" />;
}
