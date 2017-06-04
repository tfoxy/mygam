/* global document */

import Game from './Game';
import Entity from './Entity';
import Renderer from './Renderer';
import Controls from './Controls';

import './index.css';

const game = new Game();

const player1Entity = new Entity();
const player2Entity = new Entity({
  color: 'red',
  position: { x: game.width - 50, y: game.height - 50 },
  angle: Math.PI,
});
game.entities.push(player1Entity);
game.entities.push(player2Entity);

const controls1 = new Controls();
const controls2 = new Controls({
  FORWARD: 'w',
  LEFT: 'a',
  RIGHT: 'd',
});
controls1.setEntity(player1Entity);
controls2.setEntity(player2Entity);

const renderer = new Renderer();
renderer.start(game);

game.start();

document.body.appendChild(renderer.canvas);
