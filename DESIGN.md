---
name: Muzamil Khan Real Estate
description: The East Bay read like a park trail map; each city is a marked trailhead with its numbers.
colors:
  trail: "#c2461a"
  trail-deep: "#a93b14"
  trail-ink: "#ffffff"
  ink: "#1c2a24"
  ink-2: "#47554d"
  paper: "#f5f7f3"
  paper-2: "#ebf0e8"
  line: "#d6dfd3"
  sheet: "#ffffff"
  on-ink: "#eef2ec"
  on-ink-muted: "#c9d3cc"
  error: "#a8321a"
  berkeley: "#2b5fb8"
  oakland: "#2c7a4f"
  albany: "#7d4aa8"
  elcerrito: "#a86d0e"
typography:
  display:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(46px, 6vw, 82px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline-page:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(42px, 5vw, 68px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(32px, 3.6vw, 48px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  numeral:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.02em"
    fontFeature: "tnum, lnum"
  title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  row-title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  prose:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  meta:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.4
  button:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1
rounded:
  xs: "6px"
  field: "10px"
  sm: "12px"
  md: "14px"
  photo: "18px"
  lg: "22px"
  pill: "999px"
spacing:
  gutter-mobile: "20px"
  card: "30px"
  gutter: "32px"
  column-gap: "64px"
  section-mobile: "72px"
  section: "104px"
  container: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.trail}"
    textColor: "{colors.trail-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.trail-deep}"
    textColor: "{colors.trail-ink}"
  button-primary-small:
    backgroundColor: "{colors.trail}"
    textColor: "{colors.trail-ink}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
  card:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "30px"
  close-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.lg}"
    padding: "56px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "13px 14px"
    height: "48px"
  chip:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "9px 18px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
  route-marker:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  route-marker-final:
    backgroundColor: "{colors.trail}"
    textColor: "{colors.trail-ink}"
    rounded: "{rounded.pill}"
    size: "44px"
  phase-marker:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.sheet}"
    size: "40px"
  header:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    height: "70px"
---

# Design System: Muzamil Khan Real Estate

## Overview

**Creative North Star: "The Trail Map"**

The site reads like a park trail map of the East Bay. Pale map paper is the ground, faint contour linework sits behind the heroes, deep green-black ink carries every word, and a single trail-marker orange marks the way forward. The climb from the flats to the hills is the price ladder: each city is a trailhead with its own color and its own four numbers, and that color follows the city onto its page, its playbook card, and its posts.

Hierarchy is carried by size and weight inside one typeface, Overpass, not by a second family, color, or decoration. Numbers are set huge over small plain labels. Structure comes from thin hairlines and dashed trail lines rather than boxes; when a box does appear it is a white legend sheet laid on the paper. Depth is almost absent: surfaces are flat at rest and lift only on hover.

The system is light-only. Everything lives under the `.tm` scope, so pages still on the older shadcn/Tailwind styling (first-time buyer guide, legacy city pages, home valuation, calculator, hub modules, Start) are unaffected and are not part of this system.

**Key Characteristics:**
- Map-paper ground (sage-tinted off-white) with contour linework at hero scale only.
- One accent, trail orange, reserved for the primary action, the last stop of a route, and active-state underlines.
- Four city colors, each bound to one city and used only as marker, pin, tint, or underline.
- One family, Overpass, at three working weights (400, 600, 800); headings tight and negative-tracked.
- Hairline rows and dashed route lines instead of cards for lists and sequences.
- Flat surfaces; shadow only as a hover response.

## Colors

A cool sage-and-ink neutral field with one hot accent and four bound city colors.

### Primary
- **Trail Marker Orange** (`trail`): the single accent. Fills the primary "Text me" / "Contact" button, the final stop on every route and the final phase marker, review stars, focus outlines, the progress bar on Path to Keys, and the 2px underline that marks an active nav item or a hovered row title. Bold orange text appears only at small label sizes (row topics, step timings), where it holds 4.66:1 on paper.
- **Trail Deep** (`trail-deep`): hover fill for the primary button only.

### Secondary (city trail colors)
- **Berkeley Blue** (`berkeley`), **Oakland Green** (`oakland`), **Albany Violet** (`albany`), **El Cerrito Amber** (`elcerrito`): each color belongs to one city and appears wherever that city appears: trailhead pin, elevation-profile point, city card tint (5-7% mixed into white), crumb pin, and link underline. Components receive the color through a `--c` custom property so one city lights up in every place it is shown.

### Neutral
- **Trail Ink** (`ink`): all headings and body text, outline-button stroke, route marker rings, the dark close band and contact panel, selected chips, phase markers.
- **Faded Ink** (`ink-2`): secondary text: ledes, intros, captions, meta, nav at rest.
- **Map Paper** (`paper`): page ground, header (at 92% with blur), input fills.
- **Map Paper Shade** (`paper-2`): tonal fill for inset notes, the elevation-profile area, document code tags, table headers.
- **Contour Line** (`line`): every hairline divider and card border.
- **Legend Sheet** (`sheet`): white card and panel surface laid on the paper.
- **On-Ink** (`on-ink`) and **On-Ink Muted** (`on-ink-muted`): text on the dark ink band and contact panel.
- **Error** (`error`): form validation messages only.

### Named Rules
**The One Marker Rule.** Trail orange marks the next step and nothing decorative. If two orange fills compete in one viewport, one of them is wrong.

**The Bound City Rule.** A city color is only ever used for that city, and only as a pin, marker, tint, or underline, never as body or heading text (El Cerrito Amber is 4.32:1 on white and fails as text).

## Typography

**Display Font:** Overpass (with system-ui, sans-serif), Google Fonts 400/500/600/800
**Body Font:** Overpass
**Label/Mono Font:** none; figures use Overpass with tabular lining numerals.

**Character:** A highway-signage grotesque used as a single voice. Extra-bold, tightly tracked headings sit over plain regular body; the contrast between 800 and 400 does all the work.

### Hierarchy
- **Display** (800, clamp 46-82px, line-height 0.98, -0.035em): homepage hero headline only, capped near 11ch and balanced.
- **Headline, page** (800, clamp 42-68px, 1.02): interior page hero h1, capped near 16ch. Article titles step down to clamp 36-54px.
- **Headline** (800, clamp 32-48px, 1.05, -0.03em): section h2, capped near 18ch.
- **Numeral** (800, 30px, tabular): trailhead medians and fact figures; stat bands scale up to clamp 30-44px. Always set over a 14-15px Faded Ink label.
- **Title** (800, 18-21px, 1.3): h3 in routes, ways, cards, FAQ questions.
- **Row title** (600, 19-20px, -0.01em): linked list rows and guide titles.
- **Lede** (400, 20px, 1.5): hero subcopy, 34-46ch. Section intros run 18px at 56ch.
- **Body** (400, 17px, 1.55): default copy. Long-form prose runs 18px at 1.7.
- **Meta** (400 or 600, 13.5-15px): captions, sources, row meta, labels, all in Faded Ink.

### Named Rules
**The Size Alone Rule.** Hierarchy comes from size and weight in one family. No second typeface, no uppercase tracked labels, no colored headings.

**The Big Number Rule.** A figure is set larger and heavier than its label and the label sits under it in Faded Ink; numbers always use tabular lining figures.

## Layout

A single centered column, max 1180px, with 32px gutters (20px under 860px). Sections stack with 104px vertical padding (72px on mobile) and are separated by a 1px Contour Line hairline. Two-column compositions (hero, review, bio, contact, split content) use asymmetric fractions (1.15fr/.85fr, .8fr/1.2fr) with 56-64px gaps; card grids use 24px gaps. Trailheads run four across, divided by vertical hairlines rather than gutters.

The header is sticky at 70px with paper at 92% opacity and an 8px backdrop blur. Path to Keys adds a second sticky bar at 56px with a 3px orange progress line, plus a 260px sticky aside.

Breakpoints are 860px (navigation collapses to a Menu button; most grids go single-column) and 900px (Path to Keys timeline, document grids, step pages). Horizontal routes rotate to vertical with the dashed line running down the left. The elevation profile scrolls horizontally on mobile rather than shrinking below 700px.

**The Hairline Rhythm Rule.** Lists are rows separated by 1px hairlines with 22-28px vertical padding, not stacks of cards.

## Elevation & Depth

Flat by default. Depth comes from tonal layering: white legend sheets on map paper, map-paper-shade insets, and one dark ink band per page. Shadows appear only as a hover response on liftable cards, paired with a 2px upward translate.

### Shadow Vocabulary
- **Hover lift** (`box-shadow: 0 14px 34px -18px rgba(28,42,36,.35)`): city cards and document cards on hover only.
- **Pin halo** (`box-shadow: 0 0 0 4px color-mix(in srgb, var(--c) 18%, transparent)`): a soft ring around city pins, widening to 6px/24% on hover or when the city is highlighted elsewhere.

**The Flat at Rest Rule.** No surface carries a shadow at rest. Lift is a reply to the pointer.

## Shapes

Soft rectangles and full pills. Cards and panels use a gentle 14px radius; the feature blocks (close band, Path to Keys callout) open up to 22px; photos use 18px. Every button, chip, nav pill, and input in the footer or close band is a full pill. Fields inside forms use 10px; small reference tiles (roles, prev/next, tables) use 12px; inline code tags use 6px.

Map markers are geometric: circles for route stops and city pins, rounded squares (9-11px) for numbered phases, and the four Marker shapes (circle, square, triangle, diamond) for feature lists. Dashed strokes (2.5px, ink at 30-35%) draw the trail between stops; a dashed border marks a conditional step.

## Components

### Buttons
- **Shape:** full pill (999px), 16px Overpass 800, 18px inline icon with a 10px gap.
- **Primary:** Trail Marker Orange fill with white text, 14px 24px padding; small variant 10px 18px at 15px.
- **Hover / Focus:** lifts 1px on a 0.25s cubic-bezier(.2,.8,.2,1); primary darkens to Trail Deep. Focus is a 2.5px orange outline offset 3px.
- **Outline:** transparent with a 2px ink border; on the dark band the border and text switch to On-Ink.

### Chips
- **Style:** white fill, 1.5px Contour Line border, full pill, 15px 600, 44px minimum height.
- **State:** selected chips fill with ink and white text. Link chips (nearby cities, document links) darken the border to ink on hover.

### Cards / Containers
- **Corner Style:** 14px.
- **Background:** Legend Sheet white, or a 5-7% city or trail tint mixed into white.
- **Shadow Strategy:** flat; hover lift only on linked cards.
- **Border:** 1px Contour Line; dashed for conditional steps.
- **Internal Padding:** 30px (24px on mobile); smaller tiles 18-24px.

### Inputs / Fields
- **Style:** map-paper fill, 1.5px Contour Line border, 10px radius, 48px minimum height (textarea 120px).
- **Focus:** 2.5px orange outline offset 2px.
- **Error:** 14px message in Error red under the field.
- On the dark band the newsletter input is a translucent pill with a 35% On-Ink border.

### Navigation
- Sticky blurred paper header with the trail-triangle mark and wordmark (800, 18px) at left, five links (600, 15.5px, Faded Ink) center, small primary Contact button at right.
- Hover moves to ink; the active section shows ink text with a 2px orange underline offset 8px.
- Under 860px the links and Contact button hide behind an outlined pill "Menu" button that opens a full-width stacked list (800, 18px, hairline-separated).

### Trailheads (signature)
Four city cells in a row, each with a city-colored pin, the city name (800, 19px), the median as a 30px numeral, and "median · % over asking" below. Hovering or focusing a cell tints it 6% in its city color, scales the pin, and lights the matching point on the elevation profile at the same moment.

### Elevation Profile (signature)
A white sheet holding an SVG ridge line that climbs from El Cerrito to Berkeley in median price, with faint horizontal grid lines, a paper-shade fill under the ridge, and city-colored points labeled in ink. The ridge draws in over 1.6s when reduced motion is not requested.

### Route (signature)
Numbered 44px circle markers with a 2.5px ink ring joined by a dashed trail line; the last stop fills orange. Used for step sequences on Sell and city pages; rotates vertical on mobile. Path to Keys extends it into a vertical timeline with phase squares, step circles (current = ink fill, milestone = orange, conditional = dashed), and an ink fill that tracks progress.

### Close Band
The closing section of nearly every Trail Map page (Contact uses the dark direct-contact panel instead): a dark ink block, 22px radius, contour linework inverted at 12% opacity, a white headline, muted On-Ink subcopy, and the primary plus outline actions.

## Do's and Don'ts

### Do:
- **Do** wrap every new page in the `.tm` scope and build from the shared parts (page hero, section, rows, route, close band) before writing new CSS.
- **Do** pass a city's color through `--c` so the city reads the same in pins, tints, and underlines everywhere it appears.
- **Do** keep one primary orange action per view and close content pages with the dark close band.
- **Do** set figures in tabular numerals, larger than their labels, with real sourced numbers only.
- **Do** use Muzamil's real photos for any portrait or story image.
- **Do** separate list items with 1px hairlines and draw sequences with dashed trail lines.

### Don't:
- **Don't** use a city color for text or for anything that is not that city.
- **Don't** put shadows on surfaces at rest.
- **Don't** add a second typeface, uppercase tracked labels, or small labels stacked above headings.
- **Don't** build feature lists as same-size icon cards; use the Marker shapes inline with text.
- **Don't** introduce a dark theme; the system is light-only.
- **Don't** extend the legacy shadcn/Tailwind tokens in `client/src/index.css`; new work belongs in the Trail Map scope.
