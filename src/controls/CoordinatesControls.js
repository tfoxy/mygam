/* global window */
import {
  NULL_VECTOR,
} from '../positions';

const SQRT2 = 1 / Math.sqrt(2);

const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };
const UP_LEFT = { x: -SQRT2, y: -SQRT2 };
const UP_RIGHT = { x: SQRT2, y: -SQRT2 };
const DOWN_LEFT = { x: -SQRT2, y: SQRT2 };
const DOWN_RIGHT = { x: SQRT2, y: SQRT2 };

/*
  N: North
  S: South
  W: West
  E: East
  X: None of the above (idle)
 */
const MOVE_MAP = {
  NX: UP,
  SX: DOWN,
  XW: LEFT,
  XE: RIGHT,
  NW: UP_LEFT,
  NE: UP_RIGHT,
  SW: DOWN_LEFT,
  SE: DOWN_RIGHT,
  XX: NULL_VECTOR,
};

export default class CoordinatesControls {
  constructor(game) {
    this.game = game;
    this.entity = null;
    this.currentKeys = [];
    this.currentKeySet = new Set();
    this.currentDirection = NULL_VECTOR;
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
    let moveX = 'X';
    let moveY = 'X';
    this.currentKeys.forEach((key) => {
      // eslint-disable-next-line default-case
      switch (key) {
        case 'ArrowUp': moveY = 'N'; break;
        case 'ArrowDown': moveY = 'S'; break;
        case 'ArrowLeft': moveX = 'W'; break;
        case 'ArrowRight': moveX = 'E'; break;
      }
    });
    const direction = MOVE_MAP[moveY + moveX];
    this.currentDirection = direction;
    const accelerationValue = this.entity.accelerationModule / this.game.tickrate;
    this.entity.acceleration = {
      x: (direction.x * accelerationValue),
      y: (direction.y * accelerationValue),
    };
  }
}
