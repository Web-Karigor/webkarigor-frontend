"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import StatsBadge from "@/components/home/StatsBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 🔒 PIN HERO */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=900",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      const scrubSmooth = 0.7;
      const base = { ease: "power3.out" };

      /* LEFT SIDE CONTENT */
      gsap.fromTo(
        leftStatsRef.current,
        { x: 0, opacity: 1 },
        {
          x: -120,
          opacity: 0,
          ...base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=80 top",
            end: "+=300",
            scrub: scrubSmooth,
          },
        }
      );

      gsap.fromTo(
        leftImageRef.current,
        { x: 0, opacity: 1 },
        {
          x: -150,
          opacity: 0,
          ...base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=120 top",
            end: "+=360",
            scrub: scrubSmooth,
          },
        }
      );

      /* RIGHT IMAGE */
      gsap.fromTo(
        rightImageRef.current,
        { x: 0, opacity: 1 },
        {
          x: 150,
          opacity: 0,
          ...base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=120 top",
            end: "+=360",
            scrub: scrubSmooth,
          },
        }
      );

      /* TITLE LINE 1 → LEFT */
      gsap.fromTo(
        titleLine1Ref.current,
        { x: 0, opacity: 1 },
        {
          x: -120,
          opacity: 0,
          ...base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=140 top",
            end: "+=300",
            scrub: scrubSmooth,
          },
        }
      );

      /* TITLE LINE 2 → TOP */
      gsap.fromTo(
        titleLine2Ref.current,
        { y: 0, opacity: 1 },
        {
          y: -80,
          opacity: 0,
          ...base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=170 top",
            end: "+=320",
            scrub: scrubSmooth,
          },
        }
      );

      /* TITLE LINE 3 → RIGHT */
      gsap.fromTo(
        titleLine3Ref.current,
        { x: 0, opacity: 1 },
        {
          x: 120,
          opacity: 0,
          ...base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=200 top",
            end: "+=340",
            scrub: scrubSmooth,
          },
        }
      );

      /* DESCRIPTION → BOTTOM */
      gsap.fromTo(
        descRef.current,
        { y: 0, opacity: 1 },
        {
          y: 120,
          opacity: 0,
          ...base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=240 top",
            end: "+=420",
            scrub: scrubSmooth,
          },
        }
      );

      /* HELLO */
      gsap.fromTo(
        helloRef.current,
        { y: 0, opacity: 1 },
        {
          y: 90,
          opacity: 0,
          ...base,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top+=280 top",
            end: "+=420",
            scrub: scrubSmooth,
          },
        }
      );

      /* LINES FADE */
      [leftLineRef.current, rightLineRef.current, horizontalLineRef.current].forEach(
        (line) => {
          gsap.fromTo(
            line,
            { opacity: 1 },
            {
              opacity: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top+=220 top",
                end: "+=420",
                scrub: 1,
              },
            }
          );
        }
      );

      /* PROJECTS */
      gsap.fromTo(
        projectsRef.current,
        { opacity: 0.4, scale: 1 },
        {
          opacity: 1,
          scale: 1.04,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen">

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
          <div className="col-span-6 flex flex-col items-center md:mt-[255px]">
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
          <div className="col-span-3 flex justify-end">
            <div ref={rightImageRef} className="mt-[170px] hidden lg:block">
              <Image src="/h2.png" alt="" width={392} height={392} />
            </div>
          </div>

        </div>
      </div>

      {/* PROJECTS */}
      <div ref={projectsRef} className="relative mt-8 md:-mt-16 lg:-mt-[60px] xl:-mt-[100px] 2xl:-mt-[110px]">
        <p className="text-[76px] md:text-[150px] lg:text-[190px] xl:text-[280px] 2xl:text-[300px] text-[#1F1E1C05] font-bold text-center">
          PROJECTS
        </p>
      </div>
    </section>
  );
}
