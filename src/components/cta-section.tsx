"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiMessageCircle } from "react-icons/fi";
import { useRef } from "react";

const WA_NUMBER = "33759558414";

function MagneticButton({ children, className }: { children: React.ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tx = useTransform(x, [-60, 60], [-6, 6]);
  const ty = useTransform(y, [-60, 60], [-6, 6]);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div style={{ x: tx, y: ty }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}

export function CTASection() {
  const { locale, prefix } = useLocale();

  const copy =
    locale === "en"
      ? {
          eyebrow: "Ready for your own agent?",
          title: "Your business deserves",
          title2: "an agent, not another site.",
          sub: "Book a free 15-minute call. No commitment, no sales pitch. Just a real conversation about the job you want to delegate.",
          cta1: "Get a free quote",
          cta2: "Chat on WhatsApp",
          waText: "Hi KAH Digital, I'd like to discuss my project.",
          badges: ["5-day delivery", "No commitment", "Reply in 24h"],
          available: "Available now · Slots filling up",
        }
      : locale === "de"
      ? {
          eyebrow: "Bereit für Ihren eigenen Agenten?",
          title: "Ihr Business verdient",
          title2: "einen Agenten, keine weitere Website.",
          sub: "Buchen Sie ein kostenloses 15-Minuten-Gespräch. Keine Verpflichtung, kein Verkaufsgespräch — nur ein echtes Gespräch über den Job, den Sie delegieren wollen.",
          cta1: "Kostenlose Offerte",
          cta2: "WhatsApp schreiben",
          waText: "Hallo KAH Digital, ich möchte mein Projekt besprechen.",
          badges: ["5 Tage Lieferung", "Keine Verpflichtung", "Antwort in 24h"],
          available: "Jetzt verfügbar · Plätze werden knapp",
        }
      : {
          eyebrow: "Prêt pour votre agent IA ?",
          title: "Votre business mérite",
          title2: "un agent, pas un site de plus.",
          sub: "Réservez un call de 15 min. Sans engagement, sans pitch commercial. Juste une vraie conversation sur le métier que vous voulez déléguer.",
          cta1: "Obtenir un devis gratuit",
          cta2: "Écrire sur WhatsApp",
          waText: "Bonjour KAH Digital, je voudrais discuter de mon projet.",
          badges: ["Livraison 5 jours", "Sans engagement", "Réponse en 24h"],
          available: "Disponible maintenant · Places qui se remplissent",
        };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;
  const withPrefix = (p: string) => (prefix ? `${prefix}${p}` : p);

  return (
    <section className="relative overflow-hidden bg-gray-950 py-32">

      {/* Animated mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-blue-600/8 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-violet-600/8 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-6 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {copy.title}{" "}
          <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            {copy.title2}
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-gray-400"
        >
          {copy.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {copy.badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-gray-400"
            >
              {b}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton className="inline-block">
            <Link
              href={withPrefix("/devis")}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:gap-4"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/10"
                animate={{ translateX: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
              />
              {copy.cta1}
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </MagneticButton>

          <MagneticButton className="inline-block">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-8 py-4 text-base font-bold text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/20 hover:border-[#25D366]/50"
            >
              <FiMessageCircle size={16} />
              {copy.cta2}
            </a>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
          </span>
          {copy.available}
        </motion.div>

      </div>
    </section>
  );
}
