import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/offres",
  title: "Offres claires",
  description: "Details simples des offres, du budget et des livrables.",
});

export default function OffresPage() {
  return <OffersPageContent locale="fr" />;
}
