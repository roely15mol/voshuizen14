export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
}

export async function fetchNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch("https://feeds.nos.nl/nosnieuwsalgemeen", {
      next: { revalidate: 3600 },
    });
    const xml = await res.text();

    const items: NewsItem[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match: RegExpExecArray | null;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
      const block = match[1];

      const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/);
      const pubDateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

      if (titleMatch && linkMatch && pubDateMatch) {
        // Strip CDATA wrappers if present
        const title = titleMatch[1]
          .replace(/<!\[CDATA\[/, "")
          .replace(/\]\]>/, "")
          .trim();
        const link = linkMatch[1].trim();
        const pubDate = pubDateMatch[1].trim();

        items.push({ title, link, pubDate });
      }
    }

    return items;
  } catch {
    return [];
  }
}
