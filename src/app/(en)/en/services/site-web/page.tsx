import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";

export const metadata: Metadata = {
  title: "Business websites",
  description:
    "Showcase websites, corporate websites, and custom presentation platforms for French-speaking, English-speaking, and international companies.",
};

export default function SiteWebPageEn() {
  return <ServiceDetailPageContent locale="en" page="site-web" />;
}
