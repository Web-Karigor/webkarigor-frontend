'use client'
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const embedUrl =
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=1&loop=1&playlist=dQw4w9WgXcQ";

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    let trigger: ScrollTrigger;

    const ctx = gsap.context(() => {
      // Start the video small and scale up as you scroll
      gsap.set(videoRef.current, {
        scale: 0.35,
        borderRadius: '2.5rem',
        yPercent: 0,
      });

      trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 10%",
        end: "top top",
        scrub: 0.7,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          gsap.to(videoRef.current, {
            scale: 0.35 + prog * (1 - 0.35),
            borderRadius: `${40 - prog * 40}px`, // 40px to 0px
            yPercent: prog * 0, // can add motion if you want
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-6 md:py-16 px-1 flex justify-center items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        ref={videoRef}
        className="relative w-full h-[50vw] md:h-[800px] flex justify-center items-center overflow-hidden rounded-[2.5rem] bg-black pointer-events-none mx-auto shadow-xl"
       
      >
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full scale-x-150 scale-y-125"
          title="About Video"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default VideoSection;