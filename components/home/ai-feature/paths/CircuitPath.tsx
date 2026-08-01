import AnimatedDot from "../AnimatedDot";

type CircuitPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
  duration?: number;
};

export default function CircuitPath({
  path,
  dotPath,
  delay = 0,
  duration,
}: CircuitPathProps) {
  if (!path) return null;

  return (
    <g>
      <path
        d={path}
        className="ai-feature-circuit-path"
        stroke="url(#connectionGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <AnimatedDot path={dotPath ?? path} delay={delay} duration={duration} />
    </g>
  );
}
