"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ========= Images ========= */
const upperImages = [
  { src: "/sm1.png", type: "small" },
  { src: "/sm2.jpg", type: "small" },
  { src: "/sm3.jpg", type: "small" },
  { src: "/sm4.png", type: "big" },
];

const lowerImages = [
  { src: "/sm4.png", type: "big" },
  { src: "/sm3.jpg", type: "small" },
  { src: "/sm2.jpg", type: "small" },
  { src: "/sm1.png", type: "small" },
];

/* ========= Card ========= */
const ImageCard = ({ src, type }) => {
  const widthClass =
    type === "big" ? "w-[421px]" : "w-[279px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`${widthClass} h-[439px] rounded-[32px] overflow-hidden
      border border-[#EFEFEF] bg-white
      shadow-[0_8px_24px_rgba(0,0,0,0.06)]
      flex-shrink-0`}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
};

/* ========= Main ========= */
export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const upperRowRef = useRef<HTMLDivElement>(null);
  const lowerRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1400",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Upper row → LEFT
      tl.to(upperRowRef.current, {
        x: -200,
        ease: "none",
      }, 0);

      // Lower row → RIGHT
      tl.to(lowerRowRef.current, {
        x: 200,
        ease: "none",
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#FEFCF6] py-16 md:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px] px-4 md:px-6">

        {/* ===== Mobile Heading ===== */}
        <div className="lg:hidden mb-10 text-center">
          <h2 className="text-4xl font-black text-[#141414]">
            Small Team
          </h2>
          <p className="text-4xl font-extrabold text-[#A0A4AA]">
            Big Result
          </p>
        </div>

        {/* ================= Row 1 ================= */}
        <div className="flex items-center justify-between mb-12">

          {/* Images */}
          <div className="overflow-x-hidden">
            <div
              ref={upperRowRef}
              className="flex gap-6 will-change-transform"
            >
              {upperImages.map((img, i) => (
                <ImageCard key={i} src={img.src} type={img.type} />
              ))}
            </div>
          </div>

          {/* Small Team */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:block pl-10"
          >
            <div className="leading-[0.9] text-right space-y-20">
              <div className="text-[92px] font-black text-[#141414]">
                Small
              </div>
              <div className="text-[92px] font-black text-[#141414]">
                Team
              </div>
            </div>
          </motion.div>
        </div>

        {/* ================= Row 2 ================= */}
        <div className="flex items-center justify-between">

          {/* Big Result */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="hidden lg:block pr-10"
          >
            <div className="leading-[0.9] space-y-20">
              <div className="text-[92px] font-extrabold text-[#A0A4AA]">
                Big
              </div>
              <div className="text-[92px] font-extrabold text-[#A0A4AA]">
                Result
              </div>
            </div>
          </motion.div>

          {/* Images */}
          <div className="overflow-x-hidden">
            <div
              ref={lowerRowRef}
              className="flex gap-6 will-change-transform"
            >
              {lowerImages.map((img, i) => (
                <ImageCard key={i} src={img.src} type={img.type} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
