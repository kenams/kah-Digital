"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiCalendar, FiClock, FiMessageCircle, FiZap, FiCheck } from "react-icons/fi";

const WA_NUMBER = "33759558414";
const CALENDLY_URL = "https://calendly.com/kahdigital42";

export function BookingSection() {
  const { locale } = useLocale();

  const copy =
    locale === "en"
      ? {
          eyebrow: "Free strategic audit",
          title: "15 minutes.",
          title2: "That change everything.",
          sub: "A focused call to analyse your situation, identify your biggest growth lever, and propose a clear action plan. No sales pitch.",
          duration: "15 min",
          durationLabel: "Free call",
          available: "Available this week",
          cta: "Book my free audit",
          waLabel: "Prefer WhatsApp?",
          waCta: "Send a message",
          waText: "Hi KAH Digital, I'd like to book a free strategic audit.",
          benefits: [
            { icon: FiZap, text: "Instant diagnosis of your digital presence" },
            { icon: FiCheck, text: "Clear action plan adapted to your budget" },
            { icon: FiCalendar, text: "No commitment, no obligation" },
          ],
          slots: "Available slots this week",
          slotsCount: "3 remaining",
        }
      : locale === "de"
      ? {
          eyebrow: "Kostenloses strategisches Audit",
          title: "15 Minuten.",
          title2: "Die alles verändern.",
          sub: "Ein fokussiertes Gespräch, um Ihre Situation zu analysieren, Ihren größten Wachstumshebel zu identifizieren und einen klaren Aktionsplan vorzuschlagen.",
          duration: "15 Min",
          durationLabel: "Kostenloses Gespräch",
          available: "Diese Woche verfügbar",
          cta: "Kostenloses Audit buchen",
          waLabel: "Lieber WhatsApp?",
          waCta: "Nachricht senden",
          waText: "Hallo KAH Digital, ich möchte ein kostenloses strategisches Audit buchen.",
          benefits: [
            { icon: FiZap, text: "Sofortige Diagnose Ihrer digitalen Präsenz" },
            { icon: FiCheck, text: "Klarer Aktionsplan, angepasst an Ihr Budget" },
            { icon: FiCalendar, text: "Keine Verpflichtung" },
          ],
          slots: "Verfügbare Termine diese Woche",
          slotsCount: "3 verbleibend",
        }
      : {
          eyebrow: "Audit stratégique gratuit",
          title: "15 minutes.",
          title2: "Qui changent tout.",
          sub: "Un call focalisé pour analyser votre situation, identifier votre levier de croissance principal et proposer un plan d'action clair. Sans pitch commercial.",
          duration: "15 min",
          durationLabel: "Appel gratuit",
          available: "Disponible cette semaine",
          cta: "Réserver mon audit gratuit",
          waLabel: "Vous préférez WhatsApp ?",
          waCta: "Envoyer un message",
          waText: "Bonjour KAH Digital, je voudrais réserver un audit stratégique gratuit.",
          benefits: [
            { icon: FiZap, text: "Diagnostic instantané de votre présence digitale" },
            { icon: FiCheck, text: "Plan d'action clair adapté à votre budget" },
            { icon: FiCalendar, text: "Sans engagement, sans obligation" },
          ],
          slots: "Créneaux disponibles cette semaine",
          slotsCount: "3 restants",
        };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section className="bg-gray-900 py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-blue-950/30 via-gray-900 to-violet-950/20">
          <div className="grid lg:grid-cols-[1fr_1.1fr]">

            {/* Left: copy */}
            <div className="p-10 lg:p-14">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-300">
                  <FiCalendar size={13} />
                  {copy.eyebrow}
                </span>
                <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {copy.title}{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{copy.title2}</span>
                </h2>
                <p className="mt-5 text-lg text-gray-400">{copy.sub}</p>

                <ul className="mt-8 space-y-4">
                  {copy.benefits.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3 text-sm text-gray-300"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <b.icon size={15} />
                      </div>
                      {b.text}
                    </motion.li>
                  ))}
                </ul>

                {/* Scarcity */}
                <div className="mt-8 flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3">
                  <FiClock size={14} className="shrink-0 text-amber-400" />
                  <p className="text-sm text-amber-300">
                    <span className="font-bold">{copy.slotsCount}</span> — {copy.slots}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right: booking card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-center justify-center border-t border-white/8 p-10 lg:border-l lg:border-t-0 lg:p-14"
            >
              {/* Clock visual */}
              <div className="relative mb-8 flex h-28 w-28 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-violet-500/15" />
                <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-blue-500/20" />
                <div className="relative text-center">
                  <p className="text-3xl font-black text-white">{copy.duration}</p>
                </div>
              </div>

              <p className="mb-2 text-sm font-bold text-white">{copy.durationLabel}</p>
              <p className="mb-8 flex items-center gap-1.5 text-xs text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                {copy.available}
              </p>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-xl shadow-blue-500/25 transition hover:shadow-blue-500/40"
              >
                <FiCalendar size={16} />
                {copy.cta}
              </a>

              <p className="mb-3 text-xs text-gray-500">{copy.waLabel}</p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/8 px-8 py-3.5 text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/15"
              >
                <FiMessageCircle size={15} />
                {copy.waCta}
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
