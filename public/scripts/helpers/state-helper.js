'use strict';

function getCenterPositionX(spriteName) {
    return this.world.centerX - (this.cache.getImage(spriteName).width / 2);
}

module.exports = {
    getCenterPositionX
};
