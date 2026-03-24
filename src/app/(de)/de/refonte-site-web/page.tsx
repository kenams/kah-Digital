import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "Website-Refonte | KAH-Digital",
  description:
    "Website-Refonte fuer Unternehmen, die auf einer saubereren, glaubwuerdigeren digitalen Basis neu starten wollen.",
};

export default function RefonteSiteWebPageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="refonte-site-web" />;
}
