import { useEffect, useMemo, useRef, useState } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { defaultScrollTrigger } from "../../utils/animations";
import SectionTitle from "../ui/SectionTitle";
import { Shuffle, Copy, Check } from "lucide-react";

const PALETTES = [
  { name: "Citrus & Ink", colors: ["#84CC16", "#0A0A0A", "#F5F0E8"] },
  { name: "Coral Inkwell", colors: ["#FF4D2E", "#1A1A1A", "#FFF5E8"] },
  { name: "Electric Plum", colors: ["#9333EA", "#0F0F1A", "#F5F0FF"] },
  { name: "Forest Cobalt", colors: ["#2563EB", "#0F2A1F", "#E8F0E5"] },
  { name: "Espresso Cream", colors: ["#5C3A21", "#F4ECE0", "#D97757"] },
  { name: "Atomic Tangerine", colors: ["#FF6B35", "#0B0B0B", "#FFD93D"] },
  { name: "Deep Lagoon", colors: ["#0F766E", "#042F2E", "#FCD34D"] },
  { name: "Velvet Rouge", colors: ["#DC2626", "#1A0E0E", "#FECACA"] },
];

const TAGLINES = [
  "Built for what's next.",
  "Designed to last.",
  "More than a name.",
  "Made with intention.",
  "For the bold.",
  "Identity, refined.",
  "A new kind of brand.",
  "The future, branded.",
];

export default function BrandPlayground() {
  const [name, setName] = useState("Acme");
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef(null);
  const inputRef = useRef(null);
  const cardsRef = useRef(null);

  const palette = PALETTES[shuffleIndex % PALETTES.length];
  const tagline = TAGLINES[shuffleIndex % TAGLINES.length];

  const safeName = (name || "Stamp").trim() || "Stamp";
  const initial = safeName.charAt(0).toUpperCase();

  // Scroll-in stagger
  useGsap(() => {
    const cards = cardsRef.current?.querySelectorAll("[data-preview-card]");
    if (cards?.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, rotation: 1 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: defaultScrollTrigger(cardsRef.current),
        }
      );
    }

    if (inputRef.current) {
      gsap.fromTo(
        inputRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: defaultScrollTrigger(inputRef.current),
        }
      );
    }
  });

  // Re-animate cards on shuffle
  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll("[data-preview-card]");
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { scale: 0.96, opacity: 0.5 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.5)",
        stagger: 0.06,
      }
    );
  }, [shuffleIndex]);

  const handleShuffle = () => {
    setShuffleIndex((i) => i + 1);
  };

  const handleCopy = () => {
    const text = `${safeName} — ${tagline}\n\nBranded by Stamp · stamp.llc`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={sectionRef}
      id="playground"
      className="relative overflow-hidden bg-midnight px-6 py-24 md:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 max-w-3xl md:mb-16">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              / Playground
            </span>
            <span className="h-px flex-1 bg-lime/20" />
          </div>
          <SectionTitle className="mb-6">
            Try it <span className="text-lime italic">yourself</span>
          </SectionTitle>
          <p className="font-body text-lg text-gray">
            Type your startup name. See how we'd brand it — three treatments, a
            palette, and a tagline. Live.
          </p>
        </div>

        {/* Input */}
        <div ref={inputRef} className="mb-12 md:mb-16">
          <label
            htmlFor="brand-name"
            className="mb-3 block font-mono text-xs uppercase tracking-widest text-gray/70"
          >
            Your startup name
          </label>
          <div className="relative">
            <input
              id="brand-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 24))}
              placeholder="Acme"
              maxLength={24}
              className="w-full border-b-2 border-lime/30 bg-transparent pb-3 font-display text-5xl font-bold text-white caret-lime outline-none transition-colors focus:border-lime md:text-6xl lg:text-7xl"
              data-cursor-hover
            />
            <span className="absolute right-0 bottom-3 font-mono text-xs text-gray/50">
              {name.length}/24
            </span>
          </div>
        </div>

        {/* Three preview cards */}
        <div
          ref={cardsRef}
          className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          <SealPreview name={safeName} initial={initial} palette={palette} />
          <WordmarkPreview name={safeName} palette={palette} tagline={tagline} />
          <EditorialPreview name={safeName} palette={palette} tagline={tagline} />
        </div>

        {/* Palette + actions row */}
        <div className="flex flex-col gap-6 rounded-2xl border border-lime/10 bg-midnight/50 p-6 backdrop-blur-sm md:flex-row md:items-center md:justify-between md:p-8">
          {/* Palette swatches */}
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-widest text-gray/70">
              Palette · {palette.name}
            </div>
            <div className="flex items-center gap-3">
              {palette.colors.map((color, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div
                    className="h-12 w-12 rounded-full border border-white/10 shadow-lg transition-transform hover:scale-110"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-mono text-[10px] uppercase text-gray/60">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-2 rounded-full border border-lime/30 px-5 py-3 font-body text-sm text-white transition-colors hover:border-lime hover:bg-lime/10"
              data-cursor-hover
              data-cursor-label="Shuffle"
            >
              <Shuffle size={16} />
              Shuffle
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-full bg-lime px-5 py-3 font-body text-sm font-semibold text-midnight transition-transform hover:scale-105"
              data-cursor-hover
              data-cursor-label="Copy"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied!" : "Copy concept"}
            </button>
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-0 h-[500px] w-[500px] translate-x-1/3 rounded-full bg-lime/5 blur-3xl"
      />
    </section>
  );
}

/* -------- Preview Variants -------- */

function PreviewCard({ children, label }) {
  return (
    <article
      data-preview-card
      className="group relative flex aspect-square flex-col overflow-hidden rounded-2xl border border-lime/10 bg-midnight transition-colors hover:border-lime/30"
    >
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] uppercase tracking-widest text-lime/70">
        {label}
      </div>
      {children}
    </article>
  );
}

// Variant 1: Wax seal style (mirrors Stamp's own logo)
function SealPreview({ name, initial, palette }) {
  const [accent, dark, light] = palette.colors;
  return (
    <PreviewCard label="01 · Seal">
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-5 p-6 transition-colors duration-500"
        style={{ backgroundColor: dark, color: light }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={accent}
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="36"
            stroke={accent}
            strokeWidth="1.5"
            fill="none"
          />
          <text
            x="50"
            y="66"
            fontFamily="Playfair Display, Georgia, serif"
            fontSize="48"
            fontWeight="700"
            fill={accent}
            textAnchor="middle"
          >
            {initial}
          </text>
          <circle cx="68" cy="62" r="2.5" fill={accent} />
        </svg>
        <div className="text-center">
          <div
            className="font-display text-2xl font-bold"
            style={{ color: light }}
          >
            {name}
            <span style={{ color: accent }}>.</span>
          </div>
        </div>
      </div>
    </PreviewCard>
  );
}

// Variant 2: Modern wordmark
function WordmarkPreview({ name, palette, tagline }) {
  const [accent, dark, light] = palette.colors;
  return (
    <PreviewCard label="02 · Wordmark">
      <div
        className="flex h-full w-full flex-col items-start justify-end gap-6 p-7 transition-colors duration-500"
        style={{ backgroundColor: light, color: dark }}
      >
        <div
          className="h-1 w-12 rounded-full transition-colors duration-500"
          style={{ backgroundColor: accent }}
        />
        <div>
          <div
            className="break-words font-display text-4xl leading-none font-black tracking-tight md:text-5xl"
            style={{ color: dark }}
          >
            {name.toLowerCase()}
            <span style={{ color: accent }}>.</span>
          </div>
          <div
            className="mt-3 font-mono text-[11px] uppercase tracking-widest"
            style={{ color: dark, opacity: 0.6 }}
          >
            {tagline}
          </div>
        </div>
      </div>
    </PreviewCard>
  );
}

// Variant 3: Editorial / magazine masthead
function EditorialPreview({ name, palette, tagline }) {
  const [accent, dark, light] = palette.colors;
  return (
    <PreviewCard label="03 · Editorial">
      <div
        className="flex h-full w-full flex-col justify-between gap-4 p-7 transition-colors duration-500"
        style={{ backgroundColor: dark, color: light }}
      >
        <div
          className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: light, opacity: 0.6 }}
        >
          <span>Vol. 01</span>
          <span>—</span>
          <span>Issue {new Date().getFullYear()}</span>
        </div>
        <div className="flex flex-1 items-center justify-center text-center">
          <div
            className="font-display text-5xl leading-[0.9] font-black italic md:text-6xl"
            style={{ color: light }}
          >
            {name}
          </div>
        </div>
        <div className="space-y-2">
          <div
            className="h-px w-full transition-colors duration-500"
            style={{ backgroundColor: accent, opacity: 0.5 }}
          />
          <div
            className="text-center font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: accent }}
          >
            {tagline}
          </div>
        </div>
      </div>
    </PreviewCard>
  );
}
