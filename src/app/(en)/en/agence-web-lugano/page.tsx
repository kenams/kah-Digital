import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

const data = EN_CITY_PAGES["agence-web-lugano"]!;

export const metadata: Metadata = {
  title: "Web Agency Lugano — KAH Digital Studio | Custom Quote",
  description: `${data.subline} Free quote within 24h.`,
  keywords: ["web development Lugano", "website Lugano", "web agency Lugano"],
  alternates: { canonical: "https://kah-digital.ch/en/agence-web-lugano" },
};

export default function Page() {
  return <LocalSeoEnPageContent data={data} />;
}
