import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";

export const metadata: Metadata = {
  title: "Web- und Mobile-Anwendungen",
  description: "Individuelle Web- und Mobile-Anwendungen fuer Unternehmen in der Schweiz und international.",
};

export default function ApplicationsPageDe() {
  return <ServiceDetailPageContent locale="de" page="applications" />;
}
