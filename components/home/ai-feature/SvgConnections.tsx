import type { CircuitGeometry } from "./types";
import TopLeftPath from "./paths/TopLeftPath";
import TopCenterPath from "./paths/TopCenterPath";
import TopRightPath from "./paths/TopRightPath";
import BottomLeftPath from "./paths/BottomLeftPath";
import BottomCenterPath from "./paths/BottomCenterPath";
import BottomRightPath from "./paths/BottomRightPath";

type SvgConnectionsProps = {
  geometry: CircuitGeometry;
};

function CircuitDefs() {
  return (
    <defs>
      <linearGradient
        id="connectionGradient"
        gradientUnits="userSpaceOnUse"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#38F8AB" />
        <stop offset="100%" stopColor="#FEED35" />
      </linearGradient>
      <radialGradient id="aiCircuitDot" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEED35" />
        <stop offset="45%" stopColor="#38F8AB" />
        <stop offset="100%" stopColor="#38F8AB" />
      </radialGradient>
    </defs>
  );
}

const STAGGER = 0.35;

export default function SvgConnections({ geometry }: SvgConnectionsProps) {
  return (
    <svg className="ai-feature-circuit-svg" aria-hidden>
      <CircuitDefs />
      <TopLeftPath
        path={geometry.topLeft}
        dotPath={geometry.topLeftDot}
        delay={STAGGER * 0}
      />
      <TopCenterPath
        path={geometry.topCenter}
        dotPath={geometry.topCenterDot}
        delay={STAGGER * 1}
      />
      <TopRightPath
        path={geometry.topRight}
        dotPath={geometry.topRightDot}
        delay={STAGGER * 2}
      />
      <BottomLeftPath
        path={geometry.bottomLeft}
        dotPath={geometry.bottomLeftDot}
        delay={STAGGER * 3}
      />
      <BottomCenterPath
        path={geometry.bottomCenter}
        dotPath={geometry.bottomCenterDot}
        delay={STAGGER * 4}
      />
      <BottomRightPath
        path={geometry.bottomRight}
        dotPath={geometry.bottomRightDot}
        delay={STAGGER * 5}
      />
      {geometry.centerLeft ? (
        <path
          d={geometry.centerLeft}
          className="ai-feature-circuit-path"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ) : null}
      {geometry.centerRight ? (
        <path
          d={geometry.centerRight}
          className="ai-feature-circuit-path"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ) : null}
    </svg>
  );
}
