import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/application-web-sur-mesure",
  title: "Massgeschneiderte Web-Anwendung | KAH-Digital",
  description:
    "Massgeschneiderte Web-Anwendung fuer Portale, Dashboards, interne Tools, Kundenbereiche und Business-Workflows.",
});

export default function ApplicationWebSurMesurePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="application-web-sur-mesure" />;
}
