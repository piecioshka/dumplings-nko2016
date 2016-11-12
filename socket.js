'use strict';

var SOCKET = require('./public/scripts/constants/socket');

class PlayerCollection {
    constructor() {
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
}

module.exports = function (server) {
    var io = require('socket.io')(server);
    var playerCollection = new PlayerCollection();

    io.on('connection', function (socket) {
        console.log('a user connected');

        let me = null;

        function removePlayer() {
            io.emit(SOCKET.DISCONNECT_PLAYER, me);
            playerCollection.remove(me);
            me = null;
        }

        socket.on('error', function () {
            console.log('error occur: ' + JSON.stringify(me));
            removePlayer();
        });

        socket.on('disconnect', function () {
            console.log('user disconnected: ' + JSON.stringify(me));
            removePlayer();
        });

        socket.on(SOCKET.SETUP_PLAYER, function (player) {
            console.log('setup player: message: ' + JSON.stringify(player));
            playerCollection.add(player);
            io.emit(SOCKET.SETUP_PLAYER, player, playerCollection.players);
            me = player;
        });

        socket.on(SOCKET.MOVE_PLAYER, function (player) {
            // console.log('move player: message: ' + JSON.stringify(player));
            io.emit(SOCKET.MOVE_PLAYER, player);
            playerCollection.update(player.id, player);
        });
    });
};
