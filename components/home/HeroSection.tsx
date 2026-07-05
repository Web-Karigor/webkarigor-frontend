"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import StatsBadge from "@/components/home/StatsBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // LEFT
  const leftStatsRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLSpanElement>(null);

  // TITLE LINES
  const titleLine1Ref = useRef<HTMLParagraphElement>(null); // LEFT
  const titleLine2Ref = useRef<HTMLSpanElement>(null);      // TOP
  const titleLine3Ref = useRef<HTMLParagraphElement>(null); // RIGHT

  // CENTER
  const descRef = useRef<HTMLParagraphElement>(null);
  const helloRef = useRef<HTMLDivElement>(null);

  // RIGHT
  const rightImageRef = useRef<HTMLDivElement>(null);

  // LINES
  const leftLineRef = useRef<HTMLSpanElement>(null);
  const rightLineRef = useRef<HTMLSpanElement>(null);
  const horizontalLineRef = useRef<HTMLSpanElement>(null);

  // PROJECTS
  const projectsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const slider = document.querySelector<HTMLElement>("[data-hero-slider]");
    if (!section || !slider) return;

    const ctx = gsap.context(() => {
      const scrubSmooth = 0.7;
      const ease = "power3.out";

      gsap.set(projectsRef.current, { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          endTrigger: slider,
          end: "top top",
          pin: true,
          pinSpacing: false,
          scrub: scrubSmooth,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(leftStatsRef.current, { x: -120, opacity: 0, ease }, 0)
        .to(leftImageRef.current, { x: -150, opacity: 0, ease }, 0.08)
        .to(rightImageRef.current, { x: 150, opacity: 0, ease }, 0.08)
        .to(titleLine1Ref.current, { x: -120, opacity: 0, ease }, 0.15)
        .to(titleLine2Ref.current, { y: -80, opacity: 0, ease }, 0.22)
        .to(titleLine3Ref.current, { x: 120, opacity: 0, ease }, 0.3)
        .to(descRef.current, { y: 120, opacity: 0, ease }, 0.38)
        .to(helloRef.current, { y: 90, opacity: 0, ease }, 0.45)
        .to(
          projectsRef.current,
          { opacity: 1, scale: 1.04, ease },
          0.42,
        )
        .to(
          projectsRef.current,
          { opacity: 0, scale: 1.08, ease: "power2.in" },
          0.62,
        )
        .to(section, { autoAlpha: 0, ease: "power2.inOut" }, 0.58);

      [leftLineRef.current, rightLineRef.current, horizontalLineRef.current].forEach(
        (line) => {
          if (!line) return;
          tl.to(line, { opacity: 0, ease: "power2.out" }, 0.35);
        },
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">

      {/* LINES */}
      <span ref={leftLineRef} className="absolute left-[478px] top-0 h-[720px] w-[1px] bg-[#DACFA7] hidden 2xl:inline-block" />
      <span ref={rightLineRef} className="absolute right-[478px] top-0 h-[720px] w-[1px] bg-[#DACFA7] hidden 2xl:inline-block" />
      <span ref={horizontalLineRef} className="absolute left-1/2 top-[580px] -translate-x-1/2 h-[1px] w-[942px] bg-[#DACFA7] hidden 2xl:inline-block" />

      <div className="relative mx-auto max-w-[1899px] px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-start">

          {/* LEFT */}
          <div className="col-span-12 md:col-span-3 flex flex-col items-center md:items-start gap-[80px] mt-[90px]">
            <div ref={leftStatsRef}><StatsBadge /></div>
            <span ref={leftImageRef} className="mt-[140px] hidden lg:block">
              <Image src="/h1.png" alt="" width={392} height={392} />
            </span>
          </div>

          {/* CENTER */}
          <div className="col-span-12 md:col-span-6 flex flex-col items-center md:mt-[255px]">
            <div className="max-w-[889px] text-center">
              <p ref={titleLine1Ref} className="hero-title">To deliver a 360</p>
              <span ref={titleLine2Ref} className="hero-subtitle md:-mt-6 block">
                AI driven solution
              </span>
              <p ref={titleLine3Ref} className="hero-title md:-mt-6">
                project approach
              </p>
            </div>

            <p ref={descRef} className="hero-desc max-w-[840px] mt-[75px]">
              Your <span className="hero-highlight">vision</span> deserves to grow.
              We create the brand identity, digital experience, and investor-ready
              story that help <span className="hero-badge">businesses</span> move
              faster with confidence.
            </p>

            <div ref={helloRef} className="hero-hello mt-[60px]">
              Say hello. We’re listening
              <div className="flex -space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/maxleiter.png" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-span-3 flex justify-end">
            <div ref={rightImageRef} className="mt-[170px] hidden lg:block">
              <Image src="/h2.png" alt="" width={392} height={392} />
            </div>
          </div>

        </div>
      </div>

      {/* Projects watermark */}
      <div
        ref={projectsRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
      >
        <p className="translate-y-[24%] text-center text-[76px] font-bold leading-none text-[#1F1E1C] opacity-[0.07] md:translate-y-[26%] md:text-[150px] lg:translate-y-[28%] lg:text-[190px] xl:translate-y-[30%] xl:text-[280px] 2xl:translate-y-[32%] 2xl:text-[300px]">
          PROJECTS
        </p>
      </div>
    </section>
  );
}
