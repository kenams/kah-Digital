import test from "node:test";
import assert from "node:assert/strict";
import { cleanUrl } from "../../src/lib/clean-url";

test("valeur d'env polluée par echo (espace + CRLF) : nettoyée (régression 27/10, redirection de clic en 500)", () => {
  assert.equal(cleanUrl("https://kah-digital.ch \r\n"), "https://kah-digital.ch");
  const redirect = `${cleanUrl("https://kah-digital.ch \r\n")}/p/abc`;
  assert.doesNotThrow(() => new URL(redirect));
});

test("guillemets parasites et slash final retirés, vide => undefined", () => {
  assert.equal(cleanUrl('"https://kah-digital.ch/"'), "https://kah-digital.ch");
  assert.equal(cleanUrl(""), undefined);
  assert.equal(cleanUrl(undefined), undefined);
  assert.equal(cleanUrl("   \r\n"), undefined);
});
