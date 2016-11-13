const EVENTS = require('./../constants/events');

class PlayersCollection {
    constructor() {
        this.me = null;
        this.players = [];
    }

    add(player) {
        this.players.push(player);
    }

    remove(player) {
        var index = this.players.indexOf(player);
        this.players.splice(index, 1);
    }

    update(playerId, player) {
        let playerIndex = -1;
        this.players.forEach((player, index) => {
            if (player.id === playerId) {
                playerIndex = index;
            }
        });
        this.players[playerIndex] = player;
    }

    getPlayer() {
        return this.me;
    }

    removePlayer() {
        this.remove(this.me);
        this.me = null;
    }

    addEventListeners(socket, io) {
        socket.on(EVENTS.SETUP_PLAYER, (player) => {
            console.log('setup player: message: ' + JSON.stringify(player));
            this.add(player);
            this.me = player;
            io.emit(EVENTS.SETUP_PLAYER, this.players);
        });

        socket.on(EVENTS.MOVE_PLAYER, (player) => {
            // console.log('move player: message: ' + JSON.stringify(player));
            this.update(player.id, player);
            io.emit(EVENTS.MOVE_PLAYER, player);
        });
    }
}

module.exports = PlayersCollection;
