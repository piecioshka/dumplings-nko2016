let CONSTANTS = require('../constants/game');

class Taxi extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, 'taxi', 1);
        game.add.existing(this);
    }

    move(x, y) {
        this.x = x * CONSTANTS.TILE_WIDTH;
        this.y = y * CONSTANTS.TILE_HEIGHT;
    }
}

module.exports = Taxi;
