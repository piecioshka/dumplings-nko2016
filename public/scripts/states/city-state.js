let CBRadio = require('../models/cb');
let Taxi = require('../models/taxi');
let Passenger = require('../models/passenger');
let Spawner = require('../helpers/spawner');

class CityState extends Phaser.State {
    map = null;
    layer = null;

    create() {
        this.setupTilemap();
        this.setupLayers();
        this.setupPlayer();
        this.setupCamera();

        this.cb = new CBRadio(this.game);
    }

    setupTilemap() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.add.tilemap('city-warsaw');
        this.map.addTilesetImage('city');
        this.map.addTilesetImage('river');
        this.map.addTilesetImage('street');
        // this.map.setCollisionByExclusion([1]);
        this.map.setCollision([0, 1, 2, 3]);
    }

    setupLayers() {
        this.layer = this.map.createLayer('City Warsaw');
        this.layer.resizeWorld();
    }

    setupCamera() {
        this.camera.follow(this.game.player);
    }

    setupPlayer() {
        this.game.player = new Taxi(this.game);
        this.game.player.move(27, 24);
    }

    update() {
        this.game.player.updateMove();
        this.handleCollision();
    }

    handleCollision() {
        this.physics.arcade.collide(this.game.player, this.layer, (...args) => {
            console.log(...args);
        });
    }

    render() {
        this.game.debug.bodyInfo(this.game.player, 25, 25);
        this.game.debug.body(this.game.player);
    }
}

module.exports = CityState;
