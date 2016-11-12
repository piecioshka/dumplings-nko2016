let CONSTANTS = require('../constants/game');

const TAXI_CONSTANTS = 400;

class Taxi extends Phaser.Sprite {
    cursors = null;

    constructor(game) {
        super(game, 0, 0, 'taxi', 1);

        this.setupControls();
        this.setupBody();

        game.add.existing(this);
    }

    setupBody() {
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.setSize(60, 64, 2, 0);
    }

    // Używamy TYLKO do ustawienia modelu na początku rozgrywki.
    // Przez modyfikację pozycji nie uzyskamy kolizji!!!
    move(x, y) {
        this.x = x * CONSTANTS.TILE_WIDTH;
        this.y = y * CONSTANTS.TILE_HEIGHT;
    }

    setupControls() {
        this.cursors = this.game.input.keyboard.createCursorKeys();
    }

    resetVelocity() {
        this.body.velocity.setTo(0, 0);
    }

    updateVelocity() {
        let { up, down, left, right } = this.cursors;
        let velocity = this.body.velocity;

        if (up.isDown) {
            velocity.y = -1 * TAXI_CONSTANTS;
        }

        if (down.isDown) {
            velocity.y = TAXI_CONSTANTS;
        }

        if (left.isDown) {
            velocity.x = -1 * TAXI_CONSTANTS;
        }

        if (right.isDown) {
            velocity.x = TAXI_CONSTANTS;
        }
    }
}

module.exports = Taxi;
