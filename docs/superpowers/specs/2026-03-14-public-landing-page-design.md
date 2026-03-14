# Voshuizen 14 — Public Landing Page Design

## Overview

A photo-forward digital address card and local area page at **voshuizen14.nl**. Large Veluwe landscape photography dominates with clean white card overlays for content. Seasonal imagery rotates automatically. The current family dashboard moves to **home.voshuizen14.nl**.

## Goals

- Give Voshuizen 14 a public online presence visible via Google Maps and search
- Serve delivery drivers (quick address/instructions), visitors (directions), and curious browsers (local area charm)
- Celebrate the Lieren/Veluwe setting with seasonal, photo-driven design
- Keep the family dashboard private at home.voshuizen14.nl

## Visual Direction

**Photo-forward** — full-bleed Veluwe/house photography as backgrounds with clean white/semi-transparent card overlays. Serif typography for headings, clean sans-serif for body text. Minimal UI chrome — the landscape is the design.

Initial photography: stock Unsplash images of the Veluwe area. Designed for easy replacement with personal photos later.

## Page Structure

### 1. Hero Section
- Full-viewport background photo (Veluwe landscape, changes with season)
- Centered white card overlay containing:
  - "VOSHUIZEN 14" in elegant serif typography
  - "Lieren · Veluwe" subtitle
  - Current weather in Lieren (small, unobtrusive — reuse existing wttr.in integration)
- Subtle scroll-down indicator

### 2. Welcome Section
- Short warm intro about the location
- Example: "Voshuizen 14 ligt aan de rand van de Veluwe, in het dorpje Lieren bij Apeldoorn. Omringd door bossen, heidevelden en stilte."
- Accompanied by a secondary landscape photo

### 3. Location Section
- Google Maps link showing exact location (opens in Google Maps for directions)
- Address displayed clearly: Voshuizen 14, 7364 BP Lieren
- Delivery instructions card (e.g., package delivery tips, doorbell info)

### 4. De Veluwe / Lieren Section
- Local area highlights with photo cards
- Nearby nature, trails, villages (Beekbergerwoud, Loenen, Apeldoorn)
- Seasonal tips that rotate automatically (e.g., "In het najaar kleurt de heide paars")

### 5. Contact Section
- Static contact note with a mailto link (e.g., "Neem contact op via info@voshuizen14.nl")
- No contact form — keeps the page fully static and avoids backend complexity
- No personal details exposed beyond the contact email address

### 6. Footer
- Subtle link to home.voshuizen14.nl ("Bewoner? Ga naar het dashboard")
- Copyright notice
- Small seasonal greeting

## Seasonal System

### Automatic Rotation
Four base seasons with automatic switching:
- **Lente** (March–May): blossoms, fresh greens, light tones
- **Zomer** (June–August): warm sunlight, full greens, blue skies
- **Herfst** (September–November): heather, orange/red leaves, misty mornings
- **Winter** (December–February): frost, bare trees, cozy atmosphere

Each season defines:
- Hero background photo
- Color accent for UI elements
- Local area tips text
- Optional seasonal greeting in footer

### Manual Override
- A JSON config file (`src/data/season-override.json`) to force a specific theme
- Read dynamically at request time via `fs.readFileSync` in server components (not statically imported, so ISR picks up changes without rebuild)
- Used for special occasions: Kerst, Koningsdag, Pasen, etc.
- Override takes precedence over automatic season detection
- Format: `{ "override": "kerst" }` or `{ "override": null }` for automatic mode

## Technical Architecture

### Subdomain Routing
Single Next.js application serving both subdomains via middleware:
- `voshuizen14.nl` / `www.voshuizen14.nl` → public landing page
- `home.voshuizen14.nl` → existing family dashboard

Next.js middleware reads the `Host` header and routes to the appropriate page tree.

### File Structure
```
src/
  app/
    (public)/          # Public landing page routes
      page.tsx         # Main landing page
      layout.tsx       # Public layout (different from dashboard)
    (dashboard)/       # Existing family dashboard (moved here)
      page.tsx         # Current dashboard page
      layout.tsx       # Dashboard layout
    layout.tsx         # Root layout (shared)
    middleware.ts      # Subdomain routing
  components/
    public/            # Public page components
      Hero.tsx
      Welcome.tsx
      Location.tsx
      LocalArea.tsx
      Contact.tsx
      Footer.tsx
    widgets/           # Existing dashboard widgets (unchanged)
    ...
  lib/
    seasons.ts         # Season detection + override logic
    ...
  data/
    seasons.json       # Seasonal content (photos, colors, tips)
    content.json       # Customizable page content (welcome text, delivery instructions, etc.)
    season-override.json # Manual season override
    ...
```

### Rendering Strategy
- Public landing page: Static Site Generation with Incremental Static Regeneration (ISR)
- Revalidate every 3600 seconds (1 hour) for weather data freshness
- Dashboard: unchanged (current rendering approach)

### Google Maps Embed
- Use a static Google Maps link (no API key required) rather than an embedded iframe
- Links to Google Maps with the address pre-filled for directions

### Local Development
- Use `NEXT_PUBLIC_HOST_OVERRIDE` env var to test subdomain routing locally
- Default: `public` or `dashboard` to force a specific view without hosts file changes
- Middleware checks this env var before the Host header in development mode

### Dynamic robots.txt
- Served via a dynamic API route that checks the Host header
- Returns different rules per subdomain (public: allow all, dashboard: noindex)

### SEO & Google Maps

**Structured Data (JSON-LD):**
- `Schema.org/Place` with `PostalAddress` for the house
- `Schema.org/WebSite` for the domain

**Meta Tags:**
- Open Graph tags with seasonal hero image for social sharing
- Proper title, description in Dutch
- Canonical URL

**Discovery:**
- `sitemap.xml` for the public pages only
- `robots.txt` allowing public pages, disallowing dashboard
- Google My Business listing (manual step outside the codebase) to create the Maps pin

**Dashboard Privacy:**
- `home.voshuizen14.nl` gets `X-Robots-Tag: noindex` header via middleware
- Not included in sitemap

### Contact
- Static mailto link — no backend needed
- No form, no API route, no spam concerns

## Content Defaults

Placeholder content ships with the initial build. All can be customized later by editing `src/data/content.json`.

1. **Welcome text:** "Voshuizen 14 ligt aan de rand van de Veluwe, in het dorpje Lieren bij Apeldoorn. Omringd door bossen, heidevelden en stilte."
2. **Delivery instructions:** "Pakketjes mogen bij de voordeur worden neergezet. Bij grote pakketten: bel aan."
3. **Contact email:** info@voshuizen14.nl
4. **Local area highlights:** Beekbergerwoud, Lierense velden, Loenen, Paleis Het Loo, Apenheul
5. **Seasonal overrides:** None pre-configured (automatic mode by default)

## Out of Scope

- Wi-Fi guest access (privacy concern)
- User accounts or authentication on public page
- E-commerce or booking functionality
- Blog or regularly updated content (beyond seasonal rotation)
