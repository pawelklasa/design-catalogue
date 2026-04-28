import React, { useState, useMemo, useEffect } from "react";
import { useEntries } from "./useEntries.js";
import { useGithubContributions } from "./useGithubContributions.js";

const TWEAK_DEFAULTS = {
  theme: "paper",
  view: "index",
  density: "cozy",
  showCover: true,
};

export default function App() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const T = window.THEMES[tweaks.theme] || window.THEMES.paper;

  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("ALL");
  const [sort, setSort] = useState("recent");
  const [open, setOpen] = useState(null);

  const { entries: allEntries } = useEntries();
  const { data: ghData } = useGithubContributions();

  useEffect(() => {
    document.body.style.background = T.bg;
    document.body.style.color = T.ink;
  }, [tweaks.theme, T.bg, T.ink]);

  const filtered = useMemo(() => {
    let list = allEntries.slice();
    if (activeCat !== "ALL") list = list.filter((e) => e.cat === activeCat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((e) => {
        return (
          e.title.toLowerCase().includes(q) ||
          e.short.toLowerCase().includes(q) ||
          (e.body || "").toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          (e.tags || []).some((t) => t.toLowerCase().includes(q))
        );
      });
    }
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "id") list.sort((a, b) => a.id.localeCompare(b.id));
    else list.sort((a, b) => (b.year || 0) - (a.year || 0));
    return list;
  }, [activeCat, query, sort, allEntries]);

  const byCat = useMemo(() => {
    const c = {};
    allEntries.forEach((e) => { c[e.cat] = (c[e.cat] || 0) + 1; });
    return c;
  }, [allEntries]);

  const onJump = (cat) => {
    setActiveCat(cat);
    window.scrollTo({ top: window.innerHeight * 0.6, behavior: "smooth" });
  };

  const Cover = window.Cover;
  const NewsletterCard = window.NewsletterCard;
  const Controls = window.Controls;
  const ContributionGraph = window.ContributionGraph;
  const CardView = window.CardView;
  const TableView = window.TableView;
  const IndexView = window.IndexView;
  const Detail = window.Detail;
  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakSelect = window.TweakSelect;
  const TweakRadio = window.TweakRadio;
  const TweakToggle = window.TweakToggle;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.ink }}>
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "14px 48px",
        borderBottom: `1px solid ${T.ink15}`,
        background: T.bg,
        gap: 24, flexWrap: "wrap",
      }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.ink70, display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span style={{ color: T.ink, fontSize: 11 }}>Klasa, P.</span>
          <span style={{ color: T.ink15 }}>│</span>
          <span style={{ color: T.ink40 }}>Founder</span>
          <a href="https://scoraq.com/info" target="_blank" rel="noreferrer" style={{ color: T.accent, textDecoration: "none", fontWeight: 500, letterSpacing: "0.06em" }}>Scoraq ↗</a>
          <span style={{ color: T.ink15 }}>│</span>
          <span style={{ color: T.ink40 }}>Sr. Designer, Hazelcast</span>
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink70, display: "flex", gap: 18, alignItems: "center" }}>
          <a href="https://github.com/pawelklasa" target="_blank" rel="noreferrer" style={{ color: T.ink70, textDecoration: "none" }}>GitHub ↗</a>
          <a href="https://medium.com/@pawel.klasa" target="_blank" rel="noreferrer" style={{ color: T.ink70, textDecoration: "none" }}>Medium ↗</a>
          <a href="https://pavka.design" target="_blank" rel="noreferrer" style={{ color: T.ink70, textDecoration: "none" }}>pavka.design ↗</a>
          <span style={{ color: T.ink15 }}>│</span>
          <a href="mailto:hello@pavka.design" style={{ color: T.ink, textDecoration: "none" }}>hello@pavka.design</a>
        </div>
      </header>

      {tweaks.showCover && Cover && (
        <Cover theme={tweaks.theme} total={allEntries.length} byCat={byCat} onJump={onJump} ghData={ghData} />
      )}

      {tweaks.showCover && NewsletterCard && (
        <NewsletterCard theme={tweaks.theme} variant="band" />
      )}

      <Controls
        theme={tweaks.theme}
        query={query} setQuery={setQuery}
        activeCat={activeCat} setActiveCat={setActiveCat}
        view={tweaks.view} setView={(v) => setTweak("view", v)}
        sort={sort} setSort={setSort}
        total={allEntries.length} shown={filtered.length}
      />

      {activeCat !== "ALL" && activeCat !== "FEED" && (
        <div style={{ padding: "32px 48px 8px", borderBottom: `1px solid ${T.ink08}` }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, marginBottom: 8 }}>
            § {activeCat}
          </div>
          <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 32, letterSpacing: "-0.02em", color: T.ink }}>
            {window.CATS[activeCat].label}
          </div>
          <div className="serif" style={{ fontStyle: "italic", color: T.ink70, marginTop: 6, fontSize: 15 }}>
            {window.CATS[activeCat].desc}
          </div>
        </div>
      )}

      {activeCat === "FEED" && ContributionGraph && (
        <div style={{ padding: "40px 48px 56px", borderBottom: `1px solid ${T.ink15}` }}>
          <ContributionGraph theme={tweaks.theme} data={ghData} />
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ padding: "120px 48px", textAlign: "center", color: T.ink40 }} className="mono">
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            no records · ({String(filtered.length).padStart(3, "0")} ⁄ {String(allEntries.length).padStart(3, "0")})
          </div>
        </div>
      ) : tweaks.view === "card" ? (
        <CardView entries={filtered} theme={tweaks.theme} onOpen={setOpen} />
      ) : tweaks.view === "table" ? (
        <TableView entries={filtered} theme={tweaks.theme} onOpen={setOpen} />
      ) : (
        <IndexView entries={filtered} theme={tweaks.theme} onOpen={setOpen} density={tweaks.density} />
      )}

      <footer style={{
        marginTop: 80,
        borderTop: `1px solid ${T.ink15}`,
        padding: "40px 48px 60px",
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32,
      }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink40, lineHeight: 1.8 }}>
          <div style={{ color: T.ink, marginBottom: 4 }}>Colophon</div>
          Set in Inter Tight & JetBrains Mono.<br />
          Body text in Source Serif 4.<br />
          Composed in HTML.
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink40, lineHeight: 1.8 }}>
          <div style={{ color: T.ink, marginBottom: 4 }}>Terms</div>
          All entries CC BY-SA 4.0.<br />
          Tools as marked, mostly MIT.<br />
          Contact for commercial work.
        </div>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink40, lineHeight: 1.8, textAlign: "right" }}>
          <div style={{ color: T.ink, marginBottom: 4 }}>Errata</div>
          Last revised Apr 2026.<br />
          Maintained by the author.<br />
          <span style={{ color: T.accent }}>Always in print.</span>
        </div>
      </footer>

      {Detail && <Detail entry={open} theme={tweaks.theme} onClose={() => setOpen(null)} allEntries={filtered} />}

      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Display">
            <TweakSelect label="Theme" value={tweaks.theme} onChange={(v) => setTweak("theme", v)}
              options={[["paper", "Paper · cool blue"], ["sage", "Sage"], ["blush", "Blush"], ["ochre", "Ochre"], ["cream", "Cream"], ["ink", "Ink · dark"], ["blueprint", "Blueprint"]]} />
            <TweakRadio label="View" value={tweaks.view} onChange={(v) => setTweak("view", v)}
              options={[["index", "Index"], ["card", "Cards"], ["table", "Table"]]} />
            <TweakRadio label="Density" value={tweaks.density} onChange={(v) => setTweak("density", v)}
              options={[["compact", "Compact"], ["cozy", "Cozy"], ["archival", "Archival"]]} />
            <TweakToggle label="Show cover & manifesto" value={tweaks.showCover} onChange={(v) => setTweak("showCover", v)} />
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
}
