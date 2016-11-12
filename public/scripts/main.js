'use strict';

let SuperEventEmitter = require('super-event-emitter');
let LoadingState = require('./states/loading-state');
let CityState = require('./states/city-state');
let GameStateManager = require('./state-manager');
let CONSTANTS = require('./constants/game');

class Game extends Phaser.Game {
    constructor(...args) {
        super(...args);
        SuperEventEmitter.mixin(this);
    }
}

let game = new Game(CONSTANTS.GAME_WIDTH, CONSTANTS.GAME_HEIGHT, Phaser.Canvas, 'game');
game.state.add('LoadingState', LoadingState);
game.state.add('CityState', CityState);

let manager = new GameStateManager(game);
manager.start();
