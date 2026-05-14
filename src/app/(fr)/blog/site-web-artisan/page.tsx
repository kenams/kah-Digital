import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Site web pour artisan : guide complet 2026 — KAH-Digital",
  description: "Comment créer un site web efficace pour un artisan ? devis, délais, ce qu'il faut absolument avoir. Guide pratique pour plombiers, électriciens, menuisiers, maçons.",
  keywords: ["site web artisan", "création site artisan", "site internet artisan", "site web plombier", "site web electricien", "site web menuisier"],
  alternates: { canonical: "https://kah-digital.ch/blog/site-web-artisan" },
  openGraph: {
    title: "Site web pour artisan : guide complet 2026",
    description: "devis, délais, contenu essentiel. Tout ce qu'un artisan doit savoir avant de créer son site.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Site web pour artisan : guide complet 2026",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Person", "name": "Kénan — KAH-Digital" },
  "publisher": { "@type": "Organization", "name": "KAH-Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/blog/site-web-artisan",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "comment estimer un site web pour un artisan ?", "acceptedAnswer": { "@type": "Answer", "text": "Un site vitrine professionnel pour artisan s'estime après cadrage selon les pages, les photos et les fonctionnalités (formulaire, Google Maps, avis)." } },
    { "@type": "Question", "name": "Un artisan a-t-il vraiment besoin d'un site web ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui. 80% des clients cherchent sur Google avant de choisir un artisan. Sans site, vous n'existez pas pour eux. Un site simple et bien référencé peut générer plusieurs contacts qualifiés par semaine." } },
    { "@type": "Question", "name": "Quel contenu mettre sur un site artisan ?", "acceptedAnswer": { "@type": "Answer", "text": "L'essentiel : vos services et zone d'intervention, des photos de vos réalisations, vos coordonnées visibles, un formulaire ou bouton WhatsApp, et si possible des avis clients." } },
    { "@type": "Question", "name": "En combien de temps un site artisan peut-il être en ligne ?", "acceptedAnswer": { "@type": "Answer", "text": "Avec un brief clair et vos photos prêtes, un site vitrine artisan peut être en ligne en 1 à 2 semaines." } },
  ],
};

const CHECKLIST = [
  { title: "Page d'accueil claire", detail: "Votre métier, votre zone, vos coordonnées — en 5 secondes le visiteur comprend ce que vous faites." },
  { title: "Liste de vos services", detail: "Détaillez chaque prestation. C'est ce que Google lit pour vous positionner sur les bonnes requêtes." },
  { title: "Photos de vos réalisations", detail: "Avant/après, chantiers terminés — les clients achètent avec les yeux. Même des photos de téléphone bien cadrées suffisent." },
  { title: "Zone d'intervention", detail: "Mentionnez explicitement les villes et départements que vous couvrez. Essentiel pour le SEO local." },
  { title: "Formulaire de contact ou WhatsApp", detail: "Réduisez la friction. Un bouton 'Appeler maintenant' ou un formulaire court suffit." },
  { title: "Avis clients (Google)", detail: "Intégrez vos avis Google ou demandez à vos clients de laisser un avis. Ça multiplie la confiance." },
];

export default function SiteWebArtisanPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">← Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">Artisans</span>
            <span className="text-xs text-gray-600">4 mai 2026 · 5 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Site web pour artisan : guide complet 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Plombier, électricien, menuisier, maçon — un site web simple et bien fait peut vous ramener des clients toutes les semaines sans payer de pub. Voici exactement quoi faire et combien ça s'estime.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">
          <p className="text-sm leading-relaxed text-orange-200">
            <strong>TL;DR :</strong> Site vitrine artisan selon le périmètre · En ligne en 1–2 semaines · Essentiel : photos de réalisations + zone d'intervention + formulaire contact.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Pourquoi un site web est indispensable pour un artisan</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Le bouche-à-oreille, c'est bien. Mais ça ne suffit plus. Quand quelqu'un cherche "plombier Lyon" ou "électricien urgence Bordeaux" sur Google, il choisit parmi les 3 premiers résultats. Si vous n'y êtes pas, ce client va chez votre concurrent.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Un site web professionnel, c'est votre devanture ouverte 24h/24. Même quand vous êtes sur un chantier, des clients potentiels visitent votre site, regardent vos réalisations et vous contactent.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Ce que doit contenir votre site (checklist)</h2>
        <div className="mb-12 space-y-4">
          {CHECKLIST.map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl border border-white/8 bg-gray-900/50 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-gray-400">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Combien ça s'estime ?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Un site vitrine artisan professionnel s'estime après cadrage du besoin, des pages, des photos et des fonctionnalités utiles. Avec une proposition trop basse, méfiez-vous : le résultat risque d'être un template générique qui ne vous représente pas et qui ne se référence pas bien.
        </p>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Site basique (3-4 pages)", price: "selon le périmètre", delay: "1 semaine" },
            { label: "Site complet (6-8 pages)", price: "selon le périmètre", delay: "2 semaines" },
            { label: "Avec galerie réalisations", price: "selon le périmètre", delay: "+2-3 jours" },
            { label: "Maintenance annuelle", price: "selon le périmètre", delay: "Support inclus" },
          ].map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="text-sm text-gray-500">{t.label}</p>
              <p className="mt-1 text-xl font-black text-white">{t.price}</p>
              <p className="text-xs text-gray-600">{t.delay}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Les erreurs à éviter</h2>
        <ul className="mb-10 space-y-3 text-sm text-gray-400 leading-relaxed">
          {[
            "Faire son site soi-même sur Wix sans SEO — vous serez invisible sur Google.",
            "Ne pas mettre de photos de vos réalisations — c'est votre meilleur argument de vente.",
            "Oublier d'indiquer votre zone d'intervention — un client à 50km ne vous appellera pas si vous ne le précisez pas.",
            "Avoir un numéro de téléphone non cliquable sur mobile — perte directe de contacts.",
            "Ne pas demander d'avis Google à vos clients satisfaits — c'est gratuit et très efficace.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Questions fréquentes</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-amber-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Un site web professionnel pour votre activité</h2>
          <p className="mb-6 text-gray-400">Réponse sous 24h · Devis personnalisé · Devis personnalisé</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-orange-500/30">
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



