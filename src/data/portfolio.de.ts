import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsDe: PortfolioProject[] = [
  {
    slug: "ashanti-beauty",
    name: "Ashanti Beauty",
    type: "Premium-Website / Schönheitsinstitut",
    tagline:
      "Premium-Website für ein hochwertiges Schönheitsinstitut in Balma — Vollbild-Video, 5 Leistungsbereiche und ein flüssiges Erlebnis.",
    shortDescription:
      "Next.js Premium-Website mit HD-Hero-Video, Story-Bereich, 5 Leistungsbereichen mit Planity-Buchungsbuttons, Partnern, Galerie, Bewertungen und Google Maps.",
    description:
      "Ashanti Beauty ist ein hochwertiges Schönheitsinstitut in Balma, Frankreich. KAH-Digital hat ihre Website mit hochwertigem Design entwickelt: Vollbild-Hero-Video optimiert für Mobile und Desktop, Präsentation des Instituts, 5 Leistungsbereiche (Nails Bar, Brows Bar, Lashes Bar, Ästhetik, Massage), Partnermarken, Galerie, Kundenbewertungen und Google Maps.",
    challenge:
      "Eine Website erstellen, die das Premium-Positioning des Instituts widerspiegelt: flüssiges Rendering, HD-Video gut integriert auf Mobile und Desktop, klare Leistungsstruktur und Buchungsconversion über Planity.",
    solution:
      "Next.js 16 mit Tailwind CSS, responsives Hero-Video-Komponente (JS-basiertes Source-Switching je nach Viewport), kontrollierte cineastische Animationen, Scroll-Reveal-Sektionen, Planity-Buchungsbuttons auf jedem Bereich, eingebettetes Google Maps und minimaler Footer.",
    stack: ["Next.js 16", "Tailwind CSS", "TypeScript", "Vercel"],
    result:
      "Premium-Website live mit funktionierendem HD-Video auf Mobile und Desktop, klarer Leistungsstruktur und Planity-Buchungstunnel.",
    timeline: "1 Woche",
    deliverables: [
      "Vollbild-HD-Hero-Video",
      "5 Leistungsbereiche mit Planity-CTA",
      "Partnerbereich (9 Marken)",
      "Galerie + Bewertungen + Google Maps",
    ],
    metrics: [
      { label: "Bereiche", value: "7" },
      { label: "Leistungsbereiche", value: "5" },
      { label: "Partner", value: "9" },
    ],
    highlights: [
      "Responsives Hero-Video Mobile/Desktop",
      "Nails · Brows · Lashes · Ästhetik · Massage",
      "Planity-Buchung integriert",
    ],
    palette: {
      primary: "#151113",
      secondary: "#34242d",
      accent: "#f7d9e8",
    },
    website: "https://ashanti-beauty.vercel.app/",
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
      "TechCash Academy gehört zu den Produkten, die von KAH-Digital entwickelt wurden. Die Plattform wurde als saubere Basis aufgebaut, um mehrere digitale Trainingsangebote zu verkaufen, den Katalog klar zu strukturieren, vor dem Checkout Vertrauen aufzubauen und den Zugang pro Produkt freizuschalten.",
    challenge:
      "Eine klarere Academy-Plattform aufbauen, die mehrere Angebote ohne unruhigen Funnel verkaufen kann und gleichzeitig einen lesbaren Mitgliederbereich, einen stabilen Checkout und eine einfache, erweiterbare Zugangslogik behält.",
    solution:
      "Aufgesetzt wurde ein Multi-Produkt-Katalog, ein Stripe Checkout pro Angebot, eine Supabase-Basis für Authentifizierung und Käufe, ein trainingsbezogenes Member-Dashboard sowie eine Admin-Schicht zur Pflege von Katalog und Modulen.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result:
      "Eine glaubwürdigere Online-Trainingsplattform, sauber strukturiert für Verkauf und produktbezogenen Mitgliederzugang.",
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
  },
  {
    slug: "minealert",
    name: "MineAlert",
    type: "SaaS / Mining Intelligence",
    tagline:
      "Ein KAH-Digital Produkt für Mineralien, Preisbeobachtung, Marktnews und Nutzer-Alerts.",
    shortDescription:
      "Business-Dashboard, Supabase Auth, Watchlist, Alerts, Live-Scraping und Vercel-Deployment für ein produktionsnahes Beta-Setup.",
    description:
      "MineAlert gehört zu den Produkten, die von KAH-Digital entwickelt wurden. Ziel war ein klares Mining-Intelligence-Cockpit, das Preise, News-Signale, Watchlists und Alerts in einer besser lesbaren und nutzbaren Oberfläche zusammenführt.",
    challenge:
      "Ein Intelligence-Tool entwickeln, das klar, schnell erfassbar und technisch stabil genug bleibt, um echte Datenquellen, Authentifizierung und Monitoring aufzunehmen, ohne unruhig zu wirken.",
    solution:
      "Die Basis wurde mit Next.js, Supabase Auth für E-Mail und Google, einer Scraping-Pipeline für Preise und News, einem nutzungsorientierten Dashboard und einem kostenlosen Refresh-Modell für Hosted-Beta-Szenarien aufgebaut.",
    stack: ["Next.js", "TypeScript", "Supabase", "Playwright", "Vercel"],
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
      "Dashboard für Preise / News / Alerts",
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
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Musiklabel / Produktion",
    tagline: "Eine KAH-Digital Realisierung für ein unabhängiges Label mit Fokus auf Bild, Artists und Releases.",
    shortDescription:
      "Premium-Website für ein Label mit klaren Bereichen für Label, Artists, Releases, Clips, Events, Netzwerke und Kontakt.",
    description:
      "KAH Prod gehört zu den Projekten, die von KAH-Digital entwickelt wurden. Die Live-Website schafft eine klare Basis, um Identität, Artists, Releases, Clips, Events und Business-Kontakte in einem stärkeren visuellen Rahmen zu präsentieren.",
    challenge:
      "Dem Label eine stärkere visuelle Präsenz und eine klarere Struktur geben, damit Identität, Artists und Releases ohne Informationschaos und mit hochwertiger Wahrnehmung präsentiert werden.",
    solution:
      "Klare Startseite, direkte Navigation nach Inhalten, besser lesbare Bereiche für Releases und Clips, sichtbare Events und Netzwerke sowie getrennte Kontakte für Management, Booking, Presse und Kommunikation.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Live-Label-Website mit klarerer Struktur und einer stärkeren Darstellung des KAH-Prod Universums",
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
];
