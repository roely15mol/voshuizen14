import quotes from "@/data/quotes.json";

function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function QuoteWidget() {
  const index = getDayOfYear() % quotes.length;
  const quote = quotes[index];

  return (
    <div className="glass-card p-5 sm:p-6 relative overflow-hidden">
      <p className="widget-label mb-4">Spreuk van de dag</p>
      <div className="relative quote-decoration pl-1">
        <p className="font-display text-lg sm:text-xl italic leading-relaxed">
          {quote.text}
        </p>
      </div>
      <p className="mt-3 text-sm text-muted">&mdash; {quote.attribution}</p>
    </div>
  );
}
