"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight, FiCheckCircle, FiClock, FiPlayCircle } from "react-icons/fi";

type HeroProps = {
  stats: { label: string; value: string }[];
};

const orbitItems = ["Next.js + Tailwind", "React Native + Expo", "Supabase + Stripe", "Deck + landing pack"];
const quickWins = [
  {
    title: "Sprint 0",
    detail: "Kick-off sous 48 h, workspace Notion + Slack partagé.",
  },
  {
    title: "MVP mobile",
    detail: "Build Expo, auth, paiement, push + deck investisseur.",
  },
];

export function HeroSection({ stats }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section className="section-shell space-y-6 pb-8 pt-10 text-white" ref={containerRef}>
      <div className="relative overflow-hidden rounded-[46px] border border-white/10 bg-black">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#08061d] via-[#0f092b] to-[#1e0f3a]"
          style={{ y: parallaxY }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_55%)]"
          style={{ y: parallaxY }}
        />
        <div className="relative grid gap-12 px-8 py-16 md:grid-cols-[1.35fr,0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
              <span className="gradient-pill rounded-full px-4 py-1 text-xs uppercase tracking-[0.25em]">
                Studio Next.js & React Native
              </span>
              <span>Réponse sous 24 h • Ship room Vercel</span>
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              On conçoit des expériences web premium{" "}
              <span className="gradient-text">et des MVP mobiles prêts à être pitchés</span>.
            </h1>
            <p className="text-lg text-white/75">
              Brand system, Next.js App Router, SEO, automatisations métier. Puis MVP iOS/Android (React Native + Expo,
              Supabase, auth, paiement, push) pour tester ton idée et convaincre investisseurs ou clients pilotes.
            </p>
            <div className="grid gap-3 text-sm text-white/80 md:grid-cols-2">
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-3">
                <FiCheckCircle className="text-white/80" />
                <span>Brief express + deck + landing compris</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-3">
                <FiClock className="text-white/80" />
                <span>Kick-off sous 48 h, livraisons en 4 semaines</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200"
              >
                Planifier un sprint
                <FiArrowRight className="text-black/60" />
              </Link>
              <Link
                href="/configurateur"
                className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-white transition hover:border-white"
              >
                Essayer le configurateur
              </Link>
              <Link
                href="/cahier-des-charges.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-white transition hover:border-white"
              >
                <FiPlayCircle />
                Télécharger le pack
              </Link>
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
            className="hero-visual p-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="hero-panel mb-6 overflow-hidden">
              <div className="mb-4 text-xs uppercase tracking-[0.4em] text-white/60">Command room</div>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <Image
                  src="/mockups/global-dashboard.png"
                  alt="Dashboard projets Kah-Digital"
                  width={720}
                  height={480}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="hero-panel mb-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Sprint piloté</p>
              {quickWins.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="text-sm text-white/60">{item.title}</p>
                  <p className="text-base font-semibold text-white">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="hero-panel mb-6 space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Fast briefing</p>
              <div className="space-y-3 text-sm text-white/80">
                <p>1. Questionnaire configurateur ou call 15 min.</p>
                <p>2. Roadmap + budget envoyés sous 48 h.</p>
                <p>3. Releases hebdo + QA, deck + landing synchronisés.</p>
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
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70">
        <p className="text-white/80">
          Clients : Atelier Nomade • Lumea Skin • NovaPay • Pulse Studio • FairBuild • PulseLearn
        </p>
        <div className="scroll-cue">
          <span />
          <p>scroll</p>
        </div>
      </div>
    </section>
  );
}
