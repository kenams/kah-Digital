import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/offres",
  title: "Angebote — Vertikaler KI-Agent, Websites & SaaS | KAH Digital Lausanne",
  description: "Massgeschneiderte Lösungen für KMUs in der Schweiz: vertikaler KI-Agent, professionelle Websites, individuelle Apps, KI-Automatisierung. Klare Offerte in 24h.",
  keywords: ["vertikaler KI-Agent Offerte", "Website erstellen Schweiz", "digitale Agentur Lausanne", "KI-Automatisierung KMU", "individuelle Web-App", "SaaS Schweiz"],
});

export default function OffresPageDe() {
  return <OffersPageContent locale="de" />;
}
