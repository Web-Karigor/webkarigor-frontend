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
import { MANPOWER_PORTFOLIO_ITEMS } from "@/lib/manpower-data";

const CARD_GAP = 24;
const CARD_H = 520;
const VISIBLE_CARDS = 4;
const AUTO_SCROLL_MS = 4500;

export default function ManpowerPortfolio() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(0);
  const [index, setIndex] = useState(0);
  const cards = MANPOWER_PORTFOLIO_ITEMS;
  const maxIndex = Math.max(0, cards.length - VISIBLE_CARDS);

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

  const scrollToIndex = useCallback(
    (i: number) => {
      const next = Math.min(Math.max(i, 0), maxIndex);
      setIndex(next);
      const track = trackRef.current;
      if (!track || !cardW) return;
      track.scrollTo({
        left: next * (cardW + CARD_GAP),
        behavior: "smooth",
      });
    },
    [cardW, maxIndex],
  );

  const prev = useCallback(() => scrollToIndex(index - 1), [index, scrollToIndex]);
  const next = useCallback(() => scrollToIndex(index + 1), [index, scrollToIndex]);

  useLayoutEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    setIndex(0);
  }, []);

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

    const timer = window.setInterval(() => {
      if (paused) return;
      setIndex((prevIndex) => {
        const nextIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1;
        if (cardW) {
          track.scrollTo({
            left: nextIndex * (cardW + CARD_GAP),
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
    };
  }, [cardW, maxIndex]);

  return (
    <section className="overflow-hidden bg-[#F7F8FA] py-[clamp(48px,5vw,64px)]">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-10 px-[clamp(16px,3.5vw,50px)]">
        <div className="flex items-center justify-between gap-4">
          <h2 className="m-0 font-montserrat text-[clamp(24px,2.8vw,32px)] font-bold leading-none tracking-[-0.02em] text-[#18214D]">
            Our Projects
          </h2>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={index <= 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#D0D5DD] bg-transparent text-[#98A2B3] transition-colors hover:border-[#18214D] hover:text-[#18214D] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous projects"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={index >= maxIndex}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#18214D] bg-transparent text-[#18214D] transition-colors hover:bg-[#18214D]/[0.04] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next projects"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <div className="mr-[calc(-1*var(--mp-bleed))] w-[calc(100%+var(--mp-bleed))] [--mp-bleed:max(0px,calc((100vw-min(100vw,1800px))/2+clamp(16px,3.5vw,50px)))]">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ height: CARD_H }}
          >
            {cards.map((item) => (
              <article
                key={item.id}
                className="relative shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_8px_30px_rgba(24,33,77,0.08)]"
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
                  unoptimized
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
