"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight, FiCheckCircle, FiClock, FiPlayCircle } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

type HeroProps = {
  stats: { label: string; value: string }[];
};

const orbitItemsFr = ["Site web", "App mobile", "SEO de base", "Support"];
const orbitItemsEn = ["Website", "Mobile app", "Basic SEO", "Support"];
const quickWinsFr = [
  {
    title: "Plan simple",
    detail: "Kick-off sous 48h, pages et priorites claires.",
  },
  {
    title: "Mise en ligne",
    detail: "Design propre, dev rapide et mise en ligne controlee.",
  },
];
const quickWinsEn = [
  {
    title: "Simple plan",
    detail: "Kick-off within 48h, clear pages and priorities.",
  },
  {
    title: "Launch",
    detail: "Clean design, fast build, and controlled release.",
  },
];
const sprintPulse = [
  { label: "Sprint Web", status: "Design", progress: 68 },
  { label: "Sprint MVP", status: "Build", progress: 46 },
  { label: "Sprint E-commerce", status: "QA", progress: 86 },
];

const sprintTone: Record<string, string> = {
  Design: "border-[#7fb8c7]/40 bg-[#7fb8c7]/15 text-[#d7f2f6]",
  Build: "border-[#d6b36a]/40 bg-[#d6b36a]/15 text-[#f4dfb3]",
  QA: "border-white/20 bg-white/10 text-white/80",
};

export function HeroSection({ stats }: HeroProps) {
  const { isEnglish, prefix } = useLocale();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const orbitItems = isEnglish ? orbitItemsEn : orbitItemsFr;
  const quickWins = isEnglish ? quickWinsEn : quickWinsFr;
  const pdfHref = isEnglish ? "/cahier-des-charges.en.pdf" : "/cahier-des-charges.pdf";
  const withPrefix = (path: string) => {
    if (!path.startsWith("/")) return path;
    if (path.endsWith(".pdf")) return path;
    return prefix ? `${prefix}${path}` : path;
  };

  return (
    <section className="section-shell space-y-6 pb-8 pt-10 text-white" ref={containerRef}>
      <div className="relative overflow-hidden rounded-[46px] border border-white/10 bg-black">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#0b0a08] via-[#15120e] to-[#1c1711]"
          style={{ y: parallaxY }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(214,179,106,0.32),transparent_55%)]"
          style={{ y: parallaxY }}
        />
        <div className="relative grid gap-10 px-5 py-10 sm:px-8 sm:py-16 md:grid-cols-[1.35fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="gradient-pill rounded-full px-4 py-1 text-xs uppercase tracking-[0.25em]">
                {isEnglish ? "Premium digital studio" : "Studio digital haut de gamme"}
              </span>
              <span>
                {isEnglish ? "Reply within 24h | Launch in 4-6 weeks" : "Reponse sous 24h | Lancement 4-6 semaines"}
              </span>
            </div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
              {isEnglish ? "Premium design, fast execution," : "Design premium, vitesse d'execution,"}{" "}
              <span className="gradient-text">{isEnglish ? "clear results" : "resultats clairs"}</span>.
            </h1>
            <p className="text-base text-white/75 sm:text-lg">
              {isEnglish
                ? "We build websites and mobile apps. Design, development, launch, and follow-up without jargon."
                : "On cree des sites web et des apps mobiles. Design, developpement, mise en ligne et suivi, sans jargon inutile."}
            </p>
            <div className="grid gap-3 text-sm text-white/80 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-3">
                <FiCheckCircle className="text-white/80" />
                <span>
                  {isEnglish ? "Core Web Vitals green + pixel-perfect QA" : "Core Web Vitals au vert + QA pixel perfect"}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-3">
                <FiClock className="text-white/80" />
                <span>
                  {isEnglish ? "Kick-off within 48h, delivery 4-6 weeks" : "Kick-off sous 48h, livraison 4-6 semaines"}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href={withPrefix("/devis")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200"
              >
                {isEnglish ? "Get a quote" : "Demander un devis"}
                <FiArrowRight className="text-black/60" />
              </Link>
              <Link
                href={withPrefix("/projets")}
                className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-white transition hover:border-white"
              >
                {isEnglish ? "View portfolio" : "Voir le portfolio"}
              </Link>
              <a
                href={pdfHref}
                target="_blank"
                rel="noreferrer"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-white transition hover:border-white"
              >
                <FiPlayCircle />
                {isEnglish ? "Get the pack" : "Recevoir le dossier"}
              </a>
            </div>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
              {orbitItems.map((item) => (
                <span key={item} className="orbit-badge">
                  <span className="orbit-dot" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="hero-visual p-4 sm:p-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="hero-panel mb-6 space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/60">
                <span>{isEnglish ? "Executive room" : "Executive room"}</span>
                <span className="rounded-full border border-white/15 px-2 py-0.5 text-[0.65rem] text-white/70">Live</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    label: isEnglish ? "Qualified leads" : "Demandes qualifiees",
                    value: "08",
                    tone: "text-amber-200",
                  },
                  { label: isEnglish ? "Active sprints" : "Sprints actifs", value: "03", tone: "text-slate-200" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</p>
                    <p className={`mt-2 text-3xl font-semibold ${item.tone}`}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                  <span>{isEnglish ? "Active sprints" : "Sprints actifs"}</span>
                  <span>{isEnglish ? "Progress" : "Progression"}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {sprintPulse.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-black/35 p-3">
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span className="text-sm font-semibold text-white/90">{item.label}</span>
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.2em] ${sprintTone[item.status] ?? "border-white/20 bg-white/10 text-white/80"}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#d6b36a] to-[#7fb8c7]"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <div className="mt-1 flex items-center justify-between text-[0.65rem] text-white/50">
                        <span>{isEnglish ? "Progress" : "Progression"}</span>
                        <span>{item.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hero-panel mb-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                {isEnglish ? "Pilot sprint" : "Sprint pilote"}
              </p>
              {quickWins.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-white/60">{item.title}</p>
                  <p className="text-base font-semibold text-white">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="hero-panel mb-6 space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {isEnglish ? "Fast briefing" : "Fast briefing"}
              </p>
              <div className="space-y-3 text-sm text-white/80">
                <p>{isEnglish ? "1. 15-min call or quick quote." : "1. Appel 15 min ou devis rapide."}</p>
                <p>{isEnglish ? "2. Plan + budget within 48h." : "2. Plan + budget envoyes sous 48h."}</p>
                <p>{isEnglish ? "3. Step-by-step progress + clear updates." : "3. Avance par etapes + points clairs."}</p>
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="rounded-2xl border border-white/15 bg-black/40 p-4 text-center floating"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <p className="text-2xl font-semibold">{item.value}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="premium-card flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 sm:px-6 sm:py-4">
        <p className="text-white/80">
          {isEnglish
            ? "Studios and teams: Atelier Nomade | Lumea Skin | NovaPay | Pulse Studio | FairBuild | PulseLearn"
            : "Maisons et studios: Atelier Nomade | Lumea Skin | NovaPay | Pulse Studio | FairBuild | PulseLearn"}
        </p>
        <div className="scroll-cue">
          <span />
          <p>{isEnglish ? "scroll" : "scroll"}</p>
        </div>
      </div>
    </section>
  );
}
