import { AgentsIaPageContent } from "@/components/pages/agents-ia-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/en/agents-ia",
  title: "Custom AI Agents · Prospecting, Support, Quotes, Casting | KAH Digital",
  description:
    "KAH Digital builds packaged AI agents live in 10 days: 120 prospects/day, 70% auto-resolved tickets, 30-second quotes, Castly casting agent. Free 20-min demo.",
  keywords: [
    "custom AI agent",
    "AI automation for business",
    "AI prospecting agent",
    "AI support chatbot",
    "automated quote agent",
    "Castly casting AI",
    "AI for retailers",
    "AI for SMEs",
    "AI agent Lausanne",
  ],
});

export default function AgentsIaEnPage() {
  return <AgentsIaPageContent locale="en" />;
}
