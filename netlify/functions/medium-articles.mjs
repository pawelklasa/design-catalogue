/**
 * Netlify Function: Medium articles for @pawel.klasa.
 *
 * Fetches the public Medium RSS feed and returns a JSON list of articles
 * shaped like a catalogue entry (cat: "WRITING").
 *
 * No auth required. Cached 30 minutes via Cache-Control + Netlify CDN.
 */

const FEED_URL = "https://medium.com/feed/@pawel.klasa";

function decodeEntities(s) {
  if (!s) return "";
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

function unwrap(value) {
  if (!value) return "";
  // Strip CDATA wrappers and trim
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .trim();
}

function pick(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(re);
  return m ? unwrap(m[1]) : "";
}

function pickAll(xml, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi");
  const out = [];
  let m;
  while ((m = re.exec(xml)) !== null) out.push(unwrap(m[1]));
  return out;
}

function stripHtml(html) {
  return decodeEntities(
    html
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
  ).trim();
}

function shortFromContent(html, max = 240) {
  // Prefer the first <h4> (Medium subtitle) or <p>; fall back to plain text.
  const h4 = html.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
  const p = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const raw = h4?.[1] || p?.[1] || html;
  const text = stripHtml(raw);
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
}

function parseFeed(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const raw = m[1];
    const title = pick(raw, "title");
    const link = pick(raw, "link").split("?")[0];
    const guid = pick(raw, "guid");
    const pubDate = pick(raw, "pubDate");
    const date = pubDate ? new Date(pubDate) : null;
    const content = pick(raw, "content:encoded");
    const description = pick(raw, "description");
    const tags = pickAll(raw, "category").map((t) => t.toLowerCase()).slice(0, 5);

    // Stable short id from the GUID, e.g. https://medium.com/p/7b3fa237077e -> 7b3fa237077e
    const idMatch = guid.match(/\/p\/([a-f0-9]+)/i);
    const shortId = idMatch ? idMatch[1] : guid.replace(/[^a-z0-9]/gi, "").slice(-12);

    // Build short and a body that doesn't duplicate it
    const short = shortFromContent(content || description);
    let body = content;
    if (body && short) {
      // Strip leading <h3>/<h4>/<p> if its plain-text content equals the short
      body = body.replace(
        /^\s*<(h[1-6]|p)[^>]*>([\s\S]*?)<\/\1>\s*/i,
        (full, _tag, inner) => (stripHtml(inner) === short ? "" : full)
      );
    }

    items.push({
      id: `MED-${shortId}`,
      cat: "WRITING",
      year: date ? date.getFullYear() : null,
      date: date ? date.toISOString() : null,
      dateLabel: date ? date.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }) : "",
      status: "published",
      title,
      short,
      tags,
      body,                    // full HTML — used by Detail view
      refs: [link],
      link,                    // canonical Medium URL
      source: "medium",
    });
  }
  return items;
}

export default async () => {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "user-agent": "design-catalogue-netlify-fn" },
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Medium RSS HTTP ${res.status}` }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }
    const xml = await res.text();
    const articles = parseFeed(xml);

    return new Response(JSON.stringify({
      articles,
      fetchedAt: new Date().toISOString(),
    }), {
      headers: {
        "content-type": "application/json",
        // Browser cache 5 min, CDN cache 30 min, allow stale-while-revalidate
        "cache-control": "public, max-age=300, s-maxage=1800, stale-while-revalidate=3600",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config = { path: "/api/medium-articles" };
