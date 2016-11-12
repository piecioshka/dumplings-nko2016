'use strict';

var SOCKET = require('./public/scripts/constants/socket');

module.exports = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('a user connected');

        let me = null;

        socket.on('disconnect', function () {
            console.log('user disconnected: ' + JSON.stringify(me));
            io.emit(SOCKET.DESTROY_PLAYER, me);
            me = null;
        });

        socket.on(SOCKET.SETUP_PLAYER, function (player) {
            console.log('setup player: message: ' + JSON.stringify(player));
            io.emit(SOCKET.SETUP_PLAYER, player);
            me = player;
        });

        socket.on(SOCKET.MOVE_PLAYER, function (player) {
            console.log('move player: message: ' + JSON.stringify(player));
            io.emit(SOCKET.MOVE_PLAYER, player);
        });
    });
};
