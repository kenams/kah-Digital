"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HeroSection } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Testimonials } from "@/components/testimonials";
import { FloatingCTA } from "@/components/floating-cta";
import { portfolioProjects } from "@/data/portfolio";

const services = [
  {
    title: "Site vitrine premium",
    description:
      "Positionnement, storytelling, preuves sociales et CTA clairs pour que ta marque soit comprise en quelques secondes.",
    tech: "Next.js + Tailwind = site rapide, SEO friendly et flexible.",
    animations: true,
  },
  {
    title: "E-commerce & abonnements",
    description:
      "Parcours d’achat fluide, paiement Stripe/Commerce Layer sécurisé, logistique et CRM reliés pour gérer produits, box ou services.",
    tech: "Stripe, Commerce Layer, Shopify headless, automatisations marketing.",
  },
  {
    title: "Plateforme / web app",
    description:
      "Portails clients, configurateurs, dashboards internes ou SaaS marketing : on pilote UX, front et intégrations API.",
    tech: "Next.js App Router, API routes, auth, stockage et webhooks.",
  },
  {
    title: "Landing & optimisation continue",
    description:
      "Pages de campagne, expérimentations growth et forfaits mensuels (SEO, Core Web Vitals, contenus, sécurité).",
    tech: "Framer Motion, analytics embarqués, monitoring Vercel + audits réguliers.",
  },
];

const mvpServices = [
  {
    title: "MVP mobile produit",
    description:
      "Prototype iOS/Android pour tester ton idée : onboarding, profils, fil d’actualité ou réservation intégrés en un sprint.",
    tech: "React Native + Expo, Supabase/Postgres, Auth, push notifications, monitoring Sentry.",
  },
  {
    title: "App commerce & abonnements",
    description:
      "Tunnel mobile optimisé (catalogue, panier, paiement, fidélité) pour lancer une box, une place de marché ou un service premium.",
    tech: "Stripe, Lemon Squeezy, Commerce Layer, Wallet Apple/Google, automatisations CRM.",
  },
  {
    title: "App interne / field",
    description:
      "Outils mobiles pour équipes terrain : collecte de données, checklist, signature, synchronisation offline-first.",
    tech: "Expo + SQLite/Supabase, workflows Make/Zapier, dashboards Next.js pour les managers.",
  },
  {
    title: "Kit pitch + landing",
    description:
      "Landing et deck investisseur assortis à ton MVP mobile pour convaincre fonds, partenaires ou clients pilotes.",
    tech: "Next.js marketing, Framer Motion, Notion/Slides, analytics embarqués (Plausible/PostHog).",
  },
];

const contrastThemes = [
  {
    title: "Palette lumière",
    detail: "Fond crème, typographies noires, touches corail pour rompre avec le mode nuit.",
  },
  {
    title: "Landing chaude",
    detail: "Gradient pêche/rose parfait pour des offres coaching, beauty ou lifestyle.",
  },
  {
    title: "Support print",
    detail: "Déclinaison couleur claire pour les slides pitch ou brochures PDF.",
  },
];

const processSteps = [
  {
    title: "Brief",
    detail:
      "On clarifie ton objectif, tes cibles et les pages nécessaires. Tu peux répondre à un questionnaire simple.",
  },
  { title: "Design", detail: "Moodboard, UI premium et prototypes interactifs validés ensemble." },
  {
    title: "Développement",
    detail: "Next.js + Tailwind pour un site rapide, responsive et facile à maintenir.",
  },
  {
    title: "Livraison",
    detail: "Recette complète, formation, doc Notion et 30 jours de support inclus.",
  },
];

const faqs = [
  {
    question: "Combien de temps pour livrer un projet (site ou app MVP) ?",
    answer:
      "Pour un site vitrine ou une landing, compte 3 à 4 semaines. Un e-commerce ou une plateforme nécessite 4 à 6 semaines. Un MVP mobile (React Native + Expo) sort en 4 semaines avec un premier build TestFlight/Android Beta.",
  },
  {
    question: "Fournissez-vous les textes et visuels ?",
    answer:
      "Oui. Nous pouvons t’aider pour la rédaction, les photos ou la vidéo. Objectif : un message clair même si tu n’as rien sous la main.",
  },
  {
    question: "Comment se passe le suivi ?",
    answer:
      "On ouvre un espace Notion + Slack (ou WhatsApp) avec les étapes, retours et validations. Tu vois l’avancement en temps réel pour la partie site ET pour l’app MVP.",
  },
  {
    question: "Pouvez-vous gérer hébergement, stores et analytics ?",
    answer:
      "Côté web : Vercel + monitoring, SEO, backups. Côté mobile : configuration Apple/Google, push, analytics embarqués (PostHog, Sentry) et support publication.",
  },
  {
    question: "Que se passe-t-il après la mise en ligne ?",
    answer:
      "On reste disponible 30 jours pour ajuster site ou app. Ensuite tu peux garder un forfait maintenance ou piloter en interne avec la doc fournie.",
  },
];

const stats = [
  { label: "Projets livres", value: "65+" },
  { label: "NPS moyen", value: "9.6/10" },
  { label: "Delai moyen", value: "4 semaines" },
];

export default function Home() {
  return (
    <div className="space-y-24">
      <HeroSection stats={stats} />

      <Reveal>
<section id="services" className="section-shell space-y-6">
          <div className="divider-label">Services web</div>
          <div className="accent-section">
            <div className="content px-6 py-10">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">Services</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Apps mobiles MVP, tunnels commerce et kits pitch livrés vite.
                  </h2>
                </div>
                <Link
                  href="/devis?type=web"
                  className="hidden rounded-full border border-white/30 px-5 py-2 text-sm text-white/70 transition hover:border-white hover:text-white md:inline-flex"
                >
                  Parler d’un projet
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {services.map((service, index) => (
                  <Reveal key={service.title} delay={index * 0.08}>
                    <motion.div
                      className="group service-accent h-full rounded-3xl border border-white/5 p-6 transition duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_25px_80px_rgba(11,6,32,0.65)]"
                      whileHover={{ y: -6, rotateX: 2 }}
                    >
                      <p className="text-xl font-semibold text-white">{service.title}</p>
                      <p className="mt-3 text-white/70">{service.description}</p>
                      <div className="mt-4 text-xs uppercase tracking-[0.3em] text-white/50">
                        {service.tech}
                      </div>
                      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="apps" className="section-shell space-y-6">
          <div className="divider-label">Apps & MVP</div>
          <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-[#0c0c2e] via-[#1b0f3f] to-[#2d1a58] p-8 text-white shadow-[0_30px_120px_rgba(76,34,125,0.35)]">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/60">Apps mobiles MVP</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Un univers dédié pour lancer ton application iOS/Android.
                </h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  React Native + Expo, Supabase, auth, paiement, push notifications, monitoring. On construit un premier
                  produit prêt à être testé (TestFlight / Android Beta) tout en livrant la landing et le deck pour le
                  pitcher.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/devis?type=mvp"
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
                >
                  Parler d’un MVP
                </Link>
                <Link
                  href="/configurateur"
                  className="rounded-full border border-white/30 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
                >
                  Voir les options
                </Link>
              </div>
            </div>
              <div className="grid gap-6 md:grid-cols-2">
                {mvpServices.map((service, index) => (
                  <Reveal key={service.title} delay={index * 0.08}>
                    <motion.div
                      className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      whileHover={{ translateY: -6, scale: 1.01 }}
                    >
                      <p className="text-xl font-semibold text-white">{service.title}</p>
                      <p className="mt-3 text-white/80">{service.description}</p>
                      <div className="mt-4 text-xs uppercase tracking-[0.3em] text-white/60">{service.tech}</div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="studio-lumiere" className="section-shell">
          <div className="rounded-[42px] border border-amber-100/60 bg-gradient-to-br from-[#fff3e4] via-[#ffe5f0] to-[#ffd4cb] p-10 text-slate-900 shadow-[0_30px_120px_rgba(255,189,170,0.35)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Palette alternative</p>
                <h2 className="text-3xl font-semibold text-slate-900">
                  Mode lumière : une déclinaison chaude pour les pages campagnes.
                </h2>
                <p className="text-slate-700 max-w-2xl">
                  On conserve les fondations techniques (Next.js + Tailwind) mais on crée une atmosphère claire à base de
                  crème, corail et touches encre noire. Idéal pour les secteurs beauty, coaching, luxe ou les moments où tu
                  veux sortir du “full dark mode”.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="mesh-pill text-slate-900">Gradient pêche</span>
                  <span className="mesh-pill text-slate-900">Cartes verre clair</span>
                  <span className="mesh-pill text-slate-900">Typo Space Grotesk</span>
                </div>
              </div>
              <Link
                href="/projets"
                className="rounded-full border border-slate-900/20 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-white"
              >
                Voir la palette en action
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {contrastThemes.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_15px_50px_rgba(253,150,123,0.35)]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{`0${index + 1}`}</p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-slate-700">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="portfolio" className="section-shell space-y-6">
          <div className="divider-label">Exemples de projets</div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">Portfolio</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Exemples de projets</h2>
              <p className="text-white/60 max-w-2xl">
                Chaque étude de cas raconte le défi, la solution et les outils. Objectif : te projeter sur ton app mobile
                ou MVP sans te perdre dans le jargon.
              </p>
            </div>
            <Link
              href="/projets"
              className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-sm text-white/70 transition hover:border-white hover:text-white"
            >
              Voir tous les projets
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {portfolioProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="process" className="section-shell space-y-6">
          <div className="divider-label">Process</div>
          <div className="accent-section">
            <div className="content px-6 py-10">
              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">Process</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Comment on travaille (sans théories compliquées)
                  </h2>
                </div>
                <p className="text-white/60 max-w-md">
                  Le trio Next.js + Tailwind + Vercel nous permet de livrer vite, d’être performants et d’ajouter un CMS,
                  un paiement, une base produit ou une intégration métier dès que tu en as besoin.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    className="process-accent rounded-3xl border border-white/10 bg-white/5 p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ translateY: -6 }}
                  >
                    <span className="text-sm text-white/60">0{index + 1}</span>
                    <p className="mt-4 text-xl font-semibold">{step.title}</p>
                    <p className="mt-3 text-white/70">{step.detail}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Testimonials />

      <Reveal>
        <section className="section-shell">
          <div className="accent-section">
            <div className="content px-6 py-12 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">On en parle ?</p>
              <h3 className="mt-4 text-3xl font-semibold text-white">
                Prêt à lancer ton application mobile MVP ?
              </h3>
              <p className="mt-3 text-white/70">
                On t’aide à cadrer la version 1, la designer et la développer pour tester ton marché sans perdre de temps.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/devis"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200"
                >
                  Devis express
                </Link>
                <Link
                  href="/cahier-des-charges"
                  className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-white transition hover:border-white"
                >
                  Cahier des charges
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="faq" className="section-shell">
          <div className="divider-label">FAQ</div>
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">FAQ</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={faq.question}
                className="faq-item rounded-3xl p-6"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <summary className="cursor-pointer text-lg font-semibold text-white">
                  {faq.question}
                </summary>
                <p className="mt-3 text-white/70">{faq.answer}</p>
              </motion.details>
            ))}
          </div>
        </section>
      </Reveal>

      <FloatingCTA />
    </div>
  );
}
