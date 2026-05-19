"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiMessageCircle, FiCpu, FiZap } from "react-icons/fi";

const WA_NUMBER = "33759558414";

const STEPS = {
  fr: [
    {
      num: "01",
      icon: FiMessageCircle,
      color: "#3b82f6",
      title: "Vous réservez",
      sub: "15 min offertes",
      body: "Un call gratuit ou un formulaire en 2 minutes. On cadre votre projet, discute du budget et confirme le délai. Aucune obligation.",
    },
    {
      num: "02",
      icon: FiCpu,
      color: "#8b5cf6",
      title: "On conçoit",
      sub: "Design + build",
      body: "Notre équipe prend en charge le design, le développement et les tests. Vous recevez des mises à jour régulières. Vous validez à chaque étape.",
    },
    {
      num: "03",
      icon: FiZap,
      color: "#10b981",
      title: "Vous lancez",
      sub: "Go live en quelques jours",
      body: "Mise en ligne propre, domaine configuré, site testé sur tous les appareils. Vous repartez avec un système qui travaille pour vous.",
    },
  ],
  en: [
    {
      num: "01",
      icon: FiMessageCircle,
      color: "#3b82f6",
      title: "Book a call",
      sub: "15 min free",
      body: "A free call or a 2-minute form. We scope your project, discuss budget, and confirm the timeline. No obligation.",
    },
    {
      num: "02",
      icon: FiCpu,
      color: "#8b5cf6",
      title: "We design",
      sub: "Design + build",
      body: "Our team handles design, development, and testing. You receive regular updates and validate at each stage.",
    },
    {
      num: "03",
      icon: FiZap,
      color: "#10b981",
      title: "You launch",
      sub: "Go live in days",
      body: "Clean launch, domain configured, site tested on all devices. You leave with a system that works for you around the clock.",
    },
  ],
  de: [
    {
      num: "01",
      icon: FiMessageCircle,
      color: "#3b82f6",
      title: "Sie buchen",
      sub: "15 Min. kostenlos",
      body: "Ein kostenloses Gespräch oder ein 2-Minuten-Formular. Wir klären Ihr Projekt, besprechen das Budget und bestätigen den Zeitplan. Unverbindlich.",
    },
    {
      num: "02",
      icon: FiCpu,
      color: "#8b5cf6",
      title: "Wir gestalten",
      sub: "Design + Entwicklung",
      body: "Unser Team übernimmt Design, Entwicklung und Tests. Sie erhalten regelmäßige Updates und validieren jeden Schritt.",
    },
    {
      num: "03",
      icon: FiZap,
      color: "#10b981",
      title: "Sie launchen",
      sub: "Go-live in Tagen",
      body: "Sauberer Launch, Domain konfiguriert, Website auf allen Geräten getestet. Sie starten mit einem System, das rund um die Uhr für Sie arbeitet.",
    },
  ],
};

export function ProcessSection() {
  const { locale, prefix } = useLocale();
  const steps = STEPS[locale === "de" ? "de" : locale === "en" ? "en" : "fr"];
  const isEN = locale === "en";
  const isDE = locale === "de";

  const copy = isEN
    ? {
        eyebrow: "How it works",
        title: "Three steps.",
        title2: "No complexity.",
        sub: "From first contact to live site — fast, clear, and without unnecessary meetings.",
        cta: "Start now",
        wa: "Chat on WhatsApp",
        waText: "Hi KAH Digital, I'd like to discuss a project.",
      }
    : isDE
    ? {
        eyebrow: "So funktioniert es",
        title: "Drei Schritte.",
        title2: "Null Komplexität.",
        sub: "Vom ersten Kontakt bis zur fertigen Website — schnell, klar und ohne unnötige Meetings.",
        cta: "Jetzt starten",
        wa: "WhatsApp schreiben",
        waText: "Hallo KAH Digital, ich möchte ein Projekt besprechen.",
      }
    : {
        eyebrow: "Comment ça marche",
        title: "Trois étapes.",
        title2: "Zéro complexité.",
        sub: "Du premier contact au site en ligne — rapide, clair, sans réunions inutiles.",
        cta: "Démarrer maintenant",
        wa: "Écrire sur WhatsApp",
        waText: "Bonjour KAH Digital, je voudrais discuter d'un projet.",
      };

  const withPrefix = (p: string) => (prefix ? `${prefix}${p}` : p);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section className="bg-gray-950 py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.55 }}
              className="group relative"
            >
              {/* Connector line */}
              {i < 2 && (
                <div className="absolute left-full top-10 hidden w-8 -translate-x-4 border-t border-dashed border-white/15 md:block" />
              )}

              <div className="flex flex-col gap-5 rounded-2xl border border-white/8 bg-gray-900/60 p-7 transition-all duration-300 hover:border-white/16 hover:bg-gray-900 hover:-translate-y-1">
                {/* Icon + num */}
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}
                  >
                    <step.icon size={24} style={{ color: step.color }} />
                  </div>
                  <span className="text-5xl font-black text-white/[0.05] select-none">{step.num}</span>
                </div>

                {/* Content */}
                <div>
                  <p className="mb-0.5 text-xs font-bold uppercase tracking-widest" style={{ color: step.color }}>
                    {step.sub}
                  </p>
                  <h3 className="mb-2 text-xl font-extrabold text-white">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{step.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={withPrefix("/devis")}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:gap-3 hover:shadow-blue-500/40"
          >
            {copy.cta}
            <FiArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-8 py-4 font-bold text-[#25D366] transition hover:bg-[#25D366]/20"
          >
            <FiMessageCircle size={15} />
            {copy.wa}
          </a>
        </motion.div>

      </div>
    </section>
  );
}
