let EVENTS = require('../constants/events');

class LoadingState extends Phaser.State {
    constructor(...args) {
        super(...args);
    }

    preload() {
        setTimeout(() => {
            this.game.trigger(EVENTS.LOADING_COMPLETE);
        }, 1000);
    }
}

module.exports = LoadingState;
