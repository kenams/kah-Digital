import { expect, test } from "@playwright/test";

test("German quote form uses German labels", async ({ page }) => {
  await page.goto("/de/devis", { waitUntil: "domcontentloaded" });

  await expect(page.getByLabel("Du bist *")).toBeVisible();
  await expect(page.getByLabel("Firmenname (falls Unternehmen)")).toBeVisible();
  await expect(page.getByLabel("Projekttyp *")).toBeVisible();
  await expect(page.getByText("Gewuenschte Seiten *")).toBeVisible();
  await expect(page.getByRole("button", { name: "Anfrage senden" })).toBeVisible();
});

test("German MVP form uses German labels", async ({ page }) => {
  await page.goto("/de/devis/mvp", { waitUntil: "domcontentloaded" });

  await expect(page.getByLabel("Du bist *")).toBeVisible();
  await expect(page.getByLabel("Deine Idee / das Versprechen *")).toBeVisible();
  await expect(page.getByText("Zielplattformen *")).toBeVisible();
  await expect(page.getByLabel("Zeitplan *")).toBeVisible();
  await expect(page.getByRole("button", { name: "MVP-Anfrage senden" })).toBeVisible();
});
