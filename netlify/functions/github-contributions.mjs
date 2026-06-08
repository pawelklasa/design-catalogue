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

// Parse GitHub's public contributions HTML into [{date, count, level}].
function parseContributionsHtml(html) {
  const counts = {};
  const tipRe = /<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;
  let m;
  while ((m = tipRe.exec(html))) {
    const num = /^([\d,]+)\s+contribution/.exec(m[2].trim());
    counts[m[1]] = num ? Number(num[1].replace(/,/g, "")) : 0;
  }
  const days = [];
  const tdRe = /<td\b[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
  while ((m = tdRe.exec(html))) {
    const td = m[0];
    const date = /data-date="([^"]+)"/.exec(td)?.[1];
    if (!date) continue;
    const level = Number(/data-level="([^"]+)"/.exec(td)?.[1] ?? 0);
    const id = /id="([^"]+)"/.exec(td)?.[1];
    days.push({ date, count: counts[id] ?? 0, level });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  return days;
}

// Fetch the contribution calendar with no token. Primary source is GitHub's
// own public HTML; jogruber's scraper API is a fallback if GitHub is blocked.
async function fetchContributions(username) {
  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { "user-agent": "Mozilla/5.0 (design-catalogue)", "accept": "text/html" },
    });
    if (res.ok) {
      const days = parseContributionsHtml(await res.text());
      if (days.length) return { days, total: days.reduce((s, d) => s + d.count, 0) };
    }
  } catch { /* fall through to the backup source */ }

  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
  if (!res.ok) throw new Error(`contributions source failed (${res.status})`);
  const json = await res.json();
  const days = (json.contributions || []).map((d) => ({ date: d.date, count: d.count, level: d.level }));
  return { days, total: json.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0) };
}

export default async (req, context) => {
  const username = process.env.GITHUB_USERNAME || "pawelklasa";

  const headers = {
    "user-agent": "design-catalogue-netlify-fn",
    "accept": "application/vnd.github+json",
  };

  // Resolve a fetch to null instead of rejecting, so one unreachable host
  // can't take down the whole response.
  const safe = (p) => p.then((r) => r).catch(() => null);

  try {
    const [contrib, eventsRes, userRes] = await Promise.all([
      fetchContributions(username),
      safe(fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, { headers })),
      safe(fetch(`https://api.github.com/users/${username}`, { headers })),
    ]);

    const weeks = toWeeks(contrib.days);
    const totalContributions = contrib.total;

    const userJson = userRes && userRes.ok ? await userRes.json() : null;
    const publicRepos = userJson?.public_repos ?? null;

    const events = eventsRes && eventsRes.ok ? await eventsRes.json() : [];
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
