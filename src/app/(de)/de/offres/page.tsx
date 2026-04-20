import type { Metadata } from "next";
import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "de",
  path: "/offres",
  title: "Klare Angebote",
  description: "Einfache Details zu Angeboten, Budget und Lieferumfang.",
});

export default function OffresPageDe() {
  return <OffersPageContent locale="de" />;
}
