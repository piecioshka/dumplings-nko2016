let EVENTS = require('../constants/events');
let getCenterPositionX = require('../helpers/state-helper').getCenterPositionX;

class MenuState extends Phaser.State {
    create() {
        let getLeftPosition = getCenterPositionX.bind(this);

        this.add.image(getLeftPosition('logo'), 10, 'logo');
        this.add.button(getLeftPosition('button'), 110, 'button', () => {
            this.game.trigger(EVENTS.START_GAME);
        });
    }
}

module.exports = MenuState;
