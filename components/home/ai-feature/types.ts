export type FeatureCardData = {
  title: string;
  imageSrc: string;
};

export type CircuitGeometry = {
  topLeft: string;
  topCenter: string;
  topRight: string;
  bottomLeft: string;
  bottomCenter: string;
  bottomRight: string;
  topLeftDot: string;
  topCenterDot: string;
  topRightDot: string;
  bottomLeftDot: string;
  bottomCenterDot: string;
  bottomRightDot: string;
  centerLeft: string;
  centerRight: string;
};

export type RectMetrics = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
};
