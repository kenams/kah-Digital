/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");

const appRoot = path.join(__dirname, "..", "src", "app");
const ignoreDirs = new Set(["admin", "api", "en"]);

function isPageFile(filePath) {
  return path.basename(filePath) === "page.tsx";
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (dir === appRoot && ignoreDirs.has(entry.name)) {
        continue;
      }
      files.push(...walk(fullPath));
      continue;
    }
    if (isPageFile(fullPath)) {
      files.push(fullPath);
    }
  }
  return files;
}

function toRoutePath(filePath) {
  const relative = path.relative(appRoot, filePath);
  const parts = relative.split(path.sep);
  parts.pop();
  return parts.join(path.sep);
}

const pageFiles = walk(appRoot);
const missing = [];
const criticalPattern = /i18n:critical:([A-Za-z0-9_-]+)/g;
const criticalIssues = [];

for (const file of pageFiles) {
  const relative = path.relative(appRoot, file);
  const firstSegment = relative.split(path.sep)[0];
  if (firstSegment === "en") {
    continue;
  }

  const routePath = toRoutePath(file);
  const enTarget = path.join(appRoot, "en", routePath, "page.tsx");
  if (!fs.existsSync(enTarget)) {
    missing.push(`/${routePath}`.replace(/\\/g, "/") || "/");
  }

  const source = fs.readFileSync(file, "utf8");
  const markers = [...source.matchAll(criticalPattern)].map((match) => match[1]);
  if (markers.length === 0) {
    continue;
  }
  if (!fs.existsSync(enTarget)) {
    continue;
  }
  const enSource = fs.readFileSync(enTarget, "utf8");
  for (const key of markers) {
    if (!enSource.includes(`i18n:critical:${key}`)) {
      criticalIssues.push({ routePath, key });
    }
  }
}

if (missing.length > 0) {
  console.error("Missing EN pages for:");
  for (const route of missing) {
    console.error(`- ${route}`);
  }
  process.exit(1);
}

if (criticalIssues.length > 0) {
  console.error("Missing critical markers in EN pages:");
  for (const issue of criticalIssues) {
    const route = `/${issue.routePath}`.replace(/\\/g, "/") || "/";
    console.error(`- ${route} (missing: ${issue.key})`);
  }
  process.exit(1);
}

console.log("i18n check passed: EN pages found for all FR routes.");
