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
