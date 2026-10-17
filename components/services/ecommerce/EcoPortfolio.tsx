"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft } from "lucide-react";
import {
  ECO_PORTFOLIO_ITEMS,
  ECO_PORTFOLIO_TABS,
} from "@/lib/ecommerce-data";

const AUTO_SCROLL_MS = 4500;
const LOOP_COPIES = 3;
const STEP_SETTLE_MS = 480;

type PortfolioLayout = {
  visibleCards: number;
  cardHeight: number;
  cardGap: number;
  leftInset: number;
};

function getPortfolioLayout(width: number): PortfolioLayout {
  if (width < 768) {
    return { visibleCards: 1, cardHeight: 380, cardGap: 16, leftInset: 56 };
  }
  if (width < 1024) {
    return { visibleCards: 2, cardHeight: 460, cardGap: 20, leftInset: 72 };
  }
  if (width < 1280) {
    return { visibleCards: 3, cardHeight: 440, cardGap: 18, leftInset: 72 };
  }
  return { visibleCards: 4, cardHeight: 500, cardGap: 24, leftInset: 96 };
}

function usePortfolioLayout() {
  const [layout, setLayout] = useState<PortfolioLayout>(() =>
    getPortfolioLayout(1280),
  );

  useEffect(() => {
    const onResize = () => setLayout(getPortfolioLayout(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return layout;
}

export default function EcoPortfolio() {
  const cards = ECO_PORTFOLIO_ITEMS;
  const trackRef = useRef<HTMLDivElement>(null);
  const wrappingRef = useRef(false);
  const settleTimerRef = useRef<number | null>(null);
  const [cardW, setCardW] = useState(0);
  const layout = usePortfolioLayout();
  const loopCards = useMemo(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copy) =>
        cards.map((item) => ({ item, copy })),
      ).flat(),
    [cards],
  );

  const step = cardW + layout.cardGap;
  const setWidth = cards.length * step;
  const isSlider = cards.length > 1;

  const measureCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { visibleCards, cardGap } = layout;
    const w =
      (track.clientWidth - cardGap * (visibleCards - 1)) / visibleCards;
    setCardW(Math.max(0, Math.floor(w)));
  }, [layout]);

  const jumpTo = useCallback((left: number) => {
    const track = trackRef.current;
    if (!track) return;
    wrappingRef.current = true;
    const prev = track.style.scrollBehavior;
    track.style.scrollBehavior = "auto";
    track.scrollLeft = left;
    track.style.scrollBehavior = prev;
    wrappingRef.current = false;
  }, []);

  const normalizeLoop = useCallback(() => {
    const track = trackRef.current;
    if (!track || wrappingRef.current || setWidth <= 0) return;
    if (track.scrollLeft < setWidth * 0.5) {
      jumpTo(track.scrollLeft + setWidth);
    } else if (track.scrollLeft >= setWidth * 1.5) {
      jumpTo(track.scrollLeft - setWidth);
    }
  }, [jumpTo, setWidth]);

  const scheduleNormalize = useCallback(() => {
    if (settleTimerRef.current != null) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => {
      normalizeLoop();
      settleTimerRef.current = null;
    }, STEP_SETTLE_MS);
  }, [normalizeLoop]);

  const scrollByStep = useCallback(
    (direction: "left" | "right") => {
      const track = trackRef.current;
      if (!track || !cardW || !isSlider) return;
      track.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });
      scheduleNormalize();
    },
    [cardW, isSlider, scheduleNormalize, step],
  );

  useLayoutEffect(() => {
    measureCards();
    const track = trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(measureCards);
    ro.observe(track);
    return () => ro.disconnect();
  }, [measureCards]);

  useLayoutEffect(() => {
    if (!cardW || !setWidth) return;
    jumpTo(setWidth);
  }, [cardW, jumpTo, layout.cardGap, layout.leftInset, layout.visibleCards, setWidth]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !cardW || !isSlider) return;

    let paused = false;
    const pause = () => {
      paused = true;
    };
    const resume = () => {
      paused = false;
    };

    const onScroll = () => {
      if (wrappingRef.current) return;
      if (track.scrollLeft < setWidth * 0.25 || track.scrollLeft >= setWidth * 1.75) {
        normalizeLoop();
      }
    };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume, { passive: true });
    track.addEventListener("scroll", onScroll, { passive: true });

    const timer = window.setInterval(() => {
      if (paused) return;
      scrollByStep("right");
    }, AUTO_SCROLL_MS);

    return () => {
      clearInterval(timer);
      if (settleTimerRef.current != null) {
        window.clearTimeout(settleTimerRef.current);
      }
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
      track.removeEventListener("scroll", onScroll);
    };
  }, [cardW, isSlider, normalizeLoop, scrollByStep, setWidth]);

  const imageSizes =
    layout.visibleCards === 1
      ? "92vw"
      : layout.visibleCards === 2
        ? "48vw"
        : "25vw";

  return (
    <section className="overflow-hidden bg-[#f8fafc] py-[clamp(32px,5vw,48px)]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6 px-[clamp(16px,4vw,40px)] md:gap-8 lg:gap-10">
        <nav
          className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 sm:gap-x-4 md:gap-x-5 lg:gap-x-[14px]"
          style={{ paddingLeft: layout.leftInset }}
          aria-label="Portfolio categories"
        >
          {ECO_PORTFOLIO_TABS.map((tab, index) => (
            <span
              key={tab}
              className="inline-flex items-center gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-[14px]"
            >
              {index > 0 && (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-black"
                  aria-hidden
                />
              )}
              <span className="font-montserrat text-[clamp(14px,1.5vw,18px)] font-bold leading-none tracking-[-0.01em] text-black">
                {tab}
              </span>
            </span>
          ))}
        </nav>

        <div
          className="mr-[calc(-1*var(--eco-bleed))] w-[calc(100%+var(--eco-bleed))] [--eco-bleed:max(0px,calc((100vw-min(100vw,1680px))/2+clamp(16px,4vw,40px)))]"
          style={{ paddingLeft: layout.leftInset }}
        >
          <div className="relative">
            {isSlider && (
              <button
                type="button"
                className="absolute top-1/2 z-[3] inline-flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[rgba(17,24,39,0.08)] bg-white text-[#111827] shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] hover:translate-y-[calc(-50%-1px)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:h-11 md:w-11 lg:h-12 lg:w-12"
                style={{ left: -layout.leftInset + 12 }}
                onClick={() => scrollByStep("left")}
                aria-label="Previous portfolio project"
              >
                <ArrowLeft
                  className="h-5 w-5 stroke-[1.5] md:h-[20px] md:w-[20px] lg:h-[22px] lg:w-[22px]"
                  aria-hidden
                />
              </button>
            )}

            <div
              ref={trackRef}
              className="flex overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ height: layout.cardHeight, gap: layout.cardGap }}
            >
              {loopCards.map(({ item, copy }) => (
                <article
                  key={`${item.id}-${copy}`}
                  data-eco-portfolio-card
                  className="relative shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0px_1px_30px_8px_rgba(140,140,140,0.14)] md:rounded-[20px] lg:rounded-[24px]"
                  style={{
                    width: cardW || undefined,
                    height: layout.cardHeight,
                    flex: cardW
                      ? `0 0 ${cardW}px`
                      : `0 0 calc((100% - ${(layout.visibleCards - 1) * layout.cardGap}px) / ${layout.visibleCards})`,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top"
                    sizes={imageSizes}
                    loading="lazy"
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
