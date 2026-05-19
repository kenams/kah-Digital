import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/offres",
  title: "Angebote — Websites, Apps & KI-Automatisierung | KAH Digital Lausanne",
  description: "Massgeschneiderte digitale Lösungen für KMUs in der Schweiz: professionelle Websites, individuelle Apps, KI-Automatisierung. Klare Offerte in 24h, kein Risiko.",
  keywords: ["Website erstellen Schweiz", "digitale Agentur Lausanne", "KI-Automatisierung KMU", "individuelle Web-App", "SaaS Schweiz"],
});

export default function OffresPageDe() {
  return <OffersPageContent locale="de" />;
}
