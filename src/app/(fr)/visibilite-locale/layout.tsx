import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/visibilite-locale",
  title: "Visibilité locale — Google, Maps et assistants IA vous recommandent-ils ? | KAH Digital Studio",
  description: "Un suivi mensuel de votre visibilité locale : Google, Maps et réponses des assistants IA. Score, concurrents et plan d'action concret. Liste d'attente ouverte.",
  keywords: ["visibilité locale", "référencement local", "SEO local artisan", "recommandation ChatGPT entreprise locale", "fiche Google entreprise"],
});

export default function VisibiliteLocaleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
