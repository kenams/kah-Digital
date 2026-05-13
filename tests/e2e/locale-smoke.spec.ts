import { expect, test } from "@playwright/test";

const localeChecks = [
  {
    path: "/",
    lang: "fr",
    marker: "Demander un devis",
    calendarMarker: "Lun 9 juin",
  },
  {
    path: "/en",
    lang: "en",
    marker: "Request a quote",
    calendarMarker: "Mon 9 Jun",
  },
  {
    path: "/de",
    lang: "de",
    marker: "Projekt anfragen",
    calendarMarker: "Mo. 9. Juni",
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
    await expect(page.getByText(localeCheck.calendarMarker)).toBeVisible();
  });
}
