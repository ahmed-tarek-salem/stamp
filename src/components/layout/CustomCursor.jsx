import { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";

/**
 * Dual-cursor system inspired by osama-daimallah.com / web-portfolio.
 * - Inner dot: small filled lime circle, follows mouse fast (snappy, ~100ms).
 * - Outer ring: larger transparent ring with lime border, trails behind (~300ms).
 * On hover over interactive elements, the outer ring expands.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const isTouch = useMediaQuery("(pointer: coarse)");

  useEffect(() => {
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Center both around the cursor point
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    // Fast tween for inner dot (snappy follow ~100ms)
    const dotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    // Slower tween for outer ring (trailing follow ~600ms)
    const ringX = gsap.quickTo(ring, "x", { duration: 0.6, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.6, ease: "power3.out" });

    function onMouseMove(e) {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    }

    function onMouseEnterHoverable() {
      gsap.to(ring, {
        width: 80,
        height: 80,
        borderColor: "rgba(132, 204, 22, 0.7)",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(dot, {
        scale: 0,
        duration: 0.25,
        ease: "power3.out",
      });
    }

    function onMouseLeaveHoverable() {
      gsap.to(ring, {
        width: 48,
        height: 48,
        borderColor: "rgba(132, 204, 22, 0.9)",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(dot, {
        scale: 1,
        duration: 0.25,
        ease: "power3.out",
      });
    }

    function onMouseDown() {
      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: "power2.out" });
    }
    function onMouseUp() {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "power2.out" });
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const hoverables = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterHoverable);
      el.addEventListener("mouseleave", onMouseLeaveHoverable);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterHoverable);
        el.removeEventListener("mouseleave", onMouseLeaveHoverable);
      });
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-lime/90"
        style={{ width: 48, height: 48 }}
        aria-hidden="true"
      />
      {/* Inner fast-following dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-lime"
        style={{ width: 6, height: 6 }}
        aria-hidden="true"
      />
    </>
  );
}
