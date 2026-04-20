import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/application-web-sur-mesure",
  title: "Custom web application | KAH-Digital",
  description:
    "Custom web application development for portals, dashboards, internal tools, client areas, and business workflows.",
});

export default function ApplicationWebSurMesurePageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="application-web-sur-mesure" />;
}
