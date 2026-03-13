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
      <div className="glass-card p-5 sm:p-6">
        <p className="widget-label mb-4">Vandaag in de geschiedenis</p>
        <p className="text-sm italic text-muted mb-2">
          Geen historische feiten gevonden voor vandaag.
        </p>
        <p className="leading-relaxed">{fallbackFact}</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-5 sm:p-6">
      <p className="widget-label mb-4">Vandaag in de geschiedenis</p>
      <ul className="space-y-3">
        {events.map((event) => (
          <li key={`${event.year}-${event.text}`} className="flex gap-3">
            <span className="shrink-0 font-display font-semibold text-accent tabular-nums">
              {event.year}
            </span>
            <span className="text-sm leading-relaxed">{event.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
