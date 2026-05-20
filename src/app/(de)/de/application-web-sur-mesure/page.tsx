import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/application-web-sur-mesure",
  title: "Individuelle Web-App · MVP in 4 Wochen | KAH Digital",
  description:
    "Maßgeschneiderte Web-Anwendungen auf Next.js 15 + Supabase: B2B-Portale, Dashboards, SaaS, interne Tools. Funktionale V1 in 4 Wochen, 100% Ihr Eigentum. Kostenloses Scoping in 48h.",
  keywords: [
    "Web App Entwicklung Schweiz",
    "individuelle Webanwendung Lausanne",
    "SaaS Entwicklung Schweiz",
    "B2B Portal Entwicklung",
    "Dashboard Entwicklung Next.js",
    "MVP Entwicklung Schweiz",
  ],
});

export default function ApplicationWebSurMesurePageDe() {
  return <GlobalAcquisitionPageContent locale="de" page="application-web-sur-mesure" />;
}
