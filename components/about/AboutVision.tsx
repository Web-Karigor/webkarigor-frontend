"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useAboutPageQuery } from "@/hooks/queries/useAboutPageQuery";
import { mapAboutVision } from "@/lib/about-page";

function VisionImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes={sizes}
      loading="lazy"
    />
  );
}

export default function AboutVision() {
  const { data } = useAboutPageQuery();
  const vision = useMemo(() => mapAboutVision(data), [data]);
  const hasImage = Object.values(vision.images).some((image) => image.src);

  if (!vision.title && !vision.lead && !hasImage) return null;

  return (
    <section className="about-vision bg-[#FFFEFB] pb-16 sm:pb-20 md:pb-28">
      <div className="mx-auto w-full max-w-[1800px] px-[clamp(16px,3.5vw,50px)]">
        <div className="w-full max-w-[1725px] text-left">
          <h2 className="about-vision-title m-0 font-montserrat text-[clamp(20px,2.2vw,30px)] font-medium leading-[160%] tracking-normal text-[#0A0A0A]">
            <span className="text-[clamp(36px,3.8vw,56px)] font-bold leading-[1.15] tracking-[-0.02em]">
              {vision.title}
            </span>{" "}
            {vision.lead}
          </h2>
        </div>

        <div className="about-vision-grid mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:gap-5 md:mt-14 md:grid-cols-[1.2fr_1fr] md:grid-rows-2 md:h-[min(780px,48vw)] md:gap-6">
          <div className="relative min-h-[320px] overflow-hidden rounded-[20px] sm:min-h-[400px] sm:rounded-[24px] md:row-span-2 md:min-h-0 md:rounded-[28px]">
            <VisionImage
              src={vision.images.large.src}
              alt={vision.images.large.alt}
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className="relative min-h-[200px] overflow-hidden rounded-[20px] sm:min-h-[240px] sm:rounded-[24px] md:min-h-0 md:rounded-[28px]">
            <VisionImage
              src={vision.images.top.src}
              alt={vision.images.top.alt}
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            <div className="relative min-h-[160px] overflow-hidden rounded-[16px] sm:min-h-[200px] sm:rounded-[20px] md:min-h-0 md:rounded-[28px]">
              <VisionImage
                src={vision.images.bottomLeft.src}
                alt={vision.images.bottomLeft.alt}
                sizes="(max-width: 768px) 50vw, 440px"
              />
            </div>
            <div className="relative min-h-[160px] overflow-hidden rounded-[16px] sm:min-h-[200px] sm:rounded-[20px] md:min-h-0 md:rounded-[28px]">
              <VisionImage
                src={vision.images.bottomRight.src}
                alt={vision.images.bottomRight.alt}
                sizes="(max-width: 768px) 50vw, 440px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
