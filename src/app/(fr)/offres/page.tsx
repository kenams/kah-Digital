import { OffersPageContent } from "@/components/pages/offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/offres",
  title: "Offres sur mesure — Sites web, apps & SaaS | KAH Digital",
  description: "Prestations digitales ajustables pour site web, application sur mesure, automatisation IA et SaaS. Devis personnalisé clair sous 24h.",
  keywords: ["devis personnalisé agence web", "solution digitale sur mesure", "devis application web", "création site web entreprise", "site vitrine sur mesure", "SaaS sur mesure"],
});

export default function OffresPage() {
  return <OffersPageContent locale="fr" />;
}
