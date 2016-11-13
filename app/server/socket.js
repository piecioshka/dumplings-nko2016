'use strict';

var SOCKET = require('../server/constants/socket');
var PlayersCollection = require('./players-collection');
var PassengersCollection = require('./passengers-collection');

module.exports = function (server) {
    var io = require('socket.io')(server);
    var playersCollection = new PlayersCollection();
    var passengersCollection = new PassengersCollection();

    io.on('connection', function (socket) {
        console.log('a user connected');

        let me = null;

        function removePlayer() {
            io.emit(SOCKET.DISCONNECT_PLAYER, me);
            playersCollection.remove(me);
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
            playersCollection.add(player);
            io.emit(SOCKET.SETUP_PLAYER, playersCollection.players);
            me = player;
        });

        socket.on(SOCKET.SETUP_PASSENGERS, function (coords) {
            console.log('setup passengers: message: ' + JSON.stringify(coords));
            passengersCollection.setCoords(coords);
            passengersCollection.setThreshold(200);
            passengersCollection.generate();
            io.emit(SOCKET.SETUP_PASSENGERS, playersCollection.passengers);
        });

        socket.on(SOCKET.MOVE_PLAYER, function (player) {
            // console.log('move player: message: ' + JSON.stringify(player));
            io.emit(SOCKET.MOVE_PLAYER, player);
            playersCollection.update(player.id, player);
        });
    });
};
