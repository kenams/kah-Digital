import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export const metadata: Metadata = {
  title: "comment estimer une application mobile en 2026 ? � KAH Digital",
  description: "crit�res de cadrage pour une app mobile en 2026 : application vitrine, MVP, application native ou React Native. Guide pour obtenir un devis personnalis�.",
  keywords: ["estimation application mobile", "devis application mobile", "comment estimer une app", "d�veloppement application mobile sur mesure", "MVP application mobile"],
  alternates: { canonical: "https://kah-digital.ch/blog/application-mobile-cout" },
  openGraph: {
    title: "comment estimer une application mobile en 2026 ?",
    description: "Les crit�res qui structurent le p�rim�tre d'une application mobile et permettent de garder le contr�le.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "comment estimer une application mobile en 2026 ?",
  "datePublished": "2026-05-04",
  "dateModified": "2026-05-04",
  "author": { "@type": "Organization", "name": "KAH Digital" },
  "publisher": { "@type": "Organization", "name": "KAH Digital", "url": "https://kah-digital.ch" },
  "mainEntityOfPage": "https://kah-digital.ch/blog/application-mobile-cout",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "comment estimer une application mobile simple ?", "acceptedAnswer": { "@type": "Answer", "text": "Une application mobile simple (MVP, 3-5 �crans, authentification, une fonctionnalit� principale) s'estime apr�s cadrage avec React Native, qui permet de cibler iOS et Android avec une seule base de code." } },
    { "@type": "Question", "name": "Quelle est la diff�rence entre natif et cross-platform ?", "acceptedAnswer": { "@type": "Answer", "text": "Une application native implique souvent deux bases de code s�par�es. React Native ou Flutter permettent de viser les deux plateformes en une seule fois, ce qui simplifie le cadrage d'un MVP." } },
    { "@type": "Question", "name": "Faut-il pr�voir des comptes App Store et Google Play ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui. Les comptes d�veloppeur restent � votre charge en tant qu'�diteur de l'application et sont � anticiper avant la publication." } },
    { "@type": "Question", "name": "Peut-on commencer avec une version plus simple ?", "acceptedAnswer": { "@type": "Answer", "text": "Oui, dans certains cas : une Progressive Web App ou un prototype no-code peut suffire pour valider un flux simple avant un d�veloppement complet." } },
  ],
};

const TIERS = [
  { label: "PWA / Web App mobile", price: "selon le p�rim�tre", delay: "2�3 sem.", desc: "Une application web qui s'installe comme une app. Pas dans les stores, mais fonctionne hors-ligne et s'utilise comme une app native.", tech: "Next.js � React � Service Workers" },
  { label: "MVP React Native", price: "selon le p�rim�tre", delay: "4�6 sem.", desc: "Application iOS + Android avec une base de code commune. Id�al pour valider une id�e avec un P�rim�tre ma�tris�.", tech: "React Native � Expo � Supabase" },
  { label: "Application compl�te", price: "selon le p�rim�tre", delay: "8�14 sem.", desc: "Produit complet avec auth, paiement, dashboard admin, notifications push, API sur mesure.", tech: "React Native � Node.js � PostgreSQL" },
  { label: "Application native iOS/Android", price: "selon le p�rim�tre", delay: "12�24 sem.", desc: "Deux bases de code s�par�es, performances maximales, acc�s complet aux APIs syst�me. Pour des produits �tablis.", tech: "Swift + Kotlin ou SwiftUI + Compose" },
];

const COST_DRIVERS = [
  { title: "Authentification et comptes", detail: "Login, profils, r�les et droits d'acc�s doivent �tre cadr�s d�s le d�part." },
  { title: "Paiement in-app", detail: "Stripe, achats int�gr�s Apple/Google et parcours de facturation demandent une analyse sp�cifique." },
  { title: "Notifications push", detail: "La segmentation, les r�gles d'envoi et les pr�f�rences utilisateur influencent le p�rim�tre." },
  { title: "G�olocalisation", detail: "Cartographie, tracking, calcul d'itin�raire et permissions mobiles doivent �tre valid�s fonctionnellement." },
  { title: "Mode hors-ligne", detail: "La synchronisation locale et la gestion des conflits augmentent la complexit� produit." },
  { title: "Dashboard admin web", detail: "Une interface de gestion d�di�e doit �tre trait�e comme un module � part enti�re." },
];

export default function ApplicationMobileCoutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Script id="ld-article" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="relative overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-300">? Blog</Link>
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">Mobile</span>
            <span className="text-xs text-gray-600">4 mai 2026 � 7 min de lecture</span>
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            comment estimer une application mobile en 2026 ?
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            PWA, React Native, application native � les crit�res qui structurent le p�rim�tre, et comment rester ma�tre de votre investissement.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 pb-24">
        <div className="mb-10 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <p className="text-sm leading-relaxed text-violet-200">
            <strong>TL;DR :</strong> PWA selon le p�rim�tre � MVP React Native selon le p�rim�tre � Application compl�te selon le p�rim�tre � Native iOS+Android selon le p�rim�tre. Commencez toujours par un MVP.
          </p>
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Pourquoi le cadrage est indispensable ?</h2>
        <p className="mb-6 text-gray-400 leading-relaxed">
          "D�velopper une application mobile" peut vouloir dire une to-do list � 3 �crans ou une plateforme de livraison � 50 fonctionnalit�s. Le devis d�pend de trois choses : le nombre de fonctionnalit�s, la complexit� technique (paiement, g�oloc, temps r�el) et la technologie choisie.
        </p>
        <p className="mb-10 text-gray-400 leading-relaxed">
          La r�gle d'or : commencez par un MVP (Minimum Viable Product) avec une seule fonctionnalit� principale. Validez que des gens l'utilisent vraiment, puis investissez davantage.
        </p>

        <h2 className="mb-8 text-2xl font-bold text-white">Les formats par type d'application</h2>
        <div className="mb-12 space-y-4">
          {TIERS.map((t) => (
            <div key={t.label} className="rounded-2xl border border-white/8 bg-gray-900 p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-gray-500">{t.label}</p>
                  <p className="text-2xl font-black text-white">{t.price}</p>
                  <p className="text-xs text-gray-600">{t.delay}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500">{t.tech}</span>
              </div>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Ce qui fait monter le P�rim�tre</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {COST_DRIVERS.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/8 bg-gray-900/50 p-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-6 text-2xl font-bold text-white">Comment r�duire le P�rim�tre sans sacrifier la qualit�</h2>
        <ul className="mb-10 space-y-3 text-sm text-gray-400 leading-relaxed">
          {[
            "Commencez par une seule plateforme (iOS OU Android) pour valider, puis �tendez.",
            "Utilisez React Native ou Expo � une base de code, deux plateformes, souvent plus simple � maintenir qu'un double d�veloppement natif.",
            "D�finissez un scope strict pour le MVP. Chaque fonctionnalit� en plus multiplie le P�rim�tre.",
            "Choisissez Supabase ou Firebase comme backend � des semaines de dev �conomis�es.",
            "�vitez les animations complexes et les effets 3D en V1 � �a peut attendre la V2.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <FiCheck size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-white">Questions fr�quentes</h2>
        <div className="mb-12 space-y-4">
          {faqJsonLd.mainEntity.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/8 bg-gray-900/50 p-5">
              <h3 className="mb-2 font-semibold text-white">{f.name}</h3>
              <p className="text-sm text-gray-400">{f.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-blue-600/10 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white">Votre application mobile, bien budg�t�e</h2>
          <p className="mb-6 text-gray-400">Devis personnalis� � R�ponse sous 24h � MVP cadr� sur mesure</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/devis" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-3.5 font-bold text-white shadow-lg transition hover:shadow-violet-500/30">
              Demander un devis <FiArrowRight size={15} />
            </Link>
            <Link href="/offres" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:border-white/40">
              Voir nos offres
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}


