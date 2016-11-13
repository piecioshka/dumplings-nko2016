'use strict';

let EVENTS = require('./constants/events');
let PlayersCollection = require('./collections/players-collection');
let PassengersCollection = require('./collections/passengers-collection');

module.exports = (server) => {
    let io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        let playersCollection = new PlayersCollection();
        let passengersCollection = new PassengersCollection();

        function removePlayer() {
            let me = playersCollection.getPlayer();
            playersCollection.removePlayer();
            io.emit(EVENTS.DISCONNECT_PLAYER, me);
        }

        socket.on('error', () => {
            console.log('Error occur');
            removePlayer();
        });

        socket.on('disconnect', () => {
            console.log('Player disconnected');
            removePlayer();
        });

        playersCollection.addEventListeners(socket, io);
        passengersCollection.addEventListeners(socket, io);
    });
};
