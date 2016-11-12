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
        this.load.image('cross', 'cross.png');
        this.load.image('gt', 'gt.png');

        this.load.path = './assets/maps/';

        this.load.tilemap('city-warsaw', 'warsaw.json', null, Phaser.Tilemap.TILED_JSON);
    }

    create() {
        let $text = this.add.text(this.world.centerX, 200, locale.PLEASE_WAIT, { fill: '#ffffff' });
        $text.anchor.setTo(0.5, 0);

        setTimeout(() => {
            this.game.trigger(EVENTS.LOADING_COMPLETED);
        }, 500);
    }
}

module.exports = LoadingState;
