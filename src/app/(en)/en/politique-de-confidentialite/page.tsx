import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How KAH-Digital collects and protects personal data.",
};

export default function PrivacyPolicyPageEn() {
  return <PrivacyPolicyPageContent locale="en" />;
}
