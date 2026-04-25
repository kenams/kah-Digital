"use client";

import Link from "next/link";
import { FiArrowRight, FiAlertTriangle, FiTrendingDown, FiClock, FiEyeOff } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ProblemSection() {
  const { locale, prefix } = useLocale();

  const copy = {
    fr: {
      eyebrow: "Le problème que beaucoup ignorent",
      title: "Un site beau ne suffit pas. Il doit convertir.",
      body: "Un site mal structuré, une application confuse ou un support désorganisé coûtent des clients chaque semaine — sans que vous vous en rendiez forcément compte.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Votre site ne génère pas de prospects",
          desc: "Sans appel à l'action clair, sans SEO et sans tunnel de conversion, les visiteurs repartent sans jamais vous contacter.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Vous êtes invisible sur Google",
          desc: "Un site sans structure technique SEO ne remonte pas dans les résultats. Vos concurrents, eux, y sont.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Votre équipe perd du temps",
          desc: "Des processus manuels, des outils mal connectés ou un support client sans assistant font perdre des heures chaque semaine.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "Votre image digitale ne rassure pas",
          desc: "Un site vieillissant ou non adapté mobile fait fuir des clients potentiels avant même qu'ils aient lu votre offre.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH-Digital transforme ces problèmes en solutions concrètes, mesurables et livrées dans les délais.",
      cta: "Voir comment on travaille",
    },
    en: {
      eyebrow: "The problem many businesses overlook",
      title: "A beautiful site isn't enough. It has to convert.",
      body: "A poorly structured site, a confusing app, or disorganised support costs you customers every week — often without you even noticing.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Your site generates no leads",
          desc: "Without a clear call to action, SEO, and a conversion funnel, visitors leave without ever contacting you.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "You're invisible on Google",
          desc: "A site without solid SEO structure won't rank. Your competitors, meanwhile, are right there.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Your team loses time",
          desc: "Manual processes, poorly connected tools, or a support system without an assistant waste hours every week.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "Your digital image doesn't inspire trust",
          desc: "An outdated or non-mobile-friendly site drives away potential clients before they even read your offer.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH-Digital turns these problems into concrete, measurable solutions — delivered on time.",
      cta: "See how we work",
    },
    de: {
      eyebrow: "Das Problem, das viele ignorieren",
      title: "Eine schoene Website reicht nicht. Sie muss konvertieren.",
      body: "Eine schlecht strukturierte Website, eine unuebersichtliche App oder ein desorganisierter Support kostet jede Woche Kunden — oft ohne dass Sie es merken.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Ihre Website generiert keine Anfragen",
          desc: "Ohne klaren Call-to-Action, SEO und Conversion-Funnel verlassen Besucher die Seite, ohne Kontakt aufzunehmen.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Sie sind auf Google unsichtbar",
          desc: "Eine Website ohne solide SEO-Struktur wird nicht gefunden. Ihre Konkurrenten hingegen schon.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Ihr Team verliert Zeit",
          desc: "Manuelle Prozesse, schlecht verknuepfte Tools oder Support ohne Assistent verschwenden jede Woche Stunden.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "Ihr digitales Image schafft kein Vertrauen",
          desc: "Eine veraltete oder nicht mobilfreundliche Website schreckt potenzielle Kunden ab, bevor sie Ihr Angebot gelesen haben.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH-Digital verwandelt diese Probleme in konkrete, messbare Lösungen — termingerecht geliefert.",
      cta: "Unsere Methode ansehen",
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="bg-gray-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-400">
            {copy.eyebrow}
          </span>
          <h2 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">{copy.body}</p>
        </div>

        {/* Problem cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {copy.problems.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-white/8 bg-gray-900/60 p-6 transition-all hover:border-white/16 hover:bg-gray-900"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${p.color}18` }}
              >
                <p.icon size={20} style={{ color: p.color }} />
              </div>
              <h3 className="mb-2 font-semibold text-white">{p.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Solution bridge */}
        <div className="mt-12 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 to-violet-950/40 p-8 text-center">
          <p className="mb-6 text-lg font-medium text-white">{copy.solution}</p>
          <Link
            href={withPrefix("/services")}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
          >
            {copy.cta}
            <FiArrowRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
}
