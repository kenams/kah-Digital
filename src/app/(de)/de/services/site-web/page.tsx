import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/services/site-web",
  title: "Unternehmenswebsites",
  description: "Klare Business-Websites, Corporate Sites und Präsentationsplattformen für Unternehmen in verschiedenen Märkten.",
});

export default function SiteWebPageDe() {
  return <ServiceDetailPageContent locale="de" page="site-web" />;
}
