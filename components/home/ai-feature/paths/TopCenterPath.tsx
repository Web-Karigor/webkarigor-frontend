import CircuitPath from "./CircuitPath";

type TopCenterPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
};

export default function TopCenterPath({
  path,
  dotPath,
  delay = 0,
}: TopCenterPathProps) {
  return <CircuitPath path={path} dotPath={dotPath} delay={delay} />;
}
