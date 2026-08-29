// Cloudflare Pages Function: GET /api/waste
// Looks up the next waste collection for Voshuizen 14 at Circulus
// (mijn.circulus.nl). The three-step session flow must run server-side,
// so this endpoint powers the client-side WasteWidget.

interface WasteCollection {
  type: string;
  date: string;
  isToday: boolean;
}

interface FunctionContext {
  request: Request;
  waitUntil(promise: Promise<unknown>): void;
}

const CACHE_TTL = 3600; // collection dates change at most daily

interface CirculusRegisterResponse {
  success: boolean;
}

interface CirculusCalendarResponse {
  success: boolean;
  customData?: {
    response?: {
      garbage?: Array<{ code: string; dates: string[] }>;
    };
  };
}

function extractSessionCookie(headers: Headers): string {
  const cookies = headers.getSetCookie?.() ?? [];
  for (const c of cookies) {
    const match = c.match(/CB_SESSION=([^;]+)/);
    if (match) return match[1];
  }
  return "";
}

async function getCirculusSession(): Promise<string | null> {
  try {
    // Step 1: GET the calendar page — it redirects to /uw-adres
    const pageRes = await fetch("https://mijn.circulus.nl/afvalkalender/", {
      redirect: "manual",
    });

    let session = extractSessionCookie(pageRes.headers);
    const location = pageRes.headers.get("location");
    if (!location) return null;

    // Step 2: Follow redirect to /uw-adres to get CB_SESSION and auth token
    const adresRes = await fetch(location, {
      headers: session ? { Cookie: `CB_SESSION=${session}` } : {},
      redirect: "manual",
    });

    const adresSession = extractSessionCookie(adresRes.headers);
    if (adresSession) session = adresSession;
    if (!session) return null;

    const html = await adresRes.text();
    const authToken = html.match(/auth-token="([^"]+)"/)?.[1];

    // Step 3: Register the zipcode (updates CB_SESSION with address data)
    const registerRes = await fetch(
      "https://mijn.circulus.nl/register/zipcode.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `CB_SESSION=${session}`,
          ...(authToken ? { "X-CSRF-TOKEN": authToken } : {}),
        },
        body: JSON.stringify({ zipCode: "7364BP", number: "14" }),
      }
    );

    const regSession = extractSessionCookie(registerRes.headers);
    if (regSession) session = regSession;

    const registerData = (await registerRes.json()) as CirculusRegisterResponse;
    if (!registerData.success) return null;

    if (session.includes("selectedZipCode")) {
      return session;
    }

    return null;
  } catch {
    return null;
  }
}

async function fetchWaste(): Promise<WasteCollection | null> {
  try {
    const session = await getCirculusSession();
    if (!session) return null;

    const now = new Date();
    const from = now.toISOString().split("T")[0];
    const till = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const res = await fetch(
      `https://mijn.circulus.nl/afvalkalender.json?from=${from}&till=${till}`,
      {
        headers: { Cookie: `CB_SESSION=${session}` },
      }
    );

    const data = (await res.json()) as CirculusCalendarResponse;
    if (!data.success) return null;

    const garbage = data.customData?.response?.garbage;
    if (!Array.isArray(garbage)) return null;

    const today = from;
    let nextCollection: WasteCollection | null = null;

    for (const entry of garbage) {
      const code = (entry.code as string).toLowerCase();
      for (const date of entry.dates) {
        if (date >= today) {
          if (!nextCollection || date < nextCollection.date) {
            nextCollection = {
              type: code,
              date,
              isToday: date === today,
            };
          }
        }
      }
    }

    return nextCollection;
  } catch {
    return null;
  }
}

export const onRequestGet = async (ctx: FunctionContext): Promise<Response> => {
  const cacheKey = new Request(ctx.request.url);
  const cache = caches.default;

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const waste = await fetchWaste();

  const response = new Response(JSON.stringify(waste), {
    status: waste ? 200 : 502,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": waste ? `public, max-age=${CACHE_TTL}` : "no-store",
    },
  });

  if (waste) {
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
};
