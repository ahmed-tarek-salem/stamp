import { useRef } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { SERVICES } from "../../constants/content";
import { Fingerprint, Globe, Smartphone, Sparkles } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

const ICON_MAP = {
  Fingerprint,
  Globe,
  Smartphone,
  Sparkles,
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
