import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";

export const metadata: Metadata = {
  title: "Parcours support connecte a GLPI | KAH-Digital",
  description:
    "KAH-Digital conçoit des parcours support connectes a GLPI pour entreprises francophones, anglophones et internationales : aide virtuelle, orientation des demandes et creation de ticket quand c'est necessaire.",
};

export default function GLPIPage() {
  return <ServiceDetailPageContent locale="fr" page="glpi" />;
}
