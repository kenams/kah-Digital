import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Landing page vs site vitrine : lequel choisir ? � KAH Digital",
  description: "Landing page ou site vitrine : quelle diff�rence, quel P�rim�tre, pour quel objectif ? Guide pour choisir la bonne option selon votre situation.",
  keywords: ["landing page vs site vitrine", "diff�rence landing page site vitrine", "quand choisir landing page", "landing page ou site web"],
  alternates: { canonical: "https://kah-digital.ch/blog/landing-page-vs-site-vitrine" },
  openGraph: {
    title: "Landing page vs site vitrine : lequel choisir ?",
    description: "Les diff�rences r�elles, les cas d'usage, et comment d�cider en fonction de votre objectif.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Landing page vs site vitrine : lequel choisir ?",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/blog/landing-page-vs-site-vitrine",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Qu'est-ce qu'une landing page ?", "acceptedAnswer": { "@type": "Answer", "text": "Une landing page est une page unique con�ue pour un objectif pr�cis : capturer des leads, vendre un produit, promouvoir un �v�nement. Elle n'a pas de menu de navigation pour garder le visiteur concentr� sur l'action." } },
    { "@type": "Question", "name": "Quand choisir un site vitrine plut�t qu'une landing page ?", "acceptedAnswer": { "@type": "Answer", "text": "Choisissez un site vitrine quand vous avez plusieurs services, que vous voulez �tre trouv� sur Google sur plusieurs mots-cl�s, ou que vous avez besoin de pr�senter votre entreprise dans sa globalit�." } },
    { "@type": "Question", "name": "comment estimer une landing page vs un site vitrine ?", "acceptedAnswer": { "@type": "Answer", "text": "Une landing page s'estime apr�s cadrage et peut �tre livr�e en une semaine. Un site vitrine s'estime apr�s cadrage pour 5-8 pages, livr� en 2-3 semaines." } },
    { "@type": "Question", "name": "Peut-on avoir les deux ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, c'est m�me recommand�. Le site vitrine assure votre pr�sence g�n�rale et votre r�f�rencement, tandis que des landing pages sp�cifiques maximisent les conversions pour des campagnes pr�cises." } },
  ],
};

type CompareItem = { topic: string; landing: string; vitrine: string; landingOk?: boolean; vitrineOk?: boolean };

const COMPARE: CompareItem[] = [
  { topic: "Objectif", landing: "Une seule action (ex: remplir un formulaire, acheter)", vitrine: "Pr�senter l'entreprise dans sa globalit�", landingOk: false, vitrineOk: false },
  { topic: "Nombre de pages", landing: "1 page", vitrine: "5 � 15 pages", landingOk: false, vitrineOk: false },
  { topic: "SEO long-terme", landing: "Limit� (une seule page)", vitrine: "Fort � plusieurs pages, plusieurs mots-cl�s", landingOk: false, vitrineOk: true },
  { topic: "Conversion (pub payante)", landing: "Excellent � pas de distraction", vitrine: "Moyen � trop d'options tue le taux de clic", landingOk: true, vitrineOk: false },
  { topic: "D�lai de mise en ligne", landing: "3-7 jours", vitrine: "2-3 semaines", landingOk: true, vitrineOk: false },
  { topic: "P�rim�tre", landing: "selon le p�rim�tre", vitrine: "selon le p�rim�tre", landingOk: true, vitrineOk: false },
  { topic: "Cr�dibilit� / confiance", landing: "Faible si seul", vitrine: "Forte � \"� propos\", t�moignages, blog", landingOk: false, vitrineOk: true },
];

const LANDING_CASES = [
  "Vous lancez un produit ou service pr�cis et voulez tester l'int�r�t du march�",
  "Vous faites de la publicit� payante (Google Ads, Meta) et voulez maximiser les conversions",
  "Vous organisez un �v�nement, un webinaire, une formation",
  "Vous �tes freelance et voulez une pr�sence rapide avant de construire un vrai site",
];

const VITRINE_CASES = [
  "Vous avez plusieurs services � pr�senter",
  "Vous voulez �tre trouv� sur Google par des clients locaux ou en recherche organique",
  "Votre secteur requiert de la cr�dibilit� (artisan, consultant, cabinet, agence)",
  "Vous voulez une pr�sence durable et autonome sur le long terme",
];

export default function LandingPageVsSiteVitrinePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Strat�gie web</span>
            <span className="text-xs text-gray-600">4 mai 2026 � 5 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Landing page vs site vitrine : lequel choisir ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Ce ne sont pas les m�mes outils et ils ne servent pas les m�mes objectifs. Voici comment d�cider rapidement selon votre situation.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <p className="text-sm leading-relaxed text-emerald-200">
            <strong>TL;DR :</strong> Landing page = une action pr�cise, P�rim�tre serr�, d�ploiement rapide. Site vitrine = pr�sence compl�te, SEO durable, cr�dibilit�. Id�alement : les deux.
          </p>
        </div>

        <h2 className="mb-8 text-2xl font-bold text-white">Comparatif rapide</h2>
        <div className="mb-12 overflow-hidden rounded-2xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-500">Crit�re</th>
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

        <h2 className="mb-6 text-2xl font-bold text-white">Choisissez une landing page si�</h2>
        <div className="mb-10 space-y-3">
          {LANDING_CASES.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-blue-500/15 bg-blue-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Choisissez un site vitrine si�</h2>
        <div className="mb-10 space-y-3">
          {VITRINE_CASES.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">La meilleure strat�gie : les deux</h2>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Le site vitrine construit votre pr�sence et votre r�f�rencement naturel. Les landing pages maximisent vos conversions sur vos campagnes marketing. Ce ne sont pas des alternatives � ce sont des outils compl�mentaires. Commencez par le site vitrine pour asseoir votre cr�dibilit�, ajoutez des landing pages quand vous faites des campagnes.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-white">Questions fr�quentes</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Landing page ou site vitrine � on vous conseille gratuitement</h2>
          <p className="mb-6 text-gray-400">R�ponse sous 24h � Devis personnalis� � Devis personnalis�</p>
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


