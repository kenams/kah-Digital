import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

export const metadata: Metadata = {
  title: "KI-Agentur München — GPT-4 Automatisierung für Bayern | KAH Digital",
  description: "KI-Agentur München: GPT-4 Agenten, Lead-Automatisierung, 24/7-Chatbots, CRM-Integrationen. Deployment in 10 Tagen. ROI in 30 Tagen. Kostenloses KI-Audit.",
  keywords: ["KI Agentur München", "KI Automatisierung München", "GPT-4 Agenten Bayern", "AI Agentur München", "Chatbot München", "KI Beratung Bayern"],
  alternates: { canonical: "https://kah-digital.ch/de/ki-agentur-muenchen" },
};

export default function KiAgenturMuenchenPage() {
  return <LocalSeoDePageContent data={DE_CITY_PAGES["ki-agentur-muenchen"]!} />;
}
