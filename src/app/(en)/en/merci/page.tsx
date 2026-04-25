import type { Metadata } from "next";
import Link from "next/link";
import { brandContact } from "@/config/brand";
import { FiCheck, FiArrowRight, FiMail, FiPhone, FiCalendar } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function MerciPageEn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-20">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
          <FiCheck size={32} className="text-emerald-400" />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">Request received</p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white">Thanks, all sent.</h1>
        <p className="mb-10 text-lg text-gray-400">
          I will get back to you within 24h with a clear reply: budget, timeline, and recommendations. No fluff.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/en"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Back to home
            <FiArrowRight size={14} />
          </Link>
          <a
            href={`mailto:${brandContact.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            <FiMail size={14} />
            Send an email
          </a>
          <a
            href={`tel:${brandContact.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            <FiPhone size={14} />
            Call
          </a>
          {brandContact.calendlyUrl && (
            <a
              href={brandContact.calendlyUrl}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90"
            >
              <FiCalendar size={14} />
              Schedule a call
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
