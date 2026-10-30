import { expect, test } from "@playwright/test";

test("assistant widget asks for name and email before the chat starts", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /Kayla/i }).first().click();

  await expect(page.getByText(/Prénom, nom et email pour démarrer/)).toBeVisible();

  const startButton = page.getByRole("button", { name: "Démarrer la conversation" });
  await expect(startButton).toBeDisabled();

  await page.getByLabel("Prénom *", { exact: true }).fill("Alex");
  await page.getByLabel("Nom *", { exact: true }).fill("Martin");
  await expect(startButton).toBeDisabled();

  await page.getByLabel("Email", { exact: true }).fill("alex@example.com");
  await expect(startButton).toBeEnabled();

  await startButton.click();

  await expect(page.getByPlaceholder("Écris ton message...")).toBeEnabled();
});
