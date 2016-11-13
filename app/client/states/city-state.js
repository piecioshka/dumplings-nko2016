let CBRadio = require('../models/cb-radio');
let Taxi = require('../models/taxi');
let Passenger = require('../models/passenger');
let Spawner = require('../helpers/spawner');
let displayGameVersion = require('../helpers/version-helper').displayGameVersion;
let locale = require('../locale/en.json');
let SOCKET = require('../../constants/socket');

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
        this.cb.speak(CBRadio.buildMSG(locale.CB.HELLO, { nick: this.game.player.nick }));
        displayGameVersion(this);
    }

    setupPassengers() {
        this.passengerSpawner = new Spawner(this.game, Passenger);

        this.game.socket.on(SOCKET.SET_PASSENGERS, (endPointsJSON) => {
            console.log('setupPassengers: SOCKET_EVENTS.SET_PASSENGERS', endPointsJSON);
            this.passengerSpawner.spawn(endPointsJSON);
        });
    }

    setupWorld() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.map = this.add.tilemap('city-warsaw');
        this.map.addTilesetImage('street');
        this.map.addTilesetImage('city-1');
        this.map.addTilesetImage('city-2');
        this.map.addTilesetImage('city-3');
        this.map.addTilesetImage('city-4');
        this.map.addTilesetImage('city-5');
        this.map.addTilesetImage('city-6');
        this.map.addTilesetImage('city-7');
        this.map.addTilesetImage('grass');
        this.map.addTilesetImage('river');

        // this.map.tilesets.map(map => map.firstgid)
        this.map.setCollision([13, 14, 15, 24, 33, 42, 51, 60, 69]);

        this.layer = this.map.createLayer('City Warsaw');
        this.layer.resizeWorld();
        // this.layer.debug = true;
    }

    setupCamera() {
        this.camera.follow(this.game.player);
    }

    setupPlayer() {
        this.game.player = new Taxi(this.game, { nick: this.game.nick });
        this.game.socket.emit(SOCKET.SETUP_PLAYER, this.game.player.toJSON());
    }

    setupOpponents() {
        this.opponents = new Map();

        this.game.socket.on(SOCKET.SETUP_PLAYER, (playersJSON) => {
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

                this.cb.speak(CBRadio.buildMSG(locale.CB.PLAYER_NEW, { nick: taxi.nick }));
            });
        });

        this.game.socket.on(SOCKET.MOVE_PLAYER, (opponentJSON) => {
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

        this.game.socket.on(SOCKET.DISCONNECT_PLAYER, (opponentJSON) => {
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
            this.cb.speak(CBRadio.buildMSG(locale.CB.PLAYER_DISCONNECTED, { nick: taxi.nick }));
        });
    }

    update() {
        this.game.player.updateVelocity();
        this.handleCollision();
    }

    handleCollision() {
        let player = this.game.player;
        let passengers = this.passengerSpawner.getSpriteGroup();
        let map = this.layer;

        this.physics.arcade.collide(player, map);
        this.physics.arcade.collide(passengers, map);
        this.physics.arcade.collide(player, passengers, (taxi, passenger) => {
            if (!taxi.isFree()) {
                passenger.body.enable = false;
                return;
            }

            taxi.setPassenger(passenger);
            taxi.setupDestinationPoint();
            passenger.pickUp();

            // TODO(piecioshka): to musi działać, aby serwer wiedział o tym, że dany pasażer został zabrany
            // this.game.socket.emit(SOCKET.DESTROY_PASSENGER, passenger);

            this.cb.speak(CBRadio.buildMSG(locale.CB.TAXI_PICKUP_PASSENGER, { nick: taxi.nick }));
        });
    }

    render() {
        this.game.debug.bodyInfo(this.game.player, 25, 25);
        this.game.debug.body(this.game.player);

        if (this.game.player.isMoved()) {
            this.game.socket.emit(SOCKET.MOVE_PLAYER, this.game.player.toJSON());
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
