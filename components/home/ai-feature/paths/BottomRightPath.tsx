import CircuitPath from "./CircuitPath";

type BottomRightPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
  duration?: number;
};

export default function BottomRightPath({
  path,
  dotPath,
  delay = 0,
  duration,
}: BottomRightPathProps) {
  return (
    <CircuitPath path={path} dotPath={dotPath} delay={delay} duration={duration} />
  );
}
