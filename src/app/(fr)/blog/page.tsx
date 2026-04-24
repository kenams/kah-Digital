import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Blog KAH-Digital — Conseils sites web, SEO et digital pour PME",
  description: "Guides pratiques sur la création de site web, les tarifs, la refonte et le SEO pour PME et indépendants. Par KAH-Digital, studio digital basé en Suisse.",
  alternates: { canonical: "https://kah-digital.ch/blog" },
};

const ARTICLES = [
  {
    slug: "prix-site-web-professionnel",
    title: "Combien coûte un site web professionnel en 2026 ?",
    excerpt: "Landing page, site vitrine, corporate, application — les fourchettes réelles par type de projet, sans bullshit.",
    readTime: "6 min",
    date: "24 avril 2026",
    tag: "Tarifs",
  },
  {
    slug: "refonte-site-web",
    title: "Refonte de site web : quand faut-il se lancer et comment s'y prendre ?",
    excerpt: "Les 7 signaux qui montrent qu'il est temps de refondre votre site, et la méthode pour le faire sans gaspiller du budget.",
    readTime: "5 min",
    date: "24 avril 2026",
    tag: "Stratégie",
  },
  {
    slug: "creation-site-web-pme",
    title: "Création de site web pour PME : guide complet 2026",
    excerpt: "Tout ce qu'une PME doit savoir avant de commander un site web — du brief au lancement, sans se faire avoir.",
    readTime: "7 min",
    date: "24 avril 2026",
    tag: "Guide",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Blog KAH-Digital</h1>
          <p className="text-lg text-gray-400">Conseils pratiques sur les sites web, le SEO et le digital pour PME et indépendants.</p>
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
                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">{a.tag}</span>
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
