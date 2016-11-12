let uuid = require('uuid');

let CONSTANTS = require('../constants/game');

const TAXI_CONSTANTS = 400;

class Taxi extends Phaser.Sprite {
    id = null;
    cursors = null;
    nick = null;
    $label = null;

    constructor(game, { nick, x, y, id }) {
        super(game, 0, 0, 'taxi', 1);

        this.anchor.setTo(0.12, 0);

        this.id = id || uuid.v4();
        this.x = x || 27 * CONSTANTS.TILE_WIDTH;
        this.y = y || 24 * CONSTANTS.TILE_HEIGHT;

        this.setupLabel(nick);
        this.setupControls();
        this.setupBody();
        this.moveLabel();

        game.add.existing(this);
    }

    _createPositionX() {
        return this.x + (this.width / 2);
    }

    _createPositionY() {
        return this.y - 20;
    }

    setupLabel(nick) {
        this.nick = nick;
        this.$label = this.game.add.text(0, 0, '', {
            fill: '#ffffff',
            fontSize: 14
        });
        this.$label.anchor.setTo(0.5, 0);
        this.updateLabelContent();
    }

    updateLabelContent() {
        let label = this.nick + ' (' + this.x + ', ' + this.y + ')';
        this.$label.setText(label);
    }

    moveLabel() {
        this.$label.x = this._createPositionX();
        this.$label.y = this._createPositionY();
    }

    setupBody() {
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.body.setSize(55, 50, 15, 7);
    }

    setupControls() {
        let keyboard = this.game.input.keyboard;
        this.cursors = keyboard.createCursorKeys();
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

        this.moveLabel();
        this.updateLabelContent();
    }

    isMoved() {
        return this.deltaX || this.deltaY;
    }

    destroy(...args) {
        super.destroy(...args);
        this.$label.destroy();
    }

    toJSON() {
        return {
            x: this.x,
            y: this.y,
            nick: this.nick,
            id: this.id,
        }
    }
}

module.exports = Taxi;
