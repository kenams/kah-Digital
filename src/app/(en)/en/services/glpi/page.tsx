import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";

export const metadata: Metadata = {
  title: "GLPI-connected support workflow",
  description: "A cleaner support workflow around GLPI: virtual help, request guidance, and ticket creation when needed.",
};

export default function GLPIPageEn() {
  return <ServiceDetailPageContent locale="en" page="glpi" />;
}
