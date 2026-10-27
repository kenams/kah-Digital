import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/devis/generateur",
  title: "Generateur de devis PDF | KAH Digital Studio",
  description:
    "Cree un devis KAH Digital Studio directement depuis le site avec les informations client, les prestations et un PDF telechargeable.",
  keywords: ["generateur devis pdf", "devis telechargeable", "devis client", "KAH Digital Studio"],
});

export default function QuoteGeneratorPage() {
  redirect("/devis");
}
