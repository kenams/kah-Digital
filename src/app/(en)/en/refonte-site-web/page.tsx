import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "Website redesign | KAH-Digital",
  description:
    "Website redesign for companies that need a cleaner, stronger, more convincing digital base.",
};

export default function RefonteSiteWebPageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="refonte-site-web" />;
}
