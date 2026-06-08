import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "comment estimer un site web professionnel en 2026 ? — KAH Digital",
  description: "Méthode claire pour cadrer un site web professionnel : besoin réel, périmètre, fonctionnalités, délais, accompagnement et devis personnalisé.",
  keywords: ["devis site web", "devis site web professionnel", "comment estimer un site internet", "estimation création site web 2026"],
  alternates: { canonical: "https://KAH Digital.ch/blog/devis-site-web-professionnel" },
  openGraph: {
    title: "comment estimer un site web professionnel en 2026 ?",
    description: "Les critères qui permettent de recevoir un devis web clair et adapté.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "comment estimer un site web professionnel en 2026 ?",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://KAH Digital.ch" },
  "mainEntityOfPage": "https://KAH Digital.ch/blog/devis-site-web-professionnel",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "comment estimer une landing page ?", "acceptedAnswer": { "@type": "Answer", "text": "Une landing page simple s'estime après cadrage selon la complexité du design et les intégrations nécessaires." } },
    { "@type": "Question", "name": "Quel est le devis pour un site vitrine ?", "acceptedAnswer": { "@type": "Answer", "text": "Un site vitrine professionnel s'estime après cadrage, livré en 2 à 3 semaines." } },
    { "@type": "Question", "name": "comment estimer un site corporate ?", "acceptedAnswer": { "@type": "Answer", "text": "Un site corporate complet (5-15 pages, CMS, multilingue) s'estime après cadrage." } },
    { "@type": "Question", "name": "Quel Périmètre pour une application web ?", "acceptedAnswer": { "@type": "Answer", "text": "Une application web sur mesure s'estime après cadrage selon la complexité des fonctionnalités." } },
  ],
};

const TIERS = [
  { label: "Landing / Portfolio", price: "devis personnalisé", delay: "1–2 sem.", desc: "Une page claire et professionnelle. Idéal pour freelances, coachs, lancement de produit ou test d'idée.", included: ["Design sur mesure", "Responsive mobile", "Formulaire de contact", "SEO de base", "Déploiement inclus"] },
  { label: "Site vitrine", price: "devis personnalisé", delay: "2–3 sem.", desc: "Présence complète pour une PME ou un indépendant. Pages : accueil, services, à propos, contact.", included: ["5 à 8 pages", "SEO optimisé", "Google Maps", "Formulaire pro", "Analytics"] },
  { label: "Site corporate", price: "devis personnalisé", delay: "3–5 sem.", desc: "Site complet pour entreprise établie : multilingue, CMS, pages multiples, design premium.", included: ["10–20 pages", "CMS admin", "Multilingue", "Blog intégré", "Performance optimisée"] },
  { label: "Application web / IA", price: "devis personnalisé", delay: "4–10 sem.", desc: "Dashboard, SaaS, app métier, intégration IA. Développement full-stack sur mesure.", included: ["Auth utilisateurs", "Base de données", "API REST / webhooks", "Intégration IA", "Tests & déploiement"] },
];

export default function devisSiteWebPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">Devis</span>
            <span className="text-xs text-gray-600">24 avril 2026 · 6 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            comment estimer un site web professionnel en 2026 ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Chaque projet est différent. Le bon devis ne part pas d'un montant public, mais d'un périmètre clair : objectif, pages, fonctionnalités, niveau de finition, délai et accompagnement.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-sm leading-relaxed text-amber-200">
            <strong>TL;DR :</strong> Landing page, site vitrine, corporate ou application : le devis dépend du périmètre utile, des priorités business et du budget disponible, pas d'une formule rigide.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Pourquoi les devis varient autant ?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Sur internet, on trouve des promesses très différentes pour un résultat qui semble identique. En pratique, deux sites avec le même nombre de pages peuvent demander un effort très différent selon le contenu, les intégrations, le design, le SEO et les validations.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Un site Wix ou Squarespace peut suffire pour tester une idée. Mais dès que vous avez besoin d'un design différenciant, d'une performance correcte ou d'un CMS personnalisé, il faut passer à du développement sur mesure.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Les formats par type de projet</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {TIERS.map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
              <div className="mb-1 text-sm text-gray-500">{t.label}</div>
              <div className="mb-1 text-2xl font-black text-white">{t.price}</div>
              <div className="mb-3 text-xs text-gray-600">{t.delay}</div>
              <p className="mb-4 text-sm text-gray-400 leading-relaxed">{t.desc}</p>
              <div className="space-y-1.5">
                {t.included.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                    <FiCheck size={12} className="shrink-0 text-emerald-400" /> {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Ce qui élargit le périmètre</h2>
        <p className="mb-4 text-gray-400 leading-relaxed">
          Plusieurs éléments peuvent demander plus de cadrage, de conception ou de développement :
        </p>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            { title: "E-commerce", detail: "Catalogue produits, paiement, gestion des commandes et suivi client demandent un périmètre plus structuré." },
            { title: "Multilingue", detail: "Traduire et adapter le contenu (3 langues) représente 20 à 35% de travail supplémentaire." },
            { title: "Intégrations tierces", detail: "CRM, calendrier de réservation, ERP ou API personnalisées doivent être analysés avant estimation." },
            { title: "Animations et micro-interactions", detail: "Un design très animé peut doubler le temps de développement front-end." },
            { title: "SEO technique avancé", detail: "Audit, structure de données et Core Web Vitals demandent un travail sérieux dès l'architecture." },
          ].map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span><strong className="text-white">{item.title}</strong> — {item.detail}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Ce qui simplifie l'estimation</h2>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            "Avoir des textes prêts — la rédaction représente 15 à 25% du temps total.",
            "Fournir les photos et visuels — évite les frais de photothèque.",
            "Un brief clair dès le départ — réduit les aller-retours et le temps de cadrage.",
            "Périmètre simple — un site vitrine sobre se cadre plus vite qu'un site avec animations complexes.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
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

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Obtenez un devis pour votre projet</h2>
          <p className="mb-6 text-gray-400">Réponse sous 24h · Devis personnalisé · Sans engagement</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
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



