import { X, Globe, Camera } from "lucide-react";
import { FOOTER, NAV_LINKS } from "../../constants/content";

const ICON_MAP = { X, Globe, Camera };

export default function Footer() {
  return (
    <footer className="border-t border-lime/10 bg-midnight px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row md:justify-between">
        <a href="#" className="font-display text-xl font-bold text-white">
          Stamp<span className="text-lime">.</span>
        </a>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-gray transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {FOOTER.socials.map((social) => {
            const Icon = ICON_MAP[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray transition-colors hover:text-lime"
                data-cursor-label={social.label}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>

      <p className="mt-8 text-center font-body text-xs text-gray/60">
        {FOOTER.copyright}
      </p>
    </footer>
  );
}
