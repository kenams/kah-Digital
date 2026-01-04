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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] ?? gallery[0];
  const lightboxId = `project-lightbox-${project.slug}`;
  const previewLabel = isEnglish ? "Preview" : "Visuel";
  const closeLabel = isEnglish ? "Close" : "Fermer";
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
        className="premium-card portfolio-card dark-card group relative overflow-hidden rounded-3xl p-6 text-white transition duration-500"
        style={{
          background: `linear-gradient(135deg, ${project.palette.primary}, ${project.palette.secondary})`,
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40 transition duration-500 group-hover:opacity-60"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${project.palette.accent}, transparent 55%)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-30">
          <div className="absolute inset-x-4 top-4 h-px bg-white/40" />
          <div className="absolute inset-y-4 left-4 w-px bg-white/40" />
        </div>
        <div className="relative flex flex-col gap-4">
          <ProjectSceneRender project={project} />
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">{project.type}</p>
          <p className="text-2xl font-semibold">{project.name}</p>
          <p className="text-sm text-white/70">{project.tagline}</p>
          <p className="text-sm text-white/70">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.3em] text-white/60">
            {project.stack.slice(0, 3).map((tech) => (
              <span key={tech} className="rounded-full border border-white/20 px-3 py-1">
                {tech}
              </span>
            ))}
            {project.stack.length > 3 ? <span>+{project.stack.length - 3}</span> : null}
          </div>
          <div className="text-sm font-medium text-white">{project.result}</div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={href}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
            >
              {isEnglish ? "Case study" : "Etude de cas"}
              <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
                -&gt;
              </span>
            </Link>
            {hasGallery && (
              <button
                type="button"
                onClick={() => {
                  setActiveIndex(0);
                  setLightboxOpen(true);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm text-white/80 transition hover:border-white hover:text-white"
                aria-haspopup="dialog"
                aria-controls={lightboxId}
              >
                {previewLabel}
              </button>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-6 right-4 hidden h-32 w-40 rounded-2xl bg-white/20 blur-xl md:block" />
      </motion.div>
      {lightbox}
    </>
  );
}
