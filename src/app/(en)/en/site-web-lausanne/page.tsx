import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Website development in Lausanne",
  description:
    "Website development in Lausanne for companies in Vaud, SMBs, and local brands. Clear redesigns with stronger conversion and simpler contact flows.",
};

export default function SiteWebLausannePageEn() {
  return <SwissAcquisitionPageContent locale="en" page="site-web-lausanne" />;
}
