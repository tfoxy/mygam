/* global document */

import Game from './Game';
import Entity from './Entity';
import Renderer from './Renderer';
import Controls from './controls/CoordinatesControls';

const game = new Game();

const playerEntity = new Entity();
game.entities.push(playerEntity);

const controls = new Controls(game);
controls.setEntity(playerEntity);

const renderer = new Renderer();
renderer.start(game);

game.start();

document.body.appendChild(renderer.canvas);
