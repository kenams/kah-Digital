import type { Metadata } from "next";
import { InvoicePreview } from "@/components/invoice-preview";

export const metadata: Metadata = {
  title: "Invoices",
  description: "See KAH-Digital invoice structure and billing logic.",
};

export default function InvoicesPageEn() {
  return (
    <>
      <section className="bg-gradient-to-r from-green-600 to-teal-600 py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Professional invoicing</h1>
          <p className="text-xl">Clear, serious documents that stay easy to review.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our billing process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Transparency and professionalism in every financial exchange.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-xl font-bold text-green-600">1</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Detailed quote</h3>
              <p className="text-gray-600">A full quote with schedule and conditions before any production starts.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Billing at completion</h3>
              <p className="text-gray-600">Final invoice issued once the project is complete and validated.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <span className="text-xl font-bold text-green-600">3</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">Secure payment</h3>
              <p className="text-gray-600">Bank transfer with a 30-day payment term.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Preview</p>
            <h2 className="mb-4 mt-3 text-3xl font-bold text-slate-900">KAH-Digital invoice example</h2>
            <p className="text-lg text-slate-600">A clearer, cleaner document adapted to desktop and mobile reading.</p>
          </div>
          <InvoicePreview locale="en" />
        </div>
      </section>
    </>
  );
}
