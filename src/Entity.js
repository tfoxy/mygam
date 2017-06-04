/* global document */

import { ZERO_POS } from './positions';

const PI2 = Math.PI / 2;

let nextId = 0;

export default class Entity {
  constructor() {
    nextId += 1;
    this.id = nextId;
    this.color = 'green';
    this.size = { x: 35, y: 25 };
    this.position = { x: 50, y: 50 };
    this.speed = ZERO_POS;
    this.acceleration = 0;
    this.angle = 0;
    this.angularSpeed = 0;
    this.angularAcceleration = 0;
    this.maxSpeed = 600;
    this.maxAcceleration = 5;
    this.maxAngularSpeed = Math.PI * (3 / 2);
    this.maxAngularAcceleration = Math.PI / 24;
  }

  changeAcceleration(radius, angle) {
    this.acceleration = radius * this.maxAcceleration;
    this.angularAcceleration = angle * this.maxAngularAcceleration;
  }

  get squarePoints() {
    const { x: xPos, y: yPos } = this.position;
    const { x: xSize, y: ySize } = this.size;
    const angle = this.angle;
    const pointDistance = Math.sqrt((xSize * xSize) + (ySize * ySize)) / 2;
    const pointAngle = Math.atan(ySize / xSize);
    return [{
      x: xPos + (Math.cos(angle - pointAngle) * pointDistance),
      y: yPos + (Math.sin(angle - pointAngle) * pointDistance),
    }, {
      x: xPos + (Math.cos(angle + pointAngle) * pointDistance),
      y: yPos + (Math.sin(angle + pointAngle) * pointDistance),
    }, {
      x: xPos + (Math.cos(angle + pointAngle + PI2) * pointDistance),
      y: yPos + (Math.sin(angle + pointAngle + PI2) * pointDistance),
    }, {
      x: xPos + (Math.cos(angle - pointAngle - PI2) * pointDistance),
      y: yPos + (Math.sin(angle - pointAngle - PI2) * pointDistance),
    }];
  }

  get canvas() {
    let canvas = this._canvas;
    if (!canvas) {
      canvas = document.createElement('canvas');
      const { x, y } = this.size;
      canvas.width = x;
      canvas.height = y;
      const ctx = canvas.getContext('2d');
      ctx.fillRect(0, 0, 5, y);
      ctx.fillStyle = this.color;
      ctx.fillRect(5, 0, x, y);
      this._canvas = canvas;
    }
    return this._canvas;
  }
}
