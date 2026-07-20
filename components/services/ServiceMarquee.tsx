import { Fragment } from "react";
import { MARQUEE_ITEMS } from "@/lib/services-data";

type ServiceMarqueeProps = {
  className?: string;
};

const MARQUEE_COPIES = 4;

function MarqueeSeparator() {
  return (
    <span className="service-marquee-separator" aria-hidden>
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
    <div className={`service-marquee ${className}`.trim()} aria-hidden>
      <div className="service-marquee-track">
        {items.map((item, index) => (
          <Fragment key={`${item}-${index}`}>
            <span className="service-marquee-label">{item}</span>
            <MarqueeSeparator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
