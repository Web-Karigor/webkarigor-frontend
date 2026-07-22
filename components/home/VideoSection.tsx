"use client";

import "./VideoSection.css";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Video expands only once it's dead-center in the viewport (Noomo-style).
 * Pin keeps it in the middle while scale grows with smooth scrub inertia.
 */
const VideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const embedUrl =
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=1&loop=1&playlist=dQw4w9WgXcQ";

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    const frame = frameRef.current;
    if (!section || !stage || !tilt || !frame) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.set(stage, {
          perspective: 1400,
          transformStyle: "preserve-3d",
        });

        gsap.set(tilt, {
          transformStyle: "preserve-3d",
          force3D: true,
          willChange: "transform",
          backfaceVisibility: "hidden",
        });

        gsap.set(frame, {
          scale: 0.62,
          borderRadius: "2.75rem",
          force3D: true,
          transformOrigin: "50% 50%",
          willChange: "transform,border-radius",
          backfaceVisibility: "hidden",
        });

        /**
         * start: video center hits viewport center → pin in the middle
         * then scrub-grow while locked at center (Noomo cinematic feel)
         */
        gsap.to(frame, {
          scale: 1,
          borderRadius: "1.75rem",
          ease: "power2.inOut",
          force3D: true,
          scrollTrigger: {
            trigger: stage,
            start: "center center",
            end: "+=180%",
            pin: true,
            pinSpacing: true,
            scrub: 2.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const quickRotY = gsap.quickTo(tilt, "rotateY", {
          duration: 1.05,
          ease: "power3.out",
        });
        const quickRotX = gsap.quickTo(tilt, "rotateX", {
          duration: 1.05,
          ease: "power3.out",
        });

        const onMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          if (rect.width < 1 || rect.height < 1) return;
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          quickRotY(nx * 9);
          quickRotX(-ny * 6.5);
        };

        const onLeave = () => {
          quickRotY(0);
          quickRotX(0);
        };

        stage.addEventListener("mousemove", onMove);
        stage.addEventListener("mouseleave", onLeave);

        return () => {
          stage.removeEventListener("mousemove", onMove);
          stage.removeEventListener("mouseleave", onLeave);
        };
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FFFDF6] px-5 py-10 max-lg:overflow-x-hidden lg:overflow-hidden lg:px-4 lg:py-10 xl:px-6 xl:py-12 2xl:py-20"
    >
      <div className="mx-auto w-full max-w-[1860px] max-lg:max-w-full">
        <div className="mb-6 text-center max-lg:mb-8 lg:mb-8 xl:mb-12 2xl:mb-16">
          <span className="inline-block rounded-full border border-[#38F8AB] px-4 py-2 text-sm font-medium text-[#15D286] sm:px-5">
            What make us different?
          </span>

          <h2 className="section-heading">
            <span className="section-heading-split-accent section-accent-text">
              Your Growth
            </span>
            <span className="section-heading-split-title">Is Our Mission</span>
          </h2>
        </div>

        <div
          ref={stageRef}
          className="relative mx-auto w-full max-w-full lg:max-w-[1860px] lg:[perspective:1400px]"
        >
          <div ref={tiltRef} className="w-full lg:[transform-style:preserve-3d]">
            <div
              ref={frameRef}
              className="video-section-frame relative mx-auto flex w-full max-w-full items-center justify-center overflow-hidden rounded-[1.5rem] bg-black shadow-[0_12px_40px_rgba(0,0,0,0.12)] max-lg:aspect-video max-lg:min-h-0 max-lg:max-h-none lg:max-h-[1039px] lg:min-h-[min(48vw,280px)] lg:shadow-[0_24px_80px_rgba(0,0,0,0.18)] lg:rounded-[2.5rem] xl:min-h-[48vw]"
            >
              <iframe
                src={embedUrl}
                className="video-section-iframe pointer-events-auto absolute inset-0 h-full w-full rounded-[1.5rem] lg:scale-x-150 lg:scale-y-125 lg:rounded-[2.5rem]"
                title="About Video"
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
