import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal notice | Kah-Digital",
  description: "Legal information about Kah-Digital and site publishing details.",
};

const timeline = [
  {
    year: "2021",
    title: "Kah-Digital created",
    detail: "Independent studio founded by Keita Namake to lead premium Next.js and React Native projects.",
  },
  {
    year: "2023",
    title: "Vercel rollout",
    detail: "Shared infrastructure (Vercel, Supabase, Stripe) with monitoring and backups built-in.",
  },
  {
    year: "2024",
    title: "GDPR process strengthened",
    detail: "Consent management, deletion on request, and data access logs.",
  },
];

export default function MentionsLegalesPageEn() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link href="/en" className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white">
          Back to home
        </Link>
        <Link
          href="/en/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Quick quote
        </Link>
      </div>

      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Legal notice</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Legal information</h1>
        <p className="mt-2 text-sm text-slate-500">Information being updated (registration, address, VAT).</p>
        <div className="mt-6 grid gap-8 text-sm text-slate-700 md:grid-cols-2">
          <div className="space-y-3">
            <p>
              <strong>Company name:</strong> Kah-Digital
            </p>
            <p>
              <strong>Entity type:</strong> Sole proprietorship
            </p>
            <p>
              <strong>Publisher:</strong> Keita Namake
            </p>
            {/* i18n:critical:publisher */}
            <p>
              <strong>Email:</strong> kah-digital@hotmail.com
            </p>
            <p>
              <strong>Phone:</strong> +33 7 59 55 84 14 (temporary number)
            </p>
          </div>
          <div className="space-y-3">
            <p>
              <strong>Registered office:</strong> 10 rue de la Creation, 75000 Paris
            </p>
            <p>
              <strong>Registration:</strong> 901 234 567
            </p>
            <p>
              <strong>VAT:</strong> FR42 901234567
            </p>
            <p>
              <strong>Hosting:</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789 (USA)
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="light-outline p-6">
          <h2 className="text-xl font-semibold text-slate-900">Intellectual property</h2>
          <p className="mt-4 text-slate-700">
            All content (text, visuals, videos, graphic elements, and code) on kah-digital.com is protected by
            copyright and remains the exclusive property of Kah-Digital or its partners. Any reproduction or reuse
            requires prior written approval.
          </p>
        </div>
        <div className="light-outline p-6">
          <h2 className="text-xl font-semibold text-slate-900">Liability</h2>
          <p className="mt-4 text-slate-700">
            Kah-Digital makes every effort to provide accurate information but cannot be held liable for errors,
            omissions, or site unavailability. External links point to resources we do not control.
          </p>
        </div>
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Compliance timeline</h2>
        <div className="mt-6 space-y-4">
          {timeline.map((step) => (
            <div key={step.year} className="rounded-2xl border border-slate-900/10 bg-white/80 p-4">
              <p className="text-sm font-semibold text-slate-500">{step.year}</p>
              <p className="text-lg font-semibold text-slate-900">{step.title}</p>
              <p className="text-slate-700">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Contact and mediation</h2>
        <p className="mt-4 text-slate-700">
          For any question, complaint, or report related to published content, write to kah-digital@hotmail.com or
          send mail to the registered office. If a dispute remains, an amicable solution can be sought through a
          consumer mediator.
        </p>
      </div>
      <div className="light-surface space-y-5 px-8 py-10">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">CTA</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Always aligned on compliance and action.</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Frame your project while keeping a legal thread: quick quote, express quote, and brief review are all
            available to kick off the next steps.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-900">
          <Link
            href="/en/devis"
            className="rounded-full border border-slate-900/20 px-5 py-2 transition hover:border-slate-900 hover:bg-white"
          >
            Start a quote
          </Link>
          <Link
            href="/en/configurateur"
            className="rounded-full border border-slate-900/20 px-5 py-2 transition hover:border-slate-900 hover:bg-white"
          >
            Quick configurator
          </Link>
          <Link
            href="/en/projets"
            className="rounded-full border border-slate-900/20 px-5 py-2 transition hover:border-slate-900 hover:bg-white"
          >
            View case studies
          </Link>
        </div>
      </div>
    </div>
  );
}
