import React from "react";
/* global React */
const { useState: useStateE, useEffect: useEffectE } = React;

// ============================================================
// INDEX VIEW — Swiss archive, one row per entry
// ============================================================
function IndexView({ entries, theme, onOpen, density }) {
  const T = window.THEMES[theme];
  const pad = density === "compact" ? "10px 0" : density === "archival" ? "22px 0" : "16px 0";

  return (
    <div>
      {/* Header row */}
      <div className="mono" style={{
        display: "grid",
        gridTemplateColumns: "120px 90px 1fr 200px 120px",
        gap: 24,
        padding: "12px 48px",
        fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
        color: T.ink40,
        borderBottom: `1px solid ${T.ink15}`,
      }}>
        <span>Call no.</span>
        <span>Cat.</span>
        <span>Title</span>
        <span>Tags</span>
        <span style={{ textAlign: "right" }}>Year ⁄ Status</span>
      </div>

      {entries.map((e, i) => (
        <button key={e.id} onClick={() => onOpen(e)} className="entryrow"
          style={{
            all: "unset", cursor: "pointer", display: "block", width: "100%",
            borderBottom: `1px solid ${T.ink08}`,
          }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "120px 90px 1fr 200px 120px",
            gap: 24, padding: `${pad.split(" ")[0]} 48px`,
            alignItems: "baseline",
          }}>
            <span className="mono" style={{ fontSize: 11, color: T.ink70, letterSpacing: "0.04em" }}>{e.id}</span>
            <span className="mono" style={{ fontSize: 10, color: T.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{e.cat}</span>
            <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: density === "compact" ? 16 : 19, color: T.ink, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
              {e.title}
              {density !== "compact" && (
                <span style={{ color: T.ink70, fontSize: 13, fontWeight: 400, display: "block", marginTop: 4, lineHeight: 1.4 }}>
                  {e.short}
                </span>
              )}
            </span>
            <span className="mono" style={{ fontSize: 10, color: T.ink40, letterSpacing: "0.04em", lineHeight: 1.5 }}>
              {(e.tags || []).slice(0, 4).join(" · ")}
            </span>
            <span className="mono" style={{ fontSize: 11, color: T.ink70, textAlign: "right", letterSpacing: "0.04em" }}>
              {e.when || e.year}
              {e.status && <div style={{ color: T.ink40, fontSize: 10, marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{e.status}</div>}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ============================================================
// CARD VIEW — Index card grid
// ============================================================
function CardView({ entries, theme, onOpen }) {
  const T = window.THEMES[theme];
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 0,
      borderTop: `1px solid ${T.ink15}`,
      borderLeft: `1px solid ${T.ink15}`,
    }}>
      {entries.map((e) => (
        <button key={e.id} onClick={() => onOpen(e)} className="cardcell"
          style={{
            all: "unset", cursor: "pointer", display: "block",
            padding: "24px 24px 28px",
            borderRight: `1px solid ${T.ink15}`,
            borderBottom: `1px solid ${T.ink15}`,
            background: T.card,
            minHeight: 220,
          }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <span className="mono" style={{ fontSize: 10, color: T.ink70, letterSpacing: "0.06em" }}>{e.id}</span>
            <span className="mono" style={{ fontSize: 10, color: T.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{e.cat}</span>
          </div>
          <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 21, color: T.ink, letterSpacing: "-0.015em", lineHeight: 1.18, marginBottom: 12 }}>
            {e.title}
          </div>
          <div style={{ fontSize: 13, color: T.ink70, lineHeight: 1.45, marginBottom: 20 }}>
            {e.short}
          </div>
          <div className="mono" style={{ fontSize: 10, color: T.ink40, letterSpacing: "0.04em", display: "flex", justifyContent: "space-between", borderTop: `1px solid ${T.ink08}`, paddingTop: 12 }}>
            <span>{(e.tags || []).slice(0, 3).join(" · ")}</span>
            <span>{e.when || e.year}</span>
          </div>
        </button>
      ))}
    </div>
  );
}

// ============================================================
// TABLE VIEW — densest possible, for power users
// ============================================================
function TableView({ entries, theme, onOpen }) {
  const T = window.THEMES[theme];
  return (
    <table className="mono" style={{
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 11,
      color: T.ink70,
      letterSpacing: "0.02em",
    }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${T.ink15}` }}>
          {["#", "Call no.", "Cat.", "Title", "Tags", "Year", "Status"].map((h, i) => (
            <th key={h} style={{ textAlign: "left", padding: "12px 16px", color: T.ink40, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 400 }}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {entries.map((e, i) => (
          <tr key={e.id} onClick={() => onOpen(e)}
            style={{ borderBottom: `1px solid ${T.ink08}`, cursor: "pointer" }}
            className="trow">
            <td style={{ padding: "10px 16px", color: T.ink40 }}>{String(i + 1).padStart(3, "0")}</td>
            <td style={{ padding: "10px 16px", color: T.ink, letterSpacing: "0.04em" }}>{e.id}</td>
            <td style={{ padding: "10px 16px", color: T.accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>{e.cat}</td>
            <td style={{ padding: "10px 16px", color: T.ink, fontFamily: "'Inter Tight', sans-serif", fontSize: 14, letterSpacing: "-0.005em" }}>{e.title}</td>
            <td style={{ padding: "10px 16px", color: T.ink40 }}>{(e.tags || []).slice(0, 3).join(" · ")}</td>
            <td style={{ padding: "10px 16px" }}>{e.when || e.year}</td>
            <td style={{ padding: "10px 16px", color: T.ink40, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 10 }}>{e.status || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ============================================================
// DETAIL OVERLAY — Full record card
// ============================================================
function Detail({ entry, theme, onClose, allEntries }) {
  const T = window.THEMES[theme];

  useEffectE(() => {
    if (!entry) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [entry, onClose]);

  if (!entry) return null;

  const idx = allEntries.findIndex((x) => x.id === entry.id);
  const total = allEntries.length;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.4)",
      display: "flex", justifyContent: "flex-end",
      animation: "fadein 120ms ease-out",
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(720px, 92vw)",
          height: "100vh",
          background: T.bg,
          borderLeft: `1px solid ${T.ink15}`,
          overflow: "auto",
          animation: "slidein 180ms cubic-bezier(0.2,0.8,0.2,1)",
        }}>
        {/* Top bar */}
        <div style={{
          position: "sticky", top: 0, zIndex: 1,
          background: T.bg,
          borderBottom: `1px solid ${T.ink15}`,
          padding: "16px 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink40 }}>
            Record {String(idx + 1).padStart(3, "0")} of {String(total).padStart(3, "0")}
          </div>
          <button onClick={onClose} className="mono"
            style={{ all: "unset", cursor: "pointer", fontSize: 11, color: T.ink70, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            close ✕ <span style={{ color: T.ink40, marginLeft: 6 }}>(esc)</span>
          </button>
        </div>

        <div style={{ padding: "44px 48px 80px" }}>
          {/* Call no. block */}
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "baseline", paddingBottom: 28, borderBottom: `1px solid ${T.ink15}`, marginBottom: 32 }}>
            <div className="mono" style={{ fontSize: 11, color: T.ink70, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
              <div style={{ color: T.ink40, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Call no.</div>
              {entry.id}
            </div>
            <div className="mono" style={{ fontSize: 10, color: T.accent, letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "right" }}>
              {window.CATS[entry.cat].label}
            </div>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: 44, lineHeight: 1.04, letterSpacing: "-0.025em", margin: 0, color: T.ink }}>
            {entry.title}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.45, color: T.ink70, marginTop: 18, marginBottom: 36, fontFamily: "'Inter Tight', sans-serif" }}>
            {entry.short}
          </p>

          {/* Body */}
          <div className="serif" style={{ fontSize: 16, lineHeight: 1.55, color: T.ink, marginBottom: 40, maxWidth: 580 }}>
            {entry.source === "medium" && entry.body
              ? <div dangerouslySetInnerHTML={{ __html: entry.body }} />
              : entry.body}
          </div>

          {/* Metadata table */}
          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderTop: `1px solid ${T.ink15}` }}>
            {[
              ["Year", entry.year],
              entry.when && ["Recorded", entry.when],
              entry.status && ["Status", entry.status],
              entry.company && ["Company", entry.company],
              entry.role && ["Role", entry.role],
              entry.tags && ["Tags", entry.tags.join(" · ")],
              entry.metrics && ["Metrics", entry.metrics.map(([k, v]) => `${k}: ${v}`).join("  /  ")],
              entry.refs && ["References", (
                <span>
                  {entry.refs.map((r, i) => {
                    const isUrl = /^https?:\/\//i.test(r);
                    return (
                      <React.Fragment key={i}>
                        {i > 0 && "  /  "}
                        {isUrl
                          ? <a href={r} target="_blank" rel="noopener noreferrer" style={{ color: T.accent, textDecoration: "underline" }}>{r}</a>
                          : r}
                      </React.Fragment>
                    );
                  })}
                </span>
              )],
              entry.download && ["File", `${entry.download} (${entry.size})`],
            ].filter(Boolean).map(([k, v]) => (
              <React.Fragment key={k}>
                <div className="mono" style={{
                  padding: "12px 0",
                  fontSize: 10, color: T.ink40,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  borderBottom: `1px solid ${T.ink08}`,
                }}>{k}</div>
                <div className="mono" style={{
                  padding: "12px 0",
                  fontSize: 12, color: T.ink,
                  borderBottom: `1px solid ${T.ink08}`,
                  letterSpacing: "0.02em",
                  wordBreak: "break-word",
                }}>{v}</div>
              </React.Fragment>
            ))}
          </div>

          {/* Action */}
          {entry.download && (
            <button className="mono" style={{
              all: "unset", cursor: "pointer", marginTop: 36,
              padding: "16px 24px",
              background: T.ink, color: T.bg,
              fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              ↓ Download {entry.download}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

window.IndexView = IndexView;
window.CardView = CardView;
window.TableView = TableView;
window.Detail = Detail;
