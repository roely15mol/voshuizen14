// Cloudflare Pages Function: GET /api/news
// Proxies the NOS RSS feed as JSON so the client-side NewsWidget can fetch
// same-origin (the feed itself has no CORS headers).

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
}

interface FunctionContext {
  request: Request;
  waitUntil(promise: Promise<unknown>): void;
}

const CACHE_TTL = 600; // 10 minutes at the edge

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function stripCdata(text: string): string {
  return decodeEntities(text.replace(/<!\[CDATA\[/, "").replace(/\]\]>/, "").trim());
}

function parseFeed(xml: string): NewsItem[] {
  const items: NewsItem[] = [];

  for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    if (items.length >= 3) break;
    const block = match[1];

    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

    if (titleMatch && linkMatch && pubDateMatch) {
      items.push({
        title: stripCdata(titleMatch[1]),
        link: linkMatch[1].trim(),
        pubDate: pubDateMatch[1].trim(),
      });
    }
  }

  return items;
}

export const onRequestGet = async (ctx: FunctionContext): Promise<Response> => {
  const cacheKey = new Request(ctx.request.url);
  const cache = caches.default;

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  let payload: NewsItem[];
  let status = 200;
  try {
    const res = await fetch("https://feeds.nos.nl/nosnieuwsalgemeen", {
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!res.ok) throw new Error(`NOS feed responded ${res.status}`);
    payload = parseFeed(await res.text());
  } catch {
    payload = [];
    status = 502;
  }

  const response = new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": status === 200 ? `public, max-age=${CACHE_TTL}` : "no-store",
    },
  });

  if (status === 200) {
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
};
