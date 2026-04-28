/* global React, ReactDOM */
const { useState: useStateC, useMemo: useMemoC, useEffect: useEffectC, useRef: useRefC } = React;

// ============================================================
// THEME — values match the manifesto's discipline.
// ============================================================
const THEMES = {
  paper: {
    bg: "#eaeef2",
    card: "#f0f3f6",
    ink: "#0d1117",
    ink70: "rgba(13,17,23,0.62)",
    ink40: "rgba(13,17,23,0.38)",
    ink15: "rgba(13,17,23,0.13)",
    ink08: "rgba(13,17,23,0.06)",
    accent: "#1f4380",
  },
  cream: {
    bg: "#f5f0e6",
    card: "#faf6ed",
    ink: "#1a1612",
    ink70: "rgba(26,22,18,0.62)",
    ink40: "rgba(26,22,18,0.38)",
    ink15: "rgba(26,22,18,0.13)",
    ink08: "rgba(26,22,18,0.06)",
    accent: "#a8421a",
  },
  sage: {
    bg: "#e8ebe1",
    card: "#eef0e8",
    ink: "#1a1f17",
    ink70: "rgba(26,31,23,0.62)",
    ink40: "rgba(26,31,23,0.38)",
    ink15: "rgba(26,31,23,0.13)",
    ink08: "rgba(26,31,23,0.06)",
    accent: "#2d5d3a",
  },
  ochre: {
    bg: "#efe5d2",
    card: "#f4ecdb",
    ink: "#1f1810",
    ink70: "rgba(31,24,16,0.62)",
    ink40: "rgba(31,24,16,0.38)",
    ink15: "rgba(31,24,16,0.13)",
    ink08: "rgba(31,24,16,0.06)",
    accent: "#c1390f",
  },
  blush: {
    bg: "#f4e8e4",
    card: "#f8eee9",
    ink: "#1d1311",
    ink70: "rgba(29,19,17,0.62)",
    ink40: "rgba(29,19,17,0.38)",
    ink15: "rgba(29,19,17,0.13)",
    ink08: "rgba(29,19,17,0.06)",
    accent: "#a83856",
  },
  ink: {
    bg: "#0d0d0d",
    card: "#141413",
    ink: "#f1ede2",
    ink70: "rgba(241,237,226,0.66)",
    ink40: "rgba(241,237,226,0.4)",
    ink15: "rgba(241,237,226,0.15)",
    ink08: "rgba(241,237,226,0.08)",
    accent: "#ff5a1f",
  },
  blueprint: {
    bg: "#0a2a4a",
    card: "#0d3158",
    ink: "#e8f0ff",
    ink70: "rgba(232,240,255,0.66)",
    ink40: "rgba(232,240,255,0.4)",
    ink15: "rgba(232,240,255,0.18)",
    ink08: "rgba(232,240,255,0.1)",
    accent: "#ffd166",
  },
};

const CATS = {
  WORK:    { label: "Work",        desc: "Case studies. Things that shipped." },
  ATOM:    { label: "Atoms",       desc: "Components. Reusable interface units." },
  METHOD:  { label: "Methods",     desc: "Heuristics. Opinions, codified." },
  WRITING: { label: "Writing",     desc: "Essays and articles. Mostly Bootcamp." },
  TOOL:    { label: "Tools",       desc: "Files and snippets. Take them." },
  DEAD:    { label: "Dead ends",   desc: "Failed experiments. Open archive." },
  FEED:    { label: "Feed",        desc: "Live commits, contributions, activity." },
};

// ============================================================
// COVER — manifesto + live feed graph + index summary
// ============================================================
function Cover({ theme, total, byCat, onJump }) {
  const T = THEMES[theme];
  return (
    <section style={{ borderBottom: `1px solid ${T.ink15}` }}>
      <div style={{ padding: "56px 48px 40px", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", gap: 48, alignItems: "start" }}>
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.08em", color: T.ink40, textTransform: "uppercase", marginBottom: 24 }}>
            Vol. 01 — Klasa, P. — 1st printing — Apr 2026
          </div>
          <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: 88, lineHeight: 0.92, letterSpacing: "-0.04em", margin: 0, color: T.ink }}>
            A public<br />catalogue<br />of work.
          </h1>
          <div className="mono" style={{ marginTop: 28, fontSize: 12, color: T.ink70, lineHeight: 1.6, maxWidth: 460 }}>
            <span style={{ color: T.accent }}>↳</span> In place of a portfolio.
            Open shelf, indexed contents, terms of use printed on the spine.
            All entries inspectable, most reusable, none precious.
          </div>
        </div>
        <div style={{ paddingTop: 6, minWidth: 0, overflowX: "auto" }}>
          {window.ContributionGraph && <window.ContributionGraph theme={theme} compact={true} />}
        </div>
      </div>

      {/* Index strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderTop: `1px solid ${T.ink15}` }}>
        {Object.keys(CATS).map((k) => (
          <button key={k} onClick={() => onJump(k)} className="indexcell"
            style={{
              all: "unset", cursor: "pointer", padding: "20px 20px 22px",
              borderRight: `1px solid ${T.ink15}`,
              display: "flex", flexDirection: "column", gap: 4,
            }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", color: T.ink40, textTransform: "uppercase" }}>
              {String(Object.keys(CATS).indexOf(k) + 1).padStart(2, "0")} / {k}
            </div>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: 22, color: T.ink, letterSpacing: "-0.01em" }}>
              {CATS[k].label}
            </div>
            <div className="mono" style={{ fontSize: 11, color: T.ink70 }}>
              {byCat[k] || 0} entries
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CONTROLS — search, category filter, view toggle
// ============================================================
function Controls({ theme, query, setQuery, activeCat, setActiveCat, view, setView, total, shown, sort, setSort }) {
  const T = THEMES[theme];
  const inputRef = useRefC(null);

  useEffectC(() => {
    const onKey = (e) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        if (document.activeElement === inputRef.current) inputRef.current.blur();
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuery]);

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 10,
      background: T.bg,
      borderBottom: `1px solid ${T.ink15}`,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "stretch", borderBottom: `1px solid ${T.ink08}` }}>
        <div style={{ position: "relative", borderRight: `1px solid ${T.ink15}` }}>
          <span className="mono" style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: T.ink40, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Search ⁄ <span style={{ color: T.ink70 }}>press /</span>
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder=""
            style={{
              all: "unset", width: "100%", boxSizing: "border-box",
              padding: "20px 24px 20px 180px",
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: 17, color: T.ink,
              caretColor: T.accent,
            }}
          />
          {query && (
            <button onClick={() => setQuery("")} className="mono"
              style={{ all: "unset", cursor: "pointer", position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: T.ink40, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              clear ✕
            </button>
          )}
        </div>
        <div className="mono" style={{ display: "flex", alignItems: "center", gap: 0, padding: "0 24px", fontSize: 11, color: T.ink70, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          <span>{String(shown).padStart(3, "0")} / {String(total).padStart(3, "0")}</span>
          <span style={{ color: T.ink15, margin: "0 16px" }}>│</span>
          <span style={{ color: T.ink40 }}>showing</span>
        </div>
      </div>

      {/* Category filter row */}
      <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <FilterPill T={T} active={activeCat === "ALL"} onClick={() => setActiveCat("ALL")}>All</FilterPill>
          {Object.keys(CATS).map((k) => (
            <FilterPill key={k} T={T} active={activeCat === k} onClick={() => setActiveCat(k)}>{CATS[k].label}</FilterPill>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "stretch" }}>
          <SortControl T={T} sort={sort} setSort={setSort} />
          <ViewToggle T={T} view={view} setView={setView} />
        </div>
      </div>
    </div>
  );
}

function FilterPill({ T, active, onClick, children }) {
  return (
    <button onClick={onClick} className="mono"
      style={{
        all: "unset", cursor: "pointer",
        padding: "14px 22px",
        fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
        color: active ? T.bg : T.ink70,
        background: active ? T.ink : "transparent",
        borderRight: `1px solid ${T.ink15}`,
        transition: "background 80ms",
      }}>
      {children}
    </button>
  );
}

function SortControl({ T, sort, setSort }) {
  const opts = [["recent", "Recent"], ["id", "Call no."], ["az", "A–Z"]];
  return (
    <div className="mono" style={{ display: "flex", alignItems: "center", padding: "0 16px", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: T.ink70, borderLeft: `1px solid ${T.ink15}` }}>
      <span style={{ color: T.ink40 }}>Sort:</span>
      {opts.map(([k, l], i) => (
        <button key={k} onClick={() => setSort(k)}
          style={{ all: "unset", cursor: "pointer", marginLeft: 12, color: sort === k ? T.accent : T.ink70 }}>
          {l}
        </button>
      ))}
    </div>
  );
}

function ViewToggle({ T, view, setView }) {
  return (
    <div style={{ display: "flex", borderLeft: `1px solid ${T.ink15}` }}>
      {[
        ["index", "≣"],
        ["card",  "▦"],
        ["table", "⊞"],
      ].map(([v, glyph]) => (
        <button key={v} onClick={() => setView(v)}
          style={{
            all: "unset", cursor: "pointer", padding: "0 18px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, color: view === v ? T.ink : T.ink40,
            background: view === v ? T.ink08 : "transparent",
            borderLeft: `1px solid ${T.ink15}`,
            minWidth: 48,
          }}>
          {glyph}
        </button>
      ))}
    </div>
  );
}

window.Cover = Cover;
window.Controls = Controls;
window.THEMES = THEMES;
window.CATS = CATS;
