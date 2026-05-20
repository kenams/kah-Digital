import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

export const metadata: Metadata = {
  title: "KI-Agentur Berlin — GPT-4 Automatisierung für Startups | KAH Digital",
  description: "KI-Agentur Berlin: GPT-4 Agenten, Lead-Qualifizierung, AI-Chatbots, CRM-Integration für Berliner Startups und Scale-ups. Deployment in 10 Tagen. ROI in 30 Tagen.",
  keywords: ["KI Agentur Berlin", "AI Agentur Berlin", "GPT-4 Agenten Berlin", "KI Automatisierung Berlin", "Chatbot Entwicklung Berlin", "AI Startup Berlin"],
  alternates: { canonical: "https://kah-digital.ch/de/ki-agentur-berlin" },
};

export default function KiAgenturBerlinPage() {
  return <LocalSeoDePageContent data={DE_CITY_PAGES["ki-agentur-berlin"]!} />;
}
