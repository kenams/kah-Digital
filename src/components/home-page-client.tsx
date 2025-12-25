"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AssetGrid } from "@/components/asset-grid";
import { HeroSection } from "@/components/hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { Testimonials } from "@/components/testimonials";
import { FloatingCTA } from "@/components/floating-cta";
import { StickyTimelineIndicator } from "@/components/sticky-timeline-indicator";
import { ContactCard } from "@/components/contact-card";
import { portfolioProjects } from "@/data/portfolio";
import { assetShots } from "@/data/asset-shots";
import type { HomePageData } from "@/data/home";

type HomePageClientProps = {
  data: HomePageData;
};

export function HomePageClient({ data }: HomePageClientProps) {
  const {
    services,
    mvpPills,
    mvpStats,
    mvpServices,
    contrastThemes,
    processSteps,
    faqs,
    stats,
    fastDeals,
    closingHighlights,
    resultsShowcase,
    homeSections,
  } = data;

  return (
    <div className="lg:flex lg:items-start lg:gap-10">
      <div className="flex-1 space-y-24">
        <section id="hero">
          <HeroSection stats={stats} />
        </section>

        <section id="fast-track" className="section-shell space-y-6">
          <div className="divider-label">Clients pressés</div>
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Fast deals</p>
                <h2 className="mt-3 text-3xl font-semibold">3 scénarios prêts à signer.</h2>
                <p className="mt-2 text-white/70 max-w-3xl">
                  Budgets et délais annoncés, stack validée et livrables clairs pour convaincre un board ou décrocher un
                  go en une réunion.
                </p>
              </div>
              <Link
                href="/devis"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                Bloquer un créneau
              </Link>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {fastDeals.map((deal) => (
                <div key={deal.title} className="rounded-3xl border border-white/15 bg-black/30 p-5 text-sm text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">{deal.stack}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{deal.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-white/70">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Budget</p>
                      <p className="text-base font-semibold text-white">{deal.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Délai</p>
                      <p className="text-base font-semibold text-white">{deal.timeline}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-white/70">{deal.deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Reveal>
          <section id="assets" className="section-shell space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/60">Assets & maquettes</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Un pack d’assets prêt à décliner.</h2>
              <p className="mt-2 max-w-3xl text-white/70">
                On livre les mockups web, les scènes mobile et les dashboards prêtés à la presse ou aux investisseurs.
                Chaque case contient déjà un storytelling Figma-like pour alimenter portfolio, deck et onboarding.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
            >
              Explorer toutes les études de cas
            </Link>
          </div>
          <AssetGrid assets={assetShots} />
          </section>
        </Reveal>

        <Reveal>
<section id="services" className="section-shell space-y-6">
          <div className="divider-label">Services web</div>
          <div className="accent-section surface-dark">
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
                      className="group service-accent dark-card h-full rounded-3xl border border-white/5 p-6 transition duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_25px_80px_rgba(11,6,32,0.65)]"
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
              <div className="mt-8 flex flex-wrap gap-4 text-sm">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  Voir des exemples précis
                </Link>
                <Link
                  href="/devis"
                  className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  Lancer un devis express
                </Link>
              </div>
            </div>
          </div>
        </section>
        </Reveal>

        <Reveal>
          <section id="apps" className="section-shell space-y-6">
          <div className="divider-label">Apps & MVP</div>
          <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-[#0b0d1f] via-[#161333] to-[#271544] p-8 text-white shadow-[0_30px_120px_rgba(58,24,99,0.35)] surface-dark">
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/60">Apps mobiles MVP</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  Une version testable, iOS & Android, en quelques semaines.
                </h2>
                <p className="mt-3 max-w-2xl text-white/70">
                  On mêle React Native + Expo, Supabase et automatisations marketing pour livrer un produit prêt à être partagé (TestFlight / Android Beta) tout en fournissant la landing et le kit pitch.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                  {mvpPills.map((pill) => (
                    <span key={pill} className="rounded-full border border-white/30 px-4 py-1 text-white/80">
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
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
              <div className="grid gap-4 sm:grid-cols-2">
                {mvpStats.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/15 bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                    <p className="text-sm text-white/60">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {mvpServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <p className="text-xl font-semibold">{service.title}</p>
                  <p className="mt-2 text-white/70">{service.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/70">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="text-white/40">-</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
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
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <Link
                href="/devis/mvp"
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
              >
                Briefer mon app mobile
              </Link>
              <Link
                href="/projets"
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
              >
                Voir les MVP livrés
              </Link>
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

        <Reveal>
          <section id="results" className="section-shell space-y-6">
            <div className="divider-label">Résultats</div>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Avant / Après</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">KPIs livrés ces 6 derniers mois.</h2>
                <p className="text-white/70 max-w-2xl">
                  Visuels pris dans nos workspaces (Unsplash) pour illustrer les MVP testés : trafic, conversion,
                  adoption bêta.
                </p>
              </div>
              <p className="text-sm text-white/60">Glisser pour parcourir</p>
            </div>
            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-6">
              {resultsShowcase.map((result) => (
                <motion.article
                  key={result.title}
                  className="min-w-[280px] rounded-3xl border border-white/10 bg-white/5 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={result.image}
                      alt={result.title}
                      width={480}
                      height={320}
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">Avant / après</p>
                      <p className="text-lg font-semibold">{result.title}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Avant</p>
                      <p className="text-base text-white">{result.before}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Après</p>
                      <p className="text-base text-white">{result.after}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        </Reveal>

        <div id="testimonials">
          <Testimonials />
        </div>

        <Reveal>
          <section id="closing" className="section-shell space-y-6">
            <div className="divider-label">Pack closing</div>
            <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 text-white shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">PDF premium</p>
                  <h2 className="text-3xl font-semibold">Tout pour dire “oui” en une réunion.</h2>
                  <p className="text-white/70">
                    Le pack closing rassemble l’estimation budgétaire, le plan de sprint et la check‑list des livrables.
                    Idéal pour un board pressé ou un fondateur qui veut signer sans itération infinie.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {closingHighlights.map((item) => (
                      <div key={item.label} className="rounded-3xl border border-white/10 bg-black/30 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.label}</p>
                        <p className="mt-2 text-xl font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <Link
                      href="/pack-closing.pdf"
                      className="rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200"
                    >
                      Télécharger le pack
                    </Link>
                    <Link
                      href="/devis"
                      className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                    >
                      Programmer un échange
                    </Link>
                  </div>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-[#201f3d] to-[#0c0c1b] p-5 text-sm text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">Ce que contient le PDF</p>
                  <ul className="mt-4 space-y-3 text-white/80">
                    <li>• Budget ligne par ligne (design, dev, QA).</li>
                    <li>• Plan de sprint (kick-off → recette) avec responsabilités.</li>
                    <li>• Checklist onboarding (accès, outils, Slack privé).</li>
                    <li>• Modèles d’emails pour valider en interne.</li>
                    <li>• Coordonnées directe (tel/email) ajoutées dès validation.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="cta" className="section-shell">
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
              <ContactCard className="mx-auto mt-8 max-w-xl text-left" title="Coordonnées directes" />
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
      <div className="sticky top-32 hidden lg:block lg:w-72">
        <StickyTimelineIndicator sections={homeSections} />
      </div>
    </div>
  );
}
