import CircuitPath from "./CircuitPath";

type TopRightPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
  duration?: number;
};

export default function TopRightPath({
  path,
  dotPath,
  delay = 0,
  duration,
}: TopRightPathProps) {
  return (
    <CircuitPath path={path} dotPath={dotPath} delay={delay} duration={duration} />
  );
}
