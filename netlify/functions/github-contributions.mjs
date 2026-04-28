/**
 * Netlify Function: GitHub contributions + recent activity.
 *
 * Calls the GitHub GraphQL + REST APIs server-side so the token never
 * touches the browser. Set the `GITHUB_TOKEN` env var in
 *   Netlify → Site configuration → Environment variables
 * (a classic PAT with `read:user` and `public_repo` scopes is enough).
 *
 * Optional:
 *   GITHUB_USERNAME — defaults to `pawelklasa`.
 *
 * Cached for 5 minutes via Cache-Control + Netlify CDN.
 */

const GRAPHQL_QUERY = `
  query($login: String!) {
    user(login: $login) {
      repositories(privacy: PUBLIC, ownerAffiliations: OWNER) { totalCount }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const LEVEL_MAP = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

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

export default async (req, context) => {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "pawelklasa";

  if (!token) {
    return new Response(JSON.stringify({ error: "GITHUB_TOKEN not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const headers = {
    "authorization": `Bearer ${token}`,
    "user-agent": "design-catalogue-netlify-fn",
    "accept": "application/vnd.github+json",
  };

  try {
    const [gqlRes, eventsRes] = await Promise.all([
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { ...headers, "content-type": "application/json" },
        body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { login: username } }),
      }),
      fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, { headers }),
    ]);

    if (!gqlRes.ok) {
      const text = await gqlRes.text();
      return new Response(JSON.stringify({ error: "GitHub GraphQL failed", status: gqlRes.status, body: text }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }

    const gql = await gqlRes.json();
    const user = gql.data?.user;
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found", details: gql.errors }), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }

    const cal = user.contributionsCollection.contributionCalendar;
    const weeks = cal.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date, // ISO yyyy-mm-dd
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      }))
    );

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
      totalContributions: cal.totalContributions,
      weeks,
      publicRepos: user.repositories.totalCount,
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
