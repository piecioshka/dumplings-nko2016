let CONSTANTS = require('../constants/game');

class Spawner {
    game = null;
    map = null;
    tilesGroup = {};
    SpriteClass = null;
    pool = null;
    threshold = null;

    constructor(game, SpriteClass) {
        this.game = game;
        this.SpriteClass = SpriteClass;
        this.pool = this.game.add.group();
    }

    onDestroyHandler(event) {
        this.renew();
    }

    setThreshold(n) {
        this.threshold = n;
    }

    setMap(map) {
        this.map = map;
        this.tilesGroup = this.getTilesGroupByIndex();
    }

    spawn() {
        if (this.pool.length >= this.threshold) {
            return;
        }

        this.createGroup(this.threshold);
    }

    countSpritesToCreate() {
        return (this.threshold - this.pool.length);
    }

    createGroup(n) {
        for (let i = n; i > 0; i--) {
            let sprite = this.create();
            this.pool.add(sprite);
        }
    }

    getSpriteGroup() {
        return this.spriteGroup;
    }

    getTilesGroupByIndex() {
        let restParams = [0, 0, (this.map.width - 1), (this.map.height - 1), 0];
        let getTilesetName = (m, i) => (m.tilesets[i] && m.tilesets[i].name);
        let group = {};

        this.map.forEach((tile) => {
            let tilesetIndex = (tile.index - 1);
            let name = getTilesetName(this.map, tilesetIndex);

            if (name) {
                group[name] = (group[name] || []);
                group[name].push(tile);
            }
        }, this, ...restParams);

        return group;
    }

    getRandomStreetTile() {
        let streetTiles = this.tilesGroup['street'];

        let rnd = this.game.rnd;
        let idx = rnd.integerInRange(0, streetTiles.length);

        return streetTiles[idx];
    }

    create() {
        let sprite = new this.SpriteClass(this.game);
        let randomStreetTile = this.getRandomStreetTile();
        let { x, y } = randomStreetTile;

        sprite.x = x * CONSTANTS.TILE_WIDTH;
        sprite.y = y * CONSTANTS.TILE_HEIGHT;

        sprite.events.onDestroy.add((e) => this.onDestroyHandler(e));

        return sprite;
    }

    destroy(sprite) {
        this.pool.remove(sprite, true);
        sprite.destroy();
    }

    renew() {
        let count = this.countSpritesToCreate();

        this.createGroup(count);
    }
}

module.exports = Spawner;
