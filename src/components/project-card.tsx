"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { PortfolioProject } from "@/data/portfolio";
import { ProjectSceneRender } from "@/components/project-scene";
import { useLocale } from "@/lib/locale";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { isEnglish, prefix } = useLocale();
  const href = prefix ? `${prefix}/projets/${project.slug}` : `/projets/${project.slug}`;
  const gallery = project.mockups?.gallery ?? (project.mockups?.primary ? [project.mockups.primary] : []);
  const hasGallery = gallery.length > 0;
  const primaryMockup = project.mockups?.primary ?? gallery[0];
  const websiteLabel = isEnglish ? "Visit site" : "Voir le site";
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const lightboxId = `project-lightbox-${project.slug}`;
  const previewLabel = isEnglish ? "Preview" : "Visuel";
  const closeLabel = isEnglish ? "Close" : "Fermer";
  const caseStudyLabel = isEnglish ? "Case study" : "Etude de cas";
  const canUseDOM = typeof document !== "undefined";

  useEffect(() => {
    if (!lightboxOpen) return;
    const total = gallery.length;
    const originalOverflow = document.body.style.overflow;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
        return;
      }
      if (total <= 1) return;
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % total);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + total) % total);
      }
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} ${previewLabel}`}
            id={lightboxId}
            onClick={() => setLightboxOpen(false)}
          >
          <div
            className="relative w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:bg-black/90 hover:text-white"
            >
              {closeLabel}
            </button>
            <div className="relative mx-auto w-full max-h-[80vh] aspect-[4/3]">
              <Image
                src={activeImage}
                alt={`${project.name} mockup`}
                fill
                sizes="(min-width: 1024px) 70vw, 90vw"
                className="object-cover"
              />
            </div>
              {gallery.length > 1 && (
                <div className="mt-4 flex items-center justify-between text-white/80">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                    className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] transition hover:border-white hover:text-white"
                  >
                    {isEnglish ? "Prev" : "Precedent"}
                  </button>
                  <p className="text-xs uppercase tracking-[0.3em]">
                    {activeIndex + 1} / {gallery.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((prev) => (prev + 1) % gallery.length)}
                    className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.3em] transition hover:border-white hover:text-white"
                  >
                    {isEnglish ? "Next" : "Suivant"}
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
        className="group relative overflow-hidden rounded-[30px] border border-white/10 p-5 text-white shadow-[0_28px_80px_rgba(2,6,23,0.32)] transition duration-500"
        style={{
          background: `linear-gradient(155deg, ${project.palette.primary} 0%, ${project.palette.secondary} 52%, #08111f 100%)`,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-35 transition duration-500 group-hover:opacity-55"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${project.palette.accent}, transparent 55%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_22%)] opacity-80" />
        <div className="relative flex h-full flex-col gap-5">
          <div className="overflow-hidden rounded-[26px] border border-white/10 bg-black/25 backdrop-blur-sm">
            {primaryMockup ? (
              <div className="relative aspect-[16/10]">
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-[0.62rem] uppercase tracking-[0.34em] text-white/65">
                  <span>{project.type}</span>
                  <span>{project.timeline}</span>
                </div>
                <Image
                  src={primaryMockup}
                  alt={`${project.name} preview`}
                  fill
                  sizes="(min-width: 1024px) 30vw, 90vw"
                  className="object-cover object-top transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.18),transparent_28%,rgba(2,6,23,0.4))]" />
              </div>
            ) : (
              <div className="p-3">
                <ProjectSceneRender project={project} />
              </div>
            )}
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.38em] text-white/50">{project.type}</p>
              <p className="mt-3 text-2xl font-semibold">{project.name}</p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/8 px-3 py-2 text-xs uppercase tracking-[0.28em] text-white/65">
              {project.result}
            </span>
          </div>

          <p className="text-sm leading-7 text-white/72">{project.tagline}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
              <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/45">{isEnglish ? "Scope" : "Perimetre"}</p>
              <p className="mt-3 text-sm leading-6 text-white/75">{project.shortDescription}</p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
              <p className="text-[0.62rem] uppercase tracking-[0.34em] text-white/45">{isEnglish ? "Stack" : "Stack"}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.26em] text-white/62">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="rounded-full border border-white/15 px-3 py-1.5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
            >
              {caseStudyLabel}
              <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
                -&gt;
              </span>
            </Link>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/80 transition hover:border-white hover:bg-white/8 hover:text-white"
              >
                {websiteLabel}
              </a>
            )}
            {hasGallery && (
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(0);
                  setLightboxOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/80 transition hover:border-white hover:bg-white/8 hover:text-white"
                aria-haspopup="dialog"
                aria-controls={lightboxId}
              >
                {previewLabel}
              </button>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-8 right-6 hidden h-28 w-36 rounded-full bg-amber-300/15 blur-3xl md:block" />
      </motion.div>
      {lightbox}
    </>
  );
}
