import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/site-web-entreprise",
  title: "Site web entreprise",
  description:
    "Creation de site web d'entreprise pour PME, cabinets, agences et structures de service. Positionnement clair, site credible et conversion propre.",
  keywords: ["site web entreprise", "creation site web entreprise", "agence web suisse"],
});

export default function SiteWebEntreprisePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="site-web-entreprise" />;
}
