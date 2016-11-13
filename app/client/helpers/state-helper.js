'use strict';

function delay(state, callback, milliseconds) {
    let clock = state.time.create();
    clock.add(milliseconds, callback);
    clock.start();
}

module.exports = {
    delay
};
