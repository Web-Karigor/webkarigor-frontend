import Image from "next/image";
import homeContent from "@/data/home-content.json";
import "./HomeBanner.css";

const { backgroundImage, titleLines, description, ctaLabel } = homeContent.banner;

export default function HomeBanner() {
  return (
    <section className="w-full relative overflow-hidden py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[#5ee99e] via-[#b1e863] to-[#e6e85b]">
      {/* Absolute Bg Image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        className="object-cover object-center opacity-30 pointer-events-none select-none"
        style={{ zIndex: 0 }}
        priority
      />
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 gap-8">
        <div className="md:w-2/3 w-full">
          <h2 className="home-banner-title text-xl sm:text-2xl md:text-[32px] lg:text-[40px] font-bold font-montserrat text-black mb-2 flex flex-col gap-y-2 md:gap-y-5">
            {titleLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="text-base sm:text-lg md:text-[20px] font-montserrat font-medium text-[#222] mt-3 sm:mt-4">
            {description}
          </p>
        </div>
        <div className="md:w-auto w-full flex md:justify-end justify-center">
          <button
            className="w-full sm:w-auto rounded-xl bg-black px-6 sm:px-7 py-3 font-montserrat text-base sm:text-lg md:text-[18px] font-medium capitalize text-white transition hover:bg-[#1a1a1a]"
            style={{ minWidth: "min(100%, 170px)" }}
          >
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
