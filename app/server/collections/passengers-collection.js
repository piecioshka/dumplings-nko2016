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

    generate() {
        console.log('PassengersCollection#generate');

        if (this.passengers.size >= this.threshold) {
            return;
        }

        let count = this.countPassengersToCreate();

        for (let i = 0; i < count; i++) {
            this.passengers.add(this.getRandomCoordinates());
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

        this.socket.on(SOCKET.DESTROY_PASSENGER, (passenger) => {
            console.log('[PassengersCollection] destroy-passenger: ' + JSON.stringify(passenger));
            // this.generate();
        });
    }
}

module.exports = PassengersCollection;
