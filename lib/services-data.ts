import {
  Code2,
  Globe,
  Layers,
  LineChart,
  Megaphone,
  Palette,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export const MARQUEE_ITEMS = [
  "Web Design",
  "SEO",
  "Marketing",
  "Branding",
  "Mobile App",
  "UI/UX",
  "Development",
  "Consulting",
] as const;

export const CLIENT_LOGOS = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Spotify",
  "Adobe",
  "Slack",
  "Uber",
] as const;

export type ServiceOffering = {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "yellow" | "green";
};

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    title: "Web Design",
    description:
      "Beautiful, conversion-focused websites tailored to your brand and business goals.",
    icon: Globe,
    variant: "yellow",
  },
  {
    title: "SEO Services",
    description:
      "Rank higher, attract qualified traffic, and turn search visibility into revenue.",
    icon: Search,
    variant: "green",
  },
  {
    title: "Digital Marketing",
    description:
      "Campaigns that reach the right audience with measurable growth outcomes.",
    icon: Megaphone,
    variant: "yellow",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform apps built for performance, scale, and retention.",
    icon: Smartphone,
    variant: "green",
  },
  {
    title: "Branding",
    description:
      "Identity systems that make your business memorable and investor-ready.",
    icon: Palette,
    variant: "yellow",
  },
  {
    title: "Development",
    description:
      "Robust engineering for web products that ship fast and scale confidently.",
    icon: Code2,
    variant: "green",
  },
];

export const TECH_STACK = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-line.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" },
  { name: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
  { name: "Framer", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
] as const;

export const WHY_CHOOSE_FEATURES = [
  {
    title: "User-Centered Design",
    description:
      "Every decision starts with your users — clear flows, intuitive interfaces, and delightful experiences.",
    icon: Layers,
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Agile sprints, transparent milestones, and on-time launches you can plan your business around.",
    icon: LineChart,
  },
  {
    title: "Scalable Technology",
    description:
      "Modern stacks and clean architecture so your product grows without costly rebuilds.",
    icon: Code2,
  },
  {
    title: "Dedicated Partnership",
    description:
      "A single team from strategy to launch — responsive, collaborative, and invested in your success.",
    icon: Globe,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Webkarigor transformed our brand and digital presence. The team delivered beyond expectations — professional, creative, and always on time.",
    name: "Sarah Mitchell",
    role: "CEO, TechStart Inc.",
    rating: 5,
  },
  {
    quote:
      "Outstanding work on our e-commerce platform. Sales increased 40% within three months of launch. Highly recommend their services.",
    name: "James Rodriguez",
    role: "Founder, ShopEasy",
    rating: 5,
  },
] as const;

export type PricingPlan = {
  title: string;
  price: string;
  features: string[];
};

export type PricingMarket = {
  label: string;
  theme: "yellow" | "green";
  plans: PricingPlan[];
};

export const PRICING_MARKETS: PricingMarket[] = [
  {
    label: "Local Market",
    theme: "yellow",
    plans: [
      {
        title: "Starter Website",
        price: "$1,500",
        features: [
          "Up to 5 custom pages",
          "Mobile-responsive design",
          "Basic SEO setup",
          "Contact form integration",
          "2 rounds of revisions",
          "30-day support",
        ],
      },
      {
        title: "Business Website",
        price: "$3,500",
        features: [
          "Up to 12 custom pages",
          "CMS integration",
          "Advanced SEO optimization",
          "Analytics setup",
          "Blog functionality",
          "90-day support",
        ],
      },
    ],
  },
  {
    label: "Global Market",
    theme: "green",
    plans: [
      {
        title: "MVP Application",
        price: "$5,000",
        features: [
          "UX/UI design for core flows",
          "Web or mobile development",
          "User authentication",
          "Admin dashboard",
          "Deployment & handover",
          "60-day support",
        ],
      },
      {
        title: "Full Product",
        price: "$12,000",
        features: [
          "End-to-end product design",
          "Full-stack development",
          "Third-party integrations",
          "Performance optimization",
          "Dedicated project manager",
          "6-month support",
        ],
      },
    ],
  },
];

export const SERVICE_FAQS = [
  {
    question: "What services does Webkarigor offer?",
    answer:
      "We offer web design, SEO, digital marketing, mobile app development, branding, and full-stack product development — tailored to startups and growing businesses.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary by scope. A starter website takes 2–4 weeks; a full product build typically runs 8–16 weeks. We provide a clear roadmap after the discovery call.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We serve clients globally with flexible communication across time zones and transparent project management throughout every engagement.",
  },
  {
    question: "What's included in your pricing packages?",
    answer:
      "Each package lists deliverables upfront — design files, source code, deployment, and a defined support period. Custom scopes are quoted separately.",
  },
  {
    question: "Can I upgrade my package later?",
    answer:
      "Absolutely. Many clients start with an MVP or starter site and expand as their business grows. We design every project to scale.",
  },
] as const;
