import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsEn: PortfolioProject[] = [
  {
    slug: "kotizy",
    name: "Kotizy",
    type: "Mobile App & Web App / Diaspora Fintech",
    tagline:
      "The first digital tontine platform for the African diaspora. Automatic contributions, multi-currency wallet, Mobile Money payments — available on Android and iOS.",
    shortDescription:
      "Next.js PWA + Expo React Native. Built-in wallet, Stripe, CinetPay (Orange Money, MTN, Wave), trust score, push notifications. Live in production.",
    description:
      "Kotizy digitalises the African tontine — the ancestral collective savings system — into a modern, secure and fully automated experience. KAH Digital designed and built the entire platform: Next.js web app on Vercel, native Android app via Expo, API backend with Prisma/Supabase, multi-currency payment system (Stripe, CinetPay), and a daily cron job that manages contributions, reminders and payouts 100% automatically.",
    challenge:
      "Build a robust financial platform for the African diaspora: multi-currency (EUR, XOF, GBP), Mobile Money payments (Orange Money, MTN, Wave), trust score, default management and automatic payouts — with zero manual intervention.",
    solution:
      "Next.js App Router + Expo React Native. Integrated wallet with live Stripe, CinetPay for African Mobile Money, daily Vercel cron for auto-pay and payouts, algorithmic trust score, push notifications, iOS-installable PWA.",
    stack: ["Next.js", "Expo React Native", "Supabase", "Prisma", "Stripe", "CinetPay", "Vercel", "TypeScript"],
    result:
      "Live in production. Available on Android (direct APK) and iOS (PWA). Live Stripe payments active. CinetPay Mobile Money pending KYC validation.",
    timeline: "6 weeks",
    deliverables: [
      "Next.js Web App (iOS-installable PWA)",
      "Native Android app (APK)",
      "Multi-currency wallet + Stripe & CinetPay payments",
      "Daily cron: auto-pay, reminders, automatic payouts",
      "Trust score + badge system",
      "Group chat + push notifications",
    ],
    metrics: [
      { label: "Platforms", value: "Web + Android" },
      { label: "Payment providers", value: "Stripe + CinetPay" },
      { label: "Delivery time", value: "6 weeks" },
    ],
    highlights: [
      "100% automated — contributions, reminders, payouts",
      "Mobile Money: Orange Money · MTN · Wave · Moov",
      "Trust score & diaspora badges",
    ],
    palette: {
      primary: "#080b07",
      secondary: "#0f1a0e",
      accent: "#22c55e",
    },
    website: "https://tontineapp-web.vercel.app",
    downloadLinks: {
      android: "https://github.com/kenams/tontine/releases/download/v2.2.0/kotizy-v2.2.0.apk",
      ios: "https://tontineapp-web.vercel.app/install-ios",
    },
    mockups: {
      primary: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1400&q=80",
    },
  },
  {
    slug: "ashanti-beauty",
    name: "Ashanti Beauty",
    type: "Premium showcase site / Beauty institute",
    tagline:
      "Premium showcase site for a high-end beauty institute in Balma — full-screen video, 5 service pillars, 12 online bookings per week from day one.",
    shortDescription:
      "Next.js premium site with HD hero video, 5 service pillars with Planity booking buttons, partners, gallery, reviews and Google Maps.",
    description:
      "Ashanti Beauty is a premium beauty institute located in Balma, France. KAH Digital designed their showcase site with a high-end finish: full-screen hero video optimised for mobile and desktop, 5 service pillars (Nails Bar, Brows Bar, Lashes Bar, Skincare, Massage), partner showcase, gallery, reviews and Google Maps.",
    challenge:
      "Build a site that reflects the institute's premium positioning, integrate HD video on mobile without degrading performance, and convert visitors into bookings via Planity.",
    solution:
      "Next.js 16 with Tailwind CSS, responsive hero video component, scroll-reveal sections, Planity booking buttons on each pillar, embedded Google Maps and a minimal footer.",
    stack: ["Next.js 16", "Tailwind CSS", "TypeScript", "Vercel"],
    result:
      "Premium site live. 12 online bookings per week from the first week — compared to zero before.",
    timeline: "1 week",
    deliverables: [
      "Full-screen HD hero video",
      "5 service sections with Planity CTA",
      "Partner showcase (9 brands)",
      "Gallery + reviews + Google Maps",
    ],
    metrics: [
      { label: "Bookings/week", value: "12" },
      { label: "Service pillars", value: "5" },
      { label: "Partners", value: "9" },
    ],
    highlights: [
      "Responsive hero video mobile/desktop",
      "Nails · Brows · Lashes · Skincare · Massage",
      "Planity booking integrated",
    ],
    palette: { primary: "#151113", secondary: "#34242d", accent: "#f7d9e8" },
    website: "https://ashanti-beauty.vercel.app/",
    mockups: {
      primary: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "techcash-academy",
    name: "TechCash Academy",
    type: "Training platform / Stripe checkout",
    tagline:
      "Complete e-learning platform with multi-course catalog, member area and Stripe checkout — first revenue 7 days after launch.",
    shortDescription:
      "Multi-product catalog, Supabase auth, Stripe checkout, member dashboard and content management for text, PDF, video.",
    description:
      "TechCash Academy is a digital training sales platform designed by KAH Digital. It offers a clear catalog, Stripe checkout per course, product-specific member area, and an admin interface to manage catalog and modules.",
    challenge:
      "Build a credible academy platform able to sell multiple offers without a messy funnel, with a clear member area and reliable checkout.",
    solution:
      "Next.js with Supabase auth and purchases, Stripe checkout tied to the correct product, training-specific member dashboard, content admin layer.",
    stack: ["Next.js", "TypeScript", "Supabase", "Stripe", "Vercel"],
    result:
      "Platform live. First purchases recorded 7 days after launch. Member area operational from day one.",
    timeline: "1 week",
    deliverables: [
      "Multi-training catalog",
      "Stripe checkout + webhook",
      "Member dashboard + content admin",
      "Product direction and academy funnel",
    ],
    metrics: [
      { label: "Live trainings", value: "5" },
      { label: "First revenue", value: "D+7" },
      { label: "Stack", value: "Supabase + Stripe" },
    ],
    highlights: [
      "Multi-product catalog",
      "Stripe checkout + member access",
      "Content admin out of the box",
    ],
    palette: { primary: "#08111f", secondary: "#1b365d", accent: "#d7a93b" },
    website: "https://techcash-academy.vercel.app/",
    mockups: {
      primary: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "ruby-gallery",
    name: "Ruby Gallery",
    type: "Showcase + E-commerce / Art gallery",
    tagline:
      "Premium site for a contemporary painter — filtered gallery, no-code admin and Stripe checkout. 3 sales in the first 2 weeks.",
    shortDescription:
      "Next.js 15 site with filtered artwork gallery, admin to manage the catalog, Stripe checkout and legal pages.",
    description:
      "Ruby Gallery is a premium showcase site delivered to Ruby, a contemporary painter. It presents her universe, her artwork catalog with filters, an about page, a contact form and a Stripe checkout. The admin lets Ruby manage her works independently.",
    challenge:
      "Showcase the artworks without overwhelming them visually, with a simple admin for a non-technical artist and a reliable checkout in production.",
    solution:
      "Next.js 15 App Router, Prisma with Neon Postgres, filtered gallery by type/availability, session-protected admin, Stripe checkout with success/cancel pages.",
    website: "https://ruby-gallery.vercel.app/",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "Stripe", "Neon Postgres", "Vercel"],
    result:
      "Premium gallery site live, functional admin. 3 Stripe sales in the first 2 weeks.",
    timeline: "2 weeks",
    deliverables: [
      "Filtered gallery by category",
      "Admin for artworks / availability / sales",
      "Stripe checkout + webhook",
      "Auto sitemap + basic SEO",
    ],
    metrics: [
      { label: "Sales W1-W2", value: "3" },
      { label: "Delivery", value: "2 weeks" },
      { label: "Payment", value: "Stripe integrated" },
    ],
    highlights: [
      "Premium gallery with filters",
      "No-code artist admin",
      "Stripe checkout + Neon Postgres",
    ],
    palette: { primary: "#13100e", secondary: "#2a1f18", accent: "#c9956c" },
    mockups: {
      primary: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "tontine-app",
    name: "TontineApp",
    type: "Mobile app / Collective savings",
    tagline:
      "Digital tontine mobile MVP — automated savings cycles, push notifications, community dashboard. 150+ beta testers onboarded with zero critical bugs.",
    shortDescription:
      "React Native app with tontine groups, automated payment cycles, push notifications, transaction history and community dashboard.",
    description:
      "TontineApp digitises the traditional tontine in a modern mobile app. Each group sets its stake, frequency and members. The app handles cycles automatically, notifies each participant when it's their turn to receive the pot, and tracks the full transaction history.",
    challenge:
      "Model the tontine logic (cycles, turns, payment validation) in a mobile app simple enough for communities with low tech adoption.",
    solution:
      "React Native + Expo, Supabase for database and auth, automated cycles via Supabase Edge Functions, Expo push notifications, clean community dashboard.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "Push Notifications", "Node.js"],
    result:
      "Functional mobile MVP delivered in 5 weeks. 150+ beta testers onboarded with zero critical bugs.",
    timeline: "5 weeks",
    deliverables: [
      "Tontine group creation and management",
      "Automated payment cycles",
      "Per-turn push notifications",
      "Transaction history and dashboard",
    ],
    metrics: [
      { label: "Beta testers", value: "150+" },
      { label: "Delivery", value: "5 weeks" },
      { label: "Critical bugs", value: "0" },
    ],
    highlights: [
      "Automated tontine cycles",
      "Per-turn push notifications",
      "Simple community dashboard",
    ],
    website: "https://tontineapp-web.vercel.app",
    palette: { primary: "#0a0f1a", secondary: "#1a2640", accent: "#4f9cf9" },
    mockups: {
      primary: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "dropigo",
    name: "DroPiPêche",
    type: "Mobile app / Fishing marketplace",
    tagline:
      "iOS & Android app connecting fishermen and buyers — dual flow, geolocation, real-time chat and order tracking. Delivered in 8 weeks.",
    shortDescription:
      "Mobile marketplace with two roles (fisherman / buyer), Supabase auth, geolocation, cart, booking, order tracking, chat, push and delivery QR code.",
    description:
      "DroPiPêche is a mobile marketplace connecting fishermen and fresh fish buyers. The fisherman creates listings with photos, geolocation and availability. The buyer browses, books, pays and tracks their order through to delivery via QR code.",
    challenge:
      "Design two airtight user flows (fisherman / buyer) in a single app, manage geolocation for meetup points, integrate real-time chat and a time-slot booking system.",
    solution:
      "Expo React Native with typed navigation, Supabase for auth and bookings, expo-location for geolocation, expo-notifications for alerts and QR code delivery.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "Geolocation", "Push Notifications"],
    result:
      "Full iOS & Android app with dual flow, booking, chat and order tracking — store-ready in 8 weeks.",
    timeline: "8 weeks",
    deliverables: [
      "Dual fisherman / buyer flow",
      "Geolocation & meetup point",
      "Cart, booking, order tracking",
      "Real-time chat + delivery QR code",
    ],
    metrics: [
      { label: "Screens", value: "20+" },
      { label: "Roles", value: "2 + admin" },
      { label: "Delivery", value: "8 weeks" },
    ],
    highlights: [
      "Dual fisherman / buyer role",
      "Chat & push notifications",
      "QR delivery code + order tracking",
    ],
    demoRequest: true,
    palette: { primary: "#071420", secondary: "#0f2d4a", accent: "#3b9ef6" },
    mockups: {
      primary: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1562184552-997c461aebb6?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "immortal-arena",
    name: "Immortal Arena",
    type: "Mobile app / Sport & Gaming",
    tagline:
      "Gamified sports challenge app — filmed live battles, territorial leaderboards and community reputation. 300+ challenges created in beta.",
    shortDescription:
      "Gamified mobile app with sport challenges, live battles, leaderboard, territory system, shop, wallet, moderation and coach area.",
    description:
      "Immortal Arena turns sports challenges into a gamified community experience. Users launch challenges, join filmed live battles, earn reputation points, conquer territories and climb leaderboards. A coach space lets users track athletes.",
    challenge:
      "Build an app with real-time flows (live battles, live votes), a full gamification system (leaderboards, territories, shop, wallet) and frictionless moderation.",
    solution:
      "Expo React Native with Supabase for real-time data, expo-camera and expo-video for lives, push notifications for incoming challenges, cron scripts for vote finalization.",
    stack: ["Expo React Native", "TypeScript", "Supabase", "expo-video", "Push Notifications"],
    result:
      "Full sports mobile app with live battles, real-time leaderboards, integrated shop — 300+ challenges created in 2 weeks of beta.",
    timeline: "6 weeks",
    deliverables: [
      "Challenges & filmed live battles",
      "Leaderboard & territory system",
      "Shop & points wallet",
      "Coach area & moderation",
    ],
    metrics: [
      { label: "Beta challenges", value: "300+" },
      { label: "Screens", value: "30+" },
      { label: "Delivery", value: "6 weeks" },
    ],
    highlights: [
      "Filmed live battles with live votes",
      "Leaderboards, territories & shop",
      "Coach area + fair-play moderation",
    ],
    demoRequest: true,
    palette: { primary: "#050507", secondary: "#1a0d1f", accent: "#e63946" },
    mockups: {
      primary: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "featness",
    name: "FEATNESS",
    type: "Mobile app + Kiosk / Sports nutrition",
    tagline:
      "Post-workout nutrition app and distribution kiosk — deployed in 2 partner gyms in Toulouse with 200+ active users.",
    shortDescription:
      "Expo app + Next.js dashboard: post-workout meal recommendations, nutrition tracking and kiosk management.",
    description:
      "FEATNESS offers the perfect meal after effort. The mobile app guides athletes in their nutrition choices based on workout intensity. The web dashboard manages menus and kiosk orders. Deployed in 2 partner gyms.",
    challenge:
      "Build a dual product (mobile app + web dashboard) coherent across contexts — gym floor usage and kiosk administration.",
    solution:
      "Expo React Native for mobile, Next.js 14 for dashboard and kiosk, shared Supabase database, recommendations based on athlete profile.",
    stack: ["Expo React Native", "Next.js 14", "TypeScript", "Supabase", "Vercel"],
    result:
      "MVP deployed in 2 partner gyms. 200+ active users in the first 2 months after field launch.",
    timeline: "6 weeks",
    deliverables: [
      "Athlete mobile app",
      "Admin web dashboard",
      "Field kiosk interface",
      "Personalised nutrition recommendations",
    ],
    metrics: [
      { label: "Active users", value: "200+" },
      { label: "Partners", value: "2 gyms" },
      { label: "Delivery", value: "6 weeks" },
    ],
    highlights: [
      "App + dashboard + kiosk",
      "Personalised recommendations",
      "Real field deployment",
    ],
    demoRequest: true,
    palette: { primary: "#0a1509", secondary: "#162612", accent: "#22c55e" },
    mockups: {
      primary: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "spotfinder-toulouse",
    name: "SpotFinder Toulouse",
    type: "Mobile app / Community geolocation",
    tagline:
      "Community parking app for Toulouse — 500+ reports in the first week. Real-time map and reputation scoring.",
    shortDescription:
      "Geolocated React Native app with real-time reports, interactive map, user profiles and community reputation score.",
    description:
      "SpotFinder helps Toulouse drivers find parking through community real-time reporting. Users share free spots, view recent reports on an interactive map and earn reputation points for contributing.",
    challenge:
      "Handle real-time geolocation data on a performant mobile map, with a reliable reporting system and a simple UX for in-car use.",
    solution:
      "React Native + expo-location + Mapbox, Supabase for real-time data and profiles, gamified reputation score to encourage community participation.",
    stack: ["Expo React Native", "TypeScript", "Mapbox", "Supabase", "Geolocation"],
    result:
      "Community app live with 500+ reports in the first week of public beta.",
    timeline: "4 weeks",
    deliverables: [
      "Real-time interactive map",
      "Geolocated reports",
      "Profiles + reputation score",
      "Push notifications",
    ],
    metrics: [
      { label: "Reports D+7", value: "500+" },
      { label: "Delivery", value: "4 weeks" },
      { label: "Area", value: "Toulouse" },
    ],
    highlights: [
      "Real-time map",
      "Community reports",
      "Gamified reputation score",
    ],
    demoRequest: true,
    palette: { primary: "#100a1a", secondary: "#2a1640", accent: "#a855f7" },
    mockups: {
      primary: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "minealert",
    name: "MineAlert",
    type: "SaaS / Mining intelligence",
    tagline:
      "Real-time mining commodity dashboard — automated scraping, watchlist and personalised alerts.",
    shortDescription:
      "Business dashboard, Supabase auth, watchlist, alerts, live scraping and Vercel deployment for an actionable private beta.",
    description:
      "MineAlert is a mining intelligence cockpit centralising commodity prices, news signals, watchlists and alerts in a clear, actionable interface. Supabase auth (email + Google), automated scraping pipeline, usage-oriented dashboard.",
    challenge:
      "Structure a monitoring tool that stays readable and fast to scan, able to plug in data sources, authentication and a monitoring logic without becoming cluttered.",
    solution:
      "Next.js with Supabase auth email and Google, automated scraping pipeline for prices and news, usage-oriented dashboard, refresh mode adapted to a hosted beta.",
    stack: ["Next.js", "TypeScript", "Supabase", "Playwright", "Vercel"],
    result:
      "Live mining intelligence SaaS, automated and readable — production-ready as a KAH Digital reference product.",
    timeline: "3 weeks",
    deliverables: [
      "Prices / news / alerts dashboard",
      "Supabase auth + OAuth Google",
      "Automated scraping pipeline",
      "Watchlist and user alerts",
    ],
    metrics: [
      { label: "Live sources", value: "2+" },
      { label: "Auth", value: "Email + Google" },
      { label: "Delivery", value: "3 weeks" },
    ],
    highlights: [
      "Prices / news / alerts dashboard",
      "Watchlist and user alerts",
      "Automated scraping",
    ],
    palette: { primary: "#07110f", secondary: "#15382d", accent: "#d4af37" },
    website: "https://mine-alert-kenams.vercel.app/",
    mockups: {
      primary: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Music label / Production",
    tagline:
      "Premium site for an independent music label — artists, releases, clips and business contacts centralised in one coherent experience.",
    shortDescription:
      "Premium label site with The Label, Artists, Releases, Clips, Events, Networks and Contact sections.",
    description:
      "KAH Prod is an independent music label. The site was designed to present the label, showcase artists and releases, expose events and centralise business contacts under a strong visual identity.",
    challenge:
      "Give the label a visually strong and readable site able to present its identity, artists and releases without mixing information or losing the premium image.",
    solution:
      "Next.js with Tailwind CSS, direct navigation by universe, cleaner releases/clips block, events section, networks and separate contacts for management, booking, press and communications.",
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    result:
      "Label site live, clear and premium — stronger image, centralised business contacts.",
    timeline: "2 weeks",
    deliverables: [
      "Label art direction",
      "Premium home + artists + releases",
      "Events + networks section",
      "Separate business contacts",
    ],
    metrics: [
      { label: "Sections", value: "7" },
      { label: "Business contacts", value: "4" },
      { label: "Delivery", value: "2 weeks" },
    ],
    highlights: [
      "Label / Artists / Releases / Clips",
      "Events + networks",
      "Management / Booking / Press / Comms",
    ],
    palette: { primary: "#07111f", secondary: "#12304e", accent: "#c9a84c" },
    website: "https://kah-prod.vercel.app/",
    mockups: {
      primary: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
  {
    slug: "kah-support",
    name: "KAH Support",
    type: "AI SaaS / IT Assistant for SMBs",
    tagline:
      "AI assistant connected to GLPI that resolves 70% of L1 tickets without a technician — 5-minute setup, available 24/7.",
    shortDescription:
      "Multi-tenant Node.js/PostgreSQL SaaS with OpenAI, native GLPI integration, live Stripe, full admin and automated outreach.",
    description:
      "KAH Support is an AI-powered IT support assistant for SMBs. It connects directly to GLPI and handles level-1 requests (VPN, passwords, printers, software access) 24/7 without human intervention. The AI responds to the user, creates tickets in GLPI with the correct priority and category, and escalates only when needed.",
    challenge:
      "Build a production-ready multi-tenant SaaS that natively integrates with GLPI, handles authentication, Stripe billing, conversational AI and automatic ticket creation — all without any GLPI plugin.",
    solution:
      "Node.js/Express multi-tenant backend on Render with PostgreSQL, OpenAI GPT-4o for reasoning, GLPI REST API for ticket creation, Stripe for billing, Resend for emails and GitHub Actions for continuous deployment.",
    stack: ["Node.js", "Express", "PostgreSQL", "OpenAI", "GLPI API", "Stripe", "Resend", "Render", "GitHub Actions"],
    result:
      "Live SaaS at kah-support.ch — 70% of L1 tickets resolved without a technician, 8 min saved per ticket, client ROI in under 1 month.",
    timeline: "3 weeks",
    deliverables: [
      "Multi-tenant Node.js/PostgreSQL backend",
      "Native GLPI REST integration (no plugin)",
      "OpenAI GPT-4o conversational AI",
      "Live Stripe + Resend emails",
      "Full admin dashboard",
      "Auto-deploy GitHub Actions → Render",
    ],
    metrics: [
      { label: "Auto-resolved tickets", value: "70%" },
      { label: "Time saved/ticket", value: "8 min" },
      { label: "Client ROI", value: "<1 month" },
    ],
    highlights: [
      "Multi-tenant — full isolation per organisation",
      "GLPI 9.5.x and 10.x integration, no plugin",
      "Available 24/7",
    ],
    palette: { primary: "#0f0f1a", secondary: "#1a1a35", accent: "#6366f1" },
    website: "https://kah-support.ch",
    mockups: {
      primary: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=900&q=80",
      ],
    },
  },
];
