"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiZap, FiMessageCircle, FiPlay } from "react-icons/fi";

const WA_NUMBER = "33759558414";

const LOGOS = ["Stripe", "Vercel", "Supabase", "OpenAI", "Next.js"];

export function HeroSection() {
  const { locale, prefix } = useLocale();

  const copy =
    locale === "en"
      ? {
          eyebrow: "AI-Powered Growth Systems",
          title1: "We build the systems",
          title2: "that grow your business.",
          body: "AI automation, premium platforms, digital infrastructure — for companies ready to scale without complexity.",
          primary: "Get my free audit",
          secondary: "See results",
          wa: "Talk to Kénan",
          waText: "Hi Kénan, I'd like to discuss how you can help grow my business.",
          tags: ["AI Automation", "Premium Platforms", "Growth Infrastructure", "International"],
          trustLine: "Trusted by 70+ businesses in Switzerland, France & worldwide",
          proof: [
            { value: "70+", label: "Systems delivered" },
            { value: "3×", label: "Avg. lead increase" },
            { value: "24h", label: "Response time" },
            { value: "100%", label: "On-budget delivery" },
          ],
        }
      : {
          eyebrow: "AI-Powered Growth Systems",
          title1: "On construit les systèmes",
          title2: "qui font croître votre business.",
          body: "Automatisation IA, plateformes premium, infrastructure digitale — pour les entreprises qui veulent accélérer sans complexifier.",
          primary: "Obtenir mon audit gratuit",
          secondary: "Voir les résultats",
          wa: "Parler à Kénan",
          waText: "Bonjour Kénan, je voudrais discuter de comment vous pouvez aider ma croissance.",
          tags: ["Automatisation IA", "Plateformes Premium", "Infrastructure Growth", "International"],
          trustLine: "70+ entreprises en Suisse, France & international nous font confiance",
          proof: [
            { value: "70+", label: "Systèmes livrés" },
            { value: "3×", label: "Leads en moyenne" },
            { value: "24h", label: "Délai de réponse" },
            { value: "100%", label: "Budget respecté" },
          ],
        };

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden bg-gray-950">
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Glows */}
      <div className="absolute -top-40 left-1/3 h-[36rem] w-[36rem] rounded-full bg-blue-600/15 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-violet-600/12 blur-[100px]" />
      <div className="absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/8 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-blue-300 backdrop-blur-sm"
          >
            <FiZap size={14} className="text-blue-400" />
            {copy.eyebrow}
          </motion.div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block">{copy.title1}</span>
            <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              {copy.title2}
            </span>
          </h1>

          {/* Body */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">{copy.body}</p>

          {/* Tags */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {copy.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-gray-300">
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={withPrefix("/audit-gratuit")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:gap-3"
            >
              {copy.primary}
              <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={withPrefix("/projets")}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
            >
              <FiPlay size={14} />
              {copy.secondary}
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-8 py-4 font-semibold text-[#25D366] transition-all hover:bg-[#25D366]/20"
            >
              <FiMessageCircle size={15} />
              {copy.wa}
            </a>
          </div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-sm text-gray-600"
          >
            {copy.trustLine}
          </motion.p>

          {/* Proof stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {copy.proof.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + i * 0.08 }}
                className="flex flex-col items-center gap-1 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
              >
                <span className="text-2xl font-extrabold text-white">{value}</span>
                <span className="text-xs text-gray-500">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <span className="text-xs text-gray-600">Built with</span>
            {LOGOS.map((logo) => (
              <span key={logo} className="text-xs font-semibold text-gray-600 transition-colors hover:text-gray-400">
                {logo}
              </span>
            ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
