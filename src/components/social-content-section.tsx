"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/locale";

type Platform = "x" | "linkedin" | "tiktok";

const POSTS = {
  x: [
    {
      handle: "@DigitalKah42",
      time: "2h",
      content: "Le site web moyen perd 70% de ses visiteurs en moins de 3 secondes.\n\nCe que font nos clients :\n— landing page < 1s de charge\n— CTA clair visible sans scroll\n— preuve sociale en haut de page\n\nRésultat : +30% de conversions.\n\nThread 🧵",
      likes: "847",
      retweets: "213",
      replies: "42",
      highlight: true,
    },
    {
      handle: "@DigitalKah42",
      time: "1j",
      content: "Un restaurateur à Genève m'a contacté avec ce problème :\n→ Site lent\n→ Pas de réservation en ligne\n→ Invisible sur Google\n\n3 semaines plus tard :\n→ Site livré\n→ +30% de réservations\n→ 1er sur Google local\n\nDès 142 €.",
      likes: "1.2k",
      retweets: "334",
      replies: "67",
      highlight: false,
    },
    {
      handle: "@DigitalKah42",
      time: "3j",
      content: "Ce que vous perdez sans site pro :\n\n5 clients/mois × 300€ = 1500€/mois\n= 18 000€/an\n\nCoût d'un site KAH Digital : dès 142 €\n\nROI : ×90\n\nDemandez votre devis gratuit.",
      likes: "2.1k",
      retweets: "567",
      replies: "89",
      highlight: false,
    },
  ],
  linkedin: [
    {
      author: "KAH Digital",
      role: "AI Growth Agency · Lausanne",
      time: "Il y a 2 jours",
      content: "🔎 Étude de cas : Comment on a transformé la présence digitale d'un cabinet juridique à Lausanne en 3 semaines.\n\nProblème :\n• Site invisible sur Google\n• Aucune demande entrante\n• Design des années 2010\n\nSolution :\n• Refonte complète en Next.js\n• SEO local ciblé\n• Formulaire de contact optimisé\n\nRésultats à J+30 :\n✅ Position #1 sur \"avocat Lausanne\"\n✅ 3-4 nouvelles demandes/semaine\n✅ ROI > 500% dès le 2ème mois",
      likes: "234",
      comments: "47",
      shares: "89",
      highlight: true,
    },
    {
      author: "KAH Digital",
      role: "AI Growth Agency · Lausanne",
      time: "Il y a 5 jours",
      content: "L'erreur que font 90% des PME avec leur site web :\n\nElles traitent le site comme une dépense.\nNos clients le traitent comme un commercial 24h/24.\n\nDifférence de mindset = différence de résultats.\n\nVotre site génère combien de leads par semaine ?",
      likes: "567",
      comments: "123",
      shares: "201",
      highlight: false,
    },
  ],
  tiktok: [
    {
      title: "Avant / Après : site restaurant",
      views: "84.2k",
      likes: "12.4k",
      comments: "892",
      tag: "#WebDesign",
      gradient: "from-orange-600/40 to-red-600/20",
      accent: "#f97316",
    },
    {
      title: "Site livré en 5 jours ⚡",
      views: "127k",
      likes: "23.1k",
      comments: "1.4k",
      tag: "#AgenceWeb",
      gradient: "from-blue-600/40 to-violet-600/20",
      accent: "#3b82f6",
    },
    {
      title: "Le ROI d'un site pro en 60s",
      views: "203k",
      likes: "41.8k",
      comments: "2.1k",
      tag: "#Business",
      gradient: "from-emerald-600/40 to-teal-600/20",
      accent: "#10b981",
    },
  ],
};

const COPY = {
  fr: {
    eyebrow: "Notre contenu",
    title: "On partage",
    title2: "tout ce qui marche.",
    sub: "Tips, études de cas, avant/après — suivez-nous pour des insights concrets sur la croissance digitale.",
    tabs: { x: "X / Twitter", linkedin: "LinkedIn", tiktok: "TikTok" },
    followX: "Suivre @DigitalKah42",
    followLI: "Suivre sur LinkedIn",
    followTT: "Suivre sur TikTok",
  },
  en: {
    eyebrow: "Our content",
    title: "We share",
    title2: "everything that works.",
    sub: "Tips, case studies, before/after — follow us for concrete digital growth insights.",
    tabs: { x: "X / Twitter", linkedin: "LinkedIn", tiktok: "TikTok" },
    followX: "Follow @DigitalKah42",
    followLI: "Follow on LinkedIn",
    followTT: "Follow on TikTok",
  },
  de: {
    eyebrow: "Unsere Inhalte",
    title: "Wir teilen",
    title2: "alles, was funktioniert.",
    sub: "Tipps, Fallstudien, Vorher/Nachher — folgen Sie uns für konkrete Digital-Wachstums-Insights.",
    tabs: { x: "X / Twitter", linkedin: "LinkedIn", tiktok: "TikTok" },
    followX: "@DigitalKah42 folgen",
    followLI: "LinkedIn folgen",
    followTT: "TikTok folgen",
  },
};

const X_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LI_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TT_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.27 8.27 0 004.84 1.56V6.84a4.85 4.85 0 01-1.07-.15z"/>
  </svg>
);

export function SocialContentSection() {
  const { locale } = useLocale();
  const [tab, setTab] = useState<Platform>("x");
  const copy = COPY[locale] ?? COPY.fr;

  const tabs: { key: Platform; label: string; icon: React.ReactNode; color: string }[] = [
    { key: "x", label: copy.tabs.x, icon: X_ICON, color: "text-white" },
    { key: "linkedin", label: copy.tabs.linkedin, icon: LI_ICON, color: "text-blue-400" },
    { key: "tiktok", label: copy.tabs.tiktok, icon: TT_ICON, color: "text-pink-400" },
  ];

  return (
    <section className="bg-gray-950 py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
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

        {/* Tab bar */}
        <div className="mb-8 flex justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                tab === t.key
                  ? "bg-white/10 text-white shadow-lg"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <span className={tab === t.key ? t.color : ""}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {tab === "x" && (
            <motion.div
              key="x"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {POSTS.x.map((post, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-6 transition-all duration-300 hover:border-white/16 ${
                    post.highlight ? "border-blue-500/20 bg-blue-950/15" : "border-white/8 bg-white/[0.025]"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-xs font-bold text-white">K</div>
                      <div>
                        <p className="text-sm font-bold text-white">{post.handle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">{X_ICON}<span className="text-xs">{post.time}</span></div>
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-gray-300">{post.content}</p>
                  <div className="mt-4 flex items-center gap-5 text-xs text-gray-600">
                    <span>💬 {post.replies}</span>
                    <span>🔁 {post.retweets}</span>
                    <span>❤️ {post.likes}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-center">
                <a
                  href="https://x.com/DigitalKah42"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  {X_ICON}
                  {copy.followX}
                </a>
              </div>
            </motion.div>
          )}

          {tab === "linkedin" && (
            <motion.div
              key="linkedin"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {POSTS.linkedin.map((post, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-6 ${
                    post.highlight ? "border-blue-500/20 bg-blue-950/15" : "border-white/8 bg-white/[0.025]"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white">K</div>
                    <div>
                      <p className="font-semibold text-white">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.role} · {post.time}</p>
                    </div>
                  </div>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-gray-300">{post.content}</p>
                  <div className="mt-4 flex items-center gap-5 border-t border-white/6 pt-4 text-xs text-gray-600">
                    <span>👍 {post.likes}</span>
                    <span>💬 {post.comments}</span>
                    <span>↗️ {post.shares}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 text-center">
                <a
                  href="https://www.linkedin.com/company/kah-digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-blue-400 transition hover:bg-white/10"
                >
                  {LI_ICON}
                  {copy.followLI}
                </a>
              </div>
            </motion.div>
          )}

          {tab === "tiktok" && (
            <motion.div
              key="tiktok"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid gap-4 sm:grid-cols-3"
            >
              {POSTS.tiktok.map((post, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025]"
                  style={{ aspectRatio: "9/16", maxHeight: "360px" }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 40%, ${post.accent}60 0%, transparent 55%)`,
                    }}
                  />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition group-hover:scale-110">
                      <div className="ml-1 h-0 w-0 border-b-8 border-l-[14px] border-t-8 border-b-transparent border-l-white border-t-transparent" />
                    </div>
                  </div>
                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-xs font-bold text-white">{post.title}</p>
                    <p className="mt-1 text-[10px] font-semibold" style={{ color: post.accent }}>{post.tag}</p>
                    <div className="mt-2 flex items-center gap-3 text-[10px] text-white/60">
                      <span>▶ {post.views}</span>
                      <span>❤ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-span-full pt-2 text-center">
                <a
                  href="https://www.tiktok.com/@digitalKah42"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-pink-400 transition hover:bg-white/10"
                >
                  {TT_ICON}
                  {copy.followTT}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
