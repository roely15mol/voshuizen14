export interface HistoryEvent {
  year: number;
  text: string;
}

export async function fetchHistory(): Promise<HistoryEvent[]> {
  try {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");

    const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${mm}/${dd}`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return [];

    const data = await res.json();

    if (!Array.isArray(data.events) || data.events.length === 0) return [];

    // Pick 2 events spread across history for variety
    // Use day-of-year as seed so it's deterministic per day
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const events = data.events;
    const pick1 = events[dayOfYear % events.length];
    const pick2 = events[(dayOfYear + Math.floor(events.length / 2)) % events.length];

    const picks = [pick1];
    if (pick2 && pick2.year !== pick1.year) picks.push(pick2);

    return picks.map((e: { year: number; text: string }) => ({
      year: e.year,
      text: e.text,
    }));
  } catch {
    return [];
  }
}
