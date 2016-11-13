class PassengersCollection {
    constructor() {
        this.passengers = [];
    }

    add(passenger) {
        this.passengers.push(passenger);
    }

    set(passengers) {
        this.passengers = passengers;
    }

    remove(passenger) {
        var index = this.passengers.indexOf(passenger);
        this.passenger.splice(index, 1);
    }

    update(passengerId, passenger) {
        let playerIndex = -1;
        this.passenger.forEach((passenger, index) => {
            if (passenger.id === passengerId) {
                passengerIndex = index;
            }
        });
        this.passenger[passengerIndex] = passenger;
    }
}

module.exports = PassengersCollection;
