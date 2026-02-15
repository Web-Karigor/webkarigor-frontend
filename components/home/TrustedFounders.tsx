"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = ["/s1.png", "/s2.png", "/s3.png", "/s4.png"];

export default function TrustedFounders() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLImageElement[]>([]);

  const [startIndex, setStartIndex] = useState(0);

  /* ---------------- SCROLL + PIN ---------------- */
  useEffect(() => {
    let lastStep = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1600",
        pin: true,
        scrub: true,
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
      },
    });

    // Smooth slide left-right
    tl.fromTo(
      containerRef.current,
      { x: -80 },
      { x: 80, ease: "none" }
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  /* ---------------- IMAGE SOFT BLEND ---------------- */
  useLayoutEffect(() => {
    imgRefs.current.forEach((img) => {
      if (!img) return;

      gsap.fromTo(
        img,
        { autoAlpha: 0.9 },
        {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
          overwrite: true,
        }
      );
    });
  }, [startIndex]);

  const getImage = (offset: number) =>
    images[(startIndex + offset + images.length) % images.length];

  return (
    <section ref={sectionRef} className="trusted-wrapper">
      <div className="trusted-layout">

        {/* LEFT TEXT */}
        <div className="trusted-text -mb-[280px] ml-[100px]">
          <span className="trusted-badge">Testimonials</span>
          <h2 className="trusted-heading text-[72px] font-bold">
            Trusted <br />
            by <br />
            <span className="text-[#BABABA] font-museoModerno font-bold">
              Founders
            </span>
          </h2>
        </div>

        {/* RIGHT IMAGES */}
        <div
          ref={containerRef}
          className="trusted-image-row"
          style={{ willChange: "transform" }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`trusted-image-card size-${i + 1}`}
            >
              <img
                ref={(el) => (imgRefs.current[i] = el!)}
                src={getImage(i)}
                alt=""
                style={{ willChange: "opacity" }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
