import { smoothScrollTo } from "../../utils/smoothScroll";

export default function Button({ children, href, variant = "primary", className = "", onClick, ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-body font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime";

  const variants = {
    primary: "bg-lime text-midnight hover:bg-lime/90",
    outline: "border border-lime text-lime hover:bg-lime hover:text-midnight",
    ghost: "text-lime hover:text-lime/80",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    // If it's an in-page anchor, intercept with smooth scroll
    const isAnchor = typeof href === "string" && href.startsWith("#");
    const handleClick = (e) => {
      if (isAnchor) {
        e.preventDefault();
        smoothScrollTo(href, e.currentTarget);
      }
      if (typeof onClick === "function") onClick(e);
    };
    return (
      <a href={href} onClick={handleClick} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
