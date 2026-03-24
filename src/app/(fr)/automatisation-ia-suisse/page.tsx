import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Automatisation IA en Suisse",
  description:
    "Automatisation IA en Suisse pour leads, support et operations. Mise en place utile, simple et mesurable, connectee a vos vrais flux metier.",
};

export default function AutomatisationIaSuissePage() {
  return <SwissAcquisitionPageContent locale="fr" page="automatisation-ia-suisse" />;
}
