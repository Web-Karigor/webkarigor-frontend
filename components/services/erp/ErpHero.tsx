"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { openConsultationModal } from "@/components/home/ConsultationModal";
import { useErpPageQuery } from "@/hooks/queries/useErpPageQuery";
import { ERP_TRUSTED_LOGOS } from "@/lib/erp-data";
import {
  erpSectionItem,
  parseErpContact,
  splitErpHeroTitle,
} from "@/lib/erp-page";

const TITLE_UNDERLINE = "/services/service-hero-underline.png";

export default function ErpHero() {
  const { data } = useErpPageQuery();
  console.log(data);
  const item = erpSectionItem(data?.data?.sections?.hero);

  console.log(item);
  if (!item) return null;

  const title = item.title?.trim() ?? "";
  const subtitle = item.subtitle?.trim() ?? "";
  const buttonText = item.button_text?.trim() ?? "";
  const imageUrl = item.image?.url?.trim() ?? "";
  const { label: hotlineLabel, phone: hotline } = parseErpContact(
    item.contact ?? "",
  );
  const { line1, line2, brand } = splitErpHeroTitle(title);

  if (!title || !subtitle || !buttonText || !imageUrl || !hotline) {
    return null;
  }

  const telHref = `tel:${hotline.replace(/[^\d+]/g, "")}`;

  return (
    <section className="erp-hero relative overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-[1850px] px-[clamp(16px,3.5vw,50px)] pb-14 pt-6 md:pt-[100px] lg:pb-20 lg:pt-[128px]">
        <div className="erp-hero-split flex w-full flex-col items-stretch gap-12 py-4 max-md:gap-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-12">
          <div className="erp-hero-copy flex shrink-0 flex-col justify-center max-md:items-center max-md:text-center lg:min-h-[388px]">
            <h1 className="m-0 font-montserrat text-[clamp(1.5rem,6.6vw,1.8rem)] font-bold leading-[1.2] tracking-[-0.03em] text-[#111827] md:text-[clamp(2.5rem,4.5vw,3.75rem)] md:leading-[1.12]">
              {line1}
              {line2 ? (
                <>
                  <br />
                  {line2}
                </>
              ) : null}
              {brand ? (
                <>
                  <br />
                  <span className="relative inline-block">
                    {brand}
                    <Image
                      src={TITLE_UNDERLINE}
                      alt=""
                      width={350}
                      height={5}
                      className="absolute left-0 top-[calc(100%+4px)] h-auto"
                      unoptimized
                      loading="lazy"
                    />
                  </span>
                </>
              ) : null}
            </h1>

            <p className="mt-6 m-0 max-w-[520px] font-manrope text-[18px] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7] max-md:mx-auto max-md:text-[17px]">
              {subtitle}
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-3 md:flex-row md:flex-wrap md:items-center md:gap-4">
              <button
                type="button"
                onClick={() => openConsultationModal()}
                className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border-0 bg-[#0EC47B] px-8 py-3.5 font-montserrat text-[15px] font-bold text-white shadow-[0_10px_28px_rgba(14,196,123,0.35)] transition-opacity hover:opacity-90 md:w-auto"
              >
                {buttonText}
              </button>
              <a
                href={telHref}
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#D0D5DD] bg-white px-5 py-3.5 font-montserrat text-[14px] font-semibold text-[#111827] transition-colors hover:bg-black/[0.03] md:w-auto"
              >
                <Phone className="h-4 w-4 shrink-0 text-[#111827]" aria-hidden />
                {hotlineLabel}: {hotline}
              </a>
            </div>
          </div>

          <div className="erp-hero-visual relative w-full max-w-[840px] shrink-0 pt-0 max-lg:mx-auto lg:ml-auto lg:pt-14">
            <div className="relative aspect-[18/13] w-full">
              <Image
                src={imageUrl}
                alt={item.image?.alt_text || title}
                fill
                className="rounded-none object-contain shadow-[0_24px_64px_rgba(0,0,0,0.12)] md:rounded-[20px] md:object-cover"
                sizes="(100vw)"
                unoptimized
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#F8F9FC]">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-8 px-[clamp(16px,3.5vw,50px)] py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-10">
            {ERP_TRUSTED_LOGOS.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={100}
                height={100}
                className="h-20 w-auto object-contain sm:h-14"
                unoptimized
                loading="lazy"
              />
            ))}
          </div>
          <div className="flex h-auto w-full max-w-[566px] shrink-0 flex-col gap-5 text-center max-md:mx-auto sm:w-[566px] sm:text-right">
            <p className="m-0 font-montserrat text-[36px] font-bold leading-[1.3] tracking-[-0.02em] text-[#183B56]">
              Built on Trust, Strengthened by Collaboration
            </p>
            <p className="m-0 font-montserrat text-[16px] font-medium leading-[1.55] text-[#5A7184]">
              We are proud to have worked with clients in a variety of
              industries, fostering a sense of collaboration, reliability, and a
              shared dedication to successful outcomes at Web Karigor.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
