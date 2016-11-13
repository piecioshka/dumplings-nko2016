let EVENTS = require('./../constants/events');

function getRandomInteger(min, max) { 
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

class PassengersCollection {
    constructor() {
        this.passengers = new Set();
        this.coords = null;
        this.threshold = 10;   
    }

    setThreshold(threshold) {
        this.threshold = threshold;
    }

    setCoords(coords) {
        this.coords = new Set(coords);
    }

    addEventListeners(socket, io) {
        socket.on(EVENTS.SET_PASSENGERS, (coords) => {
            console.log('setup passengers: message: ' + JSON.stringify(coords));
            this.setCoords(coords);
            this.setThreshold(200);
            this.generate();
            io.emit(EVENTS.SET_PASSENGERS, this.passengers);
        });
    }

    getRandomCoords() {
        let max = this.coords.size - 1;
        let index = getRandomInteger(0, max);

        return [...this.coords][index];
    }

    generate() {
        if (this.passengers.size >= this.threshold) {
            return;
        }

        // INFO(ksyrytczyk): Coords must be more than threshold due to unique Set values.
        for (let i = this.countPassangersToCreate(); i > 0; i--) {
            let coords = this.getRandomCoords();
            this.passengers.add(coords);
        }
    }

    countPassangersToCreate() {
        return (this.threshold - this.passengers.size);
    }
}

module.exports = PassengersCollection;
