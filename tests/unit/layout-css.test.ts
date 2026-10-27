import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";

const APP = join(process.cwd(), "src", "app");

function pages(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "api") continue;
      out.push(...pages(full));
    } else if (name === "page.tsx") {
      out.push(full);
    }
  }
  return out;
}

// Régression 27/10 : /p/[id] (la page que le prospect ouvre depuis le mail) s'affichait en texte brut,
// car aucun layout sur son chemin ne chargeait globals.css.
test("chaque page a un layout qui charge globals.css sur son chemin", () => {
  const missing: string[] = [];
  for (const page of pages(APP)) {
    let dir = dirname(page);
    let ok = false;
    while (true) {
      const layout = join(dir, "layout.tsx");
      if (existsSync(layout) && /globals\.css/.test(readFileSync(layout, "utf8"))) {
        ok = true;
        break;
      }
      if (dir === APP) break;
      dir = dirname(dir);
    }
    if (!ok) missing.push(relative(APP, page).split(sep).join("/"));
  }
  assert.deepEqual(missing, [], `Pages sans CSS global : ${missing.join(", ")}`);
});
