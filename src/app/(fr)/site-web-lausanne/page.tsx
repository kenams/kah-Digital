import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "Creation de site web a Lausanne",
  description:
    "Creation de site web a Lausanne pour entreprises vaudoises, PME et marques locales. Refonte claire, rapide et orientee prises de contact.",
};

export default function SiteWebLausannePage() {
  return <SwissAcquisitionPageContent locale="fr" page="site-web-lausanne" />;
}
