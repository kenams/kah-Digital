import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Creation de site web a Geneve",
  description:
    "Creation de site web a Geneve pour PME, cabinets et societes de service. Site clair, credible et oriente conversion, avec budgets en CHF.",
};

export default function SiteWebGenevePage() {
  return <SwissAcquisitionPageContent locale="fr" page="site-web-geneve" />;
}
