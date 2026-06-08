import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "comment estimer un site web professionnel en 2026 ? � KAH Digital",
  description: "M�thode claire pour cadrer un site web professionnel : besoin r�el, p�rim�tre, fonctionnalit�s, d�lais, accompagnement et devis personnalis�.",
  keywords: ["devis site web", "devis site web professionnel", "comment estimer un site internet", "estimation cr�ation site web 2026"],
  alternates: { canonical: "https://kah-digital.ch/blog/devis-site-web-professionnel" },
  openGraph: {
    title: "comment estimer un site web professionnel en 2026 ?",
    description: "Les crit�res qui permettent de recevoir un devis web clair et adapt�.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "comment estimer un site web professionnel en 2026 ?",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/blog/devis-site-web-professionnel",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "comment estimer une landing page ?", "acceptedAnswer": { "@type": "Answer", "text": "Une landing page simple s'estime apr�s cadrage selon la complexit� du design et les int�grations n�cessaires." } },
    { "@type": "Question", "name": "Quel est le devis pour un site vitrine ?", "acceptedAnswer": { "@type": "Answer", "text": "Un site vitrine professionnel s'estime apr�s cadrage, livr� en 2 � 3 semaines." } },
    { "@type": "Question", "name": "comment estimer un site corporate ?", "acceptedAnswer": { "@type": "Answer", "text": "Un site corporate complet (5-15 pages, CMS, multilingue) s'estime apr�s cadrage." } },
    { "@type": "Question", "name": "Quel P�rim�tre pour une application web ?", "acceptedAnswer": { "@type": "Answer", "text": "Une application web sur mesure s'estime apr�s cadrage selon la complexit� des fonctionnalit�s." } },
  ],
};

const TIERS = [
  { label: "Landing / Portfolio", price: "devis personnalis�", delay: "1�2 sem.", desc: "Une page claire et professionnelle. Id�al pour freelances, coachs, lancement de produit ou test d'id�e.", included: ["Design sur mesure", "Responsive mobile", "Formulaire de contact", "SEO de base", "D�ploiement inclus"] },
  { label: "Site vitrine", price: "devis personnalis�", delay: "2�3 sem.", desc: "Pr�sence compl�te pour une PME ou un ind�pendant. Pages : accueil, services, � propos, contact.", included: ["5 � 8 pages", "SEO optimis�", "Google Maps", "Formulaire pro", "Analytics"] },
  { label: "Site corporate", price: "devis personnalis�", delay: "3�5 sem.", desc: "Site complet pour entreprise �tablie : multilingue, CMS, pages multiples, design premium.", included: ["10�20 pages", "CMS admin", "Multilingue", "Blog int�gr�", "Performance optimis�e"] },
  { label: "Application web / IA", price: "devis personnalis�", delay: "4�10 sem.", desc: "Dashboard, SaaS, app m�tier, int�gration IA. D�veloppement full-stack sur mesure.", included: ["Auth utilisateurs", "Base de donn�es", "API REST / webhooks", "Int�gration IA", "Tests & d�ploiement"] },
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
            <span className="text-xs text-gray-600">24 avril 2026 � 6 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            comment estimer un site web professionnel en 2026 ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Chaque projet est diff�rent. Le bon devis ne part pas d'un montant public, mais d'un p�rim�tre clair : objectif, pages, fonctionnalit�s, niveau de finition, d�lai et accompagnement.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* Intro */}
        <div className="mb-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-sm leading-relaxed text-amber-200">
            <strong>TL;DR :</strong> Landing page, site vitrine, corporate ou application : le devis d�pend du p�rim�tre utile, des priorit�s business et du budget disponible, pas d'une formule rigide.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Pourquoi les devis varient autant ?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Sur internet, on trouve des promesses tr�s diff�rentes pour un r�sultat qui semble identique. En pratique, deux sites avec le m�me nombre de pages peuvent demander un effort tr�s diff�rent selon le contenu, les int�grations, le design, le SEO et les validations.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Un site Wix ou Squarespace peut suffire pour tester une id�e. Mais d�s que vous avez besoin d'un design diff�renciant, d'une performance correcte ou d'un CMS personnalis�, il faut passer � du d�veloppement sur mesure.
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

        <h2 className="mb-6 text-2xl font-bold text-white">Ce qui �largit le p�rim�tre</h2>
        <p className="mb-4 text-gray-400 leading-relaxed">
          Plusieurs �l�ments peuvent demander plus de cadrage, de conception ou de d�veloppement :
        </p>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            { title: "E-commerce", detail: "Catalogue produits, paiement, gestion des commandes et suivi client demandent un p�rim�tre plus structur�." },
            { title: "Multilingue", detail: "Traduire et adapter le contenu (3 langues) repr�sente 20 � 35% de travail suppl�mentaire." },
            { title: "Int�grations tierces", detail: "CRM, calendrier de r�servation, ERP ou API personnalis�es doivent �tre analys�s avant estimation." },
            { title: "Animations et micro-interactions", detail: "Un design tr�s anim� peut doubler le temps de d�veloppement front-end." },
            { title: "SEO technique avanc�", detail: "Audit, structure de donn�es et Core Web Vitals demandent un travail s�rieux d�s l'architecture." },
          ].map((item) => (
            <li key={item.title} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              <span><strong className="text-white">{item.title}</strong> � {item.detail}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Ce qui simplifie l'estimation</h2>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            "Avoir des textes pr�ts � la r�daction repr�sente 15 � 25% du temps total.",
            "Fournir les photos et visuels � �vite les frais de phototh�que.",
            "Un brief clair d�s le d�part � r�duit les aller-retours et le temps de cadrage.",
            "P�rim�tre simple � un site vitrine sobre se cadre plus vite qu'un site avec animations complexes.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Questions fr�quentes</h2>
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
          <p className="mb-6 text-gray-400">R�ponse sous 24h � Devis personnalis� � Sans engagement</p>
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



