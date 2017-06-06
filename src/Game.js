import { Vector, Polygon, testPolygonPolygon } from 'sat';
import { polarToCartesian, sumVectors } from './vectors';
import Ship from './entities/Ship';
import Shot from './entities/Shot';

const PI2 = 2 * Math.PI;

function pull(array, item) {
  const index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

export default class Game {
  constructor() {
    this.entities = [];
    this.tickrate = 128;
    this.loopInterval = 1000 / this.tickrate;
    this.width = 640;
    this.height = 640;
    this.playersData = [{
      ship: new Ship({ color: 'green' }),
      shot: new Shot(),
      score: 0,
    }, {
      ship: new Ship({ color: 'red' }),
      shot: new Shot(),
      score: 0,
    }];
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
    this.makeShots();
    this.checkCollisions();
    setTimeout(this.loop, this.loopInterval);
  }

  startRound() {
    this.entities.length = 0;
    this.playersData.forEach(d => d.ship.resetMomentum());
    Object.assign(this.playersData[0].ship, {
      position: { x: 50, y: 50 },
      angle: 0,
    });
    Object.assign(this.playersData[1].ship, {
      position: { x: this.width - 50, y: this.height - 50 },
      angle: Math.PI,
    });
    this.entities.push(...this.playersData.map(d => d.ship));
  }

  makeShots() {
    this.playersData.forEach(({ ship, shot }) => {
      if (ship.shooting) {
        shot.maxSpeed = ship.maxSpeed * 1.5;
        shot.maxAcceleration = ship.maxAcceleration * 8;
        shot.position = sumVectors(ship.position, polarToCartesian(ship.size.x * 0.75, ship.angle));
        shot.angle = ship.angle;
        shot.speed = ship.speed;
        shot.acceleration = shot.maxAcceleration;
        if (!this.entities.includes(shot)) {
          this.entities.push(shot);
        }
      }
    });
  }

  checkCollisions() {
    this.entities.some((entity, index) => {
      const polygonList = this.getEntitySatPolygonList(entity);
      const collisionEntity = this.entities.slice(index + 1).find(
        anotherEntity => this.testCollision(
          polygonList,
          this.getEntitySatPolygonList(anotherEntity),
        ),
      );
      if (collisionEntity) {
        let restart = false;
        const collisionEntities = [entity, collisionEntity];
        collisionEntities.forEach((cEntity) => {
          pull(this.entities, cEntity);
          const data = this.playersData.find(d => d.ship === cEntity);
          if (data) {
            data.score -= 1;
            restart = true;
          }
        });
        if (restart) {
          this.startRound();
          console.log(...this.playersData.map(d => d.score));
          return true;
        }
      }
      return false;
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
