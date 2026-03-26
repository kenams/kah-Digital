import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/application-web-sur-mesure",
  title: "Web-Anwendung nach Mass",
  description:
    "Massgeschneiderte Web-Anwendung fuer Kundenportal, Dashboard, internes Tool oder Member Area mit klarem Scoping und nuetzlicher V1.",
  keywords: ["web anwendung nach mass", "kundenportal entwicklung", "dashboard entwicklung"],
});

export default function ApplicationWebSurMesurePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="application-web-sur-mesure" />;
}
