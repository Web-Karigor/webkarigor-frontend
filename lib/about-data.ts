export const ABOUT_HERO_IMAGES = [
  "/s1.png",
  "/s2.png",
  "/sm1.png",
  "/s3.png",
  "/s4.png",
  "/sm2.jpg",
  "/sm3.jpg",
] as const;

export const ABOUT_IMPACT = {
  intro:
    "Every product we build is guided by clear goals and measurable results. Through thoughtful design, reliable technology and strategic execution, we turn ideas into success stories that speak for themselves.",
  stats: [
    {
      value: "8+",
      label: "Years",
      description:
        "Of experience building products businesses trust to grow with, supported by thoughtful design and dependable technology.",
    },
    {
      value: "100+",
      label: "Projects",
      description:
        "Successfully delivered across diverse industries, combining thoughtful execution with a strong focus on real business outcomes.",
    },
  ],
  mainImage: "/services/why-choose-main.jpg",
  gallery: ["/sm1.png", "/sm2.jpg", "/sm3.jpg", "/sm4.png"] as const,
} as const;

export const ABOUT_VISION = {
  title: "Our Vision",
  lead: "is to turn ideas into scalable, future-ready products that drive real business growth.",
  body: "We partner with teams who value quality, usability, and long-term success, helping businesses navigate change with confidence.",
  images: {
    large: "/services/why-choose-main.jpg",
    top: "/sm2.jpg",
    bottomLeft: "/sm3.jpg",
    bottomRight: "/sm4.png",
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
