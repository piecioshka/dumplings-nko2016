let uuid = require('uuid');

let CONSTANTS = require('../constants/game');
let SOCKET = require('../constants/socket');

const TAXI_CONSTANTS = 400;

class Taxi extends Phaser.Sprite {
    id = null;
    cursors = null;
    nick = null;
    $label = null;

    constructor(game, nick) {
        super(game, 0, 0, 'taxi', 1);

        this.anchor.setTo(0.12, 0);

        this.id = uuid.v4();

        this.setupLabel(nick);
        this.setupControls();
        this.setupBody();

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
        let x = this._createPositionX();
        let y = this._createPositionY();
        this.$label = this.game.add.text(x, y, this.nick, {
            fill: '#ffffff',
            fontSize: 12
        });
        this.$label.anchor.setTo(0.5, 0);
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

    // Używamy TYLKO do ustawienia modelu na początku rozgrywki.
    // Przez modyfikację pozycji nie uzyskamy kolizji!!!
    move(x, y) {
        this.x = x * CONSTANTS.TILE_WIDTH;
        this.y = y * CONSTANTS.TILE_HEIGHT;

        this.moveLabel();
    }

    setupControls() {
        let keyboard = this.game.input.keyboard;

        this.cursors = keyboard.createCursorKeys();

        keyboard.addCallbacks(this, (...args) => {
            args
            debugger;
            this.game.socket.emit(SOCKET.MOVE_PLAYER, this.toJSON());
        });
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
    }

    destroy(...args) {
        super.destroy(...args);
        this.label.destroy();
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
