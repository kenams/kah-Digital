import { expect, test } from "@playwright/test";

test("assistant widget requires contact details before chat starts", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /Assistant projet & support/i }).click();

  await expect(page.getByText("Avant de commencer")).toBeVisible();

  const startButton = page.getByRole("button", { name: "Commencer le chat" });
  await expect(startButton).toBeDisabled();

  await page.getByLabel("Prénom *", { exact: true }).fill("Alex");
  await page.getByLabel("Nom *", { exact: true }).fill("Martin");
  await page.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await expect(startButton).toBeDisabled();

  await page.getByLabel("Téléphone *", { exact: true }).fill("+41 79 000 00 00");
  await page.getByLabel("Société *", { exact: true }).fill("Studio Nova");
  await expect(startButton).toBeEnabled();

  await startButton.click();

  await expect(page.getByRole("button", { name: "Nouvelle conversation" })).toBeVisible();
  await expect(page.getByPlaceholder("Décris ton besoin, ton projet ou ton problème...")).toBeEnabled();
  await expect(page.getByText("Avant de commencer")).not.toBeVisible();
});
