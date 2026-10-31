import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/devis",
  title: "Kostenlose Offerte — Vertikaler KI-Agent, Website oder App | KAH Digital Studio",
  description: "Beschreiben Sie Ihr Projekt. KAH Digital Studio erstellt ein klares, angepasstes Angebot ohne Verpflichtung innerhalb von 24h — vom vertikalen KI-Agenten bis zur Website. Remote-Studio für Frankreich und die Schweiz.",
  keywords: ["vertikaler KI-Agent Offerte", "Offerte Website Schweiz", "Webentwicklung Angebot", "KI Automatisierung Angebot", "digitale Lösung Schweiz"],
});

export default function DevisPageDe() {
  return <QuotePageContent locale="de" />;
}
