"use client";

import { useMemo, useRef } from "react";
import FeatureCard from "./FeatureCard";
import CenterNode from "./CenterNode";
import SvgConnections from "./SvgConnections";
import { useCircuitGeometry } from "./useCircuitGeometry";
import { useHomePageQuery } from "@/hooks/queries/useHomePageQuery";
import { homeSectionItem, titleCaseName } from "@/lib/home-page";
import type { FeatureCardData } from "./types";
import type { HomeMedia } from "@/types/home-page";

export default function FeatureNetwork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const { geometry, bindCardRef, scheduleUpdate } = useCircuitGeometry(
    sectionRef,
    centerRef,
    cardRefs,
  );
  const { data } = useHomePageQuery();
  const item = homeSectionItem(data?.data?.sections?.center_solutions);

  const { featureCards, centerImage } = useMemo(() => {
    if (!item) return { featureCards: [] as FeatureCardData[], centerImage: "" };

    const images: HomeMedia[] = [
      item.solution,
      item.solution_two,
      item.solution_three,
      item.solution_four,
      item.solution_five,
      item.solution_six,
    ].filter(Boolean);

    return {
      featureCards: images.map((media) => ({
        title: media.alt_text || titleCaseName(media.name),
        imageSrc: media.url,
      })),
      centerImage: item.center?.url || "",
    };
  }, [item]);

  if (!featureCards.length || !centerImage) return null;

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
              <span className="section-badge-text">Center of Solution</span>
            </span>

            <h2 className="section-heading ai-feature-heading">
              <span className="section-heading-split-accent section-accent-text">
                Path to
              </span>
              <span className="section-heading-split-title">Your Solution</span>
            </h2>
          </div>

          <div className="ai-feature-card-grid ai-feature-card-grid--top mt-2 mb-5 grid grid-cols-1 gap-4 lg:mb-20 lg:mt-4 lg:grid-cols-3 lg:items-start lg:gap-8">
            {featureCards.slice(0, 3).map((card, index) => (
              <FeatureCard
                key={`${card.imageSrc}-${index}`}
                ref={bindCardRef(index)}
                index={index}
                {...card}
              />
            ))}
          </div>

          <div className="ai-feature-center-wrap relative my-12 hidden justify-center lg:my-20 lg:flex">
            <CenterNode
              imageSrc={centerImage}
              ref={(el) => {
                centerRef.current = el;
                if (el) scheduleUpdate();
              }}
            />
          </div>

          <div className="ai-feature-card-grid ai-feature-card-grid--bottom grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-end lg:gap-8">
            {featureCards.slice(3, 6).map((card, index) => (
              <FeatureCard
                key={`${card.imageSrc}-${index + 3}`}
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
