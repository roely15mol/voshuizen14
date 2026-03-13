import { fetchNews } from "@/lib/news";

export default async function NewsWidget() {
  const news = await fetchNews();

  if (news.length === 0) {
    return (
      <div className="rounded-xl border border-card-border bg-card-bg p-5">
        <h2 className="text-sm font-medium text-muted">Laatste nieuws</h2>
        <p className="mt-2 text-foreground">Niet beschikbaar</p>
      </div>
    );
  }

  const [first, ...rest] = news;
  const firstTime = new Date(first.pubDate).toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-6">
      <h2 className="text-sm font-medium text-muted">Laatste nieuws</h2>

      <a
        href={first.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-xl font-semibold text-foreground hover:text-accent"
      >
        {first.title}
      </a>
      <p className="mt-1 text-sm text-muted">NOS {firstTime}</p>

      {rest.length > 0 && (
        <div className="mt-4 border-t border-card-border pt-4 space-y-2">
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
                className="block text-sm text-foreground hover:text-accent"
              >
                <span className="text-muted">NOS {time}</span> — {item.title}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
