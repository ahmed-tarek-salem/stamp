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
