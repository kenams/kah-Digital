import { CybersecurityPageContent } from "@/components/pages/cybersecurity-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/cybersecurite",
  title: "Cybersécurité & conformité pour PME : RGPD, ISO 27001, DORA | KAH Digital Studio",
  description:
    "Diagnostic cybersécurité, mise en conformité RGPD, analyse de risques EBIOS RM, sensibilisation des équipes, RSSI à temps partagé. Avec Vincent L’helgoual’ch, 7 ans en cybersécurité, prix annoncés avant de commencer.",
  keywords: [
    "cybersécurité PME",
    "diagnostic cybersécurité",
    "mise en conformité RGPD",
    "RSSI à temps partagé",
    "analyse de risques EBIOS RM",
    "conformité DORA",
    "ISO 27001 accompagnement",
    "sensibilisation cybersécurité entreprise",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cybersécurité et conformité pour PME",
  provider: { "@type": "Organization", name: "KAH Digital Studio", url: "https://kah-digital.ch" },
  areaServed: ["FR", "CH"],
  performer: { "@type": "Person", name: "Vincent L’helgoual’ch", jobTitle: "Expert cybersécurité et conformité", telephone: "+33762607458", email: "vlhelgoualch@gmail.com" },
  serviceType: "Conseil en cybersécurité et conformité",
  description:
    "Diagnostic cybersécurité, conformité RGPD, analyse de risques EBIOS RM, sensibilisation des équipes, RSSI à temps partagé, accompagnement ISO 27001 et DORA.",
};

export default function CybersecuritePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CybersecurityPageContent locale="fr" />
    </>
  );
}
