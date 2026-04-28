export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

export const HERO = {
  headline: "Your brand is your story. Let's make it unforgettable.",
  slogan: "Don't just be existing, be identified.",
  scrollCta: "Scroll to explore",
};

export const SERVICES = [
  {
    icon: "Fingerprint",
    title: "Brand Identity Design",
    description:
      "We craft visual identities that make startups unforgettable. From logos to full brand systems, we build the foundation of how the world sees you.",
  },
  {
    icon: "Globe",
    title: "Website Design & Development",
    description:
      "Beautiful, high-performance sites that convert visitors into believers. Every pixel intentional, every interaction meaningful.",
  },
  {
    icon: "Smartphone",
    title: "Application Design & Development",
    description:
      "Apps that feel as good as they function. We design and build digital products that users love and businesses depend on.",
  },
  {
    icon: "Sparkles",
    title: "Content & Campaigns",
    description:
      "Videos, images, and stories crafted to move people. Brand-perfect content that ships at the speed your launches demand.",
  },
];

// TODO(demo): Replace WORK.projects with real client case studies before launch.
// Currently uses real third-party indie startups as visual placeholders with
// live screenshots via microlink.io. All copy/metrics are fictional.
export const WORK = {
  headline: "Selected Work",
  subhead: "Identities, products, and stories we've helped shape.",
  projects: [
    {
      id: "barrys",
      name: "Barry's",
      url: "https://barrys.com",
      category: "Fitness · Brand",
      year: "2025",
      challenge:
        "A boutique fitness studio ready to stand apart in a crowded market of lookalike gyms.",
      solution:
        "A bold red-and-black identity that felt like the workout itself — high-intensity typography, cinematic photography, a voice that sweats.",
      metric: { value: "+180%", label: "Class bookings in 90 days" },
      palette: ["#E11D2E", "#0B0B0B", "#F5F0E8"],
      image:
        "https://api.microlink.io/?url=https%3A%2F%2Fbarrys.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800",
      size: "tall",
    },
    {
      id: "atomix",
      name: "Atomix",
      url: "https://atomixnyc.com",
      category: "Restaurant · Identity",
      year: "2025",
      challenge:
        "A Michelin-starred restaurant with an exceptional tasting menu and a digital presence that didn't match.",
      solution:
        "A minimalist, quietly confident identity — serif typography, dark theatrical photography, and a reservation flow that feels like ritual.",
      metric: { value: "3×", label: "Reservation conversion" },
      palette: ["#1A1A1A", "#D4A574", "#F5F0E8"],
      image:
        "https://api.microlink.io/?url=https%3A%2F%2Fatomixnyc.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=800",
      size: "wide",
    },
    {
      id: "tonehouse",
      name: "Tone House",
      url: "https://tonehouse.com",
      category: "Fitness · Brand",
      year: "2024",
      challenge:
        "A boutique athletic performance studio fighting for attention against national chains.",
      solution:
        "An editorial, almost brutalist identity built around pure motion — black-and-white photography, oversized type, no apologies.",
      metric: { value: "+65%", label: "Membership retention" },
      palette: ["#0A0A0A", "#FFFFFF", "#DC2626"],
      image:
        "https://api.microlink.io/?url=https%3A%2F%2Ftonehouse.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800",
      size: "tall",
    },
    {
      id: "momofuku",
      name: "Momofuku",
      url: "https://momofuku.com",
      category: "Restaurant · Brand",
      year: "2025",
      challenge:
        "A legendary restaurant group growing beyond its cult following — needed a brand that could scale without losing soul.",
      solution:
        "A confident typographic system, warm peach accents, and an editorial voice that treats menus like stories.",
      metric: { value: "+42%", label: "Direct reservation revenue" },
      palette: ["#F4A261", "#1A0F0A", "#F5E6D3"],
      image:
        "https://api.microlink.io/?url=https%3A%2F%2Fmomofuku.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1400&viewport.height=800",
      size: "wide",
    },
    {
      id: "celsious",
      name: "Celsious",
      url: "https://celsious.com",
      category: "Laundry · Identity",
      year: "2024",
      challenge:
        "A sustainable Brooklyn laundromat trying to prove laundry can be cool — and good for the planet.",
      solution:
        "A playful, confident identity — soft gradients, warm typography, and copy that made eco-friendly feel aspirational, not preachy.",
      metric: { value: "+90%", label: "Weekly returning customers" },
      palette: ["#2D4A7C", "#F5C95B", "#FFF5E8"],
      image:
        "https://api.microlink.io/?url=https%3A%2F%2Fcelsious.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800",
      size: "regular",
      variant: "block", // brand-block card — color story instead of screenshot
    },
    {
      id: "blanc",
      name: "Blanc Living",
      url: "https://blancliving.com",
      category: "Laundry · Web",
      year: "2024",
      challenge:
        "An eco dry-cleaning service competing with corporate chains offering half the price and zero soul.",
      solution:
        "A luxurious, editorial identity that made dry cleaning feel like a ritual — muted palette, considered typography, quiet craft.",
      metric: { value: "+220%", label: "Subscription revenue" },
      palette: ["#1C1C1C", "#F5F0E8", "#8B7355"],
      image:
        "https://api.microlink.io/?url=https%3A%2F%2Fblancliving.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800",
      size: "regular",
    },
  ],
};

export const ABOUT = {
  headline: "Why Stamp?",
  description:
    "Every startup has a story worth telling. We exist to make sure the world hears it. Stamp transforms early-stage companies into brands that demand attention — through identity, design, and technology that speaks louder than words.",
  stats: [
    { value: 50, suffix: "+", label: "Projects Delivered" },
    { value: 30, suffix: "+", label: "Startups Branded" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ],
};

export const PROCESS = [
  {
    icon: "Search",
    title: "Discover",
    description: "We dive deep into your vision, audience, and market to uncover what makes you unique.",
  },
  {
    icon: "Palette",
    title: "Design",
    description: "We shape your brand identity and digital presence with purpose and precision.",
  },
  {
    icon: "Code",
    title: "Develop",
    description: "We bring designs to life with clean, performant code that scales with your ambition.",
  },
  {
    icon: "Rocket",
    title: "Deliver",
    description: "We launch your brand into the world — polished, tested, and ready to make an impact.",
  },
];

export const CONTACT = {
  headline: "Ready to be identified?",
  description: "Tell us about your startup. Let's build something unforgettable together.",
};

export const FOOTER = {
  copyright: `© ${new Date().getFullYear()} Stamp. All rights reserved.`,
  socials: [
    { icon: "Twitter", href: "https://twitter.com", label: "Twitter" },
    { icon: "Linkedin", href: "https://linkedin.com", label: "LinkedIn" },
    { icon: "Instagram", href: "https://instagram.com", label: "Instagram" },
  ],
};
