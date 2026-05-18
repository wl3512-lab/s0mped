---
register: brand
palette: committed
theme: dual (dark hero + light body + midtone booking)
creative_north_star: "fine jewelry in motion — crystals caught in candlelight, intimate and precise"
---

# DESIGN.md — s0mped

Visual design system extracted from the live codebase. Update after significant UI changes.

---

## Color

The palette is **committed** — a single hue (deep purple) carries the surface. Lavender is the iridescent light source; dark indigo is the depth.

### Tokens (CSS custom properties)

| Token | Value | Role |
|---|---|---|
| `--bg-light` | `#F2EEFF` | Page background, light sections |
| `--bg-dark` | `#1A0F2E` | Hero, InStock, loading screen |
| `--accent-primary` | `#C4B5E8` | Lavender — sparkle, primary accent, on-dark text |
| `--accent-deep` | `#3D2660` | Deep violet — headings on light, CTA fill |
| `--accent-mid` | `#9B8FD4` | Mid purple — secondary text, eyebrow labels |
| `--accent-muted` | `#6B5A9A` | Muted — body text on light backgrounds |
| `--accent-warm` | `#6B4A9A` | Warm purple — gradient endpoints |

### Named surfaces

| Name | Value | Used on |
|---|---|---|
| Hero/loading gradient | `linear-gradient(160deg, #1A0F2E 0%, #2E1A52 55%, #3D2660 100%)` | Hero, loading screen |
| Services alt | `#FAF8FF` | Services section (slightly warmer than bg-light) |
| About | `#F2EEFF` | About + Gallery sections |
| Booking | `linear-gradient(160deg, #4a3065 0%, #6b4a9a 40%, #9b8fd4 100%)` | Booking section midtone transition |
| Dark card | `rgba(255,255,255,0.05)` + `border: 1px solid rgba(196,181,232,0.12)` | Gem cards on dark |
| Light card | `#F2EEFF` + `border: 1px solid rgba(196,181,232,0.3)` | Service cards on light |
| Promo badge | `rgba(201,164,76,0.9)` on `#1A0F2E` | Gold accent for promos |

### OKLCH equivalents (for new work)

```css
/* Deep void indigo */
oklch(15% 0.08 285)     /* #1A0F2E — bg-dark */
oklch(22% 0.09 285)     /* #2E1A52 */
oklch(28% 0.11 285)     /* #3D2660 — accent-deep */
/* Lavender iridescence */
oklch(78% 0.08 285)     /* #C4B5E8 — accent-primary */
oklch(66% 0.09 285)     /* #9B8FD4 — accent-mid */
oklch(46% 0.09 285)     /* #6B5A9A — accent-muted */
/* Near-white */
oklch(95% 0.01 285)     /* #F2EEFF — bg-light */
```

---

## Typography

Three-font system: script for identity, serif for editorial weight, sans for UI clarity.

| Role | Font | Weights | CSS class |
|---|---|---|---|
| Identity / section headings | Pinyon Script | 400 | `.font-script` |
| Card titles / editorial | Cormorant Garamond | 300, 400, 500, 600 (+ italic) | `.font-display` |
| Body / UI / labels | Jost | 300, 400, 500, 600 | `.font-body` |

### Scale

| Use | Size | Weight | Style |
|---|---|---|---|
| Hero logo | `w-72` → `w-[28rem]` image | — | SVG |
| Section headings | `clamp(2.8rem, 7vw, 5rem)` | 400 | `.font-script`, lineHeight 1–1.1 |
| Eyebrow label | `text-xs` `tracking-widest uppercase` | 400 | `.font-body` |
| Card title | `text-xl` / `text-lg` | 600 | `.font-display` |
| Body copy | `0.92rem`–`0.95rem` | 300 (light) | `.font-body leading-relaxed` |
| Small body | `text-sm` | 300–400 | `.font-body` |
| Micro / label | `text-xs` | 400–500 | `.font-body` |
| Price callout | `text-2xl` | 600 | `.font-body` |

---

## Spacing & Layout

| Token | Value | Usage |
|---|---|---|
| Section vertical | `py-28` (7rem) | All sections |
| Section horizontal | `px-6` (1.5rem) | All sections |
| Max content width | `max-w-5xl` (64rem) | All sections; nav uses `max-w-6xl` |
| Card padding (large) | `p-7` (1.75rem) | Service cards, booking form |
| Card padding (small) | `p-5`–`p-6` | Sidebar cards, gem cards |
| Card gap | `gap-4`–`gap-5` | Grids |
| Section header margin | `mb-12`–`mb-16` | From section header to content |

### Grid patterns

- **2-col services**: `sm:grid-cols-2 gap-5`
- **3-col gems/examples**: `sm:grid-cols-2 lg:grid-cols-3 gap-4`
- **Gallery editorial**: `md:grid-cols-3 gap-4 items-stretch` — photos left/right, text center
- **Booking 5-col**: `md:grid-cols-5` (3 form + 2 sidebar)

---

## Elevation & Shadow

| Tier | Value | Context |
|---|---|---|
| Flat | none | Minimal cards on bg-light |
| Subtle | `0 2px 16px rgba(61,38,96,0.06)` | Light service cards |
| Lifted | `0 8px 40px rgba(61,38,96,0.2)` | About portrait ring |
| Deep | `0 12px 40px rgba(61,38,96,0.3–0.35)` | Promo card, additional gems card |
| Glow | `0 0 28px rgba(196,181,232,0.25), 0 0 56px rgba(196,181,232,0.1)` | Primary CTA |

---

## Border Radius

| Token | Tailwind | Used on |
|---|---|---|
| Pill | `rounded-full` | CTAs, badges, filter buttons, nav IG button |
| Card large | `rounded-3xl` (24px) | Main service/product/booking cards |
| Card small | `rounded-2xl` (16px) | Gallery tiles, sidebar cards, stat tiles, tips |
| Input | `rounded-xl` (12px) | Form fields |

---

## Glass Surfaces

Used sparingly — only where background content is visible or depth layering is intentional.

| Class | Background | Filter | Border | Context |
|---|---|---|---|---|
| `.glass` | `rgba(242,238,255,0.55)` | `blur(16px)` | `rgba(196,181,232,0.25)` | Scrolled navbar, mobile menu |
| `.glass-solid` | `rgba(242,238,255,0.7)` | none | `rgba(196,181,232,0.25)` | Stat tiles on opaque bg |
| `.glass-dark` | `rgba(255,255,255,0.06)` | `blur(16px)` | `rgba(196,181,232,0.12)` | Dark-section overlays |
| Form inputs (dark) | `rgba(255,255,255,0.08–0.1)` | none | `rgba(255,255,255,0.12–0.15)` | Booking form |
| Gem cards | `rgba(255,255,255,0.05)` | none | `rgba(196,181,232,0.12)` | InStock cards |

---

## Motion

All ambient animations respect `prefers-reduced-motion: reduce` — disabled by default, enabled only when `no-preference`.

### Scroll-driven reveals (progressive enhancement)

Uses `animation-timeline: view()` inside `@supports`. Falls back to static (visible) in Firefox and when reduced-motion is on.

| Class | Keyframe | Range |
|---|---|---|
| `.reveal-heading` | `heading-crystallize` (blur + scale → focus) | `entry 0% entry 55%` |
| `.reveal-card` | `card-rise` (translateY + scale → rest) | `entry 0% entry 60%` |
| `.reveal-photo` | `photo-wipe-in` (translateY + scale → rest) | `entry 0% entry 65%` |

### Ambient motion

| Class | Keyframe | Duration | Notes |
|---|---|---|---|
| `.float` | `float` (translateY + rotate) | 5s ease-in-out infinite | Hero sparkles |
| `.twinkle` | `twinkle` (opacity + scale) | 2.2s ease-in-out infinite | Hero sparkles |
| `.iridescent` | `iridescent-shift` (bg-position) | 4s ease infinite | Gallery hover overlay |
| `.shimmer` | `shimmer` (bg-position) | 2.8s linear infinite | Shimmer text/elements |

### Loading screen

- Logo: `loading-logo-in` — blur(16px) → blur(0), scale(1.1) → scale(1), 0.8s ease-out-expo
- Sparkles: `sparkle-appear` 0.38s + `twinkle` 2.4s sequential via inline animation shorthand
- Shine: `loading-shine-sweep` through SVG mask (letterforms only), 1.1s delay 0.65s
- Exit: opacity 0 + scale(0.97) + translateY(-8px), 0.8s

### Hover states

- Cards: `hover:scale-[1.02] hover:-translate-y-0.5` (0.3s)
- CTA: `hover:scale-105` (0.2s)
- Subtle: `hover:opacity-60` or `hover:opacity-70` (no transform)

### Easing

`cubic-bezier(0.16, 1, 0.3, 1)` — ease-out-expo, used for crystallization and entrance reveals.

---

## Components

### Eyebrow + Script Heading (section opener)

```tsx
<p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: "#9B8FD4" }}>
  Label
</p>
<h2 className="reveal-heading font-script"
  style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)", color: "#3D2660", lineHeight: 1.1 }}>
  heading
</h2>
```

On dark bg: use `color: "#F2EEFF"` for heading, `color: "rgba(196,181,232,0.6)"` for eyebrow.

### CTA Button (primary)

```tsx
<a href="..." className="rounded-full px-8 py-3.5 font-body font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 glow"
  style={{ background: "linear-gradient(135deg, #C4B5E8 0%, #9B8FD4 100%)", color: "#1A0F2E" }}>
  Label ✧
</a>
```

### CTA Button (ghost)

```tsx
<a href="..." className="rounded-full px-8 py-3.5 font-body font-medium text-sm tracking-wide transition-all duration-200 hover:scale-105"
  style={{ background: "rgba(196, 181, 232, 0.08)", border: "1px solid rgba(196, 181, 232, 0.25)", color: "#C4B5E8" }}>
  Label →
</a>
```

### Filter Pill

```tsx
<button style={active
  ? { background: "linear-gradient(135deg, #C4B5E8, #9B8FD4)", color: "#1A0F2E" }
  : { background: "rgba(196,181,232,0.08)", color: "rgba(196,181,232,0.65)", border: "1px solid rgba(196,181,232,0.15)" }
} className="rounded-full px-5 py-2 font-body text-sm font-medium transition-all duration-200">
  Label
</button>
```

### Color/Type Pill (badge)

```tsx
<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-body font-medium"
  style={{ background: "#EEE8FF", color: "#3D2660", border: "1px solid rgba(196,181,232,0.5)" }}>
  Label
</span>
```

### Promo Badge

```tsx
<span className="absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-xs font-body font-semibold"
  style={{ background: "rgba(201,164,76,0.9)", color: "#1A0F2E" }}>
  $60 PROMO
</span>
```

### Service Card (light bg)

`rounded-3xl p-7`, bg `#F2EEFF`, border `rgba(196,181,232,0.3)`, shadow subtle. Hover: `scale-[1.02] -translate-y-1`.

### Service Card (dark featured)

`rounded-3xl p-7`, `linear-gradient(145deg, #3D2660 0%, #6B4A9A 60%, #9B8FD4 100%)`, deep shadow. Same hover.

### Gem Card (InStock)

`rounded-3xl` — image top (h-44 relative overflow-hidden) with gem-light-overlay + gradient-to-bottom fade. Content bottom: title (font-display), type+color pill row, body copy (font-body light), feature list with ✧ bullets.

### Sidebar Info Card

`rounded-2xl p-5`, glass dark or booking-section glass. Icon left (`text-lg`), title + body right.

---

## Brand Ornament

| Symbol | Use |
|---|---|
| `✧` | Primary sparkle — gem bullets, section decorations, CTA suffix |
| `✦` | Secondary — info items, booking sidebar |
| `⬡` | Hexagon — premium/gold items |
| `→` | Directional — ghost CTAs, Instagram links |

---

## Focus & Accessibility

```css
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 3px;
  border-radius: 4px;
}
```

WCAG AA target. All float/twinkle/shimmer animations gated on `prefers-reduced-motion: no-preference`. Gem light overlay hides under `prefers-reduced-motion: reduce`. Minimum tap target 44×44px (mobile menu button).
