import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/devis/generateur",
  title: "PDF quote generator | KAH Digital Studio",
  description:
    "Create a KAH Digital Studio quote directly from the website with client details, service lines, and a downloadable PDF.",
  keywords: ["pdf quote generator", "downloadable quote", "client quote", "KAH Digital Studio"],
});

export default function QuoteGeneratorPage() {
  redirect("/en/devis");
}
