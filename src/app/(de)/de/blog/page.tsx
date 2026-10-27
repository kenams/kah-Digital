import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";

export const metadata: Metadata = {
  title: "KAH Digital Studio Blog — Tipps zu Website, SEO und Digitalem für KMU",
  description: "Praxisleitfäden zu Website-Erstellung, Offerten, Relaunch und SEO für KMU und Selbstständige. Von KAH Digital Studio, einem Digitalstudio auf Distanz für Frankreich und die Schweiz.",
  alternates: { canonical: "https://kah-digital.ch/de/blog" },
};

const ARTICLES = [
  {
    slug: "website-kosten-schaetzen",
    title: "So schätzen Sie die Kosten einer professionellen Website 2026",
    excerpt: "Landingpage, Visitenkarten-Website, Corporate-Website, Anwendung — so planen Sie eine individuelle Offerte rund um Ihren tatsächlichen Bedarf.",
    readTime: "6 Min.",
    date: "24. April 2026",
    tag: "Offerte",
  },
  {
    slug: "website-relaunch",
    title: "Website-Relaunch: Wann sollten Sie starten und wie gehen Sie vor?",
    excerpt: "Die 7 Anzeichen, dass es Zeit für einen Relaunch ist, und die Methode, ihn ohne Budgetverschwendung zu meistern.",
    readTime: "5 Min.",
    date: "24. April 2026",
    tag: "Strategie",
  },
  {
    slug: "website-erstellen-kmu",
    title: "Website für ein KMU erstellen: der komplette Leitfaden 2026",
    excerpt: "Alles, was ein KMU vor der Bestellung einer Website wissen sollte — vom Briefing bis zum Launch, ohne über den Tisch gezogen zu werden.",
    readTime: "7 Min.",
    date: "24. April 2026",
    tag: "Leitfaden",
  },
  {
    slug: "website-handwerker",
    title: "Website für Handwerker: der komplette Leitfaden 2026",
    excerpt: "Sanitär, Elektro, Schreiner — eine einfache, gut gemachte Website kann Ihnen jede Woche Kunden bringen. Offerte, wesentliche Inhalte, Fehler, die Sie vermeiden.",
    readTime: "5 Min.",
    date: "4. Mai 2026",
    tag: "Handwerker",
  },
  {
    slug: "website-restaurant",
    title: "Website für Restaurants: was Sie 2026 wirklich brauchen",
    excerpt: "Speisekarte nicht auffindbar, Website nicht mobil, keine Reservation — die Fehler, die Gäste vertreiben, noch bevor sie ankommen.",
    readTime: "5 Min.",
    date: "4. Mai 2026",
    tag: "Restaurants",
  },
  {
    slug: "webagentur-kmu-waehlen",
    title: "So wählen Sie eine Webagentur für Ihr KMU",
    excerpt: "Die guten Zeichen, die Warnsignale und die Fragen, die Sie vor der Unterschrift stellen sollten. Ein Leitfaden ohne Filter.",
    readTime: "6 Min.",
    date: "4. Mai 2026",
    tag: "KMU",
  },
  {
    slug: "mobile-app-kosten-schaetzen",
    title: "So schätzen Sie die Kosten einer Mobile-App 2026",
    excerpt: "PWA, React-Native-MVP, vollständige App, nativ — die Offertenkriterien und wie Sie Ihr Budget im Griff behalten.",
    readTime: "7 Min.",
    date: "4. Mai 2026",
    tag: "Mobile",
  },
  {
    slug: "landingpage-oder-website",
    title: "Landingpage oder Visitenkarten-Website: was wählen?",
    excerpt: "Es sind nicht dieselben Werkzeuge. So entscheiden Sie in 2 Minuten nach Ziel, Budget und Situation.",
    readTime: "5 Min.",
    date: "4. Mai 2026",
    tag: "Strategie",
  },
  {
    slug: "lokales-seo-kmu",
    title: "Lokales SEO für KMU: 2026 auf der ersten Google-Seite erscheinen",
    excerpt: "Google Business Profile, lokale Seiten, LocalBusiness-Schema, Kundenbewertungen — die konkreten Massnahmen, damit Kunden Sie finden.",
    readTime: "8 Min.",
    date: "4. Mai 2026",
    tag: "SEO",
  },
  {
    slug: "ki-automatisierung-kmu",
    title: "KI-Automatisierung für KMU 2025: Was wirklich funktioniert (und was nicht)",
    excerpt: "Die 5 Anwendungsfälle mit realistischem ROI-Potenzial — und warum die meisten KI-Projekte scheitern.",
    readTime: "6 Min.",
    date: "2025",
    tag: "KI",
  },
  {
    slug: "website-kosten-2025",
    title: "Website-Kosten 2025: Was kostet eine professionelle Website in der Schweiz und Deutschland?",
    excerpt: "Transparente Übersicht der echten Kosten für eine professionelle Website — Landingpage, Business-Site, Web-App.",
    readTime: "6 Min.",
    date: "2025",
    tag: "Offerte",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Offerte": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Strategie": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  "Leitfaden": "border-violet-500/30 bg-violet-500/10 text-violet-400",
  "Handwerker": "border-orange-500/30 bg-orange-500/10 text-orange-400",
  "Restaurants": "border-red-500/30 bg-red-500/10 text-red-400",
  "KMU": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Mobile": "border-violet-500/30 bg-violet-500/10 text-violet-400",
  "SEO": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  "KI": "border-blue-500/30 bg-blue-500/10 text-blue-400",
};

export default function BlogDePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">KAH Digital Studio Blog</h1>
          <p className="text-lg text-gray-400">Praxistipps zu Websites, SEO und Digitalem für KMU und Selbstständige.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="grid gap-6">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/de/blog/${a.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-gray-900 p-6 transition hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[a.tag] ?? "border-blue-500/30 bg-blue-500/10 text-blue-400"}`}>{a.tag}</span>
                <span className="flex items-center gap-1 text-xs text-gray-600"><FiClock size={11} /> {a.readTime}</span>
                <span className="ml-auto text-xs text-gray-600">{a.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white transition group-hover:text-blue-300">{a.title}</h2>
              <p className="text-sm leading-relaxed text-gray-400">{a.excerpt}</p>
              <span className="flex items-center gap-1 text-sm font-semibold text-blue-400">Artikel lesen <FiArrowRight size={13} /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
