const GAME = require('../../constants/game');

class DestinationPoint extends Phaser.Sprite {
    constructor(game, passenger) {
        super(game, 0, 0, 'river', 1);
        game.add.existing(this);
    }

    spawn(x, y) {
        this.x = x * GAME.TILE_WIDTH;
        this.y = y * GAME.TILE_HEIGHT;
    }

    destroy() {
        this.destroy();
    }
}

module.exports = DestinationPoint;
