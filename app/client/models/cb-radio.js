let map = new Map();
map.set('info', '#ffffff');
map.set('warn', '#ffff00');
map.set('error', '#ff0000');

const GAME = require('../../constants/game');
let _ = require('lodash');

class CBRadio extends Phaser.Sprite {
    $text = null;

    constructor(game) {
        let positionX = 0;
        let positionY = GAME.GAME_HEIGHT - 64;
        super(game, positionX, positionY, 'cb-radio');
        game.add.existing(this);

        let positionXText = 230;
        let positionYText = GAME.GAME_HEIGHT - 50;

        this.fixedToCamera = true;
        this.$text = this.game.add.text(positionXText, positionYText, '', {});
        this.$text.fixedToCamera = true;
    }

    speak(msg, type = 'info') {
        this.$text.setText(msg);
        this.$text.setStyle({ fill: map.get(type) });
    }

    static buildMSG(string, data) {
        return _.template(string)(data);
    }
}

module.exports = CBRadio;
