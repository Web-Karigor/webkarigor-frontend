"use client";

import { useLayoutEffect } from "react";
import { refreshScrollTriggers } from "@/lib/gsap";

export default function GsapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    const refresh = () => refreshScrollTriggers();

    refresh();

    const rafId = requestAnimationFrame(refresh);
    const t1 = window.setTimeout(refresh, 150);
    const t2 = window.setTimeout(refresh, 600);
    const t3 = window.setTimeout(refresh, 1500);

    const onLoad = () => refresh();
    window.addEventListener("load", onLoad);
    window.addEventListener("resize", refresh);
    document.fonts?.ready?.then(refresh);

    const images = Array.from(document.images);
    let pending = images.filter((img) => !img.complete).length;
    const onImageDone = () => {
      pending -= 1;
      if (pending <= 0) refresh();
    };
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", onImageDone);
        img.addEventListener("error", onImageDone);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", refresh);
      images.forEach((img) => {
        img.removeEventListener("load", onImageDone);
        img.removeEventListener("error", onImageDone);
      });
    };
  }, []);

  return children;
}
