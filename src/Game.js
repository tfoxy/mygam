import { Vector, Polygon, testPolygonPolygon } from 'sat';
import Entity from './Entity';

const PI2 = 2 * Math.PI;

export default class Game {
  constructor() {
    this.entities = [];
    this.tickrate = 128;
    this.loopInterval = 1000 / this.tickrate;
    this.width = 640;
    this.height = 640;
    this.player1Entity = new Entity({ color: 'green' });
    this.player2Entity = new Entity({ color: 'red' });
  }

  start() {
    if (this.loop !== Game.prototype.loop) throw new Error('Game already started');
    this.startRound();
    this.loop = this.loop.bind(this);
    this.loop();
  }

  loop() {
    this.entities.forEach((entity) => {
      this.accelerateEntity(entity);
      this.moveEntity(entity);
    });
    this.checkCollisions();
    setTimeout(this.loop, this.loopInterval);
  }

  startRound() {
    this.entities.length = 0;
    this.player1Entity.resetMomentum();
    this.player2Entity.resetMomentum();
    Object.assign(this.player1Entity, {
      position: { x: 50, y: 50 },
      angle: 0,
    });
    Object.assign(this.player2Entity, {
      position: { x: this.width - 50, y: this.height - 50 },
      angle: Math.PI,
    });
    this.entities.push(this.player1Entity);
    this.entities.push(this.player2Entity);
  }

  checkCollisions() {
    this.entities.forEach((entity, index) => {
      const polygonList = this.getEntitySatPolygonList(entity);
      const collisionEntity = this.entities.slice(index + 1).find(
        anotherEntity => this.testCollision(
          polygonList,
          this.getEntitySatPolygonList(anotherEntity),
        ),
      );
      if (collisionEntity) {
        this.startRound();
      }
    });
  }

  getEntitySatPolygonList(entity) {
    return entity.getSquarePointsInsideGame(this.width, this.height).map(
      points => new Polygon(undefined, points.map(p => new Vector(p.x, p.y))),
    );
  }

  testCollision(polygonList, anotherPolygonList) {
    return polygonList.some(
      polygon => anotherPolygonList.some(
        anotherPolygon => testPolygonPolygon(polygon, anotherPolygon),
      ),
    );
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
