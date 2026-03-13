export interface HistoryEvent {
  year: number;
  text: string;
}

export async function fetchHistory(): Promise<HistoryEvent[]> {
  try {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    const url = `https://api.wikimedia.org/feed/v1/wikipedia/nl/onthisday/events/${mm}/${dd}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    const data = await res.json();

    if (!Array.isArray(data.events)) return [];

    return data.events.slice(0, 2).map((e: { year: number; text: string }) => ({
      year: e.year,
      text: e.text,
    }));
  } catch {
    return [];
  }
}
