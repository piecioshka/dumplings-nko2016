const SPAWNER_CONSTANTS = {
    POOL_SIZE: 10,
}

class Spawner {
    game = null;
    Sprite = null;
    pool = new Set();

    constructor(game, SpriteClass) {
        this.game = game;
        this.Sprite = SpriteClass;
    }

    onDestroyHandler(event) {
        this.replenish();
    }

    start() {
        this.createBunch(SPAWNER_CONSTANTS.POOL_SIZE);
    }

    countSpritesToCreate() {
        return (SPAWNER_CONSTANTS.POOL_SIZE - this.pool.size);
    }

    createBunch(n) {
        for (let i = n; i > 0; i--) {
            let sprite = this.create();
            this.pool.add(sprite);
        }
    }

    create() {
        let sprite = new this.Sprite(this.game);
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