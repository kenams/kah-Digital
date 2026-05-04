"use client";

import Link from "next/link";
import { FiArrowRight, FiAlertTriangle, FiTrendingDown, FiClock, FiEyeOff } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

export function ProblemSection() {
  const { locale, prefix } = useLocale();

  const copy = {
    fr: {
      eyebrow: "Vous vous reconnaissez ?",
      title: "Vous avez une idée ou un projet, mais pas encore l'outil digital pour le lancer.",
      body: "C'est là que j'interviens. Que vous partiez de zéro ou que vous ayez besoin de refaire ce qui existe, je vous accompagne de l'idée à la mise en ligne.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Pas de site professionnel",
          desc: "Vous existez, mais personne ne peut vous trouver ni vous comprendre en ligne. Vos concurrents, eux, y sont.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Votre offre est difficile à comprendre",
          desc: "Votre page actuelle ne dit pas clairement ce que vous faites, pour qui, et pourquoi vous contacter.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Votre projet d'app est bloqué",
          desc: "Vous avez une idée d'application ou de SaaS mais vous ne savez pas par où commencer ni combien ça coûte.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "Pas de page pour convertir",
          desc: "Vous faites de la pub, mais vous n'avez pas de landing page claire pour transformer les visiteurs en clients.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH-Digital vous accompagne de l'idée jusqu'à la mise en ligne avec une solution claire, propre et adaptée à votre budget.",
      cta: "Voir comment ça se passe",
    },
    en: {
      eyebrow: "Do you recognise yourself?",
      title: "You have an idea or project, but no digital tool to launch it yet.",
      body: "That's where I come in. Whether you're starting from scratch or need to rebuild what exists, I guide you from idea to launch.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "No professional website",
          desc: "You exist, but nobody can find or understand you online. Your competitors are already there.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Your offer is hard to understand",
          desc: "Your current page doesn't clearly say what you do, for whom, and why to contact you.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Your app project is stuck",
          desc: "You have an app or SaaS idea but don't know where to start or what it would cost.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "No conversion page",
          desc: "You run ads but have no clear landing page to turn visitors into clients.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH-Digital guides you from idea to launch with a clear, clean solution adapted to your budget.",
      cta: "See how it works",
    },
    de: {
      eyebrow: "Erkennen Sie sich wieder?",
      title: "Sie haben eine Idee oder ein Projekt, aber noch kein digitales Werkzeug, um es zu starten.",
      body: "Genau hier komme ich ins Spiel. Ob Sie bei null anfangen oder etwas erneuern möchten — ich begleite Sie von der Idee bis zum Launch.",
      problems: [
        {
          icon: FiTrendingDown,
          title: "Keine professionelle Website",
          desc: "Sie existieren, aber niemand kann Sie online finden oder verstehen. Ihre Mitbewerber sind schon da.",
          color: "#ef4444",
        },
        {
          icon: FiEyeOff,
          title: "Ihr Angebot ist schwer zu verstehen",
          desc: "Ihre aktuelle Seite sagt nicht klar, was Sie tun, für wen und warum man Sie kontaktieren sollte.",
          color: "#f59e0b",
        },
        {
          icon: FiClock,
          title: "Ihr App-Projekt ist blockiert",
          desc: "Sie haben eine App- oder SaaS-Idee, wissen aber nicht, wo Sie anfangen oder was es kosten würde.",
          color: "#8b5cf6",
        },
        {
          icon: FiAlertTriangle,
          title: "Keine Conversion-Seite",
          desc: "Sie schalten Werbung, haben aber keine klare Landing Page, um Besucher in Kunden zu verwandeln.",
          color: "#3b82f6",
        },
      ],
      solution: "KAH-Digital begleitet Sie von der Idee bis zum Launch mit einer klaren, sauberen und budgetgerechten Lösung.",
      cta: "So funktioniert es",
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
