import type { Metadata } from "next";
import { IaThanksPageContent } from "@/components/pages/ia-thanks-page-content";

export const metadata: Metadata = {
  title: "Vielen Dank für Ihre Buchung | KAH Digital Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function IaThanksPage({ searchParams }: Props) {
  const params = await searchParams;
  const raw = Array.isArray(params.offre) ? params.offre[0] : params.offre;
  return <IaThanksPageContent locale="de" offerId={raw} />;
}
