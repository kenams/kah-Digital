import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

export const metadata: Metadata = {
  title: "AI Agency New York — GPT-4 Agents & Automation for NYC | KAH Digital",
  description: "AI agency New York: custom GPT-4 agents, lead qualification automation, 24/7 support chatbots, CRM workflows. 10-day deployment, ROI from month one. Free AI audit within 24h.",
  keywords: ["AI agency New York", "AI automation NYC", "GPT-4 agents New York", "chatbot development NYC", "AI consulting New York", "business AI automation US"],
  alternates: { canonical: "https://kah-digital.ch/en/ai-agency-new-york" },
};

export default function AiAgencyNewYorkPage() {
  return <LocalSeoEnPageContent data={EN_CITY_PAGES["ai-agency-new-york"]!} />;
}
