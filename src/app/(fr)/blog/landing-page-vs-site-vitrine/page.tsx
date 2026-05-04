import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Landing page vs site vitrine : lequel choisir ? — KAH-Digital",
  description: "Landing page ou site vitrine : quelle différence, quel budget, pour quel objectif ? Guide pour choisir la bonne option selon votre situation.",
  keywords: ["landing page vs site vitrine", "différence landing page site vitrine", "quand choisir landing page", "landing page ou site web"],
  alternates: { canonical: "https://kah-digital.ch/blog/landing-page-vs-site-vitrine" },
  openGraph: {
    title: "Landing page vs site vitrine : lequel choisir ?",
    description: "Les différences réelles, les cas d'usage, et comment décider en fonction de votre objectif.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Landing page vs site vitrine : lequel choisir ?",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Person", "name": "Kénan — KAH-Digital" },
  "publisher": { "@type": "Organization", "name": "KAH-Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/blog/landing-page-vs-site-vitrine",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Qu'est-ce qu'une landing page ?", "acceptedAnswer": { "@type": "Answer", "text": "Une landing page est une page unique conçue pour un objectif précis : capturer des leads, vendre un produit, promouvoir un événement. Elle n'a pas de menu de navigation pour garder le visiteur concentré sur l'action." } },
    { "@type": "Question", "name": "Quand choisir un site vitrine plutôt qu'une landing page ?", "acceptedAnswer": { "@type": "Answer", "text": "Choisissez un site vitrine quand vous avez plusieurs services, que vous voulez être trouvé sur Google sur plusieurs mots-clés, ou que vous avez besoin de présenter votre entreprise dans sa globalité." } },
    { "@type": "Question", "name": "Combien coûte une landing page vs un site vitrine ?", "acceptedAnswer": { "@type": "Answer", "text": "Une landing page coûte entre 300 et 600€ et peut être livrée en une semaine. Un site vitrine coûte entre 900 et 1 500€ pour 5-8 pages, livré en 2-3 semaines." } },
    { "@type": "Question", "name": "Peut-on avoir les deux ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, c'est même recommandé. Le site vitrine assure votre présence générale et votre référencement, tandis que des landing pages spécifiques maximisent les conversions pour des campagnes précises." } },
  ],
};

type CompareItem = { topic: string; landing: string; vitrine: string; landingOk?: boolean; vitrineOk?: boolean };

const COMPARE: CompareItem[] = [
  { topic: "Objectif", landing: "Une seule action (ex: remplir un formulaire, acheter)", vitrine: "Présenter l'entreprise dans sa globalité", landingOk: false, vitrineOk: false },
  { topic: "Nombre de pages", landing: "1 page", vitrine: "5 à 15 pages", landingOk: false, vitrineOk: false },
  { topic: "SEO long-terme", landing: "Limité (une seule page)", vitrine: "Fort — plusieurs pages, plusieurs mots-clés", landingOk: false, vitrineOk: true },
  { topic: "Conversion (pub payante)", landing: "Excellent — pas de distraction", vitrine: "Moyen — trop d'options tue le taux de clic", landingOk: true, vitrineOk: false },
  { topic: "Délai de mise en ligne", landing: "3-7 jours", vitrine: "2-3 semaines", landingOk: true, vitrineOk: false },
  { topic: "Budget", landing: "300 – 600€", vitrine: "900 – 1 500€", landingOk: true, vitrineOk: false },
  { topic: "Crédibilité / confiance", landing: "Faible si seul", vitrine: "Forte — \"À propos\", témoignages, blog", landingOk: false, vitrineOk: true },
];

const LANDING_CASES = [
  "Vous lancez un produit ou service précis et voulez tester l'intérêt du marché",
  "Vous faites de la publicité payante (Google Ads, Meta) et voulez maximiser les conversions",
  "Vous organisez un événement, un webinaire, une formation",
  "Vous êtes freelance et voulez une présence rapide avant de construire un vrai site",
];

const VITRINE_CASES = [
  "Vous avez plusieurs services à présenter",
  "Vous voulez être trouvé sur Google par des clients locaux ou en recherche organique",
  "Votre secteur requiert de la crédibilité (artisan, consultant, cabinet, agence)",
  "Vous voulez une présence durable et autonome sur le long terme",
];

export default function LandingPageVsSiteVitrinePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">← Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Stratégie web</span>
            <span className="text-xs text-gray-600">4 mai 2026 · 5 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Landing page vs site vitrine : lequel choisir ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Ce ne sont pas les mêmes outils et ils ne servent pas les mêmes objectifs. Voici comment décider rapidement selon votre situation.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <p className="text-sm leading-relaxed text-emerald-200">
            <strong>TL;DR :</strong> Landing page = une action précise, budget serré, déploiement rapide. Site vitrine = présence complète, SEO durable, crédibilité. Idéalement : les deux.
          </p>
        </div>

        <h2 className="mb-8 text-2xl font-bold text-white">Comparatif rapide</h2>
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">Critère</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-blue-400">Landing page</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-emerald-400">Site vitrine</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row, i) => (
                <tr key={row.topic} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-transparent" : "bg-white/2"}`}>
                  <td className="px-4 py-3 font-medium text-gray-300">{row.topic}</td>
                  <td className="px-4 py-3 text-gray-400">{row.landing}</td>
                  <td className="px-4 py-3 text-gray-400">{row.vitrine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Choisissez une landing page si…</h2>
        <div className="mb-10 space-y-3">
          {LANDING_CASES.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-blue-500/15 bg-blue-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Choisissez un site vitrine si…</h2>
        <div className="mb-10 space-y-3">
          {VITRINE_CASES.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">La meilleure stratégie : les deux</h2>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Le site vitrine construit votre présence et votre référencement naturel. Les landing pages maximisent vos conversions sur vos campagnes marketing. Ce ne sont pas des alternatives — ce sont des outils complémentaires. Commencez par le site vitrine pour asseoir votre crédibilité, ajoutez des landing pages quand vous faites des campagnes.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-white">Questions fréquentes</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Landing page ou site vitrine — on vous conseille gratuitement</h2>
          <p className="mb-6 text-gray-400">Réponse sous 24h · Devis gratuit · Dès € 300</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-emerald-500/30">
              Demander un devis <FiArrowRight size={15} />
            </Link>
            <Link href="/audit-gratuit" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Audit gratuit de mon site
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
