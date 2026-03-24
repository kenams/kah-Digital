import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Developpement d'application web en Suisse",
  description:
    "Developpement d'application web en Suisse pour portails clients, dashboards et outils metier. Cadrage clair, budget en CHF et V1 exploitable.",
};

export default function ApplicationWebSuissePage() {
  return <SwissAcquisitionPageContent locale="fr" page="application-web-suisse" />;
}
