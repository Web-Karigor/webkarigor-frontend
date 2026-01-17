"use client";

import Image from "next/image";
import StatsBadge from "@/components/home/StatsBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen">
      <div className="relative mx-auto max-w-[1899px] px-10">

        {/* 🔹 LEFT VERTICAL LINE */}
        <span
          className="
            absolute
            left-[478px]
            h-[720px]
            w-[1px]
            bg-[#DACFA7]
          "
        />

        {/* 🔹 RIGHT VERTICAL LINE */}
        <span
          className="
            absolute
            right-[478px]
            h-[720px]
            w-[1px]
            bg-[#DACFA7]
          "
        />

        {/* 🔹 CENTER HORIZONTAL LINE */}
        <span
          className="
            absolute
            left-1/2
            top-[580px]
            -translate-x-1/2
            h-[1px]
            w-[942px]
            bg-[#DACFA7]
          "
        />

        {/* GRID */}
        <div className="grid grid-cols-12 items-start">

          {/* LEFT COLUMN */}
          <div className="col-span-3 flex flex-col gap-[80px] mt-[260px]">
            <StatsBadge />
            <Image src="/h1.png" alt="" width={392} height={392} />
          </div>

          {/* CENTER COLUMN */}
          <div className="col-span-6 flex flex-col items-center mt-[240px]">
            <div className="max-w-[889px] text-center">
              <p className="hero-title">To deliver a 360</p>
              <span className="hero-subtitle block -mt-6">
                AI driven solution
              </span>
              <p className="hero-title -mt-6">project approach</p>
            </div>

            <p className="hero-desc max-w-[840px] mt-[75px] font-medium">
              Your <span className="hero-highlight">vision</span> deserves to
              grow. We create the brand identity, digital experience, and
              investor-ready story that help{" "}
              <span className="hero-badge">businesses</span> move faster with
              confidence.
            </p>

            <div className="hero-hello mt-[60px] font-bold">
              Say hello. We’re listening
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-3 flex flex-col items-end">
            {/* CTA BUTTON – Figma exact */}
            <button
              className="
                inline-flex items-center gap-[10px]
                px-[24px] py-[24px]
                border border-[#000000]
                rounded-[12px]
                text-[#000000]
                font-bold
                text-[20px]
                leading-[1]
                mt-[41px]
                hover:bg-black hover:text-white
                mr-4
              "
            >
              Let’s get started
            </button>
            <div className="mt-[60px]">
            <Image src="/h2.png" alt="" width={392} height={392} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative -mt-48">
        <p className="text-[300px] text-[#1F1E1C05] font-bold text-center">
          PROJECTS
        </p>
      </div>
    </section>
  );
}
