import {
  Cloud,
  Home,
  Hospital,
  ShoppingCart,
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

export type ClientLogo = {
  name: string;
  src: string;
};

export const CLIENTS_DESCRIPTION =
  "At “WEB KARIGOR”, we have had the privilege of working with a diverse range of clients across various industries. Our commitment to delivering exceptional digital solutions has allowed us to build long-lasting relationships with both local and international businesses. Each project reflects our dedication to innovation, quality, and client satisfaction.";

export const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: "Government of Bangladesh",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/BD-Govt.png",
  },
  {
    name: "Robi Axiata",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Robi.png",
  },
  {
    name: "Walton",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Walton.png",
  },
  {
    name: "Sajeeb Group",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Sajeeb-Group.png",
  },
  {
    name: "Oitijjhya",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Oitijjhya.png",
  },
  {
    name: "Nitol-Niloy Group",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Nitol-Niloy.png",
  },
  {
    name: "Gear X",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Gear-X.png",
  },
  {
    name: "The Cafe Rio",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Cafe-Rio.png",
  },
  {
    name: "NIPORT",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Niport.webp",
  },
  {
    name: "Shyamoli Paribahan",
    src: "https://webkarigor.com/wp-content/uploads/2024/10/Shyamoli-Poribahan.png",
  },
];

export type ServiceOffering = {
  title: string;
  description: string;
  icon: LucideIcon;
  variant: "yellow" | "green";
};

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    title: "E-commerce",
    description:
      "Optimizing shopping experiences for higher conversions. We create seamless paths to purchase that delight customers and drive revenue.",
    icon: ShoppingCart,
    variant: "yellow",
  },
  {
    title: "SaaS & Software",
    description:
      "Intuitive dashboards that reduce churn and boost retention. We simplify complex workflows into elegant, user-friendly interfaces.",
    icon: Cloud,
    variant: "green",
  },
  {
    title: "Healthcare",
    description:
      "Accessible and secure patient portals and applications. We prioritize clarity and ease of use for critical health services.",
    icon: Hospital,
    variant: "yellow",
  },
  {
    title: "Real Estate",
    description:
      "Immersive property discovery and management tools. We build visual-first experiences that showcase properties at their best.",
    icon: Home,
    variant: "green",
  },
  {
    title: "Healthcare",
    description:
      "Accessible and secure patient portals and applications. We prioritize clarity and ease of use for critical health services.",
    icon: Hospital,
    variant: "yellow",
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
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/layers/layers-original.svg",
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Agile sprints, transparent milestones, and on-time launches you can plan your business around.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linechart/linechart-original.svg",
  },
  {
    title: "Scalable Technology",
    description:
      "Modern stacks and clean architecture so your product grows without costly rebuilds.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg",
  },
  {
    title: "Dedicated Partnership",
    description:
      "A single team from strategy to launch — responsive, collaborative, and invested in your success.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/globe/globe-original.svg",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    name: "Dianne Russel",
    role: "CEO, Shishu Poribohon",
    rating: 5,
  },
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
  {
    quote:
      "Thoughtful design and clear communication throughout the project. We saw better conversions within weeks of launch.",
    name: "Ayesha Rahman",
    role: "Founder, Bloom Studio",
    rating: 5,
  },
] as const;

export type PricingPlan = {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
};

export type PricingMarket = {
  label: string;
  theme: "yellow" | "green";
  plans: PricingPlan[];
};

const SHARED_FEATURES = [
  "User research and product discovery sessions",
  "End-to-end UX/UI design for the full product",
  "Design system for consistency and scale",
  "Web or mobile app development",
  "Usability testing and design iteration",
  "Performance and security best practices",
  "Post-launch support and proper handover",
] as const;

export const PRICING_MARKETS: PricingMarket[] = [
  {
    label: "Ecommerce",
    theme: "yellow",
    plans: [
      {
        title: "Build & Validate",
        price: "$5,000",
        subtitle: "Full Product Design with Research & Development",
        features: [...SHARED_FEATURES],
      },
      {
        title: "Build & Validate",
        price: "$5,000",
        subtitle: "Full Product Design with Research & Development",
        features: [...SHARED_FEATURES],
      },
    ],
  },
  {
    label: "Corporate",
    theme: "green",
    plans: [
      {
        title: "Build & Validate",
        price: "$5,000",
        subtitle: "Full Product Design with Research & Development",
        features: [...SHARED_FEATURES],
      },
      {
        title: "Build & Validate",
        price: "$5,000",
        subtitle: "Full Product Design with Research & Development",
        features: [...SHARED_FEATURES],
      },
    ],
  },
];

export const SERVICE_FAQS = [
  {
    question: "Who do you work with and what projects do you take on?",
    answer:
      "We partner with startups, established companies, and agencies of all sizes. Our team takes on digital product design and development projects that are mission-driven and innovative.",
  },
  {
    question: "How do you take a product from idea to launch?",
    answer:
      "We start with understanding your vision, users, and markets. We ideate, wireframe, prototype, design, and develop iteratively, collaborating closely with you through each phase and ensuring each milestone is met before launch.",
  },
  {
    question: "How do you approach UX, design, and technology decisions?",
    answer:
      "All decisions are driven by your business goals, user needs, and best-in-class modern technology. We combine research-driven UX, elegant UI, and practical engineering for scalable solutions.",
  },
  {
    question: "How involved will we be during the project?",
    answer:
      "You stay as involved as you want throughout the project. We encourage your feedback in each phase, use frequent check-ins, and provide clear, collaborative communication. You're never left in the dark.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes! We offer continuous maintenance, support, and opportunities for evolution and improvement after your product launches. We're your partner for the long run.",
  },
  {
    question: "How do pricing and timelines work?",
    answer:
      "We offer flexible pricing models (fixed, retainer, or hourly) depending on project needs. Timelines are validated during our initial call and adjusted collaboratively. Transparency is key.",
  },
] as const;
