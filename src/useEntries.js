import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "./firebase.js";

// Inverse of the seeder's `sanitize`: turn arrays of {label, value}
// objects back into [label, value] tuple arrays so the existing
// components (which expect tuples in fields like `metrics`) still work.
function rehydrate(value) {
  if (Array.isArray(value)) {
    if (
      value.length > 0 &&
      value.every(
        (v) => v && typeof v === "object" && !Array.isArray(v) && "label" in v && "value" in v && Object.keys(v).length === 2
      )
    ) {
      return value.map((v) => [v.label, v.value]);
    }
    return value.map(rehydrate);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = rehydrate(v);
    return out;
  }
  return value;
}

/**
 * Subscribes to the `entries` Firestore collection.
 * Falls back to the bundled `window.ENTRIES` (from data.jsx) if the
 * collection is empty or unreachable, so the site still renders.
 */
export function useEntries() {
  const [entries, setEntries] = useState(() => window.ENTRIES || []);
  const [status, setStatus] = useState("loading"); // loading | live | fallback

  useEffect(() => {
    let cancelled = false;
    const q = query(collection(db, "entries"), orderBy("year", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (cancelled) return;
        if (snap.empty) {
          setEntries(window.ENTRIES || []);
          setStatus("fallback");
        } else {
          setEntries(snap.docs.map((d) => ({ ...rehydrate(d.data()), _docId: d.id })));
          setStatus("live");
        }
      },
      (err) => {
        console.warn("[useEntries] Firestore error, falling back to bundled data:", err);
        if (cancelled) return;
        setEntries(window.ENTRIES || []);
        setStatus("fallback");
      }
    );
    return () => {
      cancelled = true;
      unsub();
    };
  }, []);

  return { entries, status };
}
