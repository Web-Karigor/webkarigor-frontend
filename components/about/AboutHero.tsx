import { ABOUT_HERO_IMAGES, ABOUT_HERO_TITLE } from "@/lib/about-data";
import Carousel from "./Carousel";

export default function AboutHero() {
  return (
    <section className="about-hero relative overflow-x-clip bg-[#FFFEFB] pt-[110px] sm:pt-[130px] lg:pt-[150px]">
      <div className="w-full">
        <Carousel images={ABOUT_HERO_IMAGES} />
      </div>

      <div className="mx-auto w-full max-w-[1174px] px-[clamp(16px,4vw,40px)]">
        <h1 className="about-hero-title mx-auto mt-10 text-center font-montserrat text-[clamp(32px,4.2vw,60px)] font-bold leading-[150%] tracking-[-0.05em] text-black sm:mt-14 md:mt-16">
          {ABOUT_HERO_TITLE}
        </h1>
      </div>
    </section>
  );
}
