/* global window */
import {
  ZERO_POS,
  UP,
  DOWN,
  LEFT,
  RIGHT,
  UP_LEFT,
  UP_RIGHT,
  DOWN_LEFT,
  DOWN_RIGHT,
} from '../positions';

const MOVE_MAP = {
  NX: UP,
  SX: DOWN,
  XW: LEFT,
  XE: RIGHT,
  NW: UP_LEFT,
  NE: UP_RIGHT,
  SW: DOWN_LEFT,
  SE: DOWN_RIGHT,
  XX: ZERO_POS,
};

export default class CoordinatesControls {
  constructor(game) {
    this.game = game;
    this.entity = null;
    this.currentKeys = [];
    this.currentKeySet = new Set();
    this.currentDirection = ZERO_POS;
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
