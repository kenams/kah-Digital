import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/services/glpi",
  title: "GLPI-verbundener Support-Workflow",
  description: "Ein klarerer Support-Workflow rund um GLPI: virtuelle Hilfe, gefuehrte Anfragen und Ticket-Erstellung bei Bedarf.",
});

export default function GLPIPageDe() {
  return <ServiceDetailPageContent locale="de" page="glpi" />;
}
