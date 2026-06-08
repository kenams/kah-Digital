import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Blog KAH Digital � Conseils sites web, SEO et digital pour PME",
  description: "Guides pratiques sur la cr�ation de site web, Les formats, la refonte et le SEO pour PME et ind�pendants. Par KAH Digital, studio digital bas� en Suisse.",
  alternates: { canonical: "https://kah-digital.ch/blog" },
};

const ARTICLES = [
  {
    slug: "devis-site-web-professionnel",
    title: "comment estimer un site web professionnel en 2026 ?",
    excerpt: "Landing page, site vitrine, corporate, application � comment cadrer un devis personnalis� selon le p�rim�tre r�el.",
    readTime: "6 min",
    date: "24 avril 2026",
    tag: "Devis",
  },
  {
    slug: "refonte-site-web",
    title: "Refonte de site web : quand faut-il se lancer et comment s'y prendre ?",
    excerpt: "Les 7 signaux qui montrent qu'il est temps de refondre votre site, et la m�thode pour le faire sans gaspiller du P�rim�tre.",
    readTime: "5 min",
    date: "24 avril 2026",
    tag: "Strat�gie",
  },
  {
    slug: "creation-site-web-pme",
    title: "Cr�ation de site web pour PME : guide complet 2026",
    excerpt: "Tout ce qu'une PME doit savoir avant de commander un site web � du brief au lancement, sans se faire avoir.",
    readTime: "7 min",
    date: "24 avril 2026",
    tag: "Guide",
  },
  {
    slug: "site-web-artisan",
    title: "Site web pour artisan : guide complet 2026",
    excerpt: "Plombier, �lectricien, menuisier � un site simple et bien fait peut vous ramener des clients toutes les semaines. devis, contenu essentiel, erreurs � �viter.",
    readTime: "5 min",
    date: "4 mai 2026",
    tag: "Artisans",
  },
  {
    slug: "site-web-restaurant",
    title: "Site web pour restaurant : ce qu'il faut vraiment en 2026",
    excerpt: "Menu introuvable, site non mobile, pas de r�servation � voici les erreurs qui font fuir les clients avant m�me qu'ils arrivent.",
    readTime: "5 min",
    date: "4 mai 2026",
    tag: "Restaurants",
  },
  {
    slug: "agence-web-pme-comment-choisir",
    title: "Comment choisir une agence web pour votre PME",
    excerpt: "Les bons signes, les red flags � fuir, et les questions � poser avant de signer. Guide sans filtre.",
    readTime: "6 min",
    date: "4 mai 2026",
    tag: "PME",
  },
  {
    slug: "application-mobile-cout",
    title: "comment estimer une application mobile en 2026 ?",
    excerpt: "PWA, MVP React Native, application compl�te, native � les crit�res de devis et comment garder le contr�le de votre P�rim�tre.",
    readTime: "7 min",
    date: "4 mai 2026",
    tag: "Mobile",
  },
  {
    slug: "landing-page-vs-site-vitrine",
    title: "Landing page vs site vitrine : lequel choisir ?",
    excerpt: "Ce ne sont pas les m�mes outils. Voici comment d�cider en 2 minutes selon votre objectif, votre P�rim�tre et votre situation.",
    readTime: "5 min",
    date: "4 mai 2026",
    tag: "Strat�gie",
  },
  {
    slug: "seo-local-pme",
    title: "SEO local pour PME : appara�tre en 1�re page Google en 2026",
    excerpt: "Google Business Profile, pages locales, schema LocalBusiness, avis clients � les actions concr�tes pour que vos clients vous trouvent.",
    readTime: "6 min",
    date: "4 mai 2026",
    tag: "SEO",
  },
  {
    slug: "automatisation-ia-pme",
    title: "Automatisation IA pour PME : 5 cas concrets qui font gagner du temps en 2026",
    excerpt: "Qualification de leads, reporting auto, relances commerciales, support IA � 5 usages r�els avec r�sultats mesurables et co�ts.",
    readTime: "8 min",
    date: "19 mai 2026",
    tag: "IA",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Devis": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Strat�gie": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  "Guide": "border-violet-500/30 bg-violet-500/10 text-violet-400",
  "Artisans": "border-orange-500/30 bg-orange-500/10 text-orange-400",
  "Restaurants": "border-red-500/30 bg-red-500/10 text-red-400",
  "PME": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Mobile": "border-violet-500/30 bg-violet-500/10 text-violet-400",
  "SEO": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  "IA": "border-blue-500/30 bg-blue-500/10 text-blue-400",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Blog KAH Digital</h1>
          <p className="text-lg text-gray-400">Conseils pratiques sur les sites web, le SEO et le digital pour PME et ind�pendants.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="grid gap-6">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-gray-900 p-6 transition hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[a.tag] ?? "border-blue-500/30 bg-blue-500/10 text-blue-400"}`}>{a.tag}</span>
                <span className="flex items-center gap-1 text-xs text-gray-600"><FiClock size={11} /> {a.readTime}</span>
                <span className="ml-auto text-xs text-gray-600">{a.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition">{a.title}</h2>
              <p className="text-sm leading-relaxed text-gray-400">{a.excerpt}</p>
              <span className="flex items-center gap-1 text-sm font-semibold text-blue-400">Lire l'article <FiArrowRight size={13} /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


