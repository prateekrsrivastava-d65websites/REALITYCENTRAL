import { readFileSync } from "node:fs";

const checks = [
  {
    name: "Interactive nav has an active style",
    file: "src/styles.css",
    failWhen: (text) => !text.includes(".nav.active"),
    message: "The asset switcher needs a visible active state."
  },
  {
    name: "Mobile layout is explicitly handled",
    file: "src/styles.css",
    failWhen: (text) => !text.includes("@media (max-width: 680px)"),
    message: "Agent workflows must stay usable on phones."
  },
  {
    name: "Copy action exposes user feedback",
    file: "src/main.tsx",
    failWhen: (text) => !text.includes("Copied"),
    message: "Agents need confirmation when an asset is copied."
  },
  {
    name: "Export action exists",
    file: "src/main.tsx",
    failWhen: (text) => !text.includes("download = ()"),
    message: "Marketing kits must be exportable."
  }
];

const failures = checks.filter((check) => {
  const text = readFileSync(check.file, "utf8");
  return check.failWhen(text);
});

if (failures.length) {
  console.error("UI contract check failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure.name}: ${failure.message}`);
  }
  process.exit(1);
}

console.log("UI contract check passed.");
