import React from "react";
/* global React */
// GitHub-style contribution heatmap.
// Generates a deterministic year of contribution data based on a seeded PRNG.
// 53 weeks × 7 days = the iconic grid.

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function generateContributions() {
  const rng = seededRandom(8675309);
  const cells = [];
  const today = new Date(2026, 3, 28); // Apr 28, 2026
  // Start 52 weeks ago, snapped to Sunday
  const start = new Date(today);
  start.setDate(start.getDate() - 52 * 7 - today.getDay());

  for (let w = 0; w < 53; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      if (date > today) {
        week.push(null);
        continue;
      }
      // weekend bias down, weekday up; some quiet weeks
      const dayBias = (d === 0 || d === 6) ? 0.45 : 1.0;
      // burst pattern — couple of intense periods
      const isBurst = (w >= 8 && w <= 14) || (w >= 28 && w <= 33) || (w >= 44 && w <= 50);
      const burstMul = isBurst ? 1.8 : 1.0;
      const r = rng() * dayBias * burstMul;
      let level = 0;
      if (r > 0.55) level = 1;
      if (r > 0.85) level = 2;
      if (r > 1.05) level = 3;
      if (r > 1.3) level = 4;
      const count = level === 0 ? 0 : Math.floor(r * 6 + level * 2);
      week.push({ date, level, count });
    }
    cells.push(week);
  }
  return cells;
}

const CONTRIB_DATA = generateContributions();

const RECENT_EVENTS = [
  { when: "2 hours ago", repo: "pawelklasa/Dev-Resources", action: "Pushed 1 commit", detail: "docs: add OKLCH references to color section" },
  { when: "Yesterday",   repo: "pawelklasa/showcase",      action: "Merged PR #12",   detail: "feat: catalog redirect from /portfolio" },
  { when: "2 days ago",  repo: "pawelklasa/JS-playground", action: "Pushed 4 commits", detail: "experiments with the View Transition API" },
  { when: "4 days ago",  repo: "getify/You-Dont-Know-JS",  action: "Opened issue #1842", detail: "ch3: minor errata in async generator example" },
  { when: "6 days ago",  repo: "pawelklasa/test",          action: "Pushed 2 commits", detail: "wip: claude-design experiments" },
  { when: "1 week ago",  repo: "pawelklasa/Dev-Resources", action: "Pushed 3 commits", detail: "added local-first databases section" },
  { when: "9 days ago",  repo: "pawelklasa/showcase",      action: "Merged PR #11",   detail: "fix: reduced-motion hero fallback" },
];

function ContribCell({ level, T, count, date }) {
  // Use accent ramp for levels
  const levels = T.contribLevels || [
    T.ink08,
    "rgba(193,57,15,0.22)",
    "rgba(193,57,15,0.45)",
    "rgba(193,57,15,0.7)",
    T.accent,
  ];
  const bg = level === null ? "transparent" : levels[level];
  return (
    <div title={date ? `${count} contributions · ${date.toDateString()}` : ""}
      style={{
        width: 11, height: 11,
        background: bg,
        outline: level !== null ? `1px solid ${T.ink08}` : "none",
        outlineOffset: -1,
      }} />
  );
}

function ContributionGraph({ theme, compact, data }) {
  const T = window.THEMES[theme];
  // Override the contrib ramp per theme
  const ramps = {
    paper: [T.ink08, "rgba(31,67,128,0.2)", "rgba(31,67,128,0.45)", "rgba(31,67,128,0.72)", T.accent],
    cream: [T.ink08, "rgba(168,66,26,0.2)", "rgba(168,66,26,0.45)", "rgba(168,66,26,0.72)", T.accent],
    sage:  [T.ink08, "rgba(45,93,58,0.2)",  "rgba(45,93,58,0.45)",  "rgba(45,93,58,0.72)",  T.accent],
    ochre: [T.ink08, "rgba(193,57,15,0.2)", "rgba(193,57,15,0.46)", "rgba(193,57,15,0.74)", T.accent],
    blush: [T.ink08, "rgba(168,56,86,0.2)", "rgba(168,56,86,0.46)", "rgba(168,56,86,0.74)", T.accent],
    ink:   [T.ink08, "rgba(255,90,31,0.25)", "rgba(255,90,31,0.5)", "rgba(255,90,31,0.78)", T.accent],
    blueprint: [T.ink08, "rgba(255,209,102,0.25)", "rgba(255,209,102,0.55)", "rgba(255,209,102,0.8)", T.accent],
  };
  const Tx = { ...T, contribLevels: ramps[theme] || ramps.paper };

  // Use live data when available, otherwise fall back to the seeded mock.
  const cells = data?.weeks ?? CONTRIB_DATA;
  const events = data?.recentEvents ?? RECENT_EVENTS;
  const isLive = !!data;

  const totalContribs = data?.totalContributions
    ?? cells.flat().reduce((sum, c) => sum + (c?.count || 0), 0);
  const activeDays = cells.flat().filter((c) => c && c.count > 0).length;
  const longestStreak = (() => {
    let max = 0, cur = 0;
    for (const w of cells) for (const c of w) {
      if (!c) continue;
      if (c.count > 0) { cur++; max = Math.max(max, cur); } else cur = 0;
    }
    return max;
  })();
  const publicRepos = data?.publicRepos ?? 101;

  // Month labels: detect when a new month starts at top row of week
  const monthLabels = [];
  let lastMonth = -1;
  for (let w = 0; w < cells.length; w++) {
    const firstDay = cells[w].find(Boolean);
    if (!firstDay) continue;
    const m = firstDay.date.getMonth();
    if (m !== lastMonth && firstDay.date.getDate() <= 7) {
      monthLabels.push({ w, label: firstDay.date.toLocaleString("en", { month: "short" }) });
      lastMonth = m;
    }
  }

  const dayLabels = ["Mon", "Wed", "Fri"];

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
        <div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, marginBottom: 6 }}>
            § FEED · {isLive ? "Live" : "Cached"}
          </div>
          <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 32, letterSpacing: "-0.02em", color: T.ink }}>
            <span className="mono" style={{ fontSize: 24, color: T.ink, letterSpacing: "0.02em" }}>{totalContribs.toLocaleString()}</span>
            {" "}<span style={{ color: T.ink70, fontSize: 22 }}>contributions in the last year</span>
          </div>
          <div className="serif" style={{ fontStyle: "italic", color: T.ink70, marginTop: 6, fontSize: 14 }}>
            Pulled from <a href="https://github.com/pawelklasa" target="_blank" style={{ color: T.ink70 }}>github.com/pawelklasa</a>.
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink70, textAlign: "right", lineHeight: 1.7, display: "grid", gridTemplateColumns: "auto auto", columnGap: 14, rowGap: 2, justifyContent: "end", alignItems: "baseline" }}>
          <span style={{ color: T.ink40 }}>Active days</span>
          <span style={{ color: T.ink, fontSize: 12, justifySelf: "end" }}>{activeDays}</span>
          <span style={{ color: T.ink40 }}>Longest streak</span>
          <span style={{ color: T.ink, fontSize: 12, justifySelf: "end" }}>{longestStreak} days</span>
          <span style={{ color: T.ink40 }}>Public repos</span>
          <span style={{ color: T.ink, fontSize: 12, justifySelf: "end" }}>{publicRepos}</span>
        </div>
      </div>

      {/* Graph */}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        {/* Day labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 18 }}>
          {[0, 2, 4].map((rowIdx) => (
            <div key={rowIdx} className="mono" style={{ height: 11 + (rowIdx === 0 ? 0 : 24), display: "flex", alignItems: "flex-end", fontSize: 9, color: T.ink40, letterSpacing: "0.05em" }}>
              {dayLabels[Math.floor(rowIdx / 2)]}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ flex: 1, overflowX: "auto" }}>
          {/* Month row */}
          <div style={{ position: "relative", height: 14, marginBottom: 4 }}>
            {monthLabels.map(({ w, label }) => (
              <div key={w} className="mono" style={{
                position: "absolute",
                left: w * 13,
                fontSize: 9, color: T.ink40, letterSpacing: "0.08em", textTransform: "uppercase",
              }}>{label}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {cells.map((week, w) => (
              <div key={w} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {week.map((cell, d) => (
                  <ContribCell
                    key={d}
                    level={cell?.level ?? null}
                    count={cell?.count}
                    date={cell?.date}
                    T={Tx}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mono" style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 18, fontSize: 9, color: T.ink40, letterSpacing: "0.08em", textTransform: "uppercase", justifyContent: "flex-end" }}>
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div key={l} style={{ width: 11, height: 11, background: ramps[theme][l], outline: `1px solid ${T.ink08}`, outlineOffset: -1 }} />
        ))}
        <span>More</span>
      </div>

      {/* Recent events list */}
      {!compact && events && events.length > 0 && (
      <div style={{ marginTop: 40, borderTop: `1px solid ${T.ink15}`, paddingTop: 24 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.ink40, marginBottom: 16 }}>
          Recent activity
        </div>
        <div>
          {events.map((ev, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "120px 240px 140px 1fr",
              gap: 24,
              padding: "12px 0",
              borderBottom: `1px solid ${T.ink08}`,
              alignItems: "baseline",
            }}>
              <span className="mono" style={{ fontSize: 10, color: T.ink40, letterSpacing: "0.06em", textTransform: "uppercase" }}>{ev.when}</span>
              <a href={`https://github.com/${ev.repo}`} target="_blank" rel="noreferrer" className="mono" style={{ fontSize: 11, color: T.ink, letterSpacing: "0.02em", textDecoration: "none" }}>{ev.repo}</a>
              <span className="mono" style={{ fontSize: 10, color: T.accent, letterSpacing: "0.06em", textTransform: "uppercase" }}>{ev.action}</span>
              <span style={{ fontSize: 13, color: T.ink70 }}>{ev.detail}</span>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}

window.ContributionGraph = ContributionGraph;
