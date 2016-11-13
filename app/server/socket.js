'use strict';

let PlayersCollection = require('./collections/players-collection');
let PassengersCollection = require('./collections/passengers-collection');
let TilemapsCollection = require('./collections/tilemaps-collection');

module.exports = (server) => {
    let io = require('socket.io')(server);
    console.log('[SYSTEM] Setup Socket.io');

    io.on('connection', (socket) => {
        console.log('[SYSTEM] User connected');

        let tilemapCollection = new TilemapsCollection();
        let coords = tilemapCollection.getStreetLayerCoords();

        let passengersCollection = new PassengersCollection(io, socket);
        passengersCollection.setCoordinates(coords);
        passengersCollection.setThreshold(200);
        passengersCollection.setupListeners();

        let playersCollection = new PlayersCollection(io, socket);
        playersCollection.setupListeners();
    });
};
