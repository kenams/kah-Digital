import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How to Choose an AI Agency in 2025: 7 Questions to Ask Before Signing — KAH Digital",
  description: "Not all AI agencies deliver real results. Here are 7 hard questions to separate serious AI agencies from hype sellers — before you commit a budget.",
  keywords: ["how to choose AI agency", "AI agency evaluation", "best AI agency 2025", "AI automation agency"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/how-to-choose-ai-agency" },
  openGraph: {
    title: "How to Choose an AI Agency in 2025: 7 Questions to Ask Before Signing",
    description: "Not all AI agencies deliver real results. Here are 7 hard questions to separate serious AI agencies from hype sellers — before you commit a budget.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Choose an AI Agency in 2025: 7 Questions to Ask Before Signing",
  "datePublished": "2026-05-20",
  "dateModified": "2026-05-20",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/how-to-choose-ai-agency",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I know if an AI agency is legitimate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ask for production deployments (not demos), a clear ROI measurement framework, and proof of code/agent ownership. Legitimate agencies will answer these questions without hesitation."
      }
    },
    {
      "@type": "Question",
      "name": "What should an AI agency deliver in 30 days?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In 30 days, a serious AI agency should deliver a working MVP: a deployed agent or automation, a measurement dashboard showing impact, and documentation of the system they built."
      }
    },
    {
      "@type": "Question",
      "name": "Who owns the AI agents and code after a project?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You should. Any serious AI agency transfers full code ownership, API keys, and agent configurations to the client after project completion. Avoid agencies that retain ownership or lock you into proprietary platforms."
      }
    },
  ],
};

const questions = [
  {
    num: "01",
    q: "Can you show me a production deployment — not a demo?",
    a: "Demos are cheap. Any developer can build a chatbot that answers questions in a sandbox. What matters is production: a system deployed for a real client, handling real volume, with measurable results. Ask for a case study with before/after metrics. If they can't provide one, move on."
  },
  {
    num: "02",
    q: "What is your deployment timeline?",
    a: "AI hype runs on vague timelines. A serious agency should be able to commit to a working MVP in 10–15 business days for scoped projects. If the answer is 'it depends on scope' without a concrete range, that's a red flag — scope is their job to define."
  },
  {
    num: "03",
    q: "What is your ROI measurement framework?",
    a: "Every AI project should have a clear success metric before development starts. Hours saved per week? Leads qualified automatically? Support tickets deflected? If the agency can't articulate how you'll measure ROI, they're selling technology, not results."
  },
  {
    num: "04",
    q: "Who owns the code and the agents after delivery?",
    a: "You should own everything: the source code, the agent configurations, the API keys, the fine-tuned prompts. Some agencies build on proprietary platforms that lock you in. Ask for a written ownership clause. If they hesitate, they're planning a long-term dependency — not a successful handoff."
  },
  {
    num: "05",
    q: "What happens if results fall short of projections?",
    a: "A confident agency stands behind its estimates. Ask: do you offer a performance guarantee? A revision phase? What's the process if the system underperforms by 50%? The answer reveals whether they're committed to outcomes or just to billing hours."
  },
  {
    num: "06",
    q: "What tech stack do you use?",
    a: "There's no universal 'best stack' for AI, but you want specificity. OpenAI + LangChain + FastAPI? Make.com for automation? n8n for workflows? Vague answers like 'cutting-edge AI tools' indicate they're reselling generic platforms at a premium. Ask for the actual tools, models, and infrastructure."
  },
  {
    num: "07",
    q: "Who will I actually work with?",
    a: "Sales decks are built by senior people. Projects are sometimes handed to juniors. Ask to meet the developer or engineer who will build your system — before you sign. Understand the communication cadence: daily updates? Weekly demos? Who do you call when something breaks in production?"
  },
];

const redFlags = [
  "Vague pricing with 'contact us for a quote' and no range whatsoever",
  "No case studies with real metrics — only testimonials and logos",
  "They retain ownership of agents, prompts, or code after delivery",
  "No deployment timeline, or 'we'll know once we start'",
  "They can't explain what model or stack they use in plain terms",
  "The person pitching you won't be the person building for you",
  "ROI is framed as 'transforming your business' — with zero numbers",
];

const delivers = [
  { title: "Working MVP deployed", detail: "Not a prototype. A live, tested system handling real requests or automations in your actual environment." },
  { title: "Measurement dashboard", detail: "At minimum a spreadsheet or Notion doc tracking key metrics: requests handled, time saved, conversion change, errors." },
  { title: "Full code and documentation", detail: "Every file, prompt, and configuration delivered and explained — so your team can maintain or extend without dependency." },
  { title: "First performance report", detail: "A clear before/after on the KPIs agreed at project start. Real numbers, not impressions." },
];

export default function HowToChooseAIAgencyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">
            ← Blog
          </Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">AI Strategy</span>
            <span className="text-xs text-gray-600">May 20, 2026 · 8 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            How to Choose an AI Agency in 2025: 7 Questions to Ask Before Signing
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            The AI agency market is flooded with vendors who can build impressive demos but disappear when it's time to deliver production-grade results. This guide gives you the exact questions to filter out the hype sellers — before you commit your budget.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        {/* TL;DR */}
        <div className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-sm leading-relaxed text-blue-200">
            <strong>Bottom line:</strong> A serious AI agency shows you production deployments, commits to timelines, transfers full code ownership, and measures ROI with real numbers. If they can't answer the 7 questions below, walk away.
          </p>
        </div>

        {/* Section 1 */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Why most AI agency pitches are smoke and mirrors</h2>
          <p className="mb-4 text-gray-300 leading-relaxed">
            The AI consulting market grew by over 40% in 2024. The problem: most of that growth came from agencies that learned to use the right vocabulary — "LLM", "agent", "automation ROI" — without having the engineering depth to back it up.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            In practice, this means a lot of ChatGPT wrappers being sold as custom AI solutions, a lot of Make.com workflows presented as "AI-powered systems", and a lot of beautiful pitch decks with zero production track record behind them.
          </p>
          <p className="mb-4 text-gray-300 leading-relaxed">
            The gap between a compelling AI demo and a production-ready AI system is enormous. A demo runs on curated data, in a controlled environment, with no edge cases, no monitoring, no failover. Production AI handles real users, messy inputs, authentication, logging, error recovery, and costs that scale with usage.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Evaluating an AI agency the way you'd evaluate a marketing agency — based on aesthetics, testimonials, and brand — will cost you time and money. The questions below are designed to cut through the presentation layer and expose the engineering reality underneath.
          </p>
        </section>

        {/* Section 2 — 7 questions */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">7 questions to ask any AI agency</h2>
          <div className="space-y-6">
            {questions.map((item) => (
              <div key={item.num} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
                <div className="mb-2 flex items-start gap-4">
                  <span className="shrink-0 rounded-lg bg-blue-500/10 px-2.5 py-1 text-sm font-black text-blue-400">{item.num}</span>
                  <h3 className="text-lg font-bold text-white leading-snug">{item.q}</h3>
                </div>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed pl-12">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3 — Red flags */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">Red flags to watch for</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            Beyond the 7 questions, there are patterns that consistently appear in agencies that overpromise and underdeliver. These aren't always obvious in a first meeting — they emerge in how the agency structures its pitch and contracts.
          </p>
          <ul className="space-y-3">
            {redFlags.map((flag) => (
              <li key={flag} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                <span className="mt-0.5 shrink-0 text-red-400 font-bold">✕</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm text-amber-200 leading-relaxed">
              <strong>Note on pricing:</strong> Legitimate AI projects have real costs — model API calls, infrastructure, development hours. If an agency quotes you "AI automation starting at €99/month" with no usage limits or engineering work described, they're reselling a SaaS tool with a markup, not building anything for you.
            </p>
          </div>
        </section>

        {/* Section 4 — What to expect in 30 days */}
        <section className="py-8">
          <h2 className="mb-4 text-2xl font-extrabold text-white">What a serious AI agency delivers in 30 days</h2>
          <p className="mb-6 text-gray-300 leading-relaxed">
            For a well-scoped project — an AI qualification chatbot, a document processing pipeline, a lead routing automation — 30 days is sufficient to go from contract to a working, measured system. Here's what that looks like concretely:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {delivers.map((d) => (
              <div key={d.title} className="rounded-xl border border-white/8 bg-gray-900/60 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <FiCheck size={14} className="text-emerald-400 shrink-0" />
                  <span className="font-bold text-white text-sm">{d.title}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{d.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-gray-300 leading-relaxed">
            If a project requires 6+ months before you see any measurable output, scope is either poorly defined or the agency is billing time without milestones. Always negotiate delivery in phases with clear acceptance criteria at each stage.
          </p>
        </section>

        {/* FAQ visible */}
        <section className="py-8">
          <h2 className="mb-6 text-2xl font-extrabold text-white">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqJsonLd.mainEntity.map((f) => (
              <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
                <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Request a free AI audit</h2>
          <p className="mb-6 text-gray-400">We review your current setup and show you exactly where AI can generate measurable ROI — in 48h, no commitment.</p>
          <Link
            href="/en/devis"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30"
          >
            Get my free AI audit <FiArrowRight size={15} />
          </Link>
        </div>
      </article>
    </div>
  );
}
