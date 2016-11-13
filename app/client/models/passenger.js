let interval = require('../helpers/state-helper').interval;

const PASSENGER = require('../constants/passenger');

class Passenger extends Phaser.Sprite {
    satisfaction = 100; // procent
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
    }

    pickUp() {
        this.isPickedUp = true;
        this.startDecreasingSatisfaction();
        this.kill();
    }

    deliver() {
        this.isPickedUp = false;
        this.destroy();
        let total = (this.satisfaction * PASSENGER.POINTS);
        debugger;
        return total;
    }

    startDecreasingSatisfaction() {
        if (!this.isPickedUp) {
            throw new Error('passenger is not pick up');
        }

        interval(this.game.state.getCurrentState(), () => {
            this.decreaseSatisfactionBy(PASSENGER.SATISFACTION_RATIO);
        }, PASSENGER.SATISFACTION_DECREASING_INTERVAL);
    }
}

module.exports = Passenger;
