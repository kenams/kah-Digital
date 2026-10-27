import { redirect } from "next/navigation";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/proposition/ashanti-beauty-balma",
  title: "Proposition sur mesure KAH Digital Studio",
  description: "Proposition KAH Digital Studio ajustee apres cadrage du besoin.",
});

export default function AshantiBeautyProposalPage() {
  redirect("/devis");
}
