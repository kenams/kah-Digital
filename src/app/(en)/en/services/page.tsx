import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";

export const metadata: Metadata = {
  title: "Digital services",
  description: "Websites, custom applications, and GLPI-connected support workflows for companies in Switzerland and internationally.",
};

export default function ServicesPageEn() {
  return <ServicesPageContent locale="en" />;
}
