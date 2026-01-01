# Kah-Digital – Site vitrine

Site vitrine Next.js App Router + Tailwind pour présenter Kah-Digital.

## Stack
- Next.js 16 (App Router) + React 19
- Tailwind CSS 4 preview (tokens principaux dans `src/app/globals.css`)
- Formulaires de devis (`/devis`, `/configurateur`) branchés sur l’API `/api/quote`
- Génération PDF (jsPDF) pour le cahier des charges interactif

## Contenu
- Accueil : hero, services, portfolio, process, FAQ, CTA contact
- Cahier des charges : PDF pré-rempli (`/public/cahier-des-charges.pdf`) + version web exportable
- Devis rapide : formulaire en 1-2 minutes
- Pages légales : mentions + politique de confidentialité

## Lancer le projet
```bash
npm install
npm run dev
```
Puis ouvrir http://localhost:3000.

## Variables d’environnement
1. Copie `.env.example` en `.env.local`
2. Renseigne les clés :
```
RESEND_API_KEY=""
QUOTE_NOTIFICATION_EMAIL="kah-digital@hotmail.com"
GOOGLE_SHEET_WEBHOOK=""          # optionnel
ADMIN_BASIC_USER=""              # accès /admin
ADMIN_BASIC_PASSWORD=""
ADMIN_API_TOKEN=""               # protège GET /api/quote
SUPABASE_URL=""                  # optionnel, table `quotes`
SUPABASE_SERVICE_ROLE_KEY=""     # optionnel
NEXT_PUBLIC_CONTACT_EMAIL="kah-digital@hotmail.com"
NEXT_PUBLIC_CONTACT_PHONE="+33 6 00 00 00 00"
```

### Brancher Resend
1. Crée un compte (https://resend.com) et valide le domaine d’envoi
2. Génère une API Key (Production) → `RESEND_API_KEY`
3. Définit les destinataires (séparés par `,`) dans `QUOTE_NOTIFICATION_EMAIL`
4. Redémarre `npm run dev` : chaque formulaire `/devis` enverra un email depuis `notifications@kah-digital.io`

### Backup Google Sheets (optionnel)
1. Crée un Google Apps Script “web app” qui reçoit du JSON et l’ajoute à une Sheet
2. Déploie le script (accessible “Anyone with link”) et récupère l’URL → `GOOGLE_SHEET_WEBHOOK`
3. Chaque devis postera un JSON (utile si Resend tombe ou pour un reporting rapide)

Sans ces variables, l’API répond quand même OK (les notifications sont simplement loggées côté serveur).

## Tests
- `npm run lint`

## Déploiement Vercel
1. `npm install -g vercel` puis `vercel link`
2. Crée un projet Vercel pointant sur `kah-digital-site`
3. Dans **Environment Variables**, injecte toutes les variables ci-dessus
4. `vercel` pour un preview, `vercel --prod` pour la prod finale
5. Une fois déployé, teste `/devis` et vérifie les emails + Sheets

## Personnalisation
- Identité visuelle : `src/app/globals.css`
- Contenu de la home : `src/data/home.ts`
- PDF prêt à remplir : `public/cahier-des-charges.pdf`
- Cahier interactif : `src/components/interactive-brief.tsx`
- SEO/meta : `public/og-kah-digital.png`, `public/favicon.svg`, `src/app/layout.tsx`

