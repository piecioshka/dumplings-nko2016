let SuperEventEmitter = require('super-event-emitter');
let GameStateManager = require('./state-manager');
let CONSTANTS = require('./constants/game');

let BootstrapState = require('./states/boostrap-state');
let LoadingState = require('./states/loading-state');
let MenuState = require('./states/menu-state');
let CityState = require('./states/city-state');

let socket = io();

class Game extends Phaser.Game {
    constructor(...args) {
        super(...args);
        SuperEventEmitter.mixin(this);
        this.socket = socket;
    }
}

let game = new Game(CONSTANTS.GAME_WIDTH, CONSTANTS.GAME_HEIGHT, Phaser.Canvas, 'game');
game.state.add('BootstrapState', BootstrapState);
game.state.add('LoadingState', LoadingState);
game.state.add('MenuState', MenuState);
game.state.add('CityState', CityState);

let manager = new GameStateManager(game);
manager.start();
