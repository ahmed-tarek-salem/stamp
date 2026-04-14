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
