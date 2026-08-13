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
import { MANPOWER_PORTFOLIO_ITEMS, MANPOWER_PORTFOLIO_SECTION } from "@/lib/manpower-data";

const AUTO_SCROLL_MS = 4500;

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
  return { visibleCards: 4, cardHeight: 520, cardGap: 24 };
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

export default function ManpowerPortfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [index, setIndex] = useState(0);
  const layout = usePortfolioLayout();
  const cards = MANPOWER_PORTFOLIO_ITEMS;
  const maxIndex = Math.max(0, cards.length - layout.visibleCards);

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

  useLayoutEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    setIndex(0);
  }, [layout.visibleCards, layout.cardGap]);

  const scrollToIndex = useCallback(
    (i: number) => {
      const next = Math.min(Math.max(i, 0), maxIndex);
      setIndex(next);
      const track = trackRef.current;
      if (!track || !cardW) return;
      track.scrollTo({
        left: next * (cardW + layout.cardGap),
        behavior: "smooth",
      });
    },
    [cardW, layout.cardGap, maxIndex],
  );

  const prev = useCallback(() => scrollToIndex(index - 1), [index, scrollToIndex]);
  const next = useCallback(() => scrollToIndex(index + 1), [index, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || maxIndex <= 0) return;

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
      setIndex((prevIndex) => {
        const nextIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1;
        if (cardW) {
          track.scrollTo({
            left: nextIndex * (cardW + layout.cardGap),
            behavior: "smooth",
          });
        }
        return nextIndex;
      });
    }, AUTO_SCROLL_MS);

    return () => {
      clearInterval(timer);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, [cardW, layout.cardGap, maxIndex]);

  const imageSizes =
    layout.visibleCards === 1
      ? "92vw"
      : layout.visibleCards === 2
        ? "48vw"
        : "25vw";

  return (
    <section className="overflow-hidden bg-[#F7F8FA] py-[clamp(32px,5vw,64px)]">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-6 px-[clamp(16px,3.5vw,50px)] md:gap-8 lg:gap-10">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          <h2 className="m-0 font-montserrat text-[clamp(22px,2.8vw,32px)] font-bold leading-none tracking-[-0.02em] text-[#18214D]">
            {MANPOWER_PORTFOLIO_SECTION.title}
          </h2>

          <div className="flex shrink-0 items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={index <= 0}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#D0D5DD] bg-transparent text-[#98A2B3] transition-colors hover:border-[#18214D] hover:text-[#18214D] disabled:cursor-not-allowed disabled:opacity-40 md:h-10 md:w-10"
              aria-label="Previous projects"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index >= maxIndex}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#18214D] bg-transparent text-[#18214D] transition-colors hover:bg-[#18214D]/[0.04] disabled:cursor-not-allowed disabled:opacity-40 md:h-10 md:w-10"
              aria-label="Next projects"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <div className="mr-[calc(-1*var(--mp-bleed))] w-[calc(100%+var(--mp-bleed))] [--mp-bleed:max(0px,calc((100vw-min(100vw,1800px))/2+clamp(16px,3.5vw,50px)))]">
          <div
            ref={trackRef}
            className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ height: layout.cardHeight, gap: layout.cardGap }}
          >
            {cards.map((item) => (
              <article
                key={item.id}
                className="relative shrink-0 snap-start overflow-hidden rounded-[12px] bg-white shadow-[0_8px_30px_rgba(24,33,77,0.08)] md:rounded-[14px] lg:rounded-[16px]"
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
    </section>
  );
}
