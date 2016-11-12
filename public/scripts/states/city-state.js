let Taxi = require('../models/taxi');

class CityState extends Phaser.State {
    map = null;
    layer = null;

    create() {
        this.map = this.add.tilemap('city-warsaw');
        this.map.addTilesetImage('city');
        this.map.addTilesetImage('river');
        this.map.addTilesetImage('street');

        // this.map.setCollisionByExclusion([26, 27, 40, 41]);

        this.layer = this.map.createLayer('City Warsaw');
        this.layer.resizeWorld();

        this.game.player = new Taxi(this.game);

        this.game.player.move(10, 5);
        this.camera.follow(this.game.player);
    }

    update() {
        this.game.player.updateMove();
    }
}

module.exports = CityState;
