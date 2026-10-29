import { CybersecurityPageContent } from "@/components/pages/cybersecurity-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/cybersecurite",
  title: "Cybersecurity & Compliance for SMEs: GDPR, ISO 27001, DORA | KAH Digital Studio",
  description:
    "Cybersecurity assessment, GDPR compliance, EBIOS RM risk analysis, team awareness training, part-time security officer. With Vincent L’helgoual’ch, 7 years in cybersecurity, prices agreed before we start.",
  keywords: [
    "SME cybersecurity",
    "cybersecurity assessment",
    "GDPR compliance support",
    "part-time CISO",
    "EBIOS RM risk analysis",
    "DORA compliance",
    "ISO 27001 support",
    "security awareness training",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cybersecurity and compliance for SMEs",
  provider: { "@type": "Organization", name: "KAH Digital Studio", url: "https://kah-digital.ch" },
  areaServed: ["FR", "CH"],
  performer: { "@type": "Person", name: "Vincent L’helgoual’ch", jobTitle: "Cybersecurity and compliance expert", telephone: "+33762607458", email: "vlhelgoualch@gmail.com" },
  serviceType: "Cybersecurity and compliance consulting",
  description:
    "Cybersecurity assessment, GDPR compliance, EBIOS RM risk analysis, team awareness training, part-time security officer, ISO 27001 and DORA support.",
};

export default function CybersecuritePageEn() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CybersecurityPageContent locale="en" />
    </>
  );
}
