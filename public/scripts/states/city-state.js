let CBRadio = require('../models/cb');
let Taxi = require('../models/taxi');

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
        let layer = this.layer = this.map.createLayer('City Warsaw');
        layer.resizeWorld();
    }

    setupTilemap() {
        let map = this.map = this.add.tilemap('city-warsaw');
        map.addTilesetImage('city');
        map.addTilesetImage('river');
        map.addTilesetImage('street');
        // map.setCollisionByExclusion([26, 27, 40, 41]);
    }

    setupCamera() {
        let player = this.player;
        this.camera.follow(player);
    }

    setupPlayer() {
        let player = this.game.player = new Taxi(this.game);
        this.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.move(10, 5);
    }

    update() {
        this.game.player.updateMove();
    }
}

module.exports = CityState;
