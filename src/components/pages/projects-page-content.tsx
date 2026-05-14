"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink, FiMessageCircle } from "react-icons/fi";
import type { PortfolioProject } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";
import { useLocale } from "@/lib/locale";

type Props = {
  locale: Locale;
  projects: PortfolioProject[];
};

const copy = {
  fr: {
    eyebrow: "Réalisations",
    title: "Des projets livrés.",
    titleAccent: "Pas des promesses.",
    body: "Sites premium, SaaS, apps métier. Chaque projet est conçu pour convertir, pas juste pour exister.",
    stats: [
      { value: "30+", label: "Projets livrés" },
      { value: "1–6 sem.", label: "Délai moyen" },
      { value: "100%", label: "Budget respecté" },
      { value: "5★", label: "Satisfaction client" },
    ],
    featuredLabel: "Projet phare",
    viewCase: "Voir l'étude de cas",
    visitSite: "Voir le site",
    cta: "Votre projet est le prochain.",
    ctaSub: "Devis personnalisé sous 24h. Délai clair. Périmètre adapté.",
    ctaBtn: "Démarrer mon projet",
    ctaWa: "WhatsApp direct",
  },
  en: {
    eyebrow: "Portfolio",
    title: "Projects delivered.",
    titleAccent: "Not just promises.",
    body: "Premium sites, SaaS, business apps. Every project is built to convert, not just exist.",
    stats: [
      { value: "30+", label: "Projects delivered" },
      { value: "1–6 wk", label: "Average timeline" },
      { value: "100%", label: "Budget respected" },
      { value: "5★", label: "Client satisfaction" },
    ],
    featuredLabel: "Featured project",
    viewCase: "View case study",
    visitSite: "Visit site",
    cta: "Your project is next.",
    ctaSub: "Free quote in 24h. Clear deadline. Fixed price.",
    ctaBtn: "Start my project",
    ctaWa: "WhatsApp",
  },
  de: {
    eyebrow: "Referenzen",
    title: "Projekte geliefert.",
    titleAccent: "Keine Versprechen.",
    body: "Premium-Websites, SaaS, Business-Apps. Jedes Projekt ist auf Conversion ausgelegt.",
    stats: [
      { value: "30+", label: "Projekte geliefert" },
      { value: "1–6 Wo.", label: "Durchschnittliche Laufzeit" },
      { value: "100%", label: "Budget eingehalten" },
      { value: "5★", label: "Kundenzufriedenheit" },
    ],
    featuredLabel: "Hauptprojekt",
    viewCase: "Fallstudie ansehen",
    visitSite: "Website besuchen",
    cta: "Ihr Projekt ist das nächste.",
    ctaSub: "Kostenloses Angebot in 24h. Klarer Termin. Festpreis.",
    ctaBtn: "Mein Projekt starten",
    ctaWa: "WhatsApp",
  },
} as const;

function FeaturedProjectCard({ project, locale }: { project: PortfolioProject; locale: Locale }) {
  const c = copy[locale];
  const href = locale === "fr" ? `/projets/${project.slug}` : `/${locale}/projets/${project.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative overflow-hidden rounded-[32px] border border-white/10"
      style={{
        background: `linear-gradient(160deg, ${project.palette.primary} 0%, ${project.palette.secondary} 55%, #08111f 100%)`,
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.palette.accent}40, transparent 55%)` }}
      />

      {/* ── Screenshot full-width with browser chrome ── */}
      {project.mockups?.primary && (
        <div className="relative border-b border-white/10">
          {/* Chrome bar */}
          <div className="flex items-center gap-2 bg-black/50 px-5 py-3 backdrop-blur-sm">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/90" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/90" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/90" />
            {project.website && (
              <div className="ml-3 flex-1 overflow-hidden rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-center">
                <span className="text-[0.62rem] font-mono text-white/40">
                  {project.website.replace(/^https?:\/\//, "")}
                </span>
              </div>
            )}
          </div>
          {/* Screenshot */}
          <a
            href={project.website ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group/img relative block aspect-[16/7] overflow-hidden lg:aspect-[21/8]"
          >
            <Image
              src={project.mockups.primary}
              alt={`${project.name} — aperçu du site`}
              fill
              priority
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {/* Badges overlaid */}
            <div className="absolute left-5 top-4 flex items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                style={{ background: `${project.palette.accent}30`, color: project.palette.accent, border: `1px solid ${project.palette.accent}45` }}
              >
                {c.featuredLabel}
              </span>
              <span className="rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white/60 backdrop-blur-sm">
                {project.timeline}
              </span>
            </div>
            {/* Hover visit overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover/img:bg-black/30">
              <div className="flex translate-y-3 items-center gap-2 rounded-full border border-white/30 bg-black/60 px-5 py-2.5 text-sm font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/img:translate-y-0 group-hover/img:opacity-100">
                <FiExternalLink size={14} /> {c.visitSite}
              </div>
            </div>
          </a>
        </div>
      )}

      {/* ── Content below screenshot ── */}
      <div className="relative z-10 grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_260px] lg:gap-10 lg:p-12">
        {/* Left: title + description + CTAs */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              {project.name}
            </h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/40">{project.type}</p>
            <p className="mt-4 text-base leading-relaxed text-white/70 lg:text-lg">{project.tagline}</p>
          </div>
          {/* Stack */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">
                {tech}
              </span>
            ))}
          </div>
          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-white/90"
            >
              {c.viewCase} <FiArrowRight size={14} />
            </Link>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white hover:text-white"
              >
                {c.visitSite} <FiExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Right: metrics */}
        <div className="grid grid-cols-3 gap-3 self-start lg:grid-cols-1">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
              <p className="text-xl font-black lg:text-2xl" style={{ color: project.palette.accent }}>
                {m.value}
              </p>
              <p className="mt-1 text-[0.62rem] uppercase tracking-wider text-white/40">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsPageContent({ locale, projects }: Props) {
  const c = copy[locale];
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden border-b border-white/6 pb-16 pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[100px]" />
        <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-violet-600/10 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-5 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400">
              {c.eyebrow}
            </span>
            <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              {c.title}<br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {c.titleAccent}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-gray-400 lg:text-xl">{c.body}</p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {c.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/8 bg-white/4 p-5 backdrop-blur-sm"
              >
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED PROJECT ─── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {featured && <FeaturedProjectCard project={featured} locale={locale} />}
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/8" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">Autres projets</span>
          <div className="h-px flex-1 bg-white/8" />
        </div>
      </div>

      {/* ─── GRID ─── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {rest.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} />
          ))}
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="border-t border-white/6 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-blue-600/15 via-violet-600/10 to-transparent p-12"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{c.cta}</h2>
              <p className="mt-4 text-lg text-gray-400">{c.ctaSub}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href={withLocalePrefix("/devis", locale)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
                >
                  {c.ctaBtn} <FiArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/33759558414?text=Bonjour%2C%20j'ai%20vu%20vos%20réalisations%20et%20j'aimerais%20discuter%20d'un%20projet."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
                >
                  <FiMessageCircle size={16} /> {c.ctaWa}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
