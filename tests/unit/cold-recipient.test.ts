import test from "node:test";
import assert from "node:assert/strict";
import { isStrictEmail } from "../../src/lib/cold-recipient";
import { checkSendable } from "../../src/lib/prospect-send-gate";
import { evaluateBounces } from "../../src/lib/prospection-safety";

test("adresses valides acceptées", () => {
  for (const e of ["contact@transac-immo-caen.com", "st.ex.immobilier@wanadoo.fr", "a.rossini@arlim.com", "info@bari.fr"]) assert.equal(isStrictEmail(e), true, e);
});
test("adresses mal formées refusées (cas réel du 20/11 : %20)", () => {
  for (const e of ["%20contact@espaceimmocaen.fr", " contact@x.fr", "contact @x.fr", "contact@x", "contact@@x.fr", "a..b@x.fr", ".a@x.fr", "contact@x.fr.", "contact@-x.fr", "", null]) assert.equal(isStrictEmail(e), false, String(e));
});
test("la porte d'envoi bloque une adresse mal formée sans requête DNS", async () => {
  const r = await checkSendable({ to: "%20contact@espaceimmocaen.fr", website: "https://espaceimmocaen.fr", businessName: "Espace Immo", subject: "Un point repéré", html: "x" }, { skipDns: true });
  assert.ok(r.reasons.includes("adresse mal formée"));
});
test("coupe-circuit à 4 % : 6 rebonds sur 82 envois (14 j au 21/11) déclenchent la pause", () => {
  assert.equal(evaluateBounces(82, 6).tripped, true);
  assert.equal(evaluateBounces(100, 3).tripped, false);
});
