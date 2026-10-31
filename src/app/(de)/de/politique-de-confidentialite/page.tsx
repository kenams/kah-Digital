import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Wie KAH Digital Studio personenbezogene Daten erhebt und schützt.",
};

export default function PrivacyPolicyPageDe() {
  return <PrivacyPolicyPageContent locale="de" />;
}
