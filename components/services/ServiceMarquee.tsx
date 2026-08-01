import { Fragment } from "react";
import serviceSharedContent from "@/data/service-shared-content.json";

type ServiceMarqueeProps = {
  className?: string;
};

const MARQUEE_COPIES = 4;
const MARQUEE_ITEMS = serviceSharedContent.marquee.items;

function MarqueeSeparator() {
  return (
    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-white" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path
          d="M9.1 5.8a7 7 0 0 1 5.8 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18.2 9.1a7 7 0 0 1 0 5.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M14.9 18.2a7 7 0 0 1-5.8 0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5.8 14.9a7 7 0 0 1 0-5.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export default function ServiceMarquee({ className = "" }: ServiceMarqueeProps) {
  const items = Array.from({ length: MARQUEE_COPIES }, () => MARQUEE_ITEMS).flat();

  return (
    <div
      className={`overflow-hidden bg-gradient-to-r from-[#0ec47b] via-[#38f8ab] to-[#15d286] px-[clamp(24px,6.25vw,120px)] py-[18px] ${className}`.trim()}
      aria-hidden
    >
      <div className="flex w-max animate-marquee-scroll items-center gap-[clamp(32px,4vw,64px)]">
        {items.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span className="shrink-0 whitespace-nowrap font-manrope text-[clamp(1.125rem,2.2vw,2rem)] font-bold leading-[120%] text-white">
              {item}
            </span>
            <MarqueeSeparator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
