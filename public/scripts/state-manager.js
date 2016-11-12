let EVENTS = require('./constants/events');

class GameStateManager {
    game = null;

    constructor(game) {
        this.game = game;
        this.setupListeners();

        this.game.state.onStateChange.add((newState, oldState) => {
            console.debug('Enter to new state: %s', newState);
        });
    }

    setupListeners() {
        this.game.on(EVENTS.LOADING_COMPLETE, () => {
            this.game.state.start('CityState');
        });
    }

    start() {
        this.game.state.start('LoadingState');
    }
}

module.exports = GameStateManager;
