import { fetchHistory } from "@/lib/history";
import facts from "@/data/facts.json";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default async function HistoryWidget() {
  const events = await fetchHistory();

  if (events.length === 0) {
    const fallbackIndex = (getDayOfYear() + 180) % facts.length;
    const fallbackFact = facts[fallbackIndex];

    return (
      <div className="rounded-xl border border-card-border bg-card-bg p-5">
        <h2 className="text-sm font-medium text-muted">
          Vandaag in de geschiedenis
        </h2>
        <p className="mt-2 text-sm italic text-muted">
          Geen historische feiten gevonden voor vandaag.
        </p>
        <p className="mt-2 text-foreground">{fallbackFact}</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5">
      <h2 className="text-sm font-medium text-muted">
        Vandaag in de geschiedenis
      </h2>
      <ul className="mt-3 space-y-2">
        {events.map((event) => (
          <li key={`${event.year}-${event.text}`} className="text-foreground">
            <span className="font-semibold text-accent">{event.year}</span>
            &mdash; {event.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
