import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/site-web-entreprise",
  title: "Site web entreprise | KAH-Digital",
  description:
    "Creation de site web d'entreprise pour PME, cabinets, agences et structures de service. Positionnement clair, site credible et conversion propre.",
});

export default function SiteWebEntreprisePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="site-web-entreprise" />;
}

