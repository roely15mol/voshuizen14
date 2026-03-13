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
    <div className="quote-card p-6">
      <p className="widget-label mb-5">Spreuk van de dag</p>
      <p className="font-display text-xl sm:text-2xl italic leading-relaxed relative z-10">
        {quote.text}
      </p>
      <p className="mt-4 text-sm text-muted">&mdash; {quote.attribution}</p>
    </div>
  );
}
