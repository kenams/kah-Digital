import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/devis/generateur",
  title: "Generateur de devis PDF | KAH-Digital",
  description:
    "Cree un devis KAH-Digital directement depuis le site avec les informations client, les prestations et un PDF telechargeable.",
  keywords: ["generateur devis pdf", "devis telechargeable", "devis client", "KAH-Digital"],
});

export default function QuoteGeneratorPage() {
  redirect("/devis");
}
