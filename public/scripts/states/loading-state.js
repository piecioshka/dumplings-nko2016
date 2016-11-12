let EVENTS = require('../constants/events');
let CONSTANTS = require('../constants/game');

class LoadingState extends Phaser.State {
    constructor(...args) {
        super(...args);
    }

    preload() {
        this.load.path = './assets/sprites/';

        this.load.image('city', 'city.png');
        this.load.image('river', 'river.png');
        this.load.image('street', 'street.png');

        this.load.path = './assets/maps/';

        this.load.tilemap('city-warsaw', 'warsaw.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
        this.game.trigger(EVENTS.LOADING_COMPLETE);
    }
}

module.exports = LoadingState;
