import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck, FiX } from "react-icons/fi";

export const metadata: Metadata = {
  title: "How to choose a web agency for your small business — 2026 guide — KAH Digital",
  description: "quote, red flags, questions to ask, key criteria: everything a small business should know before choosing a web agency or freelance developer.",
  keywords: ["choisir agence web PME", "agence web PME", "how to choose a digital agency", "freelance vs agence web", "agence web petite entreprise"],
  alternates: { canonical: "https://kah-digital.ch/en/blog/agence-web-pme-comment-choisir" },
  openGraph: {
    title: "How to choose a web agency for your small business",
    description: "The criteria that really matter, the red flags, and the right questions to ask.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to choose a web agency for your small business — 2026 guide",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/en/blog/agence-web-pme-comment-choisir",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is a web agency or a freelancer better for a small business?", "acceptedAnswer": { "@type": "Answer", "text": "For a small business, a senior freelancer or an independent studio often offers more responsiveness and less overhead than a large agency. For complex projects, a structured agency may be preferable." } },
    { "@type": "Question", "name": "What questions should you ask before signing with a web agency?", "acceptedAnswer": { "@type": "Answer", "text": "Ask: Who will actually work on my project? Do I get access to the code and the hosting? What is included after launch? Do you have references in my sector?" } },
    { "@type": "Question", "name": "How do you scope a small-business project?", "acceptedAnswer": { "@type": "Answer", "text": "A clean, high-performing small-business showcase site is priced after scoping. Beware of proposals that are too vague, too standardised or without a clear explanation of the deliverables." } },
  ],
};

const GOOD_SIGNS = [
  "Portfolio with real delivered projects (not mockups)",
  "Process clair : brief ? maquette ? dev ? recette ? livraison",
  "Custom quote explained after a simple first scoping",
  "You receive the access: hosting, domain, source code",
  "Quick reply (within 24–48h) from the first contact",
  "A single contact who understands your trade",
];

const RED_FLAGS = [
  "No visible portfolio, or non-clickable projects",
  "Quote signed before your need is understood",
  "“Our quotes are on request” with no explanation of method or scope",
  "Proprietary hosting that you cannot leave",
  "Mandatory monthly maintenance contract with no clear justification",
  "A sales contact who then hands the project to an offshore team",
];

export default function EnAgenceWebPmePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/en/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">PME</span>
            <span className="text-xs text-gray-600">4 May 2026 · 6 min read</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            How to choose a web agency for your small business
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            The criteria that really matter, the red flags that should make you run, and the right questions to ask before signing.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
          <p className="text-sm leading-relaxed text-blue-200">
            <strong>TL;DR :</strong> Check the portfolio, ask who works on your project, make sure you get all the access. Avoid contracts with no way out and quotes without a clear scope.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Web agency or freelancer — which to choose for a small business?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          The real question is not “agency or freelancer” but “who will actually work on my project”. A large agency may put a junior or an offshore subcontractor on your project. A good independent studio can offer the same quality as a large structure, with more responsiveness and fewer intermediaries.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          For a small-business project, a senior freelancer or a small studio is often a good balance of quality, scoping and responsiveness.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">The good signs</h2>
        <div className="mb-10 space-y-3">
          {GOOD_SIGNS.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4">
              <FiCheck size={16} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-8 text-2xl font-bold text-white">The red flags — run</h2>
        <div className="mb-10 space-y-3">
          {RED_FLAGS.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-red-500/15 bg-red-500/5 p-4">
              <FiX size={16} className="mt-0.5 shrink-0 text-red-400" />
              <span className="text-sm text-gray-300">{item}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">The questions you must ask</h2>
        <div className="mb-10 space-y-4">
          {[
            { q: "Who will work on my project?", a: "You must know the person or people who will code and design your site. Not a project manager who delegates." },
            { q: "Will I have access to my code and my hosting?", a: "You must own everything. If the answer is vague, run." },
            { q: "What happens after launch?", a: "Bug fixes, updates, support: ask what is included, what is optional and the response time." },
            { q: "Do you have references in my sector?", a: "Not mandatory, but a plus. Ask to see delivered projects and to contact former clients." },
          ].map((item) => (
            <div key={item.q} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <p className="font-semibold text-white">? {item.q}</p>
              <p className="mt-2 text-sm text-gray-400">{item.a}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Frequently asked questions</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-violet-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Work with a transparent, responsive studio</h2>
          <p className="mb-6 text-gray-400">Clear process · Full access · Reply within 24h · Custom quote</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/en/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-blue-500/30">
              Request a quote <FiArrowRight size={15} />
            </Link>
            <Link href="/en/projets" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Voir notre portfolio
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}



