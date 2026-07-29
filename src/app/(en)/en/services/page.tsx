import type { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/services",
  title: "Services — Vertical AI Agents & digital",
  description:
    "Custom vertical AI agents, websites, custom applications, and GLPI-connected support workflows for French-speaking, English-speaking, and international companies.",
});

export default function ServicesPageEn() {
  return <ServicesPageContent locale="en" />;
}
