const SOCKET = require('../../constants/socket');

function getRandomInteger(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function shuffle(arr) {
    for (let i = arr.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
    }
}

class PassengersCollection {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.passengers = new Set();
        this.coordinates = null;
        this.threshold = 10;
        this.minimalDistance = 50;
    }

    setThreshold(threshold) {
        this.threshold = threshold;
    }

    setMinimalDistance(distance) {
        this.minimalDistance = distance;
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

        shuffle(coordsArr);

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
        let destination = this.getDestinationPointByDistance(initial, this.minimalDistance);

        return { initial, destination };
    }

    generate() {
        console.log('PassengersCollection#generate');

        if (this.passengers.size >= this.threshold) {
            return;
        }

        let count = this.countPassengersToCreate();

        for (let i = 0; i < count; i++) {
            let entryPoints = this.getRandomEntryPoints();
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
