let map = new Map();
map.set('info', '#ffffff');
map.set('warn', '#ffff00');
map.set('error', '#ff0000');

class CBRadio extends Phaser.Sprite {
    constructor(game) {
        super(game, 0, 0, 'cb-radio');
        game.add.existing(this);

        this.y = this._getPositionY();
    }

    _getPositionY() {
        let sprite = this.game.cache.getImage('cb-radio');
        return this.game.world.height - sprite.height;
    }

    speak(msg, type = 'info') {
        this.game.add.text(250, this.y + 20, msg, { fill: map.get(type) });
    }
}

module.exports = CBRadio;
