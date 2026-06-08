import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/devis/generateur",
  title: "PDF quote generator | KAH Digital",
  description:
    "Create a KAH Digital quote directly from the website with client details, service lines, and a downloadable PDF.",
  keywords: ["pdf quote generator", "downloadable quote", "client quote", "KAH Digital"],
});

export default function QuoteGeneratorPage() {
  redirect("/en/devis");
}
