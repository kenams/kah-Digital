import type { PortfolioProject } from "@/data/portfolio";

export const portfolioProjectsEn: PortfolioProject[] = [
  {
    slug: "aurea",
    name: "Auréa",
    type: "Premium cleaning",
    tagline: "High-end website for enterprises and individuals.",
    shortDescription:
      "Luxury showcase site with qualified forms, admin space, and recruitment flow.",
    description:
      "Designed a premium site aligned with luxury codes, structured for enterprise clients and individuals with clear inquiry flows.",
    challenge: "Reflect a high-end positioning while keeping quote and hiring requests simple.",
    solution:
      "Gold/teal art direction, clear information architecture, connected forms, and a Node back-office for centralized requests.",
    stack: ["HTML/CSS", "Node.js", "Express", "SQLite"],
    result: "Fast launch + operational back office",
    timeline: "3 weeks",
    deliverables: ["Art direction", "Showcase website", "Connected forms", "Admin back-office"],
    metrics: [
      { label: "Sections", value: "12+" },
      { label: "Forms", value: "6" },
      { label: "Portal", value: "Admin" },
    ],
    highlights: ["Enterprise + individual journeys", "Qualified forms", "Admin exports"],
    palette: {
      primary: "#075A72",
      secondary: "#A08752",
      accent: "#E38903",
    },
    website: "https://aurea-cleaning.vercel.app",
    mockups: {
      primary: "/mockups/aurea-site.png",
      gallery: ["/mockups/aurea-site.png"],
    },
  },
  {
    slug: "kah-prod",
    name: "KAH Prod",
    type: "Music label / production",
    tagline: "Premium website for a music, image, and production universe.",
    shortDescription:
      "Label website with strong visual direction, clear service structure, and a clean foundation to present identity, work, and inbound requests.",
    description:
      "Built a premium website for KAH Prod to carry the label image with a sharper structure, cleaner rendering, and an evolutive base for the next steps.",
    challenge:
      "Create a stronger and more modern image for the label while keeping the site readable, fast, and usable.",
    solution:
      "Homepage rewrite, clearer sections, stronger CTAs, and a clean Next.js / Vercel foundation to support future iterations.",
    stack: ["Next.js", "Tailwind CSS", "Vercel", "Forms"],
    result: "Clean premium web base ready to evolve",
    timeline: "2 weeks",
    deliverables: ["Art direction", "Showcase pages", "CTAs and forms", "Production-ready base"],
    metrics: [
      { label: "Key pages", value: "6+" },
      { label: "Timeline", value: "2 weeks" },
      { label: "Goal", value: "Image + leads" },
    ],
    highlights: ["Clearer positioning", "Scalable base", "Vercel production"],
    palette: {
      primary: "#07111f",
      secondary: "#12304e",
      accent: "#47b8ff",
    },
    website: "https://kah-prod.vercel.app/",
    mockups: {
      primary: "/mockups/global-dashboard.png",
      gallery: ["/mockups/global-dashboard.png"],
    },
  },
  {
    slug: "atelier-nomade",
    name: "Atelier Nomade",
    type: "Architecture studio",
    tagline: "Simple and immersive digital manifesto.",
    shortDescription: "Showcase site with photo portfolio and a brief form that gathers key info.",
    description:
      "We guided the team through a full redesign: project staging, manifesto video, and construction timeline.",
    challenge: "Many vague inquiries and no premium support.",
    solution: "Next.js + Sanity to edit each block easily, PDF brief export, and contextual form.",
    stack: ["Next.js", "Sanity", "Tailwind CSS", "Vercel"],
    result: "+40% qualified inquiries",
    timeline: "5 weeks",
    deliverables: ["Art direction", "Design system", "Front-end development", "Sanity CMS"],
    metrics: [
      { label: "Pages", value: "7" },
      { label: "Perf score", value: "98" },
      { label: "CMS modules", value: "18" },
    ],
    highlights: ["Hero video", "Filterable portfolio", "Brief form"],
    palette: {
      primary: "#0f0f14",
      secondary: "#1f2336",
      accent: "#a855f7",
    },
    mockups: {
      primary: "/mockups/portfolio-atelier-nomade.png",
      gallery: ["/mockups/portfolio-atelier-nomade.png"],
    },
  },
  {
    slug: "lumea-skin",
    name: "Lumea Skin",
    type: "Beauty startup",
    tagline: "E-commerce that advises before selling.",
    shortDescription: "Quiz to pick a product, clean cart, Stripe checkout, and Klaviyo emails.",
    description:
      "Checkout redesign to show the beauty routine step by step: diagnosis, rituals, client proof.",
    challenge: "Too many drop-offs before cart because of lack of guidance.",
    solution: "3-block journey, React Hook Form quiz, dynamic bundles, Stripe + Klaviyo.",
    stack: ["Next.js", "Commerce Layer", "Stripe", "Klaviyo"],
    result: "Average cart +22%",
    timeline: "6 weeks",
    deliverables: ["UX sprint", "UI design", "Front-end", "Payment integration"],
    metrics: [
      { label: "Load", value: "1.2s" },
      { label: "Automations", value: "5 flows" },
      { label: "Templates", value: "14" },
    ],
    highlights: ["Product quiz", "Smart bundles", "GA4 tracking"],
    palette: {
      primary: "#1d0f1b",
      secondary: "#441a42",
      accent: "#ff8fb4",
    },
    mockups: {
      primary: "/mockups/portfolio-lumea-skin.png",
      gallery: ["/mockups/portfolio-lumea-skin.png"],
    },
  },
  {
    slug: "novapay",
    name: "NovaPay",
    type: "Fintech SaaS",
    tagline: "Landing page that explains and reassures.",
    shortDescription: "Manifesto video, animated key numbers, clear pricing, and meeting booking.",
    description: "Built a 5-section page with storytelling, client proof, and fixed CTAs.",
    challenge: "Too much technical info on the old page.",
    solution: "Next.js + Framer Motion for animations, HubSpot Meetings for booking.",
    stack: ["Next.js", "Framer Motion", "HubSpot"],
    result: "Demo conversion x2",
    timeline: "3 weeks",
    deliverables: ["Copywriting", "UI design", "Front-end development"],
    metrics: [
      { label: "Sections", value: "8" },
      { label: "Perf score", value: "96" },
      { label: "Assets", value: "10" },
    ],
    highlights: ["Clear pricing", "Animated testimonials", "HubSpot"],
    palette: {
      primary: "#071a2e",
      secondary: "#0b3355",
      accent: "#5ad8ff",
    },
    mockups: {
      primary: "/mockups/portfolio-novapay.png",
      gallery: ["/mockups/portfolio-novapay.png"],
    },
  },
  {
    slug: "valoris-conseil",
    name: "Valoris Conseil",
    type: "HR consulting",
    tagline: "Bilingual editorial site with instant PDFs.",
    shortDescription: "Easy CMS modules, multi-criteria filters, and mission sheets exported in one click.",
    description:
      "We designed an editable card system to present each mission and generate a custom PDF.",
    challenge: "Each document was produced manually.",
    solution: "Next.js + Contentful, serverless PDF generation, and Notion workflow.",
    stack: ["Next.js", "Contentful", "Vercel"],
    result: "Update time divided by 3",
    timeline: "6 weeks",
    deliverables: ["Content architecture", "UI design", "Front-end dev", "PDF automation"],
    metrics: [
      { label: "Languages", value: "FR/EN" },
      { label: "Dynamic pages", value: "24" },
      { label: "PDF templates", value: "4" },
    ],
    highlights: ["Editorial modules", "Sector search", "PDF export"],
    palette: {
      primary: "#0e1a20",
      secondary: "#17323a",
      accent: "#7ee5c5",
    },
    mockups: {
      primary: "/mockups/portfolio-valoris-conseil.png",
      gallery: ["/mockups/portfolio-valoris-conseil.png"],
    },
  },
  {
    slug: "pulse-studio",
    name: "Pulse Studio",
    type: "Event agency",
    tagline: "Fullscreen portfolio with connected brief.",
    shortDescription: "Immersive horizontal navigation and multi-step form connected to Airtable + Slack.",
    description:
      "We staged their events with GSAP and wired the brief funnel to the sales team's tools.",
    challenge: "Hard to capture the energy and track prospects.",
    solution: "Next.js, GSAP for animation, Airtable + Slack for request tracking.",
    stack: ["Next.js", "Airtable", "GSAP", "Slack API"],
    result: "Pipeline x1.8",
    timeline: "4 weeks",
    deliverables: ["Art direction", "UI/UX", "Front-end", "Airtable automation"],
    metrics: [
      { label: "Projects", value: "12" },
      { label: "Integrations", value: "Airtable + Slack" },
      { label: "Animations", value: "15" },
    ],
    highlights: ["Fullscreen carousel", "Multi-step form", "Notion automation"],
    palette: {
      primary: "#1a0f20",
      secondary: "#341447",
      accent: "#ffb347",
    },
    mockups: {
      primary: "/mockups/portfolio-pulse-studio.png",
      gallery: ["/mockups/portfolio-pulse-studio.png"],
    },
  },
  {
    slug: "oko-energy",
    name: "OKO Energy",
    type: "Cleantech scale-up",
    tagline: "Narrative microsite to raise quickly.",
    shortDescription: "Clear timeline, Mapbox map, and data viz to convince investors.",
    description: "We built a 4-chapter site to present impact, key numbers, and the team.",
    challenge: "Need a premium support understandable by international investors.",
    solution: "Next.js + Tailwind base, Mapbox to locate sites, GSAP to animate data viz.",
    stack: ["Next.js", "Tailwind CSS", "Mapbox", "GSAP"],
    result: "Deck ready in 10 days",
    timeline: "3 weeks",
    deliverables: ["Narrative concept", "UI design", "Front-end development"],
    metrics: [
      { label: "Data viz", value: "4" },
      { label: "Perf score", value: "94" },
      { label: "Production time", value: "3 weeks" },
    ],
    highlights: ["Interactive timeline", "Site map", "Data room link"],
    palette: {
      primary: "#061b10",
      secondary: "#0b3b24",
      accent: "#75f0a3",
    },
    mockups: {
      primary: "/mockups/portfolio-oko-energy.png",
      gallery: ["/mockups/portfolio-oko-energy.png"],
    },
  },
  {
    slug: "fairbuild-mvp",
    name: "FairBuild MVP",
    type: "Construction marketplace",
    tagline: "MVP in 5 weeks to match contractors and developers.",
    shortDescription:
      "Dual signup flow (developer/contractor), auto scoring, and intent signing inside the dashboard.",
    description:
      "We scoped a tight MVP: on the developer side, a guided brief and a dashboard of open projects; on the contractor side, a verified profile with documents and automatic scoring based on history.",
    challenge:
      "Validate the model before investing in a full ERP and reassure investors on traction.",
    solution:
      "Next.js App Router + Prisma + Supabase for data, Make webhooks for notifications, and integrated KYC.",
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Make"],
    result: "12 pilot deals signed",
    timeline: "5 weeks",
    deliverables: ["Product framing workshop", "Design system", "Full-stack MVP", "Guided onboarding"],
    metrics: [
      { label: "Pilot users", value: "45" },
      { label: "Onboarding time", value: "6 min" },
      { label: "Automations", value: "8" },
    ],
    highlights: ["Dual onboarding", "Scoring dashboard", "Make webhooks"],
    palette: {
      primary: "#0e111b",
      secondary: "#1a2438",
      accent: "#9ef08a",
    },
    mockups: {
      primary: "/mockups/portfolio-fairbuild-mvp.png",
      gallery: ["/mockups/portfolio-fairbuild-mvp.png"],
    },
  },
  {
    slug: "pulselearn",
    name: "PulseLearn",
    type: "Edtech",
    tagline: "Mini audio cohort platform + mobile.",
    shortDescription:
      "Progressive audio player, light quizzes, and Stripe payments to move from Zoom to a branded experience.",
    description:
      "PulseLearn wanted to test an audio-first format. We delivered a responsive web MVP + PWA with playlists, lesson sheets, quizzes, and email notifications to re-engage participants.",
    challenge: "Reduce technical friction and measure learner engagement with limited resources.",
    solution:
      "Next.js + Supabase for content and stats, Stripe Checkout for paid cohorts, Resend API for automated nudges.",
    stack: ["Next.js", "Supabase", "Stripe", "Resend"],
    result: "Completion rate +35%",
    timeline: "4 weeks",
    deliverables: ["Light branding", "Responsive UI", "Audio PWA", "Automated emails"],
    metrics: [
      { label: "Audio lessons", value: "24" },
      { label: "Embedded quizzes", value: "12" },
      { label: "Notifications", value: "5 flows" },
    ],
    highlights: ["Progressive player", "Quick quizzes", "Offline PWA"],
    palette: {
      primary: "#0a0f1f",
      secondary: "#162042",
      accent: "#7bd7ff",
    },
    mockups: {
      primary: "/mockups/portfolio-pulselearn.png",
      gallery: ["/mockups/portfolio-pulselearn.png"],
    },
  },
  {
    slug: "assistant-pme",
    name: "Assistant Support IT",
    type: "IT Support MVP",
    tagline: "AI assistant to reduce repetitive IT tickets.",
    shortDescription:
      "Support chat, knowledge base, and GLPI ticket creation for IT teams.",
    description:
      "An IT support assistant for SMBs that guides users, suggests procedures, then creates a structured ticket if the issue persists.",
    challenge:
      "Too many simple tickets, not enough context, and time wasted on repetitive requests.",
    solution:
      "Clear conversational flow, procedure search, auto ticketing, and an admin panel to track activity.",
    stack: ["Node.js", "Express", "HTML/CSS", "GLPI", "OpenAI"],
    result: "MVP ready for client demos",
    timeline: "4 weeks",
    deliverables: [
      "User support UI",
      "Ticket workflow",
      "Admin dashboard",
      "Knowledge base",
    ],
    metrics: [
      { label: "Channels", value: "Chat + Ticket" },
      { label: "Languages", value: "FR/EN/ES" },
      { label: "Stage", value: "MVP" },
    ],
    highlights: ["Structured tickets", "Quick guides", "GLPI-ready"],
    palette: {
      primary: "#1f2a3a",
      secondary: "#2f3b52",
      accent: "#f2c14f",
    },
    website: "https://github.com/kenams/Assistant-PME",
    mockups: {
      primary: "/mockups/assistant-pme.svg",
      gallery: ["/mockups/assistant-pme.svg"],
    },
  },
];
