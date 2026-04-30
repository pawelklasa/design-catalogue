import React from "react";
// Catalog data — Pav Klasa's public catalog
// Categories: WORK | ATOM | METHOD | TOOL | DEAD | WRITING | FEED

const ENTRIES = [
  // ========== WORK (case studies) ==========
  {
    id: "PVK-20-SB2", cat: "WORK", year: 2020, status: "shipped",
    source: "rich",
    title: "SourceBreaker 2.0",
    short: "Revolutionary ML search transformation that made SourceBreaker the recruiting industry's intelligence leader, serving thousands of users across six countries.",
    tags: ["product-design-lead", "ml", "search", "saas", "b2b", "design-system"],
    company: "SourceBreaker",
    role: "Product Design Lead",
    body: `
<h3>Revolutionary ML Search Platform</h3>
<p>SourceBreaker 2.0 introduced comprehensive Machine Learning features that transformed how users discovered and interacted with content.</p>

<figure>
  <img src="/case-studies/sourcebreaker/screens-grid.webp" alt="SourceBreaker 2.0 platform — login, intel, search results and detailed job description across four screens" />
</figure>

<h3>Project Overview</h3>
<h4>Challenge &amp; Vision</h4>
<p>In 2020, SourceBreaker faced a critical moment. While our existing search technology was functional, it lacked the sophistication needed to compete with emerging Machine Learning solutions. Through extensive market research and user-behaviour analysis, I identified that users expected intelligent capabilities that could understand search intent, not just match keywords.</p>

<h4>Strategy &amp; Execution</h4>
<p>I proposed a transformative platform initiative that would position SourceBreaker as the industry's first AI-driven recruitment intelligence platform. By integrating ML throughout every system layer, we created an architecture that could scale across the most demanding markets while maintaining the precision and accuracy our users demanded.</p>

<h3>Global Expansion &amp; Impact</h3>
<h4>International Market Penetration</h4>
<p>SourceBreaker 2.0's launch marked the beginning of unprecedented growth and international recognition.</p>
<ul>
  <li><strong>European markets</strong> — Strongest expansion across the UK and Continental Europe.</li>
  <li><strong>North American growth</strong> — Rapid user acquisition in the competitive US market.</li>
  <li><strong>Asia-Pacific presence</strong> — Successful launch in Australia, New Zealand and South Africa.</li>
</ul>

<h3>Platform Interface Evolution</h3>
<p>Comprehensive interface redesign showcasing advanced search capabilities, candidate management, and intelligent ML-powered features.</p>

<h4>Intelligent Search Results</h4>
<p>The advanced search interface demonstrates SourceBreaker's ML-powered candidate discovery system. Featuring sophisticated filtering, real-time results, and comprehensive candidate profiles with experience tracking and qualification assessment.</p>

<h4>Comprehensive Candidate Dashboard</h4>
<p>The complete management dashboard showcases real-time search capabilities with intelligent candidate discovery, new-candidate alerts, and streamlined workflow management for efficient talent-acquisition processes.</p>

<figure>
  <img src="/case-studies/sourcebreaker/dashboard.webp" alt="SourceBreaker dashboard with My Searches list and ML-powered candidate analytics callout" />
</figure>

<h4>Complete Platform Architecture</h4>
<p>A view of SourceBreaker's interface ecosystem: from secure authentication to detailed candidate search, job-matching algorithms, and comprehensive candidate-profile management — demonstrating the platform's end-to-end experience.</p>

<h3>Interface Mockups &amp; Application</h3>
<p>Professional interface mockups demonstrating SourceBreaker's sophisticated platform design across multiple screens and use cases.</p>

<h4>Multi-Screen Platform Experience</h4>
<p>Comprehensive platform-interface demonstration showcasing the multi-screen experience across recruiter workflows. The redesign streamlined intelligent search results with candidate-discovery capabilities, while the new screens showcased detailed company profiles and candidate analytics — designed for efficiency in recruitment workflows across multiple-member teams.</p>

<figure>
  <img src="/case-studies/sourcebreaker/mockup-laptops.webp" alt="Two-laptop mockup: My Searches alongside SmartLife company profile" />
</figure>

<h4>Advanced Candidate Profile Management</h4>
<p>Sophisticated candidate-profile interfaces showcasing SourceBreaker's ML-powered candidate-analysis system. Detailed candidate-information management with comprehensive skill assessment, experience tracking, and intelligent matching algorithms that help recruiters make informed decisions.</p>

<h3>Design Process &amp; System</h3>
<p>Comprehensive design methodology from initial wireframes through user-journey mapping to a complete design system that scales across the entire platform.</p>

<h4>Conceptual Wireframes &amp; Information Architecture</h4>
<p>Early-stage wireframe explorations showcasing the comprehensive information architecture for SourceBreaker. These wireframes demonstrate the planning process for complex search interfaces, candidate-management systems, job-listing structures, and company database organization — laying the foundation for the ML-powered platform.</p>

<h4>User Journey &amp; Flow Architecture</h4>
<p>Strategic user-journey mapping showing the interconnected flow between authentication, search functionality, candidate discovery, and platform features. This visualization demonstrates how users navigate through SourceBreaker's components — from sign-in through advanced ML-powered candidate-search capabilities.</p>

<h4>Initial Design Exploration &amp; Sketching</h4>
<p>Behind-the-scenes look at the foundational design process for SourceBreaker 2.0. Authentic design sketches, wireframes, and detailed mockups capture the creative process from initial-concept exploration through detailed-interface planning, hand-drawn wireframes, user-flow diagrams, and interface layouts.</p>

<figure>
  <img src="/case-studies/sourcebreaker/sketches.webp" alt="Whiteboard and paper sketches: information architecture, user flows, and screen wireframes" />
</figure>

<h4>Comprehensive Design System</h4>
<p>A complete design-system architecture featuring SourceBreaker's visual identity, comprehensive colour palettes, typography hierarchy, form elements, interactive elements and reusable components. This systematic approach ensured consistent user experience across all platform features while maintaining the professional aesthetic required for enterprise-level recruitment technology.</p>

<figure>
  <img src="/case-studies/sourcebreaker/design-system.webp" alt="Sonar design system: typography, colour, forms, buttons, segmented controls, iconography, onboarding, action bars" />
</figure>

<h3>Design Process Excellence</h3>
<ul>
  <li><strong>Information Architecture</strong> — Systematic wireframe exploration establishing complex data relationships, search hierarchies, and candidate-management workflows for enterprise-scale recruitment technology.</li>
  <li><strong>User Experience Flow</strong> — Strategic user-journey mapping connecting authentication, search discovery, candidate management, and ML features in a cohesive user experience that scales globally.</li>
  <li><strong>System Scalability</strong> — Comprehensive design system with consistent colour palettes, typography, forms, and components — enabling rapid deployment across international markets.</li>
</ul>

<h3>Machine Learning Innovation</h3>
<p>SourceBreaker 2.0 introduced groundbreaking ML algorithms that revolutionized how users discover and interact with content through intelligent search capabilities.</p>

<h4>Advanced Search Intelligence</h4>
<ul>
  <li><strong>Semantic understanding</strong> — Advanced ML models that understand user intent beyond simple keyword matching.</li>
  <li><strong>Adaptive learning</strong> — Self-improving algorithms that learn from user behaviour and continuously enhance recommendations.</li>
  <li><strong>Performance optimization</strong> — Intelligent caching and result-prioritization for fast, contextual search.</li>
  <li><strong>Predictive suggestions</strong> — Real-time query enhancements powered by ML models.</li>
  <li><strong>Content analysis</strong> — Deep content understanding through ML-powered categorization and relevance-scoring.</li>
  <li><strong>Multi-language support</strong> — Cross-language search capabilities for global teams.</li>
</ul>

<h4>Scalable ML Architecture</h4>
<ul>
  <li><strong>Distributed processing</strong> — Cloud-native architecture supporting thousands of concurrent users.</li>
  <li><strong>Real-time updates</strong> — Live search results that adapt to changing data patterns.</li>
  <li><strong>API integration</strong> — RESTful APIs enabling seamless integration with enterprise systems.</li>
  <li><strong>Data security</strong> — Enterprise-grade encryption and privacy protection for sensitive recruitment data.</li>
  <li><strong>User experience innovation</strong> — Personalized interfaces, accessibility-first design, intuitive workflows.</li>
</ul>

<h3>Industry Recognition</h3>
<ul>
  <li><strong>Privacy List Top 100</strong> — Recognition as one of the fastest-growing European startups, highlighting SourceBreaker's exceptional market performance and technological innovation in the competitive ML-search landscape.</li>
  <li><strong>Sunday Times Best Small Company to Work For</strong> — Recognition acknowledging SourceBreaker's exceptional workplace culture, employee satisfaction, and innovative approach to building high-performing teams.</li>
</ul>

<h3>Platform Success Metrics</h3>
<ul>
  <li><strong>Thousands</strong> of active users across international markets.</li>
  <li><strong>6 countries</strong> served with localized recruitment technology.</li>
  <li><strong>Industry leader</strong> in ML-powered search and recruitment intelligence.</li>
</ul>

<h3>Impact &amp; Results</h3>
<p>SourceBreaker 2.0's transformation redefined the platform as the industry leader in Machine Learning search technology — with exceptional performance metrics that demonstrated both technical excellence and remarkable business impact.</p>
<ul>
  <li><strong>200%</strong> increase in search productivity through ML-powered candidate discovery.</li>
  <li><strong>90%</strong> increase in user satisfaction with the new intelligent platform experience.</li>
  <li><strong>500%</strong> ROI for organisations using SourceBreaker's ML-powered recruitment intelligence.</li>
</ul>
`,
    metrics: [
      ["Increase in search productivity", "200%"],
      ["User satisfaction increase", "90%"],
      ["ROI for organisations", "500%"],
      ["Countries served", "6"],
      ["Industry recognition", "Sunday Times · Privacy List Top 100"],
    ],
  },
  {
    id: "PVK-26-000", cat: "WORK", year: 2026, status: "live",
    title: "Scoraq — Bridge the gap between ideas and execution",
    short: "Founder & designer. A working operating system for product teams turning brief into ship.",
    tags: ["founder", "saas", "product", "0→1"],
    body: "Most product teams have plenty of ideas and plenty of tickets — and a chasm in between. Scoraq sits in that chasm. It's a workspace that holds a brief, an exploration, a decision, and the work that follows it as one continuous artefact rather than four disconnected ones. Built on the conviction that the document is the team, not the meeting. Designing it, founding it, shipping it.",
    metrics: [["Stage", "Live"], ["Role", "Founder · Design lead"], ["Domain", "scoraq.com"]],
    company: "Scoraq",
    role: "Founder",
    refs: ["scoraq.com/info"],
  },
  {
    id: "PVK-24-001", cat: "WORK", year: 2024, status: "shipped",
    title: "Hazelcast Management Center — Cluster Topology",
    short: "Real-time spatial view of a distributed in-memory data grid. 40k+ partitions, sub-second updates.",
    tags: ["enterprise", "data-viz", "react", "websocket"],
    body: "Replaced a tabular member list with a force-directed graph rendering the live partition table. The hard problem wasn't drawing nodes — it was deciding what to omit. At 40k partitions, density kills meaning. We collapsed by membership group, exposed only the migrating partitions in motion, and let users drill into a single member without leaving the canvas.",
    metrics: [["MAU", "12.4k"], ["Time-to-incident", "−68%"], ["Released", "v5.4"]],
    company: "Hazelcast",
    role: "Lead Product Designer",
    refs: ["hazelcast.com/products/management-center"],
  },
  {
    id: "PVK-24-003", cat: "WORK", year: 2024, status: "shipped",
    source: "rich",
    title: "Developer Console — A REPL for the Cluster",
    short: "An interactive command-line surface inside Hazelcast Management Center. Built for engineers who think in commands and need a calm, discoverable terminal — not a CLI bolted onto a UI.",
    tags: ["developer-tools", "terminal", "repl", "enterprise", "design-system", "dark-mode"],
    company: "Hazelcast",
    role: "Lead Product Designer",
    metrics: [
      ["Daily active engineers", "2.1× vs CLI"],
      ["First-command time", "−74%"],
      ["Released", "Management Center 5.4"],
    ],
    body: `
<h3>The terminal, civilised</h3>
<p>Hazelcast has a CLI. It works — and like most CLIs, it punishes the unfamiliar. New users guessed at command names; veterans memorised flags. There was no autocomplete, no inline help, no history that survived a tab close, no shared vocabulary between the CLI and the rest of Management Center. The Developer Console set out to fix that without sacrificing the quality engineers value most about a terminal: <em>speed, predictability, keyboard control</em>.</p>

<figure>
  <img src="/case-studies/developer-console/console-dark.png" alt="Developer Console in dark mode: connected to Production Cluster, showing a cluster.info command with a JSON response, with a Commands palette on the right grouping cluster, data, query, and monitoring commands." />
</figure>

<h3>Project Overview</h3>

<h4>Audience &amp; context</h4>
<p>The users are platform engineers, SREs, and Hazelcast solution architects. They're already fluent in the underlying cluster API. What they wanted from a console wasn't more power — it was less friction: discovering the right command without leaving the keyboard, getting a structured response they could copy cleanly, and trusting that what they ran an hour ago is still recoverable.</p>

<h4>The problem</h4>
<p>Three patterns came out of customer interviews and support transcripts:</p>
<ul>
  <li><strong>Discovery is private.</strong> The CLI's <code>--help</code> output was a wall. Engineers kept a personal cheat sheet, which meant tribal knowledge stayed tribal.</li>
  <li><strong>History is brittle.</strong> Closing a tab lost context. Important diagnostic commands had to be re-typed during the next incident.</li>
  <li><strong>The output is the input to something else.</strong> Engineers were copying CLI text into a different tool to pretty-print it. The CLI didn't know it was producing JSON.</li>
</ul>

<h4>What I owned</h4>
<p>End-to-end product design — IA, interaction model, command palette taxonomy, autocomplete behaviour, dark and light themes, and the integration patterns with the rest of Management Center (so the same cluster identity, the same status pills, the same connection state). Worked closely with two engineers and the platform PM.</p>

<h3>Design Principles</h3>
<ul>
  <li><strong>The keyboard is the primary surface.</strong> Every action discoverable in the UI must also be reachable from the prompt with a tab key and a hint.</li>
  <li><strong>Output is structured by default.</strong> JSON renders as JSON — syntax-coloured, copyable as a block, never a wall of text.</li>
  <li><strong>History is permanent until the engineer says otherwise.</strong> The session survives reloads and reconnections. Re-running a command takes one click.</li>
  <li><strong>Discoverability without noise.</strong> A command palette lives alongside — not on top of — the prompt. Always available, never demanding attention.</li>
</ul>

<h3>Layout &amp; Information Architecture</h3>

<h4>Three regions, mapped to how engineers think</h4>
<ul>
  <li><strong>Header.</strong> Cluster identity, connection state, search, level filter. A one-glance answer to <em>"am I talking to the right cluster?"</em> — the question every console session starts with.</li>
  <li><strong>Transcript (left, dominant).</strong> Timestamped command/response pairs. Every response is a structured block: an outline view inline, with a copy-ready code block beneath. The visual distinction between input (<code>$ cluster.info</code>) and output (the JSON) is set by typography weight, gutter colour, and timestamp position — never by hard rules or boxes that fragment the rhythm.</li>
  <li><strong>Sidebar (right).</strong> Two modes — <em>Commands</em> and <em>History</em> — sharing one footprint. Commands groups the surface area into <em>Cluster</em>, <em>Data</em>, <em>Query</em>, and <em>Monitoring</em>. History reduces a session to a chronological list of recently-run commands with one-tap re-execution.</li>
</ul>

<h4>The prompt</h4>
<p>A single, persistent input docked to the bottom edge — the only element that never moves. <em>Tab</em> for suggestions, <em>↑↓</em> for history, <em>Enter</em> to execute. The visible affordance line under the prompt names those bindings explicitly, because the muscle memory of one shell isn't the muscle memory of another, and every engineer's fingers were trained somewhere else.</p>

<figure>
  <img src="/case-studies/developer-console/autocomplete.png" alt="Developer Console with an autocomplete tooltip floating above the prompt: the user has typed map.list, and the tooltip shows the command name, description, and usage signature [--stats]." />
</figure>

<h3>Autocomplete &amp; Inline Help</h3>
<p>The autocomplete tooltip was the most-iterated component in the project. Early versions inlined a Bash-style menu beneath the prompt — and lost. Engineers said it interrupted their thinking. The shipped pattern hovers above the prompt, surfaces the canonical command, its one-line description, and the exact usage signature, then disappears the moment the user keeps typing. It's a hint, not a wall.</p>

<p>Three rules govern when it appears:</p>
<ul>
  <li>The user types two or more matching characters of a known command.</li>
  <li>The match is unambiguous, or the top match is at least 80% confidence.</li>
  <li>The user has not pressed Escape on this token already (we remember).</li>
</ul>

<h3>The Command Palette</h3>
<p>The right-hand <em>Commands</em> panel is a curated map of the surface area. Grouping was decided by user-research, not by API namespace: <em>Cluster</em>, <em>Data</em>, <em>Query</em>, <em>Monitoring</em> — the four mental compartments engineers reported using when describing what they wanted to do. Each card carries the command verb in mono and a one-sentence description in regular weight. Clicking a card inserts the command at the prompt, ready to be flagged or executed — closing the gap between "I know what I want" and "I have the syntax in my head."</p>

<h3>History — A Session That Survives</h3>
<p>The History tab is the antidote to closed-tab amnesia. Every executed command is recorded with its status and timestamp. A status icon (green check for success, red for error) makes the tab scannable; clicking any entry re-inserts the command at the prompt. Sessions persist server-side per user — opening the console on a different machine restores the last 30 days of recent commands.</p>

<figure>
  <img src="/case-studies/developer-console/history-light.png" alt="Developer Console in light mode showing the History panel on the right with map.list and cluster.info entries, each timestamped, while the transcript on the left displays the JSON responses in syntax-highlighted blocks." />
</figure>

<h3>Light &amp; Dark — One Console, Two Surfaces</h3>
<p>Dark mode is the default for terminal-shaped UI; we still owed a credible light theme to teams who run their entire IDE in light. The challenge was preserving the syntax-highlighting palette across both themes without either feeling like a re-skin. The brand teal anchors both modes; the ramps around it are independently tuned. JSON keys, strings, numbers, and braces map to a paired set of hues calibrated for AA contrast in either surface.</p>

<h3>Design Process</h3>

<h4>Research</h4>
<ul>
  <li>Nine recorded sessions with engineers and SREs at customer sites, screen-recorded as they used the existing CLI.</li>
  <li>An audit of three references — <em>Postgres psql</em>, <em>Redis CLI</em>, and the <em>Stripe Shell</em> — for what to take and what to refuse.</li>
  <li>A clickable prototype exposing only autocomplete behaviour, run as an unmoderated test (n=22), to isolate that one interaction.</li>
</ul>

<h4>Iteration</h4>
<ul>
  <li><strong>v1</strong> — full-screen terminal, no sidebar. Tested poorly: discoverability was zero, no better than the CLI it replaced.</li>
  <li><strong>v2</strong> — left command palette, full-width transcript. Tested well, but the palette was too loud — engineers reported "feeling watched."</li>
  <li><strong>v3 (shipped)</strong> — palette moved right and quietened to two ramps; History added as a sister tab; autocomplete moved above the prompt and time-bounded.</li>
</ul>

<h4>Cross-functional decisions</h4>
<p>The biggest engineering negotiation was around <strong>what counts as a command</strong>. The CLI exposed dozens of legacy verbs that overlapped semantically. We agreed on a curated v1 set — the commands that account for 95% of CLI usage according to our telemetry — and shipped them as the canonical surface. The full CLI remained accessible via a <code>raw</code> escape hatch for the long tail. This trimming was the single most contested call in the project; in retrospect, it was the right one.</p>

<h3>Outcomes</h3>
<ul>
  <li><strong>Daily active engineers</strong> using the console were <strong>2.1× higher</strong> than the equivalent CLI cohort within the first quarter.</li>
  <li><strong>Time-to-first-command</strong> for new users dropped <strong>74%</strong> — primarily attributed to the command palette making discovery passive.</li>
  <li><strong>Re-execution rate</strong> from History settled at <strong>~38% of commands run</strong>, validating that history wasn't a vanity feature.</li>
  <li>The palette grouping pattern was reused unchanged in the streaming-pipeline operator panel that shipped two quarters later.</li>
</ul>

<h3>Reflection</h3>
<p>The wrong way to design a developer console is to copy the look of a terminal. The right way is to ask why engineers love terminals — speed, finality, keyboard primacy — and protect those properties while removing the costs they tolerate (forgotten flags, lost history, walls of unstructured text). The result doesn't <em>look</em> like a tool that tries hard. That's the goal. The work is in everything you don't see: the autocomplete that knew when to stay out of the way, the history that survived a reload, the four groups that turned an API surface into a mental map. Calm by construction.</p>
`,
  },
  {
    id: "PVK-24-002", cat: "WORK", year: 2024, status: "shipped",
    source: "rich",
    title: "SQL Query Tool — Querying a Distributed Cluster",
    short: "A first-class SQL surface inside Hazelcast Management Center. Built for engineers running queries against a live, distributed in-memory cluster — without leaving the product.",
    tags: ["sql", "developer-tools", "data-viz", "enterprise", "design-system", "dark-mode"],
    company: "Hazelcast",
    role: "Lead Product Designer",
    metrics: [
      ["Adoption", "73% of clusters"],
      ["Avg session", "11 min"],
      ["Released", "Management Center 5.4"],
    ],
    body: `
<h3>A SQL surface for a database that isn't one</h3>
<p>Hazelcast is a distributed in-memory engine — IMaps, ICaches, materialised views — sitting across hundreds of nodes. Engineers and SREs needed to query it, but the product had no native query surface. They were copying connection strings into third-party tools, losing context every time. We built the SQL Query Tool to bring that work back inside the product, designed specifically for the shape of a distributed cluster rather than retrofitted from a generic database client.</p>

<figure>
  <img src="/case-studies/sql-browser/results-table.png" alt="SQL Query Tool main view: editor pane, Database Explorer sidebar with IMaps, ICaches, and Views, and a Results table showing employee records." />
</figure>

<h3>Project Overview</h3>

<h4>Audience &amp; context</h4>
<p>The users are platform engineers, SREs and backend developers — comfortable in a terminal, fluent in SQL, intolerant of UI that gets in the way. The tool ships inside Hazelcast Management Center, the operational console used by enterprise teams running production clusters. Every interaction had to feel native to that environment: dense, fast, keyboard-first, predictable under load.</p>

<h4>The problem</h4>
<p>Two recurring frictions came out of customer interviews and support data:</p>
<ul>
  <li><strong>Context-switching.</strong> Engineers ran ad-hoc queries in DBeaver or the CLI, then moved back to Management Center to read metrics. The two views never lined up in time.</li>
  <li><strong>The cluster is not a database.</strong> Generic SQL clients have no concept of an IMap, an ICache, or a materialised View. Schemas didn't browse. Object metadata was invisible. The mental model was wrong before the first query ran.</li>
</ul>

<h4>What I owned</h4>
<p>End-to-end product design: research, IA, interaction, the design system primitives we needed to extend, and the dark-mode treatment. Worked closely with two engineers and the Management Center PM. Decisions on Monaco integration, results-pane behaviour, and the chart-visualisation surface were mine to drive.</p>

<h3>Design Principles</h3>
<p>I anchored the work to four principles that shaped every screen:</p>
<ul>
  <li><strong>Speak the cluster's language.</strong> Surface IMaps, ICaches, and Views as first-class objects in the explorer — with row counts and types — not as generic "tables".</li>
  <li><strong>The query is the artefact.</strong> History, results and messages live alongside the editor, not in modal traps. Engineers should be able to read what they ran two hours ago without losing what they're writing now.</li>
  <li><strong>Dense, but breathing.</strong> Operations tooling earns its density. The layout uses generous vertical rhythm in headers and tight, monospaced rhythm in data rows — so dense doesn't mean cramped.</li>
  <li><strong>Light by default, dark for the night shift.</strong> Most queries get run during incidents. The dark theme had to feel like the same product, not a tinted afterthought.</li>
</ul>

<h3>Layout &amp; Information Architecture</h3>

<h4>Three regions, one mental model</h4>
<p>The screen resolves into three regions that mirror how engineers actually think about a query: <em>where am I looking</em> (left), <em>what am I asking</em> (top), <em>what came back</em> (bottom).</p>
<ul>
  <li><strong>Database Explorer (left).</strong> A persistent sidebar grouping objects by Hazelcast type — IMaps, ICaches, Views. Each leaf shows row count to the right in a muted weight, so engineers can size up a query before running it.</li>
  <li><strong>Editor (top).</strong> Monaco-backed, with cluster-aware autocomplete for object names and Hazelcast SQL dialect. Tabs let multiple queries live in parallel; the dot indicator marks unsaved changes.</li>
  <li><strong>Results / History / Messages (bottom).</strong> A single resizable pane with three modes. The split is non-modal — engineers move between writing and reading without context loss.</li>
</ul>

<h4>The header bar</h4>
<p>Compressed to the operations that matter most often: <em>New Query</em>, <em>Execute</em>, <em>Save</em> on the left; cluster + database selectors on the right. No vanity controls. The selector pattern reuses the same component used elsewhere in Management Center, so engineers switching between the cluster topology view and SQL never feel they've left the product.</p>

<figure>
  <img src="/case-studies/sql-browser/results-table.png" alt="SQL Query Tool default light theme — query editor, results table, and database explorer composed into a single dense workspace." />
</figure>

<h3>The Results Pane</h3>

<h4>Three views, one footprint</h4>
<p>The Results / History / Messages pattern was the most contested decision in the design. Earlier explorations gave each its own panel — but engineers consistently said they didn't want to scan three places. So the three modes share one region, with a segmented control and a clear close affordance. Switching is instant and preserves scroll position.</p>

<ul>
  <li><strong>Results.</strong> A virtualised table with sticky headers and column resize. Action row above shows row count, duration and timestamp on the left; <em>Export</em>, <em>Copy</em> and <em>Chart</em> on the right. The chart action is highlighted in the brand teal — the only place colour escapes the neutral palette in this region — because it's the entry point to a feature engineers don't expect to find here.</li>
  <li><strong>History.</strong> Each past query rendered as its own card: status pill, timestamp, duration, row count, and the query text in mono. Clicking restores it to the editor. This was a high-leverage feature: 3am incident queries are now still there the next morning.</li>
  <li><strong>Messages.</strong> Server messages and warnings, separated from results so successful queries don't bury operational notes.</li>
</ul>

<figure>
  <img src="/case-studies/sql-browser/history-light.png" alt="History tab showing past queries as cards with status, timestamp, duration, and the query text rendered in monospace." />
</figure>

<h3>From rows to chart — without leaving the result</h3>
<p>The hardest interaction to get right was the leap from a tabular result to a visualisation. Engineers don't think of themselves as analysts — but the moment a query returns aggregations, they want a picture. We made the leap a single click.</p>

<p>The <em>Chart</em> action opens an inline modal that auto-detects the most natural chart type from the result schema (bar for categorical × numeric, line for time series, scatter for two numerics) and lets the user override. The chart-type pill and the point count are surfaced at the top so the user knows immediately what they're looking at. A configuration drawer behind the gear icon exposes axes, sort and aggregation. A download icon exports the chart as PNG or the data as CSV — whichever the moment calls for.</p>

<figure>
  <img src="/case-studies/sql-browser/chart-modal.png" alt="Query Results Visualization modal: a bar chart of id by name across seven employees, with type and point count badges and configuration controls in the header." />
</figure>

<h4>Why a modal, not a side panel</h4>
<p>Side panels were the obvious first move. They lost. The chart needs the full width to be readable; the underlying result table is the source of truth and shouldn't move while the chart is open. The modal sits over the result it was made from, with the original SQL still visible in the footer — so the artefact (query → result → chart) reads as one continuous thought.</p>

<h3>Dark Mode</h3>
<p>Dark mode wasn't a re-skin. The neutral ramp is a separate, calibrated set: backgrounds compress to two greys for editor and pane chrome; the brand teal stays at the same hue but desaturates one step so it doesn't fluoresce against a dark surface. Status pills in the History view keep the green-success indicator legible without becoming the loudest thing on the screen — that role still belongs to the editor caret and the active tab.</p>

<figure>
  <img src="/case-studies/sql-browser/history-dark.png" alt="History tab in dark mode, showing the same query cards on a deep neutral background with the brand teal accents desaturated for low-light readability." />
</figure>

<h3>Design Process</h3>

<h4>Research</h4>
<ul>
  <li>Eleven recorded sessions with platform engineers and SREs at customer sites.</li>
  <li>A two-week diary study with three users running the existing CLI workflow — the timestamps revealed how often engineers were tab-switching during incidents (median: 14× per hour).</li>
  <li>Audit of three competitor query consoles (DBeaver, DataGrip, BigQuery's web console) — what to take, what to refuse.</li>
</ul>

<h4>Iteration</h4>
<ul>
  <li><strong>v1</strong> — generic two-pane editor + results. Tested poorly: engineers couldn't see the cluster structure without leaving the page.</li>
  <li><strong>v2</strong> — added the Database Explorer with object types. Tested well, but History was buried in a dropdown.</li>
  <li><strong>v3 (shipped)</strong> — three-mode results pane, persistent explorer, chart promotion. Beta usage doubled inside two weeks.</li>
</ul>

<h4>Cross-functional decisions</h4>
<p>The biggest engineering negotiation was streaming. Hazelcast queries can return very large result sets; we agreed on a 1,000-row default page with a clear "more rows available" affordance, and the export pipeline stays unbounded. The Chart feature renders client-side from the loaded page — explicitly documented in the empty state, so engineers don't misread a partial chart as a full one.</p>

<h3>Outcomes</h3>
<ul>
  <li><strong>73% of active clusters</strong> running Management Center 5.4 used the SQL Query Tool within the first quarter — well past the 40% target.</li>
  <li><strong>Average session length: 11 minutes</strong>, indicating real working use rather than one-shot exploration.</li>
  <li><strong>Support tickets</strong> referencing third-party SQL clients dropped <strong>~60%</strong> in the same period.</li>
  <li>The <em>History</em> pattern was reused unchanged in the streaming-pipeline debugger that shipped the following quarter — a small validation that the IA generalised.</li>
</ul>

<h3>Reflection</h3>
<p>The temptation, building a query tool for engineers, is to ship a featureless rectangle and let SQL do all the talking. That's a category mistake. SQL is the input; the design carries everything around it — how you find the object you want to query, how you compare the result you got to the one you got an hour ago, how a number becomes a picture without leaving the place it came from. Restraint isn't absence of design. It's the work.</p>
`,
  },
  {
    id: "PVK-23-003", cat: "WORK", year: 2023, status: "shipped",
    title: "Viridian Cloud Console",
    short: "Self-serve cluster provisioning from zero to running query in under 90 seconds.",
    tags: ["cloud", "onboarding", "billing"],
    body: "The free-tier flow used to take 14 minutes and 9 screens. We compressed it to a single configuration sheet — region, size, name — and committed everything else to defaults. The defaults were the design.",
    metrics: [["TTFQ", "1m 24s"], ["Activation", "+41%"]],
    company: "Hazelcast",
    role: "Lead Product Designer",
  },
  {
    id: "PVK-22-004", cat: "WORK", year: 2022, status: "shipped",
    title: "Streaming Pipeline Builder",
    short: "Drag-to-compose Jet pipelines. Source → transform → sink, with live throughput on every edge.",
    tags: ["node-editor", "canvas", "streams"],
    body: "Most pipeline UIs lie about scale — pretty for the demo, useless past 30 nodes. We built a deterministic auto-layout, edge-bundling at high zoom-out, and a panel that shows backpressure as it happens. The canvas can hold a 400-node pipeline without flinching.",
    metrics: [["Max nodes tested", "412"], ["TTI", "240ms"]],
    company: "Hazelcast",
  },
  {
    id: "PVK-21-005", cat: "WORK", year: 2021, status: "archived",
    title: "Kibana Plugin — Cache Insights",
    short: "Side-by-side cache and index telemetry inside an existing observability stack.",
    tags: ["plugin", "elastic", "observability"],
    body: "Built when 'observability' meant five tools open at once. The plugin surfaced cache hit ratios next to query latencies in the Kibana the ops team already lived in. Deprecated when we shipped our own console — but the lesson, meet users where they are, is still the right one.",
    company: "Hazelcast",
  },

  // ========== ATOM (components & screens) ==========
  {
    id: "PVK-24-101", cat: "ATOM", year: 2024,
    title: "DataTable — virtualised, resizable, sticky everything",
    short: "10M-row table component with column pinning, group headers, and inline edit.",
    tags: ["react", "virtualisation", "table"],
    body: "Three years of incremental work distilled into one component. Row virtualisation via fixed-height windowing, column virtualisation by intersection observer, sticky group headers via position: sticky pyramids. Used across six products.",
    refs: ["github.com/pawelklasa (private)"],
  },
  {
    id: "PVK-24-102", cat: "ATOM", year: 2024,
    title: "CommandBar — universal launcher",
    short: "⌘K palette with action providers, fuzzy match, and recent-history weighting.",
    tags: ["react", "search", "kbd"],
    body: "Action providers are pluggable: any feature can register entries that surface in the bar. Fuzzy matcher uses sub-sequence + acronym scoring; recents get a logarithmic boost. The animation is intentionally fast — 80ms — because the bar should disappear before you finish thinking about it.",
  },
  {
    id: "PVK-23-103", cat: "ATOM", year: 2023,
    title: "InlineDiff — semantic JSON delta",
    short: "Side-by-side and unified diff, with structural awareness.",
    tags: ["json", "diff", "monaco"],
    body: "Stops yelling about whitespace. Renames are detected and shown as renames. Reordered arrays don't appear changed unless you ask for ordered comparison.",
  },
  {
    id: "PVK-23-104", cat: "ATOM", year: 2023,
    title: "Toast — deterministic, stack-aware",
    short: "No spinning queue. No 'dismiss all'. Replaces itself with newer state.",
    tags: ["react", "state"],
    body: "Toasts in most systems are a ledger. This one is a register: a new toast for the same key replaces the old one in place. Three slots maximum, oldest evicted. Less honest, more useful.",
  },
  {
    id: "PVK-22-105", cat: "ATOM", year: 2022,
    title: "Sparkline — 1px-anti-aliased",
    short: "Crisp inline metric chart at 16×40, no library.",
    tags: ["svg", "data-viz"],
    body: "Library sparklines blur because they don't respect device pixels. This one snaps to half-pixel grid, draws a polyline of integer Y, and looks correct at 1× and 2×. 1.4kb gzipped.",
  },

  // ========== METHOD (patterns & heuristics) ==========
  {
    id: "PVK-METHOD-01", cat: "METHOD", year: 2024,
    title: "The Empty State Test",
    short: "If your empty state is a shrug, your filled state is a lie.",
    tags: ["heuristic", "writing"],
    body: "Design the empty state first. Not the 'first-run welcome' empty state — the one a power user lands in when their cluster has zero alerts. If you can only describe it as 'No items', the feature is decoration. If you can give it a default action, a metric to brag about, a useful link — the feature has earned its panel.",
  },
  {
    id: "PVK-METHOD-02", cat: "METHOD", year: 2024,
    title: "Defaults Are The Design",
    short: "Every config knob is a confession that the team couldn't decide.",
    tags: ["heuristic", "decision"],
    body: "Knobs scale linearly in cost and quadratically in support burden. Ship with one opinion. If two equally-valid opinions exist, pick one and document the other as 'why we didn't'. The user can always file a feature request — they cannot un-confuse themselves at 2am.",
  },
  {
    id: "PVK-METHOD-03", cat: "METHOD", year: 2023,
    title: "The Hairline Rule",
    short: "If a line is only there to separate, it should be 1px and the lightest possible value.",
    tags: ["visual", "heuristic"],
    body: "Borders are not architecture. They are stitches. A thick border says 'this thing matters'; if everything matters, nothing does. Reserve thick lines for actual emphasis (a sidebar edge, a focused element). The rest gets a hairline at 8% opacity. Density without noise.",
  },
  {
    id: "PVK-METHOD-04", cat: "METHOD", year: 2023,
    title: "Tooltips Are An Apology",
    short: "Every tooltip is a label that didn't fit. Ask why it didn't fit.",
    tags: ["heuristic", "writing"],
    body: "Sometimes the answer is honest — a chart's data point can't carry text. But often the answer is that the icon was wrong, or the column header was wrong, or the action was hidden when it shouldn't have been. Audit your tooltips quarterly and earn back what you can.",
  },

  // ========== TOOL (downloadable) ==========
  {
    id: "PVK-TOOL-01", cat: "TOOL", year: 2024, status: "available",
    title: "Hairline Grid (Figma)",
    short: "12-col, 8pt-baseline working file. Includes the only auto-layout cheat sheet you'll need.",
    tags: ["figma", "grid", "starter"],
    body: "A working file, not a 'design system'. 12 columns, 8pt baseline, and three pre-built layouts I rebuild on every project anyway. Fork it.",
    download: "hairline-grid-v3.fig",
    size: "1.2 MB",
  },
  {
    id: "PVK-TOOL-02", cat: "TOOL", year: 2024, status: "available",
    title: "useStickyState — React hook",
    short: "useState that survives a page reload. 18 lines. No dependencies.",
    tags: ["react", "hook", "snippet"],
    body: "Drop-in replacement for useState that persists to localStorage with a serializer hook. Used in every prototype I make.",
    download: "useStickyState.ts",
    size: "612 bytes",
  },
  {
    id: "PVK-TOOL-03", cat: "TOOL", year: 2023, status: "available",
    title: "Interview Kit — Senior PD",
    short: "The take-home brief and rubric I used to hire 3 designers at Hazelcast.",
    tags: ["hiring", "rubric"],
    body: "A small brief that takes ~2 hours. The rubric scores process, craft, and communication on equal footing. Open-sourced because hiring rubrics shouldn't be a trade secret.",
    download: "interview-kit.pdf",
    size: "84 KB",
  },

  // ========== DEAD (failed experiments) ==========
  {
    id: "PVK-DEAD-01", cat: "DEAD", year: 2023, status: "shelved",
    title: "Voice-controlled query builder",
    short: "\"Show me caches with hit-ratio under 40 percent.\" Worked. Nobody used it.",
    tags: ["voice", "experiment"],
    body: "Built it for a hackathon, demo'd well, shipped to beta. Engineers don't talk to their tools — they like silence and they like their hands on the keyboard. Lesson: novel input modalities solve discovery problems they don't have.",
  },
  {
    id: "PVK-DEAD-02", cat: "DEAD", year: 2022, status: "shelved",
    title: "Skeuomorphic gauge dashboard",
    short: "Brushed steel, drop shadows, the works. Looked great at 1×; illegible at 2×.",
    tags: ["dashboard", "skeuo"],
    body: "Tried to make ops feel like a control room. Turns out ops engineers don't want to feel like anything — they want their numbers in a row, sortable. Killed after a week of usability sessions where the kindest feedback was 'it's nice'.",
  },

  // ========== WRITING (Medium articles) ==========
  {
    id: "PVK-WR-01", cat: "WRITING", year: 2026, when: "Apr 20, 2026", status: "published",
    title: "On being a designer in the most interesting, exhausting moment of our careers.",
    short: "The Four Pressures.",
    tags: ["essay", "bootcamp", "craft"],
    body: "Pinned essay for Bootcamp on the simultaneous compression of design's tooling, scope, audience, and pace. Argues that the 'four pressures' aren't separate forces — they're the same shift, observed from four sides, and that the only durable response is to commit harder to taste rather than retreat into process.",
    refs: ["medium.com/design-bootcamp/on-being-a-designer-in-the-most-interesting-exhausting-moment-of-our-careers-7284735e0927"],
  },
  {
    id: "PVK-WR-02", cat: "WRITING", year: 2025, when: "Sep 5, 2025", status: "published",
    title: "The AI Winter Is Coming",
    short: "Scale gave us a tool, not a mind.",
    tags: ["essay", "ai", "forecast"],
    body: "Pinned. Argues that the gap between capability demos and durable utility is wider than the funding cycle accounts for, and outlines what an actual winter looks like for design teams who've already restructured around the prediction.",
    refs: ["medium.com/@pawel.klasa/the-ai-winter-is-coming-096b4fcaa461"],
  },
  {
    id: "PVK-WR-03", cat: "WRITING", year: 2026, when: "Apr 27, 2026", status: "published",
    title: "The AI Winter Has Started.",
    short: "Seven months later…",
    tags: ["essay", "ai", "follow-up"],
    body: "The follow-up to the September forecast. A field report, not a victory lap.",
    refs: ["medium.com/design-bootcamp/the-ai-winter-has-started-7b3fa237077e"],
  },
  {
    id: "PVK-WR-04", cat: "WRITING", year: 2026, when: "Apr 22, 2026", status: "published",
    title: "Color is finally OK",
    short: "A solo developer's blog post replaced sixty years of color science. Most designers and developers missed it.",
    tags: ["color", "oklch", "craft"],
    body: "On the quiet arrival of OKLCH in browsers and what it changes about how we should specify color in design tokens — perceptually uniform contrast, predictable mixing, and the death of the eyedropper hex value.",
    refs: ["medium.com/design-bootcamp/color-is-finally-ok-82f368f3408c"],
  },
  {
    id: "PVK-WR-05", cat: "WRITING", year: 2026, when: "Apr 19, 2026", status: "published",
    title: "Figma Is Fine. Your Job Might Not Be.",
    short: "Claude Design launched 48 hours ago. Here is what it actually means.",
    tags: ["essay", "ai", "figma", "tooling"],
    body: "A working designer's first impressions of Claude Design and what it implies for the next eighteen months of the discipline. Less doom than headlines suggest; more rearrangement than panic.",
    refs: ["medium.com/design-bootcamp/figma-is-fine-your-job-might-not-be-df42ee0e33a4"],
  },
  {
    id: "PVK-WR-06", cat: "WRITING", year: 2025, when: "Feb 26, 2025", status: "published",
    title: "The \u201CWeekend Thief\u201D: Why Most Design Take-Homes are Broken",
    short: "On the unpaid labour we still call screening.",
    tags: ["hiring", "essay", "ethics"],
    body: "The take-home brief is the most defended bad idea in our hiring stack. Argues for a paid 90-minute pairing exercise instead, and provides a rubric (see PVK-TOOL-03).",
    refs: ["medium.com/design-bootcamp/the-weekend-thief-why-most-design-take-homes-are-broken-850465045404"],
  },
  {
    id: "PVK-WR-07", cat: "WRITING", year: 2025, when: "Nov 25, 2025", status: "published",
    title: "Hands-On review of building with Claude Opus 4.5",
    short: "The Agent on the Keyboard.",
    tags: ["ai", "review", "workflow"],
    body: "Two-week working diary. What it's good at (interface scaffolds, refactors, the boring 60%), what it isn't (taste, restraint, knowing when to stop), and what changed about my day-to-day as a result.",
    refs: ["medium.com/design-bootcamp/hands-on-review-of-building-with-claude-opus-4-5-e587fd877775"],
  },
  {
    id: "PVK-WR-08", cat: "WRITING", year: 2025, when: "Sep 19, 2025", status: "published",
    title: "Harry Beck's Radical Idea: A Lesson in Disruption",
    short: "The Tube Map: A Case Study in User-Centred Design.",
    tags: ["history", "information-design"],
    body: "How a draughtsman with no remit redrew London by ignoring its geography. The argument: the most useful thing you can do for a user is to stop showing them what's true and start showing them what's relevant.",
    refs: ["medium.com/design-bootcamp/harry-becks-radical-idea-a-lesson-in-disruption-6637fe2ac38e"],
  },
  {
    id: "PVK-WR-09", cat: "WRITING", year: 2025, when: "Sep 17, 2025", status: "published",
    title: "How Apple's New iOS Design Fails at Accessibility",
    short: "Losing Sight of Clarity.",
    tags: ["accessibility", "ios", "critique"],
    body: "A specific, measurable critique. Contrast ratios, hit targets, motion budgets — the things that used to be load-bearing in Apple's HIG and aren't, in places, anymore.",
    refs: ["medium.com/design-bootcamp/how-apples-new-ios-design-fails-at-accessibility-0c51151d645e"],
  },
  {
    id: "PVK-WR-10", cat: "WRITING", year: 2025, when: "Sep 15, 2025", status: "published",
    title: "We Fired Our Personas",
    short: "How archetypes turned our design chaos into a clear path forward.",
    tags: ["research", "personas", "archetypes"],
    body: "The smiley-face persona problem in B2B big-data tools, and why an archetype framework — fewer, sharper, role-based — gave the team a usable shorthand the personas never managed.",
    refs: ["medium.com/design-bootcamp/why-i-ditched-smiley-personas-for-an-archetype-framework-in-big-data-design-3518fe442923"],
  },
];

window.ENTRIES = ENTRIES;
