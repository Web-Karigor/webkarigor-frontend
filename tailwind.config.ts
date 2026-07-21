import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        museoModerno: ["var(--font-museoModerno)", "sans-serif"],
      },
      keyframes: {
        "marquee-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-25%)" },
        },
        "tech-scroll-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-33.333333%)" },
        },
        "tech-scroll-right": {
          from: { transform: "translateX(-33.333333%)" },
          to: { transform: "translateX(0)" },
        },
        "testimonials-rtl": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "testimonials-ltr": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "hireus-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "hireus-blink": {
          "0%, 45%": { opacity: "1" },
          "55%, 100%": { opacity: "0.12" },
        },
      },
      animation: {
        "marquee-scroll": "marquee-scroll 28s linear infinite",
        "tech-scroll-left": "tech-scroll-left 24s linear infinite",
        "tech-scroll-right": "tech-scroll-right 24s linear infinite",
        "testimonials-rtl": "testimonials-rtl 40s linear infinite",
        "testimonials-ltr": "testimonials-ltr 40s linear infinite",
        "hireus-spin": "hireus-spin 12s linear infinite",
        "hireus-blink": "hireus-blink 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
