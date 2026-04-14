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
