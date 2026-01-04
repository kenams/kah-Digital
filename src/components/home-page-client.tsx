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
import { portfolioProjectsEn } from "@/data/portfolio.en";
import { assetShots, assetShotsEn } from "@/data/asset-shots";
import type { HomePageData } from "@/data/home";
import { useLocale } from "@/lib/locale";

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
    aiBusinessGuide,
    homeSections,
  } = data;
  const { isEnglish, prefix } = useLocale();
  const assets = isEnglish ? assetShotsEn : assetShots;
  const projects = isEnglish ? portfolioProjectsEn : portfolioProjects;
  const withPrefix = (path: string) => {
    if (!path.startsWith("/")) return path;
    if (path.endsWith(".pdf")) return path;
    if (path.startsWith("/admin")) return path;
    return prefix ? `${prefix}${path}` : path;
  };

  return (
    <div className="lg:flex lg:items-start lg:gap-10">
      <div className="flex-1 space-y-16 sm:space-y-24">
        <section id="hero">
          <HeroSection stats={stats} />
        </section>

        <section id="fast-track" className="section-shell space-y-6">
          <div className="divider-label">{isEnglish ? "Clear offers" : "Offres claires"}</div>
          <div className="premium-card rounded-[32px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {isEnglish ? "Clear offers" : "Offres claires"}
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  {isEnglish ? "3 simple offers to decide fast." : "3 offres claires pour decider vite."}
                </h2>
                <p className="mt-2 text-white/70 max-w-3xl">
                  {isEnglish
                    ? "Clear budgets, timelines, and deliverables to move fast without wasted loops."
                    : "Budgets, delais et livrables clairs pour valider un go sans iterations inutiles."}
                </p>
              </div>
              <Link
                href={withPrefix("/devis")}
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
              >
                {isEnglish ? "Get a quote" : "Demander un devis"}
              </Link>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {fastDeals.map((deal) => (
                <div key={deal.title} className="premium-card rounded-3xl border border-white/15 bg-black/30 p-5 text-sm text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">{deal.stack}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{deal.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-4 text-white/70">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                        {isEnglish ? "Budget" : "Budget"}
                      </p>
                      <p className="text-base font-semibold text-white">{deal.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                        {isEnglish ? "Timeline" : "Delai"}
                      </p>
                      <p className="text-base font-semibold text-white">{deal.timeline}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-white/70">{deal.deliverable}</p>
                  <Link
                    href={withPrefix(deal.href)}
                    className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:text-white"
                  >
                    {isEnglish ? "Learn more" : "En savoir plus"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Reveal>
          <section id="assets" className="section-shell space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-white/60">
                  {isEnglish ? "Assets & visuals" : "Assets & mise en scene"}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-white">
                  {isEnglish ? "A premium asset pack ready to use." : "Un pack d'assets premium pret a utiliser."}
                </h2>
                <p className="mt-2 max-w-3xl text-white/70">
                  {isEnglish
                    ? "Web mockups, mobile scenes, and dashboards ready for press, boards, and decks."
                    : "Mockups web, scenes mobile et dashboards prets pour la presse, les boards et les collections."}
                </p>
              </div>
              <Link
                href={withPrefix("/projets")}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
              >
                {isEnglish ? "See case studies" : "Voir les etudes de cas"}
              </Link>
            </div>
            <AssetGrid assets={assets} />
          </section>
        </Reveal>

        <Reveal>
          <section id="services" className="section-shell space-y-6">
            <div className="divider-label">{isEnglish ? "Signature services" : "Services signature"}</div>
            <div className="accent-section surface-dark">
              <div className="content px-6 py-10">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                      {isEnglish ? "Services" : "Services"}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">
                      {isEnglish
                        ? "Premium websites, e-commerce, and client portals, delivered fast."
                        : "Sites premium, e-commerce et portails prives, livres vite."}
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                      {(isEnglish
                        ? ["Quick audit", "Design system", "Next.js build"]
                        : ["Audit express", "Design system", "Build Next.js"]
                      ).map((item) => (
                        <span key={item} className="rounded-full border border-white/20 px-3 py-1 text-white/70">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={withPrefix("/devis?type=web")}
                    className="hidden rounded-full border border-white/30 px-5 py-2 text-sm text-white/70 transition hover:border-white hover:text-white md:inline-flex"
                  >
                    {isEnglish ? "Discuss a project" : "Parler d'un projet"}
                  </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {services.map((service, index) => (
                    <Reveal key={service.title} delay={index * 0.08}>
                      <motion.div
                        className="premium-card group service-accent dark-card h-full rounded-3xl border border-white/5 p-6 transition duration-500 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_25px_80px_rgba(11,6,32,0.65)]"
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
                    href={withPrefix("/projets")}
                    className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    {isEnglish ? "View portfolio" : "Voir le portfolio"}
                  </Link>
                  <Link
                    href={withPrefix("/devis")}
                    className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                  >
                    {isEnglish ? "Get a quote" : "Demander un devis"}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="apps" className="section-shell space-y-6">
            <div className="divider-label">{isEnglish ? "Apps & MVP" : "Apps & MVP"}</div>
            <div className="premium-card rounded-[40px] border border-white/10 bg-gradient-to-br from-[#0b0a08] via-[#15120e] to-[#1c1711] p-8 text-white shadow-[0_30px_120px_rgba(32,22,8,0.35)] surface-dark">
              <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-white/60">
                    {isEnglish ? "Premium mobile MVP" : "MVP mobile premium"}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    {isEnglish
                      ? "A testable iOS & Android version in a few weeks."
                      : "Une version testable iOS & Android en quelques semaines."}
                  </h2>
                  <p className="mt-3 max-w-2xl text-white/70">
                    {isEnglish
                      ? "React Native + Expo, Supabase, and automations to deliver a clean product, ready to share and pitch."
                      : "React Native + Expo, Supabase et automatisations marketing pour livrer un produit propre, partageable, et pret a etre pitche."}
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
                      href={withPrefix("/devis?type=mvp")}
                      className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
                    >
                      {isEnglish ? "Discuss an MVP" : "Parler d'un MVP"}
                    </Link>
                    <Link
                      href={withPrefix("/configurateur")}
                      className="rounded-full border border-white/30 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
                    >
                      {isEnglish ? "See options" : "Voir les options"}
                    </Link>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mvpStats.map((item) => (
                    <div key={item.label} className="premium-card rounded-3xl border border-white/15 bg-white/5 p-5">
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
                    className="premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white"
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
                  <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
                    {isEnglish ? "Alternate palette" : "Palette alternative"}
                  </p>
                  <h2 className="text-3xl font-semibold text-slate-900">
                    {isEnglish
                      ? "Light mode: warm variant for campaign pages."
                      : "Mode lumiere: declinaison chaude pour les pages campagnes."}
                  </h2>
                  <p className="text-slate-700 max-w-2xl">
                    {isEnglish
                      ? "Cream base, gold accents, and dark type for a premium feel."
                      : "Fond creme, touches or, typographies noires pour une image luxe. Ideal pour beauty, lifestyle, hospitality ou collections capsules."}
                  </p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="mesh-pill text-slate-900">
                      {isEnglish ? "Champagne gradient" : "Gradient champagne"}
                    </span>
                    <span className="mesh-pill text-slate-900">
                      {isEnglish ? "Soft glass cards" : "Cartes verre clair"}
                    </span>
                    <span className="mesh-pill text-slate-900">
                      {isEnglish ? "Space Grotesk type" : "Typo Space Grotesk"}
                    </span>
                  </div>
                </div>
                <Link
                  href={withPrefix("/projets")}
                  className="rounded-full border border-slate-900/20 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-white"
                >
                  {isEnglish ? "See it in action" : "Voir la palette en action"}
                </Link>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {contrastThemes.map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="premium-card rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_15px_50px_rgba(253,150,123,0.35)]"
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
                  href={withPrefix("/devis/mvp")}
                  className="inline-flex items-center rounded-full border border-slate-900/20 px-5 py-2 text-slate-900/80 transition hover:border-slate-900 hover:text-slate-900 hover:bg-white/80"
                >
                  {isEnglish ? "Brief my mobile app" : "Briefer mon app mobile"}
                </Link>
                <Link
                  href={withPrefix("/projets")}
                  className="inline-flex items-center rounded-full border border-slate-900/20 px-5 py-2 text-slate-900/80 transition hover:border-slate-900 hover:text-slate-900 hover:bg-white/80"
                >
                  {isEnglish ? "See delivered MVPs" : "Voir les MVP livres"}
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="portfolio" className="section-shell space-y-6">
            <div className="divider-label">{isEnglish ? "Case studies" : "Etudes de cas"}</div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {isEnglish ? "Portfolio" : "Portfolio"}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  {isEnglish ? "Recent premium projects" : "Projets premium recents"}
                </h2>
                <p className="text-white/60 max-w-2xl">
                  {isEnglish
                    ? "Each case study shows the brief, art direction, and business outcome."
                    : "Chaque etude de cas montre le brief, la direction artistique et le resultat business."}
                </p>
              </div>
              <Link
                href={withPrefix("/projets")}
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-2 text-sm text-white/70 transition hover:border-white hover:text-white"
              >
                {isEnglish ? "View all projects" : "Voir tous les projets"}
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="process" className="section-shell space-y-6">
            <div className="divider-label">{isEnglish ? "Process" : "Process"}</div>
            <div className="accent-section">
              <div className="content px-6 py-10">
                <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                      {isEnglish ? "Process" : "Process"}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">
                      {isEnglish ? "A short, clear, high-level process." : "Un process court, clair et haut niveau."}
                    </h2>
                  </div>
                  <p className="text-white/60 max-w-md">
                    {isEnglish
                      ? "Premium design, fast build, strict QA. You get a senior point of contact at each step."
                      : "Design premium, dev rapide, QA stricte. Tu as un interlocuteur senior a chaque etape."}
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-4">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      className="premium-card process-accent rounded-3xl border border-white/10 bg-white/5 p-6"
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
          <section id="ai-guide" className="section-shell space-y-6">
            <div className="divider-label">{isEnglish ? "AI modules" : "Modules IA"}</div>
            <div className="premium-card rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0b0a08] via-[#15120e] to-[#1c1711] p-8 text-white shadow-[0_30px_120px_rgba(32,22,8,0.35)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                    {isEnglish ? "Premium AI modules" : "Modules IA premium"}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    {isEnglish
                      ? "5 AI modules to improve conversion and save time."
                      : "5 modules IA pour gagner du temps et augmenter la conversion."}
                  </h2>
                  <p className="mt-2 max-w-3xl text-white/70">
                    {isEnglish
                      ? "Automation, assistants, and scoring. We scope the use cases, integrate, secure, and track results."
                      : "Automatisation, assistants et scoring. On cadre les use cases, on integre, on securise et on suit les resultats."}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link
                    href={withPrefix("/devis")}
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200"
                  >
                    {isEnglish ? "Discuss a project" : "Parler d'un projet"}
                  </Link>
                  <Link
                    href={withPrefix("/lexique")}
                    className="rounded-full border border-white/30 px-5 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
                  >
                    {isEnglish ? "Glossary" : "Lexique"}
                  </Link>
                </div>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {aiBusinessGuide.map((item, index) => (
                  <motion.article
                    key={item.title}
                    className="premium-card group relative overflow-hidden rounded-3xl border border-amber-200/30 bg-gradient-to-br from-amber-500/10 via-black/40 to-black/20 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition hover:border-amber-200/60"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,179,106,0.22),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div className="relative overflow-hidden rounded-2xl border border-amber-200/20">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-40 w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-amber-100/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                        {isEnglish ? "Premium AI" : "IA premium"}
                      </div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                        {isEnglish ? "Option" : "Option"} {index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{item.description}</p>
                      <div className="mt-4 grid gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
                        <div>
                          <span className="text-white/40">{isEnglish ? "Pricing" : "Tarif"}</span>
                          <p className="text-sm normal-case text-white/80">{item.pricing}</p>
                        </div>
                        <div>
                          <span className="text-white/40">{isEnglish ? "Timeline" : "Delai"}</span>
                          <p className="text-sm normal-case text-white/80">{item.timeline}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                        {item.tools.map((tool) => (
                          <span key={tool} className="rounded-full border border-white/20 px-3 py-1 text-white/70">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <Link
                  href={withPrefix("/cahier-des-charges")}
                  className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  {isEnglish ? "Project brief PDF" : "Cahier des charges"}
                </Link>
                <Link
                  href={withPrefix("/devis")}
                  className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                >
                  {isEnglish ? "Get a quote" : "Demander un devis"}
                </Link>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="results" className="section-shell space-y-6">
            <div className="divider-label">{isEnglish ? "Results" : "Resultats"}</div>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {isEnglish ? "Before / After" : "Avant / Apres"}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-white">
                  {isEnglish ? "KPIs delivered in the last 6 months." : "KPIs livres ces 6 derniers mois."}
                </h2>
                <p className="text-white/70 max-w-2xl">
                  {isEnglish
                    ? "Concrete gains: conversion, leads, and perceived speed."
                    : "Exemples de gains concrets: conversion, leads et vitesse percue."}
                </p>
              </div>
              <p className="text-sm text-white/60">{isEnglish ? "Swipe to browse" : "Glisser pour parcourir"}</p>
            </div>
            <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-6">
              {resultsShowcase.map((result) => (
                <motion.article
                  key={result.title}
                  className="premium-card min-w-[280px] rounded-3xl border border-white/10 bg-white/5 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
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
                      sizes="(min-width: 1024px) 320px, 70vw"
                      className="h-48 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                        {isEnglish ? "Before / after" : "Avant / apres"}
                      </p>
                      <p className="text-lg font-semibold">{result.title}</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                        {isEnglish ? "Before" : "Avant"}
                      </p>
                      <p className="text-base text-white">{result.before}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                        {isEnglish ? "After" : "Apres"}
                      </p>
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
            <div className="divider-label">{isEnglish ? "Signature pack" : "Pack signature"}</div>
            <div className="premium-card rounded-[32px] border border-white/15 bg-white/5 p-6 text-white shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                    {isEnglish ? "Premium pack" : "Dossier premium"}
                  </p>
                  <h2 className="text-3xl font-semibold">
                    {isEnglish ? "Everything to get a yes in one meeting." : "Tout pour dire oui en une reunion."}
                  </h2>
                  <p className="text-white/70">
                    {isEnglish
                      ? "Clear budget, timeline, and deliverables. Ideal to validate fast with leadership."
                      : "Budget, planning et livrables clairs. Ideal pour valider vite avec un board ou une direction marketing."}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
                    {(isEnglish ? ["Kick-off 48h", "1 point of contact", "Weekly updates"] : ["Kick-off 48h", "1 interlocuteur", "Reporting hebdo"]).map((item) => (
                      <span key={item} className="rounded-full border border-white/20 px-3 py-1 text-white/70">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {closingHighlights.map((item) => (
                      <div key={item.label} className="premium-card rounded-3xl border border-white/10 bg-black/30 p-4">
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
                      {isEnglish ? "Download the pack" : "Telecharger le pack"}
                    </Link>
                    <Link
                      href={withPrefix("/devis")}
                      className="rounded-full border border-white/30 px-5 py-2 text-white/80 transition hover:border-white hover:text-white"
                    >
                      {isEnglish ? "Book a call" : "Programmer un echange"}
                    </Link>
                  </div>
                </div>
                <div className="premium-card rounded-[28px] border border-white/10 bg-gradient-to-br from-[#19140f] to-[#0b0a08] p-5 text-sm text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                    {isEnglish ? "What the PDF includes" : "Ce que contient le PDF"}
                  </p>
                  <ul className="mt-4 space-y-3 text-white/80">
                    {isEnglish ? (
                      <>
                        <li>- Line-item budget (design, dev, QA).</li>
                        <li>- Sprint plan (kick-off to release) with roles.</li>
                        <li>- Onboarding checklist (access, tools, Slack).</li>
                        <li>- Email templates for internal approval.</li>
                        <li>- Direct contacts after validation.</li>
                      </>
                    ) : (
                      <>
                        <li>- Budget ligne par ligne (design, dev, QA).</li>
                        <li>- Plan de sprint (kick-off a recette) avec responsabilites.</li>
                        <li>- Checklist onboarding (acces, outils, Slack prive).</li>
                        <li>- Modeles d&apos;emails pour valider en interne.</li>
                        <li>- Coordonnees directes apres validation.</li>
                      </>
                    )}
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
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                  {isEnglish ? "Shall we talk?" : "On en parle ?"}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-white">
                  {isEnglish ? "Ready to launch a fast premium site?" : "Pret a lancer un site premium et ultra-rapide ?"}
                </h3>
                <p className="mt-3 text-white/70">
                  {isEnglish
                    ? "We scope, design, and deliver. Short process, premium finish, a site that converts."
                    : "On cadre, on design, on livre. Un process court, une finition luxe, un site qui convertit."}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link
                    href={withPrefix("/devis")}
                    className="inline-flex items-center rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200"
                  >
                    {isEnglish ? "Get a quote" : "Demander un devis"}
                  </Link>
                  <Link
                    href={withPrefix("/cahier-des-charges")}
                    className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-white transition hover:border-white"
                  >
                    {isEnglish ? "Project brief" : "Cahier des charges"}
                  </Link>
                </div>
                <ContactCard
                  className="mx-auto mt-8 max-w-xl text-left"
                  title={isEnglish ? "Direct support" : "Conciergerie directe"}
                />
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section id="faq" className="section-shell">
            <div className="divider-label">FAQ</div>
            <div className="mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                {isEnglish ? "Frequently asked questions" : "Questions frequentes"}
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.details
                  key={faq.question}
                  className="premium-card faq-item rounded-3xl p-6"
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

