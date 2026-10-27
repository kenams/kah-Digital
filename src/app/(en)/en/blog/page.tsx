import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";

export const metadata: Metadata = {
  title: "KAH Digital Studio Blog — Website, SEO and digital advice for small businesses",
  description: "Practical guides on website creation, quotes, redesigns and SEO for small businesses and independents. By KAH Digital Studio, a remote digital studio working with France and Switzerland.",
  alternates: { canonical: "https://kah-digital.ch/en/blog" },
};

const ARTICLES = [
  {
    slug: "prix-site-web-professionnel",
    title: "How to estimate the cost of a professional website in 2026",
    excerpt: "Landing page, showcase site, corporate site, application — how to scope a custom quote around your real needs.",
    readTime: "6 min",
    date: "24 April 2026",
    tag: "Quote",
  },
  {
    slug: "refonte-site-web",
    title: "Website redesign: when should you start and how should you go about it?",
    excerpt: "The 7 signs it is time to redesign your site, and the method to do it without wasting budget.",
    readTime: "5 min",
    date: "24 April 2026",
    tag: "Strategy",
  },
  {
    slug: "creation-site-web-pme",
    title: "Creating a website for a small business: the complete 2026 guide",
    excerpt: "Everything a small business should know before ordering a website — from brief to launch, without being fooled.",
    readTime: "7 min",
    date: "24 April 2026",
    tag: "Guide",
  },
  {
    slug: "site-web-artisan",
    title: "A website for tradespeople: the complete 2026 guide",
    excerpt: "Plumber, electrician, carpenter — a simple, well-made site can bring you customers every week. Quote, essential content, mistakes to avoid.",
    readTime: "5 min",
    date: "4 May 2026",
    tag: "Tradespeople",
  },
  {
    slug: "site-web-restaurant",
    title: "A website for restaurants: what you really need in 2026",
    excerpt: "Menu hard to find, site not mobile-friendly, no booking — the mistakes that drive customers away before they even arrive.",
    readTime: "5 min",
    date: "4 May 2026",
    tag: "Restaurants",
  },
  {
    slug: "agence-web-pme-comment-choisir",
    title: "How to choose a web agency for your small business",
    excerpt: "The good signs, the red flags to run from, and the questions to ask before signing. An unfiltered guide.",
    readTime: "6 min",
    date: "4 May 2026",
    tag: "Small business",
  },
  {
    slug: "application-mobile-cout",
    title: "How to estimate the cost of a mobile app in 2026",
    excerpt: "PWA, React Native MVP, full app, native — the quoting criteria and how to stay in control of your budget.",
    readTime: "7 min",
    date: "4 May 2026",
    tag: "Mobile",
  },
  {
    slug: "landing-page-vs-site-vitrine",
    title: "Landing page vs showcase site: which should you choose?",
    excerpt: "They are not the same tools. Here is how to decide in 2 minutes based on your goal, your budget and your situation.",
    readTime: "5 min",
    date: "4 May 2026",
    tag: "Strategy",
  },
  {
    slug: "seo-local-pme",
    title: "Local SEO for small businesses: reaching Google's first page in 2026",
    excerpt: "Google Business Profile, local pages, LocalBusiness schema, customer reviews — the concrete actions that help customers find you.",
    readTime: "6 min",
    date: "4 May 2026",
    tag: "SEO",
  },
  {
    slug: "automatisation-ia-pme",
    title: "AI automation for small businesses: 5 concrete examples to save time in 2026",
    excerpt: "Lead qualification, automatic reporting, sales follow-ups, AI support: 5 typical examples, the goals to aim for and the costs.",
    readTime: "8 min",
    date: "19 May 2026",
    tag: "AI",
  },
  {
    slug: "how-to-choose-ai-agency",
    title: "How to Choose an AI Agency in 2025: 7 Questions to Ask Before Signing",
    excerpt: "Not all AI agencies deliver real results. Seven hard questions to separate serious agencies from hype sellers.",
    readTime: "6 min",
    date: "2025",
    tag: "AI",
  },
  {
    slug: "nextjs-vs-wordpress",
    title: "Next.js vs WordPress in 2025: Which Is Actually Better for Your Business?",
    excerpt: "An honest comparison for business owners who need to make the right choice.",
    readTime: "6 min",
    date: "2025",
    tag: "Strategy",
  },
  {
    slug: "website-redesign-roi",
    title: "Website Redesign ROI: What to Realistically Expect",
    excerpt: "Conversion benchmarks, load-time impact and how to measure the return of a redesign in 90 days.",
    readTime: "6 min",
    date: "2025",
    tag: "Strategy",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Quote": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Strategy": "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  "Guide": "border-violet-500/30 bg-violet-500/10 text-violet-400",
  "Tradespeople": "border-orange-500/30 bg-orange-500/10 text-orange-400",
  "Restaurants": "border-red-500/30 bg-red-500/10 text-red-400",
  "Small business": "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Mobile": "border-violet-500/30 bg-violet-500/10 text-violet-400",
  "SEO": "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  "AI": "border-blue-500/30 bg-blue-500/10 text-blue-400",
};

export default function BlogEnPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">KAH Digital Studio Blog</h1>
          <p className="text-lg text-gray-400">Practical advice on websites, SEO and digital for small businesses and independents.</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="grid gap-6">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/en/blog/${a.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-gray-900 p-6 transition hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${TAG_COLORS[a.tag] ?? "border-blue-500/30 bg-blue-500/10 text-blue-400"}`}>{a.tag}</span>
                <span className="flex items-center gap-1 text-xs text-gray-600"><FiClock size={11} /> {a.readTime}</span>
                <span className="ml-auto text-xs text-gray-600">{a.date}</span>
              </div>
              <h2 className="text-xl font-bold text-white transition group-hover:text-blue-300">{a.title}</h2>
              <p className="text-sm leading-relaxed text-gray-400">{a.excerpt}</p>
              <span className="flex items-center gap-1 text-sm font-semibold text-blue-400">Read the article <FiArrowRight size={13} /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
