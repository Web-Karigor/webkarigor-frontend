import CircuitPath from "./CircuitPath";

type BottomRightPathProps = {
  path: string;
  dotPath?: string;
  delay?: number;
};

export default function BottomRightPath({
  path,
  dotPath,
  delay = 0,
}: BottomRightPathProps) {
  return <CircuitPath path={path} dotPath={dotPath} delay={delay} />;
}
