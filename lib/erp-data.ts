export const ERP_TRUSTED_LOGOS = [
  { name: "Slack", src: "https://cdn.simpleicons.org/slack/667085" },
  { name: "Netflix", src: "https://cdn.simpleicons.org/netflix/667085" },
  { name: "Fitbit", src: "https://cdn.simpleicons.org/fitbit/667085" },
  { name: "Google", src: "https://cdn.simpleicons.org/google/667085" },
  { name: "Airbnb", src: "https://cdn.simpleicons.org/airbnb/667085" },
] as const;

export const ERP_HERO = {
  titleLine1: "Analyze data",
  titleLine2: "fast, with",
  titleBrand: "Analizar",
  description:
    "It is a software through which you can easily make the right decision by analyzing the data. Data analysis is important in business.",
  hotline: "01624-283328",
  trustTitle: "We've Worked with them, We Trust Each Other",
  trustDescription:
    "At “WEB KARIGOR”, we have had the privilege of working with a diverse range of clients across various industries.",
  dashboardImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  avatarImage:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
} as const;

export const ERP_FEATURES = [
  {
    title: "User-Centered Design",
    description:
      "We put your users at the core of our decisions, ensuring every interaction feels natural and intuitive.",
    color: "#12B76A",
    bg: "#E8F8F0",
    icon: "user",
  },
  {
    title: "Business-Focused",
    description:
      "Our designs are crafted to align with your key metrics, driving conversions and ROI.",
    color: "#F79009",
    bg: "#FEF4E6",
    icon: "briefcase",
  },
  {
    title: "Collaborative Process",
    description:
      "We act as an extension of your team, maintaining transparent communication throughout.",
    color: "#EE46BC",
    bg: "#FCE8F5",
    icon: "handshake",
  },
  {
    title: "Scalable Systems",
    description:
      "We deliver robust design systems that make future development faster and consistent.",
    color: "#2E90FA",
    bg: "#E8F3FE",
    icon: "chart",
  },
] as const;

/** Figma tech orbit — inner triangle + outer ring */
export const ERP_TECH_INNER = [
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    /** top center of soft disc */
    style: { top: "22%", left: "50%" },
  },
  {
    name: "Notion",
    icon: "https://cdn.simpleicons.org/notion/000000",
    style: { top: "62%", left: "28%" },
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    style: { top: "62%", left: "72%" },
  },
] as const;

export const ERP_TECH_OUTER = [
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    angle: -90,
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    angle: -30,
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    angle: 30,
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    angle: 90,
  },
  {
    name: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel/000000",
    angle: 150,
  },
  {
    name: "Tailwind",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
    angle: 210,
  },
] as const;

/** @deprecated — kept for any leftover imports */
export const ERP_INTEGRATIONS = [
  ...ERP_TECH_INNER.map(({ name, icon }) => ({ name, icon })),
  ...ERP_TECH_OUTER.map(({ name, icon }) => ({ name, icon })),
] as const;

export const ERP_PORTFOLIO_ITEMS = [
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

export const ERP_TESTIMONIALS = [
  {
    quote:
      "With Ehya, we're able to easily track our performance in full detail. It's become an essential tool for us to grow and engage with our audience.",
    name: "Jaquon Hart",
    role: "Digital Marketing Executive, Hypebeast",
    rating: 5,
  },
  {
    quote:
      "With Ehya, we're able to easily track our performance in full detail. It's become an essential tool for us to grow and engage with our audience.",
    name: "Rickie Baroch",
    role: "Product Manager of Salestation Asia",
    rating: 4,
  },
  {
    quote:
      "With Ehya, we're able to easily track our performance in full detail. It's become an essential tool for us to grow and engage with our audience.",
    name: "Harinder Bharwal",
    role: "Digital Marketing Executive, Hypebeast",
    rating: 4,
  },
  {
    quote:
      "With Ehya, we're able to easily track our performance in full detail. It's become an essential tool for us to grow and engage with our audience.",
    name: "Floyd Miles",
    role: "CEO, Shishu Poribohan",
    rating: 5,
  },
] as const;

export const ERP_PRICING_PLANS = [
  {
    name: "Basic",
    price: "$29",
    period: "/mo",
    recommended: false,
    priceColor: "dark" as const,
    description: "Essential ERP modules for small teams getting started.",
    features: [
      "Core dashboard access",
      "Up to 5 user seats",
      "Basic reporting",
      "Email support",
      "Standard integrations",
    ],
  },
  {
    name: "Standard",
    price: "$99",
    period: "/mo",
    recommended: true,
    priceColor: "green" as const,
    description: "Full-featured ERP for growing businesses with multiple departments.",
    features: [
      "All Basic features",
      "Unlimited project use",
      "Advanced analytics",
      "Multivariate components",
      "Priority phone support",
    ],
  },
  {
    name: "Pro",
    price: "$299",
    period: "/mo",
    recommended: false,
    priceColor: "blue" as const,
    description: "Enterprise-grade ERP with custom modules and dedicated support.",
    features: [
      "All Standard features",
      "Custom module development",
      "Dedicated account manager",
      "SLA-backed uptime",
      "On-site training",
    ],
  },
] as const;

export const ERP_FAQS = [
  {
    question: "What industries does your ERP solution support?",
    answer:
      "We build ERP systems for retail, manufacturing, healthcare, logistics, and service businesses — tailored to your workflows and compliance needs.",
  },
  {
    question: "How long does ERP implementation typically take?",
    answer:
      "Most mid-size deployments go live in 8–14 weeks after discovery. Complex multi-module rollouts may take longer with phased delivery.",
  },
  {
    question: "Can you integrate with our existing tools?",
    answer:
      "Yes. We connect accounting, CRM, inventory, HR, and payment systems via APIs and standard connectors.",
  },
  {
    question: "Do you offer training for our team?",
    answer:
      "Every plan includes onboarding documentation. Standard and Pro plans add live training sessions and role-based guides.",
  },
  {
    question: "Is data migration included?",
    answer:
      "We audit your current data, map fields, and migrate records with validation checks before go-live.",
  },
  {
    question: "What support do you provide after launch?",
    answer:
      "Ongoing maintenance, feature updates, and priority support based on your plan — with optional dedicated SLA tiers.",
  },
] as const;
