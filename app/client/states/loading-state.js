let EVENTS = require('../constants/events');
let getCenterPositionX = require('../helpers/state-helper').getCenterPositionX;
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
        this.load.image('taxi-big-1-with-logo', 'taxi-big-1-with-logo.png');
        this.load.image('text-input', 'text-input.png');
        this.load.image('cb-radio', 'cb-radio.png');
        this.load.image('cross', 'cross.png');
        this.load.image('gt', 'gt.png');
        this.load.image('flag', 'flag.png'); // 72x42

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

        this.setupPassenger();
        this.setupFirstCar();
        this.setupSecondCar();

        setTimeout(() => {
            this.game.trigger(EVENTS.LOADING_COMPLETED);
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
        var count = 0;
        var length = 75 / 4;
        var points = [];
        var limit = 5;

        for (var i = 0; i < limit; i++) {
            points.push(new Phaser.Point(i * length, 0));
        }

        let $rope = this.add.rope(92, 27, 'flag', null, points);

        $rope.updateAnimation = function () {
            count += 0.1;

            for (var i = 0; i < this.points.length; i++) {
                this.points[i].y = Math.sin(i * 0.5 + count) * 4;
            }
        };
    }

    setupFirstCar(scale = 0.6) {
        const ANIMATION_DURATION = 800;

        let positionX = -500;
        let positionY = this.game.height - 40;
        let $car = this.add.sprite(positionX, positionY, 'taxi-big-1');

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
        let $car = this.add.tileSprite(positionX, positionY, 705, 214, 'taxi-big-2-fire');

        $car.animations.add('fire', [0, 1]);
        $car.animations.play('fire', 15, true);

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
        let positionX = 670;
        let positionY = this.game.height - 60;
        let $babeczka = this.add.tileSprite(positionX, positionY, 127, 276, 'babeczka', 1);

        $babeczka.scale.set(scale, scale);
        $babeczka.anchor.set(0, 1);

        $babeczka.animations.add('machanie', [0, 1, 2, 3]);
        $babeczka.animations.play('machanie', 10, true);

        this.add.tween($babeczka.scale).to({ x: 0.9, y: 0.9 }).start();

        delay(this, () => {
            this.add.tween($babeczka.scale).to({ x: 0.1, y: 0.1 }).start();
        }, DESTROY_DELAY * 0.8);

        delay(this, () => {
            $babeczka.destroy();
        }, DESTROY_DELAY);
    }
}

module.exports = LoadingState;
