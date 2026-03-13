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
    <div className="rounded-xl border border-card-border bg-card-bg p-5">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted">
        Spreuk van de dag
      </p>
      <p className="mt-3 italic">&ldquo;{quote.text}&rdquo;</p>
      <p className="mt-2 text-sm text-muted">&mdash; {quote.attribution}</p>
    </div>
  );
}
