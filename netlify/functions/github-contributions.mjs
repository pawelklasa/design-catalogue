/**
 * Netlify Function: GitHub contributions + recent activity.
 *
 * No token required. Uses only PUBLIC data sources:
 *   - Contributions calendar: github-contributions-api.jogruber.de
 *     (scrapes the public contribution graph; returns date/count/level).
 *   - Recent activity + public repo count: the unauthenticated GitHub
 *     REST API (rate-limited to 60 req/hr per IP — fine behind the CDN cache).
 *
 * Optional:
 *   GITHUB_USERNAME — defaults to `pawelklasa`.
 *
 * Cached for 5 minutes via Cache-Control + Netlify CDN.
 */

function relTime(iso) {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.round(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const d = Math.round(h / 24);
  if (d === 1) return "yesterday";
  if (d < 7) return `${d} days ago`;
  const w = Math.round(d / 7);
  if (w < 5) return `${w} week${w === 1 ? "" : "s"} ago`;
  const mo = Math.round(d / 30);
  return `${mo} month${mo === 1 ? "" : "s"} ago`;
}

function describeEvent(ev) {
  const repo = ev.repo?.name ?? "";
  const p = ev.payload ?? {};
  switch (ev.type) {
    case "PushEvent": {
      const n = p.size ?? p.distinct_size ?? p.commits?.length ?? 1;
      const detail = p.commits?.[p.commits.length - 1]?.message?.split("\n")[0] ?? "";
      return { action: `Pushed ${n} commit${n === 1 ? "" : "s"}`, detail };
    }
    case "PullRequestEvent": {
      const verb = p.action === "closed" && p.pull_request?.merged ? "Merged" :
                   p.action === "opened" ? "Opened" :
                   p.action === "closed" ? "Closed" :
                   "Updated";
      return { action: `${verb} PR #${p.pull_request?.number ?? ""}`, detail: p.pull_request?.title ?? "" };
    }
    case "IssuesEvent": {
      const verb = p.action === "opened" ? "Opened" : p.action === "closed" ? "Closed" : "Updated";
      return { action: `${verb} issue #${p.issue?.number ?? ""}`, detail: p.issue?.title ?? "" };
    }
    case "IssueCommentEvent": {
      return { action: `Commented on #${p.issue?.number ?? ""}`, detail: (p.comment?.body ?? "").split("\n")[0].slice(0, 140) };
    }
    case "CreateEvent": {
      return { action: `Created ${p.ref_type}${p.ref ? ` ${p.ref}` : ""}`, detail: p.description ?? "" };
    }
    case "ReleaseEvent":
      return { action: `Released ${p.release?.tag_name ?? ""}`, detail: p.release?.name ?? "" };
    case "WatchEvent":
      return { action: "Starred", detail: "" };
    case "ForkEvent":
      return { action: "Forked", detail: p.forkee?.full_name ?? "" };
    case "PublicEvent":
      return { action: "Made public", detail: "" };
    default:
      return { action: ev.type.replace(/Event$/, ""), detail: "" };
  }
}

// Group jogruber's flat day list into weeks of 7 slots (Sun..Sat), padding
// the leading/trailing partial weeks with null — matching the grid the
// frontend expects.
function toWeeks(days) {
  const weeks = [];
  let week = new Array(7).fill(null);
  for (const d of days) {
    const wd = new Date(d.date + "T00:00:00").getDay(); // 0 = Sunday
    if (wd === 0 && week.some(Boolean)) {
      weeks.push(week);
      week = new Array(7).fill(null);
    }
    week[wd] = { date: d.date, count: d.count, level: d.level };
  }
  if (week.some(Boolean)) weeks.push(week);
  return weeks;
}

export default async (req, context) => {
  const username = process.env.GITHUB_USERNAME || "pawelklasa";

  const headers = {
    "user-agent": "design-catalogue-netlify-fn",
    "accept": "application/vnd.github+json",
  };

  try {
    const [contribRes, eventsRes, userRes] = await Promise.all([
      fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, { headers }),
      fetch(`https://api.github.com/users/${username}`, { headers }),
    ]);

    if (!contribRes.ok) {
      const text = await contribRes.text();
      return new Response(JSON.stringify({ error: "Contributions source failed", status: contribRes.status, body: text }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }

    const contrib = await contribRes.json();
    const days = Array.isArray(contrib.contributions) ? contrib.contributions : [];
    const weeks = toWeeks(days);
    const totalContributions =
      contrib.total?.lastYear ??
      days.reduce((sum, d) => sum + (d.count || 0), 0);

    const userJson = userRes.ok ? await userRes.json() : null;
    const publicRepos = userJson?.public_repos ?? null;

    const events = eventsRes.ok ? await eventsRes.json() : [];
    const recentEvents = (Array.isArray(events) ? events : [])
      .slice(0, 10)
      .map((ev) => {
        const desc = describeEvent(ev);
        return {
          when: relTime(ev.created_at),
          repo: ev.repo?.name ?? "",
          action: desc.action,
          detail: desc.detail,
        };
      });

    const body = {
      totalContributions,
      weeks,
      publicRepos,
      recentEvents,
      fetchedAt: new Date().toISOString(),
    };

    return new Response(JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        // Browser cache 60s, CDN cache 5min, allow stale-while-revalidate
        "cache-control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config = { path: "/api/github-contributions" };
