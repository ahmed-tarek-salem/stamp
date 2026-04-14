# Stamp Landing Page — Design Spec

## Overview

Single-page landing site for **Stamp**, a creative brand agency targeting startups.

- **Slogan:** "Don't just be existing, be identified."
- **Personality:** Creative & Energetic
- **Copy tone:** Inspirational & aspirational
- **Target audience:** Startups & early-stage companies
- **CTA:** Contact form ("Let's Talk")

## Tech Stack

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Animation:** GSAP + ScrollTrigger
- **Smooth Scroll:** Lenis
- **Design Skill:** Refined (typeui.sh) — base design system for spacing, components, accessibility
- **Icons:** Lucide React (free, open source)
- **Photos:** Unsplash (one image for about section)

## Brand System & Design Tokens

### Colors

| Token           | Value                    | Usage                              |
|-----------------|--------------------------|------------------------------------|
| `midnight`      | `#0A0A0A`                | Primary background, text on light  |
| `midnight-light`| `#1A1A2E`                | Cards, elevated surfaces           |
| `lime`          | `#84CC16`                | Primary accent, CTAs, highlights   |
| `lime-glow`     | `#84CC16` at 20% opacity | Glows, hover states, soft accents  |
| `white`         | `#FAFAFA`                | Text on dark, light sections       |
| `gray`          | `#A1A1AA`                | Secondary text, muted elements     |

### Typography

| Role     | Font             | Usage                        |
|----------|------------------|------------------------------|
| Display  | Playfair Display | Hero headline, section titles|
| Body     | Inter            | Paragraphs, UI text          |
| Mono     | JetBrains Mono   | Technical/accent text        |

### Type Scale

| Element         | Size       |
|-----------------|------------|
| Hero headline   | 80-96px    |
| Section title   | 48-64px    |
| Body            | 16-18px    |
| Small/caption   | 12-14px    |

### Spacing

4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 (px) — follows Refined skill scale.

## Page Structure

Seven sections in scroll order:

### 1. Navigation (fixed/floating)

- Stamp logo (left), nav links center/right: Services, About, Contact
- Transparent over hero; gains frosted midnight background (`backdrop-blur`) on scroll
- "Let's Talk" CTA button with lime accent on the right
- Mobile: hamburger icon triggers fullscreen midnight overlay with centered nav links, lime accent on active, close button top-right

### 2. Hero (fullscreen, pinned)

- Full viewport height, midnight background
- Large Playfair Display headline (inspirational — e.g., "Your brand is your story. Let's make it unforgettable.")
- Slogan underneath: "Don't just be existing, be identified."
- Scroll indicator at bottom (animated chevron or "Scroll" text)
- **Animated elements:**
  - Headline reveals word-by-word with staggered clip-path animation
  - Slogan fades up after headline completes
  - Code-driven morphing geometric shape in lime-glow as background visual (built with GSAP, no external asset)
  - Content parallaxes up and fades on scroll-out

### 3. Services (horizontal scroll, pinned)

- Section pins to viewport for ~300vh of scroll distance
- 3 service cards translate horizontally from right to left
- Each card: Lucide icon, title, short description, lime accent border
  - **Brand Identity Design** — "We craft visual identities that make startups unforgettable."
  - **Website Design & Development** — "Beautiful, high-performance sites that convert visitors into believers."
  - **Application Design & Development** — "Apps that feel as good as they function."
- Active card scales up slightly and gains full opacity at center
- Lime accent line draws along the top connecting all cards

### 4. About / Why Stamp

- Split layout: text left, visual right
- Inspirational copy about Stamp's mission — helping startups get identified
- Animated counters (projects done, clients served — placeholder numbers for launch)
- Visual: Unsplash workspace/creative photo with parallax offset (~20% speed difference)
- Text block slides in from left, visual slides in from right on scroll entry

### 5. Process

- 4-step timeline: Discover > Design > Develop > Deliver
- Connecting line draws progressively as user scrolls
- Each step icon (Lucide) and label fades + scales in when the line reaches it
- Staggered timing — each step triggers ~100px after the previous

### 6. Contact

- Midnight background with lime accents
- Headline: "Ready to be identified?" — letter-by-letter reveal
- Form fields: Name, Email, Message, Submit button
- Fields slide up staggered with spring easing
- Submit button: magnetic cursor effect + lime glow pulse on hover
- No backend for now — form can log to console or use a service like Formspree later

### 7. Footer

- Minimal: Stamp logo, social links (icons), copyright
- Subtle lime glow divider at top
- Links: same nav items + social (Twitter/X, LinkedIn, Instagram)

## Animation & Interaction System

### Smooth Scroll

- Lenis with lerp ~0.07-0.1 for luxurious feel
- All scroll-based animations driven through Lenis + GSAP ScrollTrigger integration

### Custom Cursor

- Default: small lime-filled circle (12px) following the mouse with slight lag
- On hoverable elements (links, buttons, cards): cursor expands (40px) with optional label ("View", "Send")
- On CTA buttons: magnetic pull — button subtly follows cursor within ~80px radius
- Hidden on touch devices (media query: pointer: coarse)

### Scroll Animations (defaults)

- All section entries: `opacity: 0 -> 1`, `translateY: 40px -> 0`
- Easing: `power3.out` for reveals, `elastic.out(1, 0.5)` for playful moments (cursor, buttons)
- ScrollTrigger start: `"top 80%"` (element 20% in viewport)
- Stagger for grouped elements: 0.1-0.15s between items

### Specific Animations

| Section    | Animation                                                    |
|------------|--------------------------------------------------------------|
| Hero       | Word-by-word clip-path reveal, morphing lime shape, parallax fade-out |
| Services   | Pin + horizontal translate, scale on active card, line draw  |
| About      | Slide-in from sides, counter number animation, parallax image|
| Process    | Progressive line draw, staggered step reveals                |
| Contact    | Letter-by-letter headline, staggered form fields, magnetic button |

## Assets

| Asset              | Source                     | Notes                                      |
|--------------------|----------------------------|--------------------------------------------|
| Service icons      | Lucide React               | Fingerprint, Globe, Smartphone (or similar)|
| Process step icons | Lucide React               | Search, Palette, Code, Rocket (or similar) |
| About photo        | Unsplash                   | Creative workspace, dark/moody tone        |
| Logo               | Code-built (SVG/CSS)       | "Stamp" in Playfair Display + geometric mark|
| Hero visual        | Code-built (GSAP animation)| Morphing lime-green geometric shape        |
| Cursor             | Code-built (GSAP)          | Custom animated cursor component           |

## Responsive Behavior

- **Desktop (1280+):** Full experience — all animations, custom cursor, horizontal scroll
- **Tablet (768-1279):** Simplified animations, no horizontal scroll (stack cards vertically), no custom cursor
- **Mobile (< 768):** Minimal animations (fade-in only), vertical card stack, hamburger nav, no custom cursor, reduced motion for performance

## Accessibility

- WCAG 2.2 AA compliance (from Refined skill)
- `prefers-reduced-motion` media query: disable all scroll animations, show content immediately
- Keyboard-navigable: visible focus states on all interactive elements (lime outline)
- Form labels, ARIA attributes on interactive elements
- Color contrast: lime on midnight passes AA for large text; use white for body text on dark backgrounds
- Skip-to-content link hidden until focused

## File Structure (planned)

```
stamp/
  src/
    main.jsx
    App.jsx
    index.css                  # Tailwind directives, global styles, fonts
    components/
      layout/
        Navbar.jsx
        Footer.jsx
        CustomCursor.jsx
        SmoothScroll.jsx       # Lenis wrapper
      sections/
        Hero.jsx
        Services.jsx
        About.jsx
        Process.jsx
        Contact.jsx
      ui/
        Button.jsx
        SectionTitle.jsx
        MagneticButton.jsx
        AnimatedCounter.jsx
    hooks/
      useGsap.js               # GSAP + ScrollTrigger setup hook
      useMediaQuery.js          # Responsive breakpoint hook
    utils/
      animations.js             # Reusable GSAP animation presets
    constants/
      content.js                # All copy/text content in one place
  public/
    fonts/                      # Self-hosted fonts
  index.html
  tailwind.config.js
  vite.config.js
  package.json
```

## Out of Scope (for now)

- Backend / form submission service
- Blog
- Portfolio/case studies page
- Multi-page routing
- CMS integration
- SEO meta tags beyond basics
- Analytics
