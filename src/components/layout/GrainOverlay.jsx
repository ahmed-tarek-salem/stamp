/**
 * Cinematic film-grain overlay — fixed full-screen, blend-mode'd over everything.
 *
 * Technique: SVG fractalNoise rendered to a data URL, used as a tiled background.
 * The wrapper is oversized (150%) and shifted so transforms never reveal edges.
 * Screen blend mode is the only one that makes grain visible on near-pure-black.
 *
 * - Pointer-events disabled (clicks pass through)
 * - Honors prefers-reduced-motion via CSS in index.css
 * - All inline styles to avoid Tailwind arbitrary-value compilation flakes
 */

const NOISE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#grain)"/></svg>`;

// encodeURIComponent is the most reliable way to embed SVG in a data URL.
const NOISE_URL = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(NOISE_SVG)}`;

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay pointer-events-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "150vw",
        height: "150vh",
        marginLeft: "-25vw",
        marginTop: "-25vh",
        zIndex: 9998,
        opacity: 0.11,
        mixBlendMode: "screen",
        backgroundImage: `url("${NOISE_URL}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}
