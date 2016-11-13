'use strict';

function getCenterPositionX(state, spriteName) {
    return state.world.centerX - (state.cache.getImage(spriteName).width / 2);
}

function delay(state, callback, milliseconds) {
    let clock = state.time.create();
    clock.add(milliseconds, callback);
    clock.start();
}

module.exports = {
    getCenterPositionX,
    delay
};
