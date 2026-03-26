import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/refonte-site-web",
  title: "Refonte de site web",
  description:
    "Refonte de site web pour entreprises qui veulent reprendre une base plus propre, plus lisible et plus convaincante.",
  keywords: ["refonte site web", "redesign site entreprise", "refonte site web suisse"],
});

export default function RefonteSiteWebPage() {
  return <GlobalAcquisitionPageContent locale="fr" page="refonte-site-web" />;
}
