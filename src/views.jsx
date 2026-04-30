import React from "react";
/* global React */
const { useState: useStateE, useEffect: useEffectE } = React;

// Tracks viewport width to switch detail view between mobile full-page and desktop drawer.
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useStateE(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffectE(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    setIsMobile(mq.matches);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, [breakpoint]);
  return isMobile;
}

// ============================================================
// INDEX VIEW — Swiss archive, one row per entry
// ============================================================
function IndexView({ entries, theme, onOpen, density }) {
  const T = window.THEMES[theme];
  const isMobile = (window.useBreakpoint || (() => false))(768);
  const isNarrow = (window.useBreakpoint || (() => false))(560);
  const padX = isNarrow ? 20 : isMobile ? 28 : 48;
  const pad = density === "compact" ? "10px 0" : density === "archival" ? "22px 0" : "16px 0";

  if (isMobile) {
    return (
      <div>
        {entries.map((e) => (
          <button key={e.id} onClick={() => onOpen(e)} className="entryrow"
            style={{
              all: "unset", cursor: "pointer", display: "block", width: "100%",
              borderBottom: `1px solid ${T.ink08}`,
              boxSizing: "border-box",
              padding: `${density === "compact" ? 12 : 18}px ${padX}px`,
            }}>
            <div className="mono" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, fontSize: 10, letterSpacing: "0.06em", color: T.ink40 }}>
              <span>{e.id}</span>
              <span style={{ color: T.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>{e.cat}</span>
            </div>
            <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 17, color: T.ink, letterSpacing: "-0.01em", lineHeight: 1.25 }}>
              {e.title}
            </div>
            {density !== "compact" && e.short && (
              <div style={{ color: T.ink70, fontSize: 13, marginTop: 4, lineHeight: 1.4 }}>
                {e.short}
              </div>
            )}
            <div className="mono" style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: T.ink40, letterSpacing: "0.04em" }}>
              <span style={{ flex: 1, marginRight: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {(e.tags || []).slice(0, 3).join(" · ")}
              </span>
              <span style={{ whiteSpace: "nowrap" }}>{e.when || e.year}{e.status && ` · ${e.status}`}</span>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* Header row */}
      <div className="mono" style={{
        display: "grid",
        gridTemplateColumns: "120px 90px 1fr 200px 120px",
        gap: 24,
        padding: `12px ${padX}px`,
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
            gap: 24, padding: `${pad.split(" ")[0]} ${padX}px`,
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
  const isMobile = (window.useBreakpoint || (() => false))(560);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 0,
      borderTop: `1px solid ${T.ink15}`,
      borderLeft: isMobile ? "none" : `1px solid ${T.ink15}`,
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
    <div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
    <table className="mono" style={{
      width: "100%",
      minWidth: 720,
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
    </div>
  );
}

// ============================================================
// DETAIL OVERLAY — Full record card
// Desktop: right-side drawer. Mobile (<768px): full-screen page.
// ============================================================
function Detail({ entry, theme, onClose, allEntries }) {
  const T = window.THEMES[theme];
  const isMobile = useIsMobile();

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

  // Sync open record with URL hash so the device back button closes the article
  // on mobile (and the URL is shareable on desktop).
  useEffectE(() => {
    if (!entry) return;
    const target = `#/r/${entry.id}`;
    if (window.location.hash !== target) {
      window.history.pushState(null, "", target);
    }
    const onPop = () => onClose();
    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      // If we still own the hash, clear it without adding history.
      if (window.location.hash.startsWith("#/r/")) {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
  }, [entry, onClose]);

  if (!entry) return null;

  const idx = allEntries.findIndex((x) => x.id === entry.id);
  const total = allEntries.length;

  // Layout-derived sizing
  const padX = isMobile ? 20 : 64;
  const padTop = isMobile ? 24 : 56;
  const padBottom = isMobile ? 96 : 96;
  const titleSize = isMobile ? "clamp(28px, 8vw, 36px)" : "clamp(40px, 5vw, 64px)";
  const shortSize = isMobile ? 16 : 20;
  const bodyMaxWidth = isMobile ? "100%" : "100%";
  const metaCols = isMobile ? "1fr" : "180px 1fr";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "#ffffff",
        animation: "fadein 120ms ease-out",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#ffffff",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            background: "#ffffff",
            borderBottom: `1px solid ${T.ink15}`,
            padding: isMobile ? "14px 20px" : "16px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          {isMobile ? (
            <button
              onClick={onClose}
              className="mono"
              style={{
                all: "unset",
                cursor: "pointer",
                fontSize: 11,
                color: T.ink,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              ← Back
            </button>
          ) : (
            <div
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: T.ink40,
              }}
            >
              Record {String(idx + 1).padStart(3, "0")} of{" "}
              {String(total).padStart(3, "0")}
            </div>
          )}
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: T.ink40,
            }}
          >
            {isMobile
              ? `${String(idx + 1).padStart(3, "0")} / ${String(total).padStart(3, "0")}`
              : null}
          </div>
          {!isMobile && (
            <button
              onClick={onClose}
              className="mono"
              style={{
                all: "unset",
                cursor: "pointer",
                fontSize: 11,
                color: T.ink70,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              close ✕{" "}
              <span style={{ color: T.ink40, marginLeft: 6 }}>(esc)</span>
            </button>
          )}
        </div>

        <div style={{ padding: `${padTop}px ${padX}px ${padBottom}px`, maxWidth: 960, margin: "0 auto" }}>
          {/* Call no. block */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: isMobile ? 16 : 32,
              alignItems: "baseline",
              paddingBottom: isMobile ? 20 : 28,
              borderBottom: `1px solid ${T.ink15}`,
              marginBottom: isMobile ? 24 : 32,
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: T.ink70,
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  color: T.ink40,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Call no.
              </div>
              {entry.id}
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: T.accent,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textAlign: "right",
              }}
            >
              {window.CATS[entry.cat].label}
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 500,
              fontSize: titleSize,
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              margin: 0,
              color: T.ink,
              wordBreak: "break-word",
            }}
          >
            {entry.title}
          </h1>
          <p
            style={{
              fontSize: shortSize,
              lineHeight: 1.45,
              color: T.ink70,
              marginTop: 14,
              marginBottom: isMobile ? 28 : 36,
              fontFamily: "'Inter Tight', sans-serif",
            }}
          >
            {entry.short}
          </p>

          {/* Body */}
          <div
            className="serif medium-body"
            style={{
              fontSize: isMobile ? 16 : 18,
              lineHeight: 1.65,
              color: T.ink,
              marginBottom: 40,
              maxWidth: bodyMaxWidth,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {(entry.source === "medium" || entry.source === "rich") && entry.body ? (
              <div dangerouslySetInnerHTML={{ __html: entry.body }} />
            ) : (
              entry.body
            )}
          </div>

          {/* Metadata table */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: metaCols,
              borderTop: `1px solid ${T.ink15}`,
            }}
          >
            {[
              ["Year", entry.year],
              entry.when && ["Recorded", entry.when],
              entry.status && ["Status", entry.status],
              entry.company && ["Company", entry.company],
              entry.role && ["Role", entry.role],
              entry.tags && ["Tags", entry.tags.join(" · ")],
              entry.metrics && [
                "Metrics",
                entry.metrics.map(([k, v]) => `${k}: ${v}`).join("  /  "),
              ],
              entry.refs && [
                "References",
                (
                  <span>
                    {entry.refs.map((r, i) => {
                      const isUrl = /^https?:\/\//i.test(r);
                      return (
                        <React.Fragment key={i}>
                          {i > 0 && "  /  "}
                          {isUrl ? (
                            <a
                              href={r}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: T.accent,
                                textDecoration: "underline",
                              }}
                            >
                              {r}
                            </a>
                          ) : (
                            r
                          )}
                        </React.Fragment>
                      );
                    })}
                  </span>
                ),
              ],
              entry.download && ["File", `${entry.download} (${entry.size})`],
            ]
              .filter(Boolean)
              .map(([k, v]) => (
                <React.Fragment key={k}>
                  <div
                    className="mono"
                    style={{
                      padding: isMobile ? "10px 0 4px" : "12px 0",
                      fontSize: 10,
                      color: T.ink40,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      borderBottom: isMobile ? "none" : `1px solid ${T.ink08}`,
                    }}
                  >
                    {k}
                  </div>
                  <div
                    className="mono"
                    style={{
                      padding: isMobile ? "0 0 12px" : "12px 0",
                      fontSize: 12,
                      color: T.ink,
                      borderBottom: `1px solid ${T.ink08}`,
                      letterSpacing: "0.02em",
                      wordBreak: "break-word",
                    }}
                  >
                    {v}
                  </div>
                </React.Fragment>
              ))}
          </div>

          {/* Action */}
          {entry.download && (
            <button
              className="mono"
              style={{
                all: "unset",
                cursor: "pointer",
                marginTop: 36,
                padding: "16px 24px",
                background: T.ink,
                color: T.bg,
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
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
