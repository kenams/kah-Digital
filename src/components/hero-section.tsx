"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/locale";

export function HeroSection() {
  const { locale, prefix } = useLocale();
  const copy = {
    fr: {
      title: "sites, applications et solutions pour entreprises",
      body:
        "Sites web, applications sur mesure et parcours support plus clairs. KAH-Digital accompagne les entreprises francophones, anglophones et internationales, du cadrage à la mise en ligne.",
      primary: "Demander un devis",
      secondary: "Voir nos solutions",
    },
    en: {
      title: "websites, apps, and digital solutions for companies",
      body:
        "Websites, custom applications, and clearer support workflows. KAH-Digital works with French-speaking, English-speaking, and international companies from scoping to launch.",
      primary: "Request a quote",
      secondary: "See our services",
    },
    de: {
      title: "Websites, Apps und digitale Loesungen fuer Unternehmen",
      body:
        "Websites, massgeschneiderte Anwendungen und klarere Support-Ablaufe. KAH-Digital begleitet frankophone, englischsprachige und internationale Unternehmen vom Briefing bis zum Launch.",
      primary: "Projekt anfragen",
      secondary: "Leistungen ansehen",
    },
  }[locale];

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            KAH-Digital
            <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              {copy.title}
            </span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">{copy.body}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={withPrefix("/devis")}
              className="rounded-full bg-white px-8 py-3 font-semibold text-black transition-colors hover:bg-gray-200"
            >
              {copy.primary}
            </Link>
            <Link
              href={withPrefix("/services")}
              className="rounded-full border border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              {copy.secondary}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
