import Image from "next/image";
import { MANPOWER_HERO, MANPOWER_TRUSTED_LOGOS } from "@/lib/manpower-data";

export default function ManpowerTrusted() {
  return (
    <section className="bg-[#FFFEFB] pb-14 pt-10 lg:pb-16">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col items-center gap-7 px-[clamp(16px,3.5vw,50px)]">
        <p className="m-0 max-w-[640px] text-center font-montserrat text-[clamp(18px,1.6vw,24px)] font-bold leading-[1.35] text-[#18214D]">
          {MANPOWER_HERO.trustTitle}
        </p>

        <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:gap-3.5">
          {MANPOWER_TRUSTED_LOGOS.map((logo) => (
            <div
              key={logo.name}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-4 shadow-[0_2px_10px_rgba(24,33,77,0.04)] sm:h-[52px] sm:px-5"
            >
              <Image
                src={logo.src}
                alt=""
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
                unoptimized
              />
              <span className="font-montserrat text-[12px] font-semibold tracking-[-0.01em] text-[#344054] sm:text-[13px]">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
