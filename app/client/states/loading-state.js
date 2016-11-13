const STATE_EVENTS = require('../../constants/state-events');

let delay = require('../helpers/state-helper').delay;
let locale = require('../locale/en.json');

class LoadingState extends Phaser.State {
    constructor(...args) {
        super(...args);
    }

    preload() {
        this.setupPreloader();

        this.load.path = './assets/sprites/';

        this.load.image('river', 'river.png');
        this.load.image('taxi-clouds', 'taxi-clouds.png');
        this.load.image('taxi-huge-2-with-logo', 'taxi-huge-2-with-logo.png');
        this.load.image('cb-radio', 'cb-radio.png');
        this.load.image('cross', 'cross.png');
        this.load.image('flag', 'flag.png');
        this.load.spritesheet('street', 'street.png', 64, 64);
        this.load.spritesheet('button', 'button.png', 300, 84);

        this.load.path = './assets/sprites/taxi/';

        this.load.spritesheet('taxi-to-right', 'taxi-to-right.png', 128, 64);
        this.load.spritesheet('taxi-to-left', 'taxi-to-left.png', 128, 64);
        this.load.spritesheet('taxi-to-bottom', 'taxi-to-bottom.png', 84, 64);

        this.load.path = './assets/sprites/people/';

        this.load.spritesheet('gruby', 'gruby.png', 64, 120);
        this.load.spritesheet('polaczek', 'polaczek.png', 64, 120);
        this.load.spritesheet('typeska', 'typeska.png', 64, 120);

        this.load.path = './assets/sprites/city/';

        this.load.spritesheet('grass', 'grass.png', 64, 64);
        this.load.spritesheet('city-1', 'city-1.png', 64, 64);
        this.load.spritesheet('city-2', 'city-2.png', 64, 64);
        this.load.spritesheet('city-3', 'city-3.png', 64, 64);
        this.load.spritesheet('city-4', 'city-4.png', 64, 64);
        this.load.spritesheet('city-5', 'city-5.png', 64, 64);
        this.load.spritesheet('city-6', 'city-6.png', 64, 64);
        this.load.spritesheet('city-7', 'city-7.png', 64, 64);

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
        let $babeczka = this.add.tileSprite(positionX, positionY, 114, 276, 'babeczka', 1);

        $babeczka.scale.set(scale, scale);
        $babeczka.anchor.set(0, 1);

        $babeczka.animations.add('machanie', [0, 1, 2]);
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
