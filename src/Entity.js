import { ZERO_POS } from './positions';

let nextId = 0;

export default class Entity {
  constructor() {
    nextId += 1;
    this.id = nextId;
    this.color = 'green';
    this.size = { x: 25, y: 25 };
    this.position = ZERO_POS;
    this.speed = ZERO_POS;
    this.acceleration = ZERO_POS;
    this.maxSpeed = 800;
    this.accelerationModule = 10;
  }
}
