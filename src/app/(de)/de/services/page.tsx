import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";

export const metadata: Metadata = {
  title: "Leistungen",
  description: "Websites, individuelle Anwendungen und GLPI-nahe Support-Workflows fuer Unternehmen in verschiedenen Maerkten.",
};

export default function ServicesPageDe() {
  return <ServicesPageContent locale="de" />;
}
