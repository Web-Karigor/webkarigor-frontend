import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from "react";
import type { CircuitGeometry } from "./types";
import { buildCircuitGeometry } from "./paths/buildCircuitGeometry";

const EMPTY: CircuitGeometry = {
  topLeft: "",
  topCenter: "",
  topRight: "",
  bottomLeft: "",
  bottomCenter: "",
  bottomRight: "",
  topLeftDot: "",
  topCenterDot: "",
  topRightDot: "",
  bottomLeftDot: "",
  bottomCenterDot: "",
  bottomRightDot: "",
  centerLeft: "",
  centerRight: "",
};

export function useCircuitGeometry(
  sectionRef: RefObject<HTMLElement | null>,
  centerRef: RefObject<HTMLElement | null>,
  cardRefs: RefObject<(HTMLElement | null)[]>,
) {
  const [geometry, setGeometry] = useState<CircuitGeometry>(EMPTY);
  const frameRef = useRef<number | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  const update = useCallback(() => {
    const section = sectionRef.current;
    const center = centerRef.current;
    if (!section || !center) return;

    setGeometry(
      buildCircuitGeometry(
        section.getBoundingClientRect(),
        center.getBoundingClientRect(),
        cardRefs.current ?? [],
      ),
    );
  }, [sectionRef, centerRef, cardRefs]);

  const scheduleUpdate = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      update();
    });
  }, [update]);

  useLayoutEffect(() => {
    observerRef.current = new ResizeObserver(scheduleUpdate);

    const section = sectionRef.current;
    const center = centerRef.current;
    if (section) observerRef.current.observe(section);
    if (center) observerRef.current.observe(center);

    cardRefs.current?.forEach((card) => {
      if (card) observerRef.current?.observe(card);
    });

    update();
    scheduleUpdate();

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      observerRef.current?.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [update, scheduleUpdate, sectionRef, centerRef, cardRefs]);

  const bindCardRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      if (!cardRefs.current) return;
      cardRefs.current[index] = el;
      if (el) observerRef.current?.observe(el);
      scheduleUpdate();
    },
    [cardRefs, scheduleUpdate],
  );

  return { geometry, bindCardRef, scheduleUpdate };
}
