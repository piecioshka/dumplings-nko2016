let CBRadio = require('../models/cb');
let Taxi = require('../models/taxi');
let Passenger = require('../models/passenger');
let Spawner = require('../helpers/spawner');
let displayVersion = require('../helpers/version-helper').displayVersion;
let SOCKET_EVENTS = require('../../server/constants/events');

class CityState extends Phaser.State {
    map = null;
    layer = null;
    opponents = null;

    create() {
        // this.game.renderer.clearBeforeRender = false;
        // this.game.renderer.roundPixels = true;

        this.setupWorld();
        this.setupPlayer();
        this.setupCamera();
        this.setupOpponents();
        this.setupPassengers();

        this.cb = new CBRadio(this.game);
        this.cb.speak('ssdfsdf');
        displayVersion(this);
    }

    setupPassengers() {
        this.passengerSpawner = new Spawner(this.game, Passenger);
        this.passengerSpawner.setThreshold(200);
        this.passengerSpawner.setMap(this.map);
        this.passengerSpawner.spawn();
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
        this.game.player = new Taxi(this.game, { nick: this.game.nick });
        this.game.socket.emit(SOCKET_EVENTS.SETUP_PLAYER, this.game.player.toJSON());
    }

    setupOpponents() {
        this.opponents = new Map();

        this.game.socket.on(SOCKET_EVENTS.SETUP_PLAYER, (playersJSON) => {
            console.debug('SOCKET_EVENTS.SETUP_PLAYER', playersJSON);

            playersJSON.forEach((player) => {
                if (player.id === this.game.player.id) {
                    return;
                }

                console.info('New opponent', player);

                let taxi = new Taxi(this.game, {
                    nick: player.nick,
                    x: player.x,
                    y: player.y,
                    id: player.id
                });
                this.opponents.set(taxi.id, taxi);
            });
        });

        this.game.socket.on(SOCKET_EVENTS.MOVE_PLAYER, (opponentJSON) => {
            // console.debug('SOCKET_EVENTS.MOVE_PLAYER', opponentJSON);

            if (opponentJSON.id === this.game.player.id) {
                return;
            }

            // console.warn('Opponent "%s" moved to [%s, %s]', opponentJSON.nick, opponentJSON.x, opponentJSON.y);

            let taxi = this.opponents.get(opponentJSON.id);
            taxi.x = opponentJSON.x;
            taxi.y = opponentJSON.y;
            taxi.moveLabel();
        });

        this.game.socket.on(SOCKET_EVENTS.DISCONNECT_PLAYER, (opponentJSON) => {
            console.debug('SOCKET_EVENTS.DISCONNECT_PLAYER', opponentJSON);

            if (!opponentJSON) {
                return;
            }

            if (opponentJSON.id === this.game.player.id) {
                return;
            }

            console.error('Opponent is destroyed', opponentJSON);

            let taxi = this.opponents.get(opponentJSON.id);
            taxi.destroy();
        });
    }

    update() {
        this.game.player.updateVelocity();
        this.handleCollision();
    }

    handleCollision() {
        this.physics.arcade.collide(this.game.player, this.layer);
        this.physics.arcade.collide(this.game.player, this.passengerSpawner.getSpriteGroup(), (player, item) => {
            item.destroy();
        });
    }

    render() {
        this.game.debug.bodyInfo(this.game.player, 25, 25);
        this.game.debug.body(this.game.player);

        if (this.game.player.isMoved()) {
            this.game.socket.emit(SOCKET_EVENTS.MOVE_PLAYER, this.game.player.toJSON());
        }

        if (this.game.player.deltaX) {
            this.game.player.setHorizontalSize();
        }

        if (this.game.player.deltaY) {
            this.game.player.setVerticalSize();
        }
    }
}

module.exports = CityState;
