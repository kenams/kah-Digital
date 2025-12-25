# Kah-Digital — site vitrine

Site vitrine Next.js App Router + Tailwind pour Kah-Digital.

## Stack
- Next.js 16 (App Router) + React 19
- Tailwind CSS 4 preview (tokens dans `src/app/globals.css`)
- Formulaire Devis → API route `/api/quote`
- Génération PDF (jspdf) pour le cahier des charges interactif

## Contenu
- Accueil : hero, services, portfolio enrichi, process, FAQ, CTA
- Cahier des charges : PDF pré-rempli (`/public/cahier-des-charges.pdf`) + version web exportable en PDF
- Devis rapide : formulaire temps réel (1-2 min)
- Pages légales : mentions + politique de confidentialité

## Lancer le projet
```bash
npm install
npm run dev
```
Puis ouvrir http://localhost:3000.

## Variables d'environnement / notifications
1. Copie `.env.example` en `.env.local` (déjà ignoré par Git)
2. Renseigne :
```
RESEND_API_KEY=""
QUOTE_NOTIFICATION_EMAIL="hello@kah-digital.com"
GOOGLE_SHEET_WEBHOOK="" # optionnel
```

### Brancher Resend
1. Crée un compte (https://resend.com) et valide le domaine d’envoi
2. Génère une API Key (Production) → `RESEND_API_KEY`
3. Mets l’email de destination (ou plusieurs séparés par `,`) dans `QUOTE_NOTIFICATION_EMAIL`
4. Redémarre `npm run dev` → chaque formulaire /devis enverra un email depuis `notifications@kah-digital.io`

### Backup Google Sheets (optionnel)
1. Crée un Google Apps Script type “web app” qui reçoit du JSON et l’ajoute à une Sheet
2. Déploie le script (accessible à “Anyone with link”) et récupère l’URL → `GOOGLE_SHEET_WEBHOOK`
3. Chaque devis postera une ligne JSON (utile si Resend tombe ou pour reporting)

Sans ces variables, l’API répond quand même OK (les notifications sont simplement loggées côté serveur).

## Tests
- `npm run lint`

## Déploiement Vercel
1. `npm install -g vercel` (ou via UI) puis `vercel link`
2. Crée un projet Vercel pointant sur `kah-digital-site`
3. Dans **Environment Variables**, ajoute les variables ci-dessus (`.env.local` est ignoré en prod)
4. `vercel` pour un preview, `vercel --prod` pour la prod finale
5. Une fois déployé, teste `/devis` et vérifie les emails + Sheets

## Personnalisation
- Identité visuelle : `src/app/globals.css`
- Portfolio / services : `src/app/page.tsx`
- PDF prêt à remplir : `public/cahier-des-charges.pdf`
- Version interactive : `src/components/interactive-brief.tsx`
- Meta/visuels : `public/og-kah-digital.png`, `public/favicon.svg`, `src/app/layout.tsx` (SEO + données structurées)
