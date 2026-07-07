import { MARQUEE_ITEMS } from "@/lib/services-data";

type ServiceMarqueeProps = {
  className?: string;
};

export default function ServiceMarquee({ className = "" }: ServiceMarqueeProps) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className={`service-marquee ${className}`.trim()} aria-hidden>
      <div className="service-marquee-track">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="service-marquee-item">
            {item}
            <span className="service-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
