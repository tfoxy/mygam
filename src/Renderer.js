/* global document, window */
// import { NO_POSITION } from './positions';

export default class Renderer {
  constructor() {
    this.canvasContext = null;
    this.entityMap = new Map();
  }

  start(game) {
    if (this.game) throw new Error('Renderer is already rendering a Game');
    this.game = game;
    const canvas = document.createElement('canvas');
    canvas.width = this.game.width;
    canvas.height = this.game.height;
    this.canvasContext = canvas.getContext('2d');
    // this.game.entities.forEach(e => this.entityMap.set(e.id, {
    //   entity: e,
    //   position: NO_POSITION,
    //   angle: 0,
    // }));
    this.render = this.render.bind(this);
    this.render();
  }

  get canvas() {
    return this.canvasContext.canvas;
  }

  get width() {
    return this.game.width;
  }

  get height() {
    return this.game.height;
  }

  render() {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.game.entities.forEach(e => this.drawEntity(e));
    window.requestAnimationFrame(this.render);
  }

  drawEntity(entity) {
    // const entityRendererData = this.entityMap.get(entity.id);
    const { canvas, angle, position } = entity;
    const { x: xPos, y: yPos } = position;
    const ctx = this.canvasContext;
    const drawXPos = -canvas.width / 2;
    const drawYPos = -canvas.height / 2;
    ctx.translate(xPos, yPos);
    ctx.rotate(angle);
    ctx.drawImage(canvas, drawXPos, drawYPos);
    entity.squarePoints.forEach((point) => {
      let x = xPos;
      let y = yPos;
      if (point.x > this.width) {
        x -= this.width;
      } else if (point.x < 0) {
        x += this.width;
      }
      if (point.y > this.height) {
        y -= this.height;
      } else if (point.y < 0) {
        y += this.height;
      }
      if (x !== xPos || y !== yPos) {
        ctx.rotate(-angle);
        ctx.translate(x - xPos, y - yPos);
        ctx.rotate(angle);
        ctx.drawImage(canvas, drawXPos, drawYPos);
        ctx.rotate(-angle);
        ctx.translate(-(x - xPos), -(y - yPos));
        ctx.rotate(angle);
      }
    });
    ctx.rotate(-angle);
    ctx.translate(-xPos, -yPos);
  }
}
