import CircuitPath from "./CircuitPath";

type TopRightPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
};

export default function TopRightPath({
  path,
  dotPath,
  delay = 0,
}: TopRightPathProps) {
  return <CircuitPath path={path} dotPath={dotPath} delay={delay} />;
}
