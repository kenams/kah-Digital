import { AgenceIaPageContent } from "@/components/pages/agence-ia-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/agence-ia",
  title: "AI Agency · GPT-4 Agents, Automation & Chatbots | KAH Digital",
  description:
    "KAH Digital is the AI agency that automates your processes: lead qualification, 24/7 support, custom GPT-4 agents, CRM integrations. Measurable ROI at D+30. Free audit within 24h.",
  keywords: [
    "AI agency Switzerland",
    "AI agency Lausanne",
    "GPT-4 agents business",
    "AI chatbot agency",
    "business automation agency",
    "AI automation Switzerland",
    "custom AI agents",
    "AI consulting Switzerland",
  ],
});

export default function AgenceIaPageEn() {
  return <AgenceIaPageContent locale="en" />;
}
