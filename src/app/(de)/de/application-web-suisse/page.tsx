import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Web-App-Entwicklung in der Schweiz",
  description:
    "Web-App-Entwicklung in der Schweiz fuer Kundenportale, Dashboards und Business-Tools. Klares Scoping, CHF-Budgets und eine nuetzliche erste Version.",
};

export default function ApplicationWebSuissePageDe() {
  return <SwissAcquisitionPageContent locale="de" page="application-web-suisse" />;
}
