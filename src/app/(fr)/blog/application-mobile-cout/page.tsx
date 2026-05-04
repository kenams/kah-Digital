import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Combien coûte une application mobile en 2026 ? — KAH-Digital",
  description: "Tarifs réels pour une app mobile en 2026 : application vitrine, MVP, application native ou React Native. Guide complet avec fourchettes de prix.",
  keywords: ["coût application mobile", "prix application mobile", "combien coûte une app", "développement application mobile tarif", "MVP application mobile"],
  alternates: { canonical: "https://kah-digital.ch/blog/application-mobile-cout" },
  openGraph: {
    title: "Combien coûte une application mobile en 2026 ?",
    description: "Les vrais prix par type d'application, les facteurs qui font monter le budget, et comment garder le contrôle.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Combien coûte une application mobile en 2026 ?",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Person", "name": "Kénan — KAH-Digital" },
  "publisher": { "@type": "Organization", "name": "KAH-Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/blog/application-mobile-cout",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Combien coûte une application mobile simple ?", "acceptedAnswer": { "@type": "Answer", "text": "Une application mobile simple (MVP, 3-5 écrans, authentification, une fonctionnalité principale) coûte entre 3 000 et 8 000€ avec React Native, qui permet de cibler iOS et Android avec une seule base de code." } },
    { "@type": "Question", "name": "Quelle est la différence entre natif et cross-platform ?", "acceptedAnswer": { "@type": "Answer", "text": "Une application native (Swift pour iOS, Kotlin pour Android) coûte plus cher car il faut deux bases de code séparées. React Native ou Flutter permettent de viser les deux plateformes en une seule fois, réduisant le coût de 30 à 50%." } },
    { "@type": "Question", "name": "Faut-il payer un abonnement App Store ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui. Apple Developer Program : 99$/an. Google Play : 25$ une fois. Ces frais sont à votre charge en tant qu'éditeur de l'application." } },
    { "@type": "Question", "name": "Peut-on faire une application mobile pour moins de 3 000€ ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, dans certains cas : avec des outils no-code comme Adalo ou Bubble pour des flux simples, ou une Progressive Web App (PWA) qui fonctionne comme une app sans passer par les stores." } },
  ],
};

const TIERS = [
  { label: "PWA / Web App mobile", price: "1 500 – 3 500€", delay: "2–3 sem.", desc: "Une application web qui s'installe comme une app. Pas dans les stores, mais fonctionne hors-ligne et s'utilise comme une app native.", tech: "Next.js · React · Service Workers" },
  { label: "MVP React Native", price: "3 000 – 8 000€", delay: "4–6 sem.", desc: "Application iOS + Android avec une base de code commune. Idéal pour valider une idée avec un budget maîtrisé.", tech: "React Native · Expo · Supabase" },
  { label: "Application complète", price: "8 000 – 20 000€", delay: "8–14 sem.", desc: "Produit complet avec auth, paiement, dashboard admin, notifications push, API sur mesure.", tech: "React Native · Node.js · PostgreSQL" },
  { label: "Application native iOS/Android", price: "15 000 – 50 000€", delay: "12–24 sem.", desc: "Deux bases de code séparées, performances maximales, accès complet aux APIs système. Pour des produits établis.", tech: "Swift + Kotlin ou SwiftUI + Compose" },
];

const COST_DRIVERS = [
  { title: "Authentification et comptes", detail: "Login, profils, rôles → +1 000 à 2 500€" },
  { title: "Paiement in-app", detail: "Stripe, IAP Apple/Google → +1 500 à 3 000€" },
  { title: "Notifications push", detail: "Firebase + logique de segmentation → +500 à 1 500€" },
  { title: "Géolocalisation", detail: "Cartographie, tracking, calcul d'itinéraire → +1 000 à 3 000€" },
  { title: "Mode hors-ligne", detail: "Sync locale et gestion des conflits → +1 500 à 4 000€" },
  { title: "Dashboard admin web", detail: "Interface de gestion pour les admins → +2 000 à 5 000€" },
];

export default function ApplicationMobileCoutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">← Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">Mobile</span>
            <span className="text-xs text-gray-600">4 mai 2026 · 7 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Combien coûte une application mobile en 2026 ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            PWA, React Native, application native — les vrais prix, les facteurs qui font monter le budget, et comment rester maître de votre investissement.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <p className="text-sm leading-relaxed text-violet-200">
            <strong>TL;DR :</strong> PWA 1 500–3 500€ · MVP React Native 3 000–8 000€ · Application complète 8 000–20 000€ · Native iOS+Android 15 000–50 000€. Commencez toujours par un MVP.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Pourquoi les fourchettes sont aussi larges ?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          "Développer une application mobile" peut vouloir dire une to-do list à 3 écrans ou une plateforme de livraison à 50 fonctionnalités. Le prix dépend de trois choses : le nombre de fonctionnalités, la complexité technique (paiement, géoloc, temps réel) et la technologie choisie.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          La règle d'or : commencez par un MVP (Minimum Viable Product) avec une seule fonctionnalité principale. Validez que des gens l'utilisent vraiment, puis investissez davantage.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Les tarifs par type d'application</h2>
        <div className="mb-12 space-y-4">
          {TIERS.map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500">{t.label}</p>
                  <p className="text-2xl font-black text-white">{t.price}</p>
                  <p className="text-xs text-gray-600">{t.delay}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500">{t.tech}</span>
              </div>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Ce qui fait monter le budget</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {COST_DRIVERS.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/8 bg-gray-900/50 p-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Comment réduire le budget sans sacrifier la qualité</h2>
        <ul className="mb-10 space-y-3 text-sm text-gray-400 leading-relaxed">
          {[
            "Commencez par une seule plateforme (iOS OU Android) pour valider, puis étendez.",
            "Utilisez React Native ou Expo — une base de code, deux plateformes. 30-50% moins cher que du natif.",
            "Définissez un scope strict pour le MVP. Chaque fonctionnalité en plus multiplie le budget.",
            "Choisissez Supabase ou Firebase comme backend — des semaines de dev économisées.",
            "Évitez les animations complexes et les effets 3D en V1 — ça peut attendre la V2.",
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

        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Votre application mobile, bien budgétée</h2>
          <p className="mb-6 text-gray-400">Devis gratuit · Réponse sous 24h · MVP dès 3 000€</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-violet-500/30">
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
