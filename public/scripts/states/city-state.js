let CBRadio = require('../models/cb');
let Taxi = require('../models/taxi');

class CityState extends Phaser.State {
    map = null;
    layer = null;

    create() {
        this.setupWorld();
        this.setupPlayer();
        this.setupCamera();

        this.cb = new CBRadio(this.game);
    }

    setupWorld() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.add.tilemap('city-warsaw');
        this.map.addTilesetImage('street'); // 1
        this.map.addTilesetImage('city');   // 2
        this.map.addTilesetImage('river');  // 3
        this.map.setCollision([2, 3]);

        this.layer = this.map.createLayer('City Warsaw');
        this.layer.resizeWorld();
        // this.layer.debug = true;
    }

    setupCamera() {
        this.camera.follow(this.game.player);
    }

    setupPlayer() {
        this.game.player = new Taxi(this.game);
        this.game.player.move(27, 24);
    }

    update() {
        this.game.player.resetVelocity();
        this.game.player.updateVelocity();
        this.handleCollision();
    }

    handleCollision() {
        this.physics.arcade.collide(this.game.player, this.layer);
    }

    render() {
        // this.game.debug.bodyInfo(this.game.player, 25, 25);
        this.game.debug.body(this.game.player);
    }
}

module.exports = CityState;
