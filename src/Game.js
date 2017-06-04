const PI2 = 2 * Math.PI;

export default class Game {
  constructor() {
    this.entities = [];
    this.tickrate = 128;
    this.loopInterval = 1000 / this.tickrate;
    this.width = 640;
    this.height = 640;
  }

  start() {
    if (this.loop !== Game.prototype.loop) throw new Error('Game already started');
    this.loop = this.loop.bind(this);
    this.loop();
  }

  loop() {
    this.entities.forEach((entity) => {
      this.accelerateEntity(entity);
      this.moveEntity(entity);
      // console.log(entity.position, entity.angle);
    });
    setTimeout(this.loop, this.loopInterval);
  }

  moveEntity(entity) {
    const { speed, angularSpeed } = entity;
    if (angularSpeed) {
      let angle = entity.angle;
      angle += entity.angularSpeed;
      angle %= PI2;
      entity.angle = angle;
    }
    if (speed.x || speed.y) {
      const pos = entity.position;
      let x = (pos.x + speed.x) % this.width;
      let y = (pos.y + speed.y) % this.height;
      if (x < 0) x += this.width;
      if (y < 0) y += this.height;
      entity.position = { x, y };
    }
  }

  accelerateEntity(entity) {
    const { acceleration, angularAcceleration } = entity;
    if (angularAcceleration) {
      const tickAngularAcceleration = angularAcceleration / this.tickrate;
      let angularSpeed = entity.angularSpeed + tickAngularAcceleration;
      const maxAngularSpeed = entity.maxAngularSpeed / this.tickrate;
      if (angularSpeed > maxAngularSpeed) {
        angularSpeed = maxAngularSpeed;
      } else if (angularSpeed < -maxAngularSpeed) {
        angularSpeed = -maxAngularSpeed;
      }
      entity.angularSpeed = angularSpeed;
    }
    if (acceleration) {
      const tickAcceleration = acceleration / this.tickrate;
      const { speed, angle } = entity;
      let x = speed.x + (Math.cos(angle) * tickAcceleration);
      let y = speed.y + (Math.sin(angle) * tickAcceleration);
      const speedModule = Math.sqrt((x * x) + (y * y));
      const maxSpeed = entity.maxSpeed / this.tickrate;
      if (speedModule > maxSpeed) {
        const speedRatio = maxSpeed / speedModule;
        x *= speedRatio;
        y *= speedRatio;
      }
      entity.speed = { x, y };
    }
  }
}
