const GAME = require('../../constants/game');

class Spawner {
    game = null;
    SpriteClass = null;
    spriteGroup = null;

    constructor(game, SpriteClass) {
        this.game = game;
        this.SpriteClass = SpriteClass;
        this.spriteGroup = this.game.add.group();
        this.spriteGroup.enableBody = true;
    }

    spawn(endPointsJSON) {
        for (let i = 0; i < endPointsJSON.length; i++) {
            let coords = endPointsJSON[i];
            let sprite = this.create(coords);
            this.spriteGroup.add(sprite);
        }
    }

    getSpriteGroup() {
        return this.spriteGroup;
    }

    create(coordinates) {
        let sprite = new this.SpriteClass(this.game);
        let { initial, destination } = coordinates;

        sprite.immovable = true;
        sprite.entryPoints = coordinates;
        sprite.x = initial.x * GAME.TILE_WIDTH;
        sprite.y = initial.y * GAME.TILE_HEIGHT;

        return sprite;
    }

    destroy(sprite) {
        this.spriteGroup.remove(sprite, true);
        sprite.destroy();
    }
}

module.exports = Spawner;
