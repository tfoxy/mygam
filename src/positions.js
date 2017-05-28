const SQRT2 = 1 / Math.sqrt(2);

export const ZERO_POS = { x: 0, y: 0 };
export const NO_POSITION = { x: NaN, y: NaN };
export const UP = { x: 0, y: -1 };
export const DOWN = { x: 0, y: 1 };
export const LEFT = { x: -1, y: 0 };
export const RIGHT = { x: 1, y: 0 };
export const UP_LEFT = { x: -SQRT2, y: -SQRT2 };
export const UP_RIGHT = { x: SQRT2, y: -SQRT2 };
export const DOWN_LEFT = { x: -SQRT2, y: SQRT2 };
export const DOWN_RIGHT = { x: SQRT2, y: SQRT2 };
