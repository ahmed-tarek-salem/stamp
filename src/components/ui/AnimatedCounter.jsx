import { useRef, useState } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { defaultScrollTrigger } from "../../utils/animations";

export default function AnimatedCounter({ value, suffix = "", label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useGsap(() => {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        ...defaultScrollTrigger(ref.current),
        once: true,
      },
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });
  });

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-5xl lg:text-6xl text-lime">
        {display}
        {suffix}
      </span>
      <p className="mt-2 text-sm text-gray font-body">{label}</p>
    </div>
  );
}
