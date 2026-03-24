import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";

export const metadata: Metadata = {
  title: "Application web sur mesure | KAH-Digital",
  description:
    "Developpement d'application web sur mesure : portail, dashboard, outil metier, espace client et workflow exploitable.",
};

export default function ApplicationWebSurMesurePage() {
  return <GlobalAcquisitionPageContent locale="fr" page="application-web-sur-mesure" />;
}
