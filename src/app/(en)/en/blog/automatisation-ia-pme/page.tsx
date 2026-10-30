import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiMessageCircle } from "react-icons/fi";

export const metadata: Metadata = {
  title: "AI automation for small businesses: 5 concrete examples to save time in 2026",
  description:
    "Discover how small businesses use AI automation to qualify leads, automate reporting and cut repetitive tasks. 5 typical examples of what can be automated, with the goals to aim for.",
  keywords: [
    "automatisation ia pme",
    "automatisation intelligence artificielle entreprise",
    "AI agent for small business",
    "automate SME processes",
    "AI for a small business",
    "time saved by AI automation 2026",
    "automated AI workflow",
  ],
  alternates: { canonical: "https://kah-digital.ch/en/blog/automatisation-ia-pme" },
  openGraph: {
    title: "AI automation for small businesses: 5 concrete examples in 2026",
    description:
      "What AI automation can bring to small businesses — lead qualification, reporting, follow-ups, customer support.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "AI automation for small businesses: 5 concrete examples to save time in 2026",
  datePublished: "2026-05-19",
  dateModified: "2026-05-19",
  author: { "@type": "Organization", name: "KAH Digital Studio" },
  publisher: { "@type": "Organization", name: "KAH Digital Studio", url: "https://kah-digital.ch" },
  mainEntityOfPage: "https://kah-digital.ch/en/blog/automatisation-ia-pme",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is AI automation for a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI automation for small businesses means using intelligent agents and automated workflows to replace repetitive tasks: lead qualification, email follow-ups, reporting, sorting incoming requests, support replies. The goal is to free human time for high-value work.",
      },
    },
    {
      "@type": "Question",
      name: "How much does AI automation cost for a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The cost depends on the complexity of the workflow. A simple automation (lead scoring, automated emails) starts at €490. A complete vertical AI agent, with Supabase, dashboards and CRM automations, starts at €2,490 (Vertical AI Agent plan). Return on investment is generally reached within 1 to 3 months.",
      },
    },
    {
      "@type": "Question",
      name: "Which AI tools should you use to automate a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most effective tools in 2026: Claude (Anthropic) and OpenAI GPT-4 for intelligent agents, Supabase for the database and real-time triggers, n8n or Make for no-code workflows, Resend for automated transactional emails, and Vercel/Next.js for management interfaces.",
      },
    },
    {
      "@type": "Question",
      name: "Do you need to be technical to automate with AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. KAH Digital Studio delivers turnkey systems: you get a simple dashboard to follow the results and adjust settings. No technical skill is required for daily use.",
      },
    },
  ],
};

const CASES = [
  {
    step: "01",
    title: "Typical example — Lead qualification",
    content: `**The scenario (hypothetical):** A B2B SaaS startup whose sales reps spend several hours a day manually sorting incoming requests, checking LinkedIn profiles and sending qualification emails.

**The system we could set up:**
- An AI agent connected to the contact form
- Automatic scoring based on criteria defined together (sector, company size, message, submission time)
- A sequence of emails personalised by sector over 10 days
- A sales alert only for leads above a score threshold

**Goals (not guaranteed, to be measured together):**
- Less sales time spent on qualification
- More qualified leads handled each week
- A better conversion rate, tracked from the first weeks`,
  },
  {
    step: "02",
    title: "Exemple type — Reporting automatique",
    content: `**The scenario (hypothetical):** A small business whose operations director spends time every Monday manually compiling Excel data from several systems to produce the weekly report.

**The system we could set up:**
- A Supabase connection to the data sources via API
- A real-time React dashboard accessible from any device
- Automatic PDF generation every Monday morning
- Email alerts on critical KPIs (configurable thresholds)

**Goals (not guaranteed, to be measured together):**
- Time recovered each week
- Data available in real time rather than the next day
- A reliable report, with no manual re-entry`,
  },
  {
    step: "03",
    title: "Exemple type — Support client IA",
    content: `**The scenario (hypothetical):** An e-commerce shop that receives many messages every week on the same questions (delivery times, returns policy, available sizes) and where one person spends much of their time answering them.

**The system we could set up:**
- An AI agent trained on the product knowledge base
- Automatic replies to the most frequent questions
- Escalation to a human only for complex or dissatisfied cases
- Direct integration with Shopify and support email

**Goals (not guaranteed, to be measured together):**
- A significant share of simple requests handled without human intervention
- A shorter response time
- Time freed up for product management`,
  },
  {
    step: "04",
    title: "Exemple type — Relances commerciales",
    content: `**The scenario (hypothetical):** A consulting firm whose prospects get no follow-up after the first contact, for lack of a systematic reminder after a quote is sent.

**The system we could set up:**
- An automated pipeline: D+3, D+7, D+14 after the quote is sent
- AI personalisation of each reminder based on the quote's content
- Email-open detection + conditional triggering
- A sales dashboard showing the status of each prospect

**Goals (not guaranteed, to be measured together):**
- A better response rate to quotes
- A better-tracked sales pipeline
- Sales time recovered`,
  },
  {
    step: "05",
    title: "Typical example — Automated competitive monitoring",
    content: `**The scenario (hypothetical):** A marketing department that spends several hours a week manually monitoring competitors' publications, sector trends and new content opportunities.

**The system we could set up:**
- An AI agent analysing defined sources every 24h
- A personalised summary delivered by email each morning
- Detection of keyword and trending-topic opportunities
- Content suggestions based on the gaps detected

**Goals (not guaranteed, to be measured together):**
- Less time spent on manual monitoring
- More content topics identified
- Better responsiveness to trends`,
  },
];

export default function EnAutomatisationIaPmePage() {
  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-gray-950 text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/6 pt-16 pb-12">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-blue-600/12 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition">
              ← Blog
            </Link>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
                AI automation
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                19 May 2026
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                8 min read
              </span>
            </div>
            <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              AI automation for small businesses: 5 concrete examples to save time in 2026
            </h1>
            <p className="text-lg leading-relaxed text-gray-400">
              AI is no longer reserved for large companies. In 2026, a small business of 5 to 50 people can automate repetitive tasks, qualify leads and generate reports without hiring — and without a huge budget. Here are 5 typical examples with the goals to aim for.
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          {/* Intro */}
          <div className="mb-12 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/40 to-violet-950/20 p-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-2">What you will learn</p>
            <ul className="space-y-2">
              {[
                "5 concrete uses of AI automation for small businesses",
                "The tools used: Claude, Supabase, Resend, n8n",
                "The goals to aim for in each example",
                "Cost and setup time",
                "How to start without being technical",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <FiCheck size={14} className="shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Why IA section */}
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-extrabold text-white">Why AI automation changes the game for small businesses</h2>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-gray-400 leading-relaxed mb-4">
                Until 2023, intelligent automation was reserved for companies with large tech budgets. Today, tools like Claude (Anthropic), GPT-4 (OpenAI) and Supabase make it possible to build AI agents that qualify leads, write personalised emails and compile reports — for a few hundred euros a month in API costs.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                The real question is no longer “can AI do that?” but “which tasks should I automate first?”. The answer: low-value, repetitive, high-volume tasks — and the ones that create delays in your sales pipeline.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Here are 5 typical examples (hypothetical scenarios, not client case studies) of what KAH Digital Studio can set up for a small business.
              </p>
            </div>
          </section>

          {/* Cases */}
          <div className="space-y-10 mb-14">
            {CASES.map((c) => (
              <section key={c.step} className="rounded-2xl border border-white/8 bg-gray-900/50 p-6 sm:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-500/40 bg-blue-500/15 text-sm font-extrabold text-blue-400">
                    {c.step}
                  </span>
                  <h2 className="text-xl font-bold text-white">{c.title}</h2>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  {c.content.split("\n\n").map((para, i) => {
                    if (para.startsWith("**") && para.endsWith("**")) {
                      return <p key={i} className="font-semibold text-white mt-3 mb-1">{para.slice(2, -2)}</p>;
                    }
                    if (para.startsWith("- ")) {
                      return (
                        <ul key={i} className="my-2 space-y-1 pl-0">
                          {para.split("\n").map((line, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                              <FiCheck size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                              <span dangerouslySetInnerHTML={{ __html: line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>") }} />
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p
                        key={i}
                        className="mb-3 text-sm leading-relaxed text-gray-400"
                        dangerouslySetInnerHTML={{
                          __html: para.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>"),
                        }}
                      />
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* How to start */}
          <section className="mb-14">
            <h2 className="mb-4 text-2xl font-extrabold text-white">Where to start?</h2>
            <p className="mb-6 text-gray-400 leading-relaxed">
              The best way to start: identify the repetitive task that costs your team the most time today. That is where the return on investment will be fastest.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Your team spends time qualifying leads manually", action: "→ AI qualification agent" },
                { label: "Reporting takes 1h+ a week to compile", action: "→ Automatic real-time dashboard" },
                { label: "You send follow-up emails by hand", action: "→ Personalised automated sequence" },
                { label: "Your support keeps receiving the same questions", action: "→ Built-in FAQ AI agent" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/8 bg-gray-900/50 p-4">
                  <p className="text-sm text-gray-400 mb-2">{item.label}</p>
                  <p className="text-sm font-semibold text-blue-400">{item.action}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section className="mb-14">
            <h2 className="mb-4 text-2xl font-extrabold text-white">The tools used in 2026</h2>
            <div className="overflow-x-auto rounded-2xl border border-white/8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 bg-gray-900/60">
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">Outil</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">Usage</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-300">Monthly cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/6">
                  {[
                    { tool: "Claude (Anthropic)", usage: "AI agent, writing, scoring", cost: "~20–80$/mois" },
                    { tool: "Supabase", usage: "Database, triggers, realtime", cost: "0–25$/mois" },
                    { tool: "Resend", usage: "Automated transactional emails", cost: "0–20$/mois" },
                    { tool: "n8n / Make", usage: "Workflows no-code", cost: "20–50$/mois" },
                    { tool: "Vercel", usage: "Next.js app hosting", cost: "0–20$/mois" },
                  ].map((row) => (
                    <tr key={row.tool} className="bg-gray-900/30">
                      <td className="px-4 py-3 font-medium text-white">{row.tool}</td>
                      <td className="px-4 py-3 text-gray-400">{row.usage}</td>
                      <td className="px-4 py-3 text-gray-400">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-600">Total infrastructure cost: $60–200/month depending on volumes.</p>
          </section>

          {/* FAQ */}
          <section className="mb-14">
            <h2 className="mb-6 text-2xl font-extrabold text-white">Frequently asked questions</h2>
            <div className="space-y-4">
              {faqJsonLd.mainEntity.map((q) => (
                <div key={q.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
                  <p className="mb-2 font-semibold text-white">{q.name}</p>
                  <p className="text-sm leading-relaxed text-gray-400">{q.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/50 to-violet-950/30 p-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Ready to automate?</p>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Get a free audit of your situation</h2>
            <p className="mb-6 text-gray-400 text-sm leading-relaxed">
              KAH Digital Studio analyses your current workflow and identifies the 3 priority automations for your small business. Results within 24h, no commitment.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/en/audit-gratuit"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 hover:gap-3"
              >
                Get my free audit
                <FiArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://wa.me/33759558414?text=Bonjour%20KAH%20Digital%2C%20je%20veux%20automatiser%20mes%20processus%20PME."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
              >
                <FiMessageCircle size={15} />
                WhatsApp — quick reply
              </a>
            </div>
            <p className="mt-4 text-xs text-gray-600">100% free · No commitment · Personalised results</p>
          </section>
        </article>

        {/* Related articles */}
        <section className="border-t border-white/6 py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="mb-6 text-lg font-bold text-white">Related articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { href: "/blog/creation-site-web-pme", title: "How to create a professional website for a small business in 2026", tag: "Website" },
                { href: "/blog/seo-local-pme", title: "Local SEO for small businesses: reaching Google's first page", tag: "SEO" },
                { href: "/blog/refonte-site-web", title: "Website redesign: when and how to do it", tag: "Redesign" },
              ].map((article) => (
                <Link
                  key={article.href}
                  href={article.href}
                  className="group rounded-xl border border-white/8 bg-gray-900/50 p-4 transition hover:border-white/16"
                >
                  <span className="mb-2 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-500">
                    {article.tag}
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition">{article.title}</p>
                  <p className="mt-1 text-xs text-gray-500 group-hover:text-gray-400 transition flex items-center gap-1">
                    Read the article <FiArrowRight size={11} />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
