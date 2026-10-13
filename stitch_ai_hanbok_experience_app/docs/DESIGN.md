---
name: Cupertino Editorial
colors:
  surface: '#fcf8fb'
  surface-dim: '#dcd9dc'
  surface-bright: '#fcf8fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#414753'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#727784'
  outline-variant: '#c1c6d5'
  surface-tint: '#005cba'
  primary: '#004e9f'
  on-primary: '#ffffff'
  primary-container: '#0066cc'
  on-primary-container: '#dfe8ff'
  inverse-primary: '#aac7ff'
  secondary: '#0060aa'
  on-secondary: '#ffffff'
  secondary-container: '#2696fe'
  on-secondary-container: '#002d55'
  tertiary: '#883700'
  on-tertiary: '#ffffff'
  tertiary-container: '#af4900'
  on-tertiary-container: '#ffe3d6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3ff'
  primary-fixed-dim: '#aac7ff'
  on-primary-fixed: '#001b3e'
  on-primary-fixed-variant: '#00458e'
  secondary-fixed: '#d3e3ff'
  secondary-fixed-dim: '#a3c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004882'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb692'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#793000'
  background: '#fcf8fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
  canvas-pure: '#ffffff'
  canvas-parchment: '#f5f5f7'
  surface-pearl: '#fafafc'
  surface-tile-dark: '#272729'
  surface-tile-dark-alt: '#2a2a2c'
  surface-tile-deep: '#252527'
  surface-black: '#000000'
  ink-primary: '#1d1d1f'
  ink-secondary: '#333333'
  ink-muted: '#7a7a7a'
  ink-on-dark: '#ffffff'
  ink-muted-on-dark: '#cccccc'
  focus-indicator: '#0071e3'
  hairline-light: '#e0e0e0'
  hairline-subtle: rgba(0, 0, 0, 0.08)
  hairline-translucent: rgba(210, 210, 215, 0.64)
typography:
  hero-display:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 60px
    letterSpacing: -0.018em
  hero-display-mobile:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.015em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  display-md:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.011em
  lead:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.007em
  lead-airy:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '300'
    lineHeight: 36px
    letterSpacing: 0em
  tagline:
    fontFamily: Inter
    fontSize: 21px
    fontWeight: '600'
    lineHeight: 25px
    letterSpacing: 0.011em
  body-strong:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 21px
    letterSpacing: -0.022em
  body:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 25px
    letterSpacing: -0.022em
  dense-link:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 41px
    letterSpacing: 0em
  caption-strong:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: -0.016em
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.016em
  button-large:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  fine-print:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: -0.01em
  micro-legal:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 13px
    letterSpacing: -0.008em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1.25rem
  margin: 1.5rem
  margin-desktop: 5rem
  space-xxs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1.0625rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-xxl: 3rem
  space-section: 5rem
---

## Brand & Style

This design system embodies a calm, precise, and photography-first philosophy. UI chrome is intentionally suppressed to serve as a quiet gallery frame that foregrounds physical products and high-resolution imagery. Visual richness emerges from authentic materials, optical clarity, and disciplined layout rhythm rather than decorative embellishments.

### Key Tenets
- **Museum-Grade Curation:** The interface behaves like exhibition architecture. Surfaces are clean, uncluttered, and unburdened by unnecessary strokes, patterns, or gradients.
- **Intentional Restraint:** Color is deployed strictly as functional signposting. The brand speaks in balanced monochrome neutrals, allowing a singular, vivid blue to communicate interactive intent.
- **Physical Precision:** Hardware imagery is grounded with photographic soft drop shadows, while digital cards remain completely flat. The interface does not mimic hardware skeuomorphism; instead, it respects real physical depth strictly within product renders.
- **Kinetic Feedback:** Micro-interactions favor subtle scale reductions (`scale(0.95)`) on press states, providing tactile feedback without disruptive layout shifts.

## Colors

The palette operates on a modular, alternating full-bleed canvas architecture rather than an arbitrary surface stack. Sections step fluidly between pure white, subtle warm parchment, and deep graphite tiles.

### Semantic Rules
- **Interactive Blue (`#0066cc`):** The primary interactive touchpoint. Reserved exclusively for actionable text links, primary filled pill buttons, and active selection perimeters.
- **Sky Link Blue (`#2997ff`):** Deployed selectively on dark tiles and black frames where the standard primary blue fails AA contrast standards.
- **Focus Blue (`#0071e3`):** Reserved for strict programmatic focus indicators (`2px outline`) and configurator selection borders.
- **Ink Tones:** Primary typography rests at `#1d1d1f`, providing softer optical contrast than harsh jet black against light surfaces. Secondary metadata and legal content gracefully degrade through `#333333` and `#7a7a7a`.
- **Canvas Contrasts:** Light-mode backgrounds alternate between `#ffffff` and `#f5f5f7` to delineate distinct content groups without relying on structural lines. Dark environments utilize `#272729`, `#2a2a2c`, and pure black (`#000000`) for high-impact media presentations.

## Typography

The typographic hierarchy relies on geometric clarity, tight line heights, and negative letter spacing across medium-to-large sizes to produce an iconic editorial polish.

### Typographic Principles
- **Base Body Standard:** Body typography defaults strictly to `17px` rather than the web-standard `16px`. This scale shift improves legibility and reinforces an authoritative editorial cadence.
- **Negative Tracking:** Headings, display scales, and default body copy enforce subtle negative letter-spacing (`-0.011em` to `-0.022em`). Large headlines become compact and sculptural, preventing loose optical gaps.
- **Weight Restraint:** Weights are confined to Light (`300`), Regular (`400`), and Semibold (`600`). Medium (`500`) and Extra-Bold (`800+`) are excluded to avoid muddied visual weight.

## Layout & Spacing

Layouts follow a fluid, responsive container structure rooted in an 8px base spacing increment, stepped down to 4px for component micro-rhythms.

### Grid & Max Widths
- **Full-Bleed Product Sections:** Stretch edge-to-edge (`100vw`) across alternating surface backgrounds.
- **Store & Utility Grids:** Max-width caps at `1440px` with centered alignment and dynamic safety margins.
- **Longform Editorial:** Centered layout locked to a maximum reading width of `980px`.
- **Breakpoints:**
  - **Desktop (≥ 1069px):** 12-column grid or 4–5 card columns; gutters `24px`; tile vertical padding `80px`.
  - **Tablet (641px – 1068px):** 2–3 card columns; gutters `20px`; tile vertical padding `64px`.
  - **Mobile (≤ 640px):** Single-column stack; gutters `16px`; tile vertical padding `48px`.

## Elevation & Depth

Visual hierarchy does not use artificial drop shadows or thick outlines for structural surfaces. Depth is achieved entirely through backdrop materials, tonal zoning, and photographic grounding.

### Depth Mechanisms
- **Frosted Backdrop Diffusion:** Sticky utility elements (top navigation bars, bottom floating configurators) float over content with `backdrop-filter: blur(20px) saturate(180%)` and an 80% alpha canvas fill. This enables ambient background content to softly permeate the controls.
- **Photographic Grounding:** The only box shadow permitted in this system is `rgba(0, 0, 0, 0.22) 3px 5px 30px 0px`. This is applied strictly to transparent product cutouts resting on horizontal surfaces. UI cards, inputs, and buttons must remain completely flat without shadows.
- **Flat Surface Layering:** Hierarchy is communicated by placing pearl (`#fafafc`) or white (`#ffffff`) surfaces directly on top of parchment canvases (`#f5f5f7`), separated only by hairlines (`rgba(0, 0, 0, 0.08)`).

## Shapes

The design system maintains two distinct geometric paradigms: full-bleed structural frames and pill-shaped interactive components.

### Shape Applications
- **Edge-to-Edge Rectangles (`0px`):** Full-bleed marketing hero tiles, environmental quote tiles, and section dividers maintain square, uninterrupted edges to fill the browser frame seamlessly.
- **Micro & Card Corners (`8px` / `18px`):** Internal media assets use an `8px` corner radius. Interactive store utility cards and accessory panels use an `18px` corner radius.
- **Fully Rounded Capsule (`9999px`):** Interactive touchpoints—such as action buttons, selection chips, search fields, and quick-filter tags—are rendered as complete pills. Circular icon controls maintain equivalent `44px` height and width dimensions with a `50%` radius.

## Components

### Buttons & Actions
- **Primary Pill:** Background `#0066cc`, text `#ffffff`, font `17px` regular, border-radius `9999px`. Padding `11px 22px`. Hover shifts background to `#0071e3`. Active state triggers `transform: scale(0.95)` with `transition: transform 120ms ease`.
- **Secondary Pill (Ghost):** Background transparent, border `1px solid #0066cc`, text `#0066cc`, border-radius `9999px`. Padding `11px 22px`. Hover shifts fill to `rgba(0, 102, 204, 0.05)`.
- **Pearl Capsule:** Background `#fafafc`, border `1px solid #f0f0f0`, text `#333333`, font `14px`, border-radius `11px`. Padding `8px 14px`.
- **Circular Utility Icon:** `44px` width/height circle. Fill `rgba(210, 210, 215, 0.64)` on dark tiles or `rgba(0, 0, 0, 0.04)` on light tiles, with centered glyphs.

### Chips & Option Selectors
- **Configurator Chip:** Pill shape (`9999px`), padding `12px 16px`, background `#ffffff`, border `1px solid #e0e0e0`. Text `14px` regular `#1d1d1f`.
- **Configurator Chip (Selected):** Border `2px solid #0071e3` with interior text weighted to `600`.

### Cards & Tile Panels
- **Store Utility Card:** Background `#ffffff`, border `1px solid rgba(0, 0, 0, 0.08)`, corner radius `18px`, internal padding `24px`. No elevation shadow. Media embedded within maintains `8px` corner radius.
- **Hero Canvas Tiles:** Edge-to-edge full width with `0px` radius. Vertical padding `80px` desktop / `48px` mobile. Imagery placed centrally or aligned flush bottom.

### Inputs & Form Fields
- **Search & Text Input:** Height `44px`, background `#ffffff` on parchment or `#f5f5f7` on white canvas. Border `1px solid rgba(0, 0, 0, 0.08)`. Radius `9999px`. Padding `0 20px`. Placeholder text `#7a7a7a`. Focus state applies `2px solid #0071e3`.

### Navigation & Chrome
- **Global Nav:** Height `44px`, background `rgba(0, 0, 0, 0.8)`, `backdrop-filter: blur(20px) saturate(180%)`. Text `#ffffff` at `12px`.
- **Sub-Nav Bar:** Height `52px`, background `rgba(245, 245, 247, 0.8)`, border-bottom `1px solid rgba(0, 0, 0, 0.08)`, `backdrop-filter: blur(20px) saturate(180%)`.
- **Floating Sticky Bar:** Height `64px`, background `rgba(245, 245, 247, 0.8)`, border-top `1px solid rgba(0, 0, 0, 0.08)`, `backdrop-filter: blur(20px) saturate(180%)`. Fixed bottom alignment for purchase workflows.