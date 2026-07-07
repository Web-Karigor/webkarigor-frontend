import Image from "next/image";
import ServiceMarquee from "@/components/services/ServiceMarquee";

const SHOWCASE_IMAGES = ["/s1.png", "/s2.png", "/s3.png", "/s4.png"] as const;

export default function ServiceShowcase() {
  return (
    <section className="service-showcase-section">
      <ServiceMarquee />

      <div className="service-showcase">
        <div className="service-showcase-glow" aria-hidden />

        <div className="service-showcase-stage">
          <div className="service-showcase-laptop">
            <Image
              src={SHOWCASE_IMAGES[0]}
              alt="Website showcase on desktop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 640px"
            />
          </div>

          <div className="service-showcase-tablet">
            <Image
              src={SHOWCASE_IMAGES[1]}
              alt="Website showcase on tablet"
              fill
              className="object-cover"
              sizes="280px"
            />
          </div>

          <div className="service-showcase-phones">
            {SHOWCASE_IMAGES.slice(2).map((src, index) => (
              <div key={src} className="service-showcase-phone">
                <Image
                  src={src}
                  alt={`Mobile showcase ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <ServiceMarquee />
    </section>
  );
}
