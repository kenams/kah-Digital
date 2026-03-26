"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ContactCard } from "@/components/contact-card";
import { useLocale } from "@/lib/locale";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { locale } = useLocale();

  const copy = {
    fr: {
      title: "Questions utiles avant de signer",
      body: "Les reponses qui comptent quand on veut un site plus fort, une automatisation utile et un projet qui reste simple a suivre.",
      asideTitle: "Ce qu'on peut cadrer vite",
      asideBullets: [
        "clarifier une offre",
        "poser une premiere architecture",
        "identifier le bon use case IA",
        "sortir un budget credible",
      ],
      faqs: [
        {
          question: "Faites-vous uniquement de l'IA ?",
          answer:
            "Non. KAH-Digital travaille sur trois leviers ensemble: site qui convertit, automatisation utile et outil metier quand il faut structurer l'operation.",
        },
        {
          question: "Comment savoir si l'IA est vraiment utile dans mon cas ?",
          answer:
            "Si tu repetes les memes reponses, qualifies tes leads a la main ou perds trop de temps sur des demandes simples, il y a probablement un bon point d'automatisation.",
        },
        {
          question: "Proposez-vous des devis sur mesure ?",
          answer:
            "Oui. Le but est justement d'eviter le package flou. On part d'un besoin reel, d'un scope net et d'un budget lisible.",
        },
        {
          question: "En combien de temps un projet peut-il commencer ?",
          answer:
            "Quand le besoin est clair, une premiere direction avec budget et prochaine etape peut partir sous 48h. Le sprint depend ensuite du perimetre choisi.",
        },
        {
          question: "Pouvez-vous brancher l'assistant a notre support ou a GLPI ?",
          answer:
            "Oui. Si le cas d'usage le demande, l'assistant peut orienter, filtrer et transmettre proprement vers un humain, un email ou un ticket.",
        },
        {
          question: "Travaillez-vous avec des clients hors de votre marche local ?",
          answer:
            "Oui. Le site et le process sont penses pour travailler avec des equipes francophones, anglophones et internationales, a distance ou en mode hybride.",
        },
      ],
    },
    en: {
      title: "Useful questions before moving forward",
      body: "The answers that matter when you want a stronger website, useful automation, and a project that stays easy to follow.",
      asideTitle: "What we can scope quickly",
      asideBullets: [
        "clarify the offer",
        "set the first architecture",
        "identify the right AI use case",
        "produce a credible budget",
      ],
      faqs: [
        {
          question: "Do you only do AI work?",
          answer:
            "No. KAH-Digital works across three linked levers: websites that convert, useful automation, and business tools when operations need structure.",
        },
        {
          question: "How do I know if AI is actually useful for my case?",
          answer:
            "If your team keeps answering the same questions, qualifying leads manually, or wasting time on simple requests, there is likely a solid automation angle.",
        },
        {
          question: "Do you provide tailored quotes?",
          answer:
            "Yes. The goal is precisely to avoid vague packages. We start from a real need, a sharp scope, and a readable budget.",
        },
        {
          question: "How fast can a project start?",
          answer:
            "When the need is clear, a first direction with budget and next step can be sent within 48h. The sprint then depends on the chosen scope.",
        },
        {
          question: "Can you connect the assistant to our support flow or GLPI?",
          answer:
            "Yes. When relevant, the assistant can route, filter, and hand off cleanly to a human, an email workflow, or a ticketing system.",
        },
        {
          question: "Do you work with clients outside your local market?",
          answer:
            "Yes. The website and workflow are designed to support French-speaking, English-speaking, and international teams working remotely or hybrid.",
        },
      ],
    },
    de: {
      title: "Nuetzliche Fragen vor dem Start",
      body: "Antworten, die zaehlen, wenn du eine staerkere Website, nuetzliche Automatisierung und einen klar gefuehrten Projektablauf willst.",
      asideTitle: "Was wir schnell sauber briefen koennen",
      asideBullets: [
        "das Angebot schaerfen",
        "eine erste Architektur setzen",
        "den passenden KI-Use-Case finden",
        "ein glaubwuerdiges Budget aufsetzen",
      ],
      faqs: [
        {
          question: "Macht ihr nur KI-Projekte?",
          answer:
            "Nein. KAH-Digital arbeitet entlang von drei verbundenen Hebeln: Websites, die besser konvertieren, nuetzliche Automatisierung und Business-Tools mit Struktur.",
        },
        {
          question: "Woher weiss ich, ob KI fuer meinen Fall wirklich sinnvoll ist?",
          answer:
            "Wenn dein Team immer wieder dieselben Fragen beantwortet, Leads manuell qualifiziert oder zu viel Zeit mit einfachen Anliegen verliert, gibt es meist einen guten Automatisierungs-Hebel.",
        },
        {
          question: "Erstellt ihr individuelle Angebote?",
          answer:
            "Ja. Genau darum geht es: keine vagen Pakete, sondern ein echter Bedarf, ein sauberer Scope und ein lesbares Budget.",
        },
        {
          question: "Wie schnell kann ein Projekt starten?",
          answer:
            "Wenn der Bedarf klar ist, kann eine erste Richtung mit Budget und naechstem Schritt innerhalb von 48h rausgehen. Der Sprint haengt danach vom Scope ab.",
        },
        {
          question: "Koennt ihr den Assistenten an unseren Support oder GLPI anbinden?",
          answer:
            "Ja. Wenn es sinnvoll ist, kann der Assistent sauber an Menschen, E-Mail-Flows oder ein Ticketsystem uebergeben.",
        },
        {
          question: "Arbeitet ihr mit Kunden ausserhalb eures lokalen Marktes?",
          answer:
            "Ja. Website und Arbeitsweise sind fuer frankophone, englischsprachige und internationale Teams ausgelegt, remote oder hybrid.",
        },
      ],
    },
  }[locale];

  return (
    <section id="faq" className="section-shell">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{copy.title}</h2>
          <p className="mt-4 text-base leading-7 text-white/70 sm:text-lg">{copy.body}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.85fr,1.15fr] lg:items-start">
          <div className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">{copy.asideTitle}</p>
              <div className="mt-5 grid gap-3">
                {copy.asideBullets.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#d6b36a]/30 bg-[#d6b36a]/10 text-xs font-semibold text-[#f3ddb0]">
                      0{index + 1}
                    </span>
                    <span className="text-sm text-white/72">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <ContactCard />
          </div>
          <div className="space-y-4">
            {copy.faqs.map((faq, index) => (
              <div key={faq.question} className="premium-card overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left hover:bg-white/[0.04]"
                >
                  <span className="pr-6 text-lg font-semibold text-white">{faq.question}</span>
                  {openIndex === index ? <FiChevronUp className="text-white/55" size={24} /> : <FiChevronDown className="text-white/55" size={24} />}
                </button>
                {openIndex === index ? (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-7 text-white/70">{faq.answer}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
