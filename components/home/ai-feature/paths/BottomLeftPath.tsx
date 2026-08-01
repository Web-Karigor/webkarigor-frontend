import CircuitPath from "./CircuitPath";

type BottomLeftPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
  duration?: number;
};

export default function BottomLeftPath({
  path,
  dotPath,
  delay = 0,
  duration,
}: BottomLeftPathProps) {
  return (
    <CircuitPath path={path} dotPath={dotPath} delay={delay} duration={duration} />
  );
}
