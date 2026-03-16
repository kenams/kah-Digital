"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Prêt à digitaliser votre PME ?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Discutons de votre projet et trouvons la solution idéale pour votre entreprise.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/devis"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Demander un devis gratuit
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}