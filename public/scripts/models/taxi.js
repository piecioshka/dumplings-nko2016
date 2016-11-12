class Taxi extends Phaser.Sprite {
    constructor(game) {
        super(0, 0, 'taxi');
        game.add.sprite(this);

        // game.camera.follow(this);
    }
}

module.exports = Taxi;
