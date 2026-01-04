import type { HomePageData } from "@/data/home";

const services = [
  {
    title: "Showcase website (business website)",
    description:
      "A clear site to present your business, your offers, and collect inquiries.",
    tech: "Pages, form, SEO, launch.",
  },
  {
    title: "Online store (e-commerce)",
    description: "Catalog, cart, and payments to sell online simply.",
    tech: "Shopify or Stripe, emails, sales tracking.",
  },
  {
    title: "Client portal / web app",
    description: "Private area for clients: accounts, content, invoices, or tracking.",
    tech: "Login, roles, database.",
  },
  {
    title: "Sales page / landing",
    description: "A single page to explain an offer and capture leads.",
    tech: "Clear copy, form, analytics.",
  },
];

const mvpPills = [
  "iOS + Android app",
  "Testable prototype",
  "Login + database",
  "TestFlight & Android beta",
];

const mvpStats = [
  { label: "Delivery", value: "4-6 weeks", detail: "Testable prototype" },
  { label: "Stack", value: "iOS + Android", detail: "React Native + Expo" },
  { label: "Deliverables", value: "App + sales page", detail: "Pitch pack included" },
  { label: "Support", value: "Guidance", detail: "Slack + weekly check-ins" },
];

const mvpServices = [
  {
    title: "Simple scoping",
    description: "We clarify the idea and the essential screens.",
    bullets: ["60-min workshop", "Screen list", "Sprint plan"],
  },
  {
    title: "Mobile design",
    description: "Clear UI mockups for iOS and Android.",
    bullets: ["UI design", "Clickable prototype", "Fast validation"],
  },
  {
    title: "Presentation pack",
    description: "A simple PDF to present the project.",
    bullets: ["Clear pitch", "Useful slides", "Simple roadmap"],
  },
];

const contrastThemes = [
  {
    title: "Champagne palette",
    detail: "Cream base, deep blacks, gold accents for premium brands.",
  },
  {
    title: "Bright landing",
    detail: "Soft gradient for premium campaigns and capsule collections.",
  },
  {
    title: "Print support",
    detail: "Clear variants for PDF packs and premium brochures.",
  },
];

const processSteps = [
  {
    title: "Brief",
    detail: "We understand the need and list pages or features.",
  },
  { title: "Art direction", detail: "Style, colors, typography, and references." },
  {
    title: "Build",
    detail: "Development + tests on mobile and desktop.",
  },
  {
    title: "Launch",
    detail: "Go live, explanations, and support included.",
  },
];

const faqs = [
  {
    question: "What level of quality can I expect?",
    answer:
      "A clean result: clear design, micro-interactions, and a fast site (Core Web Vitals).",
  },
  {
    question: "Can you ship fast without losing quality?",
    answer:
      "Yes. The sprint process keeps quality consistent while speeding up validation.",
  },
  {
    question: "What is the difference between a site and an app?",
    answer:
      "A website opens in a browser. An app installs on iOS/Android and can send notifications.",
  },
  {
    question: "Do you provide copy and visuals?",
    answer:
      "Yes. We can handle copywriting, image selection, and icons.",
  },
  {
    question: "Do you handle SEO, hosting, and tracking?",
    answer:
      "Yes. Launch, basic SEO, analytics, and optimization if needed.",
  },
  {
    question: "What happens after launch?",
    answer:
      "30 days of support included, then a maintenance plan if you want to keep momentum.",
  },
];

const stats = [
  { label: "Premium projects", value: "70+" },
  { label: "Satisfaction", value: "9.6/10" },
  { label: "Average timeline", value: "4-6 weeks" },
];

const fastDeals = [
  {
    title: "Conversion landing",
    budget: "1,900 EUR",
    timeline: "3 weeks (incl. QA)",
    stack: "Next.js, SEO, Email",
    deliverable: "Single page + form + calendar",
    href: "/offres#landing-conversion",
  },
  {
    title: "Private member portal",
    budget: "5,900 EUR",
    timeline: "5 weeks",
    stack: "Supabase Auth, Stripe, Dashboard",
    deliverable: "Login area + content + recurring payments",
    href: "/offres#portail-membres",
  },
  {
    title: "Interactive quote + PDF pack",
    budget: "7,900 EUR",
    timeline: "6 weeks",
    stack: "Next.js, PDF, CRM",
    deliverable: "Quote simulator + PDF pack",
    href: "/offres#configurateur-deck",
  },
];

const closingHighlights = [
  { label: "Indicative budget", value: "2K EUR - 10K EUR" },
  { label: "Average sprint", value: "4 to 6 weeks" },
  { label: "Reply within 24h", value: "-24h" },
];

const resultsShowcase = [
  {
    title: "Private real estate portal",
    before: "3 leads/week",
    after: "14 leads + 2 deals/month",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Premium health MVP",
    before: "Figma MVP",
    after: "TestFlight + 400 beta users",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "High fashion store",
    before: "Conversion 0.6%",
    after: "2.1% in 45 days",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
];

export const aiBusinessGuide = [
  {
    title: "Client automation layer",
    description: "Automated replies, quotes, and follow-ups with brand tone.",
    pricing: "Indicative budget: 2,900 - 6,900 EUR",
    timeline: "Setup: 2-4 weeks",
    tools: ["ChatGPT", "Make/Zapier", "CRM"],
    image:
      "https://kripesh.b-cdn.net/wp-content/uploads/2023/08/Benefits-of-AI-Tools-for-small-business.jpg",
  },
  {
    title: "Industry chatbot & support",
    description: "Assistant trained on your content to answer 24/7 and filter requests.",
    pricing: "Indicative budget: 3,500 - 9,000 EUR",
    timeline: "Setup: 3-5 weeks",
    tools: ["Knowledge base", "Web widget", "Analytics"],
    image:
      "https://sendbird.imgix.net/cms/Chatbot-UI_Ecommerce-and-customer-service-chatbots.png",
  },
  {
    title: "Lead qualification & scoring",
    description: "Smart forms, scoring, and routing for sales teams.",
    pricing: "Indicative budget: 2,400 - 5,900 EUR",
    timeline: "Setup: 2-3 weeks",
    tools: ["Emailing", "CRM", "AI scoring"],
    image:
      "https://assets.crm.io/static/images/website/blog/ai-powered-linkedin-automation.jpg",
  },
  {
    title: "AI content & assets pack",
    description: "Templates, copy, and scripts aligned with your brand to move faster.",
    pricing: "Indicative budget: 1,800 - 4,500 EUR",
    timeline: "Setup: 1-2 weeks",
    tools: ["Notion", "Templates", "Brand kit"],
    image:
      "https://files.selar.co/product-images/2024/products/digital-spider1/ai-ebook-creator-2-selar.co-659aea700bb13.jpg",
  },
  {
    title: "Custom AI micro-tool",
    description: "Internal tool for summaries, extraction, or decision support.",
    pricing: "Indicative budget: 4,900 - 12,000 EUR",
    timeline: "MVP: 4-6 weeks",
    tools: ["Next.js", "AI API", "Security"],
    image:
      "https://cdn.dribbble.com/userupload/18350565/file/original-9e4dbb6e38b8ac5eac4089ecf1e2f1c5.png",
  },
];

const homeSections = [
  { id: "hero", label: "Home" },
  { id: "fast-track", label: "Offers" },
  { id: "assets", label: "Assets" },
  { id: "services", label: "Services" },
  { id: "apps", label: "Mobile" },
  { id: "studio-lumiere", label: "Palette" },
  { id: "portfolio", label: "Portfolio" },
  { id: "process", label: "Process" },
  { id: "ai-guide", label: "AI modules" },
  { id: "results", label: "Results" },
  { id: "testimonials", label: "Clients" },
  { id: "closing", label: "Pack" },
  { id: "cta", label: "Contact" },
  { id: "faq", label: "FAQ" },
];

export const homeDataEn: HomePageData = {
  services,
  mvpPills,
  mvpStats,
  mvpServices,
  contrastThemes,
  processSteps,
  faqs,
  stats,
  fastDeals,
  closingHighlights,
  resultsShowcase,
  aiBusinessGuide,
  homeSections,
};
