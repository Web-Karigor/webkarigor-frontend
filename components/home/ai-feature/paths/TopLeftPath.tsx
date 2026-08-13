import CircuitPath from "./CircuitPath";

type TopLeftPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
  duration?: number;
};

export default function TopLeftPath({
  path,
  dotPath,
  delay = 0,
  duration,
}: TopLeftPathProps) {
  return (
    <CircuitPath path={path} dotPath={dotPath} delay={delay} duration={duration} />
  );
}
