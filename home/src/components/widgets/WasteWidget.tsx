"use client";

import { useEffect, useState } from "react";
import WidgetFallback from "@/components/WidgetFallback";
import { wasteLabels, type WasteCollection } from "@/lib/waste";

export default function WasteWidget() {
  const [waste, setWaste] = useState<WasteCollection | null | "error">("error");

  useEffect(() => {
    fetch("/api/waste")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setWaste(data))
      .catch(() => setWaste(null));
  }, []);

  if (waste === "error") {
    return <WidgetFallback />;
  }

  if (!waste) {
    return (
      <div className="glass-card p-6">
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
  const cardClass = `waste-card-${waste.type}`;

  return (
    <div className={`waste-card ${cardClass} p-6`}>
      <p className="widget-label mb-4">Afval ophaaldag</p>

      {waste.isToday ? (
        <div>
          <p className="font-display text-2xl font-bold text-accent mb-1">
            Vandaag!
          </p>
          <p className="text-sm text-foreground/70">Zet de {label.toLowerCase()} aan de straat</p>
        </div>
      ) : (
        <div>
          <p className="font-display text-lg font-semibold capitalize">{formattedDate}</p>
          <p className="text-sm text-foreground/60 mt-1">{label}</p>
        </div>
      )}
    </div>
  );
}
