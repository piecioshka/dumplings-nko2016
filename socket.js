'use strict';

var SOCKET = require('./public/scripts/constants/socket');

module.exports = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('a user connected');

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on(SOCKET.SETUP_PLAYER, function (msg) {
            console.log('setup player: message: ' + JSON.stringify(msg));
        });

        socket.on(SOCKET.MOVE_PLAYER, function (msg) {
            console.log('move player: message: ' + JSON.stringify(msg));
        });
    });
};
