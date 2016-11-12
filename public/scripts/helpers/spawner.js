let CONSTANTS = require('../constants/game');

class Spawner {
    game = null;
    map = null;
    SpriteClass = null;
    pool = null;
    threshold = null;

    constructor(game, SpriteClass) {
        this.game = game;
        this.SpriteClass = SpriteClass;
        this.pool = new Set();
    }

    onDestroyHandler(event) {
        this.replenish();
    }

    setThreshold(n) {
        this.threshold = n;
    }

    setMap(map) {
        this.map = map;
    }

    spawn() {
        if (this.pool.size >= this.threshold) {
            return;
        }

        this.createBunch(this.threshold);
    }

    countSpritesToCreate() {
        return (this.threshold - this.pool.size);
    }

    createBunch(n) {
        for (let i = n; i > 0; i--) {
            let sprite = this.create();
            this.pool.add(sprite);
        }
    }

    getRandomPosition() {
        let rnd = this.game.rnd;
        let x = rnd.integerInRange(0, this.map.width) * CONSTANTS.TILE_WIDTH;
        let y = rnd.integerInRange(0, this.map.height) * CONSTANTS.TILE_HEIGHT;

        return { x, y };
    }

    create() {
        let sprite = new this.SpriteClass(this.game);
        let { x, y } = this.getRandomPosition();
        sprite.x = x;
        sprite.y = y;

        sprite.events.onDestroy.add((e) => this.onDestroyHandler(e));

        return sprite;
    }

    destroy(sprite) {
        this.pool.delete(sprite);
        sprite.destroy();
    }

    replenish() {
        let count = this.countSpritesToCreate();

        this.createBunch(count);
    }
}

module.exports = Spawner;
