"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_ITEMS, WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_SECTION } from "@/lib/website-design-development-data";

const AUTO_SCROLL_MS = 4500;
const LOOP_COPIES = 3;
const STEP_SETTLE_MS = 480;

type PortfolioLayout = {
  visibleCards: number;
  cardHeight: number;
  cardGap: number;
};

function getPortfolioLayout(width: number): PortfolioLayout {
  if (width < 768) {
    return { visibleCards: 1, cardHeight: 380, cardGap: 16 };
  }
  if (width < 1024) {
    return { visibleCards: 2, cardHeight: 460, cardGap: 20 };
  }
  if (width < 1280) {
    return { visibleCards: 3, cardHeight: 440, cardGap: 18 };
  }
  return { visibleCards: 4, cardHeight: 520, cardGap: 24 };
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

export default function Portfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrappingRef = useRef(false);
  const settleTimerRef = useRef<number | null>(null);
  const [cardW, setCardW] = useState(0);
  const layout = usePortfolioLayout();
  const cards = WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_ITEMS;
  const loopCards = Array.from({ length: LOOP_COPIES }, (_, copy) =>
    cards.map((item) => ({ item, copy })),
  ).flat();

  const step = cardW + layout.cardGap;
  const setWidth = cards.length * step;

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
    (dir: number) => {
      const track = trackRef.current;
      if (!track || !cardW) return;
      track.scrollBy({ left: dir * step, behavior: "smooth" });
      scheduleNormalize();
    },
    [cardW, scheduleNormalize, step],
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
    if (!cardW) return;
    jumpTo(setWidth);
  }, [cardW, jumpTo, layout.cardGap, layout.visibleCards, setWidth]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !cardW) return;

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
      scrollByStep(1);
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
  }, [cardW, normalizeLoop, scrollByStep, setWidth]);

  const imageSizes =
    layout.visibleCards === 1
      ? "92vw"
      : layout.visibleCards === 2
        ? "48vw"
        : "25vw";

  return (
    <section className="overflow-hidden bg-[#F7F8FA] py-[clamp(32px,5vw,64px)]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6 px-[clamp(16px,4vw,40px)] md:gap-8 lg:gap-10">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <h2 className="m-0 font-montserrat text-[clamp(22px,2.8vw,32px)] font-bold leading-none tracking-[-0.02em] text-[#18214D]">
            {WEBSITE_DESIGN_DEVELOPMENT_PORTFOLIO_SECTION.title}
          </h2>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D0D5DD] bg-transparent text-[#98A2B3] transition-colors hover:border-[#18214D] hover:text-[#18214D] md:h-10 md:w-10"
              aria-label="Previous projects"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#18214D] bg-transparent text-[#18214D] transition-colors hover:bg-[#18214D]/[0.04] md:h-10 md:w-10"
              aria-label="Next projects"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <div className="mr-[calc(-1*var(--erp-bleed))] w-[calc(100%+var(--erp-bleed))] [--erp-bleed:max(0px,calc((100vw-min(100vw,1680px))/2+clamp(16px,4vw,40px)))]">
          <div
            ref={trackRef}
            className="flex overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ height: layout.cardHeight, gap: layout.cardGap }}
          >
            {loopCards.map(({ item, copy }) => (
              <article
                key={`${item.id}-${copy}`}
                className="relative shrink-0 overflow-hidden rounded-[12px] bg-white shadow-[0_8px_30px_rgba(24,33,77,0.08)] md:rounded-[14px] lg:rounded-[16px]"
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
                  sizes={imageSizes} loading="lazy"/>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
