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

const DEFAULT_KEY_BINDINGS = {
  FORWARD: 'ArrowUp',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  SHOOT: 'Period',
};

export default class PolarControls {
  constructor(keyBindings = DEFAULT_KEY_BINDINGS) {
    this.keyBindings = keyBindings;
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
    const { code, type } = keyboardEvent;
    if (type === 'keydown' && !this.currentKeySet.has(code)) {
      this.currentKeys.push(code);
      this.currentKeySet.add(code);
    } else if (type === 'keyup' && this.currentKeySet.delete(code)) {
      const index = this.currentKeys.indexOf(code);
      this.currentKeys.splice(index, 1);
    }
    this.updateCurrentDirection();
    this.updateShooting();
  }

  updateCurrentDirection() {
    const {
      FORWARD: forwardKey,
      LEFT: leftKey,
      RIGHT: rightKey,
    } = this.keyBindings;
    let moveRadius = 'X';
    let moveAngle = 'X';
    this.currentKeys.forEach((key) => {
      // eslint-disable-next-line default-case
      switch (key) {
        case forwardKey: moveRadius = 'F'; break;
        // case 'ArrowDown': moveRadius = 'B'; break;
        case leftKey: moveAngle = 'L'; break;
        case rightKey: moveAngle = 'R'; break;
      }
    });
    const direction = MOVE_MAP[moveRadius + moveAngle];
    this.currentDirection = direction;
    this.entity.changeAcceleration(direction.r, direction.a);
  }

  updateShooting() {
    const shooting = this.currentKeySet.has(this.keyBindings.SHOOT);
    if (shooting) {
      this.entity.startShooting();
    } else {
      this.entity.stopShooting();
    }
  }
}
