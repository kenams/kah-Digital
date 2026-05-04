import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/offres",
  title: "Tarifs & offres — Sites web, apps & SaaS | KAH-Digital",
  description: "Tarifs clairs : landing dès 300€, site vitrine dès 900€, automatisation IA dès 1500€, application web dès 4000€. Devis sous 24h.",
  keywords: ["tarifs agence web", "prix site internet", "devis application web", "prix création site web", "tarif site vitrine", "prix SaaS sur mesure"],
});

export default function OffresPage() {
  return <OffersPageContent locale="fr" />;
}
