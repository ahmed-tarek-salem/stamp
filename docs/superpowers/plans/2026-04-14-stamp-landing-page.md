# Stamp Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page immersive landing site for Stamp, a creative brand agency, with GSAP-powered animations, horizontal scroll, custom cursor, and smooth Lenis scrolling.

**Architecture:** React SPA (Vite) with Tailwind CSS for styling, GSAP + ScrollTrigger for all animations, and Lenis for smooth scroll. Content is centralized in a constants file. Components are split into layout (Navbar, Footer, cursor, scroll wrapper), sections (Hero, Services, About, Process, Contact), and reusable UI (buttons, counters, titles).

**Tech Stack:** React 18, Vite, Tailwind CSS v4, GSAP 3 + ScrollTrigger, Lenis, Lucide React

---

## File Structure

```
stamp/
  src/
    main.jsx                       # React root, renders App
    App.jsx                        # Lenis + cursor + all sections composed
    index.css                      # Tailwind directives, font imports, global resets
    components/
      layout/
        Navbar.jsx                 # Fixed nav, scroll-aware bg, mobile menu
        Footer.jsx                 # Logo, social links, copyright
        CustomCursor.jsx           # GSAP-animated cursor, hover states
        SmoothScroll.jsx           # Lenis wrapper, GSAP ScrollTrigger sync
      sections/
        Hero.jsx                   # Fullscreen pinned hero with text reveal + morph shape
        Services.jsx               # Horizontal scroll pinned section with 3 cards
        About.jsx                  # Split layout, counters, parallax image
        Process.jsx                # 4-step timeline with progressive line draw
        Contact.jsx                # Form with staggered reveal + magnetic submit
      ui/
        Button.jsx                 # Reusable lime-accent button
        SectionTitle.jsx           # Animated section heading component
        MagneticButton.jsx         # Button with magnetic cursor pull effect
        AnimatedCounter.jsx        # Number counter that animates on scroll entry
    hooks/
      useGsap.js                   # Hook: registers GSAP + ScrollTrigger, cleanup
      useMediaQuery.js             # Hook: returns boolean for breakpoint matches
    utils/
      animations.js                # Reusable GSAP timeline/tween presets
    constants/
      content.js                   # All site copy, service data, process steps
  public/
    fonts/
      PlayfairDisplay-Variable.woff2
      Inter-Variable.woff2
      JetBrainsMono-Variable.woff2
  index.html
  tailwind.config.js
  vite.config.js
  package.json
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Scaffold Vite + React project**

Run:
```bash
cd /Users/ahmedtareksalem/Development/projects/web/stamp
npm create vite@latest . -- --template react
```

Select: overwrite existing files if prompted.

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install
npm install tailwindcss @tailwindcss/vite gsap @studio-freight/lenis lucide-react
```

- [ ] **Step 3: Configure Vite with Tailwind**

Replace `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 4: Set up Tailwind with design tokens**

Replace `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-midnight: #0A0A0A;
  --color-midnight-light: #1A1A2E;
  --color-lime: #84CC16;
  --color-lime-glow: rgba(132, 204, 22, 0.2);
  --color-white: #FAFAFA;
  --color-gray: #A1A1AA;

  --font-display: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}

@layer base {
  * {
    cursor: none;
  }

  @media (pointer: coarse) {
    * {
      cursor: auto;
    }
  }

  html {
    background-color: var(--color-midnight);
    color: var(--color-white);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background-color: var(--color-lime);
    color: var(--color-midnight);
  }
}
```

- [ ] **Step 5: Add font imports to index.html**

Replace `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stamp — Don't just be existing, be identified</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Set up minimal App shell**

Replace `src/App.jsx`:

```jsx
function App() {
  return (
    <div className="min-h-screen bg-midnight text-white">
      <h1 className="font-display text-6xl p-16 text-lime">Stamp</h1>
      <p className="font-body text-lg px-16 text-gray">
        Don't just be existing, be identified.
      </p>
    </div>
  );
}

export default App;
```

Replace `src/main.jsx`:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 7: Verify the dev server runs**

Run: `npm run dev`

Expected: Browser shows "Stamp" in Playfair Display with lime color on midnight background, and the slogan in gray Inter font. Tailwind tokens are working.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + Tailwind with Stamp design tokens"
```

---

### Task 2: Content Constants & Utility Hooks

**Files:**
- Create: `src/constants/content.js`, `src/hooks/useGsap.js`, `src/hooks/useMediaQuery.js`, `src/utils/animations.js`

- [ ] **Step 1: Create content constants**

Create `src/constants/content.js`:

```js
export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  headline: "Your brand is your story. Let's make it unforgettable.",
  slogan: "Don't just be existing, be identified.",
  scrollCta: "Scroll to explore",
};

export const SERVICES = [
  {
    icon: "Fingerprint",
    title: "Brand Identity Design",
    description:
      "We craft visual identities that make startups unforgettable. From logos to full brand systems, we build the foundation of how the world sees you.",
  },
  {
    icon: "Globe",
    title: "Website Design & Development",
    description:
      "Beautiful, high-performance sites that convert visitors into believers. Every pixel intentional, every interaction meaningful.",
  },
  {
    icon: "Smartphone",
    title: "Application Design & Development",
    description:
      "Apps that feel as good as they function. We design and build digital products that users love and businesses depend on.",
  },
];

export const ABOUT = {
  headline: "Why Stamp?",
  description:
    "Every startup has a story worth telling. We exist to make sure the world hears it. Stamp transforms early-stage companies into brands that demand attention — through identity, design, and technology that speaks louder than words.",
  stats: [
    { value: 50, suffix: "+", label: "Projects Delivered" },
    { value: 30, suffix: "+", label: "Startups Branded" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ],
};

export const PROCESS = [
  {
    icon: "Search",
    title: "Discover",
    description: "We dive deep into your vision, audience, and market to uncover what makes you unique.",
  },
  {
    icon: "Palette",
    title: "Design",
    description: "We shape your brand identity and digital presence with purpose and precision.",
  },
  {
    icon: "Code",
    title: "Develop",
    description: "We bring designs to life with clean, performant code that scales with your ambition.",
  },
  {
    icon: "Rocket",
    title: "Deliver",
    description: "We launch your brand into the world — polished, tested, and ready to make an impact.",
  },
];

export const CONTACT = {
  headline: "Ready to be identified?",
  description: "Tell us about your startup. Let's build something unforgettable together.",
};

export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} Stamp. All rights reserved.`,
  socials: [
    { icon: "Twitter", href: "https://twitter.com", label: "Twitter" },
    { icon: "Linkedin", href: "https://linkedin.com", label: "LinkedIn" },
    { icon: "Instagram", href: "https://instagram.com", label: "Instagram" },
  ],
};
```

- [ ] **Step 2: Create GSAP hook**

Create `src/hooks/useGsap.js`:

```js
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsap(callback, deps = []) {
  useEffect(() => {
    const ctx = gsap.context(callback);
    return () => ctx.revert();
  }, deps);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 3: Create media query hook**

Create `src/hooks/useMediaQuery.js`:

```js
import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    function handler(e) {
      setMatches(e.matches);
    }

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
```

- [ ] **Step 4: Create animation presets**

Create `src/utils/animations.js`:

```js
export const EASE = {
  reveal: "power3.out",
  playful: "elastic.out(1, 0.5)",
  smooth: "power2.inOut",
};

export const DURATIONS = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
};

export const fadeUp = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: 0.8, ease: "power3.out" },
};

export const slideFromLeft = {
  from: { opacity: 0, x: -60 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
};

export const slideFromRight = {
  from: { opacity: 0, x: 60 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
};

export const defaultScrollTrigger = (trigger) => ({
  trigger,
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none none",
});
```

- [ ] **Step 5: Commit**

```bash
git add src/constants/ src/hooks/ src/utils/
git commit -m "feat: add content constants, GSAP hook, media query hook, animation presets"
```

---

### Task 3: Smooth Scroll (Lenis) Wrapper

**Files:**
- Create: `src/components/layout/SmoothScroll.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create SmoothScroll component**

Create `src/components/layout/SmoothScroll.jsx`:

```jsx
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "../../hooks/useGsap";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 2: Wrap App with SmoothScroll**

Replace `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-midnight text-white">
        <h1 className="font-display text-6xl p-16 text-lime">Stamp</h1>
        <p className="font-body text-lg px-16 text-gray">
          Don't just be existing, be identified.
        </p>
        {/* Spacer to test scroll */}
        <div className="h-[300vh]" />
      </div>
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify smooth scroll works**

Run: `npm run dev`

Expected: Page has a buttery-smooth scroll feel. The default browser jerky scroll is replaced with a smooth, slightly delayed scroll response.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/SmoothScroll.jsx src/App.jsx
git commit -m "feat: add Lenis smooth scroll wrapper with GSAP ScrollTrigger sync"
```

---

### Task 4: Custom Cursor

**Files:**
- Create: `src/components/layout/CustomCursor.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create CustomCursor component**

Create `src/components/layout/CustomCursor.jsx`:

```jsx
import { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const isTouch = useMediaQuery("(pointer: coarse)");

  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    let mouseX = 0;
    let mouseY = 0;

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function animate() {
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: "power2.out",
      });
      requestAnimationFrame(animate);
    }

    function onMouseEnterHoverable(e) {
      const cursorLabel = e.currentTarget.dataset.cursorLabel;
      gsap.to(cursor, {
        width: 64,
        height: 64,
        duration: 0.3,
        ease: "power3.out",
      });
      if (cursorLabel) {
        label.textContent = cursorLabel;
        gsap.to(label, { opacity: 1, duration: 0.2 });
      }
    }

    function onMouseLeaveHoverable() {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    }

    window.addEventListener("mousemove", onMouseMove);
    animate();

    const hoverables = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterHoverable);
      el.addEventListener("mouseleave", onMouseLeaveHoverable);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHoverable);
        el.removeEventListener("mouseleave", onMouseLeaveHoverable);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full bg-lime mix-blend-difference"
      style={{
        width: 12,
        height: 12,
        transform: "translate(-50%, -50%)",
      }}
    >
      <span
        ref={labelRef}
        className="text-midnight text-xs font-body font-semibold opacity-0 select-none"
      />
    </div>
  );
}
```

- [ ] **Step 2: Add CustomCursor to App**

Replace `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <div className="min-h-screen bg-midnight text-white">
        <h1 className="font-display text-6xl p-16 text-lime">Stamp</h1>
        <a href="#" className="px-16 text-lime underline" data-cursor-label="Click">
          Hover me to test cursor
        </a>
        <div className="h-[300vh]" />
      </div>
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify cursor works**

Run: `npm run dev`

Expected: Default system cursor is hidden. A small lime circle follows the mouse with slight lag. Hovering the link expands the cursor to 64px and shows "Click" label. On mobile/touch, the default cursor shows instead.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/CustomCursor.jsx src/App.jsx src/index.css
git commit -m "feat: add custom cursor with hover expansion and label support"
```

---

### Task 5: Reusable UI Components

**Files:**
- Create: `src/components/ui/Button.jsx`, `src/components/ui/SectionTitle.jsx`, `src/components/ui/MagneticButton.jsx`, `src/components/ui/AnimatedCounter.jsx`

- [ ] **Step 1: Create Button component**

Create `src/components/ui/Button.jsx`:

```jsx
export default function Button({ children, href, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-body font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime";

  const variants = {
    primary: "bg-lime text-midnight hover:bg-lime/90",
    outline: "border border-lime text-lime hover:bg-lime hover:text-midnight",
    ghost: "text-lime hover:text-lime/80",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create SectionTitle component**

Create `src/components/ui/SectionTitle.jsx`:

```jsx
import { useRef } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { defaultScrollTrigger } from "../../utils/animations";

export default function SectionTitle({ children, className = "" }) {
  const ref = useRef(null);

  useGsap(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: defaultScrollTrigger(ref.current),
      }
    );
  });

  return (
    <h2
      ref={ref}
      className={`font-display text-5xl md:text-6xl lg:text-7xl text-white ${className}`}
    >
      {children}
    </h2>
  );
}
```

- [ ] **Step 3: Create MagneticButton component**

Create `src/components/ui/MagneticButton.jsx`:

```jsx
import { useRef } from "react";
import { gsap } from "../../hooks/useGsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function MagneticButton({ children, className = "", ...props }) {
  const ref = useRef(null);
  const isTouch = useMediaQuery("(pointer: coarse)");

  function handleMouseMove(e) {
    if (isTouch) return;
    const btn = ref.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function handleMouseLeave() {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-lime px-10 py-4 text-base font-body font-semibold text-midnight transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(132,204,22,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${className}`}
      data-cursor-label="Send"
      {...props}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Create AnimatedCounter component**

Create `src/components/ui/AnimatedCounter.jsx`:

```jsx
import { useRef, useState } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { defaultScrollTrigger } from "../../utils/animations";

export default function AnimatedCounter({ value, suffix = "", label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useGsap(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        ...defaultScrollTrigger(ref.current),
        once: true,
      },
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });
  });

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-5xl lg:text-6xl text-lime">
        {display}
        {suffix}
      </span>
      <p className="mt-2 text-sm text-gray font-body">{label}</p>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add reusable UI components (Button, SectionTitle, MagneticButton, AnimatedCounter)"
```

---

### Task 6: Navbar

**Files:**
- Create: `src/components/layout/Navbar.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Navbar component**

Create `src/components/layout/Navbar.jsx`:

```jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "../../hooks/useGsap";
import { NAV_LINKS } from "../../constants/content";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current.querySelectorAll("a, button"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power3.out", delay: 0.15 }
      );
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-500 md:px-12 ${
          scrolled
            ? "bg-midnight/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <a
          href="#"
          className="font-display text-2xl font-bold text-white"
          data-cursor-label="Home"
        >
          Stamp<span className="text-lime">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-gray transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" variant="primary">
            Let's Talk
          </Button>
        </div>

        <button
          className="flex items-center justify-center md:hidden text-white"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-midnight"
        >
          <button
            className="absolute top-4 right-6 text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl text-white transition-colors hover:text-lime"
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" onClick={() => setMenuOpen(false)}>
            Let's Talk
          </Button>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Add Navbar to App**

Replace `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <div className="h-screen flex items-center justify-center">
          <h1 className="font-display text-6xl text-lime">Hero placeholder</h1>
        </div>
        <div id="services" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Services placeholder</h2>
        </div>
        <div id="about" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">About placeholder</h2>
        </div>
        <div id="contact" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Contact placeholder</h2>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify navbar works**

Run: `npm run dev`

Expected: Transparent navbar on top. Scrolling down gives it a frosted midnight background. Nav links scroll to sections. On mobile viewport, hamburger icon opens fullscreen overlay with animated links. "Let's Talk" button is lime with dark text.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.jsx src/App.jsx
git commit -m "feat: add fixed navbar with scroll-aware background and mobile overlay menu"
```

---

### Task 7: Hero Section

**Files:**
- Create: `src/components/sections/Hero.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Hero component**

Create `src/components/sections/Hero.jsx`:

```jsx
import { useRef } from "react";
import { useGsap, gsap, ScrollTrigger } from "../../hooks/useGsap";
import { HERO } from "../../constants/content";
import { ChevronDown } from "lucide-react";

function MorphShape() {
  const svgRef = useRef(null);

  useGsap(() => {
    const paths = svgRef.current.querySelectorAll("path");
    paths.forEach((path, i) => {
      gsap.to(path, {
        attr: {
          d:
            i === 0
              ? "M 300 200 C 350 100, 500 150, 450 300 C 400 450, 200 400, 250 250 Z"
              : "M 500 400 C 550 300, 700 350, 650 500 C 600 650, 400 600, 450 450 Z",
        },
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.5,
      });
    });
  });

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M 250 250 C 300 150, 450 200, 400 350 C 350 500, 150 450, 200 300 Z"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="1"
        filter="url(#glow)"
      />
      <path
        d="M 450 350 C 500 250, 650 300, 600 450 C 550 600, 350 550, 400 400 Z"
        fill="none"
        stroke="var(--color-lime)"
        strokeWidth="0.5"
        filter="url(#glow)"
      />
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const sloganRef = useRef(null);
  const scrollCtaRef = useRef(null);

  useGsap(() => {
    const words = headlineRef.current.querySelectorAll(".word");

    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      words,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }
    );

    tl.fromTo(
      sloganRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    tl.fromTo(
      scrollCtaRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 },
      "-=0.1"
    );

    // Scroll-out parallax
    gsap.to(sectionRef.current, {
      y: -100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  const headlineWords = HERO.headline.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-midnight px-6"
    >
      <MorphShape />

      <div className="relative z-10 max-w-4xl text-center">
        <h1
          ref={headlineRef}
          className="font-display text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
        >
          {headlineWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
              <span className="word inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          ref={sloganRef}
          className="mt-6 font-body text-lg text-gray md:text-xl"
        >
          {HERO.slogan}
        </p>
      </div>

      <div
        ref={scrollCtaRef}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-gray">{HERO.scrollCta}</span>
        <ChevronDown className="animate-bounce text-lime" size={20} />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace App placeholder with Hero**

In `src/App.jsx`, replace the first placeholder div with the Hero import:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <div id="services" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Services placeholder</h2>
        </div>
        <div id="about" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">About placeholder</h2>
        </div>
        <div id="contact" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Contact placeholder</h2>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify hero works**

Run: `npm run dev`

Expected: Fullscreen hero with word-by-word headline animation on load, slogan fades up after, scroll indicator bounces at bottom. Morphing lime SVG shapes glow in the background. Scrolling down parallaxes the hero content upward and fades it out.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.jsx src/App.jsx
git commit -m "feat: add hero section with word reveal animation, morphing shapes, and scroll parallax"
```

---

### Task 8: Services Horizontal Scroll Section

**Files:**
- Create: `src/components/sections/Services.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Services component**

Create `src/components/sections/Services.jsx`:

```jsx
import { useRef } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SERVICES } from "../../constants/content";
import { Fingerprint, Globe, Smartphone } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

const ICON_MAP = {
  Fingerprint,
  Globe,
  Smartphone,
};

function ServiceCard({ service, index }) {
  const Icon = ICON_MAP[service.icon];

  return (
    <div className="group flex h-[70vh] w-[80vw] shrink-0 flex-col justify-center rounded-2xl border border-white/10 bg-midnight-light p-8 transition-colors hover:border-lime/30 md:w-[40vw] md:p-12 lg:w-[30vw]">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-lime/10">
        <Icon className="text-lime" size={32} />
      </div>
      <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
        {service.title}
      </h3>
      <p className="mt-4 font-body text-base leading-relaxed text-gray">
        {service.description}
      </p>
      <div className="mt-8 h-[2px] w-0 bg-lime transition-all duration-500 group-hover:w-full" />
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const lineRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 767px)");

  useGsap(() => {
    if (isMobile) return;

    const track = trackRef.current;
    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
        },
      }
    );
  }, [isMobile]);

  if (isMobile) {
    return (
      <section id="services" className="bg-midnight px-6 py-24">
        <SectionTitle className="mb-12">
          What we <span className="text-lime">do</span>
        </SectionTitle>
        <div className="flex flex-col gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-midnight"
    >
      <div className="absolute top-12 left-6 z-10 md:left-12">
        <SectionTitle>
          What we <span className="text-lime">do</span>
        </SectionTitle>
      </div>

      <div
        ref={lineRef}
        className="absolute top-32 left-0 z-10 h-[2px] w-full origin-left bg-lime/20"
      />

      <div
        ref={trackRef}
        className="flex h-full items-center gap-8 px-12 pt-20"
        style={{ width: "fit-content" }}
      >
        {SERVICES.map((service, i) => (
          <ServiceCard key={i} service={service} index={i} />
        ))}
        {/* Spacer card for scroll room */}
        <div className="w-[10vw] shrink-0" />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace services placeholder in App**

Update `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <div id="about" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">About placeholder</h2>
        </div>
        <div id="contact" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Contact placeholder</h2>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify horizontal scroll works**

Run: `npm run dev`

Expected: On desktop, scrolling pins the services section and translates 3 cards horizontally from right to left. A lime line scales from left as you scroll. Cards have hover effects (border glow, bottom line draws). On mobile viewports, cards stack vertically with no horizontal scroll.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Services.jsx src/App.jsx
git commit -m "feat: add services section with horizontal scroll, pinned animation, and mobile fallback"
```

---

### Task 9: About Section

**Files:**
- Create: `src/components/sections/About.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create About component**

Create `src/components/sections/About.jsx`:

```jsx
import { useRef } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { ABOUT } from "../../constants/content";
import { defaultScrollTrigger } from "../../utils/animations";
import SectionTitle from "../ui/SectionTitle";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function About() {
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useGsap(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: defaultScrollTrigger(textRef.current),
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: defaultScrollTrigger(imageRef.current),
      }
    );

    // Parallax on image
    gsap.to(imageRef.current, {
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section id="about" className="bg-midnight px-6 py-24 md:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div ref={textRef}>
            <SectionTitle className="mb-8">
              {ABOUT.headline.split(" ")[0]}{" "}
              <span className="text-lime">{ABOUT.headline.split(" ").slice(1).join(" ")}</span>
            </SectionTitle>
            <p className="font-body text-lg leading-relaxed text-gray">
              {ABOUT.description}
            </p>
          </div>

          <div ref={imageRef} className="relative overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80"
              alt="Creative workspace with design tools and laptop"
              className="h-[400px] w-full object-cover lg:h-[500px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:mt-24">
          {ABOUT.stats.map((stat, i) => (
            <AnimatedCounter
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace about placeholder in App**

Update `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import About from "./components/sections/About";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <div id="contact" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Contact placeholder</h2>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify about section works**

Run: `npm run dev`

Expected: Split layout with text sliding in from left and image from right. Image has parallax on scroll. Counters animate from 0 to target values when scrolled into view. Gradient overlay on image blends into midnight background.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About.jsx src/App.jsx
git commit -m "feat: add about section with slide-in animations, parallax image, and animated counters"
```

---

### Task 10: Process Section

**Files:**
- Create: `src/components/sections/Process.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Process component**

Create `src/components/sections/Process.jsx`:

```jsx
import { useRef } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { PROCESS } from "../../constants/content";
import { Search, Palette, Code, Rocket } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

const ICON_MAP = { Search, Palette, Code, Rocket };

export default function Process() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  useGsap(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    stepsRef.current.forEach((step, i) => {
      gsap.fromTo(
        step,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  });

  return (
    <section
      ref={sectionRef}
      className="bg-midnight px-6 py-24 md:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <SectionTitle className="mb-16 text-center">
          How we <span className="text-lime">work</span>
        </SectionTitle>

        <div className="relative">
          {/* Vertical connecting line */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 h-full w-[2px] origin-top bg-lime/30 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-16">
            {PROCESS.map((step, i) => {
              const Icon = ICON_MAP[step.icon];
              const isEven = i % 2 === 0;

              return (
                <div
                  key={i}
                  ref={(el) => (stepsRef.current[i] = el)}
                  className={`relative flex items-start gap-6 pl-16 md:pl-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon dot on line */}
                  <div className="absolute left-3 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-lime md:static md:shrink-0">
                    <Icon className="text-midnight" size={14} />
                  </div>

                  <div
                    className={`flex-1 ${
                      isEven ? "md:text-right md:pr-12" : "md:text-left md:pl-12"
                    }`}
                  >
                    <h3 className="font-display text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 font-body text-base text-gray">
                      {step.description}
                    </p>
                  </div>

                  {/* Spacer for alignment on desktop */}
                  <div className="hidden flex-1 md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Process to App**

Update `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import About from "./components/sections/About";
import Process from "./components/sections/Process";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <div id="contact" className="h-screen flex items-center justify-center">
          <h2 className="font-display text-4xl text-white">Contact placeholder</h2>
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify process section works**

Run: `npm run dev`

Expected: A vertical timeline with a lime line that draws as you scroll. Four steps alternate left/right on desktop, stack left-aligned on mobile. Each step fades + scales in when scrolled to. Lime dots with icons sit on the connecting line.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Process.jsx src/App.jsx
git commit -m "feat: add process timeline section with progressive line draw and staggered reveals"
```

---

### Task 11: Contact Section

**Files:**
- Create: `src/components/sections/Contact.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Contact component**

Create `src/components/sections/Contact.jsx`:

```jsx
import { useRef, useState } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { CONTACT } from "../../constants/content";
import { defaultScrollTrigger } from "../../utils/animations";
import MagneticButton from "../ui/MagneticButton";
import { Send } from "lucide-react";

export default function Contact() {
  const headlineRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useGsap(() => {
    // Letter-by-letter headline reveal
    const chars = headlineRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: defaultScrollTrigger(headlineRef.current),
      }
    );

    // Staggered form fields
    const fields = formRef.current.querySelectorAll(".form-field");
    gsap.fromTo(
      fields,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: defaultScrollTrigger(formRef.current),
      }
    );
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  }

  const headlineChars = CONTACT.headline.split("");

  return (
    <section
      id="contact"
      className="bg-midnight px-6 py-24 md:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          ref={headlineRef}
          className="font-display text-5xl font-bold md:text-6xl lg:text-7xl"
        >
          {headlineChars.map((char, i) => (
            <span key={i} className="char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <p className="mt-6 font-body text-lg text-gray">
          {CONTACT.description}
        </p>

        {submitted ? (
          <div className="mt-12 rounded-2xl border border-lime/20 bg-midnight-light p-12">
            <p className="font-display text-2xl text-lime">Thank you!</p>
            <p className="mt-2 font-body text-gray">
              We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-6 text-left"
          >
            <div className="form-field">
              <label
                htmlFor="name"
                className="mb-2 block font-body text-sm text-gray"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-midnight-light px-4 py-3 font-body text-white outline-none transition-colors focus:border-lime"
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label
                htmlFor="email"
                className="mb-2 block font-body text-sm text-gray"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-midnight-light px-4 py-3 font-body text-white outline-none transition-colors focus:border-lime"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-field">
              <label
                htmlFor="message"
                className="mb-2 block font-body text-sm text-gray"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-white/10 bg-midnight-light px-4 py-3 font-body text-white outline-none transition-colors focus:border-lime"
                placeholder="Tell us about your startup..."
              />
            </div>

            <div className="form-field flex justify-center pt-4">
              <MagneticButton type="submit">
                <Send size={18} />
                Let's Talk
              </MagneticButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace contact placeholder in App**

Update `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import About from "./components/sections/About";
import Process from "./components/sections/Process";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify contact section works**

Run: `npm run dev`

Expected: Headline reveals letter-by-letter on scroll. Form fields slide up staggered. Submit button has magnetic cursor pull and lime glow on hover. Submitting logs to console and shows a thank-you message. Form inputs have lime border on focus.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Contact.jsx src/App.jsx
git commit -m "feat: add contact section with letter reveal headline, staggered form, and magnetic submit button"
```

---

### Task 12: Footer

**Files:**
- Create: `src/components/layout/Footer.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create Footer component**

Create `src/components/layout/Footer.jsx`:

```jsx
import { Twitter, Linkedin, Instagram } from "lucide-react";
import { FOOTER, NAV_LINKS } from "../../constants/content";

const ICON_MAP = { Twitter, Linkedin, Instagram };

export default function Footer() {
  return (
    <footer className="border-t border-lime/10 bg-midnight px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <a href="#" className="font-display text-xl font-bold text-white">
          Stamp<span className="text-lime">.</span>
        </a>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-gray transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {FOOTER.socials.map((social) => {
            const Icon = ICON_MAP[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray transition-colors hover:text-lime"
                data-cursor-label={social.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>

      <p className="mt-8 text-center font-body text-xs text-gray/60">
        {FOOTER.copyright}
      </p>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to App**

Update `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import About from "./components/sections/About";
import Process from "./components/sections/Process";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify footer works**

Run: `npm run dev`

Expected: Minimal footer with Stamp logo, nav links, social icons, and copyright. Lime glow divider at top (border). Social icons show cursor label on hover.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.jsx src/App.jsx
git commit -m "feat: add footer with logo, nav links, and social icons"
```

---

### Task 13: Accessibility & Skip Link

**Files:**
- Modify: `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Add skip-to-content link and prefers-reduced-motion**

Add to `src/index.css` (after the existing `@layer base` block):

```css
@layer components {
  .skip-link {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    padding: 0.75rem 1.5rem;
    background-color: var(--color-lime);
    color: var(--color-midnight);
    font-family: var(--font-body);
    font-weight: 600;
    border-radius: 0.5rem;
    transition: top 0.2s;
  }

  .skip-link:focus {
    top: 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Add skip link to App**

Update `src/App.jsx`:

```jsx
import SmoothScroll from "./components/layout/SmoothScroll";
import CustomCursor from "./components/layout/CustomCursor";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import About from "./components/sections/About";
import Process from "./components/sections/Process";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <a href="#services" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default App;
```

- [ ] **Step 3: Verify accessibility features**

Run: `npm run dev`

Expected: Pressing Tab at the top of the page reveals a "Skip to content" link. Enabling `prefers-reduced-motion` in OS settings disables all animations. All interactive elements have visible focus states (lime outline from Tailwind's `focus-visible:outline-lime`).

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/index.css
git commit -m "feat: add skip-to-content link and prefers-reduced-motion support"
```

---

### Task 14: Final Polish & Cleanup

**Files:**
- Modify: `src/App.jsx` (remove leftover test code if any)
- Delete: `src/App.css` (Vite scaffold leftover, if it exists)
- Delete: `src/assets/` (Vite scaffold leftover, if it exists)

- [ ] **Step 1: Remove Vite scaffold leftovers**

Run:
```bash
rm -f src/App.css
rm -rf src/assets/
```

- [ ] **Step 2: Verify the complete site end-to-end**

Run: `npm run dev`

Walk through:
1. Page loads — smooth scroll active, custom cursor follows mouse
2. Hero — word-by-word headline reveal, morphing lime shapes, scroll indicator bounces
3. Scroll down — hero parallaxes and fades out
4. Services — section pins, cards scroll horizontally, lime line draws
5. About — text slides from left, image from right with parallax, counters animate
6. Process — timeline line draws, steps fade in staggered
7. Contact — headline reveals letter-by-letter, form fields slide up, magnetic submit button
8. Footer — minimal, social icons with cursor labels
9. Mobile — hamburger menu, vertical card stack, no custom cursor
10. Navbar — transparent on hero, frosted on scroll

- [ ] **Step 3: Run production build**

Run:
```bash
npm run build
npm run preview
```

Expected: Production build completes without errors. Preview serves the site locally and all animations work correctly.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: clean up scaffold leftovers and verify production build"
```
