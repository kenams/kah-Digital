import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/services/applications",
  title: "Applications web et mobiles",
  description:
    "Developpement d'applications web et mobiles pour entreprises francophones, anglophones et internationales. Outils metier, portails, automatisation et interfaces sur mesure.",
});

export default function ApplicationsPage() {
  return <ServiceDetailPageContent locale="fr" page="applications" />;
}
