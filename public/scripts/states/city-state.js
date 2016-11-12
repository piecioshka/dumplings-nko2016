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
        this.setupPassengers();

        this.cb = new CBRadio(this.game);
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
        this.game.player = new Taxi(this.game, this.game.nick);
        this.game.player.moveLabel();

        this.game.socket.emit(SOCKET.SETUP_PLAYER, this.game.player.toJSON());
    }

    setupOpponents() {
        this.opponents = new Map();
        this.game.socket.on(SOCKET.SETUP_PLAYER, (opponentJSON, playersJSON) => {
            // console.debug('SOCKET.SETUP_PLAYER', opponentJSON, playersJSON);

            playersJSON.forEach((player) => {
                if (player.id === this.game.player.id) {
                    return;
                }

                // console.info('New opponent', player);

                let taxi = new Taxi(this.game, player.nick);
                taxi.x = player.x;
                taxi.y = player.y;
                taxi.id = player.id;
                this.opponents.set(taxi.id, taxi);
                // debugger;
            });
        });

        this.game.socket.on(SOCKET.MOVE_PLAYER, (opponentJSON) => {
            // console.debug('SOCKET.MOVE_PLAYER', opponentJSON);

            if (opponentJSON.id === this.game.player.id) {
                return;
            }

            // console.warn('Opponent "%s" moved to [%s, %s]', opponent.nick, opponent.x, opponent.y);

            let taxi = this.opponents.get(opponentJSON.id);

            taxi.x = opponentJSON.x;
            taxi.y = opponentJSON.y;
        });

        this.game.socket.on(SOCKET.DISCONNECT_PLAYER, (opponentJSON) => {
            // console.debug('SOCKET.DISCONNECT_PLAYER', opponentJSON);

            if (!opponentJSON) {
                return;
            }

            if (opponentJSON.id === this.game.player.id) {
                return;
            }

            // console.error('Opponent is destroyed', opponent);

            let taxi = this.opponents.get(opponentJSON.id);
            // TODO(piecioshka): serwer przesyła informację o wszystkich aktualnych graczach
            if (taxi) {
                taxi.destroy();
            }
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

        let deltaX = this.game.player.deltaX;
        let deltaY = this.game.player.deltaY;

        if (deltaX || deltaY) {
            this.game.socket.emit(SOCKET.MOVE_PLAYER, this.game.player.toJSON());
        }
    }
}

module.exports = CityState;
