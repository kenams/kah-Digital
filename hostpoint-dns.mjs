import { chromium } from 'playwright';

const LOGIN_URL = 'https://admin.hostpoint.ch/public/fr/auth/hostpoint';
const DNS_URL   = 'https://admin.hostpoint.ch/customer/Domains/Dns/Edit?name=kah-support.ch';
const EMAIL     = 'kenams42@gmail.com';
const PASS      = 'Niamorode22342';
const TMP       = 'C:\\Users\\kenam\\AppData\\Local\\Temp\\hp-dns-' + Date.now();
const SCDIR     = 'C:\\Users\\kenam\\AppData\\Local\\Temp\\';

const AAAA_IP = '2a00:d70:0:a::166';

async function sc(page, name) {
  await page.screenshot({ path: SCDIR + name + '.png' });
  console.log('  [sc] ' + name + '.png');
}

async function login(page) {
  await page.goto(LOGIN_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  const acc = page.locator('.button-accept').first();
  if (await acc.isVisible().catch(() => false)) { await acc.click(); await page.waitForTimeout(500); }
  await page.fill('#username', EMAIL);
  await page.fill('input[type="password"]', PASS);
  const btn = await page.$('button.p-ripple') || await page.$('button.p-button');
  if (btn) await btn.click(); else await page.keyboard.press('Enter');
  await page.waitForTimeout(4000);
  console.log('Logged in:', page.url());
}

(async () => {
  const browser = await chromium.launchPersistentContext(TMP, {
    headless: false,
    args: ['--no-sandbox'],
    viewport: { width: 1280, height: 900 },
    ignoreHTTPSErrors: true,
  });
  const page = browser.pages()[0] || await browser.newPage();

  try {
    await login(page);

    console.log('\n→ Loading DNS editor...');
    await page.goto(DNS_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    await sc(page, 'aaaa-0-loaded');

    // List rows with AAAA
    const aaaaRows = await page.locator('tr').filter({ hasText: 'AAAA' }).all();
    console.log(`AAAA rows: ${aaaaRows.length}`);

    for (let i = 0; i < aaaaRows.length; i++) {
      const text = (await aaaaRows[i].innerText()).replace(/\s+/g, ' ').trim();
      console.log(`\nRow[${i}]: ${text}`);
    }

    // Delete each AAAA row
    let deleted = 0;
    for (let pass = 0; pass < 3; pass++) {
      const rows = await page.locator('tr').filter({ hasText: 'AAAA' }).all();
      if (rows.length === 0) break;

      const row = rows[0];
      const deleteBtn = row.locator('.b-button--delete, button.btn-danger').first();
      const delCount = await deleteBtn.count();
      if (delCount === 0) { console.log('No delete button on AAAA row'); break; }

      await deleteBtn.click();
      console.log(`→ Clicked delete on AAAA row ${pass}`);
      await page.waitForTimeout(1000);

      // Confirm deletion dialog if any
      const confirmBtn = page.locator('button:has-text("Supprimer"), button:has-text("Oui"), button:has-text("Confirmer"), button.btn-danger:has-text("Supprimer")').first();
      if (await confirmBtn.isVisible().catch(() => false)) {
        await confirmBtn.click();
        console.log('  → Confirmed deletion');
        await page.waitForTimeout(1000);
      }

      // If inline delete with Appliquer/Supprimer buttons
      const applyBtn = page.locator('button.btn-danger.btn-xs:has-text("Supprimer")').first();
      if (await applyBtn.isVisible().catch(() => false)) {
        await applyBtn.click();
        console.log('  → Clicked Supprimer (inline)');
        await page.waitForSelector('button.btn-danger.btn-xs', { state: 'hidden', timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(1000);
      }

      deleted++;
      await sc(page, `aaaa-delete-${pass}`);
    }

    console.log(`\nDeleted ${deleted} AAAA record(s)`);

    // Click EXÉCUTER MAINTENANT if enabled
    const execBtn = page.locator('button:has-text("EXÉCUTER MAINTENANT"), button:has-text("Exécuter maintenant")').first();
    if (await execBtn.isVisible().catch(() => false) && !(await execBtn.isDisabled())) {
      await execBtn.click();
      console.log('→ Clicked EXÉCUTER MAINTENANT');
      await page.waitForTimeout(5000);
    } else if (await execBtn.isVisible().catch(() => false)) {
      await execBtn.click({ force: true });
      console.log('→ Force-clicked EXÉCUTER MAINTENANT');
      await page.waitForTimeout(5000);
    }

    await sc(page, 'aaaa-final');

    // Verify final state
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    const remainingAaaa = await page.locator('tr').filter({ hasText: 'AAAA' }).count();
    console.log(`\nRemaining AAAA records: ${remainingAaaa}`);
    console.log(remainingAaaa === 0 ? '✅ All AAAA records removed' : '⚠️ AAAA records still present');

  } catch (e) {
    console.error('ERROR:', e.message);
    await sc(page, 'aaaa-crash').catch(() => {});
  }

  await browser.close();
})();
