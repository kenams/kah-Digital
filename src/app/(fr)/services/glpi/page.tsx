import type { Metadata } from "next";
import { ServiceDetailPageContent } from "@/components/pages/service-detail-page-content";

export const metadata: Metadata = {
  title: "Parcours support connecté à GLPI | KAH-Digital",
  description:
    "KAH-Digital conçoit des parcours support connectés à GLPI pour entreprises en Suisse et à l'international : aide virtuelle, orientation des demandes et création de ticket quand c'est nécessaire.",
};

export default function GLPIPage() {
  return <ServiceDetailPageContent locale="fr" page="glpi" />;
}
