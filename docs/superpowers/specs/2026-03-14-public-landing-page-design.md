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
- A JSON config file (`landing/src/data/season-override.json`) to force a specific theme
- Read dynamically at request time via `fs.readFileSync` in server components (not statically imported, so ISR picks up changes without rebuild)
- Used for special occasions: Kerst, Koningsdag, Pasen, etc.
- Override takes precedence over automatic season detection
- Format: `{ "override": "kerst" }` or `{ "override": null }` for automatic mode

## Technical Architecture

### Two Standalone Projects in One Repo
Two completely independent Next.js applications in the same git repo. Each is a full standalone project with its own `package.json`, `next.config.ts`, dependencies, and build. Deployed as separate Coolify containers pointing to different subfolders.

- `landing/` → **voshuizen14.nl** — public landing page (new, photo-forward)
- `home/` → **home.voshuizen14.nl** — family dashboard (existing code moved here)

No shared code, no monorepo tooling. Just two Next.js projects side by side.

### Repository Structure
```
voshuizen14/
  landing/                    # Public landing page — voshuizen14.nl
    package.json
    next.config.ts
    src/
      app/
        page.tsx              # Landing page
        layout.tsx            # Layout (photo-forward styling)
        globals.css           # Landing page styles
      components/
        Hero.tsx
        Welcome.tsx
        Location.tsx
        LocalArea.tsx
        Contact.tsx
        LandingFooter.tsx
      lib/
        seasons.ts            # Season detection + override logic
      data/
        seasons.json          # Seasonal content (photos, colors, tips)
        content.json          # Customizable page content
        season-override.json  # Manual season override
    public/                   # Static assets (Unsplash photos, etc.)

  home/                       # Family dashboard — home.voshuizen14.nl
    package.json
    next.config.ts
    src/                      # Current project code moved here as-is
      app/
        page.tsx
        layout.tsx
        globals.css
      components/
        ServiceCard.tsx
        WeatherWidget.tsx
        Clock.tsx
        widgets/
          NewsWidget.tsx
          QuoteWidget.tsx
          HistoryWidget.tsx
          FactWidget.tsx
          WasteWidget.tsx
          QuickLinks.tsx
      lib/
        news.ts
        history.ts
        waste.ts
      data/
        quotes.json
        facts.json
    public/
```

### Coolify Deployment
- Two separate Coolify services from the same git repo
- Landing: base directory `landing/`, domain `voshuizen14.nl`
- Dashboard: base directory `home/`, domain `home.voshuizen14.nl`
- Each builds and runs independently

### Rendering Strategy
- Landing page: Static Site Generation with ISR, revalidate every 3600 seconds (1 hour) for weather
- Dashboard: unchanged (current rendering approach)

### Google Maps
- Static Google Maps link (no API key required) rather than an embedded iframe
- Links to Google Maps with the address pre-filled for directions

### Local Development
- Landing: `cd landing && npm run dev` → `localhost:3000`
- Dashboard: `cd home && npm run dev -- -p 3001` → `localhost:3001`
- Fully independent, no conflicts

### SEO & Google Maps (landing only)

**Structured Data (JSON-LD):**
- `Schema.org/Place` with `PostalAddress` for the house
- `Schema.org/WebSite` for the domain

**Meta Tags:**
- Open Graph tags with seasonal hero image for social sharing
- Proper title, description in Dutch
- Canonical URL

**Discovery:**
- `sitemap.xml` and `robots.txt` on landing site (allow all)
- Google My Business listing (manual step) to create the Maps pin

**Dashboard Privacy:**
- Dashboard at `home.voshuizen14.nl` gets `noindex` meta tag and `robots.txt` disallow
- Not referenced in landing site's sitemap

### Contact
- Static mailto link on landing page — no backend needed

## Content Defaults

Placeholder content ships with the initial build. All can be customized later by editing `landing/src/data/content.json`.

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
