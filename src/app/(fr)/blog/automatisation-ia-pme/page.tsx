import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Automatisation IA pour PME : 5 cas concrets qui font gagner du temps en 2026 — KAH Digital",
  description:
    "Découvrez comment les PME utilisent l'automatisation IA pour qualifier des leads, automatiser leur reporting et réduire les tâches répétitives. 5 cas réels avec résultats mesurables.",
  keywords: [
    "automatisation ia pme",
    "automatisation intelligence artificielle entreprise",
    "agent ia pour pme",
    "automatiser les processus pme",
    "ia pour petite entreprise",
    "gain de temps automatisation ia 2026",
    "workflow automatisé ia",
  ],
  alternates: { canonical: "https://kah-digital.ch/blog/automatisation-ia-pme" },
  openGraph: {
    title: "Automatisation IA pour PME : 5 cas concrets en 2026",
    description:
      "Comment les PME gagnent 10h+ par semaine grâce à l'automatisation IA — qualification de leads, reporting, relances, support client.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Automatisation IA pour PME : 5 cas concrets qui font gagner du temps en 2026",
  datePublished: "2026-05-19",
  dateModified: "2026-05-19",
  author: { "@type": "Person", name: "Kénan — KAH Digital" },
  publisher: { "@type": "Organization", name: "KAH Digital", url: "https://kah-digital.ch" },
  mainEntityOfPage: "https://kah-digital.ch/blog/automatisation-ia-pme",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce que l'automatisation IA pour une PME ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "L'automatisation IA pour PME consiste à utiliser des agents intelligents et des workflows automatisés pour remplacer les tâches répétitives : qualification de leads, relances email, reporting, tri des demandes entrantes, réponses au support. L'objectif est de libérer du temps humain pour les tâches à haute valeur ajoutée.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte une automatisation IA pour une PME ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le coût dépend de la complexité du workflow. Un système d'automatisation simple (scoring de leads, emails automatisés) est accessible à partir de 2 500 CHF en formule Starter. Un système complet avec agents IA, Supabase et tableaux de bord commence à 6 900 CHF. Le ROI est généralement atteint en 1 à 3 mois.",
      },
    },
    {
      "@type": "Question",
      name: "Quels outils IA utiliser pour automatiser une PME ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les outils les plus efficaces en 2026 : Claude (Anthropic) et OpenAI GPT-4 pour les agents intelligents, Supabase pour la base de données et les triggers en temps réel, n8n ou Make pour les workflows no-code, Resend pour les emails transactionnels automatisés, et Vercel/Next.js pour les interfaces de gestion.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il être technique pour automatiser avec l'IA ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. KAH Digital livre des systèmes clé en main : vous recevez un tableau de bord simple pour suivre les résultats et ajuster les paramètres. Aucune compétence technique requise pour l'utilisation quotidienne.",
      },
    },
  ],
};

const CASES = [
  {
    step: "01",
    title: "Qualification de leads — 4h/jour économisées",
    content: `**La situation :** Une startup SaaS B2B dont les commerciaux passaient 4 heures par jour à trier manuellement les demandes entrantes, vérifier les profils LinkedIn, et envoyer des emails de qualification. Taux de conversion initial : 2%.

**Le système mis en place :**
- Agent IA Claude connecté au formulaire de contact
- Scoring automatique basé sur 12 critères (secteur, taille d'entreprise, message, heure de soumission)
- Séquence d'emails personnalisés par secteur sur 10 jours
- Alerte commerciale uniquement pour les leads scorés 7/10+

**Résultats en 60 jours :**
- 6× plus de leads qualifiés traités par semaine
- −80% de temps commercial sur la qualification
- Taux de conversion passé de 2% à 11%
- ROI atteint en 3 semaines après livraison`,
  },
  {
    step: "02",
    title: "Reporting automatique — 2h récupérées chaque semaine",
    content: `**La situation :** Une PME de 40 personnes dont le directeur opérations passait 2 heures chaque lundi à compiler manuellement des données Excel issues de 4 systèmes différents pour produire le rapport de la semaine.

**Le système mis en place :**
- Connexion Supabase aux 4 sources de données via API
- Dashboard React temps réel accessible depuis n'importe quel appareil
- Génération PDF automatique chaque lundi à 7h00
- Alertes email sur les KPIs critiques (seuils paramétrables)

**Résultats :**
- 2h récupérées chaque semaine (104h/an)
- Données disponibles en temps réel, pas à J+1
- Zéro bug en 6 mois de production
- 3e projet déjà planifié avec le même client`,
  },
  {
    step: "03",
    title: "Support client IA — 70% de tickets traités automatiquement",
    content: `**La situation :** Une boutique e-commerce recevant 80 à 120 messages/semaine sur les mêmes questions (délais de livraison, politique de retour, tailles disponibles). Une personne y passait 15h/semaine.

**Le système mis en place :**
- Agent IA entraîné sur la base de connaissances produit
- Réponse automatique aux 40 questions les plus fréquentes
- Escalade vers un humain uniquement pour les cas complexes ou insatisfaits
- Intégration directe dans Shopify et email support

**Résultats :**
- 70% des tickets traités sans intervention humaine
- Temps de réponse moyen : 3 minutes (contre 4h avant)
- Satisfaction client notée 4,7/5 post-déploiement
- 12h/semaine libérées pour la gestion produit`,
  },
  {
    step: "04",
    title: "Relances commerciales — pipeline multiplié par 3",
    content: `**La situation :** Un cabinet de conseil dont les prospects ne recevaient aucun suivi après le premier contact. 60% des devis envoyés restaient sans réponse faute de relance systématique.

**Le système mis en place :**
- Pipeline automatisé : J+3, J+7, J+14 après envoi de devis
- Personnalisation IA de chaque relance selon le contenu du devis
- Détection des ouvertures email + déclenchement conditionnel
- Tableau de bord commercial avec statut de chaque prospect

**Résultats :**
- Taux de réponse aux devis : +68%
- Pipeline actif multiplié par 3 en 8 semaines
- Temps commercial récupéré : 6h/semaine
- Chiffre d'affaires additionnel estimé : +40% en 3 mois`,
  },
  {
    step: "05",
    title: "Veille concurrentielle automatisée — insights quotidiens",
    content: `**La situation :** Une direction marketing passant 3h/semaine à surveiller manuellement les publications des concurrents, les tendances sectorielles et les nouvelles opportunités de contenu.

**Le système mis en place :**
- Agent IA scrappant 15 sources définies toutes les 24h
- Résumé personnalisé livré par email chaque matin
- Détection des opportunités de mots-clés et sujets tendance
- Suggestions de contenus à produire basées sur les gaps détectés

**Résultats :**
- 3h/semaine économisées en veille manuelle
- 2× plus de sujets de contenu identifiés par mois
- Réactivité aux trends : de J+7 à J+1
- Coût total du système : 1 400 CHF (ROI < 2 mois)`,
  },
];

export default function AutomatisationIaPmePage() {
  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-gray-950 text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/6 pt-16 pb-12">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-blue-600/12 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            <Link href="/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition">
              ← Blog
            </Link>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                Automatisation IA
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                19 mai 2026
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                8 min de lecture
              </span>
            </div>
            <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Automatisation IA pour PME : 5 cas concrets qui font gagner du temps en 2026
            </h1>
            <p className="text-lg leading-relaxed text-gray-400">
              L'IA n'est plus réservée aux grandes entreprises. En 2026, une PME de 5 à 50 personnes peut automatiser ses tâches répétitives, qualifier ses leads et générer des rapports sans recruter — et sans budget colossal. Voici 5 cas réels avec résultats mesurables.
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          {/* Intro */}
          <div className="mb-12 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 to-violet-950/20 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-2">Ce que vous allez apprendre</p>
            <ul className="space-y-2">
              {[
                "5 usages concrets de l'automatisation IA pour PME",
                "Les outils utilisés : Claude, Supabase, Resend, n8n",
                "Les résultats mesurables pour chaque cas",
                "Le coût et le délai de mise en place",
                "Comment démarrer sans être technique",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <FiCheck size={14} className="shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Why IA section */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-extrabold text-white">Pourquoi l'automatisation IA change la donne pour les PME</h2>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-gray-400 leading-relaxed mb-4">
                Jusqu'en 2023, l'automatisation intelligente était réservée aux entreprises avec des budgets tech importants. Aujourd'hui, des outils comme Claude (Anthropic), GPT-4 (OpenAI) et Supabase permettent de construire des agents IA capables de qualifier des leads, rédiger des emails personnalisés et compiler des rapports — pour quelques centaines d'euros par mois de coûts d'API.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                La vraie question n'est plus "est-ce que l'IA peut faire ça ?" mais "quelles tâches ai-je intérêt à automatiser en premier ?". La réponse : les tâches à faible valeur ajoutée, répétitives, à fort volume — et celles qui créent des délais dans votre pipeline commercial.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Voici 5 cas réels déployés par KAH Digital pour des PME entre 2025 et 2026.
              </p>
            </div>
          </section>

          {/* Cases */}
          <div className="space-y-10 mb-14">
            {CASES.map((c) => (
              <section key={c.step} className="rounded-2xl border border-white/8 bg-gray-900/50 p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/15 text-sm font-extrabold text-blue-400">
                    {c.step}
                  </span>
                  <h2 className="text-xl font-bold text-white">{c.title}</h2>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  {c.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("**") && para.endsWith("**")) {
                      return <p key={i} className="font-semibold text-white mt-3 mb-1">{para.slice(2, -2)}</p>;
                    }
                    if (para.startsWith("- ")) {
                      return (
                        <ul key={i} className="my-2 space-y-1 pl-0">
                          {para.split("\n").map((line, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                              <FiCheck size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                              <span dangerouslySetInnerHTML={{ __html: line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>") }} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={i}
                        className="mb-3 text-sm leading-relaxed text-gray-400"
                        dangerouslySetInnerHTML={{
                          __html: para.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>"),
                        }}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* How to start */}
          <section className="mb-14">
            <h2 className="mb-4 text-2xl font-extrabold text-white">Par où commencer ?</h2>
            <p className="mb-6 text-gray-400 leading-relaxed">
              La meilleure façon de démarrer : identifier la tâche répétitive qui coûte le plus de temps à votre équipe aujourd'hui. C'est là que le retour sur investissement sera le plus rapide.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Votre équipe passe du temps à qualifier des leads manuellement", action: "→ Agent de qualification IA" },
                { label: "Le reporting prend 1h+ par semaine à compiler", action: "→ Dashboard temps réel auto" },
                { label: "Vous envoyez des emails de suivi manuellement", action: "→ Séquence automatisée personnalisée" },
                { label: "Votre support reçoit toujours les mêmes questions", action: "→ Agent IA FAQ intégré" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/8 bg-gray-900/50 p-4">
                  <p className="text-sm text-gray-400 mb-2">{item.label}</p>
                  <p className="text-sm font-semibold text-blue-400">{item.action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section className="mb-14">
            <h2 className="mb-4 text-2xl font-extrabold text-white">Les outils utilisés en 2026</h2>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-gray-900/60">
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">Outil</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">Usage</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">Coût mensuel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {[
                    { tool: "Claude (Anthropic)", usage: "Agent IA, rédaction, scoring", cost: "~20–80$/mois" },
                    { tool: "Supabase", usage: "Base de données, triggers, realtime", cost: "0–25$/mois" },
                    { tool: "Resend", usage: "Emails transactionnels automatisés", cost: "0–20$/mois" },
                    { tool: "n8n / Make", usage: "Workflows no-code", cost: "20–50$/mois" },
                    { tool: "Vercel", usage: "Hébergement app Next.js", cost: "0–20$/mois" },
                  ].map((row) => (
                    <tr key={row.tool} className="bg-gray-900/30">
                      <td className="px-4 py-3 font-medium text-white">{row.tool}</td>
                      <td className="px-4 py-3 text-gray-400">{row.usage}</td>
                      <td className="px-4 py-3 text-gray-400">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">Coût total d'infrastructure : 60–200$/mois selon les volumes.</p>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-extrabold text-white">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((q) => (
                <div key={q.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
                  <p className="mb-2 font-semibold text-white">{q.name}</p>
                  <p className="text-sm leading-relaxed text-gray-400">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/50 to-violet-950/30 p-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Prêt à automatiser ?</p>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Obtenez un audit gratuit de votre situation</h2>
            <p className="mb-6 text-gray-400 text-sm leading-relaxed">
              KAH Digital analyse votre workflow actuel et identifie les 3 automations prioritaires pour votre PME. Résultats sous 24h, sans engagement.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/audit-gratuit"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 hover:gap-3"
              >
                Obtenir mon audit gratuit
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://wa.me/33759558414?text=Bonjour%20K%C3%A9nan%2C%20je%20veux%20automatiser%20mes%20processus%20PME."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
              >
                <FiMessageCircle size={15} />
                WhatsApp — réponse sous 2h
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-600">100% gratuit · Sans engagement · Résultats personnalisés</p>
          </section>
        </article>

        {/* Related articles */}
        <section className="border-t border-white/6 py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-6 text-lg font-bold text-white">Articles liés</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { href: "/blog/creation-site-web-pme", title: "Comment créer un site web professionnel pour PME en 2026", tag: "Site web" },
                { href: "/blog/seo-local-pme", title: "SEO local pour PME : apparaître en 1ère page Google", tag: "SEO" },
                { href: "/blog/refonte-site-web", title: "Refonte de site web : quand et comment le faire", tag: "Refonte" },
              ].map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group rounded-xl border border-white/8 bg-gray-900/50 p-4 transition hover:border-white/16"
                >
                  <span className="mb-2 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-500">
                    {article.tag}
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition">{article.title}</p>
                  <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-400 transition flex items-center gap-1">
                    Lire l'article <FiArrowRight size={11} />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
