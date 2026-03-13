export interface WasteCollection {
  type: string;
  date: string;
  isToday: boolean;
}

export const wasteColors: Record<string, string> = {
  gft: "text-green-600",
  restafval: "text-gray-500",
  restafr: "text-gray-500",
  papier: "text-blue-600",
  pap: "text-blue-600",
  pmd: "text-orange-500",
  bestafr: "text-purple-500",
};

export const wasteLabels: Record<string, string> = {
  gft: "GFT",
  restafr: "Restafval",
  restafval: "Restafval",
  pap: "Papier",
  papier: "Papier",
  pmd: "PMD",
  bestafr: "Best-afval",
};

async function getCirculusSession(): Promise<string | null> {
  try {
    const visitorUrl =
      "https://www.circulus.nl/api/visitor.php?" +
      "address=Voshuizen&city=Lieren&municipality=Apeldoorn" +
      "&streetnumber=14&zipcode=7364BP&redirect=https%3A%2F%2Fmijn.circulus.nl%2Fafvalkalender%2F";

    const res = await fetch(visitorUrl, { redirect: "manual" });

    const setCookie = res.headers.get("set-cookie");
    if (!setCookie) return null;

    const cbVisitor = setCookie.match(/cb_visitor=([^;]+)/)?.[1];
    if (!cbVisitor) return null;

    // Now register the zipcode to get a CB_SESSION cookie
    const registerRes = await fetch("https://mijn.circulus.nl/register/zipcode.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `cb_visitor=${cbVisitor}`,
      },
      body: JSON.stringify({ zipCode: "7364BP", number: "14" }),
      redirect: "manual",
    });

    const registerData = await registerRes.json();
    if (!registerData.success) return null;

    // Follow the showUrl to get the CB_SESSION
    const showUrl = registerData.showUrl?.replace(
      /redirect=[^&]*/,
      "redirect=https%3A%2F%2Fmijn.circulus.nl%2Fafvalkalender%2F"
    );
    if (!showUrl) return null;

    const sessionRes = await fetch(showUrl, { redirect: "manual" });
    const sessionCookie = sessionRes.headers.get("set-cookie");
    const cbSession = sessionCookie?.match(/CB_SESSION=([^;]+)/)?.[1];

    // If we didn't get CB_SESSION from the redirect, try fetching the calendar page
    if (!cbSession) {
      // Try with the cb_visitor cookie directly on the calendar page
      const calRes = await fetch("https://mijn.circulus.nl/afvalkalender/", {
        headers: { Cookie: `cb_visitor=${cbVisitor}` },
        redirect: "manual",
      });
      const calCookie = calRes.headers.get("set-cookie");
      return calCookie?.match(/CB_SESSION=([^;]+)/)?.[1] ?? null;
    }

    return cbSession;
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

    // Collect all upcoming dates across all waste types
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
