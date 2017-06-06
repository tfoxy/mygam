/* global document */

import Game from './Game';
import Renderer from './Renderer';
import Controls from './Controls';

import './index.css';

const game = new Game();

const controls1 = new Controls();
const controls2 = new Controls({
  FORWARD: 'KeyW',
  LEFT: 'KeyA',
  RIGHT: 'KeyD',
  SHOOT: 'ShiftLeft',
});
controls1.setEntity(game.playersData[0].ship);
controls2.setEntity(game.playersData[1].ship);

const renderer = new Renderer();
renderer.start(game);

game.start();

document.body.appendChild(renderer.canvas);
