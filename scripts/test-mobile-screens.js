/**
 * Test end-to-end screens Kotizy Mobile (via web app sur mobile viewport)
 * Simule un utilisateur mobile qui navigue dans l'app web
 */
const { chromium } = require('playwright');
const path = require('path');

const BASE = 'https://tontineapp-web.vercel.app';
const CREDS = { email: 'kenams42@gmail.com', password: 'Kotizy@2026!' };
const OUT = 'C:/Users/kenam/Application-Projet-K/mobile-screens/';

const { mkdirSync } = require('fs');
mkdirSync(OUT, { recursive: true });

async function run() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, // iPhone 14 Pro
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    deviceScaleFactor: 3,
  });
  const page = await ctx.newPage();
  const results = [];

  async function shot(name, ok = true) {
    const file = `${OUT}${name}.png`;
    await page.screenshot({ path: file, fullPage: false });
    results.push({ screen: name, ok, url: page.url() });
    console.log(`  ${ok ? '✅' : '❌'} ${name}`);
    return file;
  }

  async function check(name, fn) {
    try {
      await fn();
      await shot(name, true);
    } catch(e) {
      await shot(name + '-ERROR', false);
      console.log(`     Error: ${e.message.slice(0,80)}`);
    }
  }

  console.log('\n🔍 Test E2E Kotizy Mobile Web\n');

  // 1. Splash / Login
  await check('01-login', async () => {
    await page.goto(BASE + '/login', { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForSelector('input[type="email"]');
  });

  // 2. Login → Dashboard
  await check('02-dashboard', async () => {
    await page.fill('input[type="email"]', CREDS.email);
    await page.fill('input[type="password"]', CREDS.password);
    // Soumettre avec Entrée + attendre navigation
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }),
      page.keyboard.press('Enter'),
    ]);
    await page.waitForTimeout(1500);
  });

  // 3. Wallet
  await check('03-wallet', async () => {
    await page.goto(BASE + '/wallet', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 4. Wallet Deposit
  await check('04-wallet-deposit', async () => {
    await page.goto(BASE + '/wallet/deposit', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 5. Wallet Withdraw
  await check('05-wallet-withdraw', async () => {
    await page.goto(BASE + '/wallet/withdraw', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 6. Tontines list
  await check('06-tontines', async () => {
    await page.goto(BASE + '/tontines', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 7. Create tontine
  await check('07-create-tontine', async () => {
    await page.goto(BASE + '/tontines/create', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 8. Transactions
  await check('08-transactions', async () => {
    await page.goto(BASE + '/transactions', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 9. Notifications
  await check('09-notifications', async () => {
    await page.goto(BASE + '/notifications', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 10. Profile
  await check('10-profile', async () => {
    await page.goto(BASE + '/profile', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 11. Settings
  await check('11-settings', async () => {
    await page.goto(BASE + '/settings', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
  });

  // 12. CGU
  await check('12-cgu', async () => {
    await page.goto(BASE + '/legal/cgu', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);
  });

  // 13. Confidentialité
  await check('13-privacy', async () => {
    await page.goto(BASE + '/legal/confidentialite', { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);
  });

  await browser.close();

  const passed = results.filter(r => r.ok).length;
  const failed = results.filter(r => !r.ok).length;
  console.log(`\n📊 Résultat: ${passed}/${results.length} OK | ${failed} erreurs`);
  console.log(`📁 Screenshots: ${OUT}`);
  if (failed > 0) {
    console.log('❌ Erreurs:');
    results.filter(r => !r.ok).forEach(r => console.log('  -', r.screen));
  }
}

run().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
