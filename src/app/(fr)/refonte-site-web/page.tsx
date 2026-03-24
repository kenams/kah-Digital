import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "Refonte de site web | KAH-Digital",
  description:
    "Refonte de site web pour entreprises qui veulent reprendre une base plus propre, plus lisible et plus convaincante.",
};

export default function RefonteSiteWebPage() {
  return <GlobalAcquisitionPageContent locale="fr" page="refonte-site-web" />;
}
