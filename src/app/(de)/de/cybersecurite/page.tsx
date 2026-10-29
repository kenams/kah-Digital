import { CybersecurityPageContent } from "@/components/pages/cybersecurity-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/cybersecurite",
  title: "Cybersicherheit & Compliance für KMU: DSGVO, ISO 27001, DORA | KAH Digital Studio",
  description:
    "Cybersicherheits-Analyse, DSGVO-Konformität, Risikoanalyse EBIOS RM, Sensibilisierung der Teams, Sicherheitsverantwortlicher auf Teilzeit. Ein Experte mit 7 Jahren Cybersicherheit, Preise vor Projektbeginn.",
  keywords: [
    "Cybersicherheit KMU",
    "Cybersicherheits-Analyse",
    "DSGVO Umsetzung",
    "CISO auf Teilzeit",
    "Risikoanalyse EBIOS RM",
    "DORA Compliance",
    "ISO 27001 Begleitung",
    "Awareness-Training Cybersicherheit",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Cybersicherheit und Compliance für KMU",
  provider: { "@type": "Organization", name: "KAH Digital Studio", url: "https://kah-digital.ch" },
  areaServed: ["FR", "CH", "DE"],
  serviceType: "Beratung zu Cybersicherheit und Compliance",
  description:
    "Cybersicherheits-Analyse, DSGVO-Konformität, Risikoanalyse EBIOS RM, Sensibilisierung der Teams, Sicherheitsverantwortlicher auf Teilzeit, ISO-27001- und DORA-Begleitung.",
};

export default function CybersecuritePageDe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CybersecurityPageContent locale="de" />
    </>
  );
}
