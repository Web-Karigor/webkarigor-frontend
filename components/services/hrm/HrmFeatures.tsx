"use client";

import { useMemo } from "react";
import {
  CalendarDays,
  TrendingUp,
  UserPlus,
  Wallet,
  Workflow,
  Users,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { useHrmPageQuery } from "@/hooks/queries/useHrmPageQuery";
import { useHrmServicesQuery } from "@/hooks/queries/useHrmServicesQuery";
import {
  extractHrmLeadText,
  hrmSectionItem,
} from "@/lib/hrm-page";

const ICONS: Record<string, LucideIcon> = {
  users: Users,
  workflow: Workflow,
  wallet: Wallet,
  chart: TrendingUp,
  calendar: CalendarDays,
  settings: Settings,
  "user-plus": UserPlus,
};

export default function HrmFeatures() {
  const { data: pageData } = useHrmPageQuery();
  const { data } = useHrmServicesQuery();

  const heading = hrmSectionItem(pageData?.data?.sections?.why_webkarigor);
  const eyebrow = heading?.title?.trim() ?? "";
  const title = heading?.subtitle?.trim() ?? "";
  const lead = extractHrmLeadText(heading?.content ?? "");

  const features = useMemo(
    () =>
      [...(data?.data?.posts ?? [])]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((post) => ({
          id: post.id,
          title: post.fields?.title?.trim() ?? "",
          description: post.fields?.description?.trim() ?? "",
          color: post.fields?.color?.trim() || "#2563EB",
          bg: post.fields?.bg?.trim() || "#EFF6FF",
          icon: post.fields?.icon?.trim() || "users",
        }))
        .filter((item) => item.title && item.description),
    [data],
  );

  if (!features.length || !eyebrow || !title || !lead) return null;

  return (
    <section className="erp-features bg-white py-[clamp(48px,6vw,80px)]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 px-[clamp(16px,4vw,120px)] md:gap-10 lg:gap-12">
        <div className="erp-features-head flex w-full flex-col gap-5 max-md:items-center max-md:text-center md:gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="erp-features-copy max-w-[640px] shrink-0 max-md:mx-auto">
            <p className="m-0 font-montserrat text-[16px] font-semibold leading-none text-[#15d286] sm:text-[18px]">
              {eyebrow}
            </p>
            <h2 className="mt-3 m-0 font-montserrat text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.15] tracking-[-0.02em] text-black">
              {title}
            </h2>
          </div>
          <p className="erp-features-lead m-0 w-full max-w-[650px] font-manrope text-[clamp(15px,1.5vw,18px)] font-semibold leading-[150%] tracking-[0] text-[#A7A7A7] max-md:mx-auto lg:shrink-0">
            {lead}
          </p>
        </div>

        <div className="erp-features-grid mx-auto grid w-full  grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-8 lg:gap-[52px]">
          {features.map((feature) => {
            const Icon = ICONS[feature.icon] ?? Users;
            return (
              <article
                key={feature.id}
                className="erp-feature-card flex h-full w-full items-start gap-5 rounded-[20px] border-[0.5px] border-[#E0E0E0] bg-white p-6 shadow-[0_26px_60px_rgba(0,0,0,0.05)] md:gap-6 md:rounded-[22px] md:p-8 lg:gap-6 lg:rounded-[24px] lg:p-12"
              >
                <span
                  className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: feature.bg,
                    color: feature.color,
                  }}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>

                <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-2.5">
                  <h3 className="m-0 font-montserrat text-[17px] font-bold leading-[1.25] text-[#1D2939] md:text-[18px] lg:text-[20px]">
                    {feature.title}
                  </h3>
                  <p className="m-0 font-montserrat text-[14px] font-medium leading-[1.6] text-[#475467] md:text-[14px] lg:text-[15px]">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
