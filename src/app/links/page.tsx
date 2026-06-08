import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KAH Digital — Toutes nos apps",
  description: "ANTE · Vellio · TechCash · KAH Digital — Défis financiers, e-commerce premium, formations digitales.",
  openGraph: {
    title: "KAH Digital — Toutes nos apps",
    description: "ANTE · Vellio · TechCash · KAH Digital",
    images: [{ url: "https://kah-digital.ch/og-links.png", width: 1200, height: 630 }],
  },
};

const links = [
  {
    emoji: "🏆",
    name: "ANTE — Défis financiers",
    desc: "Mise réelle. Check-in. Le dernier debout rafle tout. #CoupeduMonde2026",
    url: "https://stackr-app-three.vercel.app",
    color: "from-amber-500 to-yellow-400",
    badge: "🔥 NOUVEAU",
    hot: true,
  },
  {
    emoji: "🛍️",
    name: "Vellio — E-commerce premium",
    desc: "Objets design & tech sélectionnés. Livraison suivie, retours 30j.",
    url: "https://vellio-shop.vercel.app",
    color: "from-stone-700 to-stone-900",
    badge: null,
    hot: false,
  },
  {
    emoji: "🎓",
    name: "TechCash Academy",
    desc: "Formations digitales pour générer des revenus en ligne. Stripe live.",
    url: "https://techcash-academy.vercel.app",
    color: "from-blue-600 to-indigo-700",
    badge: null,
    hot: false,
  },
  {
    emoji: "⚡",
    name: "KAH Digital — Agence IA",
    desc: "On construit des SaaS, apps et systèmes d'automatisation. Basé à Lausanne.",
    url: "https://kah-digital.ch",
    color: "from-emerald-500 to-teal-600",
    badge: null,
    hot: false,
  },
];

const socials = [
  { name: "TikTok", url: "https://tiktok.com/@kah.digital", icon: "🎵" },
  { name: "LinkedIn", url: "https://linkedin.com/company/kah-digital-95128b408", icon: "💼" },
  { name: "X / Twitter", url: "https://x.com/DigitalKah42", icon: "🐦" },
  { name: "WhatsApp", url: "https://wa.me/33759558414?text=Bonjour%20KAH%20Digital", icon: "💬" },
];

export default function LinksPage() {
  return (
    <main className="min-h-dvh bg-black text-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-sm">

        {/* Avatar + nom */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-3xl font-black text-black mb-3 shadow-lg shadow-amber-500/30">
            K
          </div>
          <h1 className="text-xl font-black tracking-tight">KAH Digital</h1>
          <p className="text-sm text-white/50 mt-1">Apps · SaaS · Automatisation · Lausanne</p>
          <div className="mt-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold">
            🏟️ Coupe du Monde 2026 — ANTE est live
          </div>
        </div>

        {/* Links */}
        <div className="space-y-3 w-full">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 p-4 transition-all duration-200 hover:scale-[1.02] hover:border-white/20"
            >
              {link.hot && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full">
                  {link.badge}
                </span>
              )}
              <span className={`w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-2xl shadow-md`}>
                {link.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm text-white truncate">{link.name}</p>
                <p className="text-xs text-white/50 leading-relaxed mt-0.5 line-clamp-2">{link.desc}</p>
              </div>
              <span className="text-white/30 group-hover:text-white/60 transition shrink-0 text-lg">→</span>
            </a>
          ))}
        </div>

        {/* Socials */}
        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          {socials.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm font-medium text-white/70 hover:text-white"
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-white/25">
          © 2026 KAH Digital Sàrl · Lausanne · Suisse
        </p>
      </div>
    </main>
  );
}
