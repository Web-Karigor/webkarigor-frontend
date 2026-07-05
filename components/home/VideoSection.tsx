"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const embedUrl =
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=1&loop=1&playlist=dQw4w9WgXcQ";

  useLayoutEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        {
          scale: 0.35,
          borderRadius: "2.5rem",
        },
        {
          scale: 1,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            end: "top 25%",
            scrub: 0.8,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-[#FFFDF6] px-6 py-12 md:py-20"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block rounded-full border border-[#38F8AB] px-5 py-2 text-sm font-medium text-[#15D286]">
            What make us different?
          </span>

          <h2 className="mt-8 flex flex-wrap items-center justify-center text-[48px] leading-[140%]">
            <span className="relative inline-block -translate-x-4 -translate-y-2 section-accent-text">
              Your Growth
            </span>
            <span className="relative inline-block translate-x-4 translate-y-4 font-montserrat font-bold text-[#111]">
              Is Our Mission
            </span>
          </h2>
        </div>

        <div
          ref={videoRef}
          className="relative mx-auto flex h-[50vw] w-full max-w-[1800px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-black shadow-xl md:h-[min(800px,70vh)]"
        >
          <iframe
            src={embedUrl}
            className="absolute inset-0 h-full w-full scale-x-150 scale-y-125"
            title="About Video"
            frameBorder="0"
            allow="autoplay"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
