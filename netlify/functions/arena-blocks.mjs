/**
 * Netlify Function: Are.na "currently chewing on" channel.
 * Caches the response 10 min on the CDN.
 */
import { shapeArenaBlock } from "../../src/arenaShape.js";

const SLUG = process.env.ARENA_CHANNEL_SLUG || "currently-chewing-on";
const FEED_URL = `https://api.are.na/v2/channels/${SLUG}/contents?per=50&direction=desc`;

export default async () => {
  try {
    const res = await fetch(FEED_URL, {
      headers: { "user-agent": "design-catalogue-netlify-fn" },
    });
    if (!res.ok) {
      return new Response(JSON.stringify({ error: `Are.na HTTP ${res.status}` }), {
        status: 502,
        headers: { "content-type": "application/json" },
      });
    }
    const json = await res.json();
    const blocks = (json.contents || []).map(shapeArenaBlock);

    return new Response(
      JSON.stringify({ blocks, fetchedAt: new Date().toISOString() }),
      {
        headers: {
          "content-type": "application/json",
          "cache-control":
            "public, max-age=300, s-maxage=600, stale-while-revalidate=3600",
        },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

export const config = { path: "/api/arena-blocks" };
