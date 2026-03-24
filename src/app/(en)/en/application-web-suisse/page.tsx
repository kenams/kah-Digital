import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Web application development in Switzerland",
  description:
    "Web application development in Switzerland for client portals, dashboards, and business tools. Clear scoping, CHF budgets, and a useful first version.",
};

export default function ApplicationWebSuissePageEn() {
  return <SwissAcquisitionPageContent locale="en" page="application-web-suisse" />;
}
