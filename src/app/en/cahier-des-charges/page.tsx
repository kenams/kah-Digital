import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveBrief } from "@/components/interactive-brief";

export const metadata: Metadata = {
  title: "Project brief",
  description: "Interactive brief and PDF export to scope a digital project.",
};

export default function CahierDesChargesPageEn() {
  return (
    <div className="section-shell space-y-12">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/en"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Back to home
        </Link>
        <Link
          href="/en/configurateur"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Open configurator
        </Link>
      </div>
      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12 text-slate-900">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Project brief</p>
        <h1 className="mt-4 text-4xl font-semibold">Everything is ready to frame your project.</h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700">
          Download the pre-filled PDF or fill the interactive version below. Then share it with your team or send it
          directly to us.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="/cahier-des-charges.en.pdf"
            target="_blank"
            rel="noreferrer"
            download
            className="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
          >
            Download the PDF
          </a>
          <Link
            href="/en/devis"
            className="inline-flex items-center rounded-full border border-slate-900/20 px-6 py-3 text-slate-900 transition hover:border-slate-900"
          >
            Go straight to the quote
          </Link>
        </div>
      </div>
      <InteractiveBrief />
    </div>
  );
}
