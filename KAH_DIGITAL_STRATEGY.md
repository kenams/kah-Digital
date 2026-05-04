# KAH-Digital — Stratégie business & roadmap

> Document vivant. Mis à jour à chaque décision stratégique importante.

---

## Vision

Transformer kah-digital.ch en **machine à cash autonome** :
un site premium qui génère des prospects qualifiés, convertit en devis, encaisse en ligne et fidélise par abonnement — avec le minimum d'intervention manuelle possible.

---

## Tunnels de conversion actuels

```
1. SEO organique (pages villes + blog)
      ↓
   Page ville / landing / article
      ↓
   CTA → /devis ou /audit-gratuit
      ↓
   Formulaire → email + Supabase
      ↓
   /merci → trackEvent("conversion")
      ↓
   Suivi manuel → devis → acompte Stripe → livraison

2. Assistant IA (widget toutes pages)
      ↓
   Qualification lead (6 champs : nom, email, objectif, features, budget, résumé)
      ↓
   Transfert automatique vers /devis ou email
      ↓
   Même tunnel

3. Prospection automatique (admin/prospection)
      ↓
   120 emails/jour ciblés
      ↓
   Réponse → audit gratuit ou devis
```

---

## Priorités business par impact

### Priorité 1 — Génération de prospects
- [x] Pages villes SEO (15 FR + 3 CH)
- [x] Audit gratuit (/audit-gratuit)
- [x] Formulaire devis express (/devis)
- [x] Assistant IA widget (toutes pages)
- [x] Prospection automatique (120/jour)
- [ ] Blog SEO (3 articles créés, à développer)
- [ ] Campagnes Google Ads sur mots-clés villes

### Priorité 2 — Conversion
- [x] CTAs sticky mobile sur pages villes
- [x] Bouton "Audit gratuit" dans toutes les pages villes
- [x] Formulaire devis en 2 min (/devis/mvp)
- [x] Configurateur de prix (/configurateur)
- [x] Offres packagées (/offres)
- [ ] A/B test CTA "Devis gratuit" vs "Commencer mon projet"
- [ ] Exit intent popup avec offre audit gratuit
- [ ] Chat live sur mobile (alternative à l'assistant)

### Priorité 3 — Crédibilité & preuve sociale
- [x] Portfolio projets (/projets)
- [x] Témoignages sur pages villes
- [x] Tarifs transparents sur toutes les pages
- [ ] Cas clients détaillés (pages /projets/[slug] à enrichir)
- [ ] Page "À propos" avec photo et parcours
- [ ] Badges (Swiss made, RGPD compliant, etc.)

### Priorité 4 — Encaissement
- [x] Paiement d'acompte Stripe (/payer)
- [x] Devis PDF téléchargeable
- [x] Factures PDF (/factures/[id])
- [ ] Abonnements maintenance (Stripe recurring)
- [ ] Portail client (espace factures + suivi projet)

### Priorité 5 — SEO technique
- [x] Sitemap dynamique
- [x] JSON-LD LocalBusiness sur pages villes
- [x] IndexNow (soumission automatique)
- [x] Métadonnées Open Graph sur toutes les pages
- [x] Pages multilingues FR/EN/DE
- [ ] Core Web Vitals — audit Lighthouse
- [ ] Backlinks (articles invités, annuaires suisses/FR)

### Priorité 6 — Tracking & data
- [x] Google Analytics (gtag)
- [x] trackEvent sur formulaires clés (devis, audit, merci)
- [x] CTA click tracking sur pages de conversion
- [x] Page view tracking sur toutes les pages
- [ ] Google Search Console → surveiller positions villes
- [ ] Tableau de bord conversions (Supabase + dashboard admin)

---

## Pages clés à surveiller

| URL | Rôle | KPI cible |
|---|---|---|
| / | Accueil | Taux rebond < 60% |
| /devis | Formulaire devis | Taux completion > 30% |
| /audit-gratuit | Lead gen gratuit | Soumissions/semaine |
| /offres | Packages | Clics vers /devis |
| /configurateur | Estimation prix | Engagement > 2 min |
| /agence-web-* | SEO villes FR | Position Google < 10 |
| /site-web-* | SEO villes CH | Position Google < 10 |
| /merci | Confirmation | trackEvent("conversion") |

---

## Stack technique (décisions figées)

| Couche | Choix | Raison |
|---|---|---|
| Framework | Next.js App Router | SEO, performance, multilingue |
| CSS | Tailwind CSS 4 | Vitesse dev, cohérence |
| DB | Supabase PostgreSQL | Auth + données + realtime |
| Email | Resend | Délivrabilité, simple |
| Paiement | Stripe | Standard, fiable |
| Hosting | Vercel | CD automatique, edge |
| IA | OpenAI API | Assistant + agents |
| Analytics | Google Analytics 4 | Gratuit, universel |

---

## Roadmap prochaines sessions

### Court terme (< 2 semaines)
- [ ] Blog : 3+ articles SEO supplémentaires
- [ ] Pages villes EN/DE (traduire les 15 pages FR)
- [ ] Dashboard admin : vue des conversions en temps réel
- [ ] Abonnements Stripe (maintenance mensuelle)

### Moyen terme (1-2 mois)
- [ ] Portail client (login, factures, suivi projet)
- [ ] Notifications push (prospects chauds)
- [ ] A/B test landing pages villes
- [ ] Campagnes Google Ads (budget à définir)

### Long terme (3-6 mois)
- [ ] Marketplace de services packagés (achat direct sans devis)
- [ ] Programme de partenariat / affiliation
- [ ] SaaS interne : facturation + gestion projets
- [ ] Expansion géographique (Allemagne, Belgique, Canada FR)

---

## Métriques à suivre chaque semaine

- Nombre de devis soumis
- Nombre d'audits gratuits soumis
- Taux de conversion /devis
- Positions Google sur mots-clés villes
- CA encaissé (Stripe dashboard)
- Prospects prospection automatique (réponses reçues)
