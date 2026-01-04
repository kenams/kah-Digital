import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy | Kah-Digital",
  description: "How Kah-Digital collects and protects personal data.",
};

const sections = [
  {
    title: "Purposes and legal basis",
    content:
      "Data collected via forms (quotes, configurator, project brief, or contact) lets us qualify your project, reply to requests, and send a commercial proposal. The legal basis is the execution of pre-contractual measures (GDPR art. 6.1.b).",
  },
  {
    title: "Retention period",
    content:
      "Information is stored for up to 24 months after the last exchange, then archived or deleted. Accepted quotes are kept as long as needed to execute the mission and meet accounting obligations.",
  },
  {
    title: "Hosting and security",
    content:
      "The site is hosted on Vercel (EU/USA) and data is stored on secure services (Resend for email, Google Workspace or Notion for internal follow-up). Each tool is configured with strong authentication, access logs, and in-transit encryption.",
  },
  {
    title: "Sharing and subcontracting",
    content:
      "Only Kah-Digital members and, when applicable, contracted partners can access your information. We do not resell or rent your data. When subcontracting (freelance, partner studio), a confidentiality agreement is signed beforehand.",
  },
];

const rights = [
  "Right of access and rectification",
  "Right to erasure (right to be forgotten)",
  "Right to restriction and objection",
  "Right to data portability",
];

export default function PrivacyPolicyPageEn() {
  return (
    <div className="section-shell space-y-8">
      <div className="flex flex-wrap gap-3 text-sm text-white/70">
        <Link
          href="/en"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Back to home
        </Link>
        <Link
          href="/en/mentions-legales"
          className="rounded-full border border-white/20 px-4 py-2 transition hover:border-white hover:text-white"
        >
          Legal notice
        </Link>
      </div>

      <div className="light-surface px-6 py-8 sm:px-8 sm:py-12">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Privacy</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Privacy policy</h1>
        <p className="mt-4 text-slate-700">
          This page explains how Kah-Digital collects, uses, and protects data transmitted via kah-digital.com. We comply
          with GDPR and CNIL recommendations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="light-outline p-6 text-slate-700">
            <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
            <p className="mt-4">{section.content}</p>
          </article>
        ))}
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Your rights</h2>
        <p className="mt-4 text-slate-700">You can exercise the following rights at any time by emailing kah-digital@hotmail.com:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          {rights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-slate-700">
          For security reasons, we may ask you to confirm your identity before processing the request. You also have the
          right to lodge a complaint with your data protection authority.
        </p>
      </div>

      <div className="light-outline p-6">
        <h2 className="text-xl font-semibold text-slate-900">Cookies & audience measurement</h2>
        <p className="mt-4 text-slate-700">
          The site uses an audience measurement tool (Plausible or Google Analytics) configured without marketing cookies.
          Collected data is anonymized and used only to improve the user experience. You can block these measures via your
          browser settings.
        </p>
      </div>
    </div>
  );
}
