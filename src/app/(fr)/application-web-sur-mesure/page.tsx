import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/application-web-sur-mesure",
  title: "Application web sur mesure",
  description:
    "Application web sur mesure pour portail client, dashboard, outil metier ou espace membre avec un cadrage clair et une V1 utile.",
  keywords: ["application web sur mesure", "portail client", "outil metier web"],
});

export default function ApplicationWebSurMesurePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="application-web-sur-mesure" />;
}
