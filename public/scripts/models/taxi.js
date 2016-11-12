let CONSTANTS = require('../constants/game');

const TAXI_CONSTANTS = {
    MOVE_BY: {
        up: 10,
        down: 10,
        left: 10,
        right: 10
    }
}

class Taxi extends Phaser.Sprite {
    cursors = null;

    constructor(game) {
        super(game, 0, 0, 'taxi', 1);
        game.add.existing(this);

        this.setupControls();
    }

    move(x, y) {
        this.x = x * CONSTANTS.TILE_WIDTH;
        this.y = y * CONSTANTS.TILE_HEIGHT;
    }

    setupControls() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    updateMove() {
        let { up, down, left, right } = this.cursors;

        if (up.isDown) {
            this.y -= TAXI_CONSTANTS.MOVE_BY.up;
        }

        if (down.isDown) {
            this.y += TAXI_CONSTANTS.MOVE_BY.down;
        }

        if (left.isDown) {
            this.x -= TAXI_CONSTANTS.MOVE_BY.left;
        }

        if (right.isDown) {
            this.x += TAXI_CONSTANTS.MOVE_BY.right;
        }
    }
}

module.exports = Taxi;
