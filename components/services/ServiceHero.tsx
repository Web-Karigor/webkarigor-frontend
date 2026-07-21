"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { Sparkles, TrendingUp } from "lucide-react";
import { SERVICE_PAGE_GUTTER } from "@/lib/service-layout";

const HERO_STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "300+", label: "Successful Projects" },
  { value: "200+", label: "Happy Clients" },
] as const;

const FIELD_CLASS =
  "min-h-[52px] w-full resize-y rounded-xl border border-transparent bg-[#f3f3f1] px-4 py-[14px] font-montserrat text-[0.9375rem] text-[#1f1e1c] outline-none transition-[border-color,background-color] placeholder:text-[#9a9a9a] focus:border-[rgba(56,248,171,0.7)] focus:bg-white";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function ServiceHero() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="relative overflow-visible bg-[#f5f5f5] pb-[clamp(48px,6vw,72px)] pt-[120px]">
      <header className="fixed inset-x-0 top-0 z-[50] w-full bg-[#FFFEFB] shadow-[0_4px_8px_rgba(0,0,0,0.04)]">
        <div className={`${SERVICE_PAGE_GUTTER} flex h-[72px] items-center justify-between sm:h-[88px] lg:h-[108px]`}>
          <Link
            href="/"
            className="font-museoModerno text-[clamp(22px,2vw,28px)] font-semibold leading-none text-black"
          >
            Webkarigor
          </Link>
          <Link
            href="#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#0EC47B] px-5 py-2.5 font-montserrat text-[clamp(13px,1vw,15px)] font-bold text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-3"
          >
            Get a Quote
          </Link>
        </div>
      </header>

      <div className={`${SERVICE_PAGE_GUTTER} relative z-[1] overflow-visible pt-4`}>
        <div className="grid grid-cols-1 items-start gap-[clamp(36px,5vw,56px)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-[clamp(28px,3vw,48px)]">
          <div className="max-w-[640px]">
            <Link
              href="https://wa.me/8801624283328"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(31,30,28,0.14)] bg-white px-[18px] py-2.5 font-montserrat text-sm font-medium text-[#1f1e1c] no-underline transition-[border-color,box-shadow] hover:border-[rgba(56,248,171,0.65)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
            >
              <WhatsAppIcon />
              <span>Say hello: 01624-283328</span>
            </Link>

            <h1 className="mt-[clamp(18px,2.5vw,28px)] font-montserrat text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.04em] text-[#1f1e1c]">
              To Deliver a 360
              <span className="block">Project Approach</span>
            </h1>

            <p className="mt-[clamp(16px,2.5vw,24px)] max-w-[560px] font-montserrat text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-[1.7] text-[#6b6b6b]">
              Your vision deserves to grow. We create the brand identity, digital
              experience, and investor-ready story that help businesses move faster
              with confidence.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-[clamp(24px,3vw,32px)] flex flex-col gap-3 rounded-[20px] bg-white p-[clamp(18px,2.5vw,22px)] shadow-[0_16px_48px_rgba(0,0,0,0.07)]"
            >
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input type="text" name="name" placeholder="Your Name" className={FIELD_CLASS} required />
                <input type="tel" name="phone" placeholder="Mobile" className={FIELD_CLASS} required />
              </div>

              <textarea
                name="details"
                rows={4}
                placeholder="Project Details"
                className={`${FIELD_CLASS} min-h-[120px]`}
                required
              />

              <button
                type="submit"
                className="mt-1 min-h-[54px] w-full cursor-pointer rounded-xl border-0 bg-[linear-gradient(90deg,#38f8ab_0%,#8ef0a8_55%,#c8f57a_100%)] font-montserrat text-base font-bold text-white transition-[opacity,transform] hover:-translate-y-px hover:opacity-95"
              >
                Start Your Project
              </button>
            </form>
          </div>

          <div className="mx-auto w-full max-w-[620px] overflow-visible pt-3 lg:ml-auto lg:justify-self-end lg:pt-0">
            <div className="relative aspect-[1/1.05] w-full max-h-[620px] overflow-visible">
              <div className="absolute inset-0 overflow-hidden rounded-[clamp(96px,15vw,160px)_clamp(8px,1vw,14px)_clamp(96px,15vw,160px)_clamp(36px,5vw,52px)] shadow-[0_24px_64px_rgba(0,0,0,0.12)]">
                <Image
                  src="/sm2.jpg"
                  alt="Team member working on a project"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 620px"
                  priority
                />
              </div>

              <div className="absolute top-4 left-[4%] z-[3] inline-flex max-w-[calc(100%-8%)] items-center gap-2.5 whitespace-nowrap rounded-full bg-white px-3.5 py-2 font-montserrat text-[13px] font-semibold text-[#15d286] shadow-[0_12px_32px_rgba(0,0,0,0.16)] sm:top-6 sm:left-[2%] sm:max-w-[calc(100%-4%)] sm:-translate-x-[8%] sm:px-4 sm:py-2.5 sm:text-sm lg:top-8 lg:left-0 lg:max-w-none lg:-translate-x-1/4 lg:px-5 lg:py-3 lg:text-[clamp(0.875rem,1.2vw,1rem)] xl:-translate-x-[36%]">
                <Sparkles className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 lg:h-[18px] lg:w-[18px]" aria-hidden />
                <span>AI driven solution</span>
              </div>

              <div className="absolute right-[4%] bottom-[clamp(40px,12%,72px)] z-[3] flex max-w-[calc(100%-8%)] items-center gap-2.5 rounded-2xl bg-white p-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.16)] sm:right-[2%] sm:bottom-[clamp(48px,13%,80px)] sm:max-w-[calc(100%-4%)] sm:translate-x-[8%] sm:rounded-[18px] sm:p-3 lg:right-0 lg:bottom-[clamp(56px,14%,92px)] lg:max-w-none lg:translate-x-1/4 lg:p-[14px_18px] xl:translate-x-[36%]">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#38f8ab] to-[#15d286] text-white sm:h-10 sm:w-10 lg:h-11 lg:w-11" aria-hidden>
                  <TrendingUp className="h-[18px] w-[18px] lg:h-5 lg:w-5" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-montserrat text-[clamp(0.75rem,1vw,0.8125rem)] font-medium text-[#8a8a8a]">
                    Conversion Rate
                  </span>
                  <strong className="font-montserrat text-[clamp(1.125rem,1.6vw,1.375rem)] font-bold leading-none text-[#1f1e1c]">
                    +240%
                  </strong>
                </span>
              </div>
            </div>

            <div className="mt-[clamp(24px,3vw,32px)] grid grid-cols-3 gap-[clamp(12px,2vw,24px)] text-center">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <span className="block font-montserrat text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1f1e1c]">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block font-montserrat text-[clamp(0.75rem,1.2vw,0.9375rem)] font-medium leading-[1.35] text-[#7a7a7a]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
