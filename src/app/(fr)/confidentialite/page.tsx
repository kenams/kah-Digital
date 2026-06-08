import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de KAH Digital. Protection des données personnelles et RGPD.",
  alternates: {
    canonical: "/confidentialite",
  },
};

export default function ConfidentialitePage() {
  return <PrivacyPolicyPageContent locale="fr" />;
}
