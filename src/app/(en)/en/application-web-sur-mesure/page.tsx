import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "Custom web application | KAH-Digital",
  description:
    "Custom web application development for portals, dashboards, internal tools, client areas, and business workflows.",
};

export default function ApplicationWebSurMesurePageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="application-web-sur-mesure" />;
}
