import { expect, test } from "@playwright/test";

const localeChecks = [
  {
    path: "/",
    lang: "fr",
    marker: "Obtenir un devis gratuit",
  },
  {
    path: "/en",
    lang: "en",
    marker: "Get a free quote",
  },
  {
    path: "/de",
    lang: "de",
    marker: "Kostenlose Offerte erhalten",
  },
] as const;

for (const localeCheck of localeChecks) {
  test(`SSR locale is correct for ${localeCheck.path}`, async ({ page, request }) => {
    const response = await request.get(localeCheck.path);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-language"]).toBe(localeCheck.lang);

    await page.goto(localeCheck.path);
    await expect(page.locator("html")).toHaveAttribute("lang", localeCheck.lang);
    await expect(page.getByRole("main").getByRole("link", { name: localeCheck.marker, exact: false }).first()).toBeVisible();
  });
}
