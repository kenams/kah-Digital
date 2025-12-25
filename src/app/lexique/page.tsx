"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/reveal";
import { StickyTimelineIndicator } from "@/components/sticky-timeline-indicator";

type LexiqueTopic = {
  title: string;
  summary: string;
  bullets: string[];
};

const topics: LexiqueTopic[] = [
  {
    title: "UX",
    summary: "Organisation de l'expérience utilisateur pour que chaque action soit logique et agréable.",
    bullets: [
      "Ateliers express pour cerner la cible, ses freins et ses besoins.",
      "Wireframes (maquettes simples) pour valider le contenu avant d'investir dans le design.",
      "Tests rapides : on vérifie que l'information clé est trouvée en moins de 10 secondes.",
    ],
  },
  {
    title: "UI",
    summary: "Interface visuelle : couleurs, typographies, composants et animations.",
    bullets: [
      "Design system réutilisable (boutons, tags, cartes) pour garder une cohérence premium.",
      "Respect strict de l'identité (logo, teintes, iconographie).",
      "Animations légères pour guider le regard sans ralentir la lecture.",
    ],
  },
  {
    title: "Développement",
    summary: "Le code qui fait tourner le site : front (ce que l'on voit) et back (logiciel côté serveur).",
    bullets: [
      "Stack Next.js + React 19 pour des pages ultra rapides.",
      "APIs sécurisées pour connecter CRM, paiement, outils internes.",
      "Pipeline Vercel : chaque push déclenche un build, des tests, puis le déploiement.",
    ],
  },
  {
    title: "Site vitrine",
    summary: "Présenter l'entreprise, l'équipe et les offres en quelques scrolls.",
    bullets: [
      "Sections modulaires : hero, services, preuves, FAQ, CTA.",
      "Formulaire de devis relié à vos emails (ou CRM) pour ne rien perdre.",
      "Page cahier des charges téléchargeable pour cadrer les besoins.",
    ],
  },
  {
    title: "Landing page",
    summary: "Page unique dédiée à une campagne ou un lancement produit.",
    bullets: [
      "Structure courte : promesse, bénéfices, preuve sociale, appel à l'action.",
      "Tracking précis (Pixel Meta, GA4, LinkedIn) pour mesurer chaque lead.",
      "Livraison en quelques jours pour tester un concept ou une offre.",
    ],
  },
  {
    title: "Boutique en ligne",
    summary: "Interface de vente avec catalogue, panier et paiement sécurisé.",
    bullets: [
      "Stripe, Shopify Headless ou Commerce Layer selon le volume et les pays ciblés.",
      "Emails automatisés (confirmation, relance panier, suivi colis).",
      "Tableau de bord ventes + marge pour piloter les stocks.",
    ],
  },
  {
    title: "SEO",
    summary: "Optimisation pour que Google (et les autres moteurs) comprennent et classent le site.",
    bullets: [
      "Balises title, description et rubriquage clair (H1/H2).",
      "Temps de chargement < 1,5 s grâce à Next.js et Vercel.",
      "Plan du site, schema.org et contenus structurés pour répondre aux requêtes.",
    ],
  },
  {
    title: "Responsive",
    summary: "Un site qui s'adapte automatiquement aux mobiles, tablettes et grands écrans.",
    bullets: [
      "Tailwind CSS et tests multi-devices pour garder les CTA visibles partout.",
      "Grilles fluides et images optimisées pour ne pas exploser la data.",
      "Menus simplifiés sur mobile et interactions accessibles (tap, swipe).",
    ],
  },
  {
    title: "API & Webhooks",
    summary: "Connexions entre votre site et des services externes (CRM, paiement, newsletter).",
    bullets: [
      "Routes API Next.js pour centraliser les échanges sécurisés.",
      "Webhooks : un service (Stripe, Airtable...) envoie un signal dès qu'un évènement arrive.",
      "Logs et clés secrètes stockées dans .env pour garder le contrôle.",
    ],
  },
  {
    title: "CMS",
    summary: "Outil d'édition pour mettre à jour textes, études de cas ou blog sans coder.",
    bullets: [
      "Sanity, Storyblok ou Notion connectée selon l'équipe en place.",
      "Permissions par rôle pour publier en toute sécurité.",
      "Prévisualisation instantanée pour valider avant mise en ligne.",
    ],
  },
  {
    title: "CRM & Automation",
    summary: "Gestion des leads et automatisation des relances.",
    bullets: [
      "HubSpot, Pipedrive ou Notion CRM alimentés automatiquement par les formulaires.",
      "Scénarios d'emails (merci, relance, prise de rendez-vous).",
      "Suivi de la valeur pipeline pour prioriser les prospects chauds.",
    ],
  },
  {
    title: "Sécurité / SSL",
    summary: "Protection des données échangées entre l'utilisateur et le site.",
    bullets: [
      "Certificat SSL automatique sur Vercel : cadenas affiché dans le navigateur.",
      "Pare-feu applicatif et filtrage anti-bot pour les formulaires.",
      "Stockage chiffré des secrets (.env local puis Vercel Environment).",
    ],
  },
  {
    title: "Monitoring & Analytics",
    summary: "Contrôler la santé du site et comprendre ce que font les visiteurs.",
    bullets: [
      "Alertes Vercel (logs, erreurs 500, temps de réponse) + notifications email.",
      "Plausible ou GA4 pour suivre trafic, conversions, pages les plus consultées.",
      "Heatmaps (Hotjar) pour voir où les visiteurs bloquent.",
    ],
  },
  {
    title: "React Native",
    summary: "Framework mobile (iOS + Android) bâti sur React pour partager la majorité du code entre plateformes.",
    bullets: [
      "Une seule base de code → deux apps compilées nativement.",
      "Accès aux capteurs (caméra, GPS, Bluetooth) via des modules Expo ou community.",
      "Idéal pour lancer un MVP rapidement puis itérer sans recoder deux fois.",
    ],
  },
  {
    title: "Expo",
    summary: "Toolchain qui simplifie le développement React Native (builds cloud, OTA, accès API natives).",
    bullets: [
      "Expo Go pour prévisualiser instantanément l'app sur iPhone/Android.",
      "Packaging TestFlight / Android Beta en quelques commandes.",
      "Mises à jour OTA : pousser un fix sans attendre la validation des stores.",
    ],
  },
  {
    title: "Supabase",
    summary: "Base de données Postgres + Auth + Storage prête à brancher sur un MVP web/mobile.",
    bullets: [
      "Auth sécurisée (OTP, Magic Link, OAuth) et règles row level pour gérer les rôles.",
      "API REST et GraphQL générées automatiquement à partir de tes tables.",
      "Dashboard clair + logs temps réel pour suivre les requêtes et webhooks.",
    ],
  },
  {
    title: "TestFlight & Android Beta",
    summary: "Canaux Apple/Google pour distribuer ton app en test privé avant la release publique.",
    bullets: [
      "Inviter des testeurs avec un simple lien et contrôler les builds.",
      "Android Internal / Closed testing pour récolter des feedbacks en sécurité.",
      "Étape indispensable pour vérifier performances, crashs et conformité store.",
    ],
  },
];

const categories = [
  { label: "UX / UI", keywords: ["UX", "UI", "Responsive"] },
  { label: "Delivery", keywords: ["Développement", "Site vitrine", "Landing page", "Boutique en ligne"] },
  {
    label: "Tech / Stack",
    keywords: ["SEO", "API & Webhooks", "CMS", "CRM & Automation", "Sécurité / SSL", "Monitoring & Analytics"],
  },
  { label: "Mobile", keywords: ["React Native", "Expo", "Supabase", "TestFlight & Android Beta"] },
];

const lexiqueSections = [
  { id: "lexique-hero", label: "Introduction" },
  { id: "lexique-filtres", label: "Filtres & recherche" },
  { id: "lexique-terms", label: "Entrées du lexique" },
] as const;

export default function LexiquePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const filteredTopics = useMemo(() => {
    let list = topics;
    if (activeCategory) {
      const cat = categories.find((c) => c.label === activeCategory);
      if (cat) list = list.filter((topic) => cat.keywords.includes(topic.title));
    }
    if (!query.trim()) return list;
    const lower = query.toLowerCase();
    return list.filter((topic) => {
      const haystack = [topic.title, topic.summary, ...topic.bullets].join(" ").toLowerCase();
      return haystack.includes(lower);
    });
  }, [query, activeCategory]);

  return (
    <div className="lg:flex lg:items-start lg:gap-10">
      <div className="flex-1 space-y-12">
        <section id="lexique-hero" className="section-shell space-y-8">
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            <Link
              href="/"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/configurateur"
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
            >
              Accéder au configurateur
            </Link>
          </div>
          <Reveal>
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Lexique</p>
              <h1 className="text-4xl font-semibold text-white">Comprendre les termes en 5 minutes</h1>
              <p className="text-white/70 max-w-3xl">
                {"Une page simple pour aligner clients, commerciaux ou freelancers. Pas de jargon inutile : juste ce qu'il faut pour décider vite."}
              </p>
            </div>
          </Reveal>
        </section>

        <section id="lexique-filtres" className="section-shell space-y-6">
          <Reveal>
            <div className="space-y-4 text-slate-900">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setActiveCategory((prev) => (prev === cat.label ? null : cat.label))}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      activeCategory === cat.label
                        ? "border-slate-900 bg-white text-slate-900"
                        : "border-slate-300 bg-white/60 text-slate-600 hover:border-slate-900/40"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="light-outline p-4">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher : SEO, API, responsive, React Native, Supabase..."
                  className="w-full rounded-2xl border border-slate-900/10 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-900/40 focus:outline-none"
                />
              </div>
            </div>
          </Reveal>
        </section>

        <section id="lexique-terms" className="section-shell space-y-6">
          <div className="space-y-6">
            {filteredTopics.length === 0 && (
              <Reveal>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
                  {"Aucun terme trouvé. Essaie \"SEO\", \"CMS\", \"responsive\"..."}
                </div>
              </Reveal>
            )}
            {filteredTopics.map((topic, index) => (
              <Reveal key={topic.title} delay={index * 0.05}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-2xl font-semibold text-white">{topic.title}</h2>
                  <p className="mt-3 text-white/75">{topic.summary}</p>
                  <ul className="mt-4 space-y-2 text-white/70">
                    {topic.bullets.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-white/50" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section-shell">
          <div className="accent-section">
            <div className="content space-y-6 px-6 py-10 text-white">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">Prochaines etapes</p>
                <h2 className="mt-3 text-3xl font-semibold">Pret a cadrer ton sprint ou ton MVP ?</h2>
                <p className="mt-2 max-w-3xl text-white/70">
                  On transforme ces definitions en actions concretes: sprint cahier des charges, configurateur guidant les
                  modules et devis express pour enclencher la prod.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link
                  href="/devis"
                  className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  Planifier un sprint
                </Link>
                <Link
                  href="/configurateur"
                  className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  Composer ton MVP
                </Link>
                <Link
                  href="/cahier-des-charges"
                  className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  Telecharger le pack
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="sticky top-32 hidden lg:block lg:w-72">
        <StickyTimelineIndicator sections={lexiqueSections} />
      </div>
    </div>
  );
}
