'use strict';

let PlayersCollection = require('./collections/players-collection');
let PassengersCollection = require('./collections/passengers-collection');
let TilemapHelper = require('./helpers/tilemap-helper');

module.exports = (server) => {
    let io = require('socket.io')(server);
    console.log('[SYSTEM] Setup Socket.io');

    io.on('connection', (socket) => {
        console.log('[SYSTEM] User connected');

        let tilemapHelper = new TilemapHelper();
        let coords = tilemapHelper.getStreetLayerCoords();

        let passengersCollection = new PassengersCollection(io, socket);
        passengersCollection.setCoordinates(coords);
        passengersCollection.setThreshold(200);
        passengersCollection.setMinimalDistance(30);
        passengersCollection.setupListeners();

        let playersCollection = new PlayersCollection(io, socket);
        playersCollection.setupListeners();
    });
};
