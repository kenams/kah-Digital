import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

export const metadata: Metadata = {
  title: "KI-Agentur Zürich — GPT-4 Agenten & Automatisierung | KAH Digital",
  description: "KI-Agentur Zürich: GPT-4 Agenten, Lead-Qualifizierung, Chatbots, CRM-Automatisierung. ROI messbar ab Monat 1. Deployment in 10 Tagen. Kostenloses KI-Audit in 24h.",
  keywords: ["KI Agentur Zürich", "KI Automatisierung Zürich", "GPT-4 Agenten Zürich", "Chatbot Entwicklung Zürich", "AI Agentur Zürich", "KI Beratung Zürich"],
  alternates: { canonical: "https://kah-digital.ch/de/ki-agentur-zuerich" },
};

export default function KiAgenturZuerichPage() {
  return <LocalSeoDePageContent data={DE_CITY_PAGES["ki-agentur-zuerich"]!} />;
}
