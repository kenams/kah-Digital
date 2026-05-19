"use client";

import { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiZap, FiSearch, FiTrendingUp, FiMessageCircle } from "react-icons/fi";
import { trackEvent } from "@/lib/analytics";

const WA_AUDIT_URL = "https://wa.me/33759558414?text=Hi%20K%C3%A9nan%2C%20I%27d%20like%20a%20free%20audit%20of%20my%20website.";

const CHECKS = [
  { icon: FiSearch, label: "Google SEO ranking" },
  { icon: FiZap, label: "Loading speed" },
  { icon: FiTrendingUp, label: "Conversion rate" },
  { icon: FiCheckCircle, label: "Mobile compatibility" },
];

export default function AuditGratuitPageEn() {
  const [form, setForm] = useState({ businessName: "", website: "", email: "", phone: "" });
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.website || !form.email) return;
    setState("loading");
    try {
      const res = await fetch("/api/audit-gratuit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale: "en" }),
      });
      if (!res.ok) throw new Error();
      setState("done");
      trackEvent("generate_lead", { form_name: "audit_gratuit_en", website: form.website });
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600">
            <FiCheckCircle size={36} className="text-white" />
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-white">Audit in progress!</h1>
          <p className="mb-6 text-gray-400 leading-relaxed">
            Your personalised audit is being prepared. You'll receive the results at <strong className="text-white">{form.email}</strong> within a few hours.
          </p>
          <div className="rounded-2xl border border-white/8 bg-gray-900 p-5 text-left space-y-2">
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">You will receive:</p>
            {["Digital score out of 100", "List of detected issues", "Concrete recommendations", "Budget estimate"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                <FiCheckCircle size={13} className="text-emerald-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-600">No commitment · Personalised results · Free</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="relative overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-300">
            <FiZap size={13} /> Free analysis — no commitment
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Get your free website audit
          </h1>
          <p className="mb-8 text-lg text-gray-400">
            KAH Digital analyses your website and sends you a complete report: score, detected issues, recommendations and budget estimate.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-24 grid gap-12 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Company name *</label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                placeholder="Ex: Dupont Consulting, Le Moulin Restaurant..."
                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Website URL *</label>
              <input
                type="url"
                required
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://your-website.com"
                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Your email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@your-company.com"
                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-300">Phone (optional)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+33 6 00 00 00 00"
                className="w-full rounded-xl border border-white/10 bg-gray-900 px-4 py-3 text-white placeholder-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>
            {state === "error" && (
              <p className="text-sm text-red-400">An error occurred. Please retry or email kahdigital42@gmail.com.</p>
            )}
            <button
              type="submit"
              disabled={state === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/25 transition hover:shadow-blue-500/40 disabled:opacity-60"
            >
              {state === "loading" ? "Analysing..." : <>Launch my free audit <FiArrowRight size={16} /></>}
            </button>
            <p className="text-center text-xs text-gray-600">No credit card · Results by email · 100% free</p>
          </form>
          <div className="mt-6 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/8 p-4 text-center">
            <p className="mb-2 text-sm font-semibold text-white">Prefer a direct reply?</p>
            <a
              href={WA_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              <FiMessageCircle size={15} />
              Request via WhatsApp
            </a>
            <p className="mt-2 text-xs text-gray-500">Reply within 2h on weekdays</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-lg font-bold text-white">What you receive</h2>
            <div className="space-y-3">
              {[
                { icon: FiSearch, title: "Digital score /100", desc: "An overall health score for your website." },
                { icon: FiZap, title: "Identified issues", desc: "SEO, speed, mobile, UX — every weak point detailed." },
                { icon: FiTrendingUp, title: "Recommendations", desc: "Concrete actions to improve your site immediately." },
                { icon: FiCheckCircle, title: "Budget estimate", desc: "Indicative range for a redesign or improvement." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl border border-white/8 bg-gray-900/50 p-4">
                  <item.icon size={16} className="mt-0.5 shrink-0 text-blue-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-gray-900/50 p-5">
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#fbbf24" className="h-3.5 w-3.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <p className="text-sm text-gray-300 italic">"In 3 weeks I had a clean, professional website. 4 new clients in the first month."</p>
            <p className="mt-2 text-xs text-gray-600">S.M. — Business coach, Lyon</p>
          </div>
        </div>
      </div>

      <section className="border-t border-white/6 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-xl font-bold text-white">What the audit analyses</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHECKS.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 rounded-xl border border-white/8 bg-gray-900/50 p-4 text-center">
                <item.icon size={20} className="text-blue-400" />
                <span className="text-xs text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/6 bg-gradient-to-r from-blue-950/60 to-violet-950/40 py-14">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">Limited spots</p>
          <h2 className="mb-4 text-2xl font-extrabold text-white">2 free audits available this month</h2>
          <p className="mb-8 text-gray-400">Each audit is prepared manually by Kénan. Spots are limited to guarantee quality.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={WA_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-bold text-white shadow-lg shadow-green-500/20 transition hover:brightness-110"
            >
              <FiMessageCircle size={16} />
              Book my audit on WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-600">100% free · No commitment · Personalised results</p>
        </div>
      </section>
    </div>
  );
}
