import { Vector, Polygon, testPolygonPolygon } from 'sat';
import { polarToCartesian, sumVectors, vectorModule } from './vectors';
import Ship from './entities/Ship';
import Shot from './entities/Shot';
import GameMap from './GameMap';

const PI2 = 2 * Math.PI;

function pull(array, item) {
  const index = array.indexOf(item);
  if (index >= 0) {
    array.splice(index, 1);
  }
}

export default class Game {
  constructor() {
    this.map = new GameMap();
    this.entities = [];
    this.tickrate = 128;
    this.loopInterval = 1000 / this.tickrate;
    this.playersData = [{
      ship: new Ship({ color: 'green' }),
      shot: new Shot(),
      lives: 10,
    }, {
      ship: new Ship({ color: 'red' }),
      shot: new Shot(),
      lives: 10,
    }];
  }

  get width() {
    return this.map.width;
  }

  get height() {
    return this.map.height;
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
      position: { x: this.width * (1 / 4), y: this.height * (1 / 4) },
      angle: 0,
    });
    Object.assign(this.playersData[1].ship, {
      position: { x: this.width * (3 / 4), y: this.height * (3 / 4) },
      angle: Math.PI,
    });
    this.entities.push(...this.playersData.filter(d => d.lives > 0).map(d => d.ship));
  }

  makeShots() {
    this.playersData.forEach(({ ship, shot }) => {
      if (ship.shooting) {
        shot.maxSpeed = ship.maxSpeed * 1.5;
        shot.maxAcceleration = ship.maxAcceleration * 8;
        shot.oppositionModule = ship.oppositionModule * 4;
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
            data.lives -= 1;
            restart = true;
          }
        });
        if (restart) {
          this.startRound();
          console.log(...this.playersData.map(d => d.lives));
          return true;
        }
      }
      return false;
    });
  }

  getEntitySatPolygonList(entity) {
    return this.map.getEntityPolygons(entity).map(
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
    let angularAccelerationSum = angularAcceleration;
    angularAccelerationSum -= entity.angularOpposition * entity.angularSpeed;
    if (angularAccelerationSum) {
      const tickAngularAcceleration = angularAccelerationSum / this.tickrate;
      const angularSpeed = entity.angularSpeed + tickAngularAcceleration;
      // const maxAngularSpeed = entity.maxAngularSpeed / this.tickrate;
      // if (angularSpeed > maxAngularSpeed) {
      //   angularSpeed = maxAngularSpeed;
      // } else if (angularSpeed < -maxAngularSpeed) {
      //   angularSpeed = -maxAngularSpeed;
      // }
      entity.angularSpeed = angularSpeed;
    }
    if (acceleration) {
      const tickAcceleration = acceleration / this.tickrate;
      const { speed, angle } = entity;
      const speedDiff = polarToCartesian(tickAcceleration, angle);
      const newSpeed = sumVectors(speed, speedDiff);
      // const speedModule = vectorModule(newSpeed);
      // const maxSpeed = entity.maxSpeed / this.tickrate;
      // if (speedModule > maxSpeed) {
      //   const speedRatio = maxSpeed / speedModule;
      //   newSpeed.x *= speedRatio;
      //   newSpeed.y *= speedRatio;
      // }
      entity.speed = newSpeed;
    }
    if (entity.speed.x || entity.speed.y) {
      const { speed, oppositionModule } = entity;
      const speedModule = vectorModule(speed);
      const oppositionAcceleration = oppositionModule * speedModule;
      const tickAcceleration = oppositionAcceleration / this.tickrate;
      const speedRatio = (speedModule - tickAcceleration) / speedModule;
      const newSpeed = { x: speed.x * speedRatio, y: speed.y * speedRatio };
      entity.speed = newSpeed;
    }
  }
}
