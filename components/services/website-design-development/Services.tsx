"use client";

import { useMemo } from "react";
import {
  Laptop,
  MonitorCheck,
  Palette,
  ShoppingBag,
  SlidersHorizontal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useWebDesignDevelopmentServiceQuery } from "@/hooks/queries/useWebDesignDevelopmentServiceQuery";

const ICONS: Record<string, LucideIcon> = {
  corporate: MonitorCheck,
  custom: SlidersHorizontal,
  ecommerce: ShoppingBag,
  application: Laptop,
  redesign: Palette,
  maintenance: Wrench,
};

export default function Services() {
  const { data } = useWebDesignDevelopmentServiceQuery();

  const services = useMemo(
    () =>
      [...(data?.data?.posts ?? [])]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((post) => ({
          id: post.id,
          title: post.fields?.title?.trim() ?? "",
          description: post.fields?.description?.trim() ?? "",
          color: post.fields?.color?.trim() || "#12B76A",
          bg: post.fields?.bg?.trim() || "#E8F8F0",
          icon: post.fields?.icon?.trim() || "corporate",
          category: post.fields?.category?.trim() ?? "",
          tag: post.fields?.tag?.trim() ?? "",
        }))
        .filter((item) => item.title && item.description),
    [data],
  );

  if (!services.length) return null;

  return (
    <section className="bg-[#f8fafb] py-[clamp(48px,6vw,76px)]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 px-[clamp(20px,4vw,120px)] md:gap-10">
        <div className="flex w-full flex-col gap-5 max-md:items-center max-md:text-center md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="max-w-[560px] shrink-0 max-md:mx-auto">
            <p className="m-0 font-montserrat text-[15px] font-semibold leading-none text-[#00b873]">
              Our Services
            </p>
            <h2 className="mt-3 m-0 max-w-[540px] font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-[#0c0d0e] max-md:mx-auto">
              Our Web Design and Development Services
            </h2>
          </div>
          <p className="m-0 w-full max-w-[650px] font-manrope text-[16px] font-medium leading-[1.55] text-[#a4a8ad] max-md:mx-auto md:pb-0.5 lg:text-[18px]">
            Different businesses need different types of websites. Our web design and development services can be tailored to your project&apos;s goals, audience, features, speed, and future direction.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = ICONS[service.icon] ?? MonitorCheck;
            return (
              <article
                key={service.id}
                className="group flex min-h-[190px] w-full flex-col rounded-[16px] border border-[#edf0f1] border-l-2 border-l-[#00c982] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(31,41,55,0.04)] transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(31,41,55,0.09)] lg:min-h-[210px] lg:px-6 lg:py-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-montserrat text-[24px] font-bold leading-none text-[#e2e5e7]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-[6px]"
                    style={{ backgroundColor: service.bg, color: service.color }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                </div>
                <div className="mt-4 flex min-w-0 flex-1 flex-col">
                  <h2 className="m-0 font-montserrat text-[18px] font-bold leading-[1.25] text-[#18202a] lg:text-[20px]">
                    {service.title}
                  </h2>
                  <p className="mt-2 m-0 font-montserrat text-[14px] font-medium leading-[1.5] text-[#7f8b9b] lg:text-[15px]">
                    {service.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#edf0f1] pt-2 font-montserrat text-[11px] font-medium leading-none text-[#a9b2bf]">
                  <span>{service.category}</span>
                  <span className="shrink-0">{service.tag}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
