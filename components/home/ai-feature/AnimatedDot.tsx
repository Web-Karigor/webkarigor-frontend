type AnimatedDotProps = {
  path: string;
  delay?: number;
  duration?: number;
};

export default function AnimatedDot({
  path,
  delay = 0,
  duration = 3.5,
}: AnimatedDotProps) {
  if (!path) return null;

  return (
    <g filter="url(#aiCircuitDotGlow)">
      <circle r="5" fill="url(#aiCircuitDot)">
        <animateMotion
          dur={`${duration}s`}
          repeatCount="indefinite"
          path={path}
          calcMode="linear"
          begin={`${delay}s`}
        />
      </circle>
    </g>
  );
}
