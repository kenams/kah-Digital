import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/offres",
  title: "Preise & Angebote — Websites, Apps & KI | KAH-Digital",
  description: "Klare Preise für Websites, maßgeschneiderte Web-Apps und KI-Automatisierung. Individuelle Offerte in 24h. Ab € 300.",
  keywords: ["Webagentur Preise", "Website Kosten Schweiz", "Web-App Offerte", "KI-Automatisierung Preis"],
});

export default function OffresPageDe() {
  return <OffersPageContent locale="de" />;
}
