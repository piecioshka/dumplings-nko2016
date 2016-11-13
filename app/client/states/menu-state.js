let uuid = require('uuid');

let EVENTS = require('../constants/events');
let PLAYER = require('../constants/player');
let getCenterPositionX = require('../helpers/state-helper').getCenterPositionX;
let delay = require('../helpers/state-helper').delay;
let displayVersion = require('../helpers/version-helper').displayVersion;
let locale = require('../../../public/locale/en.json');
let CBRadio = require('../models/cb');

class MenuState extends Phaser.State {
    $nick = null;
    $playButton = null;

    create() {
        this.setupBackground();
        this.setupLogo();
        this.setupTextInput();
        this.setupPlayButton();

        this.cb = new CBRadio(this.game);
        displayVersion(this);
    }

    setupBackground() {
        this.add.image(0, 0, 'taxi-clouds');
    }

    setupLogo() {
        const ANIMATION_DURATION = 500;

        let positionX = -3500;
        let positionY = -700;
        let $logo = this.add.image(positionX, positionY, 'taxi-big-1-with-logo');

        let positionXTarget = -1350;
        let positionYTarget = -700;

        delay(this, () => {
            this.add.tween($logo).to({ x: positionXTarget, y: positionYTarget }, ANIMATION_DURATION).start();
        }, 500);
    }

    setupTextInput() {
        let positionX = getCenterPositionX(this, 'text-input');
        let positionY = 240;

        this.add.image(positionX, positionY, 'text-input');
        this.add.image(positionX - 70, positionY, 'gt');
        this.add.image(positionX + 270, positionY, 'cross');

        this.$nick = this.add.text(this.world.centerX, positionY + 10, '', {});
        this.$nick.anchor.setTo(0.5, 0);

        // TODO(piecioshka): remove before deploy
        this.game.nick = 'ninja-' + this.rnd.between(1, 10000);
        this.$nick.setText(this.game.nick);
    }

    setupPlayButton() {
        let positionX = this.world.centerX;
        let positionY = 470;
        this.$playButton = this.add.button(positionX, positionY, 'button', this.play, this);
        this.$playButton.anchor.set(0.5, 0.5);
        this.$playButton.scale.set(1.5, 1.5);
    }

    play() {
        let nick = this.$nick.text;
        if (nick.length < PLAYER.NICK_LENGTH_LIMIT) {
            this.cb.speak(locale.NICK_TO_SMALL, 'error');
            return;
        }
        this.game.trigger(EVENTS.START_GAME);
    }

    // TODO(piecioshka): do zrobienia
    handleEnterPlayButton(char, evt) {
        let text = this.$nick.text + char;
        this.$nick.setText(text);
    }

    update() {
        let keyboard = this.input.keyboard;

        if (keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.$playButton.onInputUp.dispatch();
        }
    }
}

module.exports = MenuState;
