import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/services/applications",
  title: "Web- und Mobile-Anwendungen",
  description: "Individuelle Web- und Mobile-Anwendungen für Unternehmen in verschiedenen Märkten.",
});

export default function ApplicationsPageDe() {
  return <ServiceDetailPageContent locale="de" page="applications" />;
}
