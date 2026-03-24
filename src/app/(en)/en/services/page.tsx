import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";

export const metadata: Metadata = {
  title: "Digital services",
  description:
    "Websites, custom applications, and GLPI-connected support workflows for French-speaking, English-speaking, and international companies.",
};

export default function ServicesPageEn() {
  return <ServicesPageContent locale="en" />;
}
