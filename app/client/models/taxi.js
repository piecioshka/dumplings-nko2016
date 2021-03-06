let uuid = require('uuid');

const GAME = require('../../constants/game');
const TAXI = require('../../constants/taxi');

let DestinationPoint = require('./destination-point');

function createSize(sprite, width, height) {
    let spriteWidth = sprite.width;
    let spriteHeight = sprite.height;
    let offestX = (spriteWidth - width) / 2;
    let offestY = (spriteHeight - height) / 2;
    return [width, height, offestX, offestY];
}

class Taxi extends Phaser.Sprite {
    id = null;
    keyboard = null;
    cursors = null;
    nick = null;
    $label = null;

    // Liczba zdobytych punków
    score = 0;
    // Aktualny pasażer
    passenger = null;

    constructor(game, { nick, x, y, id }) {
        super(game, 0, 0, 'taxi-to-right', 1);

        this.anchor.setTo(0.12, 0);

        this.id = id || uuid.v4();
        this.x = x || TAXI.STARTING_POINT.X * GAME.TILE_WIDTH;
        this.y = y || TAXI.STARTING_POINT.Y * GAME.TILE_HEIGHT;

        this.setupLabel(nick);
        this.setupControls();
        this.setupBody();
        this.moveLabel();
        this.setupAnimation();

        game.add.existing(this);
    }

    setupAnimation() {
        this.animations.add('drive', [0, 1]);
        this.animations.play('drive', 8, true);
    }

    _createPositionX() {
        return this.x + (this.width / 2);
    }

    _createPositionY() {
        return this.y - 20;
    }

    setupLabel(nick) {
        this.nick = nick;
        let labelStyle = {
            fill: '#ffffff',
            fontSize: 16
        };
        this.$label = this.game.add.text(0, 0, '', labelStyle);
        this.$label.anchor.setTo(0.5, 0);
        this.updateLabelContent();
    }

    updateLabelContent() {
        let label = `${this.nick} (score=${this.score})`;
        this.$label.setText(label);
    }

    moveLabel() {
        this.$label.x = this._createPositionX();
        this.$label.y = this._createPositionY();
    }

    setupBody() {
        this.game.physics.arcade.enable(this);
        this.body.collideWorldBounds = true;
        this.setHorizontalSize();
    }

    setHorizontalSize() {
        this.body.setSize(...createSize(this, TAXI.WIDTH, TAXI.HEIGHT));
    }

    setVerticalSize() {
        this.body.setSize(...createSize(this, TAXI.HEIGHT, TAXI.WIDTH));
    }

    setupControls() {
        this.keyboard = this.game.input.keyboard;
        this.cursors = this.keyboard.createCursorKeys();
    }

    updateVelocity() {
        let { up, down, left, right } = this.cursors;
        let velocity = this.body.velocity;
        let speed = TAXI.SPEED;

        velocity.setTo(0, 0);

        if (up.isDown) {
            velocity.y = -1 * speed;
            this.loadTexture('taxi-to-bottom');
        }

        if (down.isDown) {
            velocity.y = speed;
            this.loadTexture('taxi-to-bottom');
        }

        if (left.isDown) {
            velocity.x = -1 * speed;
            this.loadTexture('taxi-to-left');
        }

        if (right.isDown) {
            velocity.x = speed;
            this.loadTexture('taxi-to-right');
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

    increaseScore() {
        this.score++;
    }

    decreaseScore() {
        this.score--;
    }

    setPassenger(passenger) {
        this.passenger = passenger;
    }

    setupDestinationPoint() {
        let destination = new DestinationPoint(this.game);
        let { x, y } = this.passenger.entryPoints.destination;
        destination.spawn(x, y);
    }

    deliver() {
        console.log('Taxi#deliver');

        let totalScore = this.passenger.getScore();
        this.passenger.destroy();
        alert(totalScore);
    }

    deletePasenger() {
        this.passenger = null;
    }

    isFree() {
        return (this.passenger === null);
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
