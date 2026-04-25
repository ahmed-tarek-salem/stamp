import { gsap } from "../hooks/useGsap";

/**
 * Smoothly scroll to an in-page anchor using Lenis (with native fallback).
 * Adds a brief lime "pulse" flash on the triggering element for tactile feedback.
 *
 * @param {string} href  Anchor like "#contact" or "#" for top.
 * @param {HTMLElement} [triggerEl]  Optional element to flash on click.
 * @param {object} [options]  Override Lenis scrollTo options.
 */
export function smoothScrollTo(href, triggerEl, options = {}) {
  if (!href || typeof href !== "string") return;

  // Resolve target
  const id = href.startsWith("#") ? href.slice(1) : href;
  const target = id ? document.getElementById(id) : 0;
  if (id && !target) return;

  // Visual feedback: lime pulse on the clicked element
  if (triggerEl) {
    gsap.fromTo(
      triggerEl,
      { color: "#84CC16" },
      {
        color: "",
        clearProps: "color",
        duration: 0.6,
        ease: "power2.out",
      }
    );
  }

  const lenis = typeof window !== "undefined" ? window.__lenis : null;

  if (lenis) {
    lenis.scrollTo(target || 0, {
      duration: 1.6,
      // Custom ease-out-expo for that elegant final-decel feel
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      offset: -20,
      ...options,
    });
  } else {
    // Fallback: native smooth scroll
    if (!target || target === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

/** React onClick handler factory: stops default + smooth-scrolls. */
export function makeSmoothNavHandler(href, onAfter) {
  return (e) => {
    e.preventDefault();
    smoothScrollTo(href, e.currentTarget);
    if (typeof onAfter === "function") onAfter();
  };
}
