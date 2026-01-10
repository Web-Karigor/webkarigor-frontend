"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function useGSAP() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // GSAP animations can be set up here
    }
  }, []);

  return containerRef;
}
