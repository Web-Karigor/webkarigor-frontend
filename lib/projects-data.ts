export type ProjectItem = {
  id: string;
  title: string;
  src: string;
  alt: string;
  /** Figma desktop width (px) */
  w: number;
  /** Figma desktop height (px) */
  h: number;
  variant?: "image" | "brand-v" | "ventures";
};

export const PROJECTS_INTRO = {
  title: "Projects",
  body: "Explore our portfolio of creative work, where strategy, design, and development come together to support businesses across diverse industries and markets.",
} as const;

/** Figma Projects content column */
export const PROJECTS_CONTENT_W = 1300;
export const PROJECTS_GAP = 20;
export const PROJECTS_RADIUS = 32;

/** Side watermarks — 4 labels as marked in Figma */
export const PROJECTS_WATERMARK = {
  fontSize: 248,
  color: "#E8E4DC",
  width: 281,
  items: [
    {
      id: "tl-projects",
      text: "PROJECTS",
      side: "left" as const,
      top: "0%",
      h: 1424,
    },
    {
      id: "bl-webkarigor",
      text: "WEBKARIGOR",
      side: "left" as const,
      bottom: "6%",
      h: 1943,
    },
    {
      id: "tr-webkarigor",
      text: "WEBKARIGOR",
      side: "right" as const,
      top: "6%",
      h: 1943,
    },
    {
      id: "br-projects",
      text: "PROJECTS",
      side: "right" as const,
      bottom: "0%",
      h: 1424,
    },
  ],
} as const;

/**
 * Desktop sizes from Figma (Projects frame).
 * p1 confirmed: Rectangle 110 = 1300 × 600, radius 32.
 * Half-column = (1300 - 20) / 2 = 640.
 */
export const PROJECT_ITEMS: ProjectItem[] = [
  {
    id: "p1",
    title: "Simple is More",
    src: "/services/why-choose-main.jpg",
    alt: "Simple is More website project",
    w: 1300,
    h: 600,
  },
  {
    id: "p2",
    title: "Mobile App Suite",
    src: "/sm2.jpg",
    alt: "Colorful mobile app interface collection",
    w: 640,
    h: 720,
  },
  {
    id: "p3",
    title: "Desktop Dashboard",
    src: "/sm3.jpg",
    alt: "Desktop monitor with clean website UI",
    w: 640,
    h: 720,
  },
  {
    id: "p4",
    title: "Travel App",
    src: "/ecommerce/hero-composite.png",
    alt: "Travel mobile app mockups",
    w: 640,
    h: 680,
  },
  {
    id: "p5",
    title: "Lifestyle Commerce",
    src: "/h1.png",
    alt: "Lifestyle e-commerce website design",
    w: 640,
    h: 680,
  },
  {
    id: "p6",
    title: "Fashion Mobile",
    src: "/sm1.png",
    alt: "Fashion mobile app screen",
    w: 640,
    h: 760,
  },
  {
    id: "p7",
    title: "Retail Screens",
    src: "/sm4.png",
    alt: "Retail mobile app screens",
    w: 640,
    h: 760,
  },
  {
    id: "p8",
    title: "Ventures 3D",
    src: "/s1.png",
    alt: "Abstract 3D ventures brand visual",
    w: 640,
    h: 980,
    variant: "ventures",
  },
  {
    id: "p9",
    title: "Brand Mark V",
    src: "/s2.png",
    alt: "Orange brand mark visual",
    w: 640,
    h: 470,
    variant: "brand-v",
  },
  {
    id: "p10",
    title: "Health App",
    src: "/s3.png",
    alt: "Mobile health dashboard interface",
    w: 640,
    h: 490,
  },
  {
    id: "p11",
    title: "Analytics Dashboard",
    src: "/services/why-choose-collage.png",
    alt: "Data analytics dashboard with charts",
    w: 640,
    h: 560,
  },
  {
    id: "p12",
    title: "Tablet Experience",
    src: "/h2.png",
    alt: "Tablet content experience",
    w: 640,
    h: 560,
  },
];
