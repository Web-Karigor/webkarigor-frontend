export const MANPOWER_TRUSTED_LOGOS = [
  { name: "Confluent", src: "https://cdn.simpleicons.org/confluent/252526" },
  { name: "Seismic", src: "https://cdn.simpleicons.org/hubspot/FF7A59" },
  { name: "Datadog", src: "https://cdn.simpleicons.org/datadog/632CA6" },
  { name: "SurveyMonkey", src: "https://cdn.simpleicons.org/surveymonkey/00BF6F" },
  { name: "Salesforce", src: "https://cdn.simpleicons.org/salesforce/00A1E0" },
  { name: "Okta", src: "https://cdn.simpleicons.org/okta/007DC1" },
  { name: "Talkdesk", src: "https://cdn.simpleicons.org/intercom/6AFDEF" },
] as const;

export const MANPOWER_HERO = {
  title: "Delight your customers with happy elements",
  description:
    "Welcome to the support portal! Search your answers with the search box above, or if you're stuck you can create a support ticket.",
  countryCode: "+880",
  phonePlaceholder: "Enter your mobile number",
  ctaLabel: "Book A Meeting",
  hotline: "01624-283328",
  hotlineLabel: "Say hello",
  headerCta: "Get a Quote",
  trustTitle: "Trusted by over 100+ businesses worldwide.",
  heroImage: "/manpower/hero.png",
  heroLayout: {
    width: 869,
    height: 873,
    top: 0,
    left: 1070,
  },
  doodles: [
    {
      src: "/manpower/vector-16.png",
      width: 161.41,
      height: 286.6,
      top: 124,
      left: 1047,
      rotate: -29.01,
    },
    {
      src: "/manpower/vector-16.png",
      width: 161.41,
      height: 286.6,
      top: 84,
      left: 1677,
      rotate: -29.01,
    },
  ],
} as const;


export const MANPOWER_TECH_ORBIT = {
  title: "Technologies used in webkarigor",
  description:
    "We combine strategy, research, and design thinking to create products that not only look good but perform exceptionally well in the real world.",
  frame: { width: 967, height: 650 },
  rings: [
    { rx: 215, ry: 175, opacity: 0.1 },
    { rx: 275, ry: 225, opacity: 0.2 },
    { rx: 335, ry: 275, opacity: 0.4 },
  ],
  /** Bring left/right arc groups closer → smaller middle gap */
  leftCenter: { x: 375, y: 325 },
  rightCenter: { x: 592, y: 325 },
  icons: [
    // ——— LEFT ———
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", side: "left" as const, ring: 2, angle: -130, size: 56 },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", side: "left" as const, ring: 2, angle: -100, size: 54 },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", side: "left" as const, ring: 1, angle: 180, size: 68 },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", side: "left" as const, ring: 2, angle: 130, size: 52 },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", side: "left" as const, ring: 2, angle: 100, size: 56 },
    { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/000000", side: "left" as const, ring: 0, angle: 158, size: 50 },
    { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4", side: "left" as const, ring: 0, angle: 135, size: 50 },
    // ——— RIGHT (was missing after single-center refactor) ———
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", side: "right" as const, ring: 2, angle: -50, size: 54 },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", side: "right" as const, ring: 2, angle: 0, size: 78 },
    { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", side: "right" as const, ring: 2, angle: 50, size: 54 },
    { name: "Notion", icon: "https://cdn.simpleicons.org/notion/000000", side: "right" as const, ring: 1, angle: -65, size: 48 },
    {
      name: "AWS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
      side: "right" as const,
      ring: 0,
      angle: -12,
      size: 54,
    },
    { name: "Sketch", icon: "https://cdn.simpleicons.org/sketch/F7B500", side: "right" as const, ring: 0, angle: 72, size: 50 },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg", side: "right" as const, ring: 1, angle: 78, size: 52 },
  ],
} as const;

/** @deprecated — kept for any leftover imports */
export const MANPOWER_FEATURES_ORBIT = MANPOWER_TECH_ORBIT;

export const MANPOWER_WHY = {
  eyebrow: "Why Choose Us",
  title: "More than just a... manpower",
  description:
    "We combine talent networks, product craft, and delivery discipline so your operations scale without the usual friction.",
  imageMain:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
  imageOverlay:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
  items: [
    {
      title: "Verified Talent Pipeline",
      description:
        "Pre-vetted specialists across design, engineering, and operations — matched to your stack and culture.",
      color: "#12B76A",
      bg: "#E8F8F0",
      icon: "check" as const,
    },
    {
      title: "Process-Driven Delivery",
      description:
        "Clear rituals, transparent communication, and milestones that keep every engagement on track.",
      color: "#F79009",
      bg: "#FEF4E6",
      icon: "gear" as const,
    },
    {
      title: "Flexible Engagement Models",
      description:
        "Augment your team, staff full squads, or scale contractors up and down as demand shifts.",
      color: "#7A5AF8",
      bg: "#F4F0FE",
      icon: "dots" as const,
    },
    {
      title: "Secure & Compliant",
      description:
        "Contracts, NDAs, and access controls built in — so collaboration stays safe from day one.",
      color: "#2E90FA",
      bg: "#E8F3FE",
      icon: "cloud" as const,
    },
  ],
} as const;

export const MANPOWER_PORTFOLIO_ITEMS = [
  {
    id: "food",
    title: "Food Delivery Storefront",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "saas",
    title: "Business Analytics Platform",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fashion",
    title: "Fashion Ecommerce",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "corporate",
    title: "Corporate Landing",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dashboard",
    title: "Ops Dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mobile",
    title: "Product App UI",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const MANPOWER_TESTIMONIALS = [
  {
    quote:
      "Webkarigor helped us staff a full product squad in weeks. The talent quality and communication have been outstanding.",
    name: "Jenny Wilson",
    role: "Head of Product, Bright Labs",
    avatar: "/sm1.png",
    highlight: false,
  },
  {
    quote:
      "Finally a partner that understands both hiring speed and engineering depth. Our release cadence doubled.",
    name: "Robert Fox",
    role: "CTO, NovaPay",
    avatar: "/sm2.jpg",
    highlight: false,
  },
  {
    quote:
      "From designers to backend leads, every placement clicked with our culture. Highly recommend their manpower desk.",
    name: "Kathryn Murphy",
    role: "COO, Lumen Soft",
    avatar: "/sm3.jpg",
    highlight: false,
  },
  {
    quote:
      "Clear contracts, strong onboarding, and people who actually ship. We extended the engagement twice.",
    name: "Theresa Webb",
    role: "VP Engineering, Orbit HR",
    avatar: "/sm4.png",
    highlight: false,
  },
  {
    quote:
      "They filled critical roles without the usual agency noise. Transparent, fast, and reliable.",
    name: "Wade Warren",
    role: "Founder, Stackline",
    avatar: "/h2.png",
    highlight: false,
  },
  {
    quote:
      "With Webkarigor, we're able to easily scale our team in full detail. It's become an essential partner for growth.",
    name: "Jaquon Hart",
    role: "Digital Marketing Executive, Hypebeast",
    avatar: "/sm1.png",
    highlight: true,
  },
  {
    quote:
      "The designers they placed elevated our product UI overnight. Stakeholders noticed the difference immediately.",
    name: "Cody Fisher",
    role: "Design Lead, Peak Commerce",
    avatar: "/h1.png",
    highlight: false,
  },
  {
    quote:
      "Supportive account managers and talent that treats our roadmap like their own. Rare combination.",
    name: "Esther Howard",
    role: "People Ops, Northwind",
    avatar: "/sm3.jpg",
    highlight: false,
  },
] as const;

export const MANPOWER_PRICING_PLANS = [
  {
    name: "Basic",
    price: "$39",
    period: "/mo",
    recommended: false,
    priceColor: "dark" as const,
    description: "Best for startups needing flexible specialist support.",
    features: [
      "Up to 2 active roles",
      "Shared account manager",
      "Basic skill matching",
      "Email support",
      "Monthly reporting",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    recommended: true,
    priceColor: "green" as const,
    description: "Most popular for growing teams that need faster placement.",
    features: [
      "Up to 8 active roles",
      "Priority candidate shortlist",
      "Dedicated coordinator",
      "Weekly status calls",
      "Replacement guarantee",
    ],
  },
  {
    name: "Premium",
    price: "$339",
    period: "/mo",
    recommended: false,
    priceColor: "blue" as const,
    description: "Enterprise staffing with dedicated pods and SLAs.",
    features: [
      "Unlimited role openings",
      "Full squad staffing",
      "On-site / hybrid support",
      "Custom SLAs",
      "Quarterly strategy reviews",
    ],
  },
] as const;

export const MANPOWER_FAQS = [
  {
    question: "What kinds of roles can you staff?",
    answer:
      "We place product designers, engineers, QA, DevOps, project managers, marketers, and operations specialists — senior and mid-level.",
  },
  {
    question: "How fast can you start sourcing?",
    answer:
      "Most engagements see first shortlists within 5–10 business days after discovery and role definition.",
  },
  {
    question: "Are candidates full-time employees or contractors?",
    answer:
      "Both. We support full-time placements, contract-to-hire, and dedicated remote pods depending on your preference.",
  },
  {
    question: "Do you offer replacement guarantees?",
    answer:
      "Yes. Pro and Premium plans include a replacement window if a placement doesn’t fit within the agreed probation period.",
  },
  {
    question: "Can you build a full cross-functional team?",
    answer:
      "Absolutely. Premium clients often engage us for design + engineering + PM squads that operate as one unit.",
  },
  {
    question: "How do billing and contracts work?",
    answer:
      "Transparent monthly plans or per-seat models. Contracts cover NDAs, IP assignment, and clear termination terms.",
  },
] as const;
