let uuid = require('uuid');

let EVENTS = require('../constants/events');
let PLAYER = require('../constants/player');
let delay = require('../helpers/state-helper').delay;
let displayVersion = require('../helpers/version-helper').displayVersion;
let locale = require('../../../public/locale/en.json');
let CBRadio = require('../models/cb');
let NickInput = require('../dom/nick-input');

class MenuState extends Phaser.State {
    $playButton = null;
    DOMNickInput = null;

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
        let randomNick = 'ninja-' + this.rnd.between(1, 10000);
        this.setPlayerNick(randomNick);

        this.DOMNickInput = new NickInput(randomNick);
        this.DOMNickInput.on(NickInput.EVENTS.VALUE, this.setPlayerNick, this);
        this.DOMNickInput.setupListener();
        this.DOMNickInput.focus();
    }

    setPlayerNick(value) {
        this.game.nick = value;
    }

    setupPlayButton() {
        let positionX = this.world.centerX;
        let positionY = 470;
        this.$playButton = this.add.button(positionX, positionY, 'button', this.play, this);
        this.$playButton.anchor.set(0.5, 0.5);
        this.$playButton.scale.set(1.5, 1.5);
    }

    play() {
        if (!this.DOMNickInput.isValid()) {
            let msg = `${locale.NICK_TO_SMALL} (${PLAYER.NICK_LENGTH_MIN_LIMIT } - ${PLAYER.NICK_LENGTH_MAX_LIMIT})`;
            this.cb.speak(msg, 'error');
            return;
        }

        this.DOMNickInput.destroy();
        this.game.trigger(EVENTS.START_GAME);
    }

    update() {
        let keyboard = this.input.keyboard;

        if (keyboard.isDown(Phaser.Keyboard.ENTER)) {
            this.$playButton.onInputUp.dispatch();
        }
    }
}

module.exports = MenuState;
