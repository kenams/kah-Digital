import { IaOffersPageContent } from "@/components/pages/ia-offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/ia-entreprise",
  title: "AI Training for Business: Workshops from €390 | KAH Digital Studio",
  description:
    "Hands-on AI workshops on your real tasks (from €390), tool implementation and monthly support (€190/month). For businesses and individuals, remote, pay online.",
  keywords: ["AI training for business", "AI workshop for SMEs", "ChatGPT training for employees", "AI implementation", "AI consulting small business", "AI coaching"],
});

export default function IaEntreprisePage() {
  return <IaOffersPageContent locale="en" />;
}
