"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/lib/locale";

function useCountUp(target: number, duration = 1800, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const raf = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [target, duration, trigger]);
  return value;
}

const LOGOS = [
  { name: "TechVision", color: "#3b82f6" },
  { name: "StartupX", color: "#8b5cf6" },
  { name: "NexaFlow", color: "#10b981" },
  { name: "Orbita", color: "#f59e0b" },
  { name: "Veridict", color: "#ec4899" },
  { name: "Lumis", color: "#06b6d4" },
  { name: "Forvida", color: "#a78bfa" },
  { name: "Strata", color: "#34d399" },
];

export function SocialProofSection() {
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const v1 = useCountUp(120, 1600, inView);
  const v2 = useCountUp(98, 1400, inView);
  const v3 = useCountUp(48, 1200, inView);
  const v4 = useCountUp(35, 1000, inView);

  const copy =
    locale === "en"
      ? {
          eyebrow: "Trusted by modern businesses",
          title: "Numbers that",
          title2: "speak for themselves.",
          sub: "From first-time founders to established companies — they chose KAH Digital.",
          stats: [
            { value: v1, suffix: "+", label: "Projects delivered" },
            { value: v2, suffix: "%", label: "Client satisfaction" },
            { value: v3, suffix: "h", label: "Average response time" },
            { value: v4, suffix: "+", label: "Active clients" },
          ],
          logoLabel: "Trusted by teams at",
        }
      : locale === "de"
      ? {
          eyebrow: "Von modernen Unternehmen vertraut",
          title: "Zahlen, die",
          title2: "für sich sprechen.",
          sub: "Von Gründern bis zu etablierten Unternehmen — sie haben sich für KAH Digital entschieden.",
          stats: [
            { value: v1, suffix: "+", label: "Gelieferte Projekte" },
            { value: v2, suffix: "%", label: "Kundenzufriedenheit" },
            { value: v3, suffix: "h", label: "Ø Antwortzeit" },
            { value: v4, suffix: "+", label: "Aktive Kunden" },
          ],
          logoLabel: "Vertraut von Teams bei",
        }
      : {
          eyebrow: "La confiance de vraies entreprises",
          title: "Des chiffres qui",
          title2: "parlent d'eux-mêmes.",
          sub: "De la startup en démarrage à l'entreprise établie — ils ont choisi KAH Digital.",
          stats: [
            { value: v1, suffix: "+", label: "Projets livrés" },
            { value: v2, suffix: "%", label: "Clients satisfaits" },
            { value: v3, suffix: "h", label: "Délai moyen de réponse" },
            { value: v4, suffix: "+", label: "Clients actifs" },
          ],
          logoLabel: "Ils nous font confiance",
        };

  return (
    <section className="overflow-hidden bg-gray-950 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        {/* Stats counters */}
        <div ref={ref} className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {copy.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-center backdrop-blur-sm"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5" />
              <p className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                {s.value}
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{s.suffix}</span>
              </p>
              <p className="mt-2 text-sm text-gray-400">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Logo bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-gray-600">
            {copy.logoLabel}
          </p>
          <div className="relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-gray-950 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-gray-950 to-transparent" />

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {LOGOS.map((logo, i) => (
                <motion.div
                  key={logo.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-default rounded-xl border border-white/8 bg-white/[0.03] px-5 py-2.5 transition-all duration-300 hover:border-white/16 hover:bg-white/[0.06]"
                >
                  <span
                    className="text-sm font-bold tracking-wide transition-colors duration-300"
                    style={{ color: `${logo.color}80` }}
                  >
                    {logo.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
