import { useEffect, useRef, useState } from "react";
import { gsap } from "../../hooks/useGsap";

const SESSION_KEY = "stamp:intro-played";

/**
 * Full-screen intro loader shown on first visit per session.
 * Animation sequence:
 *   1. Outer + inner rings draw (stroke-dashoffset)
 *   2. Serif "S" + period dot fade up
 *   3. Wordmark "Stamp." fades in below logo
 *   4. Whole thing scales down + slides toward navbar position
 *   5. Overlay fades out, content revealed
 *
 * Skips entirely on prefers-reduced-motion or if already shown this session.
 */
export default function IntroLoader() {
  const [shouldShow, setShouldShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem(SESSION_KEY) === "1") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    return true;
  });

  const overlayRef = useRef(null);
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const sLetterRef = useRef(null);
  const dotRef = useRef(null);
  const wordmarkRef = useRef(null);
  const logoGroupRef = useRef(null);

  useEffect(() => {
    if (!shouldShow) return;

    // Lock body scroll during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = originalOverflow;
        setShouldShow(false);
      },
    });

    // 1. Draw outer ring
    tl.fromTo(
      outerRingRef.current,
      { strokeDashoffset: 280 },
      { strokeDashoffset: 0, duration: 1.0 }
    )
      // 2. Draw inner ring (overlapping)
      .fromTo(
        innerRingRef.current,
        { strokeDashoffset: 230 },
        { strokeDashoffset: 0, duration: 0.8 },
        "-=0.6"
      )
      // 3. Reveal "S" + dot
      .fromTo(
        [sLetterRef.current, dotRef.current],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.3"
      )
      // 4. Wordmark fades up
      .fromTo(
        wordmarkRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.2"
      )
      // 5. Hold beat
      .to({}, { duration: 0.5 })
      // 6. Wordmark fades out
      .to(wordmarkRef.current, { opacity: 0, y: -10, duration: 0.4 })
      // 7. Logo shrinks + travels to navbar position (top-left)
      .to(
        logoGroupRef.current,
        {
          scale: 0.18,
          x: () =>
            -window.innerWidth / 2 + (window.innerWidth >= 768 ? 70 : 38),
          y: () => -window.innerHeight / 2 + 32,
          duration: 0.9,
          ease: "power3.inOut",
        },
        "-=0.1"
      )
      // 8. Overlay fades
      .to(
        overlayRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-midnight"
      aria-hidden="true"
    >
      <div
        ref={logoGroupRef}
        className="flex flex-col items-center gap-6"
        style={{ transformOrigin: "center center" }}
      >
        <svg
          width="160"
          height="160"
          viewBox="0 0 100 100"
          fill="none"
          className="overflow-visible"
        >
          {/* Outer ring — drawn */}
          <circle
            ref={outerRingRef}
            cx="50"
            cy="50"
            r="44"
            stroke="#84CC16"
            strokeWidth="3"
            strokeDasharray="280"
            strokeDashoffset="280"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner ring — drawn */}
          <circle
            ref={innerRingRef}
            cx="50"
            cy="50"
            r="36"
            stroke="#84CC16"
            strokeWidth="1.5"
            strokeDasharray="230"
            strokeDashoffset="230"
            strokeLinecap="round"
            fill="none"
          />
          {/* Serif "S" — fades */}
          <text
            ref={sLetterRef}
            x="50"
            y="66"
            fontFamily="Playfair Display, Georgia, serif"
            fontSize="48"
            fontWeight="700"
            fill="#84CC16"
            textAnchor="middle"
            opacity="0"
          >
            S
          </text>
          {/* Period dot — fades */}
          <circle
            ref={dotRef}
            cx="68"
            cy="62"
            r="2.5"
            fill="#84CC16"
            opacity="0"
          />
        </svg>

        {/* Wordmark below logo */}
        <div
          ref={wordmarkRef}
          className="font-display text-3xl font-bold text-white opacity-0"
        >
          Stamp<span className="text-lime">.</span>
        </div>
      </div>
    </div>
  );
}
