export const ABOUT_HERO_IMAGES = [
  "/s1.png",
  "/s2.png",
  "/sm1.png",
  "/s3.png",
  "/s4.png",
] as const;

export const ABOUT_IMPACT = {
  intro:
    "We are a digital product studio helping businesses turn ambitious ideas into scalable products people love to use.",
  stats: [
    { value: "8+", label: "Years", sublabel: "Industry Experience" },
    { value: "100+", label: "Projects", sublabel: "Successfully Delivered" },
  ],
  mainImage: "/services/why-choose-main.jpg",
  gallery: ["/sm2.jpg", "/sm3.jpg", "/sm4.png"] as const,
} as const;

export const ABOUT_VISION = {
  title: "Our Vision",
  body: "We envision a world where every business — regardless of size — can access world-class digital products that drive growth, delight users, and create lasting impact.",
  images: {
    large: "/services/why-choose-collage.png",
    top: "/h1.png",
    bottomLeft: "/s2.png",
    bottomRight: "/s3.png",
  },
} as const;

export const ABOUT_CAPABILITIES = [
  "Scalable Design",
  "Product Thinking",
  "Clean Code",
  "Scalable Design",
  "Strategic Insight",
  "Reliable Support",
  "Technical Expertise",
] as const;

export const ABOUT_TEAM_IMAGES = [
  "/sm1.png",
  "/sm2.jpg",
  "/sm3.jpg",
  "/sm4.png",
  "/s1.png",
  "/s2.png",
  "/s3.png",
  "/s4.png",
] as const;

export const ABOUT_WHY_CHOOSE = [
  {
    title: "Long Term Support",
    description:
      "We stay with you after launch — maintenance, iteration, and growth so your product keeps improving.",
    icon: "support" as const,
  },
  {
    title: "Modern Technology",
    description:
      "We build with modern stacks and proven patterns so your product stays fast, secure, and future-ready.",
    icon: "tech" as const,
  },
  {
    title: "Custom Plans",
    description:
      "Every engagement is tailored to your goals, timeline, and budget — no one-size-fits-all packages.",
    icon: "plans" as const,
  },
  {
    title: "High-Performance Products",
    description:
      "We obsess over speed, usability, and reliability so users stay engaged and your business scales.",
    icon: "performance" as const,
  },
] as const;
