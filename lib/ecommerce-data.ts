export const ECO_TRUSTED_LOGOS = [
  { name: "Slack", src: "https://cdn.simpleicons.org/slack/667085" },
  { name: "Dropbox", src: "https://cdn.simpleicons.org/dropbox/667085" },
  { name: "Spotify", src: "https://cdn.simpleicons.org/spotify/667085" },
  { name: "Shopify", src: "https://cdn.simpleicons.org/shopify/667085" },
  { name: "Stripe", src: "https://cdn.simpleicons.org/stripe/667085" },
] as const;

export const ECO_FEATURES = [
  {
    title: "User-Centered Design",
    description:
      "We put your users at the core of our decisions, ensuring every interaction feels natural and intuitive.",
    color: "#12B76A",
    icon: "user",
  },
  {
    title: "Business-Focused",
    description:
      "Our designs are crafted to align with your key metrics, driving conversions and ROI.",
    color: "#F79009",
    icon: "briefcase",
  },
  {
    title: "Collaborative Process",
    description:
      "We act as an extension of your team, maintaining transparent communication throughout.",
    color: "#EE46BC",
    icon: "handshake",
  },
  {
    title: "Scalable Systems",
    description:
      "We deliver robust design systems that make future development faster and consistent.",
    color: "#2E90FA",
    icon: "chart",
  },
] as const;

export const ECO_TECH_STACK = [
  {
    name: "Laravel",
    icon: "https://cdn.simpleicons.org/laravel/FF2D20",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Vercel",
    icon: "https://cdn.simpleicons.org/vercel/000000",
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Kotlin",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Github",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Notion",
    icon: "https://cdn.simpleicons.org/notion/000000",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
] as const;

/** Figma staggered rows: 5 / 4 / 3 */
export const ECO_TECH_ROWS = [
  ECO_TECH_STACK.slice(0, 5),
  ECO_TECH_STACK.slice(5, 9),
  ECO_TECH_STACK.slice(9, 12),
] as const;

export const ECO_PORTFOLIO_TABS = [
  "Web Design",
  "Mobile App",
  "Figma",
  "Framer",
  "Webflow",
  "Wordpress",
] as const;

export const ECO_PORTFOLIO_ITEMS = [
  {
    id: "food",
    tab: "Web Design",
    badge: "Web Design",
    title: "Food Delivery Storefront",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "saas",
    tab: "Web Design",
    badge: "SaaS",
    title: "Business Analytics Landing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "fashion",
    tab: "Web Design",
    badge: "Fashion",
    title: "Fashion Ecommerce",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "service",
    tab: "Web Design",
    badge: "Service",
    title: "Professional Services Site",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mobile",
    tab: "Mobile App",
    badge: "Mobile App",
    title: "Shop Mobile Experience",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "figma",
    tab: "Figma",
    badge: "Figma",
    title: "Design System Kit",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "framer",
    tab: "Framer",
    badge: "Framer",
    title: "Interactive Prototype",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "webflow",
    tab: "Webflow",
    badge: "Webflow",
    title: "Marketing Site",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "wordpress",
    tab: "Wordpress",
    badge: "Wordpress",
    title: "Content Commerce",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

export const ECO_REVIEW_AVATARS = [
  "/sm1.png",
  "/sm2.jpg",
  "/sm3.jpg",
  "/sm4.png",
] as const;

export const ECO_TESTIMONIALS = [
  {
    quote:
      "The travel advice and destination guides provided here are invaluable. I feel more confident and prepared for my trips.",
    name: "Floyd Miles",
    role: "CEO, Shishu Poribohan",
    rating: 4,
  },
  {
    quote:
      "They rebuilt our checkout and product discovery. Conversion climbed within the first sprint — clear process, sharp design.",
    name: "Dianne Russel",
    role: "CEO, Marketly",
    rating: 5,
  },
  {
    quote:
      "From catalog architecture to mobile UX, the team shipped an ecommerce experience our customers actually enjoy using.",
    name: "Cameron Williamson",
    role: "Founder, NestCart",
    rating: 5,
  },
  {
    quote:
      "Transparent milestones and thoughtful UX decisions. Our brand finally feels premium online without slowing down.",
    name: "Ayesha Rahman",
    role: "CMO, Bloom Retail",
    rating: 4,
  },
  {
    quote:
      "Outstanding work on our storefront. Sales jumped within months of launch — highly recommend their ecommerce team.",
    name: "James Rodriguez",
    role: "Founder, ShopEasy",
    rating: 5,
  },
] as const;

export const ECO_TEAM_PHOTOS = [
  { src: "/sm1.png", className: "eco-team-photo eco-team-photo--1" },
  { src: "/sm2.jpg", className: "eco-team-photo eco-team-photo--2" },
  { src: "/sm3.jpg", className: "eco-team-photo eco-team-photo--3" },
  { src: "/sm4.png", className: "eco-team-photo eco-team-photo--4" },
  { src: "/h1.png", className: "eco-team-photo eco-team-photo--5" },
  { src: "/h2.png", className: "eco-team-photo eco-team-photo--6" },
  {
    src: "https://i.pravatar.cc/200?img=15",
    className: "eco-team-photo eco-team-photo--7",
  },
  {
    src: "https://i.pravatar.cc/200?img=28",
    className: "eco-team-photo eco-team-photo--8",
  },
] as const;

export const ECO_PRICING_PLANS = [
  {
    name: "Basic",
    price: "$39",
    period: "/month",
    description: "All the basics for businesses that are just getting started.",
    priceColor: "dark" as const,
    recommended: false,
    features: [
      "Single project use",
      "Basic dashboard",
      "All components included",
    ],
  },
  {
    name: "Standard",
    price: "$99",
    period: "/month",
    description: "Better for growing businesses that want more customers.",
    priceColor: "green" as const,
    recommended: true,
    features: [
      "Unlimited project use",
      "Advanced dashboard",
      "All components included",
      "Advanced insight",
    ],
  },
  {
    name: "Premium",
    price: "$339",
    period: "/month",
    description: "Advanced features for pros who need more customization.",
    priceColor: "blue" as const,
    recommended: false,
    features: [
      "Unlimited project use",
      "Advanced dashboard",
      "Multivariate components",
      "Phone Support",
    ],
  },
] as const;

export const ECO_FAQS = [
  {
    question: "Who do you work with and what ecommerce projects do you take on?",
    answer:
      "We partner with DTC brands, marketplaces, and retail teams launching or redesigning online stores — from MVP storefronts to multi-vendor platforms.",
  },
  {
    question: "How do you take a store from idea to launch?",
    answer:
      "Discovery, information architecture, UX/UI, development, QA, and launch support. You get demos every sprint with clear conversion goals.",
  },
  {
    question: "Which platforms and stacks do you support?",
    answer:
      "Custom Next.js/Node builds, headless commerce, Shopify, and hybrid setups. We recommend the stack that fits your catalog size and growth plan.",
  },
  {
    question: "How involved will we be during the project?",
    answer:
      "As involved as you want. Shared boards, weekly reviews, and async feedback keep decisions fast without blocking your team.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes — maintenance, CRO experiments, feature sprints, and performance monitoring so the store keeps improving after go-live.",
  },
  {
    question: "How do pricing and timelines work?",
    answer:
      "Packages start from the plans above; custom scopes get a fixed quote after a short discovery call. Typical MVP storefronts ship in 6–10 weeks.",
  },
] as const;

export const ECO_MARQUEE_ITEMS = [
  "Web Design",
  "React",
  "Mobile App",
  "E-commerce",
  "Branding",
] as const;

export const ECO_HERO = {
  titleLine1: "Result that matter",
  titleLine2: "expertise you can trust",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  hotline: "01624-283328",
  heroImage: "/ecommerce/hero-composite.png",
  phoneImage: "/ecommerce/hero-phone.png",
} as const;
