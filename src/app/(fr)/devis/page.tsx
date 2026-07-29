import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/devis",
  title: "Devis personnalisé — Agent IA, site web ou application | KAH Digital",
  description: "Décrivez votre besoin même sans cahier des charges complet. KAH Digital prépare une proposition claire, ajustable et sans engagement sous 24h — de l'agent IA vertical au site web.",
  keywords: ["devis agent IA vertical", "devis personnalisé site web", "devis agence web Lausanne", "demande devis application", "solution digitale sur mesure"],
});

type Props = { searchParams: Promise<Record<string, string | undefined>> };

export default async function DevisPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <QuotePageContent
      locale="fr"
      defaultCompany={params.company ?? ""}
      defaultSite={params.site ?? ""}
    />
  );
}
