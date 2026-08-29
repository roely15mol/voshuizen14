# Voshuizen 14 — Family Dashboard

Private resident dashboard for the residents of **Voshuizen 14**.

- **Live URL:** [https://home.voshuizen14.nl](https://home.voshuizen14.nl) (and `https://voshuizen14-home.pages.dev`)
- **Hosting:** Cloudflare Pages (Project: `voshuizen14-home`, root dir `home`, build `npm run build`, output `out`)
- **Stack:** Next.js 16.3.3 Static Export (`output: "export"`), React 19, TypeScript, Tailwind CSS v4
- **SEO/Robots:** Protected with `noindex` and `robots.txt` Disallow.

## Development

```bash
npm install
npm run dev     # Starts local development server on http://localhost:3000 (or 3001)
npm run build   # Produces static HTML/CSS/JS export in out/
npm run lint    # Runs ESLint checks
```

## AI Context

See the root [`AGENTS.md`](../AGENTS.md) for full project conventions and deployment details.
