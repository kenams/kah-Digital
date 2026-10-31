import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/confidentialite",
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de KAH Digital Studio. Protection des données personnelles et RGPD.",
});

export default function ConfidentialitePage() {
  return <PrivacyPolicyPageContent locale="fr" />;
}
