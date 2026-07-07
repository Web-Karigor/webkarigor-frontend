import Image from "next/image";
import { TEAM_IMAGES } from "@/lib/home-assets";

const MOSAIC_IMAGES = [
  ...TEAM_IMAGES,
  "/s1.png",
  "/s2.png",
  "/s3.png",
  "/s4.png",
] as const;

const MOSAIC_SIZES = [
  "service-team-tile--tall",
  "service-team-tile--wide",
  "service-team-tile--square",
  "service-team-tile--square",
  "service-team-tile--wide",
  "service-team-tile--tall",
  "service-team-tile--square",
  "service-team-tile--square",
] as const;

export default function ServiceTeamMosaic() {
  return (
    <section className="service-team">
      <div className="service-section-wrap">
        <div className="service-team-head">
          <p className="service-team-watermark service-team-watermark--left">
            Big Result
          </p>
          <div className="service-section-head service-section-head--center">
            <span className="service-badge">Our Team</span>
            <h2 className="service-section-title">Expert Team</h2>
          </div>
          <p className="service-team-watermark service-team-watermark--right">
            Expert Team
          </p>
        </div>

        <div className="service-team-grid">
          {MOSAIC_IMAGES.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`service-team-tile ${MOSAIC_SIZES[index]}`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 45vw, 280px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
