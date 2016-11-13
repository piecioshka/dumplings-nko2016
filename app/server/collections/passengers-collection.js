const SOCKET = require('../../constants/socket');

function getRandomInteger(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

class PassengersCollection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.passengers = new Set();
        this.coordinates = null;
        this.threshold = 10;
    }

    setThreshold(threshold) {
        this.threshold = threshold;
    }

    setCoordinates(coordinates) {
        this.coordinates = new Set(coordinates);
    }

    getRandomCoordinates() {
        let max = (this.coordinates.size - 1);
        let index = getRandomInteger(0, max);

        return [...this.coordinates][index];
    }

    getDestinationPointByDistance(initialCoords, minDistance) {
        let coordsArr = [...this.coordinates];

        for (let i = 0; i < coordsArr.length; i++) {
            let proposalCoords = coordsArr[i];
            let diffX = (initialCoords.x - proposalCoords.x);
            let diffY = (initialCoords.y - proposalCoords.y);
            let distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));

            if (distance >= minDistance) {
                return coordsArr[i];
            }
        }

        return coordsArr[0];
    }

    getRandomEntryPoints() {
        let initial = this.getRandomCoordinates();
        let destination = this.getDestinationPointByDistance(initial, 30);

        return { initial, destination };
    }

    generate() {
        console.log('PassengersCollection#generate');

        if (this.passengers.size >= this.threshold) {
            return;
        }

        let count = this.countPassengersToCreate();

        for (let i = 0; i < count; i++) {
            this.passengers.add(entryPoints);
        }

        this.io.emit(SOCKET.SET_PASSENGERS, [...this.passengers]);
    }

    countPassengersToCreate() {
        return (this.threshold - this.passengers.size);
    }

    setupListeners() {
        this.socket.on(SOCKET.SETUP_PLAYER, (player) => {
            this.generate();
        });
    }
}

module.exports = PassengersCollection;
