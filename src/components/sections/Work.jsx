import { useRef } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { WORK } from "../../constants/content";
import { defaultScrollTrigger } from "../../utils/animations";
import SectionTitle from "../ui/SectionTitle";

const SIZE_CLASSES = {
  tall: "md:col-span-1 md:row-span-2",
  wide: "md:col-span-2 md:row-span-1",
  regular: "md:col-span-1 md:row-span-1",
  hero: "md:col-span-4 md:row-span-1",
};

export default function Work() {
  const gridRef = useRef(null);
  const subheadRef = useRef(null);

  useGsap(() => {
    // Stagger-in cards on scroll
    const cards = gridRef.current?.querySelectorAll("[data-work-card]");
    if (cards?.length) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, rotation: 1.5 },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: defaultScrollTrigger(gridRef.current),
        }
      );
    }

    // Subhead fade
    if (subheadRef.current) {
      gsap.fromTo(
        subheadRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: defaultScrollTrigger(subheadRef.current),
        }
      );
    }
  });

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-midnight px-6 py-24 md:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-lime">
              / Portfolio
            </span>
            <span className="h-px flex-1 bg-lime/20" />
          </div>
          <SectionTitle className="mb-6">
            Selected <span className="text-lime italic">Work</span>
          </SectionTitle>
          <p
            ref={subheadRef}
            className="max-w-2xl font-body text-lg text-gray"
          >
            {WORK.subhead}
          </p>
        </div>

        {/* Bento grid */}
        <div
          ref={gridRef}
          className="grid auto-rows-[280px] grid-cols-1 gap-4 md:grid-cols-4 md:gap-5 lg:auto-rows-[320px]"
        >
          {WORK.projects.map((project, i) => {
            // Assign last project to hero size so it spans full row
            const sizeKey = i === WORK.projects.length - 1 ? "hero" : project.size;
            return (
              <WorkCard
                key={project.id}
                project={project}
                sizeClass={SIZE_CLASSES[sizeKey] || SIZE_CLASSES.regular}
              />
            );
          })}
        </div>
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/5 blur-3xl"
      />
    </section>
  );
}

function WorkCard({ project, sizeClass }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const metricRef = useRef(null);
  const paletteRef = useRef(null);
  const lineRef = useRef(null);
  const titleRef = useRef(null);

  const handleEnter = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(imageRef.current, { scale: 1.08, duration: 0.8 }, 0)
      .to(overlayRef.current, { opacity: 1, duration: 0.4 }, 0)
      .to(
        titleRef.current,
        { y: -6, duration: 0.4 },
        0
      )
      .to(
        lineRef.current,
        { scaleX: 1, duration: 0.5 },
        0.05
      )
      .fromTo(
        metricRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.1
      )
      .fromTo(
        paletteRef.current?.children || [],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
          ease: "back.out(2)",
        },
        0.15
      );
  };

  const handleLeave = () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
    tl.to(imageRef.current, { scale: 1, duration: 0.6 }, 0)
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, 0)
      .to(titleRef.current, { y: 0, duration: 0.3 }, 0)
      .to(lineRef.current, { scaleX: 0, duration: 0.3 }, 0)
      .to(metricRef.current, { opacity: 0, y: 20, duration: 0.3 }, 0)
      .to(
        paletteRef.current?.children || [],
        { scale: 0, opacity: 0, duration: 0.2, stagger: 0.03 },
        0
      );
  };

  return (
    <a
      ref={cardRef}
      href={project.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      data-work-card
      data-cursor-hover
      data-cursor-label={`Visit ${project.name}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group relative block overflow-hidden rounded-2xl border border-lime/10 bg-midnight transition-colors duration-300 hover:border-lime/30 focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-midnight ${sizeClass}`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          ref={imageRef}
          src={project.image}
          alt={`${project.name} — ${project.category}`}
          className="h-full w-full object-cover will-change-transform"
          loading="lazy"
        />
        {/* Base gradient always visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-midnight/20" />
        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/90 to-midnight/40 opacity-0"
        />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-6 md:p-7">
        {/* Top row: year + category */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-lime/80">
            {project.category}
          </span>
          <span className="font-mono text-[10px] text-gray/60">
            {project.year}
          </span>
        </div>

        {/* Bottom content */}
        <div className="relative">
          {/* Title + challenge */}
          <div ref={titleRef}>
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              {project.name}
            </h3>
            <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-gray/90 md:text-base">
              {project.challenge}
            </p>
          </div>

          {/* Accent line */}
          <div
            ref={lineRef}
            className="mt-5 h-px origin-left scale-x-0 bg-lime"
          />

          {/* Hover-revealed: metric + palette */}
          <div className="mt-4 flex items-end justify-between gap-4">
            <div ref={metricRef} className="opacity-0">
              <div className="font-display text-3xl font-bold text-lime md:text-4xl">
                {project.metric.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-gray">
                {project.metric.label}
              </div>
            </div>
            <div
              ref={paletteRef}
              className="flex items-center gap-1.5"
              aria-hidden="true"
            >
              {project.palette.map((color, i) => (
                <span
                  key={i}
                  className="block h-6 w-6 scale-0 rounded-full border border-white/20 opacity-0 shadow-lg"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visit arrow badge (top-right) */}
      <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-lime/30 bg-midnight/60 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-lime group-hover:text-midnight">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-lime group-hover:text-midnight"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </a>
  );
}
