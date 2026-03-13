import { fetchWaste, wasteColors, wasteLabels } from "@/lib/waste";

const wasteEmoji: Record<string, string> = {
  gft: "🟢",
  restafr: "⚫",
  pap: "🔵",
  pmd: "🟠",
  bestafr: "🟣",
};

export default async function WasteWidget() {
  const waste = await fetchWaste();

  if (!waste) {
    return (
      <div className="glass-card p-5 sm:p-6">
        <p className="widget-label mb-4">Afval ophaaldag</p>
        <p className="text-muted">Niet beschikbaar</p>
      </div>
    );
  }

  const formattedDate = new Date(waste.date).toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const label = wasteLabels[waste.type] ?? waste.type;
  const color = wasteColors[waste.type] ?? "text-foreground";
  const emoji = wasteEmoji[waste.type] ?? "♻️";

  return (
    <div className="glass-card p-5 sm:p-6">
      <p className="widget-label mb-4">Afval ophaaldag</p>

      {waste.isToday ? (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <div>
            <p className="font-display text-lg font-semibold text-accent">
              Vandaag aan de straat!
            </p>
            <p className={`text-sm font-medium ${color}`}>{label}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{emoji}</span>
          <div>
            <p className="capitalize">{formattedDate}</p>
            <p className={`text-sm font-medium ${color}`}>{label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
