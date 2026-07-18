export type ProjectCredit = {
  role: string;
  name: string;
  avatar: string;
};

export type RelatedProject = {
  slug: string;
  title: string;
  description: string;
  image: string;
  /** Figma: side cards are image, middle is text */
  variant?: "image" | "text";
};

export type ProjectDetail = {
  slug: string;
  title: string;
  titleLines?: readonly [string, string];
  heroImages: readonly [string, string, string];
  meta: {
    execution: string;
    clientName: string;
    projectArea: string;
    status: string;
    technologies: string;
  };
  about: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  clientVoice: string;
  mockupImage: string;
  problem: string;
  solution: string;
  credits: ProjectCredit[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
    rating: number;
  };
  ctaBody: string;
  related: RelatedProject[];
  nextSlug: string;
};

const SHARED_CREDITS: ProjectCredit[] = [
  { role: "Project Manager", name: "Kristin Watson", avatar: "/sm1.png" },
  { role: "Creative Director", name: "Kristin Watson", avatar: "/h1.png" },
  { role: "Product Designer", name: "Floyd Miles", avatar: "/sm2.jpg" },
  { role: "Brand Designer", name: "Floyd Miles", avatar: "/sm4.png" },
  { role: "Developer (Front-End)", name: "Floyd Miles", avatar: "/sm3.jpg" },
  { role: "Developer (Back-End)", name: "Floyd Miles", avatar: "/s1.png" },
  { role: "SQA Engineer", name: "Floyd Miles", avatar: "/s2.png" },
  { role: "UI Designer", name: "Floyd Miles", avatar: "/s3.png" },
];

const SHARED_CTA_BODY =
  "We'll schedule a call to discuss your idea. After discovery sessions, we'll send a proposal, and upon approval, we'll get started.";

function relatedTrio(
  left: RelatedProject,
  middle: RelatedProject,
  right: RelatedProject
): RelatedProject[] {
  return [
    { ...left, variant: "image" },
    { ...middle, variant: "text" },
    { ...right, variant: "image" },
  ];
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "kids-ecommerce": {
    slug: "kids-ecommerce",
    title: "Kids Ecommerce Platform Case Study Product UX UI Design",
    titleLines: [
      "Kids Ecommerce Platform Case Study Product",
      "UX UI Design",
    ],
    heroImages: ["/sm1.png", "/services/why-choose-main.jpg", "/ecommerce/hero-phone.png"],
    meta: {
      execution: "25 June 2024",
      clientName: "ADOMM",
      projectArea: "Multimedia Design",
      status: "Ongoing Project",
      technologies: "Next JS, Laravel",
    },
    about: {
      eyebrow: "About Project",
      headline: "Building A Trust-Driven Shopping Experience For Modern Parents",
      body: "Shishu Poribohon is a kids ecommerce platform designed to help parents discover and buy age-appropriate products with confidence. We focused on clarity, warmth, and trust — so every step of the shopping journey feels simple, safe, and made for modern families.",
    },
    clientVoice:
      "Webkarigor understood our brand and our customers from day one. They translated our vision into a product experience that feels premium, trustworthy, and easy for parents to use — and our conversion rates reflect that.",
    mockupImage: "/sm3.jpg",
    problem:
      "Parents often face uncertainty when buying children’s products online due to inconsistent product information, unclear quality assurance, and overwhelming choices. This lack of clarity can increase decision time and reduce confidence, especially when safety and reliability are critical factors in their purchase decisions.",
    solution:
      "Shishu Poribohon addresses these challenges by creating a trust-focused shopping experience. The platform emphasizes clear product details, structured information hierarchy, and reassurance elements to support informed decisions. The experience was designed to reduce confusion, improve transparency, and help parents shop with greater confidence and ease.",
    credits: SHARED_CREDITS,
    testimonial: {
      quote:
        "Working with Webkarigor was one of the smoothest product partnerships we've had. They cared about the details, challenged our assumptions, and delivered a kids ecommerce experience our customers love.",
      name: "Darrell Steward",
      role: "CEO of Fooder - Online Food Store",
      avatar: "/h1.png",
      rating: 5,
    },
    ctaBody: SHARED_CTA_BODY,
    related: relatedTrio(
      {
        slug: "fashion-mobile",
        title: "Fashion Mobile App",
        description:
          "A modern retail app experience focused on discovery, personalization, and seamless checkout.",
        image: "/sm4.png",
      },
      {
        slug: "fashion-mobile",
        title: "Fashion Mobile App",
        description:
          "A trust-focused shopping experience with clear product details, structured information hierarchy, and reassurance for modern parents across web and mobile.",
        image: "/services/why-choose-main.jpg",
      },
      {
        slug: "travel-app",
        title: "Travel Booking App",
        description:
          "A clean multi-platform booking flow designed to reduce friction and help travelers plan with confidence.",
        image: "/ecommerce/hero-composite.png",
      }
    ),
    nextSlug: "fashion-mobile",
  },
  "fashion-mobile": {
    slug: "fashion-mobile",
    title: "Fashion Mobile App Case Study Product UX UI Design",
    heroImages: ["/sm4.png", "/sm1.png", "/sm2.jpg"],
    meta: {
      execution: "12 March 2024",
      clientName: "Lumen Wear",
      projectArea: "Mobile Commerce",
      status: "Completed",
      technologies: "React Native, Node.js",
    },
    about: {
      eyebrow: "About Project",
      headline: "A Discovery-First Fashion Experience Built For Mobile Shoppers",
      body: "We designed a fashion commerce app that makes browsing feel effortless and personal. From curated collections to one-tap checkout, every screen is crafted to help shoppers find what they love faster.",
    },
    clientVoice:
      "The team delivered a polished mobile experience that finally matches how our customers shop. Discovery feels fun, and checkout feels instant.",
    mockupImage: "/sm2.jpg",
    problem:
      "Users abandoned the app during browse because collections were hard to explore and product detail felt disconnected from checkout.",
    solution:
      "We rebuilt the browse architecture around visual discovery, smarter filters, and a frictionless purchase path that keeps shoppers in flow.",
    credits: SHARED_CREDITS,
    testimonial: {
      quote:
        "Working with Webkarigor was one of the smoothest product partnerships we've had. They cared about the details, challenged our assumptions, and delivered an experience our customers love.",
      name: "Darrell Steward",
      role: "CEO of Fooder - Online Food Store",
      avatar: "/h1.png",
      rating: 5,
    },
    ctaBody: SHARED_CTA_BODY,
    related: relatedTrio(
      {
        slug: "kids-ecommerce",
        title: "Kids Ecommerce Platform",
        description:
          "A trust-driven shopping experience designed for modern parents across web and mobile.",
        image: "/services/why-choose-main.jpg",
      },
      {
        slug: "travel-app",
        title: "Travel Booking App",
        description:
          "A clean multi-platform booking flow designed to reduce friction and help travelers plan with confidence.",
        image: "/ecommerce/hero-composite.png",
      },
      {
        slug: "kids-ecommerce",
        title: "Kids Ecommerce Platform",
        description:
          "A trust-driven shopping experience designed for modern parents across web and mobile.",
        image: "/sm1.png",
      }
    ),
    nextSlug: "travel-app",
  },
  "travel-app": {
    slug: "travel-app",
    title: "Travel Booking App Case Study Product UX UI Design",
    heroImages: ["/ecommerce/hero-composite.png", "/h2.png", "/sm3.jpg"],
    meta: {
      execution: "08 November 2023",
      clientName: "Voyage Hub",
      projectArea: "Travel Tech",
      status: "Completed",
      technologies: "Next JS, Flutter",
    },
    about: {
      eyebrow: "About Project",
      headline: "Helping Travelers Plan Trips With Clarity And Confidence",
      body: "We created a booking experience that simplifies complex travel decisions. Clear search, transparent pricing, and guided itineraries help users move from inspiration to booking without friction.",
    },
    clientVoice:
      "Webkarigor turned a complicated booking journey into something people actually enjoy using. The product feels calm, clear, and trustworthy.",
    mockupImage: "/h2.png",
    problem:
      "Travelers bounced between too many steps and unclear pricing, which made booking feel stressful and slow.",
    solution:
      "We redesigned the booking flow with progressive disclosure, clearer trip summaries, and a confidence-building confirmation experience.",
    credits: SHARED_CREDITS,
    testimonial: {
      quote:
        "Working with Webkarigor was one of the smoothest product partnerships we've had. They cared about the details, challenged our assumptions, and delivered an experience our customers love.",
      name: "Darrell Steward",
      role: "CEO of Fooder - Online Food Store",
      avatar: "/h1.png",
      rating: 5,
    },
    ctaBody: SHARED_CTA_BODY,
    related: relatedTrio(
      {
        slug: "fashion-mobile",
        title: "Fashion Mobile App",
        description:
          "A modern retail app experience focused on discovery, personalization, and seamless checkout.",
        image: "/sm4.png",
      },
      {
        slug: "kids-ecommerce",
        title: "Kids Ecommerce Platform",
        description:
          "A trust-driven shopping experience designed for modern parents across web and mobile.",
        image: "/services/why-choose-main.jpg",
      },
      {
        slug: "fashion-mobile",
        title: "Fashion Mobile App",
        description:
          "A modern retail app experience focused on discovery, personalization, and seamless checkout.",
        image: "/sm1.png",
      }
    ),
    nextSlug: "kids-ecommerce",
  },
};

export const PROJECT_CARD_SLUGS: Record<string, string> = {
  p1: "kids-ecommerce",
  p2: "fashion-mobile",
  p3: "kids-ecommerce",
  p4: "travel-app",
  p5: "kids-ecommerce",
  p6: "fashion-mobile",
  p7: "fashion-mobile",
  p8: "kids-ecommerce",
  p9: "kids-ecommerce",
  p10: "kids-ecommerce",
  p11: "kids-ecommerce",
  p12: "travel-app",
};

export const DEFAULT_PROJECT_SLUG = "kids-ecommerce";

export function getProjectDetail(slug: string): ProjectDetail | undefined {
  return PROJECT_DETAILS[slug];
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(PROJECT_DETAILS);
}
