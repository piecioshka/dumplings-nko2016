let CBRadio = require('../models/cb');
let Taxi = require('../models/taxi');
let Passenger = require('../models/passenger');

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

    setupLayers() {
        this.layer = this.map.createLayer('City Warsaw');
        this.layer.resizeWorld();
    }

    setupTilemap() {
        this.map = this.add.tilemap('city-warsaw');
        this.map.addTilesetImage('city');
        this.map.addTilesetImage('river');
        this.map.addTilesetImage('street');
        // this.map.setCollisionByExclusion([26, 27, 40, 41]);
    }

    setupCamera() {
        this.camera.follow(this.game.player);
    }

    setupPlayer() {
        this.game.player = new Taxi(this.game);
        this.physics.enable(this.game.player, Phaser.Physics.ARCADE);
        this.game.player.body.collideWorldBounds = true;
        this.game.player.move(27, 24);
    }

    update() {
        this.game.player.updateMove();
    }
}

module.exports = CityState;
