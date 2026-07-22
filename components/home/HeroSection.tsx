import "./HeroSection.css";
import Image from "next/image";
import StatsBadge from "@/components/home/StatsBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/**
 * Spacing uses CSS vars with 2xl Figma fallbacks.
 * Only lg (1024–1279) and xl (1280–1535) override those vars in HeroSection.css.
 * Mobile / md / 2xl stay on defaults / existing Tailwind.
 */
export default function HeroSection() {
  return (
    <section className="hero-section relative isolate bg-[#FFFDF6] max-md:min-h-0 max-md:h-auto md:min-h-screen md:h-screen">
      <span className="absolute left-[478px] top-0 hidden h-[720px] w-[1px] bg-[#DACFA7] 2xl:inline-block" />
      <span className="absolute right-[478px] top-0 hidden h-[720px] w-[1px] bg-[#DACFA7] 2xl:inline-block" />
      <span className="absolute left-1/2 top-[580px] hidden h-[1px] w-[942px] -translate-x-1/2 bg-[#DACFA7] 2xl:inline-block" />

      <div className="relative z-[2] mx-auto flex h-full max-w-[1899px] flex-col overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-start lg:grid-cols-12">
          <div className="hero-col-left col-span-12 mt-20 flex flex-col items-center gap-8 sm:mt-24 sm:gap-12 lg:col-span-3 lg:mt-[var(--hero-left-mt,90px)] lg:items-start lg:gap-[var(--hero-left-gap,80px)]">
            <StatsBadge />
            <span className="hero-photo-left mt-8 hidden lg:mt-[var(--hero-photo-left-mt,140px)] lg:block">
              <Image
                src="/h1.png"
                alt=""
                width={392}
                height={392}
                className="hero-photo-img h-auto w-full max-w-[280px] 2xl:max-w-[392px]"
              />
            </span>
          </div>

          <div className="hero-col-center col-span-12 mt-8 flex flex-col items-center sm:mt-12 lg:col-span-6 lg:mt-[var(--hero-center-mt,255px)]">
            <div className="max-w-[889px] px-1 text-center">
              <p className="hero-title">To deliver a 360</p>
              <span className="hero-subtitle md:-mt-4 lg:-mt-[var(--hero-title-pull,1.5rem)] block">
                AI driven solution
              </span>
              <p className="hero-title md:-mt-4 lg:-mt-[var(--hero-title-pull,1.5rem)]">
                project approach
              </p>
            </div>

            <p className="hero-desc mt-8 max-w-[840px] px-2 sm:mt-12 md:mt-[75px] lg:mt-[var(--hero-desc-mt,75px)]">
              Your <span className="hero-highlight">vision</span> deserves to grow.
              We create the brand identity, digital experience, and investor-ready
              story that help <span className="hero-badge">businesses</span> move
              faster with confidence.
            </p>

            <div className="hero-hello mt-4 px-2 md:mt-[60px] lg:mt-[var(--hero-hello-mt,60px)]">
              Say hello. We&apos;re listening
              <div className="flex -space-x-2">
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                  <AvatarImage src="https://github.com/maxleiter.png" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="col-span-12 flex justify-end lg:col-span-3">
            <div className="hero-photo-right mt-8 hidden lg:mt-[var(--hero-photo-right-mt,170px)] lg:block">
              <Image
                src="/h2.png"
                alt=""
                width={392}
                height={392}
                className="hero-photo-img h-auto w-full max-w-[280px] 2xl:max-w-[392px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-projects-wrap pointer-events-none absolute inset-x-0 bottom-0 z-[1]">
        <p className="hero-projects-text translate-y-[calc(54%+30px)] text-center font-bold leading-[0.9] text-[#1F1E1C] opacity-[0.07] md:translate-y-[56%] 2xl:translate-y-[64%]">
          PROJECTS
        </p>
      </div>
    </section>
  );
}
