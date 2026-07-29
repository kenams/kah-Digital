import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/offres",
  title: "Offres sur mesure — Agent IA, sites web & SaaS | KAH Digital",
  description: "Prestations ajustables : agent IA vertical sur mesure, site web, application, automatisation IA et SaaS. Devis personnalisé clair sous 24h.",
  keywords: ["devis agent IA vertical", "devis personnalisé agence web", "solution digitale sur mesure", "devis application web", "création site web entreprise", "SaaS sur mesure"],
});

export default function OffresPage() {
  return <OffersPageContent locale="fr" />;
}
