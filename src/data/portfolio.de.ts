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
    slug: "dropigo",
    name: "DroPiPêche",
    type: "Mobile App / Angel-Marktplatz",
    tagline:
      "iOS & Android App, die Angler mit Käufern verbindet: Frischfischverkauf, Buchung, Bestellverfolgung und integrierter Chat.",
    shortDescription:
      "Mobile Marktplatz mit zwei Rollen (Angler / Käufer), Supabase-Auth, Geolokalisierung, Warenkorb, Buchung, Bestelltracking, Chat, Push-Benachrichtigungen und Liefer-QR-Code.",
    description:
      "DroPiPêche ist eine mobile Marktplatz-App, die Angler mit Frischfischkäufern verbindet. Entwickelt mit Expo React Native bietet sie zwei getrennte Flows: Angler erstellen Inserate mit Fotos, Standort und Verfügbarkeit; Käufer durchsuchen Inserate, buchen, bezahlen und verfolgen ihre Bestellung bis zur Lieferung per QR-Code. Ein Admin-Panel verwaltet Profile und Transaktionen.",
    challenge:
      "Zwei getrennte Nutzerflows (Angler / Käufer) in einer App gestalten, Geolokalisierung für Treffpunkte integrieren, Echtzeit-Chat einbinden und ein Buchungssystem mit Zeitfensterverwaltung umsetzen.",
    solution:
      "Expo React Native mit getypter Navigation, Supabase für Auth, Datenbank und Buchungen, expo-location für Geolokalisierung, expo-notifications für Benachrichtigungen und expo-print für QR-Code-Generierung.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "Geolokalisierung", "Push Notifications", "QR Code"],
    result:
      "Vollständige iOS & Android App mit Dual-Flow, Buchung, Zahlung, Chat und Bestelltracking — bereit für Store-Einreichung.",
    timeline: "8 Wochen",
    deliverables: [
      "Dualer Angler / Käufer Flow",
      "Supabase Auth + Profile",
      "Geolokalisierung & Treffpunkt",
      "Warenkorb, Buchung, Bestelltracking",
      "Integrierter Echtzeit-Chat",
      "Liefer-QR-Code",
    ],
    metrics: [
      { label: "Screens", value: "20+" },
      { label: "Rollen", value: "2 + Admin" },
      { label: "Stack", value: "Expo + Supabase" },
    ],
    highlights: [
      "Dual-Rolle Angler / Käufer",
      "Chat & Push Notifications",
      "QR-Code Lieferung + Bestelltracking",
    ],
    palette: {
      primary: "#071420",
      secondary: "#0f2d4a",
      accent: "#3b9ef6",
    },
  },
  {
    slug: "immortal-arena",
    name: "Immortal Arena",
    type: "Mobile App / Sport & Gaming",
    tagline:
      "Virale Sport-Challenge-App: Live Battles, Bestenlisten, Territorien, Community-Reputation und Belohnungssystem.",
    shortDescription:
      "Gamifizierte Mobile App mit Sport-Challenges, Live Battles, Leaderboard, Territorien, Shop, Wallet, Moderation und Coach-Bereich.",
    description:
      "Immortal Arena verwandelt Sport-Challenges in ein gamifiziertes Community-Erlebnis. Nutzer starten Challenges, nehmen an gefilmten Live Battles teil, sammeln Reputationspunkte, erobern Territorien und steigen in Ranglisten auf. Ein Coach-Bereich ermöglicht Athletenverfolgung, ein Moderationssystem sichert Fair Play.",
    challenge:
      "Eine App mit Echtzeit-Flows (Live Battles, Live-Abstimmungen), vollständiger Gamifizierung (Rankings, Territorien, Shop, Wallet) und reibungsloser Moderation für eine Sport-Community aufbauen.",
    solution:
      "Expo React Native mit Supabase für Echtzeit-Daten, expo-camera und expo-video für Lives, Push-Benachrichtigungen für eingehende Challenges, Cron-Scripts für Abstimmungsfinalisierung und Battle-Abschluss.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "expo-video", "Push Notifications"],
    result:
      "Vollständige Sport-Mobile-App mit Live Battles, Echtzeit-Bestenlisten, integriertem Shop und Moderationspanel — produktionsreife Struktur.",
    timeline: "6 Wochen",
    deliverables: [
      "Challenges & gefilmte Live Battles",
      "Bestenliste & Territorien-System",
      "Shop & Punkte-Wallet",
      "Coach-Bereich & Moderation",
      "Push Notifications & automatisierte Crons",
    ],
    metrics: [
      { label: "Screens", value: "30+" },
      { label: "Modi", value: "Challenge + Live + Territorium" },
      { label: "Stack", value: "Expo + Supabase" },
    ],
    highlights: [
      "Gefilmte Live Battles mit Live-Voting",
      "Rankings, Territorien & Shop",
      "Coach-Bereich + Fair-Play-Moderation",
    ],
    palette: {
      primary: "#050507",
      secondary: "#1a0d1f",
      accent: "#e63946",
    },
  },
  {
    slug: "ruby-gallery",
    name: "Ruby Gallery",
    type: "Website + E-Commerce / Kunstgalerie",
    tagline:
      "Premium-Website für eine zeitgenössische Malerin: katalogisierte Werkgalerie, Admin-Bereich und Stripe-Checkout.",
    shortDescription:
      "Next.js 15 Website mit gefilterter Kunstgalerie, Admin-Panel für Katalogverwaltung, Stripe-Checkout und rechtliche Seiten — bereit zur Veröffentlichung.",
    description:
      "Ruby Gallery ist eine Premium-Website, die für eine zeitgenössische Malerin geliefert wurde. Sie präsentiert ihr Universum, einen gefilterten Werkkatalog, eine About-Seite, ein Kontaktformular und einen Stripe-Kaufprozess. Das Admin-Panel ermöglicht Ruby, Werke, Preise und Verfügbarkeiten ohne technische Kenntnisse zu verwalten. Bereitgestellt auf Vercel mit Neon Postgres.",
    challenge:
      "Eine Website erstellen, die Kunstwerke visuell in Szene setzt, mit einem einfachen Admin für eine nicht-technische Künstlerin, zuverlässigem Checkout und schneller Bereitstellung ohne WordPress.",
    solution:
      "Next.js 15 App Router, Prisma mit Neon Postgres, gefilterte Galerie nach Typ und Verfügbarkeit, sitzungsgeschützter Admin, Stripe-Checkout mit Erfolgs-/Abbruchseiten, automatisch generierte Sitemap und Robots.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "Stripe", "Neon Postgres", "Vercel"],
    result:
      "Premium-Galeriewebsite live, funktionierender Admin, betriebsbereiter Stripe-Checkout — schlüsselfertig an die Künstlerin übergeben.",
    timeline: "2 Wochen",
    deliverables: [
      "Gefilterte Galerie nach Kategorie",
      "Werke / Preis / Verfügbarkeit Admin",
      "Stripe-Checkout + Webhook",
      "Rechtliche Seiten & AGB",
      "Auto-Sitemap + Basis-SEO",
    ],
    metrics: [
      { label: "Stack", value: "Next.js + Prisma" },
      { label: "Zahlung", value: "Stripe integriert" },
      { label: "Admin", value: "Schlüsselfertig" },
    ],
    highlights: [
      "Premium-Galerie mit Filtern",
      "No-Code Künstlerin-Admin",
      "Stripe-Checkout + Neon Postgres",
    ],
    palette: {
      primary: "#13100e",
      secondary: "#2a1f18",
      accent: "#c9956c",
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
