import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiExternalLink, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Références — Projets livrés, en ligne | KAH Digital",
  description:
    "Des projets réels livrés par KAH Digital : site vitrine avec réservation, boutique e-commerce Stripe, refonte avec prise de rendez-vous automatisée. Tout est en ligne — ouvrez et jugez.",
  keywords: [
    "références agence web",
    "projets site web KAH Digital",
    "portfolio création site web",
    "réalisations agence web Suisse",
    "exemples sites livrés",
  ],
  alternates: { canonical: "https://kah-digital.ch/references" },
  openGraph: {
    title: "Références — Projets livrés, en ligne | KAH Digital",
    description:
      "Projets réels : site vitrine + réservation, e-commerce Stripe, refonte + RDV automatisé. En ligne et vérifiables.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projets livrés par KAH Digital",
  description:
    "Sites web et applications livrés par KAH Digital, en ligne et accessibles publiquement.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "BCS Nettoyage — Site vitrine + réservation en ligne",
      url: "https://bcs-nettoyage.fr",
      description:
        "Site vitrine Next.js pour une entreprise de nettoyage à Toulouse : services, tarifs, galerie avant/après et réservation de créneau en ligne. En production sur son domaine.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Vellio Shop — Boutique e-commerce",
      url: "https://vellio.kah-digital.ch",
      description:
        "Boutique Next.js avec paiement Stripe en production, 21 produits, emails de confirmation automatiques et design premium.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "DSE Yana — Refonte + prise de rendez-vous automatisée",
      url: "https://dse-yana-premium-client.vercel.app",
      description:
        "Refonte du site d'un bureau d'études fluides en Guyane : réservation d'appel de cadrage en autonomie (créneaux, confirmation, rappel), espace admin.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Kotizy — Application de tontines digitales",
      url: "https://tontineapp-web.vercel.app",
      description:
        "Application de gestion de tontines : cycles automatisés, notifications, tableau de bord communautaire.",
    },
  ],
};

type Ref = {
  sector: string;
  location: string;
  type: string;
  name: string;
  challenge: string;
  solution: string;
  facts: { value: string; label: string }[];
  url: string;
  urlLabel: string;
  color: string;
  accentColor: string;
  borderColor: string;
};

const CASES: Ref[] = [
  {
    sector: "Entreprise de nettoyage",
    location: "Toulouse, France",
    type: "Site vitrine + réservation en ligne",
    name: "BCS Nettoyage",
    challenge:
      "Acquisition 100 % au téléphone et au bouche-à-oreille. Pas de site pour rassurer un nouveau client ni prendre une demande de rendez-vous en dehors des heures d'appel.",
    solution:
      "Site vitrine sur mesure centré sur les résultats (galerie avant/après), tarifs transparents par prestation, formulaire de réservation avec date et créneau, raccourcis WhatsApp / appel / email. Next.js, déployé sur Vercel avec domaine propre.",
    facts: [
      { value: "≈ 1 sem.", label: "Livraison" },
      { value: "En ligne", label: "Sur son domaine" },
      { value: "Réservation", label: "Créneau en ligne" },
    ],
    url: "https://bcs-nettoyage.fr",
    urlLabel: "bcs-nettoyage.fr",
    color: "from-emerald-500/15 to-teal-500/10",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    sector: "E-commerce · Maison & design",
    location: "En ligne",
    type: "Boutique e-commerce",
    name: "Vellio Shop",
    challenge:
      "Lancer une marque de sélection contemporaine avec une vraie boutique en ligne — design premium, paiement fiable, budget maîtrisé.",
    solution:
      "Next.js App Router, Stripe Checkout en mode live (ventes réelles dès le jour 1), catalogue typé de 21 produits en 8 catégories, emails transactionnels Resend, déploiement continu Vercel.",
    facts: [
      { value: "21", label: "Produits en ligne" },
      { value: "Stripe Live", label: "Paiements réels" },
      { value: "≈ 3 sem.", label: "Livraison" },
    ],
    url: "https://vellio.kah-digital.ch",
    urlLabel: "vellio.kah-digital.ch",
    color: "from-amber-500/12 to-orange-500/8",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
  {
    sector: "Bureau d'études fluides",
    location: "Guyane française",
    type: "Refonte + rendez-vous automatisé",
    name: "DSE Yana",
    challenge:
      "Un site daté qui ne reflétait plus le niveau du bureau, et aucun moyen pour un client de réserver un premier échange sans jouer au ping-pong d'emails.",
    solution:
      "Refonte complète (identité, contenu, SEO), et surtout une prise de rendez-vous en autonomie : le client choisit son créneau, le valide, reçoit sa confirmation avec fichier agenda et lien d'annulation. Rappel automatique la veille. Espace admin pour les demandes et les RDV.",
    facts: [
      { value: "Refonte", label: "Site complet" },
      { value: "RDV", label: "En autonomie" },
      { value: "Rappel", label: "Automatique la veille" },
    ],
    url: "https://dse-yana-premium-client.vercel.app",
    urlLabel: "dse-yana-premium-client.vercel.app",
    color: "from-violet-500/15 to-fuchsia-500/8",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/20",
  },
  {
    sector: "Application · Finance communautaire",
    location: "En ligne",
    type: "Application métier",
    name: "Kotizy",
    challenge:
      "Digitaliser la tontine — l'épargne rotative entre proches — avec des cycles fiables, des relances et une vue claire pour tout le groupe.",
    solution:
      "Application web : cycles de tontine automatisés, notifications, tableau de bord communautaire, gestion des paiements. Next.js, Supabase, déploiement Vercel.",
    facts: [
      { value: "Cycles", label: "Automatisés" },
      { value: "Notifs", label: "Relances intégrées" },
      { value: "En ligne", label: "Application live" },
    ],
    url: "https://tontineapp-web.vercel.app",
    urlLabel: "tontineapp-web.vercel.app",
    color: "from-blue-500/15 to-cyan-500/8",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
];

const GUARANTEES = [
  "Devis gratuit et lisible sous 24h",
  "Prix fixe confirmé avant de commencer",
  "Paiement après livraison",
  "Code source livré — le site vous appartient",
];

export default function ReferencesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-references" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/6 pt-20 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            <FiCheck size={13} /> En ligne, vérifiable
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ce qu&apos;on a livré.<br />Ouvrez, jugez.
          </h1>
          <p className="mb-8 text-lg text-gray-400 leading-relaxed">
            Pas de mockups inventés, pas de faux avis. Des projets réels, en production, que vous
            pouvez ouvrir maintenant dans un nouvel onglet.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Discuter de mon projet <FiArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Bonjour%2C%20j'ai%20vu%20vos%20r%C3%A9f%C3%A9rences%20et%20j'aimerais%20discuter%20de%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <FiMessageCircle size={15} /> WhatsApp direct
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip — factuels uniquement */}
      <section className="border-b border-white/6 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "1–6 sem.", label: "Délai de livraison" },
              { value: "Prix fixe", label: "Confirmé avant de commencer" },
              { value: "Paiement", label: "Après livraison" },
              { value: "Code source", label: "Livré, le site est à vous" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-white sm:text-[1.7rem]">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projets */}
      <section className="mx-auto max-w-5xl px-4 py-20 space-y-16">
        {CASES.map((c) => (
          <div key={c.name} className={`rounded-2xl border ${c.borderColor} bg-gradient-to-br ${c.color} p-8`}>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-gray-400">{c.sector}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs text-gray-400">{c.location}</span>
                  <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs font-semibold ${c.accentColor}`}>{c.type}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{c.name}</h2>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ouvrir le site <FiExternalLink size={13} />
              </a>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">Le besoin</p>
                <p className="text-sm text-gray-300 leading-relaxed">{c.challenge}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">Ce qui a été livré</p>
                <p className="text-sm text-gray-300 leading-relaxed">{c.solution}</p>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl border border-white/8 bg-black/20 p-4">
              {c.facts.map((m) => (
                <div key={m.label} className="text-center">
                  <p className={`text-lg font-extrabold ${c.accentColor}`}>{m.value}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>

            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-black/20 px-5 py-3 text-sm text-gray-300 transition hover:border-white/20 hover:text-white"
            >
              <span className="text-gray-500">En ligne :</span>
              <span className="font-mono">{c.urlLabel}</span>
              <FiExternalLink size={12} />
            </a>
          </div>
        ))}
      </section>

      {/* Avis clients — transparent */}
      <section className="border-t border-white/6 py-14">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-sm text-gray-400 leading-relaxed">
            <strong className="text-white">Les avis clients arrivent.</strong> On préfère afficher
            zéro témoignage que d&apos;en inventer. En attendant, chaque projet ci-dessus est
            public — ouvrez-les, testez la réservation, regardez la vitesse de chargement.
          </p>
        </div>
      </section>

      {/* Ce qui est garanti */}
      <section className="border-t border-white/6 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-white">Ce qui est garanti à chaque projet</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {GUARANTEES.map((g) => (
              <div key={g} className="flex items-center gap-3 rounded-xl border border-white/8 bg-gray-900/50 p-4 text-left">
                <FiCheck size={16} className="shrink-0 text-emerald-400" />
                <span className="text-sm text-gray-300">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="border-t border-white/6 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white">Votre projet est le prochain.</h2>
          <p className="mb-8 text-gray-400">
            Devis personnalisé sous 24h. Délai clair. Périmètre adapté. Pas de surprise.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Obtenir mon devis gratuit <FiArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Bonjour%2C%20j'ai%20vu%20vos%20r%C3%A9f%C3%A9rences%20et%20j'aimerais%20discuter%20de%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-600">Réponse sous 24h · Sans engagement · France &amp; Suisse</p>
        </div>
      </section>
    </div>
  );
}
