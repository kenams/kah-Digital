import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsEn: PortfolioProject[] = [
  {
    slug: "ashanti-beauty",
    name: "Ashanti Beauty",
    type: "Premium showcase site / Beauty institute",
    tagline:
      "Premium showcase site built for a high-end beauty institute in Balma — full-screen video, 5 service pillars and a fluid experience.",
    shortDescription:
      "Next.js premium site with HD hero video, story section, 5 service pillars with Planity booking buttons, partners, gallery, reviews and Google Maps.",
    description:
      "Ashanti Beauty is a premium beauty institute located in Balma, France. KAH-Digital designed and developed their showcase site with a high-end look: full-screen hero video optimised for mobile and desktop, institute story presentation, 5 service pillars (Nails Bar, Brows Bar, Lashes Bar, Skincare, Massage), partner showcase, Instagram gallery, client reviews and Google Maps.",
    challenge:
      "Build a site that reflects the institute's premium positioning: smooth rendering, HD video well-integrated on mobile and desktop, clear service structure, and booking conversion via Planity.",
    solution:
      "Next.js 16 with Tailwind CSS, responsive hero video component (JS-based source switching per viewport), controlled cinematic animations, scroll-reveal sections, Planity booking buttons on each pillar, embedded Google Maps and a minimal footer.",
    stack: ["Next.js 16", "Tailwind CSS", "TypeScript", "Vercel"],
    result:
      "Premium site live with functional HD video on mobile and desktop, clear service structure and Planity booking funnel.",
    timeline: "1 week",
    deliverables: [
      "Full-screen HD hero video",
      "5 service sections with Planity CTA",
      "Partner showcase (9 brands)",
      "Gallery + reviews + Google Maps",
    ],
    metrics: [
      { label: "Sections", value: "7" },
      { label: "Service pillars", value: "5" },
      { label: "Partners", value: "9" },
    ],
    highlights: [
      "Responsive hero video mobile/desktop",
      "Nails · Brows · Lashes · Skincare · Massage",
      "Planity booking integrated",
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
    type: "Training platform / Stripe checkout",
    tagline:
      "A KAH-Digital platform built to sell digital training products with a catalog, member area, and product-based access.",
    shortDescription:
      "Multi-product catalog, Supabase auth, Stripe checkout, member dashboard, and text, PDF, resource, video, or coming-soon content.",
    description:
      "TechCash Academy is one of the products designed by KAH-Digital. The platform was built as a cleaner base to sell multiple digital training offers, structure the catalog, reassure before checkout, and unlock member access one product at a time.",
    challenge:
      "Build a clearer academy platform able to sell multiple offers without a messy funnel, while keeping the member area readable, checkout reliable, and access logic simple enough to evolve.",
    solution:
      "The product was structured with a multi-offer catalog, Stripe checkout tied to the correct product, a Supabase base for auth and purchases, a training-specific member dashboard, and an admin layer to manage catalog items and modules.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result:
      "A more credible online training platform, structured to sell cleanly and deliver product-by-product member access.",
    timeline: "1 week",
    deliverables: [
      "Product direction and academy funnel",
      "Multi-training catalog",
      "Stripe checkout + webhook",
      "Member dashboard + content admin",
    ],
    metrics: [
      { label: "Live trainings", value: "5" },
      { label: "Access model", value: "Per product" },
      { label: "Base", value: "Supabase + Stripe" },
    ],
    highlights: [
      "Multi-product catalog",
      "Stripe checkout + member access",
      "Text / PDF / resources / video / coming soon",
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
    type: "SaaS / mining intelligence",
    tagline:
      "A KAH-Digital build focused on minerals, price tracking, market news, and user alerts.",
    shortDescription:
      "Business dashboard, Supabase auth, watchlist, alerts, live scraping, and Vercel deployment for a private beta-ready product.",
    description:
      "MineAlert is one of the products built by KAH-Digital. The goal was to create a mining intelligence cockpit able to centralize prices, news signals, watchlists, and alerts inside a cleaner and more actionable interface.",
    challenge:
      "Design an intelligence tool that stays clear, fast to scan, and strong enough to support real data sources, authentication, and monitoring logic without turning into a noisy interface.",
    solution:
      "The product was built on a modern Next.js base with Supabase email and Google auth, a scraping pipeline for prices and news, a usage-driven dashboard, and a free refresh model adapted to hosted beta conditions.",
    stack: ["Next.js", "TypeScript", "Supabase", "Playwright", "Vercel"],
    result:
      "A live mining intelligence SaaS, automated, easier to read, and already usable as a KAH-Digital product reference.",
    timeline: "3 weeks",
    deliverables: [
      "Product direction and dashboard UX",
      "Supabase auth + Google OAuth",
      "Price and news scraping pipeline",
      "Monitoring and E2E testing base",
    ],
    metrics: [
      { label: "Live sources", value: "2+" },
      { label: "Auth flows", value: "Email + Google" },
      { label: "Base", value: "Supabase + Vercel" },
    ],
    highlights: [
      "Price / news / alerts dashboard",
      "User watchlist and alerts",
      "Free live sync + monitoring",
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
    type: "Mobile app / Fishing marketplace",
    tagline:
      "iOS & Android app connecting fishermen and buyers: sell fresh catches, book a pickup, track orders and chat in-app.",
    shortDescription:
      "Mobile marketplace with dual roles (fisher / buyer), Supabase auth, geolocation, cart, booking, order tracking, chat, push notifications and delivery QR code.",
    description:
      "DroPiPêche is a mobile marketplace app connecting fishermen with buyers of fresh fish. Built with Expo React Native, it offers two distinct flows: fishers create listings with photos, geolocation and availability; buyers browse listings, book, pay and track their order through to delivery via QR code. An admin panel supervises profiles and transactions.",
    challenge:
      "Design two watertight user flows (fisher / buyer) within a single app, handle geolocation for meeting points, integrate real-time chat and a booking system with slot management.",
    solution:
      "Expo React Native with typed navigation, Supabase for auth, database and bookings, expo-location for geolocation, expo-notifications for alerts and expo-print for delivery QR code generation.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "Geolocation", "Push Notifications", "QR Code"],
    result:
      "Full iOS & Android app with dual flow, booking, payment, chat and order tracking — ready for store submission.",
    timeline: "8 weeks",
    deliverables: [
      "Dual fisher / buyer flow",
      "Supabase auth + profiles",
      "Geolocation & meeting point",
      "Cart, booking, order tracking",
      "Integrated real-time chat",
      "Delivery QR code",
    ],
    metrics: [
      { label: "Screens", value: "20+" },
      { label: "Roles", value: "2 + admin" },
      { label: "Stack", value: "Expo + Supabase" },
    ],
    highlights: [
      "Dual fisher / buyer role",
      "Chat & push notifications",
      "QR code delivery + order tracking",
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
    type: "Mobile app / Sport & Gaming",
    tagline:
      "Viral sports challenge app: live battles, leaderboards, territories, community reputation and reward system.",
    shortDescription:
      "Gamified mobile app with sports challenges, live battles, leaderboard, territory system, shop, wallet, moderation and coach space.",
    description:
      "Immortal Arena turns sports challenges into a gamified community experience. Users launch challenges, participate in filmed live battles, earn reputation points, conquer territories and climb leaderboards. A coach space allows athlete tracking, and a moderation system enforces fair play.",
    challenge:
      "Build an app with real-time flows (live battles, live votes), full gamification (rankings, territories, shop, wallet) and frictionless moderation for a sports community.",
    solution:
      "Expo React Native with Supabase for real-time data, expo-camera and expo-video for lives, push notifications for incoming challenges, cron scripts for vote finalization and battle closure.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "expo-video", "Push Notifications"],
    result:
      "Full sports mobile app with live battles, real-time leaderboards, integrated shop and moderation panel — production-ready structure.",
    timeline: "6 weeks",
    deliverables: [
      "Challenges & filmed live battles",
      "Leaderboard & territory system",
      "Shop & points wallet",
      "Coach space & moderation",
      "Push notifications & automated crons",
    ],
    metrics: [
      { label: "Screens", value: "30+" },
      { label: "Modes", value: "Challenge + Live + Territory" },
      { label: "Stack", value: "Expo + Supabase" },
    ],
    highlights: [
      "Filmed live battles with live voting",
      "Rankings, territories & shop",
      "Coach space + fair-play moderation",
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
    type: "Showcase site + E-commerce / Art gallery",
    tagline:
      "Premium site built for a contemporary painter: catalogued artwork gallery, admin space and Stripe checkout.",
    shortDescription:
      "Next.js 15 site with filtered artwork gallery, admin panel to manage catalogue, Stripe checkout and legal pages — ready to go live.",
    description:
      "Ruby Gallery is a premium showcase site delivered to a contemporary painter. It presents her world, a filtered artwork catalogue, an about page, a contact form and a Stripe purchase flow. The admin panel lets Ruby manage artworks, prices and availability without any technical input. Deployed on Vercel with Neon Postgres.",
    challenge:
      "Build a site that showcases the artworks without visually overwhelming them, with a simple admin for a non-technical artist, a reliable checkout and fast deployment with no WordPress dependency.",
    solution:
      "Next.js 15 App Router, Prisma with Neon Postgres, gallery filtered by type and availability, session-protected admin, Stripe checkout with success/cancel pages, auto-generated sitemap and robots.",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "Stripe", "Neon Postgres", "Vercel"],
    result:
      "Premium gallery site live, working admin, operational Stripe checkout — delivered turnkey to the artist.",
    timeline: "2 weeks",
    deliverables: [
      "Filtered gallery by category",
      "Artworks / price / availability admin",
      "Stripe checkout + webhook",
      "Legal & terms pages",
      "Auto sitemap + basic SEO",
    ],
    metrics: [
      { label: "Stack", value: "Next.js + Prisma" },
      { label: "Payment", value: "Stripe integrated" },
      { label: "Admin", value: "Turnkey" },
    ],
    highlights: [
      "Premium gallery with filters",
      "No-code artist admin",
      "Stripe checkout + Neon Postgres",
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
    type: "Music label / production",
    tagline: "A KAH-Digital build for an independent label shaped around artists, releases, and image.",
    shortDescription:
      "Premium label website with real sections for Label, Artists, Releases, Clips, Events, Networks, and Contact.",
    description:
      "KAH Prod is one of the projects produced by KAH-Digital. The live site works as a clearer base to present the label identity, showcase artists, expose releases and clips, highlight events, and centralize business contacts with a sharper visual direction.",
    challenge:
      "Give the label a stronger visual presence and a clearer structure, able to present identity, artists, and releases without losing readability or premium perception.",
    solution:
      "Structured homepage, direct navigation by content type, clearer releases and clips sections, events visibility, network links, and separate business contacts for management, booking, press, and communication.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Live label website with a cleaner structure and a stronger way to present the KAH Prod universe",
    timeline: "2 weeks",
    deliverables: ["Art direction", "Premium homepage", "Artists and releases sections", "Business contacts"],
    metrics: [
      { label: "Visible sections", value: "7" },
      { label: "Business contacts", value: "4" },
      { label: "Base", value: "Vercel" },
    ],
    highlights: ["Label / Artists / Releases / Clips", "Events + networks", "Management / Booking / Press / Communication"],
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
