import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Création de site web pour PME : guide complet 2026 — KAH Digital",
  description: "Tout ce qu'une PME doit savoir avant de commander un site web : du brief au lancement, les erreurs à éviter et comment choisir son prestataire.",
  keywords: ["créer site web PME", "site web entreprise", "création site professionnel PME", "agence web PME", "site internet entreprise 2026"],
  alternates: { canonical: "https://KAH Digital.ch/blog/creation-site-web-pme" },
  openGraph: {
    title: "Création de site web pour PME : guide complet 2026",
    description: "Du brief au lancement, tout ce qu'une PME doit savoir avant de commander un site web.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Création de site web pour PME : guide complet 2026",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://KAH Digital.ch" },
};

export default function CreationSiteWebPMEPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-pme" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Guide</span>
            <span className="text-xs text-gray-600">24 avril 2026 · 7 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Création de site web pour PME : guide complet 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Commander un site web pour sa PME sans se faire avoir — voici le guide honnête, du brief au lancement.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        <h2 className="mb-6 text-2xl font-bold text-white">Étape 1 — Définir ce dont vous avez réellement besoin</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          La plupart des PME commandent un site trop grand. Commencez par répondre à ces 3 questions :
        </p>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            "Quel est l'objectif principal ? (Générer des contacts, vendre en ligne, présenter votre activité, recruter...)",
            "Qui sont vos visiteurs cibles ? (Professionnels B2B, particuliers, locaux, internationaux...)",
            "Qu'est-ce qu'un visiteur devrait faire sur votre site ? (Vous appeler, remplir un formulaire, acheter, prendre RDV...)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-blue-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Étape 2 — Choisir le bon type de site</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { type: "Landing page", ideal: "Tester une offre, lancer un produit, freelances", price: "devis personnalisé" },
            { type: "Site vitrine", ideal: "PME locale, professions libérales, artisans", price: "devis personnalisé" },
            { type: "Site corporate", ideal: "Entreprises établies, multilingue, CMS", price: "devis personnalisé" },
            { type: "E-commerce", ideal: "Vente en ligne, boutique, abonnements", price: "devis personnalisé" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900 p-5">
              <div className="mb-1 font-bold text-white text-sm">{item.type}</div>
              <div className="text-xs text-gray-500 mb-2">{item.ideal}</div>
              <div className="text-lg font-black text-blue-400">{item.price}</div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Étape 3 — Rédiger un brief efficace</h2>
        <p className="mb-4 text-gray-400 leading-relaxed">
          Un bon brief vous fait gagner 30% de Périmètre. Il contient au minimum :
        </p>
        <div className="mb-10 rounded-2xl border border-white/8 bg-gray-900 p-6">
          <div className="grid gap-2 sm:grid-cols-2 text-sm">
            {[
              "Nom et activité de l'entreprise",
              "Objectif principal du site",
              "Personas cibles (qui visite ?)",
              "Nombre de pages estimé",
              "Fonctionnalités spécifiques",
              "Identité visuelle existante",
              "Sites de référence (style souhaité)",
              "Périmètre maximum",
              "Date de mise en ligne souhaitée",
              "Qui gère le contenu ensuite ?",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-gray-400">
                <FiCheck size={12} className="shrink-0 text-emerald-400" /> {item}
              </div>
            ))}
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Étape 4 — Choisir son prestataire</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Il existe 4 types de prestataires web. Voici leurs réalités :
        </p>
        <div className="mb-10 space-y-4">
          {[
            { type: "Freelance junior (Malt, Fiverr)", pro: "Souplesse et démarrage rapide", con: "Risque élevé sur la qualité et les délais, support inexistant après livraison" },
            { type: "Grande agence web", pro: "Process structuré, équipe complète", con: "Propositions parfois surdimensionnées, interlocuteur changeant" },
            { type: "Studio digital indépendant", pro: "Équilibre qualité/cadrage, interlocuteur direct, réactif", con: "Capacité limitée en parallèle (attention aux délais)" },
            { type: "Constructeur DIY (Wix, Squarespace)", pro: "Très rapide à lancer", con: "Design générique, performance médiocre, peu évolutif, SEO limité" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <div className="mb-3 font-semibold text-white">{item.type}</div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div className="flex items-start gap-2 text-gray-400"><FiCheck size={13} className="mt-0.5 shrink-0 text-emerald-400" />{item.pro}</div>
                <div className="flex items-start gap-2 text-gray-400"><FiX size={13} className="mt-0.5 shrink-0 text-red-400" />{item.con}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Les 5 erreurs les plus fréquentes</h2>
        <ul className="mb-12 space-y-4 text-sm text-gray-400 leading-relaxed">
          {[
            { err: "Partir sans brief clair", detail: "Sans brief, le prestataire crée selon ses propres suppositions. Les allers-retours s'accumulent et le périmètre devient flou." },
            { err: "Confier le SEO à plus tard", detail: "Le SEO se construit dès l'architecture du site. L'ajouter après coup impose souvent une refonte partielle." },
            { err: "Choisir sans vérifier le périmètre", detail: "Une proposition trop vague peut cacher un template basique avec votre logo dessus. Vérifiez toujours ce qui est réellement livré." },
            { err: "Ignorer le mobile", detail: "Plus de 60% des visites viennent du mobile. Un site non adapté perd plus de la moitié de son audience." },
            { err: "Ne pas prévoir la maintenance", detail: "Un site web nécessite des mises à jour régulières : sécurité, compatibilité, contenu et suivi des performances." },
          ].map((item) => (
            <li key={item.err} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              <span><strong className="text-white">{item.err}</strong> — {item.detail}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Prêt à lancer votre site web ?</h2>
          <p className="mb-6 text-gray-400">KAH Digital accompagne les PME de la Suisse et de la France. Devis personnalisé sous 24h.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition">
              Demander un devis <FiArrowRight size={15} />
            </Link>
            <Link href="/offres" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Voir nos offres
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}



