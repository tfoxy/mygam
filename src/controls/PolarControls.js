/* global window */
const SQRT2 = 1 / Math.sqrt(2);
const NONE_MOVE = { r: 0, a: 0 };

/*
  F: Forward
  L: Left
  R: Right
  X: None of the above (idle)
 */
const MOVE_MAP = {
  FX: { r: 1, a: 0 },
  XL: { r: 0, a: -1 },
  XR: { r: 0, a: 1 },
  FL: { r: SQRT2, a: -SQRT2 },
  FR: { r: SQRT2, a: SQRT2 },
  XX: NONE_MOVE,
};

export default class CoordinatesControls {
  constructor() {
    this.entity = null;
    this.currentKeys = [];
    this.currentKeySet = new Set();
    this.currentDirection = NONE_MOVE;
    this.keyboardListener = this.keyboardListener.bind(this);
  }

  setEntity(entity) {
    if (this.entity) throw new Error('Entity already set for Controls');
    this.entity = entity;
    window.addEventListener('keydown', this.keyboardListener);
    window.addEventListener('keyup', this.keyboardListener);
  }

  keyboardListener(keyboardEvent) {
    const { key, type } = keyboardEvent;
    if (type === 'keydown' && !this.currentKeySet.has(key)) {
      this.currentKeys.push(key);
      this.currentKeySet.add(key);
    } else if (type === 'keyup' && this.currentKeySet.delete(key)) {
      const index = this.currentKeys.indexOf(key);
      this.currentKeys.splice(index, 1);
    }
    this.updateCurrentDirection();
  }

  updateCurrentDirection() {
    let moveRadius = 'X';
    let moveAngle = 'X';
    this.currentKeys.forEach((key) => {
      // eslint-disable-next-line default-case
      switch (key) {
        case 'ArrowUp': moveRadius = 'F'; break;
        // case 'ArrowDown': moveRadius = 'B'; break;
        case 'ArrowLeft': moveAngle = 'L'; break;
        case 'ArrowRight': moveAngle = 'R'; break;
      }
    });
    const direction = MOVE_MAP[moveRadius + moveAngle];
    this.currentDirection = direction;
    this.entity.changeAcceleration(direction.r, direction.a);
  }
}
