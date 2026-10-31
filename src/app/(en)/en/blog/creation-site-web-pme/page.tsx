import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Creating a website for a small business: the complete 2026 guide",
  description: "Everything a small business should know before ordering a website: from brief to launch, mistakes to avoid and how to choose a provider.",
  keywords: ["create a small business website", "site web entreprise", "professional website creation for SMEs", "agence web PME", "site internet entreprise 2026"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/creation-site-web-pme" },
  openGraph: {
    images: [{ url: "/og-kah-studio.png", width: 1200, height: 630 }],
    title: "Creating a website for a small business: the complete 2026 guide",
    description: "From brief to launch, everything a small business should know before ordering a website.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Creating a website for a small business: the complete 2026 guide",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
};

export default function EnCreationSiteWebPMEPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-pme" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">Guide</span>
            <span className="text-xs text-gray-600">24 April 2026 · 7 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Creating a website for a small business: the complete 2026 guide
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Ordering a website for your small business without being fooled — here is the honest guide, from brief to launch.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        <h2 className="mb-6 text-2xl font-bold text-white">Step 1 — Define what you really need</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Most small businesses order a site that is too big. Start by answering these 3 questions:
        </p>
        <ul className="mb-10 space-y-3 text-gray-400 text-sm leading-relaxed">
          {[
            "What is the main goal? (Generate contacts, sell online, present your activity, recruit...)",
            "Who are your target visitors? (B2B professionals, consumers, locals, international...)",
            "What should a visitor do on your site? (Call you, fill in a form, buy, book an appointment...)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-blue-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Step 2 — Choose the right type of site</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {[
            { type: "Landing page", ideal: "Testing an offer, launching a product, freelancers", price: "custom quote" },
            { type: "Showcase site", ideal: "Local SMEs, professional practices, tradespeople", price: "custom quote" },
            { type: "Corporate site", ideal: "Established companies, multilingual, CMS", price: "custom quote" },
            { type: "E-commerce", ideal: "Online sales, shop, subscriptions", price: "custom quote" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900 p-5">
              <div className="mb-1 font-bold text-white text-sm">{item.type}</div>
              <div className="text-xs text-gray-500 mb-2">{item.ideal}</div>
              <div className="text-lg font-black text-blue-400">{item.price}</div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Step 3 — Write an effective brief</h2>
        <p className="mb-4 text-gray-400 leading-relaxed">
          A good brief saves you 30% of your budget. It contains at minimum:
        </p>
        <div className="mb-10 rounded-2xl border border-white/8 bg-gray-900 p-6">
          <div className="grid gap-2 sm:grid-cols-2 text-sm">
            {[
              "Company name and activity",
              "Main goal of the site",
              "Target personas (who visits?)",
              "Estimated number of pages",
              "Specific features",
              "Existing visual identity",
              "Reference sites (desired style)",
              "Maximum budget",
              "Desired launch date",
              "Who manages the content afterwards?",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-gray-400">
                <FiCheck size={12} className="shrink-0 text-emerald-400" /> {item}
              </div>
            ))}
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Step 4 — Choose your provider</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          There are 4 types of web provider. Here is what each is really like:
        </p>
        <div className="mb-10 space-y-4">
          {[
            { type: "Freelance junior (Malt, Fiverr)", pro: "Flexibility and a quick start", con: "High risk on quality and deadlines, no support after delivery" },
            { type: "Large web agency", pro: "Structured process, full team", con: "Sometimes oversized proposals, changing contact person" },
            { type: "Independent digital studio", pro: "Balance of quality and scoping, direct contact, responsive", con: "Limited parallel capacity (watch the deadlines)" },
            { type: "Constructeur DIY (Wix, Squarespace)", pro: "Very fast to launch", con: "Generic design, mediocre performance, hard to evolve, limited SEO" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <div className="mb-3 font-semibold text-white">{item.type}</div>
              <div className="grid gap-2 sm:grid-cols-2 text-sm">
                <div className="flex items-start gap-2 text-gray-400"><FiCheck size={13} className="mt-0.5 shrink-0 text-emerald-400" />{item.pro}</div>
                <div className="flex items-start gap-2 text-gray-400"><FiX size={13} className="mt-0.5 shrink-0 text-red-400" />{item.con}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">The 5 most common mistakes</h2>
        <ul className="mb-12 space-y-4 text-sm text-gray-400 leading-relaxed">
          {[
            { err: "Starting without a clear brief", detail: "Without a brief, the provider builds from their own assumptions. Back-and-forths pile up and the scope becomes blurred." },
            { err: "Leaving SEO for later", detail: "SEO is built in from the site's architecture. Adding it afterwards often forces a partial redesign." },
            { err: "Choosing without checking the scope", detail: "A proposal that is too vague can hide a basic template with your logo on it. Always check what is actually delivered." },
            { err: "Ignoring mobile", detail: "More than 60% of visits come from mobile. A site that is not adapted loses more than half of its audience." },
            { err: "Not planning for maintenance", detail: "A website needs regular updates: security, compatibility, content and performance monitoring." },
          ].map((item) => (
            <li key={item.err} className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              <span><strong className="text-white">{item.err}</strong> — {item.detail}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Ready to launch your website?</h2>
          <p className="mb-6 text-gray-400">KAH Digital Studio supports small businesses in Switzerland and France. Custom quote within 24h.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/en/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition">
              Request a quote <FiArrowRight size={15} />
            </Link>
            <Link href="/en/commander" className="inline-flex items-center gap-2 rounded-full border border-[#e0c48e]/50 bg-[#e0c48e]/10 px-8 py-3.5 font-bold text-[#f3d089] transition hover:bg-[#e0c48e]/20">
              Order my website from $290
            </Link>
            <Link href="/en/offres" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              See our offers
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}



