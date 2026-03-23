import { Metadata } from "next";
import { ServicesPageContent } from "@/components/pages/services-page-content";

export const metadata: Metadata = {
  title: "Services digitaux",
  description:
    "Sites web, applications sur mesure et parcours support connectés à GLPI pour entreprises en Suisse et à l'international.",
};

export default function ServicesPage() {
  return <ServicesPageContent locale="fr" />;
}
