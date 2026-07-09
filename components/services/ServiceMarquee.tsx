import { Fragment } from "react";
import { MARQUEE_ITEMS } from "@/lib/services-data";

type ServiceMarqueeProps = {
  className?: string;
};

const MARQUEE_COPIES = 4;

function MarqueeSeparator() {
  return (
    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-white" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none">
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
      className={`overflow-hidden bg-[linear-gradient(90deg,#0ec47b,#38f8ab,#15d286)] py-[14px] ${className}`.trim()}
      aria-hidden
    >
      <div className="flex w-max items-center gap-6 animate-[service-marquee-scroll_28s_linear_infinite]">
        {items.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span className="shrink-0 whitespace-nowrap font-montserrat text-[clamp(0.875rem,2vw,1.125rem)] font-semibold leading-none text-white">
              {item}
            </span>
            <MarqueeSeparator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
