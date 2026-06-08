import Link from "next/link";
import {
  FiCheck,
  FiClock,
  FiCode,
  FiCompass,
  FiDatabase,
  FiMonitor,
  FiShield,
  FiSmartphone,
  FiTool,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

type ServicePageKey = "site-web" | "applications" | "glpi";

type Props = {
  locale: Locale;
  page: ServicePageKey;
};

const content = {
  fr: {
    "site-web": {
      heroClassName: "bg-gradient-to-r from-blue-600 to-sky-500 py-20 text-white",
      eyebrow: "Sites vitrines, sites corporate et plateformes de présentation",
      title: "Des sites web clairs, crédibles et utiles pour votre entreprise",
      body:
        "KAH Digital conçoit des sites web pour entreprises francophones, anglophones et internationales. L'objectif n'est pas juste d'être en ligne, mais de mieux présenter votre activité, rassurer vos clients et faciliter la prise de contact.",
      primaryHref: "/devis",
      primaryLabel: "Demander un devis",
      secondaryHref: "/projets/kah-prod",
      secondaryLabel: "Voir une realisation",
      sections: [
        {
          kind: "split-list",
          leftTitle: "Quand un nouveau site devient utile",
          leftIcon: FiTrendingUp,
          leftItems: [
            "Site absent, ancien ou peu convaincant",
            "Image de marque qui ne reflète pas le niveau réel de l'entreprise",
            "Peu de demandes entrantes depuis le web",
            "Contenu difficile à faire évoluer en interne",
          ],
          rightTitle: "Ce que le projet doit vraiment apporter",
          rightIcon: FiCheck,
          rightItems: [
            "Présentation plus claire de l'offre et du positionnement",
            "Site plus propre, rapide et plus facile à faire vivre",
            "Parcours de contact et de devis plus direct",
            "Paiement en ligne possible si le projet le demande",
            "Base solide pour mieux travailler votre visibilité en ligne",
          ],
        },
        {
          kind: "pricing",
          sectionClassName: "bg-gray-50 py-16",
          title: "Formats de projet",
          body:
            "Des formats souples pour cadrer un projet web selon le besoin réel, le contenu, le niveau de design, les fonctionnalités et le budget disponible.",
          items: [
            {
              title: "Essentiel",
              price: "Projet simple",
              points: [
                "Site vitrine 4 à 6 pages",
                "Design responsive",
                "Formulaire de contact",
                "Base SEO propre",
                "Paiement simple possible en option",
                "Mise en ligne et prise en main",
              ],
              cta: "Échanger sur ce format",
            },
            {
              title: "Business",
              price: "Projet évolutif",
              points: [
                "Site corporate plus complet",
                "Pages services structurées",
                "CMS ou zone d'édition",
                "Suivi analytics",
                "Acompte, réservation ou paiement simple possible",
                "Accompagnement au lancement",
              ],
              cta: "Échanger sur ce format",
            },
            {
              title: "Sur mesure",
              price: "Projet sur mesure",
              points: [
                "Direction plus premium",
                "Parcours conversion travaillé",
                "Connexions à vos outils",
                "Fonctionnalités métier spécifiques",
                "Stripe Checkout ou paiement sur mesure possible",
                "Support de lancement prioritaire",
              ],
              cta: "Échanger sur ce format",
            },
          ],
        },
        {
          kind: "feature-cards",
          sectionClassName: "bg-white py-16",
          items: [
            {
              icon: FiMonitor,
              title: "Presentation et confiance",
              body:
                "Une structure propre, des contenus lisibles et une image plus sérieuse pour vos clients, partenaires ou futurs recrutements.",
            },
            {
              icon: FiCompass,
              title: "Parcours plus direct",
              body:
                "L'utilisateur comprend mieux ce que vous faites, pour qui, et comment vous contacter sans perdre de temps.",
            },
            {
              icon: FiCheck,
              title: "Base durable",
              body:
                "Le site reste évolutif et peut servir de base à d'autres outils, contenus, campagnes ou automatisations plus tard.",
            },
          ],
          timelineTitle: "Méthode de travail",
          timelineBody: "Un cadre simple, lisible et sans surproduction inutile.",
          timeline: [
            { step: "01", title: "Cadrage", description: "Objectifs, structure du site, pages utiles et priorités business." },
            { step: "02", title: "Direction", description: "Univers visuel, rythme, contenus et expérience attendue." },
            { step: "03", title: "Production", description: "Intégration, développement, optimisation et connecteurs utiles." },
            { step: "04", title: "Mise en ligne", description: "Validation, domaine, SEO de base et derniers ajustements." },
            { step: "05", title: "Suivi", description: "Corrections, évolutions et support selon le besoin." },
          ],
        },
      ],
      cta: {
        className: "bg-blue-600 py-16 text-white",
        title: "Besoin d'un site plus propre pour votre entreprise ?",
        body:
          "Nous pouvons cadrer un site vitrine ou corporate solide, avec un niveau de finition adapté à votre marché, à votre rythme et à votre budget, et ajouter un paiement simple si le projet le demande.",
        label: "Demander un devis gratuit",
      },
    },
    applications: {
      heroClassName: "bg-gradient-to-r from-slate-900 to-blue-700 py-20 text-white",
      eyebrow: "Applications web, outils metier et experiences mobiles",
      title: "Des applications utiles, pas des usines a gaz",
      body:
        "KAH Digital conçoit des applications web et mobiles pour entreprises qui veulent mieux organiser, automatiser ou fluidifier une partie de leur activité, avec une logique de production simple et exploitable.",
      primaryHref: "/devis",
      primaryLabel: "Demander un devis",
      secondaryHref: "/contact",
      secondaryLabel: "Discuter du besoin",
      sections: [
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "Cas d'usage frequents",
          body:
            "Des projets souvent demandés par des PME, des structures en croissance ou des équipes qui veulent mieux faire circuler l'information.",
          items: [
            "Portails clients et extranet",
            "Tableaux de bord et reporting",
            "Outils internes pour équipes terrain ou back-office",
            "Applications de suivi, reservation ou planification",
            "Mini-CRM, back-office et espaces membres",
            "Automatisation de taches administratives ou commerciales",
          ],
        },
        {
          kind: "benefit-cards",
          sectionClassName: "bg-gray-50 py-16",
          title: "Ce que cela doit changer concretement",
          body: "Un meilleur fonctionnement interne, pas seulement un bel ecran de plus.",
          icon: FiCheck,
          items: [
            "Moins de saisies manuelles et de doubles traitements",
            "Donnees mieux centralisees et plus lisibles",
            "Outils adaptes a votre fonctionnement reel",
            "Gain de temps sur les operations repetitives",
            "Meilleure circulation de l'information",
            "Base évolutive pour de futurs modules",
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-white py-16",
          title: "Ce qui est inclus dans l'approche",
          body: "Du cadrage jusqu'au lancement, avec un niveau de complexite adapte.",
          items: [
            {
              icon: FiCode,
              title: "Developpement sur mesure",
              body: "Une application pensee pour votre besoin, pas un assemblage fragile de briques generiques.",
            },
            {
              icon: FiDatabase,
              title: "Architecture de données propre",
              body: "Structure, droits et logique de stockage adaptes a vos usages et a votre croissance.",
            },
            {
              icon: FiSmartphone,
              title: "Web, mobile ou hybride",
              body: "Le bon format selon vos utilisateurs, vos contraintes terrain et votre budget.",
            },
            {
              icon: FiCheck,
              title: "Cadrage et accompagnement",
              body: "Nous vous aidons a clarifier le perimetre, prioriser et lancer sans partir dans tous les sens.",
            },
          ],
        },
        {
          kind: "pricing",
          sectionClassName: "bg-gray-50 py-16",
          title: "Formats de cadrage",
          body:
            "Chaque application est estimée après cadrage selon le périmètre, les utilisateurs, les intégrations, les délais et les priorités métier.",
          items: [
            {
              title: "Application metier",
              price: "Besoin opérationnel ciblé",
              description:
                "Pour remplacer un process manuel, structurer une activité ou centraliser l'opérationnel.",
            },
            {
              title: "Portail ou espace client",
              price: "Expérience client évolutive",
              description:
                "Pour donner un accès utile à des documents, états, demandes ou suivis côté client.",
            },
            {
              title: "Application plus complete",
              price: "Produit métier sur mesure",
              description:
                "Pour un produit plus riche avec comptes, données, workflows et intégrations multiples.",
            },
          ],
        },
      ],
      cta: {
        className: "bg-blue-700 py-16 text-white",
        title: "Besoin d'un outil plus adapte a votre facon de travailler ?",
        body:
          "Nous pouvons cadrer une application claire, évolutive et utile pour vos équipes ou vos clients.",
        label: "Obtenir un devis personnalise",
      },
    },
    glpi: {
      heroClassName: "bg-gradient-to-r from-emerald-600 to-teal-600 py-20 text-white",
      eyebrow: "Parcours support, aide virtuelle et tickets GLPI",
      title: "Un support plus simple autour de GLPI",
      body:
        "KAH Digital ne remplace pas votre équipe GLPI et ne vend pas une infogérance déguisée. Nous construisons un parcours plus fluide autour de votre support, avec une aide virtuelle de premier niveau et une création de ticket quand le besoin doit être repris proprement.",
      heroNote: "Solution proprietaire KAH Digital, adaptee a votre organisation support",
      primaryHref: "/devis",
      primaryLabel: "Obtenir un devis",
      secondaryHref: "/services/glpi#services",
      secondaryLabel: "Voir les services",
      sections: [
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "Comment nous nous positionnons",
          body:
            "Un complement utile pour le support, sans remplacer votre outil ni votre organisation existante.",
          withCheck: true,
          items: [
            "Une couche de parcours et d'assistance en amont de GLPI",
            "Une entree plus simple pour les utilisateurs qui ont besoin d'aide",
            "Une aide virtuelle discrete pour orienter et debloquer les demandes simples",
            "Une création de ticket quand la reprise par le support devient nécessaire",
            "Une adaptation au fonctionnement de votre support existant",
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-gray-50 py-16",
          title: "Ce que cela apporte concretement",
          body: "Un support plus lisible pour les utilisateurs et plus propre pour l'équipe.",
          items: [
            {
              icon: FiClock,
              title: "Moins de friction",
              body: "Les utilisateurs trouvent plus vite un premier niveau d'aide avant de passer par un ticket.",
            },
            {
              icon: FiUsers,
              title: "Demandes mieux cadrees",
              body: "Le support recupere plus de contexte et des demandes mieux orientees vers le bon canal.",
            },
            {
              icon: FiShield,
              title: "Positionnement discret",
              body: "La solution peut être présentée comme une aide virtuelle et un parcours support renforcé, sans surpromesse.",
            },
            {
              icon: FiTrendingUp,
              title: "Escalade plus propre",
              body: "Quand l'aide ne suffit pas, le passage vers ticket se fait de facon plus fluide et plus exploitable.",
            },
          ],
        },
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "Cas d'usage courants",
          body: "Des situations ou une aide en amont change vraiment l'experience support.",
          itemIcon: FiTool,
          items: [
            "Aide utilisateur avant création de ticket",
            "Qualification plus propre des demandes internes",
            "Reduction des tickets repetitifs ou incomplets",
            "Point d'entree plus simple pour les PME",
            "Passage fluide vers GLPI quand le support doit reprendre",
            "Support plus lisible pour des équipes qui veulent gagner du temps",
          ],
        },
        {
          kind: "pricing",
          id: "services",
          sectionClassName: "bg-gray-50 py-16",
          title: "Services autour de GLPI",
          body: "Du cadrage jusqu'au passage vers ticket, avec un périmètre ajusté à votre organisation support.",
          columns: 4,
          items: [
            {
              title: "Cadrage du parcours support",
              price: "Diagnostic support",
              description:
                "Analyse des demandes frequentes, des points de blocage et des moments ou il faut passer au support humain.",
            },
            {
              title: "Aide virtuelle de premier niveau",
              price: "Aide virtuelle adaptée",
              description:
                "Mise en place d'un point d'aide qui guide l'utilisateur sur vos contenus, procedures ou cas courants.",
            },
            {
              title: "Connexion vers ticket GLPI",
              price: "Connexion cadrée",
              description:
                "Passage propre de l'assistance vers la création de ticket lorsque le besoin doit être repris par l'équipe support.",
            },
            {
              title: "Suivi et ajustements",
              price: "Suivi ajustable",
              description:
                "Évolution du parcours, des réponses et des points de passage selon le retour terrain.",
            },
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-white py-16",
          title: "Ce que nous faisons, et ce que nous ne faisons pas",
          items: [
            {
              icon: FiUsers,
              title: "Nous structurons le parcours",
              body: "Nous travaillons l'entree, l'aide utilisateur, l'orientation et le passage vers ticket.",
            },
            {
              icon: FiClock,
              title: "Nous integrons proprement",
              body: "Nous adaptons la logique au fonctionnement de votre support existant, sans casser vos habitudes.",
            },
            {
              icon: FiShield,
              title: "Nous ne remplaçons pas votre équipe GLPI",
              body: "L'exploitation GLPI reste chez vous ou chez votre prestataire. Nous intervenons en complement.",
            },
          ],
        },
      ],
      cta: {
        className: "bg-emerald-600 py-16 text-white",
        title: "Besoin d'un support plus fluide autour de GLPI ?",
        body:
          "Nous pouvons cadrer un parcours utile, discret et plus propre pour vos utilisateurs comme pour votre support.",
        label: "Demander un devis",
      },
    },
  },
  en: {
    "site-web": {
      heroClassName: "bg-gradient-to-r from-blue-600 to-sky-500 py-20 text-white",
      eyebrow: "Showcase websites, corporate sites, and presentation platforms",
      title: "Clear, credible, useful websites for companies",
      body:
        "KAH Digital builds websites for French-speaking, English-speaking, and international companies. The goal is not just to be online, but to present the business more clearly, reassure prospects, and make contact easier.",
      primaryHref: "/devis",
      primaryLabel: "Request a quote",
      secondaryHref: "/projets/kah-prod",
      secondaryLabel: "View a project",
      sections: [
        {
          kind: "split-list",
          leftTitle: "When a new website becomes useful",
          leftIcon: FiTrendingUp,
          leftItems: [
            "No site, outdated site, or weak first impression",
            "Brand image that does not reflect the actual level of the company",
            "Very few incoming leads from the website",
            "Content that is difficult to maintain internally",
          ],
          rightTitle: "What the project should really deliver",
          rightIcon: FiCheck,
          rightItems: [
            "Clearer positioning and offer presentation",
            "A cleaner, faster, easier site to maintain",
            "A more direct contact and quote journey",
            "A solid base for better online visibility",
          ],
        },
        {
          kind: "pricing",
          sectionClassName: "bg-gray-50 py-16",
          title: "Project formats",
          body:
            "Flexible formats to scope a website around the real need, content, design depth, functional scope and available budget.",
          items: [
            {
              title: "Essential",
              price: "Simple project",
              points: ["4 to 6 page showcase site", "Responsive design", "Contact form", "Clean SEO basics", "Launch and handover"],
              cta: "Discuss this format",
            },
            {
              title: "Business",
              price: "Scalable project",
              points: ["Full corporate website", "Structured service pages", "CMS or editing area", "Analytics tracking", "Launch support"],
              cta: "Discuss this format",
            },
            {
              title: "Custom",
              price: "Custom project",
              points: ["More premium direction", "Sharper conversion flow", "Connections to your tools", "Custom business features", "Priority launch support"],
              cta: "Discuss this format",
            },
          ],
        },
        {
          kind: "feature-cards",
          sectionClassName: "bg-white py-16",
          items: [
            {
              icon: FiMonitor,
              title: "Presentation and trust",
              body: "A cleaner structure, clearer content, and a more solid image for clients, partners, or recruitment.",
            },
            {
              icon: FiCompass,
              title: "More direct journey",
              body: "Users understand what you do, who you serve, and how to reach you without friction.",
            },
            {
              icon: FiCheck,
              title: "Durable base",
              body: "The website stays evolutive and can support future tools, campaigns, or automations later on.",
            },
          ],
          timelineTitle: "Working method",
          timelineBody: "A short, clear framework without unnecessary overproduction.",
          timeline: [
            { step: "01", title: "Scoping", description: "Goals, structure, useful pages, and business priorities." },
            { step: "02", title: "Direction", description: "Visual direction, rhythm, content, and expected experience." },
            { step: "03", title: "Production", description: "Integration, development, optimisation, and useful connectors." },
            { step: "04", title: "Launch", description: "Validation, domain, SEO basics, and final adjustments." },
            { step: "05", title: "Follow-up", description: "Fixes, evolutions, and support when needed." },
          ],
        },
      ],
      cta: {
        className: "bg-blue-600 py-16 text-white",
        title: "Need a cleaner website for your company?",
        body:
          "We can scope a strong showcase or corporate website, with the right level of finish for your market, pace, and budget.",
        label: "Request a free quote",
      },
    },
    applications: {
      heroClassName: "bg-gradient-to-r from-slate-900 to-blue-700 py-20 text-white",
      eyebrow: "Web applications, business tools, and mobile experiences",
      title: "Useful applications, not overbuilt machinery",
      body:
        "KAH Digital builds web and mobile applications for companies that need to organise, automate, or simplify part of their activity, with a production logic that stays clear and usable.",
      primaryHref: "/devis",
      primaryLabel: "Request a quote",
      secondaryHref: "/contact",
      secondaryLabel: "Discuss the need",
      sections: [
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "Common use cases",
          body:
            "Projects often requested by SMBs, growing teams, or structures that need information to move more smoothly.",
          items: [
            "Client portals and extranets",
            "Dashboards and reporting",
            "Internal tools for field or back-office teams",
            "Booking, planning, or follow-up applications",
            "Light CRM, back-office, and member areas",
            "Administrative or commercial automation",
          ],
        },
        {
          kind: "benefit-cards",
          sectionClassName: "bg-gray-50 py-16",
          title: "What should change concretely",
          body: "A better internal workflow, not just another pretty screen.",
          icon: FiCheck,
          items: [
            "Less manual entry and duplicate processing",
            "Better centralised and more readable data",
            "Tools adapted to your real operations",
            "Time saved on repetitive tasks",
            "Better information flow",
            "A base that can evolve into future modules",
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-white py-16",
          title: "What is included in the approach",
          body: "From scoping to launch, with the right level of complexity.",
          items: [
            { icon: FiCode, title: "Custom development", body: "An application shaped around your need, not a fragile stack of generic blocks." },
            { icon: FiDatabase, title: "Clean data architecture", body: "Storage, logic, and rights designed around your usage and growth." },
            { icon: FiSmartphone, title: "Web, mobile, or hybrid", body: "The right format according to users, constraints, and budget." },
            { icon: FiCheck, title: "Scoping and support", body: "We help define the scope, prioritise well, and launch without noise." },
          ],
        },
        {
          kind: "pricing",
          sectionClassName: "bg-gray-50 py-16",
          title: "Scoping formats",
          body:
            "Each application is estimated after scoping according to scope, users, integrations, timeline and business priorities.",
          items: [
            { title: "Business application", price: "Targeted operational need", description: "To replace manual processes, structure an activity, or centralise operations." },
            { title: "Portal or client area", price: "Scalable client experience", description: "To give access to documents, statuses, requests, or follow-up features." },
            { title: "More complete application", price: "Custom business product", description: "For a richer product with accounts, data, workflows, and multiple integrations." },
          ],
        },
      ],
      cta: {
        className: "bg-blue-700 py-16 text-white",
        title: "Need a tool that fits the way you work?",
        body: "We can scope a clear, evolutive, useful application for your teams or your clients.",
        label: "Request a tailored quote",
      },
    },
    glpi: {
      heroClassName: "bg-gradient-to-r from-emerald-600 to-teal-600 py-20 text-white",
      eyebrow: "Support journey, virtual help, and GLPI tickets",
      title: "A simpler support layer around GLPI",
      body:
        "KAH Digital does not replace your GLPI team and does not pretend to be full GLPI management. We build a smoother support journey around your existing setup, with first-level virtual help and ticket creation when real support needs to take over.",
      heroNote: "KAH Digital proprietary solution, adapted to your support organisation",
      primaryHref: "/devis",
      primaryLabel: "Request a quote",
      secondaryHref: "/services/glpi#services",
      secondaryLabel: "View services",
      sections: [
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "How we position this offer",
          body:
            "A useful complement to your support, without replacing your tool or your existing organisation.",
          withCheck: true,
          items: [
            "A support and assistance layer before GLPI",
            "A simpler entry point for users who need help",
            "A discreet virtual helper for simple issues and guidance",
            "Ticket creation when human support must take over",
            "An approach adapted to your existing support organisation",
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-gray-50 py-16",
          title: "What it brings in practice",
          body: "A clearer support flow for users and a cleaner handoff for the team.",
          items: [
            { icon: FiClock, title: "Less friction", body: "Users get useful first-level help before opening a ticket." },
            { icon: FiUsers, title: "Better framed requests", body: "Support receives more context and cleaner handoff to the right channel." },
            { icon: FiShield, title: "Discreet positioning", body: "The solution can stay framed as virtual help and a stronger support journey." },
            { icon: FiTrendingUp, title: "Cleaner escalation", body: "When help is not enough, the handoff to ticket becomes smoother and more usable." },
          ],
        },
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "Common use cases",
          body: "Situations where upstream help really improves the support experience.",
          itemIcon: FiTool,
          items: [
            "User help before ticket creation",
            "Cleaner qualification of internal requests",
            "Reduction of repetitive or incomplete tickets",
            "Simpler support entry point for SMBs",
            "Smooth handoff to GLPI when human support must take over",
            "A clearer support path for teams that need to save time",
          ],
        },
        {
          kind: "pricing",
          id: "services",
          sectionClassName: "bg-gray-50 py-16",
          title: "Services around GLPI",
          body: "From scoping to ticket handoff, without overselling the promise.",
          columns: 4,
          items: [
            { title: "Support journey scoping", price: "Support diagnosis", description: "Analysis of frequent requests, blocking points, and handoff moments to human support." },
            { title: "First-level virtual help", price: "Adapted virtual help", description: "A useful assistance entry point connected to your content, procedures, or frequent questions." },
            { title: "GLPI ticket handoff", price: "Scoped connection", description: "Clean transition from guided support to ticket creation when the support team must take over." },
            { title: "Follow-up and tuning", price: "Adjustable follow-up", description: "Evolution of the journey, responses, and handoff points based on field feedback." },
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-white py-16",
          title: "What we do, and what we do not do",
          items: [
            { icon: FiUsers, title: "We structure the journey", body: "We work on entry, user help, request orientation, and clean handoff to ticketing." },
            { icon: FiClock, title: "We integrate cleanly", body: "We adapt the logic to your support workflow without breaking existing habits." },
            { icon: FiShield, title: "We do not replace your GLPI team", body: "GLPI operations stay with you or your current provider. We work as a complement." },
          ],
        },
      ],
      cta: {
        className: "bg-emerald-600 py-16 text-white",
        title: "Need a smoother support layer around GLPI?",
        body: "We can scope a useful, discreet, cleaner journey for both your users and your support team.",
        label: "Request a quote",
      },
    },
  },
  de: {
    "site-web": {
      heroClassName: "bg-gradient-to-r from-blue-600 to-sky-500 py-20 text-white",
      eyebrow: "Corporate Websites und Präsentationsplattformen",
      title: "Klare, glaubwürdige und nützliche Websites für Unternehmen",
      body:
        "KAH Digital entwickelt Websites für frankophone, englischsprachige und internationale Unternehmen. Ziel ist nicht nur online zu sein, sondern das Unternehmen klarer zu präsentieren und den Kontakt zu vereinfachen.",
      primaryHref: "/devis",
      primaryLabel: "Projekt anfragen",
      secondaryHref: "/projets/kah-prod",
      secondaryLabel: "Referenz ansehen",
      sections: [
        {
          kind: "split-list",
          leftTitle: "Wann eine neue Website wirklich nützlich wird",
          leftIcon: FiTrendingUp,
          leftItems: [
            "Keine Website, veraltete Website oder schwacher erster Eindruck",
            "Markenbild passt nicht zum echten Niveau des Unternehmens",
            "Kaum qualifizierte Anfragen über die Website",
            "Inhalte sind intern schwer pflegbar",
          ],
          rightTitle: "Was das Projekt liefern soll",
          rightIcon: FiCheck,
          rightItems: [
            "Klarere Positionierung und Angebotsdarstellung",
            "Saubere, schnelle und leichter wartbare Website",
            "Direkterer Kontakt- und Angebotsweg",
            "Solide Basis für bessere Online-Sichtbarkeit",
          ],
        },
        {
          kind: "pricing",
          sectionClassName: "bg-gray-50 py-16",
          title: "Projektformate",
          body:
            "Flexible Formate, um eine Website nach echtem Bedarf, Inhalt, Design-Tiefe, Funktionsumfang und verfügbarem Budget zu planen.",
          items: [
            {
              title: "Essential",
              price: "Einfaches Projekt",
              points: ["4 bis 6 Seiten", "Responsives Design", "Kontaktformular", "Saubere SEO-Basis", "Launch und Übergabe"],
              cta: "Dieses Format anfragen",
            },
            {
              title: "Business",
              price: "Erweiterbares Projekt",
              points: ["Corporate Website", "Strukturierte Leistungsseiten", "CMS oder Bearbeitungsbereich", "Analytics", "Launch-Begleitung"],
              cta: "Dieses Format anfragen",
            },
            {
              title: "Custom",
              price: "Individuelles Projekt",
              points: ["Stärkere Premium-Richtung", "Schärferer Conversion-Flow", "Anbindung an eure Tools", "Individuelle Funktionen", "Priorisierter Launch"],
              cta: "Dieses Format anfragen",
            },
          ],
        },
        {
          kind: "feature-cards",
          sectionClassName: "bg-white py-16",
          items: [
            { icon: FiMonitor, title: "Präsentation und Vertrauen", body: "Klarere Struktur, bessere Inhalte und ein solideres Bild für Kunden, Partner oder Recruiting." },
            { icon: FiCompass, title: "Direkterer Weg", body: "Nutzer verstehen schneller, was ihr macht, für wen es ist und wie sie euch erreichen." },
            { icon: FiCheck, title: "Dauerhafte Basis", body: "Die Website bleibt erweiterbar und kann später Tools, Kampagnen oder Automationen aufnehmen." },
          ],
          timelineTitle: "Arbeitsweise",
          timelineBody: "Kurzer, klarer Rahmen ohne unnötige Überproduktion.",
          timeline: [
            { step: "01", title: "Scoping", description: "Ziele, Struktur, sinnvolle Seiten und Prioritäten." },
            { step: "02", title: "Direction", description: "Visuelle Richtung, Rhythmus, Inhalte und Erlebnis." },
            { step: "03", title: "Build", description: "Integration, Entwicklung, Optimierung und nützliche Schnittstellen." },
            { step: "04", title: "Launch", description: "Freigabe, Domain, SEO-Basis und letzte Anpassungen." },
            { step: "05", title: "Follow-up", description: "Korrekturen, Weiterentwicklungen und Support." },
          ],
        },
      ],
      cta: {
        className: "bg-blue-600 py-16 text-white",
        title: "Braucht ihr eine klarere Website für euer Unternehmen?",
        body: "Wir können eine starke Unternehmenswebsite mit dem passenden Finish für Markt, Tempo und Budget strukturieren.",
        label: "Kostenlose Offerte anfragen",
      },
    },
    applications: {
      heroClassName: "bg-gradient-to-r from-slate-900 to-blue-700 py-20 text-white",
      eyebrow: "Web-Apps, Business-Tools und mobile Produkte",
      title: "Nützliche Anwendungen statt überladener Systeme",
      body:
        "KAH Digital entwickelt Web- und Mobile-Anwendungen für Unternehmen, die einen Teil ihrer Aktivität strukturieren, automatisieren oder vereinfachen wollen - mit einer Logik, die klar, sauber und nutzbar bleibt.",
      primaryHref: "/devis",
      primaryLabel: "Projekt anfragen",
      secondaryHref: "/contact",
      secondaryLabel: "Bedarf besprechen",
      sections: [
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "Typische Einsatzfelder",
          body: "Typische Projekte für KMU, wachsende Teams und Unternehmen, die Informationen sauberer bewegen wollen.",
          items: [
            "Kundenportale und Extranets",
            "Dashboards und Reporting",
            "Interne Tools für Teams im Feld oder im Backoffice",
            "Buchungs-, Planungs- oder Follow-up-Anwendungen",
            "Leichte CRMs, Backoffices und Member Areas",
            "Administrative oder kommerzielle Automationen",
          ],
        },
        {
          kind: "benefit-cards",
          sectionClassName: "bg-gray-50 py-16",
          title: "Was sich konkret verbessern soll",
          body: "Nicht nur ein schöner Screen, sondern ein besserer Ablauf im Alltag.",
          icon: FiCheck,
          items: [
            "Weniger manuelle Eingaben und doppelte Prozesse",
            "Besser zentralisierte und leichter lesbare Daten",
            "Tools, die zu den realen Abläufen passen",
            "Zeitgewinn bei repetitiven Aufgaben",
            "Besserer Informationsfluss im Alltag",
            "Eine Basis, die später modular erweitert werden kann",
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-white py-16",
          title: "Was im Ansatz enthalten ist",
          body: "Von der ersten Struktur bis zum produktiven Launch.",
          items: [
            { icon: FiCode, title: "Maßgeschneiderte Entwicklung", body: "Eine Anwendung rund um den echten Bedarf, nicht ein fragiler Stapel generischer Bausteine." },
            { icon: FiDatabase, title: "Saubere Datenarchitektur", body: "Speicherung, Rechte und Logik passend zu Nutzung, Rollen und Wachstum." },
            { icon: FiSmartphone, title: "Web, mobil oder hybrid", body: "Das passende Format nach Nutzern, Rahmenbedingungen und Budget." },
            { icon: FiCheck, title: "Scoping und Begleitung", body: "Wir helfen beim richtigen Umfang, bei Prioritäten und beim sauberen Projektstart." },
          ],
        },
        {
          kind: "pricing",
          sectionClassName: "bg-gray-50 py-16",
          title: "Scoping-Formate",
          body: "Jede Anwendung wird nach Scoping eingeschätzt - abhängig von Umfang, Nutzern, Integrationen, Zeitplan und geschäftlichen Prioritäten.",
          items: [
            { title: "Business-Anwendung", price: "Gezielter operativer Bedarf", description: "Um manuelle Prozesse zu ersetzen, eine Aktivität zu strukturieren oder Operationen zu zentralisieren." },
            { title: "Portal oder Kundenbereich", price: "Erweiterbare Kundenerfahrung", description: "Für Dokumente, Status, Anfragen oder Follow-up-Funktionen." },
            { title: "Umfassendere Anwendung", price: "Individuelles Business-Produkt", description: "Für ein stärkeres Produkt mit Accounts, Daten, Workflows und mehreren Integrationen." },
          ],
        },
      ],
      cta: {
        className: "bg-blue-700 py-16 text-white",
        title: "Braucht ihr ein Tool, das zu eurer Arbeitsweise passt?",
        body: "Wir können eine klare, evolutive und wirklich nützliche Anwendung für euer Team oder eure Kunden strukturieren.",
        label: "Individuelle Offerte anfragen",
      },
    },
    glpi: {
      heroClassName: "bg-gradient-to-r from-emerald-600 to-teal-600 py-20 text-white",
      eyebrow: "Support-Journey, virtuelle Hilfe und GLPI-Tickets",
      title: "Eine einfachere Support-Schicht rund um GLPI",
      body:
        "KAH Digital ersetzt weder euer GLPI-Team noch verkauft es eine komplette GLPI-Betreuung. Wir entwickeln einen klareren Support-Ablauf rund um euer bestehendes Setup - mit virtueller Ersthilfe und Ticket-Erstellung, wenn echter Support übernehmen muss.",
      heroNote: "Proprietäre KAH Digital Lösung, abgestimmt auf eure Support-Organisation",
      primaryHref: "/devis",
      primaryLabel: "Projekt anfragen",
      secondaryHref: "/services/glpi#services",
      secondaryLabel: "Services ansehen",
      sections: [
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "Wie diese Leistung zu verstehen ist",
          body: "Eine nützliche Erweiterung für euren Support - ohne euer Tool oder eure Organisation zu ersetzen.",
          withCheck: true,
          items: [
            "Eine Support- und Hilfsschicht vor GLPI",
            "Ein einfacherer Einstieg für Nutzer mit Support-Bedarf",
            "Eine diskrete virtuelle Hilfe für einfache Probleme und Orientierung",
            "Ticket-Erstellung, wenn menschlicher Support übernehmen muss",
            "Angepasst an eure bestehende Support-Organisation",
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-gray-50 py-16",
          title: "Was das im Alltag bringt",
          body: "Ein klarerer Ablauf für Nutzer und eine saubere Übergabe für den Support.",
          items: [
            { icon: FiClock, title: "Weniger Reibung", body: "Nutzer erhalten eine erste Hilfe, bevor sofort ein Ticket entsteht." },
            { icon: FiUsers, title: "Besser gerahmte Anfragen", body: "Der Support erhält mehr Kontext und eine sauberere Übergabe." },
            { icon: FiShield, title: "Diskrete Positionierung", body: "Die Lösung lässt sich als virtuelle Hilfe und klarerer Support-Weg einführen." },
            { icon: FiTrendingUp, title: "Saubere Eskalation", body: "Wenn die Ersthilfe nicht reicht, geht die Anfrage sauber in euer Ticket-Setup über." },
          ],
        },
        {
          kind: "simple-cards",
          sectionClassName: "bg-white py-16",
          title: "Typische Einsatzfälle",
          body: "Situationen, in denen eine Hilfe vor dem Ticket den Support spürbar verbessert.",
          itemIcon: FiTool,
          items: [
            "Unterstützung vor der Ticket-Erstellung",
            "Sauberere Qualifizierung interner Anfragen",
            "Weniger wiederholte oder unvollständige Tickets",
            "Einfacherer Support-Einstieg für KMU",
            "Saubere Übergabe an GLPI, wenn das Team übernehmen muss",
            "Klarerer Support-Pfad für Teams, die Zeit sparen wollen",
          ],
        },
        {
          kind: "pricing",
          id: "services",
          sectionClassName: "bg-gray-50 py-16",
          title: "Services rund um GLPI",
          body: "Von Scoping bis Ticket-Übergabe, ohne die Leistung zu überverkaufen.",
          columns: 4,
          items: [
            { title: "Support-Journey Scoping", price: "Support-Diagnose", description: "Analyse häufiger Anfragen, Blocker und der Punkte, an denen menschlicher Support übernehmen soll." },
            { title: "Virtuelle Ersthilfe", price: "Angepasste virtuelle Hilfe", description: "Ein nützlicher Hilfepunkt, verbunden mit euren Inhalten, Prozessen oder häufigen Fragen." },
            { title: "GLPI Ticket-Übergabe", price: "Eingegrenzte Verbindung", description: "Sauberer Übergang von geführter Hilfe zur Ticket-Erstellung, wenn das Support-Team übernehmen muss." },
            { title: "Follow-up und Feintuning", price: "Anpassbare Begleitung", description: "Weiterentwicklung von Antworten, Journey und Übergabepunkten basierend auf echtem Feedback." },
          ],
        },
        {
          kind: "icon-grid",
          sectionClassName: "bg-white py-16",
          title: "Was wir tun, und was wir nicht tun",
          items: [
            { icon: FiUsers, title: "Wir strukturieren die Journey", body: "Wir arbeiten an Einstieg, Nutzerhilfe, Anfragenlenkung und sauberer Ticket-Übergabe." },
            { icon: FiClock, title: "Wir integrieren sauber", body: "Wir passen die Logik an euren Support-Ablauf an, ohne bestehende Gewohnheiten zu brechen." },
            { icon: FiShield, title: "Wir ersetzen euer GLPI-Team nicht", body: "Der GLPI-Betrieb bleibt bei euch oder eurem bestehenden Partner. Wir arbeiten als Ergänzung." },
          ],
        },
      ],
      cta: {
        className: "bg-emerald-600 py-16 text-white",
        title: "Braucht ihr einen flüssigeren Support rund um GLPI?",
        body: "Wir können eine nützliche, diskrete und sauberere Journey für Nutzer und Support-Team strukturieren.",
        label: "Offerte anfragen",
      },
    },
  },
} as const;

export function ServiceDetailPageContent({ locale, page }: Props) {
  const pageContent = content[locale][page];

  return (
    <>
      <section className={pageContent.heroClassName}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/70">{pageContent.eyebrow}</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{pageContent.title}</h1>
          <p className="mb-8 max-w-3xl text-xl text-white/90">{pageContent.body}</p>
          {"heroNote" in pageContent && pageContent.heroNote ? (
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">{pageContent.heroNote}</p>
          ) : null}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href={withLocalePrefix(pageContent.primaryHref, locale)}
              className="rounded-full bg-white px-8 py-3 font-semibold text-slate-900 transition-colors hover:bg-gray-100"
            >
              {pageContent.primaryLabel}
            </Link>
            <Link
              href={withLocalePrefix(pageContent.secondaryHref, locale)}
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-slate-900"
            >
              {pageContent.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      {pageContent.sections.map((section) => {
        if (section.kind === "split-list") {
          const LeftIcon = section.leftIcon;
          const RightIcon = section.rightIcon;
          return (
            <section key={section.leftTitle} className="bg-white py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                  <div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-900">{section.leftTitle}</h2>
                    <ul className="space-y-4">
                      {section.leftItems.map((item) => (
                        <li key={item} className="flex items-start">
                          <LeftIcon className="mr-3 mt-1 text-red-500" size={20} />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-900">{section.rightTitle}</h2>
                    <ul className="space-y-4">
                      {section.rightItems.map((item) => (
                        <li key={item} className="flex items-start">
                          <RightIcon className="mr-3 mt-1 text-green-500" size={20} />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (section.kind === "simple-cards") {
          const ItemIcon = "itemIcon" in section ? section.itemIcon : undefined;
          return (
            <section key={section.title} className={section.sectionClassName}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-3xl font-bold text-gray-900">{section.title}</h2>
                  <p className="mx-auto max-w-3xl text-xl text-gray-600">{section.body}</p>
                </div>
                <div className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${section.items.length > 4 ? "lg:grid-cols-3" : ""}`}>
                  {section.items.map((item) => (
                    <div key={item} className="rounded-2xl bg-gray-50 p-6">
                      <div className={"withCheck" in section && section.withCheck ? "flex items-start" : ""}>
                        {"withCheck" in section && section.withCheck ? <FiCheck className="mr-3 mt-1 shrink-0 text-emerald-500" size={20} /> : null}
                        <div>
                          {ItemIcon ? <ItemIcon className="mb-3 text-emerald-600" size={24} /> : null}
                          <p className="font-medium text-gray-800">{item}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (section.kind === "benefit-cards") {
          const Icon = section.icon;
          return (
            <section key={section.title} className={section.sectionClassName}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-3xl font-bold text-gray-900">{section.title}</h2>
                  <p className="text-xl text-gray-600">{section.body}</p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <div key={item} className="rounded-2xl bg-white p-6 shadow-md">
                      <Icon className="mb-4 text-green-500" size={32} />
                      <p className="font-medium text-gray-800">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (section.kind === "icon-grid") {
          const gridClassName = section.items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-4";
          const timelineTitle = "timelineTitle" in section ? String(section.timelineTitle) : "";
          const timelineBody = "timelineBody" in section ? String(section.timelineBody) : "";
          const timeline = "timeline" in section && Array.isArray(section.timeline) ? section.timeline : [];
          return (
            <section key={section.title} className={section.sectionClassName}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {section.title ? (
                  <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">{section.title}</h2>
                    {"body" in section && section.body ? <p className="text-xl text-gray-600">{section.body}</p> : null}
                  </div>
                ) : null}
                <div className={`grid grid-cols-1 gap-8 ${gridClassName} ${"timeline" in section && section.timeline ? "mb-14" : ""}`}>
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-2xl bg-gray-50 p-8 text-center">
                        <Icon className="mx-auto mb-4 text-blue-700" size={48} />
                        <h3 className="mb-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.body}</p>
                      </div>
                    );
                  })}
                </div>
                {timeline.length > 0 ? (
                  <>
                    <div className="mb-12 mt-16 text-center">
                      <h2 className="mb-4 text-3xl font-bold text-gray-900">{timelineTitle}</h2>
                      <p className="text-xl text-gray-600">{timelineBody}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                      {timeline.map((item) => (
                        <div key={item.step} className="text-center">
                          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                            {item.step}
                          </div>
                          <h3 className="mb-2 text-lg font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </section>
          );
        }

        if (section.kind === "pricing") {
          const pricingSection = section as unknown as {
            title: string;
            body: string;
            sectionClassName: string;
            id?: string;
            columns?: number;
            items: Array<
              | { title: string; price: string; description: string }
              | { title: string; price: string; points: string[]; cta: string }
            >;
          };
          return (
            <section key={pricingSection.title} id={pricingSection.id} className={pricingSection.sectionClassName}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                  <h2 className="mb-4 text-3xl font-bold text-gray-900">{pricingSection.title}</h2>
                  <p className="mx-auto max-w-3xl text-xl text-gray-600">{pricingSection.body}</p>
                </div>
                <div className={`grid grid-cols-1 gap-8 ${pricingSection.columns === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
                  {pricingSection.items.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-shadow hover:shadow-lg">
                      <h3 className="mb-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                      <p className="mb-4 text-lg font-semibold text-blue-700">{item.price}</p>
                      {"points" in item ? (
                        <ul className="mb-8 space-y-3">
                          {item.points.map((point) => (
                            <li key={point} className="flex items-center text-gray-700">
                              <FiCheck className="mr-3 text-green-500" size={16} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">{item.description}</p>
                      )}
                      {"cta" in item ? (
                        <Link
                          href={withLocalePrefix(pageContent.primaryHref, locale)}
                          className="block rounded-full bg-blue-600 px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                          {item.cta}
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}

      <section className={pageContent.cta.className}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">{pageContent.cta.title}</h2>
          <p className="mb-8 text-xl text-white/90">{pageContent.cta.body}</p>
          <Link
            href={withLocalePrefix(pageContent.primaryHref, locale)}
            className="rounded-full bg-white px-8 py-3 font-semibold text-blue-700 transition-colors hover:bg-gray-100"
          >
            {pageContent.cta.label}
          </Link>
        </div>
      </section>
    </>
  );
}

