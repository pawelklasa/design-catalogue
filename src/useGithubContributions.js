import { useEffect, useState } from "react";

/**
 * Fetches live GitHub contribution data from the Netlify Function.
 * Polls every 5 minutes. Returns null until the first response arrives;
 * the consumer should fall back to its own placeholder data in that case.
 *
 * Shape:
 *   {
 *     totalContributions: number,
 *     weeks: [[{date: "yyyy-mm-dd", count, level}, ...], ...],
 *     publicRepos: number,
 *     recentEvents: [{when, repo, action, detail}, ...],
 *   }
 */
export function useGithubContributions(pollMs = 5 * 60 * 1000) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let timer;

    const load = async () => {
      try {
        const res = await fetch("/api/github-contributions");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled) return;
        // Convert ISO date strings back to Date objects for the grid.
        const weeks = (json.weeks || []).map((w) =>
          w.map((c) => (c ? { ...c, date: new Date(c.date + "T00:00:00") } : null))
        );
        setData({ ...json, weeks });
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

  return { data, error };
}
