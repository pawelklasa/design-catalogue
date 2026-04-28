/**
 * One-shot Firestore seeder.
 *
 * Usage:
 *   1. Place service account key at ./serviceAccount.json (gitignored)
 *   2. node scripts/seed-firestore.mjs
 *
 * Reads ENTRIES from src/data.jsx by stripping JSX/imports and evaluating
 * the array literal directly. Idempotent: uses each entry's `id` as the
 * Firestore document id and overwrites with merge:false.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const serviceAccount = JSON.parse(
  readFileSync(resolve(ROOT, "serviceAccount.json"), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// Extract the ENTRIES array literal from src/data.jsx
const dataSrc = readFileSync(resolve(ROOT, "src/data.jsx"), "utf8");
const start = dataSrc.indexOf("const ENTRIES = [");
const end = dataSrc.indexOf("\nwindow.ENTRIES");
if (start === -1 || end === -1) {
  throw new Error("Could not locate ENTRIES array in src/data.jsx");
}
const arrayLiteral = dataSrc.slice(start + "const ENTRIES = ".length, end).trim().replace(/;$/, "");

// eslint-disable-next-line no-new-func
const ENTRIES = new Function(`return (${arrayLiteral});`)();
console.log(`Loaded ${ENTRIES.length} entries from src/data.jsx`);

// Firestore disallows nested arrays. Convert any [string, string] tuple
// arrays (e.g. `metrics`) into arrays of {label, value} objects.
function sanitize(value) {
  if (Array.isArray(value)) {
    if (value.length > 0 && value.every((v) => Array.isArray(v) && v.length === 2)) {
      return value.map(([label, val]) => ({ label: String(label), value: String(val) }));
    }
    return value.map(sanitize);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = sanitize(v);
    return out;
  }
  return value;
}

const batch = db.batch();
for (const entry of ENTRIES) {
  if (!entry.id) {
    console.warn("Skipping entry without id:", entry.title);
    continue;
  }
  const ref = db.collection("entries").doc(entry.id);
  batch.set(ref, sanitize(entry));
}
await batch.commit();
console.log(`✓ Wrote ${ENTRIES.length} documents to entries/`);
process.exit(0);
