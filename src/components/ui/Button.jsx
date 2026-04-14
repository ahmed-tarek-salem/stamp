export default function Button({ children, href, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-body font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime";

  const variants = {
    primary: "bg-lime text-midnight hover:bg-lime/90",
    outline: "border border-lime text-lime hover:bg-lime hover:text-midnight",
    ghost: "text-lime hover:text-lime/80",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
