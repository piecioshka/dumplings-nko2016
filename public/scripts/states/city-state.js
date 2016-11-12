let CBRadio = require('../models/cb');
let Taxi = require('../models/taxi');
let Passenger = require('../models/passenger');
let Spawner = require('../helpers/spawner');
let SOCKET = require('../constants/socket');

class CityState extends Phaser.State {
    map = null;
    layer = null;
    opponents = null;

    create() {
        this.setupWorld();
        this.setupPlayer();
        this.setupCamera();
        this.setupOpponents();

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
        this.game.player = new Taxi(this.game, this.game.nick);
        this.game.player.move(27, 24);
        this.game.socket.emit(SOCKET.SETUP_PLAYER, this.game.player.toJSON());
    }

    setupOpponents() {
        this.opponents = new Map();
        this.game.socket.on(SOCKET.SETUP_PLAYER, (opponent) => {
            if (opponent.id === this.game.player.id) {
                return;
            }

            debugger;

            let taxi = new Taxi(this.game, opponent.nick);
            taxi.move(opponent.x, opponent.y);
            taxi.id = opponent.id;
            this.opponents.set(taxi.id, taxi);
        });

        this.game.socket.on(SOCKET.MOVE_PLAYER, (opponent) => {
            if (opponent.id === this.game.player.id) {
                return;
            }

            debugger;

            let taxi = this.opponents.get(opponent.id);
            taxi.move(opponent.x, opponent.y);
        });

        this.game.socket.on(SOCKET.DESTROY_PLAYER, (opponent) => {
            if (!opponent) {
                return;
            }

            if (opponent.id === this.game.player.id) {
                return;
            }

            debugger;

            let taxi = this.opponents.get(opponent.id);
            taxi.destroy();
        });
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
        this.game.debug.bodyInfo(this.game.player, 25, 25);
        this.game.debug.body(this.game.player);
    }
}

module.exports = CityState;
