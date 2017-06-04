/* global document */

import Game from './Game';
import Entity from './Entity';
import Renderer from './Renderer';
import Controls from './Controls';

const game = new Game();

const playerEntity = new Entity();
game.entities.push(playerEntity);

const controls = new Controls();
controls.setEntity(playerEntity);

const renderer = new Renderer();
renderer.start(game);

game.start();

document.body.appendChild(renderer.canvas);
