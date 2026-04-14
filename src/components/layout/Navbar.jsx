import { useEffect, useRef, useState } from "react";
import { gsap } from "../../hooks/useGsap";
import { NAV_LINKS } from "../../constants/content";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

export default function Navbar() {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current.querySelectorAll("a, button"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power3.out", delay: 0.15 }
      );
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 transition-all duration-500 md:px-12 ${
          scrolled
            ? "bg-midnight/80 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <a
          href="#"
          className="font-display text-2xl font-bold text-white"
          data-cursor-label="Home"
        >
          Stamp<span className="text-lime">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-gray transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" variant="primary">
            Let's Talk
          </Button>
        </div>

        <button
          className="flex items-center justify-center md:hidden text-white"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-midnight"
        >
          <button
            className="absolute top-4 right-6 text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-3xl text-white transition-colors hover:text-lime"
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" onClick={() => setMenuOpen(false)}>
            Let's Talk
          </Button>
        </div>
      )}
    </>
  );
}
