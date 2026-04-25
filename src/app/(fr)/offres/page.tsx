import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/offres",
  title: "Tarifs & offres — Sites web, apps et IA | KAH-Digital",
  description: "Tarifs clairs pour sites vitrines, applications web sur mesure et automatisations IA. Devis personnalisé sous 24h. Dès € 300.",
  keywords: ["tarifs agence web", "prix site internet", "devis application web", "offres création site Lausanne"],
});

export default function OffresPage() {
  return <OffersPageContent locale="fr" />;
}
