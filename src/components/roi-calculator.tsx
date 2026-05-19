"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";
import Link from "next/link";
import { FiArrowRight, FiTrendingDown, FiTrendingUp } from "react-icons/fi";

function formatNum(n: number, locale: string): string {
  if (locale === "en") return `$${n.toLocaleString("en-US")}`;
  if (locale === "de") return `CHF ${n.toLocaleString("de-CH")}`;
  return `${n.toLocaleString("fr-FR")} €`;
}

export function ROICalculator() {
  const { locale, prefix } = useLocale();
  const [clients, setClients] = useState(5);
  const [value, setValue] = useState(300);

  const monthlyLoss = clients * value;
  const yearlyLoss = monthlyLoss * 12;
  const roi = Math.round((yearlyLoss / 199) * 10) / 10;

  const withPrefix = (p: string) => (prefix ? `${prefix}${p}` : p);

  const copy =
    locale === "en"
      ? {
          eyebrow: "ROI Calculator",
          title: "How much are you losing",
          title2: "without a pro site?",
          sub: "Adjust the sliders to see your real monthly loss due to a poor or non-existent web presence.",
          slider1Label: "Potential clients lost per month",
          slider2Label: "Average value per client",
          lossLabel: "Monthly loss",
          yearLabel: "Annual loss",
          roiLabel: "ROI of Business plan",
          roiX: "× your investment",
          cta: "Stop the loss — start for $199",
          note: "Estimate based on industry conversion averages.",
        }
      : locale === "de"
      ? {
          eyebrow: "ROI-Rechner",
          title: "Wie viel verlieren Sie",
          title2: "ohne professionelle Website?",
          sub: "Passen Sie die Regler an, um Ihren monatlichen Verlust durch eine schlechte oder fehlende Web-Präsenz zu sehen.",
          slider1Label: "Verlorene potenzielle Kunden pro Monat",
          slider2Label: "Durchschnittlicher Kundenwert",
          lossLabel: "Monatlicher Verlust",
          yearLabel: "Jährlicher Verlust",
          roiLabel: "ROI Business-Plan",
          roiX: "× Ihre Investition",
          cta: "Verluste stoppen — ab CHF 199 starten",
          note: "Schätzung basierend auf Branchendurchschnittswerten.",
        }
      : {
          eyebrow: "Calculateur ROI",
          title: "Combien perdez-vous",
          title2: "sans site professionnel ?",
          sub: "Ajustez les curseurs pour voir votre perte mensuelle réelle due à une présence web insuffisante ou inexistante.",
          slider1Label: "Clients potentiels perdus par mois",
          slider2Label: "Valeur moyenne d'un client",
          lossLabel: "Perte mensuelle",
          yearLabel: "Perte annuelle",
          roiLabel: "ROI du plan Business",
          roiX: "× votre investissement",
          cta: "Arrêter les pertes — démarrer à 199 €",
          note: "Estimation basée sur les moyennes du secteur.",
        };

  return (
    <section className="bg-[#050509] py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-red-500/30 bg-red-500/8 px-4 py-1.5 text-sm font-semibold text-red-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-sm"
        >
          <div className="p-8 sm:p-10">

            {/* Sliders */}
            <div className="space-y-8">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-300">{copy.slider1Label}</label>
                  <span className="rounded-lg bg-white/8 px-3 py-1 text-sm font-bold text-white">{clients}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={clients}
                  onChange={(e) => setClients(Number(e.target.value))}
                  className="slider-premium h-2 w-full cursor-pointer appearance-none rounded-full bg-gradient-to-r from-red-900 to-red-600 outline-none"
                  style={{
                    background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${(clients / 30) * 100}%, #1f2937 ${(clients / 30) * 100}%, #1f2937 100%)`,
                  }}
                />
                <div className="mt-1.5 flex justify-between text-xs text-gray-600">
                  <span>1</span><span>30</span>
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-300">{copy.slider2Label}</label>
                  <span className="rounded-lg bg-white/8 px-3 py-1 text-sm font-bold text-white">{formatNum(value, locale)}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
                  style={{
                    background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${((value - 50) / 4950) * 100}%, #1f2937 ${((value - 50) / 4950) * 100}%, #1f2937 100%)`,
                  }}
                />
                <div className="mt-1.5 flex justify-between text-xs text-gray-600">
                  <span>{formatNum(50, locale)}</span><span>{formatNum(5000, locale)}</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <motion.div
                key={monthlyLoss}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5 text-center"
              >
                <FiTrendingDown className="mx-auto mb-2 text-red-400" size={20} />
                <p className="text-2xl font-black text-red-300">{formatNum(monthlyLoss, locale)}</p>
                <p className="mt-1 text-xs text-gray-500">{copy.lossLabel}</p>
              </motion.div>

              <motion.div
                key={yearlyLoss}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="rounded-2xl border border-orange-500/20 bg-orange-950/15 p-5 text-center"
              >
                <FiTrendingDown className="mx-auto mb-2 text-orange-400" size={20} />
                <p className="text-2xl font-black text-orange-300">{formatNum(yearlyLoss, locale)}</p>
                <p className="mt-1 text-xs text-gray-500">{copy.yearLabel}</p>
              </motion.div>

              <motion.div
                key={roi}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-950/15 p-5 text-center"
              >
                <FiTrendingUp className="mx-auto mb-2 text-emerald-400" size={20} />
                <p className="text-2xl font-black text-emerald-300">{roi}×</p>
                <p className="mt-1 text-xs text-gray-500">{copy.roiLabel}</p>
                <p className="text-[10px] text-gray-600">{copy.roiX}</p>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link
                href={withPrefix("/devis")}
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:gap-3 hover:shadow-blue-500/40"
              >
                {copy.cta}
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="mt-3 text-xs text-gray-600">{copy.note}</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
