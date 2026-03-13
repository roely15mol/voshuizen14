# Family Dashboard Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Voshuizen 14 landing page into a magazine-style family dashboard with NOS news, daily quotes, fun facts, history, waste collection info, and quick links.

**Architecture:** Async Server Component page that calls data-fetching functions in `src/lib/` directly. Local JSON data for quotes/facts. External APIs (NOS RSS, Wikipedia, mijnafvalwijzer) with 1-hour revalidation. Each widget renders independently with graceful fallbacks.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-03-13-family-dashboard-design.md`

---

## Chunk 1: Local Data and Static Widgets

### Task 1: Create quotes data file

**Files:**
- Create: `src/data/quotes.json`

- [ ] **Step 1: Create quotes.json with around 100 Dutch proverbs/quotes**

Array of objects with `text` (string) and `attribution` (string). Example entries:

```json
[
  { "text": "Wie goed doet, goed ontmoet.", "attribution": "Nederlands spreekwoord" },
  { "text": "De aanhouder wint.", "attribution": "Nederlands spreekwoord" },
  { "text": "Oost west, thuis best.", "attribution": "Nederlands spreekwoord" }
]
```

Include around 100 entries total. Mix of Dutch proverbs, well-known sayings, and quotes from Dutch authors.

- [ ] **Step 2: Verify the file is valid JSON**

Run: `node -e "const q = require('./src/data/quotes.json'); console.log(q.length + ' quotes loaded')"`
Expected: approximately 100 quotes loaded

- [ ] **Step 3: Commit**

```bash
git add src/data/quotes.json
git commit -m "feat: add Dutch quotes data file"
```

---

### Task 2: Create facts data file

**Files:**
- Create: `src/data/facts.json`

- [ ] **Step 1: Create facts.json with around 365 fun facts**

Plain string array. Example entries:

```json
[
  "Een octopus heeft drie harten en blauw bloed.",
  "Honing kan duizenden jaren goed blijven zonder te bederven.",
  "De Eiffeltoren kan in de zomer 15 cm hoger worden door uitzetting van het metaal.",
  "Een groep flamingo's heet een 'flamboyance'.",
  "Nederland heeft meer fietsen dan inwoners."
]
```

Include around 365 entries (one per day of the year). Short, interesting, family-friendly fun facts in Dutch.

- [ ] **Step 2: Verify the file is valid JSON**

Run: `node -e "const f = require('./src/data/facts.json'); console.log(f.length + ' facts loaded')"`
Expected: approximately 365 facts loaded

- [ ] **Step 3: Commit**

```bash
git add src/data/facts.json
git commit -m "feat: add daily fun facts data file"
```

---

### Task 3: Create QuoteWidget component

**Files:**
- Create: `src/components/widgets/QuoteWidget.tsx`

- [ ] **Step 1: Create the component**

Server Component (no "use client"). Imports quotes from `@/data/quotes.json`. Selects quote using `dayOfYear % quotes.length`. Renders card with label "Spreuk van de dag", italicized quote text, and attribution.

Helper function `getDayOfYear()`:
```ts
function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
```

Card styling: `rounded-xl border border-card-border bg-card-bg p-5`. Label: `text-sm font-semibold uppercase tracking-wider text-muted`.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/QuoteWidget.tsx
git commit -m "feat: add QuoteWidget component"
```

---

### Task 4: Create FactWidget component

**Files:**
- Create: `src/components/widgets/FactWidget.tsx`

- [ ] **Step 1: Create the component**

Server Component. Same pattern as QuoteWidget but imports from `@/data/facts.json`. Label: "Wist je dat?". Displays plain fact text (no italics). Uses same `getDayOfYear()` helper and card styling.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/FactWidget.tsx
git commit -m "feat: add FactWidget component"
```

---

### Task 5: Create QuickLinks component

**Files:**
- Create: `src/components/widgets/QuickLinks.tsx`

- [ ] **Step 1: Create the component**

Server Component. Hardcoded array of 6 links, each with `name`, `href`, and an inline SVG icon (Heroicons outline style, `h-5 w-5`):

| Name | URL |
|------|-----|
| Gemeente Apeldoorn | https://www.apeldoorn.nl |
| Buienradar | https://www.buienradar.nl |
| PostNL | https://www.postnl.nl/tracktrace/ |
| 112 Meldingen | https://www.112apeldoorn.nl |
| Thuisbezorgd | https://www.thuisbezorgd.nl |
| Rijksoverheid | https://www.rijksoverheid.nl |

Renders a card with label "Handige linkjes" and a `flex flex-wrap gap-3` container. Each link is an `<a>` tag with `inline-flex items-center gap-2 rounded-lg border border-card-border px-3 py-2 text-sm` and hover state `hover:border-accent hover:text-accent`. Links open in new tab.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/QuickLinks.tsx
git commit -m "feat: add QuickLinks component"
```

---

## Chunk 2: Data Fetching and API Widgets

### Task 6: Create news data-fetching function

**Files:**
- Create: `src/lib/news.ts`

- [ ] **Step 1: Create the fetch function**

Export interface `NewsItem` with fields: `title` (string), `link` (string), `pubDate` (string).

Export async function `fetchNews()` that returns `Promise<NewsItem[]>`:
- Fetches `https://feeds.nos.nl/nosnieuwsalgemeen` with `{ next: { revalidate: 3600 } }`
- Parses XML using regex (no DOMParser on server):
  - Match `<item>...</item>` blocks
  - Extract `<title>`, `<link>`, `<pubDate>` from each item
- Returns max 3 items
- Returns empty array on any error

- [ ] **Step 2: Verify the fetch works**

Run: `npx tsx -e "import {fetchNews} from './src/lib/news'; fetchNews().then(n => console.log(JSON.stringify(n, null, 2)))"`
Expected: Array of 1-3 NOS news items with title, link, pubDate

- [ ] **Step 3: Commit**

```bash
git add src/lib/news.ts
git commit -m "feat: add NOS news data fetching"
```

---

### Task 7: Create history data-fetching function

**Files:**
- Create: `src/lib/history.ts`

- [ ] **Step 1: Create the fetch function**

Export interface `HistoryEvent` with fields: `year` (number), `text` (string).

Export async function `fetchHistory()` that returns `Promise<HistoryEvent[]>`:
- Builds URL: `https://api.wikimedia.org/feed/v1/wikipedia/nl/onthisday/events/{MM}/{DD}` using current date
- Fetches with `{ next: { revalidate: 3600 }, headers: { Accept: "application/json" } }`
- Parses response: `data.events` array, take first 2 items, map to `{ year, text }`
- Returns empty array on any error or if no events found

- [ ] **Step 2: Verify the fetch works**

Run: `npx tsx -e "import {fetchHistory} from './src/lib/history'; fetchHistory().then(h => console.log(JSON.stringify(h, null, 2)))"`
Expected: Array of 0-2 history events (may be empty for some dates on Dutch Wikipedia)

- [ ] **Step 3: Commit**

```bash
git add src/lib/history.ts
git commit -m "feat: add Wikipedia history data fetching"
```

---

### Task 8: Research and create waste data-fetching function

**Files:**
- Create: `src/lib/waste.ts`

- [ ] **Step 1: Research the mijnafvalwijzer API**

The API needs verification. Try these approaches in order:
1. Fetch `https://api.mijnafvalwijzer.nl/webservices/appsinput/?postcode=XXXX&huisnummer=14` (use actual postal code for Voshuizen 14, Lieren — likely 7364AA area, verify)
2. If that needs an API key, try scraping `https://www.mijnafvalwijzer.nl/nl/POSTCODE/HUISNUMMER/`
3. Alternative: check if `afvalstoffendienstkalender.nl` works for Apeldoorn

Run test fetches to find the working approach.

- [ ] **Step 2: Create the fetch function**

Export interface `WasteCollection` with fields: `type` (string), `date` (string), `isToday` (boolean).

Export `wasteColors` record mapping waste types to Tailwind color classes:
- `gft` -> `text-green-600`
- `restafval` -> `text-gray-500`
- `papier` -> `text-blue-600`
- `pmd` -> `text-orange-500`

Export async function `fetchWaste()` that returns `Promise<WasteCollection | null>`:
- Uses postal code and house number verified in step 1
- Fetches with `{ next: { revalidate: 3600 } }`
- Parses response to find next upcoming collection date
- Compares with today's date to set `isToday`
- Returns null on any error

**Important:** Adapt parsing logic based on actual API response format discovered in step 1.

- [ ] **Step 3: Verify it works**

Test with actual postal code and check the response returns valid waste collection data.

- [ ] **Step 4: Commit**

```bash
git add src/lib/waste.ts
git commit -m "feat: add waste collection data fetching"
```

---

### Task 9: Create NewsWidget component

**Files:**
- Create: `src/components/widgets/NewsWidget.tsx`

- [ ] **Step 1: Create the component**

Async Server Component. Calls `fetchNews()` from `@/lib/news`.

If no news: render card with "Laatste nieuws" label and "Niet beschikbaar" text.

If news available: render card with padding `p-6`. First item rendered large (`text-xl font-semibold`) as a link to the NOS article with hover color `hover:text-accent`. Show time from `pubDate`. Remaining items shown as a list below a border separator, smaller text (`text-sm`), each linking to their article.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/NewsWidget.tsx
git commit -m "feat: add NewsWidget component"
```

---

### Task 10: Create HistoryWidget component

**Files:**
- Create: `src/components/widgets/HistoryWidget.tsx`

- [ ] **Step 1: Create the component**

Async Server Component. Calls `fetchHistory()` from `@/lib/history`.

If no events: show fallback using a fact from `@/data/facts.json` at offset `(dayOfYear + 180) % facts.length` to avoid overlap with FactWidget. Show label "Vandaag in de geschiedenis" with italic note "Geen historische feiten gevonden voor vandaag."

If events available: render list with year in `font-semibold text-accent`, mdash separator, and event text.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/HistoryWidget.tsx
git commit -m "feat: add HistoryWidget component"
```

---

### Task 11: Create WasteWidget component

**Files:**
- Create: `src/components/widgets/WasteWidget.tsx`

- [ ] **Step 1: Create the component**

Async Server Component. Calls `fetchWaste()` from `@/lib/waste`.

If null: render card with "Afval ophaaldag" label and "Niet beschikbaar" text.

If data available:
- Format date using `toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })`
- If `isToday`: show "Vandaag aan de straat!" in `text-lg font-semibold text-accent`
- Otherwise: show formatted date
- Show waste type with color from `wasteColors` map, capitalized

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/widgets/WasteWidget.tsx
git commit -m "feat: add WasteWidget component"
```

---

## Chunk 3: Page Layout and Integration

### Task 12: Update page.tsx with magazine layout

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx with the magazine layout**

Import all new widget components plus `Suspense` from React. Keep existing `services` array unchanged.

Add a `WidgetFallback` component for Suspense boundaries:
```tsx
function WidgetFallback() {
  return (
    <div className="rounded-xl border border-card-border bg-card-bg p-5 animate-pulse">
      <div className="h-4 w-24 rounded bg-card-border mb-3" />
      <div className="h-4 w-full rounded bg-card-border" />
    </div>
  );
}
```

Page layout (top to bottom):
1. Header — unchanged
2. Info bar (Clock + WeatherWidget) — unchanged
3. Featured news — `<Suspense fallback={<WidgetFallback />}><NewsWidget /></Suspense>` in `mb-6`
4. Two-column grid — `grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6`:
   - Left column (`space-y-4`): `<QuoteWidget />` + `<Suspense><HistoryWidget /></Suspense>`
   - Right column (`space-y-4`): `<FactWidget />` + `<Suspense><WasteWidget /></Suspense>`
5. Quick links — `<QuickLinks />` in `mb-10`
6. Services section — unchanged
7. Footer — unchanged

Only async components (NewsWidget, HistoryWidget, WasteWidget) need Suspense wrappers. Static components (QuoteWidget, FactWidget, QuickLinks) render immediately.

- [ ] **Step 2: Type check**

Run: `npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Start dev server and verify visually**

Run: `npm run dev`

Open http://localhost:3000 and verify:
- Header, clock, and weather show as before
- NOS news headline appears in a large featured card
- Two-column layout with quote + history (left) and fact + waste (right)
- Quick links row with 6 links
- Services section at bottom unchanged
- Responsive: resize to mobile width, columns should stack

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: magazine layout with all dashboard widgets"
```

---

### Task 13: Final verification and cleanup

- [ ] **Step 1: Run build to check for errors**

Run: `npm run build`
Expected: Build succeeds with no errors

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors (fix any that appear)

- [ ] **Step 3: Test dark mode**

Open browser, toggle to dark mode (or use browser dev tools). Verify all widgets look correct in dark mode.

- [ ] **Step 4: Test mobile responsiveness**

Use browser dev tools to test at 375px width (iPhone). Verify:
- All widgets stack vertically
- Text is readable, no horizontal overflow
- Quick links wrap nicely

- [ ] **Step 5: Final commit if any fixes were needed**

```bash
git add -A
git commit -m "fix: polish dashboard layout and responsiveness"
```
