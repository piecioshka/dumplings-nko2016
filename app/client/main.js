let SuperEventEmitter = require('super-event-emitter');
let GameStateManager = require('./state-manager');
let GAME = require('./constants/game');

let BootstrapState = require('./states/boostrap-state');
let LoadingState = require('./states/loading-state');
let MenuState = require('./states/menu-state');
let CityState = require('./states/city-state');

class Game extends Phaser.Game {
    constructor(...args) {
        super(...args);
        SuperEventEmitter.mixin(this);
        this.socket = io();
        this.player = null;
        this.nick = null;
    }
}

let game = new Game(GAME.GAME_WIDTH, GAME.GAME_HEIGHT, Phaser.Canvas, 'game');
game.state.add('BootstrapState', BootstrapState);
game.state.add('LoadingState', LoadingState);
game.state.add('MenuState', MenuState);
game.state.add('CityState', CityState);

let manager = new GameStateManager(game);
manager.start();
