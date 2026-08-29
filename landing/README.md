# Voshuizen 14 — Public Landing Page

Public digital address card and local Veluwe area page for **Voshuizen 14** (Lieren, Apeldoorn).

- **Live URL:** [https://voshuizen14.nl](https://voshuizen14.nl) (and `https://voshuizen14.online`, `https://voshuizen14.pages.dev`)
- **Hosting:** Cloudflare Pages (Project: `voshuizen14`, root dir `landing`, build `npm run build`, output `out`)
- **Stack:** Next.js 16.3.3 Static Export (`output: "export"`), React 19, TypeScript, Tailwind CSS v4

## Development

```bash
npm install
npm run dev     # Starts local development server on http://localhost:3000
npm run build   # Produces static HTML/CSS/JS export in out/
npm run lint    # Runs ESLint checks
```

## AI Context

See the root [`AGENTS.md`](../AGENTS.md) for full project conventions and deployment details.
