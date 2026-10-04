"use client";

import { useRef } from "react";
import FeatureCard from "./FeatureCard";
import CenterNode from "./CenterNode";
import SvgConnections from "./SvgConnections";
import { useCircuitGeometry } from "./useCircuitGeometry";
import { featureCards } from "./cards-data";
import homeContent from "@/data/home-content.json";

const { badge, headingAccent, headingTitle } = homeContent.aiFeature;

export default function FeatureNetwork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const { geometry, bindCardRef, scheduleUpdate } = useCircuitGeometry(
    sectionRef,
    centerRef,
    cardRefs,
  );

  return (
    <section
      ref={sectionRef}
      className="ai-feature-section relative overflow-hidden bg-[#fbfaf7]"
    >
      <div className="ai-feature-desktop-circuit hidden lg:block">
        <SvgConnections geometry={geometry} />
      </div>

      <div className="ai-feature-content relative z-[2] mx-auto max-w-6xl">
        <div className="ai-feature-mobile-frame">
          <div className="mb-8 text-center sm:mb-10 md:mb-12 lg:mb-14">
            <span className="ai-feature-badge inline-flex items-center justify-center rounded-full border border-[#38F8AB] px-5 py-2.5 sm:min-w-[156px] sm:px-6 sm:py-3">
              <span className="section-badge-text">{badge}</span>
            </span>

            <h2 className="section-heading ai-feature-heading">
              <span className="section-heading-split-accent section-accent-text">
                {headingAccent}
              </span>
              <span className="section-heading-split-title">{headingTitle}</span>
            </h2>
          </div>

          <div className="ai-feature-card-grid ai-feature-card-grid--top mt-2 mb-5 grid grid-cols-1 gap-4 lg:mb-20 lg:mt-4 lg:grid-cols-3 lg:items-start lg:gap-8">
            {featureCards.slice(0, 3).map((card, index) => (
              <FeatureCard
                key={card.title}
                ref={bindCardRef(index)}
                index={index}
                {...card}
              />
            ))}
          </div>

          <div className="ai-feature-center-wrap relative my-12 hidden justify-center lg:my-20 lg:flex">
            <CenterNode
              ref={(el) => {
                centerRef.current = el;
                if (el) scheduleUpdate();
              }}
            />
          </div>

          <div className="ai-feature-card-grid ai-feature-card-grid--bottom grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-end lg:gap-8">
            {featureCards.slice(3, 6).map((card, index) => (
              <FeatureCard
                key={card.title}
                ref={bindCardRef(index + 3)}
                index={index + 3}
                {...card}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
