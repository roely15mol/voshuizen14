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
    <div className="glass-card p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-accent text-lg">&#9679;</span>
        <p className="widget-label">Wist je dat?</p>
      </div>
      <p className="leading-relaxed">{fact}</p>
    </div>
  );
}
