import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/politique-de-confidentialite",
  title: "Privacy policy",
  description: "How KAH Digital Studio collects and protects personal data.",
});

export default function PrivacyPolicyPageEn() {
  return <PrivacyPolicyPageContent locale="en" />;
}
