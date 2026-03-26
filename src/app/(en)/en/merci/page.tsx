import type { Metadata } from "next";
import Link from "next/link";
import { brandContact } from "@/config/brand";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function MerciPageEn() {
  return (
    <div className="section-shell">
      <div className="light-surface p-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Thank you</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Request sent.</h1>
        <p className="mt-4 text-lg text-slate-700">
          We will get back to you quickly with a clear quote, recommendations, and a timeline.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link
            href="/en"
            className="rounded-full border border-slate-300 px-5 py-2 text-slate-800 transition hover:border-slate-500"
          >
            Back to home
          </Link>
          <Link
            href={`mailto:${brandContact.email}`}
            className="rounded-full bg-black px-5 py-2 font-semibold text-white transition hover:bg-slate-800"
          >
            Send an email
          </Link>
          <Link
            href={`tel:${brandContact.phoneHref}`}
            className="rounded-full border border-slate-300 px-5 py-2 text-slate-800 transition hover:border-slate-500"
          >
            Call
          </Link>
          {brandContact.calendlyUrl && (
            <Link
              href={brandContact.calendlyUrl}
              className="rounded-full bg-slate-900 px-5 py-2 font-semibold text-white transition hover:bg-slate-800"
            >
              Schedule a call
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
