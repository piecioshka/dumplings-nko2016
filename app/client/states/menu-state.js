let uuid = require('uuid');

const STATE_EVENTS = require('../../constants/state-events');
const PLAYER = require('../../constants/player');

let delay = require('../helpers/state-helper').delay;
let displayGameVersion = require('../helpers/version-helper').displayGameVersion;
let getVersion = require('../helpers/version-helper').getVersion;
let locale = require('../locale/en.json');
let CBRadio = require('../models/cb-radio');
let NickInput = require('../dom/nick-input');

class MenuState extends Phaser.State {
    $playButton = null;
    DOMNickInput = null;

    create() {
        this.setupBackground();
        this.setupLogo();

        delay(this, () => {
            this.setupTextInput();
            this.setupPlayButton();
        }, 1000);

        this.cb = new CBRadio(this.game);
        this.cb.speak(CBRadio.buildMSG(locale.CB.GAME_VERSION, { version: getVersion() }));
        displayGameVersion(this);
    }

    setupBackground() {
        this.add.image(0, 0, 'taxi-clouds');
    }

    setupLogo() {
        const ANIMATION_DURATION = 500;

        let positionX = -3500;
        let positionY = -700;
        let $logo = this.add.image(positionX, positionY, 'taxi-huge-2-with-logo');

        let positionXTarget = -1230;
        let positionYTarget = -755;

        this.add.tween($logo).to({ x: positionXTarget, y: positionYTarget }, ANIMATION_DURATION).start();
    }

    setupTextInput() {
        let randomNick = 'ninja-' + this.rnd.between(1, 10000);
        this.setPlayerNick(randomNick);

        this.DOMNickInput = new NickInput(randomNick);
        this.DOMNickInput.on(NickInput.EVENTS.VALUE, this.setPlayerNick, this);
        this.DOMNickInput.on(NickInput.EVENTS.ENTER, this.play, this);
        this.DOMNickInput.setupListener();
        this.DOMNickInput.focus();
    }

    setPlayerNick(value) {
        this.game.nick = value;
    }

    setupPlayButton() {
        let positionX = this.world.centerX;
        let positionY = 370;
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
        this.game.trigger(STATE_EVENTS.START_GAME);
    }

    update() {
        // nothing here...
    }
}

module.exports = MenuState;
