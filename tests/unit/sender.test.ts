import test from "node:test";
import assert from "node:assert/strict";
import { PROSPECTION_FROM, PROSPECTION_REPLY_TO } from "../../src/lib/prospection-sender";

test("prospection : expéditeur sur le sous-domaine dédié, jamais sur le domaine principal", () => {
  assert.match(PROSPECTION_FROM, /@go\.kah-digital\.ch>$/);
  assert.ok(!/@kah-digital\.ch>/.test(PROSPECTION_FROM));
});

test("les réponses arrivent sur la boîte business", () => {
  assert.equal(PROSPECTION_REPLY_TO, "kahdigital42@gmail.com");
});
