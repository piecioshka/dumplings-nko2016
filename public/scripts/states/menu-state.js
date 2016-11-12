let EVENTS = require('../constants/events');
let PLAYER = require('../constants/player');
let getCenterPositionX = require('../helpers/state-helper').getCenterPositionX;
let locale = require('../../locale/en.json');
let CBRadio = require('../models/cb');

class MenuState extends Phaser.State {
    getLeftPosition = getCenterPositionX.bind(this);
    $text = null;

    create() {
        this.cb = new CBRadio(this.game);
        this.add.image(this.getLeftPosition('logo'), 10, 'logo');

        this.setupTextInput();
        this.setupPlayButton();
    }

    setupTextInput() {
        let positionX = this.getLeftPosition('text-input');
        let positionY = 300;

        this.add.image(positionX, positionY, 'text-input');
        this.$text = this.add.text(positionX, positionY, '', {});

        this.input.keyboard.addCallbacks(this, null, null, (char, evt) => {
            if (evt.key === 'Enter') {
                this.play();
                return;
            }

            let text = this.$text.text + char;
            this.$text.setText(text);
        });
    }

    setupPlayButton() {
        this.add.button(this.getLeftPosition('button'), 350, 'button', this.play, this);
    }

    play() {
        let nick = this.$text.text;
        if (nick.length < PLAYER.NICK_LENGTH_LIMIT) {
            this.cb.say(locale.NICK_TO_SMALL, 'error');
            return;
        }
        this.game.trigger(EVENTS.START_GAME);
    }
}

module.exports = MenuState;
