# Public Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a photo-forward public landing page at `landing/` and move the existing dashboard to `home/`, enabling separate Coolify deployments.

**Architecture:** Two standalone Next.js apps in the same repo. `landing/` is a new photo-forward site with seasonal Veluwe imagery, address info, and SEO. `home/` is the current dashboard code moved as-is. No shared code between them.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript

---

## Chunk 1: Dashboard Migration to `home/`

### Task 1: Move existing project to `home/` subfolder

**Files:**
- Move: all current `src/`, `public/`, `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs` into `home/`

- [ ] **Step 1: Create `home/` directory and move all project files**

```bash
mkdir home
git mv src home/src
git mv public home/public
git mv package.json home/package.json
git mv package-lock.json home/package-lock.json 2>/dev/null || true
git mv next.config.ts home/next.config.ts
git mv tsconfig.json home/tsconfig.json
git mv postcss.config.mjs home/postcss.config.mjs
git mv eslint.config.mjs home/eslint.config.mjs
```

Note: The `docs/` directory stays at root level — it's repo-level documentation, not part of either app.

- [ ] **Step 2: Move remaining config files**

Check for and move any other config files (`.env`, `.env.local`, etc.):

```bash
# Move any remaining config files that belong to the Next.js app
git mv tailwind.config.ts home/tailwind.config.ts 2>/dev/null || true
git mv .env home/.env 2>/dev/null || true
git mv .env.local home/.env.local 2>/dev/null || true
```

- [ ] **Step 3: Verify the dashboard builds and runs**

```bash
cd home && npm install && npm run build
```

Expected: Build succeeds with no errors.

```bash
npm run dev
```

Expected: Dashboard loads at `localhost:3000` and looks identical to before.

- [ ] **Step 4: Add noindex meta tag to dashboard**

Edit `home/src/app/layout.tsx` — add `robots: "noindex, nofollow"` to the metadata export:

```typescript
export const metadata: Metadata = {
  title: "Voshuizen 14",
  description: "Welkom bij Voshuizen 14",
  robots: "noindex, nofollow",
  icons: {
    icon: "/favicon.ico",
  },
};
```

- [ ] **Step 5: Add robots.txt to dashboard**

Create `home/public/robots.txt`:

```
User-agent: *
Disallow: /
```

- [ ] **Step 6: Commit**

```bash
cd home && git add -A && cd ..
git add -A
git commit -m "refactor: move dashboard to home/ subfolder

Existing family dashboard moved to home/ as a standalone Next.js app.
Added noindex meta tag and restrictive robots.txt for privacy."
```

---

## Chunk 2: Landing Page Scaffold

### Task 2: Initialize the landing page project

**Files:**
- Create: `landing/package.json`
- Create: `landing/next.config.ts`
- Create: `landing/tsconfig.json`
- Create: `landing/postcss.config.mjs`
- Create: `landing/eslint.config.mjs`

- [ ] **Step 1: Scaffold Next.js project in `landing/`**

```bash
mkdir landing
npx create-next-app@latest landing --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

If prompted, accept defaults. This creates the `landing/` directory with all scaffolding files. If `--no-turbopack` flag is not recognized, omit it.

- [ ] **Step 2: Verify scaffold builds**

```bash
cd landing && npm run build
```

Expected: Build succeeds.

- [ ] **Step 3: Clean up scaffold boilerplate**

Delete the default `page.tsx` content — replace with a placeholder:

```typescript
export default function LandingPage() {
  return <main><h1>Voshuizen 14</h1></main>;
}
```

- [ ] **Step 4: Commit**

```bash
git add landing/
git commit -m "feat: scaffold landing page project in landing/"
```

### Task 3: Create data files

**Files:**
- Create: `landing/src/data/content.json`
- Create: `landing/src/data/seasons.json`
- Create: `landing/src/data/season-override.json`

- [ ] **Step 1: Create content.json with default content**

Create `landing/src/data/content.json`:

```json
{
  "welcome": {
    "title": "Welkom",
    "text": "Voshuizen 14 ligt aan de rand van de Veluwe, in het dorpje Lieren bij Apeldoorn. Omringd door bossen, heidevelden en stilte."
  },
  "address": {
    "street": "Voshuizen 14",
    "postalCode": "7364 BP",
    "city": "Lieren",
    "municipality": "Apeldoorn",
    "province": "Gelderland",
    "mapsQuery": "Voshuizen+14,+7364+BP+Lieren"
  },
  "delivery": {
    "text": "Pakketjes mogen bij de voordeur worden neergezet. Bij grote pakketten: bel aan."
  },
  "contact": {
    "email": "info@voshuizen14.nl"
  },
  "localArea": [
    {
      "name": "Beekbergerwoud",
      "description": "Een van de weinige oerbossen van Nederland, vlakbij Lieren.",
      "photo": "/photos/beekbergerwoud.jpg"
    },
    {
      "name": "Lierense Velden",
      "description": "Uitgestrekte heidevelden die in het najaar prachtig paars kleuren.",
      "photo": "/photos/lierense-velden.jpg"
    },
    {
      "name": "Loenen",
      "description": "Pittoresk dorp aan de rand van de Veluwe met historische watermolens.",
      "photo": "/photos/loenen.jpg"
    },
    {
      "name": "Paleis Het Loo",
      "description": "Koninklijk paleis met prachtige tuinen in Apeldoorn.",
      "photo": "/photos/paleis-het-loo.jpg"
    },
    {
      "name": "Apenheul",
      "description": "Uniek primatenpark waar apen vrij rondlopen tussen de bezoekers.",
      "photo": "/photos/apenheul.jpg"
    }
  ],
  "dashboard": {
    "url": "https://home.voshuizen14.nl",
    "label": "Bewoner? Ga naar het dashboard"
  }
}
```

- [ ] **Step 2: Create seasons.json**

Create `landing/src/data/seasons.json`:

```json
{
  "lente": {
    "months": [3, 4, 5],
    "heroPhoto": "/photos/seasons/lente.jpg",
    "accent": "#8b9a6b",
    "accentLight": "rgba(139, 154, 107, 0.1)",
    "tip": "De Veluwe komt tot leven: bosanemonen bloeien en de eerste lammetjes verschijnen in de weilanden.",
    "greeting": "Lente aan de Veluwe"
  },
  "zomer": {
    "months": [6, 7, 8],
    "heroPhoto": "/photos/seasons/zomer.jpg",
    "accent": "#2d7d46",
    "accentLight": "rgba(45, 125, 70, 0.1)",
    "tip": "Wandel door de eindeloze bossen of fiets langs de sprengen. De langste dagen van het jaar.",
    "greeting": "Zomer op de Veluwe"
  },
  "herfst": {
    "months": [9, 10, 11],
    "heroPhoto": "/photos/seasons/herfst.jpg",
    "accent": "#c4722e",
    "accentLight": "rgba(196, 114, 46, 0.1)",
    "tip": "De heide kleurt paars, de bossen worden goud en de edelherten brullen op de Veluwe.",
    "greeting": "Herfst op de Veluwe"
  },
  "winter": {
    "months": [12, 1, 2],
    "heroPhoto": "/photos/seasons/winter.jpg",
    "accent": "#5a7d9a",
    "accentLight": "rgba(90, 125, 154, 0.1)",
    "tip": "Bevroren vennen, rijp op de heide en stilte in de bossen. De Veluwe op zijn mooist.",
    "greeting": "Winter op de Veluwe"
  },
  "kerst": {
    "months": [],
    "heroPhoto": "/photos/seasons/winter.jpg",
    "accent": "#8b1a1a",
    "accentLight": "rgba(139, 26, 26, 0.1)",
    "tip": "Fijne feestdagen vanuit Voshuizen 14!",
    "greeting": "Fijne Kerst"
  },
  "koningsdag": {
    "months": [],
    "heroPhoto": "/photos/seasons/lente.jpg",
    "accent": "#ff6600",
    "accentLight": "rgba(255, 102, 0, 0.1)",
    "tip": "Lang leve de Koning!",
    "greeting": "Gelukkige Koningsdag"
  }
}
```

- [ ] **Step 3: Create season-override.json**

Create `landing/src/data/season-override.json`:

```json
{
  "override": null
}
```

- [ ] **Step 4: Commit**

```bash
git add landing/src/data/
git commit -m "feat: add landing page content and seasonal data"
```

### Task 4: Create seasons utility

**Files:**
- Create: `landing/src/lib/seasons.ts`

- [ ] **Step 1: Create seasons.ts**

Create `landing/src/lib/seasons.ts`:

```typescript
import fs from "fs";
import path from "path";

interface SeasonData {
  months: number[];
  heroPhoto: string;
  accent: string;
  accentLight: string;
  tip: string;
  greeting: string;
}

type SeasonKey = string;

export function getCurrentSeason(): { key: SeasonKey; data: SeasonData } {
  const seasonsPath = path.join(process.cwd(), "src/data/seasons.json");
  const overridePath = path.join(process.cwd(), "src/data/season-override.json");

  const seasons: Record<SeasonKey, SeasonData> = JSON.parse(
    fs.readFileSync(seasonsPath, "utf-8")
  );

  // Check for manual override
  try {
    const override = JSON.parse(fs.readFileSync(overridePath, "utf-8"));
    if (override.override && seasons[override.override]) {
      return { key: override.override, data: seasons[override.override] };
    }
  } catch {
    // No override file or invalid — fall through to auto-detection
  }

  // Auto-detect season by current month
  const month = new Date().getMonth() + 1; // 1-12
  for (const [key, data] of Object.entries(seasons)) {
    if (data.months.includes(month)) {
      return { key, data };
    }
  }

  // Fallback to lente
  return { key: "lente", data: seasons.lente };
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd landing && npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add landing/src/lib/seasons.ts
git commit -m "feat: add season detection with manual override"
```

---

## Chunk 3: Landing Page Components

### Task 5: Download placeholder photos

**Files:**
- Create: `landing/public/photos/seasons/lente.jpg`
- Create: `landing/public/photos/seasons/zomer.jpg`
- Create: `landing/public/photos/seasons/herfst.jpg`
- Create: `landing/public/photos/seasons/winter.jpg`
- Create: `landing/public/photos/beekbergerwoud.jpg` (and other local area photos)

- [ ] **Step 1: Create photo directories**

```bash
mkdir -p landing/public/photos/seasons
```

- [ ] **Step 2: Download Unsplash photos for seasons**

Use free Unsplash images of the Veluwe/Dutch nature. Download 4 landscape photos (one per season) and 5 local area photos.

```bash
# Season hero photos (1920x1080 landscape)
curl -L "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=1920&h=1080&fit=crop" -o landing/public/photos/seasons/lente.jpg
curl -L "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop" -o landing/public/photos/seasons/zomer.jpg
curl -L "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop" -o landing/public/photos/seasons/herfst.jpg
curl -L "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&h=1080&fit=crop" -o landing/public/photos/seasons/winter.jpg
```

The implementing agent should verify these URLs return valid images. If any URL fails, search Unsplash for suitable alternatives. Look for: spring blossoms, summer forest, autumn heather, winter frost — preferably Dutch/Veluwe landscapes. As a last resort, generate solid-color placeholder JPEGs using ImageMagick: `convert -size 1920x1080 xc:#8b9a6b landing/public/photos/seasons/lente.jpg`

- [ ] **Step 3: Download welcome and local area placeholder photos**

```bash
# Welcome section secondary photo (800x600)
curl -L "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=800&h=600&fit=crop" -o landing/public/photos/welcome.jpg

# Local area photos (800x600)
curl -L "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop" -o landing/public/photos/beekbergerwoud.jpg
curl -L "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop" -o landing/public/photos/lierense-velden.jpg
curl -L "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop" -o landing/public/photos/loenen.jpg
curl -L "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&h=600&fit=crop" -o landing/public/photos/paleis-het-loo.jpg
curl -L "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&h=600&fit=crop" -o landing/public/photos/apenheul.jpg
```

- [ ] **Step 4: Commit**

```bash
git add landing/public/photos/
git commit -m "feat: add placeholder Unsplash photos for landing page"
```

### Task 6: Create landing page styles

**Files:**
- Modify: `landing/src/app/globals.css`

- [ ] **Step 1: Replace globals.css with landing page styles**

The landing page uses a photo-forward design with white/semi-transparent overlays:

```css
@import "tailwindcss";

@theme inline {
  --font-display: var(--font-display);
  --font-body: var(--font-body);
}

body {
  font-family: var(--font-body), system-ui, sans-serif;
  color: #1a1a1a;
  overflow-x: hidden;
}

/* Photo hero background */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

/* White card overlay */
.card-overlay {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  position: relative;
  z-index: 1;
}

/* Area highlight cards */
.area-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.area-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Scroll indicator */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

.scroll-indicator {
  animation: scrollBounce 2s ease-in-out infinite;
}

/* Smooth entrance */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fadeUp 0.8s ease-out both;
}
```

- [ ] **Step 2: Commit**

```bash
git add landing/src/app/globals.css
git commit -m "feat: add photo-forward landing page styles"
```

### Task 7: Create landing page layout

**Files:**
- Modify: `landing/src/app/layout.tsx`

- [ ] **Step 1: Update layout.tsx with fonts and metadata**

Replace `landing/src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voshuizen14.nl"),
  title: "Voshuizen 14 — Lieren, Veluwe",
  description:
    "Voshuizen 14 ligt aan de rand van de Veluwe, in het dorpje Lieren bij Apeldoorn. Omringd door bossen, heidevelden en stilte.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Voshuizen 14 — Lieren, Veluwe",
    description:
      "Voshuizen 14 ligt aan de rand van de Veluwe, in het dorpje Lieren bij Apeldoorn.",
    type: "website",
    locale: "nl_NL",
    url: "https://voshuizen14.nl",
    images: ["/photos/seasons/lente.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Place",
      name: "Voshuizen 14",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Voshuizen 14",
        postalCode: "7364 BP",
        addressLocality: "Lieren",
        addressRegion: "Gelderland",
        addressCountry: "NL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 52.1833,
        longitude: 5.9833,
      },
    },
    {
      "@type": "WebSite",
      name: "Voshuizen 14",
      url: "https://voshuizen14.nl",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

Note: `dangerouslySetInnerHTML` is safe here — the JSON-LD content is a static object defined in source code, not user input. This is the standard Next.js pattern for structured data.

- [ ] **Step 2: Commit**

```bash
git add landing/src/app/layout.tsx
git commit -m "feat: add landing page layout with SEO metadata and JSON-LD"
```

### Task 8: Create Hero component

**Files:**
- Create: `landing/src/components/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

Create `landing/src/components/Hero.tsx`:

```typescript
import { getCurrentSeason } from "@/lib/seasons";
import { HeroWeather } from "./HeroWeather";

export default function Hero() {
  const { data: season } = getCurrentSeason();

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${season.heroPhoto})` }}
    >
      <div className="card-overlay text-center max-w-lg mx-4 animate-fade-up">
        <h1
          className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 mb-2"
        >
          Voshuizen{" "}
          <span style={{ color: season.accent }}>14</span>
        </h1>
        <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mt-2">
          Lieren &middot; Veluwe
        </p>
        <HeroWeather />
        <p className="text-gray-400 text-xs mt-2">{season.greeting}</p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <svg
          className="w-6 h-6 text-white/70"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create HeroWeather.tsx**

Create `landing/src/components/HeroWeather.tsx` — a client component for weather in the hero card:

```typescript
"use client";

import { useEffect, useState } from "react";

export function HeroWeather() {
  const [weather, setWeather] = useState<{ temp: number; desc: string } | null>(null);

  useEffect(() => {
    fetch("https://wttr.in/Lieren,Netherlands?format=j1")
      .then((res) => res.json())
      .then((data) => {
        const current = data.current_condition[0];
        setWeather({
          temp: parseInt(current.temp_C),
          desc: current.lang_nl?.[0]?.value || current.weatherDesc[0].value,
        });
      })
      .catch(() => {});
  }, []);

  if (!weather) return null;

  return (
    <p className="text-gray-400 text-xs mt-3">
      {weather.temp}&deg;C &middot; {weather.desc}
    </p>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add landing/src/components/Hero.tsx landing/src/components/HeroWeather.tsx
git commit -m "feat: add Hero component with seasonal background and weather"
```

### Task 9: Create Welcome component

**Files:**
- Create: `landing/src/components/Welcome.tsx`

- [ ] **Step 1: Create Welcome.tsx**

Create `landing/src/components/Welcome.tsx`:

```typescript
import Image from "next/image";
import content from "@/data/content.json";

export default function Welcome() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto grid gap-10 sm:grid-cols-2 items-center">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
            {content.welcome.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {content.welcome.text}
          </p>
        </div>
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
          <Image
            src="/photos/welcome.jpg"
            alt="De Veluwe bij Lieren"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
```

Note: Add a secondary landscape photo as `landing/public/photos/welcome.jpg` in Task 5.

- [ ] **Step 2: Commit**

```bash
git add landing/src/components/Welcome.tsx
git commit -m "feat: add Welcome section component"
```

### Task 10: Create Location component

**Files:**
- Create: `landing/src/components/Location.tsx`

- [ ] **Step 1: Create Location.tsx**

Create `landing/src/components/Location.tsx`:

```typescript
import content from "@/data/content.json";

export default function Location() {
  const { address, delivery } = content;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address.mapsQuery}`;

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-gray-900 mb-10 text-center">
          Locatie
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Address card */}
          <div className="card-overlay">
            <h3 className="font-semibold text-gray-900 mb-3">Adres</h3>
            <address className="text-gray-600 not-italic leading-relaxed">
              {address.street}
              <br />
              {address.postalCode} {address.city}
              <br />
              {address.municipality}, {address.province}
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              Bekijk op Google Maps
            </a>
          </div>

          {/* Delivery card */}
          <div className="card-overlay">
            <h3 className="font-semibold text-gray-900 mb-3">
              Bezorginstructies
            </h3>
            <p className="text-gray-600 leading-relaxed">{delivery.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add landing/src/components/Location.tsx
git commit -m "feat: add Location section with address and delivery info"
```

### Task 11: Create LocalArea component

**Files:**
- Create: `landing/src/components/LocalArea.tsx`

- [ ] **Step 1: Create LocalArea.tsx**

Create `landing/src/components/LocalArea.tsx`:

```typescript
import Image from "next/image";
import content from "@/data/content.json";
import { getCurrentSeason } from "@/lib/seasons";

export default function LocalArea() {
  const { data: season } = getCurrentSeason();

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-gray-900 mb-4 text-center">
          De Veluwe &amp; Lieren
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
          {season.tip}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.localArea.map((area) => (
            <div key={area.name} className="area-card">
              <div className="relative h-48">
                <Image
                  src={area.photo}
                  alt={area.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {area.name}
                </h3>
                <p className="text-gray-500 text-sm">{area.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add landing/src/components/LocalArea.tsx
git commit -m "feat: add LocalArea section with Veluwe highlights"
```

### Task 12: Create Contact component

**Files:**
- Create: `landing/src/components/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

Create `landing/src/components/Contact.tsx`:

```typescript
import content from "@/data/content.json";

export default function Contact() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-gray-900 mb-6">
          Contact
        </h2>
        <p className="text-gray-600 mb-6">
          Neem gerust contact met ons op.
        </p>
        <a
          href={`mailto:${content.contact.email}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          {content.contact.email}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add landing/src/components/Contact.tsx
git commit -m "feat: add Contact section with mailto link"
```

### Task 13: Create LandingFooter component

**Files:**
- Create: `landing/src/components/LandingFooter.tsx`

- [ ] **Step 1: Create LandingFooter.tsx**

Create `landing/src/components/LandingFooter.tsx`:

```typescript
import content from "@/data/content.json";
import { getCurrentSeason } from "@/lib/seasons";

export default function LandingFooter() {
  const { data: season } = getCurrentSeason();
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 px-4 border-t border-gray-200">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gray-400 text-xs mb-3">{season.greeting}</p>
        <a
          href={content.dashboard.url}
          className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
        >
          {content.dashboard.label}
        </a>
        <p className="text-gray-300 text-xs mt-4">
          &copy; {year} Voshuizen 14
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add landing/src/components/LandingFooter.tsx
git commit -m "feat: add landing page footer with dashboard link"
```

---

## Chunk 4: Assembly, SEO & Final Verification

### Task 14: Assemble the landing page

**Files:**
- Modify: `landing/src/app/page.tsx`

- [ ] **Step 1: Assemble all components in page.tsx**

Replace `landing/src/app/page.tsx`:

```typescript
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import Location from "@/components/Location";
import LocalArea from "@/components/LocalArea";
import Contact from "@/components/Contact";
import LandingFooter from "@/components/LandingFooter";

export const revalidate = 3600;

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Location />
      <LocalArea />
      <Contact />
      <LandingFooter />
    </main>
  );
}
```

- [ ] **Step 2: Build and verify**

```bash
cd landing && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 3: Run dev server and visually verify**

```bash
cd landing && npm run dev
```

Expected: Landing page loads at `localhost:3000` with hero photo, all sections visible, seasonal content showing for the current month (March = lente).

- [ ] **Step 4: Commit**

```bash
git add landing/src/app/page.tsx
git commit -m "feat: assemble landing page with all sections"
```

### Task 15: Add sitemap and robots.txt

**Files:**
- Create: `landing/src/app/sitemap.ts`
- Create: `landing/src/app/robots.ts`

- [ ] **Step 1: Create sitemap.ts**

Create `landing/src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://voshuizen14.nl",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
```

- [ ] **Step 2: Create robots.ts**

Create `landing/src/app/robots.ts`:

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://voshuizen14.nl/sitemap.xml",
  };
}
```

- [ ] **Step 3: Build and verify SEO output**

```bash
cd landing && npm run build
```

Expected: Build succeeds. `/sitemap.xml` and `/robots.txt` routes are generated.

- [ ] **Step 4: Commit**

```bash
git add landing/src/app/sitemap.ts landing/src/app/robots.ts
git commit -m "feat: add sitemap and robots.txt for landing page"
```

### Task 16: Update root .gitignore

**Files:**
- Modify: `.gitignore` (root level)

- [ ] **Step 1: Update .gitignore for both projects**

Read the existing `.gitignore` first, then merge these entries into it (don't replace existing content):

```
# Dependencies
home/node_modules/
landing/node_modules/

# Next.js build output
home/.next/
landing/.next/

# Environment files
home/.env*.local
landing/.env*.local

# Misc
.superpowers/
*.tsbuildinfo
.DS_Store
```

Keep any existing entries (e.g., `.playwright-mcp/`, screenshot patterns) that are already in the file.

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: update gitignore for two-project repo structure"
```

### Task 17: Final verification

- [ ] **Step 1: Build both projects**

```bash
cd home && npm run build && cd ../landing && npm run build
```

Expected: Both builds succeed.

- [ ] **Step 2: Run both projects simultaneously**

Terminal 1:
```bash
cd home && npm run dev -- -p 3001
```

Terminal 2:
```bash
cd landing && npm run dev
```

Expected:
- `localhost:3000` — landing page with seasonal hero, all sections
- `localhost:3001` — family dashboard, unchanged from before

- [ ] **Step 3: Verify landing page sections**

Check each section loads:
1. Hero with seasonal background photo, "VOSHUIZEN 14" card, and weather
2. Welcome text with secondary landscape photo
3. Location with address and Google Maps link
4. Local area cards with photos
5. Contact with mailto link
6. Footer with dashboard link and seasonal greeting

- [ ] **Step 4: Verify dashboard unchanged**

Check `localhost:3001` — dashboard should look and function identically to before the migration.

- [ ] **Step 5: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "feat: complete landing page and dashboard separation"
```
