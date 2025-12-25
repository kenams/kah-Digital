# Déploiement Vercel — Kah-Digital

1. **Préparer l’environnement local**
   ```bash
   cd kah-digital-site
   npm install
   cp .env.example .env.local # renseigner les valeurs réelles
   ```

2. **Tester en local**
   ```bash
   npm run dev
   npm run lint
   npm run build
   ```

3. **Lier le projet Vercel**
   ```bash
   npx vercel login
   npm run preview        # premier déploiement (preview)
   ```
   - Accepte les valeurs par défaut et sélectionne `c:/Kah-Digital/kah-digital-site`
   - Vercel détectera la config grâce à `vercel.json`

4. **Configurer les variables d’environnement sur Vercel**
   ```bash
   vercel env add RESEND_API_KEY
   vercel env add QUOTE_NOTIFICATION_EMAIL
   vercel env add GOOGLE_SHEET_WEBHOOK
   ```
   ou via le dashboard (Project Settings → Environment Variables). Les clés `@resend_api_key` etc. dans `vercel.json` servent d’alias aux valeurs sauvegardées côté Vercel.

5. **Déploiement production**
   ```bash
   npm run deploy
   ```
   - Vercel build -> Next.js App Router
   - Vérifie `https://<project>.vercel.app/devis`

6. **Checklist post-prod**
   - Test formulaire `/devis` → email reçu ? Webhook Google Sheet ok ?
   - Vérifie SEO (OpenGraph) via https://www.opengraph.xyz/
   - Ajoute domaine custom (Project → Domains) si besoin

7. **Maintenance**
   - `npm run preview` pour chaque feature branch
   - Merge → Vercel déclenche un déploiement automatique
   - Supprimer les previews via `vercel rm <deployment>` si besoin
