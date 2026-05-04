# Profil de collaboration IA — KAH-Digital

> Fichier de mémoire agent. À lire avant chaque intervention. À mettre à jour quand une nouvelle préférence durable apparaît.

---

## Langue préférée

Français uniquement. Réponses courtes, concrètes, sans introduction inutile.

---

## Style de réponse préféré

- Direct, pragmatique, zéro blabla.
- Une phrase par étape, pas de paragraphes explicatifs.
- Code complet : prêt à copier-coller ou à exécuter.
- Rapport final court : ce qui a été fait · comment lancer · ce qui reste.

---

## Objectifs principaux

Créer des projets digitaux rentables, automatisés et orientés cash.
Priorité : prospects → conversion → paiement → fidélisation → automatisation.

---

## Façon de travailler

L'utilisateur veut pouvoir **lancer une tâche et s'absenter**. Il revient quand c'est terminé.

L'agent doit :
1. Analyser avant d'agir.
2. Décider si une idée est bonne ou non, sans demander.
3. Exécuter toutes les commandes bash directement — sans demander d'autorisation.
4. Enchaîner sans interruption : analyser → modifier → tester → corriger → déployer → rapport.
5. Si un choix technique se pose, prendre la décision la plus raisonnable et la documenter dans le rapport.
6. Améliorer sans jamais casser l'existant.
7. Fournir un rapport final clair : ce qui a été fait, comment lancer, ce qui reste.

**Jamais écrire :** "Dois-je...", "Veux-tu que...", "Puis-je...", "Est-ce que je peux..."
**Seule exception :** action irréversible et destructrice (rm -rf, drop table, force push avec perte). Dans ce cas uniquement, marquer clairement pourquoi on s'arrête.

---

## Règles absolues

- Ne rien casser. Préserver l'existant.
- Faire un checkpoint git avant les grosses modifications.
- Tester (TypeScript, build, lint) avant de livrer.
- Ne jamais exposer de secrets, clés API, mots de passe.
- Ne pas créer de fausses intégrations ni de faux témoignages.
- Ne pas surcharger le code : MVP simple, pas de sur-ingénierie.

---

## Méthode de travail (ordre obligatoire)

1. Inspecter le projet
2. Comprendre la stack
3. Vérifier l'existant
4. Faire un checkpoint git si possible
5. Modifier proprement
6. Tester (`npx tsc --noEmit`, `npm run lint`, build)
7. Corriger les erreurs
8. Déployer (`vercel --prod`)
9. Rapport final

---

## Commandes autorisées sans confirmation

```
git status / diff / add / commit / log
npm / pnpm / yarn install / run build / run lint / run test
npx tsc --noEmit
vercel / vercel --prod
ls / find / grep / cat / mkdir / cp / mv / sed / head / tail
```

## Commandes dangereuses — prudence maximale

```
rm -rf · git reset --hard · git clean · git push --force
DROP TABLE / migrations destructives / suppression massive
```

---

## Préférences techniques

- Stack : **Next.js App Router** (route groups fr/en/de/admin) + **Tailwind CSS 4** + **Supabase** + **Vercel**
- Emails : Resend
- Paiements : Stripe
- Analytics : Google Analytics (gtag via `src/lib/analytics.ts`)
- Assistant IA : OpenAI (via `src/lib/assistant/`)
- Déploiement : `vercel --prod` → kah-digital.ch
- TypeScript strict : toujours vérifier avec `npx tsc --noEmit` avant de committer
- Pas de commentaires inutiles dans le code
- Pas de `any`, pas de `@ts-ignore` sauf nécessité documentée
- CSS : Tailwind uniquement, pas de styles inline sauf exceptions

---

## Préférences business

Priorité systématique à :
- Conversion (CTA clairs, formulaires rapides, sticky mobile CTA)
- SEO (métadonnées, JSON-LD, pages villes, sitemap, IndexNow)
- Prospects (audit gratuit, devis express, assistant IA)
- Paiements (acompte Stripe, offres packagées)
- Tracking (Google Analytics, `trackEvent` sur tous les formulaires clés)
- Crédibilité (témoignages réels, portfolio, tarifs transparents)
- Mobile first (sticky CTAs, forms optimisés, performance)

---

## Projet KAH-Digital — Stack complète

```
kah-digital-site/
├── src/app/(fr)/          Pages FR (route group)
├── src/app/(en)/          Pages EN
├── src/app/(de)/          Pages DE
├── src/app/(admin)/       Admin (login protégé)
├── src/app/api/           Routes API Next.js
├── src/components/        Composants partagés
├── src/lib/               Logique métier (assistant, analytics, agents)
├── src/data/              Données statiques (portfolio, services)
├── src/config/            Config brand, contact, prix
└── public/                Assets statiques
```

**Domaine prod :** kah-digital.ch  
**Hébergeur :** Vercel  
**DB :** Supabase (PostgreSQL)

---

## Services vendus sur KAH-Digital

| Service | Prix indicatif |
|---|---|
| Landing / Portfolio | € 300 – 600 |
| Site vitrine | € 900 – 1 500 |
| Site corporate | € 2 200 – 4 500 |
| Application web/IA | € 4 000 – 12 000 |
| Application mobile | € 5 000 – 15 000 |
| Refonte site | € 1 200 – 4 500 |
| Automatisation IA | € 800 – 6 000 |
| Support GLPI | Abonnement mensuel |
| Maintenance | Abonnement mensuel |
| Audit gratuit | Gratuit (lead gen) |
| Devis express | Gratuit (lead gen) |

---

## Décisions importantes prises

### 2026-04 — Corrections umlauts allemands
- 24+ fichiers corrigés : ASCII (ue/oe/ae/ss) → Unicode (ü/ö/ä/ß)
- Impacte toutes les pages DE, composants partagés, données

### 2026-04 — Dropdowns formulaires devis
- `bg-white/10` causait fond blanc illisible sur certains navigateurs
- Fix : `bg-gray-900 [color-scheme:dark]` sur tous les `<select>` (quote-form.tsx, mvp-quote-form.tsx)

### 2026-04 — Barre de progression assistant IA
- Était bloquée à 100% (getRequiredFields retourne [] pour intents génériques)
- Fix : qualScore useMemo frontend — tracking 6 champs réels collectés dans la session

### 2026-04 — Tracking analytics
- analytics-tracker.tsx : ajout `/audit-gratuit`, `/contact`, pattern regex pour pages villes
- audit-gratuit/page.tsx : trackEvent("generate_lead") au submit réussi
- /merci/page.tsx : composant TrackConversion → trackEvent("conversion")

### 2026-04 — CTAs pages villes
- Bouton "Audit gratuit" ajouté dans section finale des pages villes
- Sticky mobile CTA (Devis + Appeler) sur toutes les pages LocalSeoPageContent

### 2026-04 — Pages villes SEO
- 15 pages FR créées : agence-web-{paris,lyon,marseille,bordeaux,nantes,strasbourg,toulouse,nice,lille,montpellier,rennes,zurich,berne,basel,lugano}
- 3 pages CH FR : site-web-{lausanne,geneve,fribourg}

---

## À éviter systématiquement

- Questions inutiles à l'utilisateur
- Explications trop longues sans valeur ajoutée
- Modifications risquées sans checkpoint
- Suppression de fonctionnalités existantes
- `bg-white/10` sur les `<select>` (rend le fond blanc)
- Laisser des événements analytics sans `trackEvent`
- Committer du code non testé

---

## À faire systématiquement

- Lire ce fichier au démarrage de chaque session KAH-Digital
- Mettre à jour ce fichier quand une décision ou préférence durable apparaît
- Faire `npx tsc --noEmit` après chaque modification TypeScript
- Déployer en prod avec `vercel --prod` après validation
- Documenter les décisions importantes dans la section "Décisions"
