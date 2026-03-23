import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";

export const metadata: Metadata = {
  title: "Web and mobile applications",
  description: "Custom web and mobile application development for companies in Switzerland and internationally.",
};

export default function ApplicationsPageEn() {
  return <ServiceDetailPageContent locale="en" page="applications" />;
}
