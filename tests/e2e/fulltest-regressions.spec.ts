import { expect, test } from "@playwright/test";

const locales = [
  { prefix: "", lang: "fr", notFound: "Cette page n'existe pas." },
  { prefix: "/en", lang: "en", notFound: "This page doesn't exist." },
  { prefix: "/de", lang: "de", notFound: "Diese Seite gibt es nicht." },
] as const;

for (const { prefix, notFound } of locales) {
  test(`404 is branded and localized for ${prefix || "/fr"}`, async ({ page }) => {
    const response = await page.goto(`${prefix}/cette-page-nexiste-pas`);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(notFound);
    await expect(page.getByRole("link", { name: /accueil|home|startseite/i })).toBeVisible();
  });
}

test("MVP quote form submits without a captcha token in every language", async ({ page }) => {
  for (const { prefix, lang } of locales) {
    let payload: Record<string, unknown> | null = null;
    await page.route("**/api/quote", async (route) => {
      payload = route.request().postDataJSON();
      await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    });

    await page.goto(`${prefix}/devis/mvp`);
    await expect(page.locator("html")).toHaveAttribute("lang", lang);

    await page.selectOption("#clientType", "entreprise");
    await page.fill("#name", "Test Fulltest");
    await page.fill("#email", "test+fulltest@example.com");
    await page.fill("#idea", "Application de test Fulltest");
    await page.fill("#flows", "Parcours test");
    await page.fill("#visualMood", "Sombre");
    await page.selectOption("#storeSupport", { index: 1 });
    await page.selectOption("#budget", { index: 1 });
    await page.selectOption("#timeline", { index: 1 });
    await page.locator('input[name="mobilePlatforms"]').first().check();
    await page.locator('form button[type="submit"]').click();

    await expect(page).toHaveURL(new RegExp(`${prefix}/merci`));
    expect(payload).not.toBeNull();
    expect((payload as unknown as Record<string, unknown>).projectFocus).toBe("mobile");
    await page.unroute("**/api/quote");
  }
});

test("German legal pages exist and stay in German", async ({ page }) => {
  await page.goto("/de/mentions-legales");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Impressum");
  await page.goto("/de/politique-de-confidentialite");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Datenschutzerklärung");
});

test("footer links never leave the current language", async ({ page }) => {
  for (const { prefix } of [{ prefix: "/en" }, { prefix: "/de" }]) {
    await page.goto(`${prefix}/contact`);
    const hrefs = await page.locator("footer a[href^='/']").evaluateAll((els) => els.map((e) => e.getAttribute("href") ?? ""));
    const switcher = new Set(["/", "/en", "/de"]); // sélecteur de langue
    const foreign = hrefs.filter((h) => !h.startsWith(`${prefix}/`) && !switcher.has(h));
    expect(foreign, `footer links outside ${prefix}`).toEqual([]);
  }
});
