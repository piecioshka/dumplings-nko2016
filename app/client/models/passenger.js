let interval = require('../helpers/state-helper').interval;
let DestinationPoint = require('../models/destination-point');

const PASSENGER = require('../../constants/passenger');

class Passenger extends Phaser.Sprite {
    satisfaction = 100; // procent
    entryPoints = null;
    isPickedUp = false;

    constructor(game) {
        super(game, 0, 0, 'passenger', 1);
        game.add.existing(this);
    }

    decreaseSatisfactionBy(value) {
        if (this.satisfaction <= 0) {
            this.satisfaction = 0;
        }

        this.satisfaction -= value;

        console.log('Passenger#decreaseSatisfactionBy: %s%', this.satisfaction);
    }

    pickUp() {
        console.log('Passenger#pickUp');
        this.isPickedUp = true;
        this.startDecreasingSatisfaction();
        this.putDestinationPoint();
        this.kill();
    }

    putDestinationPoint() {
        let destination = new DestinationPoint(this.game, this);
        let { x, y } = this.entryPoints.destination;

        destination.put(x, y);
    }

    deliver() {
        console.log('Passenger#deliver');
        this.isPickedUp = false;
        this.destroy();
        let total = (this.satisfaction * PASSENGER.POINTS);
        debugger;
        return total;
    }

    startDecreasingSatisfaction() {
        console.log('Passenger#startDecreasingSatisfaction');

        if (!this.isPickedUp) {
            throw new Error('Passenger is not pick up');
        }

        interval(this.game.state.getCurrentState(), () => {
            this.decreaseSatisfactionBy(PASSENGER.SATISFACTION_RATIO);
        }, PASSENGER.SATISFACTION_DECREASING_INTERVAL);
    }
}

module.exports = Passenger;
