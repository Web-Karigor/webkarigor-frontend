"use client";

import { useMemo } from "react";
import { useAboutPageQuery } from "@/hooks/queries/useAboutPageQuery";
import { mapAboutHero } from "@/lib/about-page";
import Carousel from "./Carousel";

export default function AboutHero() {
  const { data } = useAboutPageQuery();
  const hero = useMemo(() => mapAboutHero(data), [data]);

  if (!hero.images.length && !hero.title) return null;

  return (
    <section className="about-hero relative overflow-x-clip bg-[#FFFEFB] pt-6 sm:pt-6 md:pt-[130px] lg:pt-[150px]">
      <div className="w-full">
        {hero.images.length ? <Carousel images={hero.images} /> : null}
      </div>

      <div className="mx-auto w-full max-w-[1174px] px-[clamp(16px,4vw,40px)]">
        <h1 className="about-hero-title mx-auto mt-10 text-center font-montserrat text-[clamp(32px,4.2vw,60px)] font-bold leading-[150%] tracking-[-0.05em] text-black sm:mt-14 md:mt-16">
          {hero.title}
        </h1>
      </div>
    </section>
  );
}
