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
- Source: NOS RSS feed (`feeds.nos.nl/nosnieuwsalgemeen`)
- Displays: 1-3 headlines, most recent prominently
- Links to NOS article
- Server-side fetch via API route, revalidate every hour

### QuoteWidget
- Source: Local `src/data/quotes.json` (~100 Dutch proverbs/quotes)
- Selection: Based on day of year (deterministic, changes daily)
- Display: Italicized quote text with attribution if applicable

### HistoryWidget
- Source: Wikipedia "On this day" API (Dutch Wikipedia)
- Displays: 1-2 historical events for today's date
- Fallback: Shows a fact from local data if API fails
- Server-side fetch via API route, revalidate every hour

### FactWidget
- Source: Local `src/data/facts.json` (~365 fun facts, one per day)
- Selection: Based on day of year (deterministic)
- Display: Short fun fact text

### WasteWidget
- Source: `mijnafvalwijzer.nl` API for Voshuizen 14, Lieren, Apeldoorn
- Displays: Next collection date + waste type
- Color coding: Green (GFT), Grey (Restafval), Blue (Papier), Orange (PMD)
- Special state: "Vandaag aan de straat!" when collection is today
- Server-side fetch via API route, revalidate every hour

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

### New API routes
- `src/app/api/news/route.ts` - Parses NOS RSS feed
- `src/app/api/waste/route.ts` - Fetches waste calendar for address
- `src/app/api/history/route.ts` - Fetches Wikipedia "on this day"

### New data files
- `src/data/quotes.json` - Dutch proverbs and quotes
- `src/data/facts.json` - Fun facts indexed by day of year

### Modified files
- `src/app/page.tsx` - New magazine layout with widget sections

## Data Flow

1. `page.tsx` is a Server Component
2. Server-side fetches to API routes with `revalidate: 3600` (1 hour)
3. API routes proxy to external services (NOS RSS, mijnafvalwijzer, Wikipedia)
4. Local JSON data (quotes, facts) imported directly
5. Clock and weather remain Client Components (need browser APIs)

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

None. No new npm packages required. RSS parsing done with built-in DOMParser/fetch. All APIs are free and keyless.
