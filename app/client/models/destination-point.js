const GAME = require('../../constants/game');

class DestinationPoint extends Phaser.Sprite {
    passenger = null;
    group = null;

    constructor(game, passenger) {
        super(game, 0, 0, 'river', 1);
        game.add.existing(this);

        this.passenger = passenger;
        this.setupCollision();
    }

    setupCollision() {
        this.group = this.game.add.group();
        this.group.enableBody = true;
    }

    put(x, y) {
        this.x = x * GAME.TILE_WIDTH;
        this.y = y * GAME.TILE_HEIGHT;
    }

    destroy() {
        this.passenger.deliver();
        this.destroy();
    }
}

module.exports = DestinationPoint;
