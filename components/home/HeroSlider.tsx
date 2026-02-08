"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = ["/s1.png", "/s2.png", "/s3.png", "/s4.png"];

export default function HeroSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  const [startIndex, setStartIndex] = useState(0);

  /* ---------------- SCROLL DRIVER ---------------- */
  useEffect(() => {
    let lastStep = 0;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=1600",
      pin: true,
      scrub: 1.2, // 🔥 smooth inertia
      anticipatePin: 1,

      onUpdate(self) {
        const step = Math.floor(self.progress * images.length);

        if (step !== lastStep) {
          setStartIndex((prev) =>
            self.direction > 0
              ? (prev + 1) % images.length
              : (prev - 1 + images.length) % images.length
          );
          lastStep = step;
        }
      },
    });

    return () => st.kill();
  }, []);

  /* ---------------- CONTINUOUS SLIDE (NO JUMP) ---------------- */
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, [startIndex]);

  /* ---------------- IMAGE SOFT FADE ---------------- */
  useLayoutEffect(() => {
    imgRefs.current.forEach((img) => {
      if (!img) return;

      gsap.fromTo(
        img,
        { autoAlpha: 0.85 },
        {
          autoAlpha: 1,
          duration: 0.6,
          ease: "power2.out",
          overwrite: true,
        }
      );
    });
  }, [startIndex]);

  const getImage = (offset: number) =>
    images[(startIndex + offset + images.length) % images.length];

  return (
    <section
      ref={sectionRef}
      className="slanted-wrapper lg:-mt-[260px] md:-mt-[180px] -mt-[160px]"
    >
      <div ref={containerRef} className="slanted-container">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`slanted-card card-${i + 1}`}>
            <img
              ref={(el) => (imgRefs.current[i] = el!)}
              src={getImage(i)}
              alt=""
              style={{ willChange: "opacity" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
