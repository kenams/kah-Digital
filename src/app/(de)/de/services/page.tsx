import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/services",
  title: "Leistungen",
  description: "Websites, individuelle Anwendungen und GLPI-nahe Support-Workflows fuer Unternehmen in verschiedenen Maerkten.",
  keywords: ["website leistungen", "web anwendung nach mass", "ki assistent", "GLPI support"],
});

export default function ServicesPageDe() {
  return <ServicesPageContent locale="de" />;
}
