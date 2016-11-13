const STATE_EVENTS = require('../../constants/state-events');

class BootstrapState extends Phaser.State {
    preload() {
        this.load.path = './assets/sprites/';
        this.load.image('pixel-loading', 'pixel-loading.png');
        this.load.image('taxi-city-intro', 'taxi-city-intro.png');
        this.load.spritesheet('taxi-huge-1', 'taxi-huge-1.png', 553, 250);
        this.load.spritesheet('taxi-huge-2-fire', 'taxi-huge-2-fire.png', 618, 250);
        this.load.spritesheet('babeczka', 'babeczka.png', 114, 276);
    }

    create() {
        this.game.trigger(STATE_EVENTS.BOOTSTRAP_COMPLETED);
    }
}

module.exports = BootstrapState;
