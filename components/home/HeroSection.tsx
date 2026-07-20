import Image from "next/image";
import StatsBadge from "@/components/home/StatsBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeroSection() {
  return (
    <section className="relative isolate min-h-screen h-screen bg-[#FFFDF6]">
      <span className="absolute left-[478px] top-0 hidden h-[720px] w-[1px] bg-[#DACFA7] 2xl:inline-block" />
      <span className="absolute right-[478px] top-0 hidden h-[720px] w-[1px] bg-[#DACFA7] 2xl:inline-block" />
      <span className="absolute left-1/2 top-[580px] hidden h-[1px] w-[942px] -translate-x-1/2 bg-[#DACFA7] 2xl:inline-block" />

      <div className="relative z-[2] mx-auto h-full max-w-[1899px] overflow-x-hidden px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 items-start lg:grid-cols-12">
          <div className="col-span-12 mt-20 flex flex-col items-center gap-8 sm:mt-24 sm:gap-12 lg:col-span-3 lg:mt-[90px] lg:items-start lg:gap-[80px]">
            <StatsBadge />
            <span className="mt-8 hidden lg:mt-[140px] lg:block">
              <Image
                src="/h1.png"
                alt=""
                width={392}
                height={392}
                className="h-auto w-full max-w-[280px] xl:max-w-[392px]"
              />
            </span>
          </div>

          <div className="col-span-12 mt-8 flex flex-col items-center sm:mt-12 lg:col-span-6 lg:mt-[255px]">
            <div className="max-w-[889px] px-1 text-center">
              <p className="hero-title">To deliver a 360</p>
              <span className="hero-subtitle md:-mt-4 lg:-mt-6 block">
                AI driven solution
              </span>
              <p className="hero-title md:-mt-4 lg:-mt-6">project approach</p>
            </div>

            <p className="hero-desc mt-8 max-w-[840px] px-2 sm:mt-12 md:mt-[75px]">
              Your <span className="hero-highlight">vision</span> deserves to grow.
              We create the brand identity, digital experience, and investor-ready
              story that help <span className="hero-badge">businesses</span> move
              faster with confidence.
            </p>

            <div className="hero-hello mt-8 px-2 sm:mt-12 md:mt-[60px]">
              Say hello. We’re listening
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
            <div className="mt-8 hidden lg:mt-[170px] lg:block">
              <Image
                src="/h2.png"
                alt=""
                width={392}
                height={392}
                className="h-auto w-full max-w-[280px] xl:max-w-[392px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] overflow-visible">
        <p className="translate-y-[54%] text-center text-[clamp(48px,18vw,76px)] font-bold leading-[0.9] text-[#1F1E1C] opacity-[0.07] md:translate-y-[56%] md:text-[clamp(100px,16vw,150px)] lg:translate-y-[58%] lg:text-[190px] xl:translate-y-[60%] xl:text-[280px] 2xl:translate-y-[64%] 2xl:text-[300px]">
          PROJECTS
        </p>
      </div>
    </section>
  );
}
