import CircuitPath from "./CircuitPath";

type BottomCenterPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
};

export default function BottomCenterPath({
  path,
  dotPath,
  delay = 0,
}: BottomCenterPathProps) {
  return <CircuitPath path={path} dotPath={dotPath} delay={delay} />;
}
