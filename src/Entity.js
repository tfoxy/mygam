/* global document */
import { ZERO_POS, NO_POSITION } from './positions';



let nextId = 0;
export default class Entity {

  constructor(options) {
    nextId += 1;
    this.id = nextId;
    this.color = 'gray';
    this.size = { x: 35, y: 25 };
    this.position = NO_POSITION;
    this.angle = 0;
    this.resetMomentum();
    this.acceleration = 0;
    this.angularAcceleration = 0;
    this.maxSpeed = 600;
    this.maxAcceleration = 5;
    this.maxAngularSpeed = Math.PI * (3 / 2);
    this.maxAngularAcceleration = Math.PI / 24;
    Object.assign(this, options);
  }

  resetMomentum() {
    this.speed = ZERO_POS;
    this.angularSpeed = 0;
  }

  changeAcceleration(radius, angle) {
    this.acceleration = radius * this.maxAcceleration;
    this.angularAcceleration = angle * this.maxAngularAcceleration;
  }

  getSquarePointsInsideGame(width, height) {
    const { x: xPos, y: yPos } = this.position;
    let xOffset = width;
    let yOffset = width;
    if (xPos > width / 2) {
      xOffset *= -1;
    }
    if (yPos > height / 2) {
      yOffset *= -1;
    }
    const squarePoints = this.squarePoints;
    const points = [
      squarePoints,
      squarePoints.map(p => ({ x: p.x + xOffset, y: p.y })),
      squarePoints.map(p => ({ x: p.x, y: p.y + yOffset })),
      squarePoints.map(p => ({ x: p.x + xOffset, y: p.y + yOffset })),
    ];
    return points;
  }

  _getSquarePoints(position) {
    const { x: xPos, y: yPos } = position;
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
      x: xPos + (Math.cos(angle + (Math.PI - pointAngle)) * pointDistance),
      y: yPos + (Math.sin(angle + (Math.PI - pointAngle)) * pointDistance),
    }, {
      x: xPos + (Math.cos(angle - (Math.PI - pointAngle)) * pointDistance),
      y: yPos + (Math.sin(angle - (Math.PI - pointAngle)) * pointDistance),
    }];
  }

  get squarePoints() {
    return this._getSquarePoints(this.position);
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
