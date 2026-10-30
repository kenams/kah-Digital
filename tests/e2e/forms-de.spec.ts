import { expect, test } from "@playwright/test";

test("German quote form uses German labels", async ({ page }) => {
  await page.goto("/de/devis");

  await expect(page.getByText("Welches Projekt haben Sie?")).toBeVisible();
  await expect(page.getByText("Landing Page").first()).toBeVisible();
  await expect(page.getByText("Online-Shop").first()).toBeVisible();
  await page.getByText("Online-Shop").first().click();
  await expect(page.getByText("Ihre Angaben")).toBeVisible();
  await expect(page.getByRole("button", { name: /Persönliche Offerte anfordern/ })).toBeVisible();
  await expect(page.getByText(/Réponse|Demander/)).toHaveCount(0);
});

test("German thank-you page exists", async ({ page }) => {
  await page.goto("/de/merci");
  await expect(page.getByRole("heading", { name: /Danke/ })).toBeVisible();
});
