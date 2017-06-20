/* global document */
import Entity from './Entity';

export default class Ship extends Entity {
  constructor(options) {
    super();
    this.size = { x: 35, y: 25 };
    // this.maxSpeed = 400;
    this.maxAcceleration = 10;
    // this.maxAngularSpeed = Math.PI;
    this.maxAngularAcceleration = Math.PI / 24;
    this.oppositionModule = 2;
    this.angularOpposition = Math.PI;
    this.shooting = false;
    Object.assign(this, options);
  }

  startShooting() {
    this.shooting = true;
  }

  stopShooting() {
    this.shooting = false;
  }

  get canvas() {
    let canvas = this._canvas;
    if (!canvas) {
      canvas = document.createElement('canvas');
      const { x, y } = this.size;
      canvas.width = x;
      canvas.height = y;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'gray';
      ctx.fillRect(0, 0, 5, y);
      ctx.fillStyle = this.color;
      ctx.fillRect(5, 0, x, y);
      this._canvas = canvas;
    }
    return this._canvas;
  }
}
