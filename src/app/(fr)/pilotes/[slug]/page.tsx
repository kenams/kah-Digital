import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PilotPageContent } from "@/components/pages/pilot-page-content";
import { getPilot, pilots } from "@/data/pilotes";
import { buildPageMetadata } from "@/lib/shared-metadata";

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
  return <PilotPageContent pilot={pilot} />;
}
