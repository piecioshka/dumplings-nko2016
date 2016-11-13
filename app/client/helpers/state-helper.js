'use strict';

function delay(state, callback, milliseconds) {
    let clock = state.time.create();
    clock.add(milliseconds, callback);
    clock.start();
}

function interval(state, callback, milliseconds) {
    let clock = state.time.create();
    clock.repeat(milliseconds, Infinity, callback, state);
    clock.start();
}

module.exports = {
    delay,
    interval
};
