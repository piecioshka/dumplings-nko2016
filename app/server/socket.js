'use strict';

let EVENTS = require('./constants/events');
let PlayersCollection = require('./collections/players-collection');
let PassengersCollection = require('./collections/passengers-collection');
let TilemapsCollection = require('./collections/tilemaps-collection');

module.exports = (server) => {
    let io = require('socket.io')(server);

    io.on('connection', (socket) => {
        console.log('a user connected');

        let tilemapCollection = new TilemapsCollection();
        let passengersCollection = new PassengersCollection();
        let playersCollection = new PlayersCollection();

        function removePlayer() {
            let me = playersCollection.getPlayer();
            playersCollection.removePlayer();
            io.emit(EVENTS.DISCONNECT_PLAYER, me);
        }

        function generatePassengers() {
            let coords = tilemapCollection.getStreetLayerCoords();

            passengersCollection.setCoordinates(coords);
            passengersCollection.setThreshold(200);

            return [...passengersCollection.generate()];
        }

        socket.on('error', () => {
            console.log('Error occur');
            removePlayer();
        });

        socket.on('disconnect', () => {
            console.log('Player disconnected');
            removePlayer();
        });

        io.emit(EVENTS.SET_PASSENGERS, generatePassengers());
    });
};
