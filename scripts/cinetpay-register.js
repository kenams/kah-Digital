const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, slowMo: 250 });
  const page = await browser.newPage();

  async function shot(name) {
    await page.screenshot({ path: `cinetpay-${name}.png`, fullPage: true });
  }

  try {
    // === ÉTAPE 1 ===
    await page.goto('https://panel.cinetpay.net/demande-compte', { waitUntil: 'networkidle', timeout: 20000 });
    await page.fill('#account_name', 'KAH Digital');
    await page.fill('#account_email', 'kahdigital42@gmail.com');
    await page.click('button:has-text("Continuer")');
    await page.waitForTimeout(2000);

    // === ÉTAPE 2 ===
    await page.fill('#name', 'KAH Digital');
    await page.fill('#email', 'kahdigital42@gmail.com');
    await page.fill('#phone_number', '0707070707');
    await page.fill('#address', "Abidjan, Côte d'Ivoire");
    const trigger2 = page.locator('[data-slot="select-trigger"]').last();
    await trigger2.click(); await page.waitForTimeout(800);
    await page.locator('[role="option"]').first().click({ force: true }); await page.waitForTimeout(300);
    await page.click('button:has-text("Continuer")'); await page.waitForTimeout(2000);

    // === ÉTAPE 3 ===
    await page.locator('div:has-text("Collecte de paiements")').last().click(); await page.waitForTimeout(300);
    await page.click('button:has-text("Continuer")'); await page.waitForTimeout(2000);

    // === ÉTAPE 4 — Config module ===
    // Volume mensuel
    const volTrigger = page.locator('[data-slot="select-trigger"]').first();
    await volTrigger.click(); await page.waitForTimeout(800);
    await page.locator('[role="option"]').first().click({ force: true }); await page.waitForTimeout(300);
    // Site web
    await page.locator('input[type="text"]').first().fill('https://tontineapp-web.vercel.app');
    await page.click('button:has-text("Continuer")'); await page.waitForTimeout(2000);

    // === ÉTAPE 5 — IP (optionnel) → Envoyer la demande ===
    console.log('[5/5] Envoi de la demande...');
    await shot('step5-before-submit');
    await page.click('button:has-text("Envoyer la demande")', { timeout: 8000 });
    await page.waitForTimeout(4000);
    await shot('submitted');

    const finalUrl = page.url();
    console.log('URL finale:', finalUrl);

    const pageText = await page.evaluate(() => document.body.innerText);
    console.log('Page text (500 chars):', pageText.slice(0, 500));

  } catch(e) {
    console.log('ERR:', e.message.slice(0, 300));
    await shot('error');
  }
  await browser.close();
})();
