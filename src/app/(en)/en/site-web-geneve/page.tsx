import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Website development in Geneva",
  description:
    "Website development in Geneva for SMBs, consultancies, and service companies. Clear, credible, conversion-oriented websites with CHF budgets.",
};

export default function SiteWebGenevePageEn() {
  return <SwissAcquisitionPageContent locale="en" page="site-web-geneve" />;
}
