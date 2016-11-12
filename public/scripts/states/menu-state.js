let uuid = require('uuid');

let EVENTS = require('../constants/events');
let PLAYER = require('../constants/player');
let getCenterPositionX = require('../helpers/state-helper').getCenterPositionX;
let displayVersion = require('../helpers/version-helper').displayVersion;
let locale = require('../../locale/en.json');
let CBRadio = require('../models/cb');

class MenuState extends Phaser.State {
    getLeftPosition = getCenterPositionX.bind(this);
    $nick = null;
    $playButton = null;

    create() {
        this.setupMainLogo();
        this.setupTextInput();
        this.setupPlayButton();

        this.cb = new CBRadio(this.game);
        displayVersion(this);
    }

    setupMainLogo() {
        this.add.image(this.getLeftPosition('logo'), 10, 'logo');
    }

    setupTextInput() {
        let positionX = this.getLeftPosition('text-input');
        let positionY = 260;

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
        this.$playButton = this.add.button(this.getLeftPosition('button'), 350, 'button', this.play, this);
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
