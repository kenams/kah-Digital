import { expect, test } from "@playwright/test";

test("public FR pages expose cleaned copy with accents", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await page.getByRole("button", { name: /Assistant projet & support/i }).click();
  await expect(page.getByText("Réponse claire", { exact: false })).toBeVisible();

  await page.goto("/contact", { waitUntil: "domcontentloaded" });
  await expect(page.getByText("Téléphone", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Réponse sous 24h", { exact: false }).first()).toBeVisible();
});
