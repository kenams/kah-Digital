"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiShield, FiCode, FiGlobe, FiMessageCircle } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

const BADGES = [
  { icon: FiShield, label: "Code source 100% vous", labelEn: "100% your code", labelDe: "Code 100% Ihnen", color: "#10b981" },
  { icon: FiCode, label: "Next.js · TypeScript · Supabase", labelEn: "Next.js · TypeScript · Supabase", labelDe: "Next.js · TypeScript · Supabase", color: "#3b82f6" },
  { icon: FiGlobe, label: "FR · EN · DE · International", labelEn: "FR · EN · DE · International", labelDe: "DE · FR · EN · International", color: "#8b5cf6" },
  { icon: FiMessageCircle, label: "Réponse < 24h garantie", labelEn: "Reply < 24h guaranteed", labelDe: "Antwort < 24h garantiert", color: "#f59e0b" },
];

export function GlobalTrustSection() {
  const { locale, prefix } = useLocale();

  const copy =
    locale === "en"
      ? {
          eyebrow: "Trusted by modern businesses",
          title: "Premium build.",
          title2: "Zero lock-in.",
          sub: "Every project is delivered with full ownership, modern stack, and a performance guarantee. No subscriptions, no agency lock-in, no hidden surprises.",
          items: [
            {
              icon: FiShield,
              accent: "#10b981",
              title: "100% yours from day one",
              desc: "Source code, domain, hosting — everything is handed over on delivery. No vendor dependency, ever.",
            },
            {
              icon: FiCode,
              accent: "#3b82f6",
              title: "Enterprise-grade stack",
              desc: "Next.js 15, TypeScript strict, Supabase, Tailwind, Vercel. Production-ready from day one, scalable by design.",
            },
            {
              icon: FiGlobe,
              accent: "#8b5cf6",
              title: "International execution",
              desc: "We operate in French, English and German. Remote projects across Europe, North America and Africa.",
            },
            {
              icon: FiMessageCircle,
              accent: "#f59e0b",
              title: "Direct founder access",
              desc: "No middleman. You talk to the person who builds it. First reply guaranteed within 24 business hours.",
            },
          ],
          linksTitle: "Our services",
          links: [
            { label: "Business website", href: "/site-web-entreprise" },
            { label: "Website redesign", href: "/refonte-site-web" },
            { label: "Custom web application", href: "/application-web-sur-mesure" },
            { label: "AI automation", href: "/automatisation-ia-entreprise" },
          ],
          stats: [
            { value: "120+", label: "Projects" },
            { value: "98%", label: "Satisfied" },
            { value: "€0", label: "Hidden fees" },
            { value: "24h", label: "Response" },
          ],
        }
      : locale === "de"
      ? {
          eyebrow: "Von modernen Unternehmen vertraut",
          title: "Premium-Umsetzung.",
          title2: "Null Lock-in.",
          sub: "Jedes Projekt wird mit vollständigem Eigentum, modernem Stack und Leistungsgarantie übergeben. Keine Abonnements, kein Agentur-Lock-in.",
          items: [
            {
              icon: FiShield,
              accent: "#10b981",
              title: "100% Ihnen gehört",
              desc: "Quellcode, Domain, Hosting — alles wird bei Lieferung übergeben. Keine Anbieterabhängigkeit.",
            },
            {
              icon: FiCode,
              accent: "#3b82f6",
              title: "Enterprise-Grade-Stack",
              desc: "Next.js 15, TypeScript strict, Supabase, Tailwind, Vercel. Von Tag eins produktionsbereit.",
            },
            {
              icon: FiGlobe,
              accent: "#8b5cf6",
              title: "Internationale Umsetzung",
              desc: "Wir arbeiten auf Deutsch, Französisch und Englisch. Remote-Projekte in Europa und weltweit.",
            },
            {
              icon: FiMessageCircle,
              accent: "#f59e0b",
              title: "Direkter Gründerzugang",
              desc: "Kein Vermittler. Sie sprechen mit der Person, die baut. Erste Antwort in 24 Arbeitsstunden.",
            },
          ],
          linksTitle: "Unsere Leistungen",
          links: [
            { label: "Unternehmenswebsite", href: "/site-web-entreprise" },
            { label: "Website-Relaunch", href: "/refonte-site-web" },
            { label: "Individuelle Web-App", href: "/application-web-sur-mesure" },
            { label: "KI-Automatisierung", href: "/automatisation-ia-entreprise" },
          ],
          stats: [
            { value: "120+", label: "Projekte" },
            { value: "98%", label: "Zufrieden" },
            { value: "CHF 0", label: "Versteckte Kosten" },
            { value: "24h", label: "Antwortzeit" },
          ],
        }
      : {
          eyebrow: "La confiance des entreprises modernes",
          title: "Build premium.",
          title2: "Zéro lock-in.",
          sub: "Chaque projet est livré avec la propriété totale, un stack moderne et une garantie de performance. Pas d'abonnement, pas de dépendance, pas de surprise cachée.",
          items: [
            {
              icon: FiShield,
              accent: "#10b981",
              title: "100% à vous dès la livraison",
              desc: "Code source, domaine, hébergement — tout est remis à la livraison. Aucune dépendance fournisseur.",
            },
            {
              icon: FiCode,
              accent: "#3b82f6",
              title: "Stack entreprise moderne",
              desc: "Next.js 15, TypeScript strict, Supabase, Tailwind, Vercel. Production-ready dès le premier jour.",
            },
            {
              icon: FiGlobe,
              accent: "#8b5cf6",
              title: "Exécution internationale",
              desc: "On travaille en français, anglais et allemand. Projets à distance partout en Europe et dans le monde.",
            },
            {
              icon: FiMessageCircle,
              accent: "#f59e0b",
              title: "Accès direct au fondateur",
              desc: "Pas d'intermédiaire. Vous parlez à la personne qui construit. Premier retour garanti sous 24h ouvrées.",
            },
          ],
          linksTitle: "Nos services",
          links: [
            { label: "Site web entreprise", href: "/site-web-entreprise" },
            { label: "Refonte site web", href: "/refonte-site-web" },
            { label: "Application web sur mesure", href: "/application-web-sur-mesure" },
            { label: "Automatisation IA entreprise", href: "/automatisation-ia-entreprise" },
          ],
          stats: [
            { value: "120+", label: "Projets" },
            { value: "98%", label: "Satisfaits" },
            { value: "0 €", label: "Frais cachés" },
            { value: "24h", label: "Réponse" },
          ],
        };

  return (
    <section className="bg-[#050509] py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-gray-400">
            {copy.eyebrow}
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">{copy.title2}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">{copy.sub}</p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {copy.stats.map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-center">
              <p className="text-2xl font-black text-white">{s.value}</p>
              <p className="mt-1 text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Trust cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.45 }}
              className="group rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition-all hover:border-white/16 hover:-translate-y-0.5"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${item.accent}18`, border: `1px solid ${item.accent}28` }}
              >
                <item.icon size={18} style={{ color: item.accent }} />
              </div>
              <h3 className="mb-2 text-sm font-bold text-white">{item.title}</h3>
              <p className="text-xs leading-relaxed text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech badges row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-2"
        >
          {BADGES.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] px-4 py-2 text-xs font-medium text-gray-400"
            >
              <b.icon size={12} style={{ color: b.color }} />
              {locale === "en" ? b.labelEn : locale === "de" ? b.labelDe : b.label}
            </div>
          ))}
        </motion.div>

        {/* Service links */}
        <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-center">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-600">{copy.linksTitle}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {copy.links.map((item) => (
              <Link
                key={item.href}
                href={prefix ? `${prefix}${item.href}` : item.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-white/25 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
