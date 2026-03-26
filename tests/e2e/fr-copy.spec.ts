import { expect, test } from "@playwright/test";

test("public FR pages expose cleaned copy with accents", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText(/Réponse sous 24h/)).toBeVisible();

  await page.goto("/contact");
  await expect(page.getByText("Téléphone", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Réponse sous 24h", { exact: false }).first()).toBeVisible();
});
