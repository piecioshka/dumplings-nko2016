let EVENTS = require('../constants/events');

class BootstrapState extends Phaser.State {
    preload() {
        this.load.path = './assets/sprites/';
        this.load.image('pixel-loading', 'pixel-loading.png');
        this.load.image('taxi-city-intro', 'taxi-city-intro.png');
        this.load.image('taxi-big-1', 'taxi-big-1.png');
        // this.load.image('taxi-big-2', 'taxi-big-2.png');
        this.load.spritesheet('taxi-big-2-fire', 'taxi-big-2-fire.png', 705, 214);
        this.load.spritesheet('babeczka', 'babeczka.png', 127, 276);
    }

    create() {
        this.game.trigger(EVENTS.BOOTSTRAP_COMPLETED);
    }
}

module.exports = BootstrapState;
