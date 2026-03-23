import type { Metadata } from "next";
import { PrivacyPolicyPageContent } from "@/components/pages/privacy-policy-page-content";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Wie KAH-Digital personenbezogene Daten erhebt, nutzt und schuetzt.",
};

export default function PrivacyPolicyPageDe() {
  return <PrivacyPolicyPageContent locale="de" />;
}
