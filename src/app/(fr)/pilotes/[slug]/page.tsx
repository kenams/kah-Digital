import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PilotPageContent } from "@/components/pages/pilot-page-content";
import { getPilot, pilots } from "@/data/pilotes";
import { SITE_URL, buildPageMetadata } from "@/lib/shared-metadata";
import { JsonLd } from "@/components/json-ld";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return pilots.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pilot = getPilot(slug);
  if (!pilot) return {};
  return buildPageMetadata({
    locale: "fr",
    path: `/pilotes/${pilot.slug}`,
    title: `${pilot.name} : pilote SaaS partenaire fondateur`,
    description: pilot.metaDescription,
    keywords: [`${pilot.name} SaaS pilote`, "partenaire fondateur", "co-développement SaaS"],
  });
}

export default async function PilotPage({ params }: Props) {
  const { slug } = await params;
  const pilot = getPilot(slug);
  if (!pilot) notFound();
  const url = `${SITE_URL}/pilotes/${pilot.slug}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: `${pilot.name} : pilote SaaS partenaire fondateur`,
        description: pilot.metaDescription,
        inLanguage: "fr-FR",
        isPartOf: { "@type": "WebSite", url: SITE_URL, name: "KAH Digital Studio" },
        publisher: { "@type": "Organization", name: "KAH Digital Studio", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Pilotes SaaS", item: `${SITE_URL}/pilotes` },
          { "@type": "ListItem", position: 3, name: pilot.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: pilot.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <>
      <JsonLd data={graph} />
      <PilotPageContent pilot={pilot} />
    </>
  );
}
