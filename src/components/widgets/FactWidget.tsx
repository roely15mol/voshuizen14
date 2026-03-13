import facts from "@/data/facts.json";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function FactWidget() {
  const index = getDayOfYear() % facts.length;
  const fact = facts[index];

  return (
    <div className="fact-card p-6">
      <p className="widget-label mb-4">Wist je dat?</p>
      <p className="leading-relaxed text-foreground/90">{fact}</p>
    </div>
  );
}
