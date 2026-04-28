import React from "react";
/* global React */
const { useState: useStateN } = React;

function NewsletterCard({ theme, variant }) {
  const T = window.THEMES[theme];
  const [email, setEmail] = useStateN("");
  const [submitted, setSubmitted] = useStateN(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setSubmitted(true);
    }
  };

  if (variant === "inline") {
    // For embedding in cover left column
    return (
      <div style={{
        marginTop: 28,
        paddingTop: 20,
        borderTop: `1px solid ${T.ink15}`,
      }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, marginBottom: 6 }}>
          § Subscribe
        </div>
        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 17, color: T.ink, letterSpacing: "-0.01em", lineHeight: 1.3, marginBottom: 14, maxWidth: 380 }}>
          A weekly dispatch from Pav. New entries, half-finished thoughts, the occasional rant.
        </div>
        {submitted ? (
          <div className="mono" style={{ fontSize: 11, color: T.accent, letterSpacing: "0.06em", padding: "12px 0" }}>
            ✓ Subscribed. First issue lands Monday.
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "flex", borderTop: `1px solid ${T.ink}`, borderBottom: `1px solid ${T.ink}` }}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                all: "unset", flex: 1,
                padding: "12px 0",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: T.ink,
                caretColor: T.accent,
              }}
            />
            <button type="submit" className="mono" style={{
              all: "unset", cursor: "pointer",
              padding: "12px 16px",
              fontSize: 10, color: T.bg, background: T.ink,
              letterSpacing: "0.12em", textTransform: "uppercase",
            }}>Subscribe →</button>
          </form>
        )}
        <div className="mono" style={{ fontSize: 9, color: T.ink40, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 10 }}>
          Weekly · No tracking · Unsubscribe anytime
        </div>
      </div>
    );
  }

  // Compact band variant — single-row strip, not a giant section
  return (
    <section style={{
      borderBottom: `1px solid ${T.ink15}`,
      padding: "18px 48px",
      display: "flex",
      alignItems: "center",
      gap: 32,
      flexWrap: "wrap",
      background: T.card,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, flex: "1 1 auto", minWidth: 280 }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, whiteSpace: "nowrap" }}>
          § Newsletter
        </span>
        <span style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 16, color: T.ink, letterSpacing: "-0.005em" }}>
          A weekly dispatch.
        </span>
        <span className="serif" style={{ fontSize: 13, color: T.ink70, fontStyle: "italic" }}>
          New entries, half-finished thoughts. Mondays.
        </span>
      </div>

      {submitted ? (
        <div className="mono" style={{ fontSize: 11, color: T.accent, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ✓ Subscribed — first issue Monday
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: "flex", border: `1px solid ${T.ink}`, minWidth: 320 }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{
              all: "unset", flex: 1,
              padding: "10px 14px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, color: T.ink,
              caretColor: T.accent,
            }}
          />
          <button type="submit" className="mono" style={{
            all: "unset", cursor: "pointer",
            padding: "0 18px",
            fontSize: 10, color: T.bg, background: T.ink,
            letterSpacing: "0.12em", textTransform: "uppercase",
            display: "flex", alignItems: "center",
          }}>Subscribe →</button>
        </form>
      )}
    </section>
  );
}

window.NewsletterCard = NewsletterCard;
