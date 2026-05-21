import { useEffect, useState } from "react";
import { shapeArenaBlock } from "./arenaShape.js";

const CHANNEL_SLUG = "currently-chewing-on";

/**
 * Fetches live blocks from the Are.na "currently chewing on" channel.
 *
 * In production, hits the Netlify function (`/api/arena-blocks`) which
 * caches the response on the CDN. In dev (no Netlify Functions running),
 * falls back to calling the public Are.na API directly — it supports CORS.
 */
export function useArenaBlocks(pollMs = 10 * 60 * 1000) {
  const [blocks, setBlocks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timer;

    const loadFromFunction = async () => {
      const res = await fetch("/api/arena-blocks");
      if (!res.ok) throw new Error(`fn HTTP ${res.status}`);
      const ct = res.headers.get("content-type") || "";
      if (!ct.includes("json")) throw new Error("fn non-json"); // dev: vite returns HTML
      const json = await res.json();
      return json.blocks || [];
    };

    const loadFromArena = async () => {
      const res = await fetch(
        `https://api.are.na/v2/channels/${CHANNEL_SLUG}/contents?per=50&direction=desc`
      );
      if (!res.ok) throw new Error(`arena HTTP ${res.status}`);
      const json = await res.json();
      return (json.contents || []).map(shapeArenaBlock);
    };

    const load = async () => {
      try {
        let list;
        try {
          list = await loadFromFunction();
        } catch {
          list = await loadFromArena();
        }
        if (cancelled) return;
        setBlocks(list);
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err);
      }
    };

    load();
    timer = setInterval(load, pollMs);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [pollMs]);

  return { blocks, error };
}
