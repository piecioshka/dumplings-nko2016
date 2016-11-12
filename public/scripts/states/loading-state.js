let EVENTS = require('../constants/events');
let getCenterPositionX = require('../helpers/state-helper').getCenterPositionX;
let locale = require('../../locale/en.json');

class LoadingState extends Phaser.State {
    getLeftPosition = getCenterPositionX.bind(this);

    constructor(...args) {
        super(...args);
    }

    preload() {
        let progressBar = this.add.sprite(this.getLeftPosition('pixel-loading'), 250, 'pixel-loading');
        this.load.setPreloadSprite(progressBar);

        this.load.path = './assets/sprites/';

        this.load.image('city', 'city.png');
        this.load.image('river', 'river.png');
        this.load.image('street', 'street.png');
        this.load.image('taxi', 'taxi.png');
        this.load.image('button', 'button.png');
        this.load.image('logo', 'logo.png');
        this.load.image('text-input', 'text-input.png');
        this.load.image('cb-radio', 'cb-radio.png');

        this.load.path = './assets/maps/';

        this.load.tilemap('city-warsaw', 'warsaw.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
        this.add.text(this.world.centerX - 80, 200, locale.PLEASE_WAIT, { fill: '#ffffff' });

        setTimeout(() => {
            this.game.trigger(EVENTS.LOADING_COMPLETED);
        }, 500);
    }
}

module.exports = LoadingState;
