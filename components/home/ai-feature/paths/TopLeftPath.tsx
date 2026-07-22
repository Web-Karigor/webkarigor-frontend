import CircuitPath from "./CircuitPath";

type TopLeftPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
};

export default function TopLeftPath({
  path,
  dotPath,
  delay = 0,
}: TopLeftPathProps) {
  return <CircuitPath path={path} dotPath={dotPath} delay={delay} />;
}
