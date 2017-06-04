/* global document */

import Game from './Game';
import Renderer from './Renderer';
import Controls from './Controls';

import './index.css';

const game = new Game();

const controls1 = new Controls();
const controls2 = new Controls({
  FORWARD: 'w',
  LEFT: 'a',
  RIGHT: 'd',
});
controls1.setEntity(game.player1Entity);
controls2.setEntity(game.player2Entity);

const renderer = new Renderer();
renderer.start(game);

game.start();

document.body.appendChild(renderer.canvas);

// window.p1 = player1Entity;
// window.p2 = player2Entity;
