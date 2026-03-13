# Voshuizen 14 Family Dashboard

## Summary

Transform the current landing page into a magazine-style family dashboard with daily content and practical widgets. All data comes from free public APIs or local JSON files. No privacy-sensitive information, no accounts required.

## Context

- Domain: voshuizen14.nl / voshuizen14.online
- Location: Voshuizen 14, Lieren, Gemeente Apeldoorn
- Audience: Family household including non-techie parents
- Stack: Next.js 16, React 19, Tailwind CSS 4, TypeScript
- Current state: Landing page with header, clock, weather widget, and 6 inactive service cards

## Layout: Magazine Style

Page structure from top to bottom:

1. **Header** - "Voshuizen 14" + "Welkom thuis" (existing, unchanged)
2. **Info bar** - Clock + Weather (existing, unchanged)
3. **Featured card** - Large NOS news block with headline, links to article
4. **Two-column grid:**
   - Left: Quote of the day + This day in history
   - Right: Daily fun fact + Waste collection day
5. **Quick links** - Horizontal row with icons (Gemeente Apeldoorn, Buienradar, 112, PostNL, Thuisbezorgd, Rijksoverheid)
6. **Services** - Existing grid with "Binnenkort" cards (unchanged)
7. **Footer** - Existing (unchanged)

Responsive: On mobile the two-column grid stacks vertically. Featured card and quick links remain full-width.

## Widgets

### NewsWidget (Featured)
- Source: NOS RSS feed (`https://feeds.nos.nl/nosnieuwsalgemeen`)
- Displays: 1-3 headlines, most recent prominently
- Links to NOS article
- RSS XML parsed server-side using regex/string extraction (no DOMParser - that's browser-only)
- Fetched via shared data-fetching function (not API route - see Data Flow)

### QuoteWidget
- Source: Local `src/data/quotes.json` (~100 Dutch proverbs/quotes)
- Selection: Based on day of year (deterministic, changes daily)
- Display: Italicized quote text with attribution if applicable

### HistoryWidget
- Source: Wikimedia REST API: `https://api.wikimedia.org/feed/v1/wikipedia/nl/onthisday/events/{MM}/{DD}`
- Displays: 1-2 historical events for today's date
- Note: Dutch Wikipedia coverage for "on this day" can be sparse on many dates
- Fallback: Shows a fact from local data if API fails or returns no results (expected for many dates)
- Fetched via shared data-fetching function (see Data Flow)

### FactWidget
- Source: Local `src/data/facts.json` (~365 fun facts, one per day)
- Selection: Based on day of year (deterministic)
- Display: Short fun fact text

### WasteWidget
- Source: `mijnafvalwijzer.nl` API using postal code + house number
- Endpoint: `https://api.mijnafvalwijzer.nl/webservices/appsinput/?postcode=XXXX&huisnummer=14` (postal code to be configured, verify if free API key is needed)
- Displays: Next collection date + waste type
- Color coding: Green (GFT), Grey (Restafval), Blue (Papier), Orange (PMD)
- Special state: "Vandaag aan de straat!" when collection is today
- Fetched via shared data-fetching function (see Data Flow)

### QuickLinks
- Hardcoded links with icons
- Default set: Gemeente Apeldoorn, Buienradar, PostNL Track & Trace, 112 Meldingen, Thuisbezorgd, Rijksoverheid

## File Structure

### New components
- `src/components/widgets/NewsWidget.tsx`
- `src/components/widgets/QuoteWidget.tsx`
- `src/components/widgets/HistoryWidget.tsx`
- `src/components/widgets/FactWidget.tsx`
- `src/components/widgets/WasteWidget.tsx`
- `src/components/widgets/QuickLinks.tsx`

### New data-fetching functions
- `src/lib/news.ts` - Fetches and parses NOS RSS feed
- `src/lib/waste.ts` - Fetches waste calendar from mijnafvalwijzer
- `src/lib/history.ts` - Fetches Wikipedia "on this day" events

### New data files
- `src/data/quotes.json` - Dutch proverbs and quotes
- `src/data/facts.json` - Fun facts indexed by day of year

### Modified files
- `src/app/page.tsx` - New magazine layout with widget sections

## Data Flow

1. `page.tsx` is an async Server Component
2. Data-fetching logic lives in `src/lib/` as async functions (e.g., `fetchNews()`, `fetchWaste()`, `fetchHistory()`)
3. `page.tsx` calls these functions directly (not via API routes — calling own API routes from Server Components is a Next.js anti-pattern)
4. Each fetch uses `next: { revalidate: 3600 }` for 1-hour caching
5. Local JSON data (quotes, facts) imported directly as modules
6. Clock and weather remain Client Components (need browser APIs)
7. JSON data files are arrays; selection uses `array[dayOfYear % array.length]`

Note: API routes are removed from the design. All data fetching happens server-side in `src/lib/`.

## Styling

- Maintains existing warm color scheme (earth tones, `#c4956a` accent)
- Widget cards use same styling as ServiceCards: `bg-card-bg`, `border-card-border`, `rounded-xl`
- Featured news card gets larger padding and font-size
- Widget labels: `text-muted uppercase tracking-wider`
- Dark mode works automatically via existing CSS variables
- No new dependencies

## Error Handling

- Each widget renders independently; a failed API does not break other widgets
- API failures show subtle fallback text ("Niet beschikbaar")
- Local JSON data (quotes, facts) cannot fail
- History widget falls back to a local fact if Wikipedia API fails

## External Dependencies

None. No new npm packages required. RSS parsing done with regex/string extraction server-side. All APIs are free (mijnafvalwijzer may need a free API key — to be verified during implementation).
