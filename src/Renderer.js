/* global document, window */
import { NO_POSITION } from './positions';

function canvasRound(n) {
  // eslint-disable-next-line no-bitwise
  return (0.5 + n) << 0;
}

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
    this.game.entities.forEach(e => this.entityMap.set(e.id, {
      entity: e,
      position: NO_POSITION,
    }));
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
    this.game.entities.forEach(e => this.drawEntity(e));
    window.requestAnimationFrame(this.render);
  }

  drawEntity(entity) {
    const entityRendererData = this.entityMap.get(entity.id);
    const prevPos = entityRendererData.position;
    const pos = entity.position;
    if (prevPos === pos) return;
    entityRendererData.position = pos;
    const size = entity.size;

    this.borderDraw('clearRect', prevPos, size);
    this.canvasContext.fillStyle = entity.color;
    this.borderDraw('fillRect', pos, size);
  }

  borderDraw(ctxMethod, pos, size) {
    const ctx = this.canvasContext;
    const xPos = canvasRound(pos.x);
    const yPos = canvasRound(pos.y);
    const { x: xSize, y: ySize } = size;
    ctx[ctxMethod](xPos, yPos, xSize, ySize);

    const xOverflow = xPos + xSize;
    const yOverflow = yPos + ySize;
    if (xOverflow > this.width) {
      const x = (xOverflow % this.width) - xSize;
      ctx[ctxMethod](x, yPos, xSize, ySize);
    }
    if (yOverflow > this.height) {
      const y = (yOverflow % this.height) - ySize;
      ctx[ctxMethod](xPos, y, xSize, ySize);
    }
    if (xOverflow > this.width && yOverflow > this.height) {
      const x = (xOverflow % this.width) - xSize;
      const y = (yOverflow % this.height) - ySize;
      ctx[ctxMethod](x, y, xSize, ySize);
    }
  }
}
