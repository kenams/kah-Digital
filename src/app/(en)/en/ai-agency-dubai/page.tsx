import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

export const metadata: Metadata = {
  title: "AI Agency Dubai — GPT-4 Agents & Automation for UAE | KAH Digital",
  description: "AI agency Dubai: multilingual GPT-4 agents (Arabic/English), lead qualification, 24/7 chatbots, CRM automation for UAE businesses. Free audit within 24h. Deploy in 10 days.",
  keywords: ["AI agency Dubai", "AI automation UAE", "GPT-4 agents Dubai", "chatbot development Dubai", "AI consulting UAE", "business automation Dubai"],
  alternates: { canonical: "https://kah-digital.ch/en/ai-agency-dubai" },
};

export default function AiAgencyDubaiPage() {
  return <LocalSeoEnPageContent data={EN_CITY_PAGES["ai-agency-dubai"]!} />;
}
