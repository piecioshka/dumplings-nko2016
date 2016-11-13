const STATE_EVENTS = require('../../constants/state-events');

let delay = require('../helpers/state-helper').delay;
let locale = require('../../../public/locale/en.json');

class LoadingState extends Phaser.State {
    constructor(...args) {
        super(...args);
    }

    preload() {
        this.setupPreloader();

        this.load.path = './assets/sprites/';

        this.load.image('city', 'city.png');
        this.load.image('river', 'river.png');
        this.load.image('street', 'street.png');
        this.load.image('taxi', 'taxi.png');
        this.load.image('passenger', 'passenger.png');
        this.load.image('button', 'button.png');
        this.load.image('taxi-clouds', 'taxi-clouds.png');
        this.load.image('taxi-huge-2-with-logo', 'taxi-huge-2-with-logo.png');
        this.load.image('cb-radio', 'cb-radio.png');
        this.load.image('cross', 'cross.png');
        this.load.image('flag', 'flag.png');

        this.load.path = './assets/maps/';

        this.load.tilemap('city-warsaw', 'warsaw.json', null, Phaser.Tilemap.TILED_JSON);
    }

    setupPreloader() {
        let positionX = this.world.centerX;
        let positionY = 120;
        let progressBar = this.add.sprite(positionX, positionY, 'pixel-loading');
        progressBar.anchor.set(0.5, 0.5);
        progressBar.scale.set(1.7, 1.5);
        this.load.setPreloadSprite(progressBar);
    }

    create() {
        this.setupBackground();
        this.setupWavingFlag();
        this.setupLoadingTitle();
        // this.setupSkipButton();

        this.setupPassenger();
        this.setupFirstCar();
        this.setupSecondCar();

        setTimeout(() => {
            this.game.trigger(STATE_EVENTS.LOADING_COMPLETED);
        }, 5000);
    }

    setupLoadingTitle() {
        let style = { fill: '#ffffff' };
        let positionX = this.world.centerX;
        let positionY = this.world.height - 40;
        let $text = this.add.text(positionX, positionY, locale.PLEASE_WAIT, style);
        $text.anchor.setTo(0.5, 0);
    }

    setupBackground() {
        this.game.stage.backgroundColor = '#ffffff';

        let $background = this.add.image(0, 0, 'taxi-city-intro');
        $background.alpha = 0.9;
    }

    setupWavingFlag() {
        let count = 0;
        let length = 75 / 4;
        let points = [];
        let limit = 5;
        let positionX = 93;
        let positionY = 27;

        for (let i = 0; i < limit; i++) {
            points.push(new Phaser.Point(i * length, 0));
        }

        let $rope = this.add.rope(positionX, positionY, 'flag', null, points);

        // Nie wolno zmieniać na Arrow Function!!1
        $rope.updateAnimation = function () {
            count += 0.1;

            for (let i = 0; i < this.points.length; i++) {
                this.points[i].y = Math.sin(i * 0.5 + count) * 4;
            }
        };
    }

    setupFirstCar(scale = 0.6) {
        const ANIMATION_DURATION = 800;

        let positionX = -500;
        let positionY = this.game.height - 40;
        let $car = this.add.tileSprite(positionX, positionY, 553, 250, 'taxi-huge-1');

        $car.animations.add('fire', [0, 1]);
        $car.animations.play('fire', 8, true);

        $car.scale.set(scale, scale);
        $car.anchor.set(0, 1);

        let positionXInMiddle = 50;
        let positionXTarget = this.game.width;

        this.add.tween($car)
            .from({
                x: positionX
            })
            .to({
                x: positionXInMiddle
            }, ANIMATION_DURATION, Phaser.Easing.Circular.Out)
            .to({
                x: positionXTarget
            }, ANIMATION_DURATION, Phaser.Easing.Back.In, false, 2300)
            .start();
    }

    setupSecondCar(scale = 0.6) {
        const ANIMATION_DURATION = 500;

        let positionX = -500;
        let positionY = this.game.height - 40;
        let $car = this.add.tileSprite(positionX, positionY, 618, 250, 'taxi-huge-2-fire');

        $car.animations.add('fire', [0, 1]);
        $car.animations.play('fire', 8, true);

        $car.scale.set(scale, scale);
        $car.anchor.set(0, 1);

        let positionXInMiddle = 540;
        let positionXTarget = this.game.width;

        this.add.tween($car)
            .from({
                x: positionX
            })
            .to({
                x: positionXInMiddle
            }, ANIMATION_DURATION, Phaser.Easing.Circular.Out, false, 700)
            .to({
                x: positionXTarget
            }, ANIMATION_DURATION, Phaser.Easing.Back.In, false, 1000)
            .start();
    }

    setupPassenger(scale = 0.6) {
        const DESTROY_DELAY = 3000;
        const SCALE_DURATION = 500;
        let positionX = 685;
        let positionY = this.game.height - 60;
        let $babeczka = this.add.tileSprite(positionX, positionY, 127, 276, 'babeczka', 1);

        $babeczka.scale.set(scale, scale);
        $babeczka.anchor.set(0, 1);

        $babeczka.animations.add('machanie', [0, 1, 2, 3]);
        $babeczka.animations.play('machanie', 10, true);

        this.add.tween($babeczka.scale).to({ x: 0.9, y: 0.9 }).start();

        delay(this, () => {
            this.add.tween($babeczka.scale).to({ x: 0.1, y: 0.1 }, SCALE_DURATION).start();
        }, DESTROY_DELAY * 0.8);

        delay(this, () => {
            $babeczka.destroy();
        }, DESTROY_DELAY);
    }

    setupSkipButton() {
        let $skip = this.add.image(this.world.width - 35, 5, 'cross');
        $skip.scale.set(0.5, 0.5);
        // TODO(piecioshka): dorobić pomijanie intra
    }
}

module.exports = LoadingState;
