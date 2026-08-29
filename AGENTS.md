# AGENTS.md

Project and architecture guidelines for AI assistants (Antigravity, Claude Code, Cursor, OpenCode, etc.).

## 📌 Repository Overview

This repository is a monorepo containing two decoupled Next.js web applications for **Voshuizen 14**:
1. **`landing/`**: Public digital address card and local Veluwe area showcase at [https://voshuizen14.nl](https://voshuizen14.nl).
2. **`home/`**: Private family dashboard at [https://home.voshuizen14.nl](https://home.voshuizen14.nl).

---

## ⚡ Deployment & Infrastructure (Cloudflare Pages)

Both sites are hosted on **Cloudflare Pages** (migrated from Coolify). They are connected to the same GitHub repository (`roely15mol/voshuizen14`), but configured as separate Cloudflare Pages projects using distinct root directories:

| Parameter | Public Landing Page | Resident Dashboard |
|---|---|---|
| **Cloudflare Project** | `voshuizen14` | `voshuizen14-home` |
| **Root Directory** | `landing` | `home` |
| **Build Command** | `npm run build` | `npm run build` |
| **Build Output Directory** | `out` | `out` |
| **Production Domain** | `https://voshuizen14.nl` | `https://home.voshuizen14.nl` |
| **Additional Aliases** | `voshuizen14.online`, `www.voshuizen14.nl`, `www.voshuizen14.online`, `voshuizen14.pages.dev` | `voshuizen14-home.pages.dev` |
| **Production Branch** | `main` | `main` |
| **Indexing / SEO** | Indexed (`robots.ts`, `sitemap.ts`, JSON-LD) | `noindex` (`robots.ts` Disallow: `/`) |
| **Edge Headers** | `landing/public/_headers` | `home/public/_headers` |

---

## 🧱 Static Export & Build Rules (CRITICAL)

Both applications build strictly as **static HTML/CSS/JS exports** (`output: "export"` in `next.config.ts`):

1. **No Node.js Server Runtime:** Do not use Node-only server APIs, server actions requiring dynamic servers, or Next.js middleware unless implemented via Cloudflare Pages Functions (`functions/`).
2. **Dynamic Route Exports:** Any dynamic routes (`[slug]`) must implement `generateStaticParams()`.
3. **Images:** `next.config.ts` must keep `images: { unoptimized: true }` so `next/image` generates standard static `<img>` tags compatible with static exports.
4. **Metadata Routes:** Routes like `robots.ts` and `sitemap.ts` in `landing/` must specify `export const dynamic = "force-static";`.
5. **Client-side Fetching:** Dynamic external data (e.g. Open-Meteo weather API, NOS RSS feeds) should be fetched on the client side (`useEffect` / SWR) or pre-rendered at build time.

---

## 📂 Subproject Structures

### 1. `landing/` (Public Landing)
- `src/app/page.tsx`: Single-page layout featuring seasonal Veluwe landscape hero, address card, live weather, local highlights, and contact information.
- `src/app/robots.ts` & `src/app/sitemap.ts`: SEO crawler directives.
- `src/data/seasons.json`: Rotating seasonal image metadata and tips (Spring, Summer, Autumn, Winter, Christmas).
- `public/photos/`: High-resolution Veluwe and nature photography.
- `public/_headers`: Security headers (CSP, HSTS) and caching directives (`/_next/static/*` and `/photos/*`).

### 2. `home/` (Family Dashboard)
- `src/app/page.tsx`: Resident portal with daily inspirational quotes, weather widgets, local news, calendar shortcuts, and home utilities.
- `functions/api/`: Cloudflare Pages Functions serving live JSON consumed client-side — `GET /api/news` (NOS RSS proxy) and `GET /api/waste` (Circulus collection lookup). These run at the edge only; they do not exist under `next dev`.
- `public/_headers`: Security headers preventing indexing and framing.

---

## 🛠 Local Commands

```bash
# Work on Landing Page
cd landing
npm install
npm run dev      # http://localhost:3000
npm run build    # Generates landing/out/
npm run lint

# Work on Family Dashboard
cd home
npm install
npm run dev      # http://localhost:3000
npm run build    # Generates home/out/
npm run lint
```

---

## 🔒 Privacy & OpSec Rules

- **Landing Page (`voshuizen14.nl`):** Public. Keep personal family schedules, internal credentials, and private IoT endpoints strictly OFF the landing page.
- **Family Dashboard (`home.voshuizen14.nl`):** Private. Do not link to private internal homelab services with public credentials.
