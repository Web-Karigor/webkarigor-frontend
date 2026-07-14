"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft } from "lucide-react";
import {
  ECO_PORTFOLIO_ITEMS,
  ECO_PORTFOLIO_TABS,
} from "@/lib/ecommerce-data";

const CARD_GAP = 24;
const CARD_H = 500;
const VISIBLE_CARDS = 4;
const AUTO_SCROLL_MS = 4500;
/** Only room for the arrow — Figma left gap, NOT ServiceOfferings 230px */
const LEFT_INSET_PX = 96;

export default function EcoPortfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const cards = ECO_PORTFOLIO_ITEMS;
  const isSlider = cards.length > VISIBLE_CARDS;

  const measureCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const w =
      (track.clientWidth - CARD_GAP * (VISIBLE_CARDS - 1)) / VISIBLE_CARDS;
    setCardW(Math.max(0, Math.floor(w)));
  }, []);

  useLayoutEffect(() => {
    measureCards();
    const track = trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(measureCards);
    ro.observe(track);
    return () => ro.disconnect();
  }, [measureCards]);

  const getScrollStep = useCallback(() => {
    return (cardW || 300) + CARD_GAP;
  }, [cardW]);

  const scrollByStep = useCallback(
    (direction: "left" | "right") => {
      const track = trackRef.current;
      if (!track || !isSlider) return;

      const step = getScrollStep();
      const maxScroll = track.scrollWidth - track.clientWidth;

      if (direction === "right" && track.scrollLeft >= maxScroll - 4) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      if (direction === "left" && track.scrollLeft <= 4) {
        track.scrollTo({ left: maxScroll, behavior: "smooth" });
        return;
      }

      track.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });
    },
    [getScrollStep, isSlider],
  );

  useLayoutEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isSlider) return;

    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });

    const timer = window.setInterval(() => {
      if (paused) return;
      scrollByStep("right");
    }, AUTO_SCROLL_MS);

    return () => {
      clearInterval(timer);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, [scrollByStep, isSlider]);

  return (
    <section className="overflow-hidden bg-[#f8fafc] py-12">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-[40px] px-[clamp(16px,4vw,40px)]">
        {/* Nav — same left start as first card */}
        <nav
          className="flex flex-wrap items-center justify-start gap-x-[14px] gap-y-2 sm:gap-x-5"
          style={{ paddingLeft: LEFT_INSET_PX }}
          aria-label="Portfolio categories"
        >
          {ECO_PORTFOLIO_TABS.map((tab, index) => (
            <span key={tab} className="inline-flex items-center gap-x-[14px] sm:gap-x-5">
              {index > 0 && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                  aria-hidden
                />
              )}
              <span className="font-montserrat text-[clamp(15px,1.5vw,18px)] font-bold leading-none tracking-[-0.01em] text-black">
                {tab}
              </span>
            </span>
          ))}
        </nav>

        {/*
          Right bleed → cards fill to screen edge (no empty right).
          Left inset small → only arrow gap, cards start right after it.
        */}
        <div
          className="mr-[calc(-1*var(--eco-bleed))] w-[calc(100%+var(--eco-bleed))] [--eco-bleed:max(0px,calc((100vw-min(100vw,1680px))/2+clamp(16px,4vw,40px)))]"
          style={{ paddingLeft: LEFT_INSET_PX }}
        >
          <div className="relative">
            {isSlider && (
              <button
                type="button"
                className="absolute top-1/2 z-[3] inline-flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(17,24,39,0.08)] bg-white text-[#111827] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] hover:translate-y-[calc(-50%-1px)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                style={{ left: -LEFT_INSET_PX + 16 }}
                onClick={() => scrollByStep("left")}
                aria-label="Previous portfolio project"
              >
                <ArrowLeft className="h-[22px] w-[22px] stroke-[1.5]" aria-hidden />
              </button>
            )}

            <div
              ref={trackRef}
              className="flex gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ height: CARD_H }}
            >
              {cards.map((item) => (
                <article
                  key={item.id}
                  data-eco-portfolio-card
                  className="relative shrink-0 snap-start overflow-hidden rounded-[24px] bg-white shadow-[0px_1px_30px_8px_rgba(140,140,140,0.14)]"
                  style={{
                    width: cardW || undefined,
                    height: CARD_H,
                    flex: cardW
                      ? `0 0 ${cardW}px`
                      : `0 0 calc((100% - ${(VISIBLE_CARDS - 1) * CARD_GAP}px) / ${VISIBLE_CARDS})`,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top"
                    sizes="25vw"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
