const GAME = require('../../constants/game');

class Spawner {
    game = null;
    tilesGroup = {};
    SpriteClass = null;
    spriteGroup = null;

    constructor(game, SpriteClass) {
        this.game = game;
        this.SpriteClass = SpriteClass;
        this.spriteGroup = this.game.add.group();
        this.spriteGroup.enableBody = true;
    }

    onDestroyHandler(event) {
        // Do something...
    }

    countSpritesToCreate() {
        return (this.threshold - this.spriteGroup.length);
    }

    spawn(coordinates) {
        for (let i = 0; i < coordinates.length; i++) {
            let coords = coordinates[i];
            let sprite = this.create(coords);
            this.spriteGroup.add(sprite);
        }
    }

    getSpriteGroup() {
        return this.spriteGroup;
    }

    create(coordinates) {
        let sprite = new this.SpriteClass(this.game);
  
        sprite.x = coordinates.x * GAME.TILE_WIDTH;
        sprite.y = coordinates.y * GAME.TILE_HEIGHT;
        sprite.events.onDestroy.add((e) => this.onDestroyHandler(e));

        return sprite;
    }

    destroy(sprite) {
        this.spriteGroup.remove(sprite, true);
        sprite.destroy();
    }
}

module.exports = Spawner;
