import { fetchWaste, wasteColors, wasteLabels } from "@/lib/waste";

export default async function WasteWidget() {
  const waste = await fetchWaste();

  if (!waste) {
    return (
      <div className="rounded-xl border border-card-border bg-card-bg p-5">
        <h2 className="text-sm font-medium text-muted">Afval ophaaldag</h2>
        <p className="mt-2 text-foreground">Niet beschikbaar</p>
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

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5">
      <h2 className="text-sm font-medium text-muted">Afval ophaaldag</h2>

      {waste.isToday ? (
        <p className="mt-2 text-lg font-semibold text-accent">
          Vandaag aan de straat!
        </p>
      ) : (
        <p className="mt-2 text-foreground">{formattedDate}</p>
      )}

      <p className={`mt-1 font-medium ${color}`}>{label}</p>
    </div>
  );
}
