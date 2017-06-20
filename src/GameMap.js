export default class GameMap {
  constructor() {
    this.width = 640;
    this.height = 640;
  }

  getEntityPolygons(entity) {
    const { x: xPos, y: yPos } = entity.position;
    let xOffset = this.width;
    let yOffset = this.height;
    if (xPos > this.width / 2) {
      xOffset *= -1;
    }
    if (yPos > this.height / 2) {
      yOffset *= -1;
    }
    const polygonPoints = entity.polygonPoints;
    const points = [
      polygonPoints,
      polygonPoints.map(p => ({ x: p.x + xOffset, y: p.y })),
      polygonPoints.map(p => ({ x: p.x, y: p.y + yOffset })),
      polygonPoints.map(p => ({ x: p.x + xOffset, y: p.y + yOffset })),
    ];
    return points;
  }

  getEntityPositions(entity) {
    const { x: xPos, y: yPos } = entity.position;
    let xOffset = this.width;
    let yOffset = this.height;
    if (xPos > this.width / 2) {
      xOffset *= -1;
    }
    if (yPos > this.height / 2) {
      yOffset *= -1;
    }
    const points = [
      entity.position,
      { x: xPos + xOffset, y: yPos },
      { x: xPos, y: yPos + yOffset },
      { x: xPos + xOffset, y: yPos + yOffset },
    ];
    return points;
  }
}
