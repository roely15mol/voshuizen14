# Voshuizen 14

[![Cloudflare Pages](https://img.shields.io/badge/deployed%20on-Cloudflare%20Pages-F38020.svg?logo=cloudflare)](https://voshuizen14.nl)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.3-black.svg?logo=next.js)](https://nextjs.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com)

Monorepo containing the web applications for **Voshuizen 14** (Lieren, Veluwe): a public digital address card and a private family dashboard.

---

## 🌐 Websites & Domains

| Application | Directory | Production Domain | Cloudflare Pages Project | Description |
|---|---|---|---|---|
| **Public Landing** | [`landing/`](./landing) | [https://voshuizen14.nl](https://voshuizen14.nl)<br>_Aliases: `voshuizen14.online`, `www.voshuizen14.nl`, `www.voshuizen14.online`_ | `voshuizen14`<br>(`voshuizen14.pages.dev`) | Photo-forward digital address card, seasonal Veluwe photography, local area information, weather widget, and contact details. |
| **Family Dashboard** | [`home/`](./home) | [https://home.voshuizen14.nl](https://home.voshuizen14.nl) | `voshuizen14-home`<br>(`voshuizen14-home.pages.dev`) | Private resident dashboard with daily quotes, news feeds, weather, calendar, and household utilities. (`noindex` protected) |

🤖 **AI Agent Context:** See [AGENTS.md](AGENTS.md) for full architecture, deployment rules, and development guidelines.

---

## ⚡ Hosting & Deployment (Cloudflare Pages)

Both applications are deployed as **Static Exports** to **Cloudflare Pages** from this single GitHub repository (`roely15mol/voshuizen14`):

### 1. Landing Page Project (`voshuizen14`)
- **Root Directory:** `landing`
- **Build Command:** `npm run build`
- **Output Directory:** `out`
- **Custom Domains:** `voshuizen14.nl`, `voshuizen14.online` (+ www subdomains)
- **Edge Headers:** Defined in [`landing/public/_headers`](./landing/public/_headers) (CSP, HSTS, immutable caching for `/_next/static/*` and `/photos/*`).

### 2. Family Dashboard Project (`voshuizen14-home`)
- **Root Directory:** `home`
- **Build Command:** `npm run build`
- **Output Directory:** `out`
- **Custom Domains:** `home.voshuizen14.nl`
- **Edge Headers:** Defined in [`home/public/_headers`](./home/public/_headers) (CSP, HSTS, security headers).

Every push to `main` automatically triggers independent Cloudflare Pages builds for both projects.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16.3.3 (App Router with `output: "export"`)
- **Runtime:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Edge & CDN:** Cloudflare Pages (Global Anycast CDN, HTTP/3, Brotli)

---

## 🚀 Local Development

Both applications are standalone Next.js projects inside their respective directories:

### Public Landing Page (`landing/`)
```bash
cd landing
npm install
npm run dev     # Starts local server on http://localhost:3000
npm run build   # Generates static export in landing/out/
```

### Family Dashboard (`home/`)
```bash
cd home
npm install
npm run dev     # Starts local server on http://localhost:3000 (or 3001)
npm run build   # Generates static export in home/out/
```

---

## 📄 License

Private &copy; Voshuizen 14. All rights reserved.
