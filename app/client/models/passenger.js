let interval = require('../helpers/state-helper').interval;

const PASSENGER = require('../../constants/passenger');
const AVAILABLE_PASSENGERS = ['gruby', 'polaczek', 'typeska'];

function getRandomInteger(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

function getRandomPassengerTexture() {
    return AVAILABLE_PASSENGERS[getRandomInteger(0, 2)];
}

class Passenger extends Phaser.Sprite {
    satisfaction = 100; // procent
    entryPoints = null;
    isPickedUp = false;

    constructor(game) {
        super(game, 0, 0, getRandomPassengerTexture(), 1);
        game.add.existing(this);

        this.animations.add('stand', [0, 1, 2]);
        this.animations.play('stand', 8, true);
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
        this.kill();
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
