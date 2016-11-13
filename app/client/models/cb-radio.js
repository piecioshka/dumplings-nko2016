let map = new Map();
map.set('info', '#ffffff');
map.set('warn', '#ffff00');
map.set('error', '#ff0000');

const GAME = require('../../constants/game');

class CBRadio extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, GAME.GAME_HEIGHT - 64, 'cb-radio');
        game.add.existing(this);

        this.speak('Hello there!');
    }

    speak(msg, type = 'info') {
        let positionX = 230;
        let positionY = GAME.GAME_HEIGHT - 50;
        this.game.add.text(positionX, positionY, msg, { fill: map.get(type) });
    }
}

module.exports = CBRadio;
