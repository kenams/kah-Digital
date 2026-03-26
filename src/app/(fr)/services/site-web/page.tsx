import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/services/site-web",
  title: "Sites web pour entreprises",
  description:
    "Creation de sites web vitrines, sites corporate et plateformes sur mesure pour entreprises francophones, anglophones et internationales.",
});

export default function SiteWebPage() {
  return <ServiceDetailPageContent locale="fr" page="site-web" />;
}
