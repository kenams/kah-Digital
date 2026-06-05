import Link from "next/link";

const PRODUCTS = [
  {
    emoji: "🌍",
    name: "Kotizy",
    tagline: "La tontine digitale de la diaspora",
    desc: "Plateforme fintech d'épargne collective pour la diaspora africaine. Wallet multi-devise, paiements Stripe, Mobile Money, score de confiance algorithmique.",
    tags: ["Fintech", "Next.js", "Expo", "Stripe", "Supabase"],
    url: "https://tontineapp-web.vercel.app",
    metrics: [
      { label: "Plateformes", value: "Web + Android" },
      { label: "Paiements", value: "Stripe live" },
      { label: "Livraison", value: "6 semaines" },
    ],
    color: "from-emerald-500/10 to-emerald-900/20",
    border: "border-emerald-500/20",
    accent: "text-emerald-400",
  },
  {
    emoji: "🛍️",
    name: "Vellio",
    tagline: "Maison de sélection contemporaine",
    desc: "Boutique e-commerce haut de gamme avec tunnel Stripe optimisé, 71 produits, pipeline email automatisé (panier abandonné, relance J+7, avis J+14).",
    tags: ["E-commerce", "Next.js", "Stripe", "Resend", "PostgreSQL"],
    url: "https://vellio-shop.vercel.app",
    metrics: [
      { label: "Produits", value: "71 live" },
      { label: "Emails auto", value: "6 flows" },
      { label: "Livraison", value: "3 semaines" },
    ],
    color: "from-amber-500/10 to-amber-900/20",
    border: "border-amber-500/20",
    accent: "text-amber-400",
  },
  {
    emoji: "🤖",
    name: "KAH Support",
    tagline: "Assistant IA support IT pour PME",
    desc: "SaaS qui résout 70% des tickets N1 automatiquement, 24h/24. Connecté à GLPI, Freshdesk, Zendesk. Multi-tenant, Stripe live, déploiement en 5 minutes.",
    tags: ["SaaS", "Node.js", "OpenAI", "PostgreSQL", "Stripe"],
    url: "https://kah-support.ch",
    metrics: [
      { label: "Tickets auto", value: "70%" },
      { label: "Déploiement", value: "< 5 min" },
      { label: "Plans", value: "299-999€/mois" },
    ],
    color: "from-violet-500/10 to-violet-900/20",
    border: "border-violet-500/20",
    accent: "text-violet-400",
  },
  {
    emoji: "🎓",
    name: "TechCash Academy",
    tagline: "Plateforme de formations trading & finance",
    desc: "LMS complet avec 11 formations, checkout Stripe, espace apprenant, suivi de progression et certificats téléchargeables générés par IA.",
    tags: ["LMS", "Next.js", "Supabase", "Stripe", "next/og"],
    url: "https://techcash-academy.vercel.app",
    metrics: [
      { label: "Formations", value: "11 live" },
      { label: "Certificats", value: "Auto-générés" },
      { label: "Auth", value: "Supabase" },
    ],
    color: "from-blue-500/10 to-blue-900/20",
    border: "border-blue-500/20",
    accent: "text-blue-400",
  },
];

export function SaasPortfolioSection({ lang = "fr" }: { lang?: string }) {
  const isEn = lang === "en";

  return (
    <section className="border-t border-white/6 py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-white/30">
          {isEn ? "Our SaaS Products" : "Nos produits SaaS"}
        </div>
        <h2 className="mb-4 text-center text-3xl font-black tracking-tight text-white md:text-4xl">
          {isEn ? "We build. We operate. We scale." : "On construit. On opère. On scale."}
        </h2>
        <p className="mb-12 mx-auto max-w-2xl text-center text-white/40">
          {isEn
            ? "KAH Digital doesn't just build for clients — we operate our own SaaS products, e-commerce, and fintech platforms. This is the proof."
            : "KAH Digital ne livre pas seulement pour ses clients — on opère nos propres SaaS, e-commerce et plateformes fintech. C'est notre preuve."}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {PRODUCTS.map((p) => (
            <Link
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group rounded-[2rem] bg-gradient-to-br ${p.color} border ${p.border} p-7 transition hover:scale-[1.01] hover:brightness-110`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="text-3xl">{p.emoji}</span>
                <div>
                  <h3 className="text-lg font-black text-white">{p.name}</h3>
                  <p className={`text-sm ${p.accent}`}>{p.tagline}</p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-6 text-white/55">{p.desc}</p>

              <div className="mb-5 grid grid-cols-3 gap-3">
                {p.metrics.map((m) => (
                  <div key={m.label} className="rounded-xl bg-white/5 p-3 text-center">
                    <p className={`text-sm font-black ${p.accent}`}>{m.value}</p>
                    <p className="mt-0.5 text-[10px] text-white/35">{m.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] font-bold text-white/50">
                    {t}
                  </span>
                ))}
              </div>

              <div className={`mt-4 flex items-center gap-1.5 text-xs font-bold ${p.accent} opacity-0 transition group-hover:opacity-100`}>
                {isEn ? "Visit live product →" : "Voir le produit live →"}
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-white/30">
          {isEn
            ? "All products designed, developed and operated by KAH Digital. From concept to production in weeks, not months."
            : "Tous les produits conçus, développés et opérés par KAH Digital. Du concept à la production en semaines, pas en mois."}
        </p>
      </div>
    </section>
  );
}
