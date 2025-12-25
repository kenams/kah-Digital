"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { PortfolioProject } from "@/data/portfolio";
import { ProjectSceneRender } from "@/components/project-scene";

type ProjectCardProps = {
  project: PortfolioProject;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="portfolio-card dark-card group relative overflow-hidden rounded-3xl p-6 text-white transition duration-500"
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
        <Link
          href={`/projets/${project.slug}`}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-sm text-white transition hover:border-white hover:bg-white/10"
        >
          Étude de cas
          <span aria-hidden="true" className="transition duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
      <div className="pointer-events-none absolute -bottom-6 right-4 hidden h-32 w-40 rounded-2xl bg-white/20 blur-xl md:block" />
    </motion.div>
  );
}
