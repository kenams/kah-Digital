"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiArrowRight, FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { PortfolioProject } from "@/data/portfolio";
import { ProjectSceneRender } from "@/components/project-scene";
import { useLocale } from "@/lib/locale";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

const NUMBERS = ["01", "02", "03", "04", "05", "06"];

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { locale, prefix } = useLocale();
  const href = prefix ? `${prefix}/projets/${project.slug}` : `/projets/${project.slug}`;
  const gallery = project.mockups?.gallery ?? (project.mockups?.primary ? [project.mockups.primary] : []);
  const hasGallery = gallery.length > 0;
  const primaryMockup = project.mockups?.primary ?? gallery[0];
  const num = NUMBERS[index] ?? `0${index + 1}`;

  const copy = {
    fr: { website: "Voir le site", close: "Fermer", caseStudy: "Étude de cas", prev: "Préc.", next: "Suiv.", stack: "Stack" },
    en: { website: "Visit site", close: "Close", caseStudy: "Case study", prev: "Prev", next: "Next", stack: "Stack" },
    de: { website: "Website", close: "Schliessen", caseStudy: "Case Study", prev: "Zurück", next: "Weiter", stack: "Stack" },
  }[locale];

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const lightboxId = `project-lightbox-${project.slug}`;
  const canUseDOM = typeof document !== "undefined";

  useEffect(() => {
    if (!lightboxOpen) return;
    const originalOverflow = document.body.style.overflow;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight" && gallery.length > 1) setActiveIndex((p) => (p + 1) % gallery.length);
      if (e.key === "ArrowLeft" && gallery.length > 1) setActiveIndex((p) => (p - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [lightboxOpen, gallery.length]);

  const lightbox =
    lightboxOpen && activeImage && canUseDOM
      ? createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            id={lightboxId}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 transition hover:text-white"
              >
                <FiX size={16} /> {copy.close}
              </button>
              <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image src={activeImage} alt={`${project.name} preview`} fill sizes="90vw" className="object-cover" />
              </div>
              {gallery.length > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button onClick={() => setActiveIndex((p) => (p - 1 + gallery.length) % gallery.length)}
                    className="flex items-center gap-1 rounded-full border border-white/20 px-4 py-2 text-xs text-white/70 transition hover:text-white">
                    <FiChevronLeft size={14} /> {copy.prev}
                  </button>
                  <p className="text-xs text-white/40">{activeIndex + 1} / {gallery.length}</p>
                  <button onClick={() => setActiveIndex((p) => (p + 1) % gallery.length)}
                    className="flex items-center gap-1 rounded-full border border-white/20 px-4 py-2 text-xs text-white/70 transition hover:text-white">
                    {copy.next} <FiChevronRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <motion.div
        className="group relative overflow-hidden rounded-[28px] border border-white/8 transition-all duration-500 hover:border-white/20 hover:shadow-2xl"
        style={{
          background: `linear-gradient(145deg, ${project.palette.primary} 0%, ${project.palette.secondary} 55%, #060d1a 100%)`,
        }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        whileHover={{ y: -4 }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-500 group-hover:opacity-50"
          style={{ background: `radial-gradient(circle at 20% 20%, ${project.palette.accent}, transparent 55%)` }}
        />

        {/* Number badge */}
        <div className="absolute right-5 top-5 z-10 text-5xl font-black leading-none text-white/5 select-none transition-all duration-500 group-hover:text-white/10">
          {num}
        </div>

        <div className="relative flex h-full flex-col gap-0">

          {/* Visual */}
          <div className="overflow-hidden rounded-t-[26px] border-b border-white/8">
            {primaryMockup ? (
              <>
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-white/8 bg-black/60 px-4 py-2.5 backdrop-blur-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
                  <div className="ml-2.5 flex-1 overflow-hidden rounded border border-white/8 bg-white/5 px-2.5 py-0.5 text-center">
                    <span className="truncate text-[0.55rem] font-mono text-white/35">
                      {project.website?.replace(/^https?:\/\//, "") ?? `${project.slug}.vercel.app`}
                    </span>
                  </div>
                </div>
                {/* Screenshot */}
                <div className="relative aspect-[16/9]">
                  <div className="absolute right-2.5 top-2.5 z-10">
                    <span className="rounded-full border border-white/15 bg-black/50 px-2 py-0.5 text-[0.55rem] uppercase tracking-widest text-white/55 backdrop-blur-sm">
                      {project.timeline}
                    </span>
                  </div>
                  <Image
                    src={primaryMockup}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(2,6,23,0.65))]" />
                </div>
              </>
            ) : (
              <div className="relative bg-black/20">
                <div className="absolute inset-x-0 top-3 z-10 flex items-center justify-between px-4">
                  <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[0.6rem] uppercase tracking-widest text-white/60 backdrop-blur-sm">
                    {project.type}
                  </span>
                  <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[0.6rem] uppercase tracking-widest text-white/60 backdrop-blur-sm">
                    {project.timeline}
                  </span>
                </div>
                <div className="p-4">
                  <ProjectSceneRender project={project} />
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-5 p-6">
            {/* Title */}
            <div>
              <h2 className="text-2xl font-black text-white transition-colors group-hover:text-white">
                {project.name}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-white/55">{project.tagline}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2">
              {project.metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="rounded-xl border border-white/8 bg-black/20 p-3 text-center backdrop-blur-sm">
                  <p className="text-base font-black" style={{ color: project.palette.accent }}>{m.value}</p>
                  <p className="mt-0.5 text-[0.58rem] uppercase tracking-wider text-white/35">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-full border border-white/12 px-2.5 py-1 text-[0.65rem] text-white/50">
                  {tech}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              <Link
                href={href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-white/90"
              >
                {copy.caseStudy} <FiArrowRight size={13} />
              </Link>
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  {copy.website} <FiExternalLink size={12} />
                </a>
              )}
              {hasGallery && (
                <button
                  type="button"
                  onClick={() => { setActiveIndex(0); setLightboxOpen(true); }}
                  aria-haspopup="dialog"
                  aria-controls={lightboxId}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  Preview
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom glow blur */}
        <div
          className="pointer-events-none absolute -bottom-6 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-full blur-2xl opacity-20 transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: project.palette.accent }}
        />
      </motion.div>
      {lightbox}
    </>
  );
}
