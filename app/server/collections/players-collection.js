const SOCKET = require('./../../constants/socket');

class PlayersCollection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.players = [];
    }

    add(player) {
        this.players.push(player);
    }

    remove(player) {
        var index = this.players.indexOf(player);
        this.players.splice(index, 1);
        this.io.emit(SOCKET.DISCONNECT_PLAYER, player);
    }

    updateByID(playerId, player) {
        let playerIndex = -1;
        this.players.forEach((player, index) => {
            if (player.id === playerId) {
                playerIndex = index;
            }
        });
        this.players[playerIndex] = player;
    }

    setupListeners() {
        let me = null;

        this.socket.on(SOCKET.SETUP_PLAYER, (player) => {
            console.log('[PlayersCollection] setup-player: message: ' + JSON.stringify(player));
            this.add(player);
            me = player;
            this.io.emit(SOCKET.SETUP_PLAYER, this.players);
        });

        this.socket.on(SOCKET.MOVE_PLAYER, (player) => {
            // console.log('[PlayersCollection] move-player: message: ' + JSON.stringify(player));
            this.updateByID(player.id, player);
            this.io.emit(SOCKET.MOVE_PLAYER, player);
        });

        this.socket.on('error', () => {
            console.log('[PlayersCollection] client-error: ' + JSON.stringify(me));
            this.remove(me);
            me = null;
        });

        this.socket.on('disconnect', () => {
            console.log('[PlayersCollection] client-disconnect: ' + JSON.stringify(me));
            this.remove(me);
            me = null;
        });
    }
}

module.exports = PlayersCollection;
