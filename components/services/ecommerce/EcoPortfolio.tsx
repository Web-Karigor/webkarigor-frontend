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

const AUTO_SCROLL_MS = 4500;

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
  return { visibleCards: 4, cardHeight: 500, cardGap: 24, leftInset: 96 };
}

function usePortfolioLayout() {
  const [layout, setLayout] = useState<PortfolioLayout>(() =>
    typeof window !== "undefined"
      ? getPortfolioLayout(window.innerWidth)
      : getPortfolioLayout(1280),
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const layout = usePortfolioLayout();
  const cards = ECO_PORTFOLIO_ITEMS;
  const isSlider = cards.length > layout.visibleCards;

  const measureCards = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { visibleCards, cardGap } = layout;
    const w =
      (track.clientWidth - cardGap * (visibleCards - 1)) / visibleCards;
    setCardW(Math.max(0, Math.floor(w)));
  }, [layout]);

  useLayoutEffect(() => {
    measureCards();
    const track = trackRef.current;
    if (!track) return;

    const ro = new ResizeObserver(measureCards);
    ro.observe(track);
    return () => ro.disconnect();
  }, [measureCards]);

  const getScrollStep = useCallback(() => {
    return (cardW || 300) + layout.cardGap;
  }, [cardW, layout.cardGap]);

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
  }, [layout.visibleCards, layout.cardGap, layout.leftInset]);

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
              className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ height: layout.cardHeight, gap: layout.cardGap }}
            >
              {cards.map((item) => (
                <article
                  key={item.id}
                  data-eco-portfolio-card
                  className="relative shrink-0 snap-start overflow-hidden rounded-[16px] bg-white shadow-[0px_1px_30px_8px_rgba(140,140,140,0.14)] md:rounded-[20px] lg:rounded-[24px]"
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
