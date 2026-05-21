import React from "react";

const isMobileFn = (bp = 768) =>
  typeof window !== "undefined" ? window.innerWidth < bp : false;

const ROLES = [
  {
    company: "Hazelcast",
    title: "Lead Product Designer",
    period: "2020 — Present",
    location: "Remote (Palo Alto HQ)",
    bullets: [
      "Led end-to-end design of two AI-powered distributed computing tools — a real-time stream processing UI and a self-service cloud platform — contributing to a 3× increase in signups within 12 months.",
      "Scaled the design org from 1 to 5: introduced Figma design systems, established async critique processes, and coached new hires.",
      "Partnered with product and engineering leadership to define roadmap priorities, reduce UX debt, and accelerate delivery cadence by 30%.",
      "Introduced customer-centric discovery practices: moderated testing, journey mapping, and segmentation-based feedback loops.",
      "Restructured onboarding flow with marketing — reduced time-to-first-success from 8 minutes to 2.5 minutes.",
    ],
  },
  {
    company: "SourceBreaker (acquired by Bullhorn)",
    title: "Senior Product Designer",
    period: "Oct 2018 — Mar 2020",
    location: "London",
    bullets: [
      "Led design from the ground up for a zero-to-one AI-powered recruitment intelligence platform used by staffing agencies and hiring teams across the UK.",
      "Worked directly with end users — recruiters — through moderated testing, interviews, and pilot rollouts.",
      "Delivered AI-enhanced workflows for candidate sourcing, job matching, and lead generation — contributing to a 24% increase in monthly active users.",
      "Partnered with data scientists to design intuitive NLP-based relevance tuning and search interfaces.",
      "Played a key role in the company's product maturity and design-driven differentiation, leading up to its successful acquisition by Bullhorn.",
    ],
  },
  {
    company: "TalkTalk",
    title: "Lead Product Designer",
    period: "Jan 2014 — Oct 2018",
    location: "London",
    bullets: [
      "Architected TalkTalk's first enterprise design system and component library, enabling faster prototyping and consistent branding across all products.",
      "Oversaw UX for major product initiatives: customer portal revamps, billing interfaces, and parental control tools.",
      "Led a team of designers and researchers; mentored junior talent and built a user-first design culture.",
      "Implemented in-product feedback loops and usability testing that informed iterative improvements post-launch.",
    ],
  },
  {
    company: "TMP Worldwide",
    title: "Lead Product Designer",
    period: "Nov 2012 — Jan 2014",
    location: "London",
    bullets: [
      "Delivered award-winning responsive websites for clients including Jaguar Land Rover, British Transport Police, and GCHQ.",
      "Led concept development and prototyping for new client pitches, securing six-figure accounts through design storytelling.",
      "Coordinated with external dev agencies to ensure fidelity from design to deployment.",
    ],
  },
  {
    company: "Sky",
    title: "Lead Product Designer",
    period: "Apr 2012 — Nov 2012",
    location: "London",
    bullets: [
      "Designed Sky's first responsive web experience, enabling mobile parity during the London Olympics digital rollout.",
      "Collaborated across product and engineering to ship the Sky Plus App, improving viewer retention and app engagement metrics.",
      "Balanced high-visibility project constraints with tight sprint cadences across multiple teams.",
    ],
  },
  {
    company: "Other Creative",
    title: "Lead Product Designer",
    period: "Apr 2010 — Apr 2012",
    location: "London",
    bullets: [
      "Reimagined the web experiences for NatWest and RBS — modern, mobile-first homepages and service flows.",
      "Brought UX research and usability testing practices into agency workflows, improving client satisfaction and delivery accuracy.",
      "Played a key role in client acquisition: presented strategy-led design pitches that expanded agency reach.",
    ],
  },
];

const EDUCATION = [
  { name: "MIT", detail: "Designing and Building AI Products and Services", year: "2023" },
  { name: "City University London", detail: "Advanced JavaScript for Modern Web Applications", year: "2018" },
  { name: "London South Bank University", detail: "BA (Hons) Digital Media Arts", year: "2005 — 2008" },
  { name: "Lambeth College", detail: "Web Design and Animation", year: "2004" },
];

const SKILLS = [
  {
    label: "Design & UX",
    items: ["Figma", "Sketch", "Framer", "Adobe CC", "Design Systems", "Accessibility", "Prototyping", "User Research", "A/B Testing"],
  },
  {
    label: "Development",
    items: ["HTML5", "CSS3", "JavaScript", "React", "SASS", "Bootstrap"],
  },
  {
    label: "Leadership & Process",
    items: ["Design Ops", "Hiring", "Mentorship", "Agile", "Scrum (CSM Certified)"],
  },
];

export default function CVView({ theme }) {
  const T = window.THEMES[theme] || window.THEMES.paper;
  const isMobile = isMobileFn(768);
  const padX = isMobile ? 24 : 48;

  const sectionLabel = (n, name) => (
    <div className="mono" style={{
      fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase",
      color: T.accent, marginBottom: 12,
    }}>
      § {String(n).padStart(2, "0")} / {name}
    </div>
  );

  return (
    <div style={{
      padding: `${isMobile ? 32 : 48}px ${padX}px ${isMobile ? 56 : 80}px`,
      maxWidth: 960, margin: "0 auto",
    }}>
      {/* Header */}
      <header style={{ marginBottom: isMobile ? 40 : 56 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.ink40, marginBottom: 16 }}>
          Curriculum Vitae · Klasa, P. · 2026
        </div>
        <h1 style={{
          fontFamily: "'Inter Tight', sans-serif", fontWeight: 500,
          fontSize: isMobile ? 44 : 64, lineHeight: 0.95,
          letterSpacing: "-0.03em", margin: "0 0 8px", color: T.ink,
        }}>
          Pawel Klasa
        </h1>
        <div className="serif" style={{ fontStyle: "italic", color: T.ink70, fontSize: isMobile ? 18 : 22, marginBottom: 24 }}>
          Senior Product Designer
        </div>
        <div className="mono" style={{ fontSize: 11, color: T.ink70, lineHeight: 1.8, letterSpacing: "0.04em" }}>
          <a href="https://pawel.klasa.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: T.ink, textDecoration: "none", borderBottom: `1px solid ${T.ink40}` }}>pawel.klasa.co.uk</a>
          {" · "}
          <a href="tel:+447816406630" style={{ color: T.ink, textDecoration: "none" }}>+44 78 164 06630</a>
          {" · "}
          <a href="https://www.linkedin.com/in/pawelklasa/" target="_blank" rel="noopener noreferrer" style={{ color: T.ink, textDecoration: "none", borderBottom: `1px solid ${T.ink40}` }}>LinkedIn</a>
          {" · "}
          <a href="mailto:hello@pavka.design" style={{ color: T.ink, textDecoration: "none", borderBottom: `1px solid ${T.ink40}` }}>hello@pavka.design</a>
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: isMobile ? 40 : 56, paddingBottom: isMobile ? 32 : 40, borderBottom: `1px solid ${T.ink15}` }}>
        {sectionLabel(1, "Summary")}
        <p className="serif" style={{ margin: 0, fontSize: isMobile ? 17 : 19, lineHeight: 1.55, color: T.ink }}>
          Experienced product designer with over 12 years of success leading end-to-end design for AI-powered SaaS platforms, cloud-native tools, and enterprise-scale applications. Skilled in strategy, design systems, and cross-functional team leadership. Proven ability to turn complex systems into elegant, user-centric products that drive business growth.
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: isMobile ? 40 : 56 }}>
        {sectionLabel(2, "Experience")}
        <div>
          {ROLES.map((r, i) => (
            <article key={i} style={{
              padding: `${isMobile ? 24 : 28}px 0`,
              borderTop: i === 0 ? `1px solid ${T.ink15}` : "none",
              borderBottom: `1px solid ${T.ink15}`,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
              gap: isMobile ? 12 : 32,
            }}>
              <div className="mono" style={{ fontSize: 11, color: T.ink70, lineHeight: 1.6, letterSpacing: "0.04em" }}>
                <div style={{ color: T.ink }}>{r.period}</div>
                <div style={{ marginTop: 4 }}>{r.location}</div>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Inter Tight', sans-serif", fontWeight: 500,
                  fontSize: isMobile ? 22 : 26, letterSpacing: "-0.01em",
                  color: T.ink, marginBottom: 2,
                }}>
                  {r.company}
                </div>
                <div className="serif" style={{ fontStyle: "italic", color: T.ink70, fontSize: 15, marginBottom: 14 }}>
                  {r.title}
                </div>
                <ul style={{
                  listStyle: "none", padding: 0, margin: 0,
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  {r.bullets.map((b, j) => (
                    <li key={j} className="serif" style={{
                      fontSize: 15, lineHeight: 1.55, color: T.ink,
                      paddingLeft: 18, position: "relative",
                    }}>
                      <span style={{
                        position: "absolute", left: 0, top: "0.6em",
                        width: 8, height: 1, background: T.ink40,
                      }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Education */}
      <section style={{ marginBottom: isMobile ? 40 : 56 }}>
        {sectionLabel(3, "Education & Training")}
        <div>
          {EDUCATION.map((e, i) => (
            <div key={i} style={{
              padding: `${isMobile ? 14 : 18}px 0`,
              borderTop: i === 0 ? `1px solid ${T.ink15}` : "none",
              borderBottom: `1px solid ${T.ink15}`,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "200px 1fr auto",
              gap: isMobile ? 4 : 32, alignItems: "baseline",
            }}>
              <div style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 500, fontSize: 16, color: T.ink }}>
                {e.name}
              </div>
              <div className="serif" style={{ fontSize: 15, color: T.ink70, fontStyle: "italic" }}>
                {e.detail}
              </div>
              <div className="mono" style={{ fontSize: 11, color: T.ink40, letterSpacing: "0.06em" }}>
                {e.year}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section>
        {sectionLabel(4, "Tools & Skills")}
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 18 : 22 }}>
          {SKILLS.map((s, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "200px 1fr",
              gap: isMobile ? 6 : 32,
              paddingTop: isMobile ? 14 : 18, paddingBottom: isMobile ? 14 : 18,
              borderTop: i === 0 ? `1px solid ${T.ink15}` : "none",
              borderBottom: `1px solid ${T.ink15}`,
            }}>
              <div className="mono" style={{ fontSize: 11, color: T.ink70, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {s.label}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 10px" }}>
                {s.items.map((it) => (
                  <span key={it} className="mono" style={{
                    fontSize: 11, color: T.ink, padding: "4px 10px",
                    border: `1px solid ${T.ink15}`, borderRadius: 999,
                    letterSpacing: "0.04em",
                  }}>
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
