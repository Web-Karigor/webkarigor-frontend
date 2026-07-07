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
        },
        {
          scale: 1,
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
      className="bg-[#FFFDF6] px-4 sm:px-6 py-10 sm:py-12 md:py-20"
    >
      <div className="mx-auto max-w-[1860px]">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block rounded-full border border-[#38F8AB] px-4 sm:px-5 py-2 text-sm font-medium text-[#15D286]">
            What make us different?
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent section-accent-text">
              Your Growth
            </span>
            <span className="section-heading-split-title">
              Is Our Mission
            </span>
          </h2>
        </div>

        <div
          ref={videoRef}
          className="relative mx-auto flex max-h-[1039px] min-h-[48vw] w-full max-w-[1860px] items-center justify-center overflow-hidden rounded-[2.5rem] bg-black shadow-xl"
        >
          <iframe
            src={embedUrl}
            className="absolute inset-0 h-full w-full scale-x-150 scale-y-125 rounded-[2.5rem]"
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
