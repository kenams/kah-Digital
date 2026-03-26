import { expect, test } from "@playwright/test";

const localeChecks = [
  {
    path: "/",
    lang: "fr",
    marker: "Demander un cadrage",
  },
  {
    path: "/en",
    lang: "en",
    marker: "Request scoped guidance",
  },
  {
    path: "/de",
    lang: "de",
    marker: "Sauberes Briefing anfragen",
  },
] as const;

for (const localeCheck of localeChecks) {
  test(`SSR locale is correct for ${localeCheck.path}`, async ({ page, request }) => {
    const response = await request.get(localeCheck.path);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-language"]).toBe(localeCheck.lang);

    await page.goto(localeCheck.path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("lang", localeCheck.lang);
    await expect(page.getByRole("main").getByRole("link", { name: localeCheck.marker, exact: false }).first()).toBeVisible();
  });
}
