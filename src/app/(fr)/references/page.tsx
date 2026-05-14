import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Références clients — Résultats concrets | KAH-Digital",
  description:
    "Cas clients réels : +30% réservations restaurant Genève, 4 nouveaux clients mois 1 pour une coach, dashboard PME en prod depuis 4 mois. Voyez ce qu'on peut faire pour vous.",
  keywords: [
    "références agence web",
    "cas clients site web",
    "résultats création site web",
    "témoignages clients KAH-Digital",
    "agence web résultats prouvés",
  ],
  alternates: { canonical: "https://kah-digital.ch/references" },
  openGraph: {
    title: "Références clients — Résultats concrets | KAH-Digital",
    description:
      "Cas clients réels avec résultats chiffrés. Site vitrine, app métier, refonte. Livraison en 1-3 semaines.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Références clients KAH-Digital",
  description: "Cas clients avec résultats chiffrés — sites web, applications et solutions digitales livrés par KAH-Digital",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ashanti Beauty — Site vitrine premium",
      description: "Site vitrine premium livré en 1 semaine pour un institut de beauté à Balma. Réservations Planity intégrées, vidéo HD mobile et desktop.",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Coach business Lyon — +4 clients le premier mois",
      description: "Site vitrine professionnel livré en 3 semaines. 4 nouveaux clients obtenus le premier mois suivant la mise en ligne.",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Restaurant Genève — +30% réservations en 2 mois",
      description: "Refonte complète site restaurant. Site rapide, mobile-first. Réservations en hausse de 30% deux mois après la mise en ligne.",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "PME Lausanne — Dashboard app métier en prod",
      description: "Application de gestion interne livrée en 6 semaines. En production depuis 4 mois, zéro bug signalé.",
    },
  ],
};

const CASES = [
  {
    sector: "Institut de beauté",
    location: "Balma, France",
    type: "Site vitrine premium",
    name: "Ashanti Beauty",
    challenge:
      "Un salon de beauté haut de gamme sans présence en ligne cohérente avec son positionnement. Les clients ne pouvaient pas visualiser les prestations ni réserver facilement.",
    solution:
      "Site Next.js premium avec vidéo hero HD responsive, 5 pôles de prestations cliquables, boutons Planity sur chaque offre, galerie, avis clients et Google Maps.",
    metrics: [
      { value: "1 sem.", label: "Délai de livraison" },
      { value: "5", label: "Pôles de prestations" },
      { value: "9", label: "Partenaires intégrés" },
    ],
    quote: "Un site qui reflète enfin notre image. Les clientes nous disent qu'elles ont réservé directement depuis le site.",
    author: "Direction Ashanti Beauty",
    color: "from-pink-500/20 to-rose-500/20",
    accentColor: "text-pink-400",
    borderColor: "border-pink-500/20",
  },
  {
    sector: "Coach business indépendante",
    location: "Lyon, France",
    type: "Site vitrine professionnel",
    name: "Coaching & Développement",
    challenge:
      "Aucune vitrine digitale. Acquisition 100% bouche à oreille, impossible à scaler. Besoin d'un site qui présente l'offre clairement et incite à prendre contact.",
    solution:
      "Site vitrine 5 pages : accueil orienté résultats, services détaillés, parcours, témoignages et formulaire de contact. Livré en 3 semaines, SEO de base inclus.",
    metrics: [
      { value: "3 sem.", label: "Délai de livraison" },
      { value: "+4", label: "Clients mois 1" },
      { value: "5★", label: "Satisfaction" },
    ],
    quote:
      "En 3 semaines j'avais un site vitrine propre et professionnel. Kénan a cadré rapidement ce que je voulais, sans réunions interminables. Résultat : 4 nouveaux clients le premier mois.",
    author: "S. M. — Coach business, Lyon",
    color: "from-blue-500/20 to-violet-500/20",
    accentColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    sector: "Restauration",
    location: "Genève, Suisse",
    type: "Refonte site web",
    name: "Restaurant — Genève",
    challenge:
      "Site existant lent, non mobile, sans intégration de réservation. Perte de clients potentiels sur Google. Image qui ne correspondait plus au restaurant.",
    solution:
      "Refonte complète : nouveau design moderne, site ultra-rapide (100/100 Lighthouse), compatible mobile, intégration TheFork/réservation en ligne et carte dynamique.",
    metrics: [
      { value: "+30%", label: "Réservations en 2 mois" },
      { value: "100/100", label: "Score Lighthouse" },
      { value: "2 sem.", label: "Délai de livraison" },
    ],
    quote:
      "Notre site était catastrophique. Le nouveau est rapide, adapté mobile, et les réservations ont augmenté de 30% en deux mois. Devis clair, livraison dans les délais.",
    author: "A. B. — Restaurateur, Genève",
    color: "from-emerald-500/20 to-teal-500/20",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
  },
  {
    sector: "PME / Industrie",
    location: "Lausanne, Suisse",
    type: "Application métier sur mesure",
    name: "PME — Lausanne",
    challenge:
      "Gestion interne sur Excel et emails. Perte de temps, erreurs de saisie, impossibilité de travailler à plusieurs en simultané. Besoin d'un outil digital fiable pour la saison.",
    solution:
      "Dashboard métier sur mesure : authentification sécurisée, gestion des plannings, suivi des dossiers clients, export PDF et accès multi-utilisateurs. Livré en 6 semaines.",
    metrics: [
      { value: "6 sem.", label: "Délai de livraison" },
      { value: "4 mois", label: "En prod, zéro bug" },
      { value: "100%", label: "Délai respecté" },
    ],
    quote:
      "KAH-Digital a créé notre application en 6 semaines. Très réactif, explique bien les choix techniques. On a pu lancer notre saison avec l'outil en main.",
    author: "C. R. — Directrice opérationnelle, PME Lausanne",
    color: "from-amber-500/20 to-orange-500/20",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/20",
  },
];

const GUARANTEES = [
  "Devis gratuit et lisible sous 24h",
  "Délai et budget respectés",
  "Livraison ou remboursement",
  "Support inclus 30 jours après livraison",
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
            <FiCheck size={13} /> Résultats vérifiables
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Ce que nos clients ont<br />obtenu concrètement
          </h1>
          <p className="mb-8 text-lg text-gray-400 leading-relaxed">
            Pas de mockups inventés. Des cas réels — avec les délais, les chiffres et les mots de nos clients.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
            >
              Discuter de mon projet <FiArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/33759558414?text=Bonjour%2C%20j'ai%20vu%20vos%20références%20et%20j'aimerais%20discuter%20de%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              <FiMessageCircle size={15} /> WhatsApp direct
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-white/6 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "1–6 sem.", label: "Délai de livraison" },
              { value: "30+", label: "Projets livrés" },
              { value: "5★", label: "Note moyenne clients" },
              { value: "0", label: "Dépassements de budget" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-extrabold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="mx-auto max-w-5xl px-4 py-20 space-y-16">
        {CASES.map((c, i) => (
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
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 24 24" fill="#fbbf24" className="h-4 w-4">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">Problème</p>
                <p className="text-sm text-gray-300 leading-relaxed">{c.challenge}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-gray-500">Solution livrée</p>
                <p className="text-sm text-gray-300 leading-relaxed">{c.solution}</p>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-4 rounded-xl border border-white/8 bg-black/20 p-4">
              {c.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <p className={`text-xl font-extrabold ${c.accentColor}`}>{m.value}</p>
                  <p className="mt-0.5 text-xs text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>

            <blockquote className="rounded-xl border border-white/8 bg-black/20 p-5">
              <p className="mb-3 text-sm italic leading-relaxed text-gray-300">"{c.quote}"</p>
              <p className="text-xs font-semibold text-gray-500">— {c.author}</p>
            </blockquote>
          </div>
        ))}
      </section>

      {/* Guarantees */}
      <section className="border-t border-white/6 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-8 text-2xl font-bold text-white">Ce que vous pouvez attendre à chaque fois</h2>
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
              href="https://wa.me/33759558414?text=Bonjour%2C%20j'ai%20vu%20vos%20références%20et%20j'aimerais%20discuter%20de%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-bold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-600">Réponse sous 24h · Sans engagement · France & Suisse</p>
        </div>
      </section>
    </div>
  );
}
