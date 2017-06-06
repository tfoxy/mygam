import { NULL_VECTOR, NAN_VECTOR } from '../vectors';

let nextId = 0;

export default class Entity {
  constructor() {
    nextId += 1;
    this.id = nextId;
    this.color = 'gray';
    this.size = NAN_VECTOR;
    this.position = NAN_VECTOR;
    this.angle = 0;
    this.resetMomentum();
    this.acceleration = 0;
    this.angularAcceleration = 0;
    this.maxSpeed = 0;
    this.maxAcceleration = 0;
    this.maxAngularSpeed = 0;
    this.maxAngularAcceleration = 0;
  }

  resetMomentum() {
    this.speed = NULL_VECTOR;
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
}
