/* global document, window */

export default class Renderer {
  start(game) {
    if (this.game) throw new Error('Renderer is already rendering a Game');
    this.game = game;
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(window.innerWidth, this.game.width * 2);
    canvas.height = Math.min(window.innerHeight, this.game.height * 2);
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    this.render = this.render.bind(this);
    this.render();
  }

  get width() {
    return this.canvas.width;
  }

  get height() {
    return this.canvas.height;
  }

  render() {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.game.entities.forEach(e => this.drawEntity(e));
    window.requestAnimationFrame(this.render);
  }

  drawEntity(entity) {
    const { canvas, angle, position: pos } = entity;
    const ctx = this.canvasContext;
    const { width: gameWidth, height: gameHeight } = this.game;
    const xPos = pos.x + ((this.width - gameWidth) / 2);
    const yPos = pos.y + ((this.height - gameHeight) / 2);
    const { x: xSize, y: ySize } = entity.size;
    [
      { x: xPos, y: yPos },
      { x: xPos, y: yPos + gameHeight },
      { x: xPos, y: yPos - gameHeight },
      { x: xPos + gameWidth, y: yPos },
      { x: xPos + gameWidth, y: yPos + gameHeight },
      { x: xPos + gameWidth, y: yPos - gameHeight },
      { x: xPos - gameWidth, y: yPos },
      { x: xPos - gameWidth, y: yPos + gameHeight },
      { x: xPos - gameWidth, y: yPos - gameHeight },
    ].forEach(({ x, y }) => {
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.drawImage(canvas, -xSize / 2, -ySize / 2);
      ctx.rotate(-angle);
      ctx.translate(-x, -y);
    });
  }
}
