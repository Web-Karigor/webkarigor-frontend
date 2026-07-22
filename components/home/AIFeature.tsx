"use client";

import "./AIFeature.css";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

type CardData = {
  title: string;
  desc: string;
  visual: ReactNode;
  visualClass: string;
};

function FrontEndVisual() {
  return (
    <div className="ai-visual-front flex h-full items-end p-3">
      <div className="w-full rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur-sm">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex gap-0.5 text-[#38F8AB] text-[9px]">★★★★★</div>
          <span className="text-[9px] font-semibold text-white/75">4.0</span>
        </div>
        <div className="mb-2 flex justify-end gap-2">
          {[
            { v: 75, c: "#38F8AB" },
            { v: 70, c: "#FFEF3F" },
          ].map((r) => (
            <div
              key={r.v}
              className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-[7px] font-bold text-white"
              style={{ borderColor: r.c }}
            >
              {r.v}%
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1.5">
          {[38, 58, 30, 72, 46, 64].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: h,
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg,#38F8AB,#15D286)"
                    : "linear-gradient(180deg,#FFEF3F,#E4D20E)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AIVisual() {
  return (
    <div className="ai-visual-ai flex h-full flex-col justify-end p-3">
      <div className="grid grid-cols-4 gap-1.5">
        {["⌘", "✦", "↻", "☀"].map((icon) => (
          <div
            key={icon}
            className="flex h-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-xs text-white/90 backdrop-blur-md"
          >
            {icon}
          </div>
        ))}
      </div>
      <div className="mt-2.5 rounded-full border border-[#38F8AB]/35 bg-[#38F8AB]/12 py-2 text-center text-[11px] font-semibold text-[#38F8AB]">
        Generate
      </div>
    </div>
  );
}

function BackendVisual() {
  return (
    <div className="ai-visual-backend relative h-full p-3">
      <svg viewBox="0 0 300 150" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="aiBackendGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38F8AB" />
            <stop offset="100%" stopColor="#00B4FF" />
          </linearGradient>
        </defs>
        {[
          "M30,100 L110,100 L110,55 L190,55",
          "M70,120 L150,120 L150,75 L230,75",
          "M190,100 L270,100",
        ].map((d) => (
          <path key={d} d={d} stroke="url(#aiBackendGlow)" strokeWidth="1.5" fill="none" opacity="0.75" />
        ))}
        {[
          [30, 100],
          [110, 55],
          [190, 55],
          [230, 75],
          [270, 100],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#38F8AB" />
        ))}
        <text x="200" y="42" fill="rgba(56,248,171,0.4)" fontSize="30" fontWeight="700">
          161
        </text>
      </svg>
    </div>
  );
}

function ProductVisual() {
  return (
    <div className="ai-visual-product flex h-full items-center justify-center p-3">
      <svg viewBox="0 0 280 140" className="h-full w-full" aria-hidden>
        <rect x="82" y="22" width="58" height="104" rx="10" fill="none" stroke="#5ecbff" strokeWidth="2" />
        <rect x="90" y="34" width="42" height="72" rx="4" fill="rgba(94,203,255,0.1)" />
        <text x="100" y="56" fill="#8fd6ff" fontSize="9" fontWeight="700">
          UI
        </text>
        <text x="100" y="74" fill="#8fd6ff" fontSize="9" fontWeight="700">
          UX
        </text>
        <path
          d="M158 52 L198 40 L238 56 L198 72 Z"
          fill="rgba(56,248,171,0.1)"
          stroke="#38F8AB"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function CrossPlatformVisual() {
  return (
    <div className="ai-visual-cross flex h-full items-center justify-center p-3">
      <svg viewBox="0 0 280 120" className="h-full w-full" aria-hidden>
        <rect x="32" y="26" width="48" height="80" rx="8" fill="none" stroke="#d8fff0" strokeWidth="2" />
        <rect x="40" y="36" width="32" height="56" rx="3" fill="rgba(255,255,255,0.06)" />
        <rect x="186" y="42" width="68" height="46" rx="6" fill="none" stroke="#d8fff0" strokeWidth="2" />
        <rect x="194" y="50" width="52" height="30" rx="2" fill="rgba(255,255,255,0.06)" />
        <path d="M88 68 H104 V60 H120 V76 H104 V68 H88 Z" fill="#38F8AB" />
        <path d="M148 68 H164 V60 H180 V76 H164 V68 H148 Z" fill="#38F8AB" />
      </svg>
    </div>
  );
}

function BrandVisual() {
  const items = [
    { label: "Strategy", x: 34, y: 22 },
    { label: "Marketing", x: 214, y: 16 },
    { label: "Logo", x: 22, y: 86 },
    { label: "Design", x: 232, y: 90 },
    { label: "Advertising", x: 68, y: 116 },
    { label: "Identity", x: 184, y: 116 },
  ];

  return (
    <div className="ai-visual-brand flex h-full items-center justify-center p-2">
      <svg viewBox="0 0 280 140" className="h-full w-full" aria-hidden>
        <ellipse cx="140" cy="68" rx="32" ry="20" fill="rgba(255,239,63,0.15)" stroke="#FFEF3F" strokeWidth="1.5" />
        <text x="140" y="73" textAnchor="middle" fill="#FFEF3F" fontSize="10" fontWeight="700">
          BRAND
        </text>
        {items.map((item) => (
          <g key={item.label}>
            <circle cx={item.x} cy={item.y} r="15" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" />
            <text x={item.x} y={item.y + 3} textAnchor="middle" fill="rgba(255,255,255,0.72)" fontSize="6.5">
              {item.label}
            </text>
            <line x1="140" y1="68" x2={item.x} y2={item.y} stroke="rgba(255,255,255,0.14)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

const cards: CardData[] = [
  {
    title: "Front-End Excellence",
    desc: "Fast, responsive, pixel-perfect interfaces built for real-world performance.",
    visual: <FrontEndVisual />,
    visualClass: "ai-visual-front",
  },
  {
    title: "AI-Driven Smart Solutions",
    desc: "Intelligent features that automate, personalize, and optimize user experiences.",
    visual: <AIVisual />,
    visualClass: "ai-visual-ai",
  },
  {
    title: "Scalable Back-End Technology",
    desc: "Secure, stable systems designed to grow with your business, not rebuild it.",
    visual: <BackendVisual />,
    visualClass: "ai-visual-backend",
  },
  {
    title: "Long-Term Product Thinking",
    desc: "Decisions made for sustainability, scalability, and future growth.",
    visual: <ProductVisual />,
    visualClass: "ai-visual-product",
  },
  {
    title: "Cross-Platform Consistency",
    desc: "Seamless experiences across web, mobile, and devices, no learning curve.",
    visual: <CrossPlatformVisual />,
    visualClass: "ai-visual-cross",
  },
  {
    title: "Branding Feels Trustworthy",
    desc: "Visual and verbal identity that builds credibility from the first interaction.",
    visual: <BrandVisual />,
    visualClass: "ai-visual-brand",
  },
];

export default function AIPoweredDesign() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const updatePaths = () => {
      if (!sectionRef.current || !centerRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const centerRect = centerRef.current.getBoundingClientRect();

      const cx = centerRect.left + centerRect.width / 2 - sectionRect.left;
      const cy = centerRect.top + centerRect.height / 2 - sectionRect.top;

      const newPaths = cardRefs.current.map((card) => {
        if (!card) return "";

        const r = card.getBoundingClientRect();
        const x = r.left + r.width / 2 - sectionRect.left;
        const y = r.top + r.height / 2 - sectionRect.top;
        const midY = (y + cy) / 2;

        return `M ${cx} ${cy} C ${cx} ${midY}, ${x} ${midY}, ${x} ${y}`;
      });

      setPaths(newPaths);
    };

    updatePaths();
    window.addEventListener("resize", updatePaths);
    return () => window.removeEventListener("resize", updatePaths);
  }, []);

  const renderCard = (c: CardData, i: number) => (
    <article
      key={c.title}
      ref={(el) => {
        cardRefs.current[i] = el as HTMLDivElement | null;
      }}
      className={`ai-feature-card transition-transform ${
        i === 1 ? "lg:-translate-y-10 z-10 relative" : ""
      }${i === 4 ? " lg:translate-y-10 z-10 relative" : ""}`}
    >
      <div className="ai-feature-card-body">
        <h3 className="ai-feature-card-title">{c.title}</h3>
        <p className="ai-feature-card-desc">{c.desc}</p>
      </div>
      <div className="ai-feature-card-visual">
        <div className={`ai-feature-card-visual-inner ${c.visualClass}`}>{c.visual}</div>
      </div>
    </article>
  );

  return (
    <section ref={sectionRef} className="ai-feature-section relative bg-[#fbfaf7] overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="#15803d" stopOpacity="1" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="1" />
          </radialGradient>
        </defs>

        {paths.map(
          (d, i) =>
            d && (
              <g key={i}>
                <path
                  d={d}
                  stroke="url(#lineGrad)"
                  strokeWidth="2"
                  fill="none"
                  style={{ filter: "drop-shadow(0 0 8px #16a34a)" }}
                />
                <circle r="10" fill="url(#dotGlow)">
                  <animateMotion dur="4s" repeatCount="indefinite" path={d} begin={`${i * 0.4}s`} />
                </circle>
                <circle r="8" fill="url(#dotGlow)">
                  <animateMotion dur="4s" repeatCount="indefinite" path={d} begin={`${i * 0.4 + 2}s`} />
                </circle>
              </g>
            ),
        )}
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-36">
          <span className="inline-flex h-7 min-w-0 sm:min-w-[156px] items-center justify-center rounded-full border border-[#38F8AB] bg-[#38F8AB]/10 px-4 sm:px-5">
            <span className="section-badge-text">Center of Solution</span>
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent section-accent-text">
              Path to
            </span>
            <span className="section-heading-split-title">
              Your Solution
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-20 mt-4 md:mt-8">
          {cards.slice(0, 3).map((c, i) => renderCard(c, i))}
        </div>

        <div className="relative flex justify-center my-12 md:my-20">
          <div ref={centerRef} className="ai-feature-center-node relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-green-600 bg-gradient-to-br from-green-400 via-green-500 to-green-600 shadow-[0_0_60px_18px_rgba(22,163,74,0.45)]"
            />
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center ai-feature-center-text font-extrabold text-white">
              W.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {cards.slice(3, 6).map((c, idx) => renderCard(c, idx + 3))}
        </div>
      </div>
    </section>
  );
}
