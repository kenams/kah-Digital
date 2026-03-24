import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "Site web entreprise | KAH-Digital",
  description:
    "Creation de site web d'entreprise pour PME, cabinets, agences et structures de service. Positionnement clair, site credible et conversion propre.",
};

export default function SiteWebEntreprisePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="site-web-entreprise" />;
}
