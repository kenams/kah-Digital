import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/devis",
  title: "Kostenlose Offerte — Website, App oder KI-Automatisierung | KAH Digital",
  description: "Beschreiben Sie Ihr Projekt. KAH Digital erstellt ein klares, angepasstes Angebot ohne Verpflichtung innerhalb von 24h. Studio in Lausanne, Schweiz.",
  keywords: ["Offerte Website Schweiz", "Webentwicklung Angebot", "KI Automatisierung Angebot", "digitale Lösung Schweiz"],
});

export default function DevisPageDe() {
  return <QuotePageContent locale="de" />;
}
