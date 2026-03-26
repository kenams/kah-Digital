import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/site-web-entreprise",
  title: "Business-Website",
  description:
    "Business-Website fuer KMU, Beratungen, Agenturen und Dienstleister mit klarerer Positionierung und sauberer Conversion.",
  keywords: ["business website", "unternehmenswebsite", "webagentur schweiz"],
});

export default function SiteWebEntreprisePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="site-web-entreprise" />;
}
