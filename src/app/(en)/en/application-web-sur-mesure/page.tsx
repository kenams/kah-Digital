import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/application-web-sur-mesure",
  title: "Custom web application",
  description:
    "Custom web application for client portals, dashboards, internal tools, and member areas with clear scoping and a useful first version.",
  keywords: ["custom web application", "client portal development", "business dashboard development"],
});

export default function ApplicationWebSurMesurePageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="application-web-sur-mesure" />;
}
