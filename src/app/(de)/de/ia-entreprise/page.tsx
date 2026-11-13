import { IaOffersPageContent } from "@/components/pages/ia-offers-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/ia-entreprise",
  title: "KI-Schulung für Unternehmen: Workshops ab 390 € | KAH Digital Studio",
  description:
    "Praxisnahe KI-Workshops zu Ihren echten Aufgaben (ab 390 €), Einführung von Werkzeugen und monatliche Begleitung (190 €/Monat). Für Unternehmen und Privatpersonen, online.",
  keywords: ["KI-Schulung Unternehmen", "KI-Workshop KMU", "ChatGPT Schulung Mitarbeiter", "KI-Einführung", "KI-Beratung", "KI-Coaching"],
});

export default function IaEntreprisePage() {
  return <IaOffersPageContent locale="de" />;
}
