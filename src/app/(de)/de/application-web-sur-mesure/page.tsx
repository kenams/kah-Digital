import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/application-web-sur-mesure",
  title: "Maßgeschneiderte Web-Anwendung | KAH-Digital",
  description:
    "Maßgeschneiderte Web-Anwendung für Portale, Dashboards, interne Tools, Kundenbereiche und Business-Workflows.",
});

export default function ApplicationWebSurMesurePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="application-web-sur-mesure" />;
}
