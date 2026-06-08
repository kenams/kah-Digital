import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Site web pour restaurant : ce qu'il faut vraiment en 2026 — KAH Digital",
  description: "Menu en ligne, réservation, Google Maps, avis — ce dont un restaurant a besoin sur son site web. Devis et guide pratique.",
  keywords: ["site web restaurant", "site internet restaurant", "création site restaurant", "site web bar", "site web pizzeria", "réservation en ligne restaurant"],
  alternates: { canonical: "https://KAH Digital.ch/blog/site-web-restaurant" },
  openGraph: {
    title: "Site web pour restaurant : ce qu'il faut vraiment en 2026",
    description: "Ce dont votre restaurant a besoin sur le web pour attirer plus de clients.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Site web pour restaurant : ce qu'il faut vraiment en 2026",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://KAH Digital.ch" },
  "mainEntityOfPage": "https://KAH Digital.ch/blog/site-web-restaurant",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "comment estimer un site web pour un restaurant ?", "acceptedAnswer": { "@type": "Answer", "text": "Un site restaurant complet (menu, réservation, photos, Google Maps) s'estime après cadrage selon les fonctionnalités." } },
    { "@type": "Question", "name": "Vaut-il mieux un site ou une fiche Google My Business ?", "acceptedAnswer": { "@type": "Answer", "text": "Les deux sont complémentaires. La fiche Google capte les recherches locales immédiates, le site convertit les visiteurs et vous appartient vraiment." } },
    { "@type": "Question", "name": "Faut-il intégrer la réservation en ligne ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui si votre restaurant prend des réservations. Un système simple (TheFork, Formitable, ou un formulaire) peut doubler vos réservations en ligne." } },
    { "@type": "Question", "name": "Mon site doit-il être mobile-first ?", "acceptedAnswer": { "@type": "Answer", "text": "Absolument. Plus de 70% des recherches restaurant se font sur mobile, souvent au moment où la personne cherche où manger maintenant." } },
  ],
};

const MUST_HAVES = [
  { emoji: "???", title: "Menu à jour", detail: "Le menu est la raison n°1 des visites. Il doit être lisible, à jour et ne pas être un PDF non zoomable sur mobile." },
  { emoji: "??", title: "Adresse + Google Maps intégré", detail: "L'utilisateur doit pouvoir cliquer directement pour obtenir l'itinéraire. Indispensable sur mobile." },
  { emoji: "??", title: "Réservation en ligne", detail: "Formulaire simple, lien TheFork ou Formitable. Réduisez la friction — chaque clic perdu est une table vide." },
  { emoji: "??", title: "Photos de qualité", detail: "Les photos de plats séduisent avant même que le client arrive. Pas besoin d'un photographe pro — un bon téléphone en lumière naturelle suffit." },
  { emoji: "?", title: "Avis Google visibles", detail: "Intégrez un widget ou un lien direct vers vos avis. 90% des gens lisent les avis avant de choisir un restaurant." },
  { emoji: "??", title: "Téléphone cliquable", detail: "Votre numéro doit être cliquable sur mobile. Une évidence que trop de sites ratent encore." },
];

export default function SiteWebRestaurantPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">Restaurants</span>
            <span className="text-xs text-gray-600">4 mai 2026 · 5 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Site web pour restaurant : ce qu'il faut vraiment en 2026
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Menu introuvable, site non mobile, pas de réservation en ligne — voici les erreurs qui font fuir les clients avant même qu'ils entrent dans votre restaurant.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <p className="text-sm leading-relaxed text-red-200">
            <strong>TL;DR :</strong> Menu lisible sur mobile + photos attractives + réservation en ligne + avis Google visibles. Ces 4 éléments font la différence entre un site qui ramène des clients et un site vitrine inutile.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Le comportement réel d'un client en 2026</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Voici comment ça se passe dans 80% des cas : la personne cherche "restaurant italien Lyon" sur Google à 12h30. Elle regarde 2-3 résultats, clique sur le premier qui a de belles photos, essaie de voir le menu — et si le menu est un PDF non lisible sur mobile ou introuvable, elle revient en arrière et choisit le concurrent.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          Vous n'avez pas 10 secondes. Vous avez 3. Votre site doit répondre immédiatement à "est-ce que ça me correspond et comment je réserve ?".
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Les 6 éléments indispensables</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {MUST_HAVES.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="mb-2 text-2xl">{item.emoji}</p>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Site web vs. fiche Google My Business — les deux</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Beaucoup de restaurateurs pensent que leur fiche Google suffit. C'est faux. La fiche Google capte l'intention immédiate ("restaurant proche"), mais votre site est votre outil de conversion : menu complet, ambiance, histoire, réservation directe sans commission.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          TheFork prend une commission sur chaque couvert. Un formulaire de réservation sur votre propre site vous s'estime zéro commission.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-white">Combien ça s'estime ?</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Site vitrine simple (4-5 pages)", price: "selon le périmètre", delay: "1–2 semaines" },
            { label: "Avec réservation en ligne", price: "selon le périmètre", delay: "2–3 semaines" },
            { label: "Avec commande en ligne", price: "selon le périmètre", delay: "3–4 semaines" },
            { label: "Maintenance + mises à jour menu", price: "selon le périmètre", delay: "Support inclus" },
          ].map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-5">
              <p className="text-sm text-gray-500">{t.label}</p>
              <p className="mt-1 text-xl font-black text-white">{t.price}</p>
              <p className="text-xs text-gray-600">{t.delay}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Questions fréquentes</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-orange-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Un site qui fait venir des clients dans votre restaurant</h2>
          <p className="mb-6 text-gray-400">Réponse sous 24h · Devis personnalisé · Devis personnalisé</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-red-500/30">
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



