import type { Metadata } from "next";
import { OrderPageContent } from "@/components/pages/order-page-content";
import { isPackId } from "@/lib/pack-orders";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/commander",
  title: "Commander mon site en ligne — Starter 290 € ou Business 790 € | KAH Digital Studio",
  description:
    "Choisissez votre pack, payez en ligne en toute sécurité et recevez votre site professionnel en 5 jours ouvrés. Prix fixe, abonnement optionnel sans engagement.",
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CommanderPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const pack = typeof params.pack === "string" && isPackId(params.pack) ? params.pack : "business";
  return <OrderPageContent initialPack={pack} cancelled={params.annule === "1"} />;
}
