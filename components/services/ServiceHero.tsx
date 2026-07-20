"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";
import { Sparkles, TrendingUp } from "lucide-react";

const HERO_STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "300+", label: "Successful Projects" },
  { value: "200+", label: "Happy Clients" },
] as const;

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
    <section className="service-hero relative bg-[#f5f5f5] pb-[clamp(48px,6vw,72px)]">
      {/* Figma header — fixed top, 1920 × 108 hug, px 120 / py 24 */}
      <header className="fixed inset-x-0 top-0 z-[50] w-full bg-[#FFFEFB] shadow-[0_4px_8px_rgba(0,0,0,0.04)]">
        <div className="service-hero-align mx-auto flex h-[72px] w-full items-center justify-between sm:h-[88px] lg:h-[108px]">
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

      <div className="service-hero-align service-hero-shell relative z-[1] mx-auto w-full overflow-visible pt-4">
        <div className="service-hero-inner grid grid-cols-1 items-start gap-[clamp(36px,5vw,56px)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-[clamp(28px,3vw,48px)]">
          <div className="service-hero-copy max-w-[640px]">
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
              <span className="service-hero-title-line block">Project Approach</span>
            </h1>

            <p className="mt-[clamp(16px,2.5vw,24px)] max-w-[560px] font-montserrat text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-[1.7] text-[#6b6b6b]">
              Your vision deserves to grow. We create the brand identity, digital
              experience, and investor-ready story that help businesses move faster
              with confidence.
            </p>

            <form className="mt-[clamp(24px,3vw,32px)] flex flex-col gap-3 rounded-[20px] bg-white p-[clamp(18px,2.5vw,22px)] shadow-[0_16px_48px_rgba(0,0,0,0.07)]" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="min-h-[52px] w-full resize-vertical rounded-xl border border-transparent bg-[#f3f3f1] px-4 py-[14px] font-montserrat text-[0.9375rem] text-[#1f1e1c] outline-none transition-[border-color,background-color] placeholder:text-[#9a9a9a] focus:border-[rgba(56,248,171,0.7)] focus:bg-white"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Mobile"
                  className="min-h-[52px] w-full resize-vertical rounded-xl border border-transparent bg-[#f3f3f1] px-4 py-[14px] font-montserrat text-[0.9375rem] text-[#1f1e1c] outline-none transition-[border-color,background-color] placeholder:text-[#9a9a9a] focus:border-[rgba(56,248,171,0.7)] focus:bg-white"
                  required
                />
              </div>

              <textarea
                name="details"
                rows={4}
                placeholder="Project Details"
                className="min-h-[120px] w-full resize-vertical rounded-xl border border-transparent bg-[#f3f3f1] px-4 py-[14px] font-montserrat text-[0.9375rem] text-[#1f1e1c] outline-none transition-[border-color,background-color] placeholder:text-[#9a9a9a] focus:border-[rgba(56,248,171,0.7)] focus:bg-white"
                required
              />

              <button type="submit" className="mt-1 min-h-[54px] w-full cursor-pointer rounded-xl border-0 bg-[linear-gradient(90deg,#38f8ab_0%,#8ef0a8_55%,#c8f57a_100%)] font-montserrat text-base font-bold text-white transition-[opacity,transform] hover:-translate-y-px hover:opacity-95">
                Start Your Project
              </button>
            </form>
          </div>

          <div className="service-hero-visual w-full max-w-[620px] overflow-visible lg:ml-auto lg:justify-self-end">
            <div className="service-hero-image-shell">
              <div className="service-hero-image-wrap">
                <Image
                  src="/sm2.jpg"
                  alt="Team member working on a project"
                  fill
                  className="service-hero-image object-cover"
                  sizes="(max-width: 1024px) 100vw, 620px"
                  priority
                />
              </div>

              <div className="service-hero-chip service-hero-chip--ai">
                <Sparkles className="service-hero-chip-sparkle" aria-hidden />
                <span>AI driven solution</span>
              </div>

              <div className="service-hero-chip service-hero-chip--conversion">
                <span className="service-hero-chip-icon" aria-hidden>
                  <TrendingUp className="service-hero-chip-trend" />
                </span>
                <span className="service-hero-chip-copy">
                  <span className="service-hero-chip-label">Conversion Rate</span>
                  <strong className="service-hero-chip-value">+240%</strong>
                </span>
              </div>
            </div>

            <div className="service-hero-stats">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="service-hero-stat">
                  <span className="service-hero-stat-value">{stat.value}</span>
                  <span className="service-hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
