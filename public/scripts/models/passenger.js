const PASSENGER_CONSTANTS = {
    POINTS: 100,
    SATISFACTION_RATIO: 0.01
}

class Passenger extends Phaser.Sprite {
    satisfaction = 1; // range: [0, 1]
    isPickedUp = false;

    constructor(game) {
        super(game, 0, 0, 'passenger', 1);
        game.add.existing(this);
    }

    decreaseHappyBy(value) {
        if (this.satisfaction <= 0) {
            this.satisfaction = 0;
        }

        this.satisfaction -= value; 
    }

    pickUp() {
        this.isPickedUp = true;
    }

    deliver() {
        var total = (this.satisfaction * PASSENGER_CONSTANTS.POINTS);
        this.kill();

        return total;
    }

    update() {
        if (this.isPickedUp) {
            this.decreaseHappyBy(PASSENGER_CONSTANTS.SATISFACTION_RATIO);
        }
    }
}

module.exports = Passenger;
