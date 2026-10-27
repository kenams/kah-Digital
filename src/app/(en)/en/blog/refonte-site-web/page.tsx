import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiAlertCircle, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Website redesign: when and how? — KAH Digital Studio",
  description: "The 7 signs it is time to redesign your website, and the method to get it right without wasting budget.",
  keywords: ["refonte site web", "renovate a website", "update a website", "refaire son site web", "moderniser site web"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/refonte-site-web" },
  openGraph: {
    title: "Website redesign: when and how?",
    description: "7 signs your site needs a redesign, and the method to do it well.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Website redesign: when should you start and how should you go about it?",
  "datePublished": "2026-04-24",
  "dateModified": "2026-04-24",
  "author": { "@type": "Organization", "name": "KAH Digital Studio" },
  "publisher": { "@type": "Organization", "name": "KAH Digital Studio", "url": "https://kah-digital.ch" },
};

const SIGNALS = [
  { num: "01", title: "Your site is not mobile-friendly", detail: "More than 60% of web traffic comes from smartphones. If your site is not responsive, you lose more than half of your potential visitors in the very first second." },
  { num: "02", title: "Il charge lentement", detail: "Beyond 3 seconds, 53% of mobile visitors leave. A slow site costs you customers every day." },
  { num: "03", title: "The design is more than 4 years old", detail: "The web moves fast. A 4-year-old site gives the impression of an outdated company — before the visitor has read a single line." },
  { num: "04", title: "You cannot update it yourself", detail: "If every text or image change means contacting your developer, it is a major brake on your communication." },
  { num: "05", title: "It does not generate contacts", detail: "A showcase site should convert between 1 and 3% of its visitors into contacts. Below that, there is a structure or call-to-action problem." },
  { num: "06", title: "It does not rank on Google", detail: "If your competitors appear before you in local searches, your site has a technical SEO or content problem." },
  { num: "07", title: "Your offer changed but your site did not", detail: "A site that no longer reflects what you really do is counter-productive — it attracts the wrong people and pushes away the right ones." },
];

export default function EnRefonteWebPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-refonte" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">Strategy</span>
            <span className="text-xs text-gray-600">24 April 2026 · 5 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Website redesign: when should you start and how should you go about it?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Redesigning a site is an important decision. Too early, and budget is wasted. Too late, and customers are lost. Here is how to know when to act — and how to do it.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">

        <h2 className="mb-8 text-2xl font-bold text-white">The 7 signs it is time</h2>
        <div className="mb-12 space-y-5">
          {SIGNALS.map((s) => (
            <div key={s.num} className="flex gap-4 rounded-2xl border border-white/8 bg-gray-900/50 p-5">
              <span className="shrink-0 font-mono text-2xl font-black text-white/10">{s.num}</span>
              <div>
                <h3 className="mb-1 font-bold text-white">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Full redesign or targeted improvements?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          Before throwing everything away, ask yourself: is it a surface problem (a dated design) or a deeper problem (architecture, unsuitable CMS, outdated stack)?
        </p>
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="mb-2 flex items-center gap-2"><FiAlertCircle size={15} className="text-amber-400" /><span className="font-semibold text-white text-sm">Targeted improvements</span></div>
            <p className="text-xs text-gray-400 leading-relaxed">The content is good and the structure holds — you only need to modernise the design, improve speed or fix SEO.</p>
            <p className="mt-2 text-xs font-semibold text-amber-400">Budget: to be defined after an audit</p>
          </div>
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
            <div className="mb-2 flex items-center gap-2"><FiCheck size={15} className="text-blue-400" /><span className="font-semibold text-white text-sm">Full redesign</span></div>
            <p className="text-xs text-gray-400 leading-relaxed">The CMS is old, the stack is outdated, or your offer has fundamentally changed. Start again on a clean base.</p>
            <p className="mt-2 text-xs font-semibold text-blue-400">Budget: to be defined after an audit</p>
          </div>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">The method in 5 steps</h2>
        <ol className="mb-12 space-y-6">
          {[
            { step: "Auditez l'existant", detail: "Before building anything, measure: speed (PageSpeed), SEO rankings (Google Search Console), conversion rate (Analytics), most visited pages. This data guides your decisions." },
            { step: "Define the exact scope", detail: "Which pages to keep, which to remove? Which new features? A vague scope is the first cause of budget overruns." },
            { step: "Choose the right stack", detail: "WordPress if you want to manage the content yourself. Next.js if performance and SEO are priorities. Avoid visual builders like Wix if you want real performance." },
            { step: "Manage the SEO migration", detail: "Every URL that changes needs a 301 redirect. A botched redirect plan can lose 30 to 50% of organic traffic within weeks." },
            { step: "Launch — then improve", detail: "A perfect site that ships in 6 months is worth less than a decent site shipped in 3 weeks. Launch with the minimum viable version, then iterate on real data." },
          ].map((item, i) => (
            <li key={item.step} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-sm font-bold text-white">{i + 1}</span>
              <div>
                <h3 className="mb-1 font-bold text-white">{item.step}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mb-6 text-2xl font-bold text-white">How long does a redesign take?</h2>
        <div className="mb-12 grid gap-3 sm:grid-cols-3">
          {[
            { type: "Site vitrine", delay: "5 business days" },
            { type: "Site corporate", delay: "3 – 6 weeks" },
            { type: "Application web", delay: "6 – 12 weeks" },
          ].map((item) => (
            <div key={item.type} className="rounded-xl border border-white/8 bg-gray-900 p-4 text-center">
              <div className="text-sm text-gray-500">{item.type}</div>
              <div className="mt-1 font-bold text-white">{item.delay}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Does your site need a redesign?</h2>
          <p className="mb-6 text-gray-400">We analyse your site for free and tell you what needs to change.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/en/audit-gratuit" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
              Audit gratuit <FiArrowRight size={15} />
            </Link>
            <Link href="/en/refonte-site-web" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Notre offre refonte
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


