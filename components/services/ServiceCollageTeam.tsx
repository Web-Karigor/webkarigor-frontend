import Image from "next/image";
import type { CSSProperties } from "react";

import "@/components/services/website-design-development/Team.css";

const ASSET = "/services/website-design-development/team";

/** Right-group bounds from Figma node 4428:2566. */
const GROUP = {
  x: 634,
  y: 434,
  w: 651.6686401367188,
  h: 663.1011352539062,
} as const;

const DEFAULT_PHOTOS = {
  left: "/team/faruque.jpg",
  right: "/team/juel.jpg",
  bottom: "/team/imran.jpg",
  large: "/team/sawan.jpg",
  center: "/team/sajjad.jpg",
} as const;

function box(x: number, y: number, w: number, h: number): CSSProperties {
  return {
    left: `${((x - GROUP.x) / GROUP.w) * 100}%`,
    top: `${((y - GROUP.y) / GROUP.h) * 100}%`,
    width: `${(w / GROUP.w) * 100}%`,
    height: `${(h / GROUP.h) * 100}%`,
    maxWidth: "none",
  };
}

function Collage({
  fluid = false,
  centerSrc,
}: {
  fluid?: boolean;
  centerSrc: string;
}) {
  return (
    <div className="wdd-collage" aria-hidden>
      <img
        className="wdd-layer wdd-ring"
        src={`${ASSET}/ring.svg`}
        alt=""
        style={
          fluid
            ? undefined
            : box(183, 0, 1553.861083984375, 1553.861083984375)
        }
      />
      <img
        className="wdd-layer wdd-dots"
        src={`${ASSET}/dots.svg`}
        alt=""
        style={box(1014, 579, 122.904296875, 145.765625)}
      />
      <img
        className="wdd-layer wdd-dots"
        src={`${ASSET}/dots.svg`}
        alt=""
        style={box(844, 901, 122.904296875, 145.765625)}
      />
      <span
        className="wdd-layer wdd-circle wdd-circle-green"
        style={box(1239.9375, 664.083984375, 45.73113250732422, 45.73113250732422)}
      />
      <span
        className="wdd-layer wdd-circle wdd-circle-gray"
        style={box(634, 735.541015625, 34.29834747314453, 34.29834747314453)}
      />

      <span
        className="wdd-layer wdd-shadow wdd-shadow-25 wdd-radius-sm"
        style={box(651.150390625, 616.92578125, 137.19338989257812, 137.19338989257812)}
      />
      <Portrait
        src={DEFAULT_PHOTOS.left}
        alt="Team member"
        className="wdd-photo-beard wdd-radius-sm"
        style={box(651.150390625, 616.92578125, 137.19338989257812, 137.19338989257812)}
      />

      <Portrait
        src={DEFAULT_PHOTOS.right}
        alt="Team member"
        className="wdd-photo-woman wdd-radius-sm wdd-photo-shadow"
        style={box(1094, 774, 137.19338989257812, 137.19338989257812)}
      />

      <span
        className="wdd-layer wdd-shadow wdd-shadow-15 wdd-radius-sm"
        style={box(765.48046875, 925.609375, 171.4917449951172, 171.4917449951172)}
      />
      <Portrait
        src={DEFAULT_PHOTOS.bottom}
        alt="Team member"
        className="wdd-photo-hoodie wdd-radius-sm"
        style={box(765.48046875, 925.609375, 171.4917449951172, 171.4917449951172)}
      />

      <span
        className="wdd-layer wdd-shadow wdd-shadow-25 wdd-radius-lg"
        style={box(1039.86328125, 434, 228.6556396484375, 257.23760986328125)}
      />
      <Portrait
        src={DEFAULT_PHOTOS.large}
        alt="Team member"
        className="wdd-photo-large wdd-radius-lg"
        style={box(1039.86328125, 434, 228.6556396484375, 257.23760986328125)}
      />

      <span
        className="wdd-layer wdd-shadow wdd-shadow-20 wdd-radius-sm"
        style={box(879.8046875, 754.1171875, 91.46226501464844, 91.46226501464844)}
      />
      <Portrait
        src={centerSrc}
        alt="Team member"
        className="wdd-photo-cap wdd-radius-sm"
        style={box(864, 739, 123, 122)}
      />
    </div>
  );
}

function Portrait({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className: string;
  style: CSSProperties;
}) {
  return (
    <div className={`wdd-layer wdd-photo ${className}`} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1023px) 42vw, 229px"
        className="object-cover"
      />
    </div>
  );
}

export default function ServiceCollageTeam({
  leftTitle,
  rightTitle,
  centerSrc = DEFAULT_PHOTOS.center,
  leftWidth = 632,
  rightWidth = 398,
  rightTop = 647,
}: {
  leftTitle: string;
  rightTitle: string;
  centerSrc?: string;
  leftWidth?: number;
  rightWidth?: number;
  rightTop?: number;
}) {
  const label = `${leftTitle}, ${rightTitle}`;

  return (
    <section
      className="wdd-team"
      aria-label={label}
      style={
        {
          "--team-left-width": `${leftWidth}px`,
          "--team-right-width": `${rightWidth}px`,
          "--team-right-top": `${rightTop}px`,
          "--team-left-em": `${leftWidth / 80}em`,
          "--team-right-em": `${rightWidth / 80}em`,
        } as CSSProperties
      }
    >
      <div className="wdd-team-desktop">
        <div className="wdd-team-scale">
          <div className="wdd-team-canvas">
            <h2 className="wdd-canvas-heading">
              <span className="wdd-figma-title wdd-figma-title-left">{leftTitle}</span>
              <span className="wdd-figma-title wdd-figma-title-right">{rightTitle}</span>
            </h2>
            <Collage centerSrc={centerSrc} />
          </div>
        </div>
      </div>

      <div className="wdd-compact">
        <h2 className="wdd-compact-heading">
          <span className="wdd-compact-line wdd-compact-left">{leftTitle}</span>
          <span className="wdd-compact-line wdd-compact-right">{rightTitle}</span>
        </h2>
        <Collage fluid centerSrc={centerSrc} />
      </div>
    </section>
  );
}
