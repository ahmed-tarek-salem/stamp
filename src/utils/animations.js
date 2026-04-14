export const EASE = {
  reveal: "power3.out",
  playful: "elastic.out(1, 0.5)",
  smooth: "power2.inOut",
};

export const DURATIONS = {
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
};

export const fadeUp = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
};

export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1, duration: 0.8, ease: "power3.out" },
};

export const slideFromLeft = {
  from: { opacity: 0, x: -60 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
};

export const slideFromRight = {
  from: { opacity: 0, x: 60 },
  to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
};

export const defaultScrollTrigger = (trigger) => ({
  trigger,
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none none",
});
