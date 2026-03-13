export interface WasteCollection {
  type: string;
  date: string;
  isToday: boolean;
}

export const wasteColors: Record<string, string> = {
  gft: "text-green-600",
  restafr: "text-gray-500",
  pap: "text-blue-600",
  pmd: "text-orange-500",
  bestafr: "text-purple-500",
};

export const wasteLabels: Record<string, string> = {
  gft: "GFT",
  restafr: "Restafval",
  pap: "Papier",
  pmd: "PMD",
  bestafr: "Best-afval",
};

function extractSessionCookie(
  headers: Headers
): string {
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

    const registerData = await registerRes.json();
    if (!registerData.success) return null;

    if (session.includes("selectedZipCode")) {
      return session;
    }

    return null;
  } catch {
    return null;
  }
}

export async function fetchWaste(): Promise<WasteCollection | null> {
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
        next: { revalidate: 3600 },
      }
    );

    const data = await res.json();
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
