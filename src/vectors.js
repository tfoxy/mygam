export const NULL_VECTOR = { x: 0, y: 0 };
export const NAN_VECTOR = { x: NaN, y: NaN };

export function polarToCartesian(radius, angle) {
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}

export function sumVectors(v1, v2) {
  return {
    x: v1.x + v2.x,
    y: v1.y + v2.y,
  };
}
