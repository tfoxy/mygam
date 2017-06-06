/* global document */
import Entity from './Entity';

export default class Shot extends Entity {
  constructor(options) {
    super();
    this.color = 'yellow';
    this.size = { x: 10, y: 4 };
    Object.assign(this, options);
  }

  get canvas() {
    let canvas = this._canvas;
    if (!canvas) {
      canvas = document.createElement('canvas');
      const { x, y } = this.size;
      canvas.width = x;
      canvas.height = y;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, x, y);
      this._canvas = canvas;
    }
    return this._canvas;
  }
}
