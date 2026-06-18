import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/proposition/monboum",
  title: "Proposition KAH Digital × Mon Boum",
  description: "Proposition sur mesure — commande en ligne, refonte, fidélisation.",
});

const STATS = [
  { value: "30%", label: "de chaque commande", sub: "part chez Deliveroo" },
  { value: "~7 500€", label: "perdus par mois", sub: "sur 8 restos × 50 cmd/j × 25€" },
  { value: "0€", label: "de commission", sub: "avec un système en propre" },
];

const PROBLEMS = [
  {
    severity: "critique",
    color: "border-red-500/40 bg-red-500/5",
    badge: "bg-red-500/20 text-red-400",
    title: "Vous financez Deliveroo",
    desc: "30% sur chaque commande. Sur 8 restaurants à 50 cmd/jour × 25€ = 7 500€ qui partent chaque mois. Ce n'est pas une commission, c'est un loyer.",
  },
  {
    severity: "critique",
    color: "border-red-500/40 bg-red-500/5",
    badge: "bg-red-500/20 text-red-400",
    title: "Vous n'avez aucun client",
    desc: "Vos acheteurs sont des clients Deliveroo, pas des clients Mon Boum. Demain Deliveroo monte à 35% — vous n'avez rien pour négocier ni pour les contacter directement.",
  },
  {
    severity: "bloquant",
    color: "border-orange-500/30 bg-orange-500/5",
    badge: "bg-orange-500/20 text-orange-400",
    title: "Sélecteur de restaurant cassé",
    desc: "Le sélecteur d'adresse en haut du site ne fonctionne pas sur mobile. Premier contact avec la marque = bug.",
  },
  {
    severity: "bloquant",
    color: "border-orange-500/30 bg-orange-500/5",
    badge: "bg-orange-500/20 text-orange-400",
    title: "Aucun Click & Collect en propre",
    desc: "Un client veut commander et récupérer en caisse — impossible sans passer par Deliveroo et ses frais. Vous manquez des commandes locales chaque jour.",
  },
];

const DELIVERABLES = [
  {
    num: "01",
    title: "Système Click & Collect en propre",
    price: "1 490 €",
    delay: "3 semaines",
    roi: "ROI en ~3 semaines si 15% des commandes basculent",
    items: [
      "Commande en ligne par restaurant, menu par enseigne (Burger / Pizz's / Chicken)",
      "Paiement Stripe — carte, Apple Pay, Google Pay",
      "Dashboard temps réel : nouvelles commandes, statuts, annulations",
      "SMS + email automatiques au client (confirmation, prêt à retirer)",
      "0% de commission sur toutes les commandes passées en direct",
    ],
  },
  {
    num: "02",
    title: "Refonte monboum.fr",
    price: "990 €",
    delay: "2 semaines",
    roi: "Plus de trafic organique = moins de budget pub",
    items: [
      "Site rapide, mobile-first — plus de WordPress lent",
      "Menu par restaurant, photos HD, filtres allergènes",
      "SEO local Toulouse optimisé — \"burger toulouse\", \"pizza livraison toulouse\"",
      "Horaires, Google Maps, click-to-call par restaurant",
    ],
  },
  {
    num: "03",
    title: "Fidélité digitale",
    price: "490 €",
    delay: "1 semaine",
    roi: "Base client = actif durable qui ne dépend d'aucune plateforme",
    items: [
      "Compte client avec cumul de points à chaque commande directe",
      "QR code scannable en caisse ou sac livraison",
      "Emails automatiques : récompenses, promos ciblées, rappels",
      "Vos 8 restaurants partagent la même base — 1 fidélité, 4 enseignes",
    ],
  },
];

export default function MonBoumProposalPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Top bar */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <span className="text-sm font-bold tracking-widest text-white/30 uppercase">KAH Digital</span>
          <span className="rounded-full border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400">
            Confidentiel — Mon Boum
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-14">

        {/* Headline */}
        <h1 className="mb-3 text-4xl font-extrabold leading-tight tracking-tight">
          Vous perdez <span className="text-red-400">7 500€ par mois</span>.<br />
          On peut arrêter ça.
        </h1>
        <p className="mb-14 text-lg text-white/50">
          Deliveroo prend 30% sur chaque commande de vos 8 restaurants. En 5 semaines, vous avez un système en propre. Zéro commission.
        </p>

        {/* Chiffres choc */}
        <div className="mb-14 grid grid-cols-3 gap-3">
          {STATS.map((s) => (
            <div key={s.value} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center">
              <div className="mb-1 text-3xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs font-semibold text-white/70">{s.label}</div>
              <div className="mt-0.5 text-xs text-white/30">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Problèmes */}
        <section className="mb-14">
          <h2 className="mb-5 text-lg font-bold uppercase tracking-widest text-white/40">Ce qui bloque</h2>
          <div className="space-y-3">
            {PROBLEMS.map((p) => (
              <div key={p.title} className={`rounded-xl border p-5 ${p.color}`}>
                <div className="mb-2 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold uppercase ${p.badge}`}>{p.severity}</span>
                  <span className="font-bold text-white">{p.title}</span>
                </div>
                <p className="text-sm text-white/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section className="mb-14">
          <h2 className="mb-5 text-lg font-bold uppercase tracking-widest text-white/40">Ce qu&apos;on livre</h2>
          <div className="space-y-4">
            {DELIVERABLES.map((d) => (
              <div key={d.num} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-bold text-white/50">{d.num}</span>
                    <span className="font-bold text-white">{d.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-400">{d.price}</span>
                    <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-400">{d.delay}</span>
                  </div>
                </div>
                <p className="mb-4 text-xs text-amber-400/80">⚡ {d.roi}</p>
                <ul className="space-y-1.5">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/55">
                      <span className="mt-0.5 shrink-0 text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ROI box */}
        <section className="mb-14 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6">
          <h2 className="mb-4 text-base font-bold uppercase tracking-widest text-amber-400">Le calcul, noir sur blanc</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span className="text-white/60">Solution complète (01 + 02 + 03)</span>
              <span className="font-bold text-white">2 970 €</span>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
              <span className="text-white/60">Ce que vous économisez si 20% des commandes passent en direct</span>
              <span className="font-bold text-green-400">+1 500 €/mois</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-semibold text-white">Amortissement</span>
              <span className="text-xl font-extrabold text-amber-400">2 mois</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-white/30">
            Conservateur — Deliveroo facture entre 25% et 35% selon contrat. Calcul sur 50 cmd/j × 8 restos × 25€ panier moyen.
          </p>
        </section>

        {/* Timeline */}
        <section className="mb-14">
          <h2 className="mb-5 text-lg font-bold uppercase tracking-widest text-white/40">Planning</h2>
          <div className="space-y-0">
            {[
              ["S1", "Cadrage + validation maquettes"],
              ["S2–S3", "Développement commande + Stripe"],
              ["S4", "Refonte site + tests multi-resto"],
              ["S5", "Mise en ligne + formation équipe"],
            ].map(([week, desc], i) => (
              <div key={week} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                    {i + 1}
                  </div>
                  {i < 3 && <div className="my-0.5 w-px flex-1 bg-white/10" />}
                </div>
                <div className="pb-4 pt-1">
                  <span className="text-xs font-bold text-white/40">{week} — </span>
                  <span className="text-sm text-white/70">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 p-8 text-center">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/30">Prochaine étape</p>
          <h2 className="mb-2 text-2xl font-extrabold">30 minutes. Devis définitif dans la foulée.</h2>
          <p className="mb-7 text-white/50">
            On cale un appel, on valide les specs, on vous envoie le contrat le jour même.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="mailto:contact@kah-digital.ch?subject=Mon%20Boum%20%E2%80%94%20appel%20de%20cadrage&body=Bonjour%2C%20j%27ai%20re%C3%A7u%20votre%20proposition%20et%20je%20voudrais%20planifier%20un%20appel."
              className="inline-block rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black hover:bg-white/90 transition-colors"
            >
              Répondre par email
            </a>
            <a
              href={`https://wa.me/33759558414?text=${encodeURIComponent("Bonjour KAH Digital, j'ai reçu la proposition pour Mon Boum, je voudrais en discuter.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-white/20 px-8 py-3.5 text-sm font-bold text-white hover:bg-white/5 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </section>

        <p className="mt-10 text-center text-xs text-white/20">
          KAH Digital · Lausanne · contact@kah-digital.ch · kah-digital.ch
        </p>
      </div>
    </main>
  );
}
