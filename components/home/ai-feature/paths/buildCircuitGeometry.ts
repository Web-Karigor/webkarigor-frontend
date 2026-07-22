import type { CircuitGeometry, RectMetrics } from "../types";

const CORNER_RADIUS = 16;

/** Mirrored drop column — fraction from card toward center on first horizontal. */
const DROP_RATIO = 0.55;

/** First horizontal lane — fraction from card edge toward center Y. */
const LANE_RATIO = 0.5;

function toMetrics(rect: DOMRect, originX: number, originY: number): RectMetrics {
  return {
    left: rect.left - originX,
    top: rect.top - originY,
    right: rect.right - originX,
    bottom: rect.bottom - originY,
    width: rect.width,
    height: rect.height,
    centerX: rect.left + rect.width / 2 - originX,
    centerY: rect.top + rect.height / 2 - originY,
  };
}

/**
 * Visible orb is smaller than the image box (glow padding).
 * Scale radius so paths reach the circle edge, not the image bounds.
 */
const VISUAL_RADIUS_SCALE = 0.58;

function circleRadius(center: RectMetrics): number {
  return (center.width / 2) * VISUAL_RADIUS_SCALE;
}

function clampRadius(r: number, ...limits: number[]): number {
  const cap = Math.min(...limits.filter((n) => n > 0));
  return Math.max(4, Math.min(r, cap));
}

/**
 * V → H → V → H with exactly two rounded 90° corners (Q only).
 * Final horizontal segment is straight into the circle edge.
 */
function buildVHVHPath(
  startX: number,
  startY: number,
  laneY: number,
  dropX: number,
  busY: number,
  endX: number,
): string {
  const dirV1 = Math.sign(laneY - startY) || 1;
  const dirH1 = Math.sign(dropX - startX) || 1;
  const dirV2 = Math.sign(busY - laneY) || 1;

  const r1 = clampRadius(
    CORNER_RADIUS,
    Math.abs(laneY - startY) / 2,
    Math.abs(dropX - startX) / 2,
  );
  const r2 = clampRadius(
    CORNER_RADIUS,
    Math.abs(dropX - startX) / 2,
    Math.abs(busY - laneY) / 2,
    Math.abs(endX - dropX) / 2,
  );

  const yBeforeCorner1 = laneY - dirV1 * r1;
  const xAfterCorner1 = startX + dirH1 * r1;
  const xBeforeCorner2 = dropX - dirH1 * r2;
  const yAfterCorner2 = laneY + dirV2 * r2;

  return [
    `M ${startX} ${startY}`,
    `V ${yBeforeCorner1}`,
    `Q ${startX} ${laneY} ${xAfterCorner1} ${laneY}`,
    `H ${xBeforeCorner2}`,
    `Q ${dropX} ${laneY} ${dropX} ${yAfterCorner2}`,
    `V ${busY}`,
    `H ${endX}`,
  ].join(" ");
}

function mirroredDropX(
  cardX: number,
  centerX: number,
  side: "left" | "right",
): number {
  if (side === "left") {
    return cardX + (centerX - cardX) * DROP_RATIO;
  }
  return cardX - (cardX - centerX) * DROP_RATIO;
}

/**
 * Top left — sketch:
 *   │ │
 *   └─────────────┐
 *                 │
 *         ├───────●
 */
export function buildTopLeftPath(
  card: RectMetrics,
  center: RectMetrics,
): string {
  const r = circleRadius(center);
  const laneY = card.bottom + (center.centerY - card.bottom) * LANE_RATIO;
  const dropX = mirroredDropX(card.centerX, center.centerX, "left");

  return buildVHVHPath(
    card.centerX,
    card.bottom,
    laneY,
    dropX,
    center.centerY,
    center.centerX - r,
  );
}

/** Top center — │ │ │ → top circle edge */
export function buildTopCenterPath(
  card: RectMetrics,
  center: RectMetrics,
): string {
  const r = circleRadius(center);
  return `M ${card.centerX} ${card.bottom} V ${center.centerY - r}`;
}

/**
 * Top right — sketch:
 *                 │
 *   ┌─────────────┘
 *   │ │
 *         ●───────┤
 */
export function buildTopRightPath(
  card: RectMetrics,
  center: RectMetrics,
): string {
  const r = circleRadius(center);
  const laneY = card.bottom + (center.centerY - card.bottom) * LANE_RATIO;
  const dropX = mirroredDropX(card.centerX, center.centerX, "right");

  return buildVHVHPath(
    card.centerX,
    card.bottom,
    laneY,
    dropX,
    center.centerY,
    center.centerX + r,
  );
}

/**
 * Bottom left — sketch:
 *         ├───────●
 *                 │
 *   ┌─────────────┘
 *   │ │
 */
export function buildBottomLeftPath(
  card: RectMetrics,
  center: RectMetrics,
): string {
  const r = circleRadius(center);
  const laneY = card.top - (card.top - center.centerY) * LANE_RATIO;
  const dropX = mirroredDropX(card.centerX, center.centerX, "left");

  return buildVHVHPath(
    card.centerX,
    card.top,
    laneY,
    dropX,
    center.centerY,
    center.centerX - r,
  );
}

/** Bottom center — │ │ │ → bottom circle edge */
export function buildBottomCenterPath(
  card: RectMetrics,
  center: RectMetrics,
): string {
  const r = circleRadius(center);
  return `M ${card.centerX} ${card.top} V ${center.centerY + r}`;
}

/**
 * Bottom right — sketch:
 *         ●───────┤
 *                 │
 *   └─────────────┐
 *   │ │
 */
export function buildBottomRightPath(
  card: RectMetrics,
  center: RectMetrics,
): string {
  const r = circleRadius(center);
  const laneY = card.top - (card.top - center.centerY) * LANE_RATIO;
  const dropX = mirroredDropX(card.centerX, center.centerX, "right");

  return buildVHVHPath(
    card.centerX,
    card.top,
    laneY,
    dropX,
    center.centerY,
    center.centerX + r,
  );
}

/** Short horizontal stub into left circle edge (~45px). */
export function buildCenterLeftPath(center: RectMetrics): string {
  const r = circleRadius(center);
  const len = 48;
  const y = center.centerY;
  const x1 = center.centerX - r - len;
  const x2 = center.centerX - r;
  // Tiny vertical extent keeps objectBoundingBox gradients paintable if needed.
  return `M ${x1} ${y} H ${x2}`;
}

/** Short horizontal stub into right circle edge (~45px). */
export function buildCenterRightPath(center: RectMetrics): string {
  const r = circleRadius(center);
  const len = 48;
  const y = center.centerY;
  const x1 = center.centerX + r + len;
  const x2 = center.centerX + r;
  return `M ${x1} ${y} H ${x2}`;
}

export function buildCircuitGeometry(
  sectionRect: DOMRect,
  centerRect: DOMRect,
  cardElements: (HTMLElement | null)[],
): CircuitGeometry {
  const ox = sectionRect.left;
  const oy = sectionRect.top;
  const centerM = toMetrics(centerRect, ox, oy);

  const cardM = (index: number): RectMetrics | null => {
    const el = cardElements[index];
    if (!el) return null;
    return toMetrics(el.getBoundingClientRect(), ox, oy);
  };

  const tl = cardM(0);
  const tc = cardM(1);
  const tr = cardM(2);
  const bl = cardM(3);
  const bc = cardM(4);
  const br = cardM(5);

  const topLeft = tl ? buildTopLeftPath(tl, centerM) : "";
  const topCenter = tc ? buildTopCenterPath(tc, centerM) : "";
  const topRight = tr ? buildTopRightPath(tr, centerM) : "";
  const bottomLeft = bl ? buildBottomLeftPath(bl, centerM) : "";
  const bottomCenter = bc ? buildBottomCenterPath(bc, centerM) : "";
  const bottomRight = br ? buildBottomRightPath(br, centerM) : "";

  return {
    topLeft,
    topCenter,
    topRight,
    bottomLeft,
    bottomCenter,
    bottomRight,
    topLeftDot: topLeft,
    topCenterDot: topCenter,
    topRightDot: topRight,
    bottomLeftDot: bottomLeft,
    bottomCenterDot: bottomCenter,
    bottomRightDot: bottomRight,
    centerLeft: buildCenterLeftPath(centerM),
    centerRight: buildCenterRightPath(centerM),
  };
}
