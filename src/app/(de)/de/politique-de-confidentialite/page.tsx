import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/politique-de-confidentialite",
  title: "Datenschutzerklärung",
  description: "Wie KAH Digital Studio personenbezogene Daten erhebt und schützt. Rechte, Speicherdauer und Cookies im Überblick.",
});

export default function PrivacyPolicyPageDe() {
  return <PrivacyPolicyPageContent locale="de" />;
}
