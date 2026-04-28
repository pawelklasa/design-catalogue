import { useEffect, useState } from "react";

/**
 * Fetches live articles from medium.com/@pawel.klasa via the Netlify Function.
 * Polls every 30 minutes by default. Returns null until the first response.
 *
 * Articles are shaped to slot into the catalogue's WRITING category.
 */
export function useMediumArticles(pollMs = 30 * 60 * 1000) {
  const [articles, setArticles] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timer;

    const load = async () => {
      try {
        const res = await fetch("/api/medium-articles");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;
        setArticles(json.articles || []);
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

  return { articles, error };
}
