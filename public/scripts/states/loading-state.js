let EVENTS = require('../constants/events');
let getCenterPositionX = require('../helpers/state-helper').getCenterPositionX;
let locale = require('../../locale/en.json');

class LoadingState extends Phaser.State {
    constructor(...args) {
        super(...args);
    }

    preload() {
        let getLeftPosition = getCenterPositionX.bind(this);

        let progressBar = this.add.sprite(getLeftPosition('pixel-loading'), 150, 'pixel-loading');
        this.load.setPreloadSprite(progressBar);

        this.load.path = './assets/sprites/';

        this.load.image('city', 'city.png');
        this.load.image('river', 'river.png');
        this.load.image('street', 'street.png');
        this.load.image('taxi', 'taxi.png');
        this.load.image('button', 'button.png');
        this.load.image('logo', 'logo.png');

        this.load.path = './assets/maps/';

        this.load.tilemap('city-warsaw', 'warsaw.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
        this.add.text(this.world.centerX - 80, 100, locale.PLEASE_WAIT, { fill: '#ffffff' });

        setTimeout(() => {
            this.game.trigger(EVENTS.LOADING_COMPLETED);
        }, 500);
    }
}

module.exports = LoadingState;
