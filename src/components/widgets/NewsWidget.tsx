import { fetchNews } from "@/lib/news";

export default async function NewsWidget() {
  const news = await fetchNews();

  if (news.length === 0) {
    return (
      <div className="news-card p-6">
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
    <div className="news-card p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block h-2 w-2 rounded-full bg-news-accent animate-pulse" />
        <p className="widget-label !text-news-accent">Laatste nieuws</p>
      </div>

      <a
        href={first.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-accent">
          {first.title}
        </h2>
        <p className="mt-2 text-sm text-muted">
          NOS &middot; {firstTime}
        </p>
      </a>

      {rest.length > 0 && (
        <div className="mt-5 border-t border-card-border pt-4 space-y-3">
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
                className="flex items-baseline gap-3 text-sm transition-colors hover:text-accent group"
              >
                <span className="shrink-0 text-xs text-muted tabular-nums">{time}</span>
                <span className="group-hover:text-accent">{item.title}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
