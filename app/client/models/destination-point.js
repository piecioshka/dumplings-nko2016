const GAME = require('../../constants/game');

class DestinationPoint extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, 'river', 1);

        this.setupBody();

        game.add.existing(this);
    }

    spawn(x, y) {
        this.x = x * GAME.TILE_WIDTH;
        this.y = y * GAME.TILE_HEIGHT;
    }

    setupBody() {
        this.game.physics.arcade.enable(this);
    }

    destroy() {
        this.destroy();
    }
}

module.exports = DestinationPoint;
