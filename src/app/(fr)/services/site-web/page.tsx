import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";

export const metadata: Metadata = {
  title: "Sites web pour entreprises | KAH-Digital",
  description:
    "Creation de sites web vitrines, sites corporate et plateformes sur mesure pour entreprises en Suisse et a l'international. KAH-Digital, base a Lausanne.",
};

export default function SiteWebPage() {
  return <ServiceDetailPageContent locale="fr" page="site-web" />;
}
