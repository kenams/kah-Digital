import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";

export const metadata: Metadata = {
  title: "Unternehmenswebsites",
  description: "Klare Business-Websites, Corporate Sites und Praesentationsplattformen fuer Unternehmen in verschiedenen Maerkten.",
};

export default function SiteWebPageDe() {
  return <ServiceDetailPageContent locale="de" page="site-web" />;
}
