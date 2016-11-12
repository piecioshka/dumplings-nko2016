let EVENTS = require('../constants/events');

class BootstrapState extends Phaser.State {
    preload() {
        this.load.path = './assets/sprites/';
        this.load.image('pixel-loading', 'pixel-loading.png');
    }

    create() {
        this.game.trigger(EVENTS.BOOTSTRAP_COMPLETED);
    }
}

module.exports = BootstrapState;
