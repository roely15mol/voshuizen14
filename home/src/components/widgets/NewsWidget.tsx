import { fetchNews } from "@/lib/news";

export default async function NewsWidget() {
  const news = await fetchNews();

  if (news.length === 0) {
    return (
      <div className="glass-card p-8">
        <p className="widget-label">Laatste nieuws</p>
        <p className="mt-3 text-muted">Niet beschikbaar</p>
      </div>
    );
  }

  const [first, ...rest] = news;
  const firstTime = new Date(first.pubDate).toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="glass-card p-8 sm:p-10 relative overflow-hidden">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-news-accent via-news-accent/50 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="live-pulse inline-block h-2.5 w-2.5 rounded-full bg-news-accent" />
          <span className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-news-accent/70">
            Live nieuws
          </span>
        </div>

        <a
          href={first.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight text-foreground transition-colors group-hover:text-accent">
            {first.title}
          </h2>
          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/50">
              NOS
            </span>
            <span>{firstTime}</span>
          </div>
        </a>

        {rest.length > 0 && (
          <div className="mt-8 pt-6 border-t border-card-border grid gap-4 sm:grid-cols-2">
            {rest.map((item) => {
              const time = new Date(item.pubDate).toLocaleTimeString("nl-NL", {
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <a
                  key={item.link}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl bg-surface p-4 border border-card-border transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <p className="text-sm leading-snug font-medium text-foreground/80 transition-colors group-hover:text-accent">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs text-muted">{time}</p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
