const EVENTS = require('./../constants/events');

function getRandomInteger(min, max) { 
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

class PassengersCollection {
    constructor() {
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
        if (this.passengers.size >= this.threshold) {
            return;
        }

        // INFO(ksyrytczyk): Coords must be more than threshold due to unique Set values.
        for (let i = this.countPassengersToCreate(); i > 0; i--) {
            let coords = this.getRandomCoordinates();
            this.passengers.add(coords);
        }

        return this.passengers;
    }

    countPassengersToCreate() {
        return (this.threshold - this.passengers.size);
    }
}

module.exports = PassengersCollection;
