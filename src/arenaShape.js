// Shapes a raw Are.na block into a catalogue entry.
// Used by both the Netlify function (server-side) and the client hook (dev fallback).

function pickImage(block) {
  const img = block.image;
  if (!img) return null;
  return img.display?.url || img.large?.url || img.original?.url || null;
}

export function shapeArenaBlock(block) {
  const klass = block.class;
  const url = block.source?.url || null;
  const image = pickImage(block);
  const date = block.created_at ? new Date(block.created_at) : null;

  let title = block.title || block.generated_title || block.source?.title || "";
  if (!title && klass === "Text") {
    const txt = (block.content || "").replace(/\s+/g, " ").trim();
    title = txt.length > 80 ? txt.slice(0, 79) + "…" : txt || "Note";
  }
  if (!title) title = "Untitled";

  const desc = (block.description || "").replace(/\s+/g, " ").trim();
  const txt = (block.content || "").replace(/\s+/g, " ").trim();
  const short = desc || txt || block.source?.provider?.name || "";

  const parts = [];
  if (image) parts.push(`<figure><img src="${image}" alt="${title.replace(/"/g, "&quot;")}" /></figure>`);
  if (block.description_html) parts.push(block.description_html);
  else if (desc) parts.push(`<p>${desc}</p>`);
  if (klass === "Text" && block.content_html) parts.push(block.content_html);
  else if (klass === "Text" && txt) parts.push(`<p>${txt}</p>`);
  if (url) parts.push(`<p><a href="${url}" target="_blank" rel="noopener noreferrer">Open ↗</a></p>`);
  const body = parts.join("\n");

  const refs = [];
  if (url) refs.push(url);
  refs.push(`https://www.are.na/block/${block.id}`);

  return {
    id: `ARN-${block.id}`,
    cat: "CHEWING",
    year: date ? date.getFullYear() : null,
    date: date ? date.toISOString() : null,
    dateLabel: date
      ? date.toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })
      : "",
    status: (klass || "").toLowerCase(),
    title,
    short,
    body,
    image,
    link: url,
    refs,
    tags: [block.source?.provider?.name].filter(Boolean).map((t) => t.toLowerCase()),
    source: "arena",
  };
}
