import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

export const metadata: Metadata = {
  title: "AI Agency London — GPT-4 Agents & Automation for UK Businesses | KAH Digital",
  description: "AI agency London: custom GPT-4 agents, lead qualification, 24/7 chatbots, CRM automation. Measurable ROI from month one. Deployed in 10 days. Free AI audit within 24h.",
  keywords: ["AI agency London", "AI automation London", "GPT-4 agents UK", "chatbot development London", "AI consulting London", "business automation UK"],
  alternates: { canonical: "https://kah-digital.ch/en/ai-agency-london" },
};

export default function AiAgencyLondonPage() {
  return <LocalSeoEnPageContent data={EN_CITY_PAGES["ai-agency-london"]!} />;
}
