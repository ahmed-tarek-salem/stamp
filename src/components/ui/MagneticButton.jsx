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
