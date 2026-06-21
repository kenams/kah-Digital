import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsDe: PortfolioProject[] = [
  {
    slug: "clutch",
    name: "CLUTCH",
    type: "App / Finanzielle Challenges zwischen Freunden",
    tagline:
      "Eine KAH-Digital App, um echtes Geld auf Sportprognosen zu setzen — WM 2026, Freundesgruppen, Live-Rangliste.",
    shortDescription:
      "Finanzielle Challenges zwischen Freunden: echter Einsatz, Spiel-für-Spiel-Prognosen, Live-Ranking, Stripe, Android APK und PWA.",
    description:
      "CLUTCH ist ein von KAH-Digital entwickeltes Produkt. Die Idee: Sportprognosen zwischen Freunden mit echten Einsätzen spannender machen. Jeder Teilnehmer zahlt eine Kaution, tippt jeden Match und sammelt Punkte (3 für Ergebnis, 1 für Sieger). Am Ende gewinnt der Beste den Topf. Ohne Wettanbieter — 100% unter Freunden.",
    challenge:
      "Ein wettbewerbsfähiges Erlebnis schaffen, das jeden WM-2026-Match intensiver macht — mit echtem Geld, aber ohne Glücksspiellizenz.",
    solution:
      "Full-Stack Next.js App mit Custom-Auth, Stripe, Neon PostgreSQL + Prisma, Live-Rangliste, 9 Challenge-Typen, Android APK und PWA.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Vercel"],
    result:
      "Live App mit aktiven Gruppen seit der WM-Gruppenphase — Echtzeit-Prognosen, dynamische Rangliste, echte Einsätze.",
    timeline: "3 Wochen",
    deliverables: [
      "Custom Auth + Benutzerprofile",
      "Challenge-System und Stripe-Kaution",
      "WM-2026-Prognosen Match für Match",
      "Live-Rangliste und Android APK",
    ],
    metrics: [
      { label: "Challenge-Typen", value: "9" },
      { label: "WM-Spiele", value: "104" },
      { label: "Plattformen", value: "Web + Android + PWA" },
    ],
    highlights: [
      "Genaues Ergebnis = 3 Pts · Richtiger Sieger = 1 Pt",
      "Echter Einsatz via Stripe — kein Wettanbieter",
      "Live-Rangliste + Android APK",
    ],
    palette: {
      primary: "#09090b",
      secondary: "#1a1a1f",
      accent: "#eab308",
    },
    website: "https://clutch.kah-digital.ch/",
    mockups: {
      primary: "/mockups/clutch.png",
      gallery: ["/mockups/clutch.png"],
    },
  },
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Musiklabel / Produktion",
    tagline: "Eine KAH-Digital Realisierung fuer ein unabhaengiges Label mit Fokus auf Bild, Artists und Releases.",
    shortDescription:
      "Premium-Website fuer ein Label mit klaren Bereichen fuer Label, Artists, Releases, Clips, Events, Netzwerke und Kontakt.",
    description:
      "KAH Prod gehoert zu den Projekten, die von KAH-Digital entwickelt wurden. Die Live-Website schafft eine klare Basis, um Identitaet, Artists, Releases, Clips, Events und Business-Kontakte in einem staerkeren visuellen Rahmen zu praesentieren.",
    challenge:
      "Dem Label eine staerkere visuelle Praesenz und eine klarere Struktur geben, damit Identitaet, Artists und Releases ohne Informationschaos und mit hochwertiger Wahrnehmung praesentiert werden.",
    solution:
      "Klare Startseite, direkte Navigation nach Inhalten, besser lesbare Bereiche fuer Releases und Clips, sichtbare Events und Netzwerke sowie getrennte Kontakte fuer Management, Booking, Presse und Kommunikation.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Live-Label-Website mit klarerer Struktur und einer staerkeren Darstellung des KAH-Prod Universums",
    timeline: "2 Wochen",
    deliverables: ["Art Direction", "Premium-Startseite", "Artists- und Release-Bereiche", "Business-Kontakte"],
    metrics: [
      { label: "Sichtbare Bereiche", value: "7" },
      { label: "Business-Kontakte", value: "4" },
      { label: "Basis", value: "Vercel" },
    ],
    highlights: ["Label / Artists / Releases / Clips", "Events und Netzwerke", "Management / Booking / Presse / Kommunikation"],
    palette: {
      primary: "#07111f",
      secondary: "#12304e",
      accent: "#47b8ff",
    },
    website: "https://kah-prod.vercel.app/",
    mockups: {
      primary: "/mockups/global-dashboard.png",
      gallery: ["/mockups/global-dashboard.svg", "/mockups/global-dashboard.png"],
    },
  },
  {
    slug: "minealert",
    name: "MineAlert",
    type: "SaaS / Mining Intelligence",
    tagline:
      "Ein KAH-Digital Produkt fuer Mineralien, Preisbeobachtung, Marktnews und Nutzer-Alerts.",
    shortDescription:
      "Business-Dashboard, Supabase Auth, Watchlist, Alerts, Live-Scraping und Vercel-Deployment fuer ein produktionsnahes Beta-Setup.",
    description:
      "MineAlert gehoert zu den Produkten, die von KAH-Digital entwickelt wurden. Ziel war ein klares Mining-Intelligence-Cockpit, das Preise, News-Signale, Watchlists und Alerts in einer besser lesbaren und nutzbaren Oberfläche zusammenfuehrt.",
    challenge:
      "Ein Intelligence-Tool entwickeln, das klar, schnell erfassbar und technisch stabil genug bleibt, um echte Datenquellen, Authentifizierung und Monitoring aufzunehmen, ohne unruhig zu wirken.",
    solution:
      "Die Basis wurde mit Next.js, Supabase Auth fuer E-Mail und Google, einer Scraping-Pipeline fuer Preise und News, einem nutzungsorientierten Dashboard und einem kostenlosen Refresh-Modell fuer Hosted-Beta-Szenarien aufgebaut.",
    stack: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Playwright",
      "Vercel",
    ],
    result:
      "Ein live erreichbares Mining-Intelligence-SaaS, automatisiert, lesbarer aufgebaut und bereits als KAH-Digital Referenz nutzbar.",
    timeline: "3 Wochen",
    deliverables: [
      "Produktdirection und Dashboard-UX",
      "Supabase Auth + Google OAuth",
      "Preis- und News-Scraping-Pipeline",
      "Monitoring und E2E-Testbasis",
    ],
    metrics: [
      { label: "Live-Quellen", value: "2+" },
      { label: "Auth-Flows", value: "Email + Google" },
      { label: "Basis", value: "Supabase + Vercel" },
    ],
    highlights: [
      "Dashboard fuer Preise / News / Alerts",
      "Watchlist und Nutzer-Alerts",
      "Kostenloser Live-Sync + Monitoring",
    ],
    palette: {
      primary: "#07110f",
      secondary: "#15382d",
      accent: "#d4af37",
    },
    website: "https://mine-alert-kenams.vercel.app/",
    mockups: {
      primary: "/mockups/minealert.svg",
      gallery: ["/mockups/minealert.svg"],
    },
  },
  {
    slug: "techcash-academy",
    name: "TechCash Academy",
    type: "Trainingsplattform / Stripe Checkout",
    tagline:
      "Eine KAH-Digital Plattform, um digitale Trainingsangebote mit Katalog, Mitgliederbereich und produktbezogenem Zugang zu verkaufen.",
    shortDescription:
      "Multi-Produkt-Katalog, Supabase Auth, Stripe Checkout, Member-Dashboard sowie Text-, PDF-, Ressourcen-, Video- und Coming-soon-Inhalte.",
    description:
      "TechCash Academy gehoert zu den Produkten, die von KAH-Digital entwickelt wurden. Die Plattform wurde als saubere Basis aufgebaut, um mehrere digitale Trainingsangebote zu verkaufen, den Katalog klar zu strukturieren, vor dem Checkout Vertrauen aufzubauen und den Zugang pro Produkt freizuschalten.",
    challenge:
      "Eine klarere Academy-Plattform aufbauen, die mehrere Angebote ohne unruhigen Funnel verkaufen kann und gleichzeitig einen lesbaren Mitgliederbereich, einen stabilen Checkout und eine einfache, erweiterbare Zugangslogik behaelt.",
    solution:
      "Aufgesetzt wurde ein Multi-Produkt-Katalog, ein Stripe Checkout pro Angebot, eine Supabase-Basis fuer Authentifizierung und Kaeufe, ein trainingsbezogenes Member-Dashboard sowie eine Admin-Schicht zur Pflege von Katalog und Modulen.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result:
      "Eine glaubwuerdigere Online-Trainingsplattform, sauber strukturiert fuer Verkauf und produktbezogenen Mitgliederzugang.",
    timeline: "1 Woche",
    deliverables: [
      "Produktdirection und Academy-Funnel",
      "Multi-Training-Katalog",
      "Stripe Checkout + Webhook",
      "Member-Dashboard + Content-Admin",
    ],
    metrics: [
      { label: "Live-Trainings", value: "5" },
      { label: "Zugang", value: "Pro Produkt" },
      { label: "Basis", value: "Supabase + Stripe" },
    ],
    highlights: [
      "Multi-Produkt-Katalog",
      "Stripe Checkout + Member-Zugang",
      "Text / PDF / Ressourcen / Video / Coming soon",
    ],
    palette: {
      primary: "#08111f",
      secondary: "#1b365d",
      accent: "#d7a93b",
    },
    website: "https://techcash-academy.vercel.app/",
    mockups: { primary: "/mockups/techcash-academy-screenshot.png", gallery: ["/mockups/techcash-academy-screenshot.png"] },
  },
  {
    slug: "castly",
    name: "Castly",
    type: "SaaS / Casting-Plattform",
    tagline: "Eine KAH-Digital-Plattform, die Recruiter und Künstler in wenigen Klicks verbindet — ohne Agentur, ohne Wartezeit.",
    shortDescription: "Künstler-/Recruiter-Matching mit Kreditsystem, Stripe live, Supabase-Auth und verifizierten Profilen.",
    description: "Castly ist eine von KAH-Digital entwickelte Plattform zur Modernisierung des unabhängigen Castings. Recruiter veröffentlichen ihre Angebote, Künstler bewerben sich mit ihrem Profil, und der Kontakt wird über ein Kreditsystem freigeschaltet.",
    challenge: "Einen zweiseitigen Marktplatz (Künstler / Recruiter) mit einfacher kreditbasierter Monetarisierung, einem Premium-Design und einem zuverlässigen Backend für Auth, Zahlungen und Matching aufbauen.",
    solution: "Full-Stack Next.js, Supabase für Auth und DB, Stripe live für Kreditpakete (5 / 20 / 50 Credits), Vollbild-Hero-Video, transparente scrollende Nav, Testimonials und FAQ.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result: "Live-Plattform mit echten Zahlungen, Künstler- und Recruiterprofilen und operativem Kreditsystem.",
    timeline: "4 Wochen",
    deliverables: ["Supabase Auth + Künstler-/Recruiterprofile", "Kreditsystem + Stripe-Live-Checkout", "Matching und Kontaktfreischaltung", "Premium-Video-Hero-Design + FAQ"],
    metrics: [
      { label: "Kreditpakete", value: "3" },
      { label: "Zahlungen", value: "Stripe live" },
      { label: "Basis", value: "Supabase + Vercel" },
    ],
    highlights: ["Zweiseitiger Marktplatz Künstler / Recruiter", "Credits ohne Abo — 9,90€ / 29,90€ / 59,90€", "Supabase Auth + Stripe live aktiv"],
    palette: { primary: "#07070f", secondary: "#12121e", accent: "#e8b86d" },
    website: "https://castly-chi.vercel.app/",
    mockups: { primary: "/mockups/castly-screenshot.png", gallery: ["/mockups/castly-screenshot.png"] },
  },
];
