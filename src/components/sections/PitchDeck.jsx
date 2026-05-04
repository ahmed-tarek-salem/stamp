import { useRef } from "react";
import { useGsap, gsap, ScrollTrigger } from "../../hooks/useGsap";
import { smoothScrollTo } from "../../utils/smoothScroll";
import { ArrowRight } from "lucide-react";

/**
 * The Stamp Pitch Deck — 5-slide cinematic story embedded as a pinned scroll
 * stack. Section is N×100vh tall with a sticky inner container that holds all
 * slides absolutely positioned. ScrollTrigger tracks progress through the
 * section and crossfades + scales between slides.
 *
 * Each slide has a textPosition tuned to its image's negative space.
 */

const SLIDES = [
  {
    id: "hook",
    eyebrow: "01 / Manifesto",
    headline: ["Most startups die", "invisible"],
    sub: "Not from bad ideas. From bad branding.",
    image: "/pitch/slide-1.png",
    textPosition: "upper-left",
  },
  {
    id: "promise",
    eyebrow: "02 / Why Stamp",
    headline: ["We make sure", "yours doesn't"],
    sub: "Brand. Identity. Story. Ship.",
    image: "/pitch/slide-2.png",
    textPosition: "left",
  },
  {
    id: "work",
    eyebrow: "03 / What we do",
    headline: ["Identity. Web.", "Apps. Content"],
    sub: "Four crafts. One discipline.",
    image: "/pitch/slide-3.png",
    textPosition: "top",
    subStyle: "pill",
  },
  {
    id: "pace",
    eyebrow: "04 / How we work",
    headline: ["From whisper", "to roar"],
    sub: "Discovery → Design → Develop → Deliver. In days, not weeks.",
    image: "/pitch/slide-4.png",
    textPosition: "left",
  },
  {
    id: "ask",
    eyebrow: "05 / Let's go",
    headline: ["Let's stamp", "your story"],
    sub: "Tell us what you're building. We'll handle how the world sees it.",
    image: "/pitch/slide-5.png",
    textPosition: "upper-left",
    cta: { label: "Start a project", href: "#contact" },
  },
];

// All slides reserve ~7rem at top to clear the fixed navbar (≈ 96px height).
// In flex-col: justify-* = vertical axis, items-* = horizontal axis.
const TEXT_POSITION_CLASSES = {
  // Top + left
  "upper-left":
    "items-start justify-start pt-28 pl-6 pr-6 md:pt-32 md:pl-12 md:pr-[40vw]",
  // Vertical center + left
  left: "items-start justify-center py-28 pl-6 pr-6 md:py-32 md:pl-12 md:pr-[45vw]",
  // Top + horizontal center
  top: "items-center justify-start pt-28 px-6 text-center md:pt-32 md:px-12",
  // Bottom + left
  "bottom-left":
    "items-start justify-end pb-16 pt-28 pl-6 pr-6 md:pb-20 md:pt-32 md:pl-12 md:pr-[40vw]",
};

export default function PitchDeck() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const slidesRef = useRef([]);
  const dotsRef = useRef([]);
  const counterRef = useRef(null);

  useGsap(() => {
    const slides = slidesRef.current.filter(Boolean);
    const dots = dotsRef.current.filter(Boolean);
    if (!slides.length) return;

    // Initial state: first slide active at scale 1; rest waiting at 0.94
    slides.forEach((slide, i) => {
      gsap.set(slide, {
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 0.94,
        zIndex: i === 0 ? 2 : 1,
      });
    });
    dots.forEach((dot, i) => {
      gsap.set(dot, {
        scale: i === 0 ? 1 : 0.5,
        opacity: i === 0 ? 1 : 0.3,
      });
    });

    const totalSlides = SLIDES.length;

    // Cinematic zoom transitions — outgoing slide zooms IN dramatically
    // (camera pushes through the image past the viewer), incoming slide
    // settles in from a smaller scale. Layered z-index keeps the outgoing
    // slide on top until it has zoomed away, then the incoming slide is
    // revealed underneath at proper scale.
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => {
        const positionInDeck = self.progress * (totalSlides - 1);
        const activeIndex = Math.min(
          Math.floor(positionInDeck),
          totalSlides - 1,
        );
        const intra = positionInDeck - activeIndex;

        slides.forEach((slide, i) => {
          let opacity = 0;
          let scale = 0.9;
          let zIndex = 0;

          if (i === activeIndex) {
            // Outgoing — gentle zoom-in (camera nudges into the image)
            scale = 1 + intra * 0.12; // 1.0 → 1.12
            // Stays fully visible most of the way; quick drop at the end
            opacity = intra < 0.7 ? 1 : 1 - (intra - 0.7) / 0.3;
            zIndex = 2;
          } else if (i === activeIndex + 1) {
            // Incoming — subtle zoom-in to settle
            scale = 0.94 + intra * 0.06; // 0.94 → 1.0
            // Fades in during back half
            opacity = intra < 0.5 ? 0 : (intra - 0.5) / 0.5;
            zIndex = 1;
          }

          gsap.set(slide, { opacity, scale, zIndex });
        });

        // Dots track nearest slide
        const snappedIndex = Math.round(positionInDeck);
        dots.forEach((dot, i) => {
          gsap.set(dot, {
            scale: i === snappedIndex ? 1 : 0.5,
            opacity: i === snappedIndex ? 1 : 0.3,
          });
        });

        if (counterRef.current) {
          counterRef.current.textContent = `0${snappedIndex + 1} / 0${totalSlides}`;
        }
      },
    });

    return () => trigger.kill();
  });

  return (
    <section
      ref={sectionRef}
      id="pitch"
      className="relative bg-midnight"
      // 100vh for the first slide pinned, then ~50vh of scroll per transition.
      // Tighter than 100vh-per-slide; users advance with a single flick.
      style={{ height: `${100 + (SLIDES.length - 1) * 50}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Slides */}
        {SLIDES.map((slide, i) => (
          <article
            key={slide.id}
            ref={(el) => (slidesRef.current[i] = el)}
            className="absolute inset-0"
            aria-hidden={i !== 0}
          >
            {/* Background image */}
            <img
              src={slide.image}
              alt=""
              aria-hidden="true"
              loading={i < 2 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Vignette + text-side darkening for legibility */}
            <div className="absolute inset-0 bg-gradient-to-br from-midnight/80 via-midnight/40 to-midnight/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-midnight/20 to-midnight/40" />

            {/* Content */}
            <div
              className={`relative z-10 flex h-full w-full flex-col text-left ${TEXT_POSITION_CLASSES[slide.textPosition] || TEXT_POSITION_CLASSES.left}`}
            >
              <div
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime md:text-xs"
                style={{ textShadow: "0 1px 8px rgba(10, 10, 10, 0.6)" }}
              >
                {slide.eyebrow}
              </div>
              <h2
                className="mt-5 font-display text-4xl font-bold leading-[0.95] text-white md:mt-7 md:text-6xl lg:text-7xl xl:text-8xl"
                style={{ textShadow: "0 4px 20px rgba(10, 10, 10, 0.5)" }}
              >
                {slide.headline.map((line, j) => (
                  <span key={j} className="block">
                    {line}
                    {j === slide.headline.length - 1 && (
                      <span className="text-lime">.</span>
                    )}
                  </span>
                ))}
              </h2>
              {slide.subStyle === "pill" ? (
                <p className="mt-5 md:mt-7">
                  <span className="inline-block bg-lime px-3 py-1.5 font-body text-base font-semibold leading-relaxed text-midnight md:px-4 md:py-2 md:text-lg">
                    {slide.sub}
                  </span>
                </p>
              ) : (
                <p
                  className="mt-5 max-w-xl font-body text-base leading-relaxed text-white/85 md:mt-7 md:text-lg"
                  style={{ textShadow: "0 2px 12px rgba(10, 10, 10, 0.6)" }}
                >
                  {slide.sub}
                </p>
              )}
              {slide.cta && (
                <a
                  href={slide.cta.href}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo(slide.cta.href, e.currentTarget);
                  }}
                  data-cursor-hover
                  data-cursor-label="Start"
                  className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-lime px-7 py-3.5 font-body text-sm font-semibold text-midnight transition-transform hover:scale-105 md:mt-9 md:px-9 md:py-4 md:text-base"
                >
                  {slide.cta.label}
                  <ArrowRight size={18} strokeWidth={2.5} />
                </a>
              )}
            </div>
          </article>
        ))}

        {/* Progress dots — vertical stack, top-right */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-6 z-20 flex -translate-y-1/2 flex-col gap-3 md:right-10"
        >
          {SLIDES.map((_, i) => (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              className="h-2 w-2 rounded-full bg-lime"
            />
          ))}
        </div>

        {/* Slide counter — bottom-left */}
        <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] uppercase tracking-[0.25em] text-gray/60 md:bottom-10 md:left-10 md:text-xs">
          <span ref={counterRef}>01 / 0{SLIDES.length}</span>
          <span className="ml-3 text-lime/40">·</span>
          <span className="ml-3">PITCH</span>
        </div>
      </div>
    </section>
  );
}
