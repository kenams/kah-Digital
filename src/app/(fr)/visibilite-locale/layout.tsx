import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/visibilite-locale",
  title: "Visibilité locale — avis et fiche Google gérés pour vous | KAH Digital Studio",
  description: "Demande d'avis automatique, fiche Google tenue à jour et réponses aux avis rédigées pour vous, avec un bilan chiffré chaque mois. Liste d'attente ouverte.",
  keywords: ["visibilité locale", "référencement local", "SEO local artisan", "recommandation ChatGPT entreprise locale", "fiche Google entreprise"],
});

export default function VisibiliteLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
