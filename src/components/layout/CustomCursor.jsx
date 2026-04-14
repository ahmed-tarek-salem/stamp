import { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const isTouch = useMediaQuery("(pointer: coarse)");

  useEffect(() => {
    if (isTouch) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;

    // Set initial centering transform
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // quickTo creates reusable tweens that update targets without recreating
    const xTo = gsap.quickTo(cursor, "left", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "top", { duration: 0.15, ease: "power2.out" });

    function onMouseMove(e) {
      xTo(e.clientX);
      yTo(e.clientY);
    }

    function onMouseEnterHoverable(e) {
      const cursorLabel = e.currentTarget.dataset.cursorLabel;
      gsap.to(cursor, {
        width: 64,
        height: 64,
        duration: 0.3,
        ease: "power3.out",
      });
      if (cursorLabel) {
        label.textContent = cursorLabel;
        gsap.to(label, { opacity: 1, duration: 0.2 });
      }
    }

    function onMouseLeaveHoverable() {
      gsap.to(cursor, {
        width: 12,
        height: 12,
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(label, { opacity: 0, duration: 0.2 });
    }

    window.addEventListener("mousemove", onMouseMove);

    const hoverables = document.querySelectorAll(
      "a, button, [data-cursor-hover]",
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterHoverable);
      el.addEventListener("mouseleave", onMouseLeaveHoverable);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHoverable);
        el.removeEventListener("mouseleave", onMouseLeaveHoverable);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full bg-lime mix-blend-difference"
      style={{
        width: 12,
        height: 12,
      }}
    >
      <span
        ref={labelRef}
        className="text-midnight text-xs font-body font-semibold opacity-0 select-none"
      />
    </div>
  );
}
