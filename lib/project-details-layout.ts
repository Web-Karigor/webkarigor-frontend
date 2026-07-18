/**
 * Project Details — Figma node 2108-9567
 */
export const PD = {
  frame: 1920,
  /** Hero gallery row — Figma confirmed */
  heroContent: 1800,
  /** Inner sections (about / credits / etc.) */
  content: 1300,
  radius: 32,
  radiusSm: 24,
  gap: 20,
  sectionGap: 100,

  hero: {
    /** Figma card: 562 × 462 — three equal cards in 1800 row */
    cardW: 562,
    cardH: 462,
    /** Card gap — tighter, matches Figma screenshot */
    gap: 24,
    pad: 16,
    innerGap: 10,
    radius: 32,
    /** #DDE3EB @ 16% */
    cardBg: "rgba(221, 227, 235, 0.16)",
    blur: 40,
    /** drop shadow 0 0 25 #000 @ 12% */
    shadow: "0 0 25px rgba(0, 0, 0, 0.12)",
    titleSize: 48,
    titleLeading: 1.3,
    titleTracking: "-0.04em",
    titleMax: 900,
    backTop: 40,
    imagesTop: 40,
    titleTop: 48,
  },

  body: {
    leftW: 400,
    colGap: 60,
    boxPad: 32,
    boxRadius: 24,
    boxBg: "#FFF8DC",
    boxGap: 24,
    metaLabelW: 140,
  },

  mockup: {
    /** Figma featured visual — height 692 */
    h: 692,
    radius: 40,
  },

  credits: {
    titleSize: 40,
    rowGap: 0,
    colGap: 80,
    avatar: 40,
  },

  testimonial: {
    radius: 32,
    padX: 64,
    padY: 56,
    bg: "#519F94",
  },

  related: {
    /** Figma section ~1320 × 511 (title + 3 equal cards) */
    w: 1320,
    gap: 20,
    cardRadius: 24,
    /** ~((1320 - 2×20) / 3) — near-square cards */
    cardH: 420,
  },

  /** Figma CTA block: 1321 × Hug(272), gap 40, left 300 */
  cta: {
    w: 1321,
    gap: 40,
    titleSize: 42,
  },
} as const;
