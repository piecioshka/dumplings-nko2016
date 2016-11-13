let EVENTS = require('./constants/events');

class GameStateManager {
    game = null;

    constructor(game) {
        this.game = game;
        this.setupListeners();

        this.game.state.onStateChange.add((newState, oldState) => {
            // console.debug('Enter to new state: %s', newState);
        });
    }

    setupListeners() {
        this.game.on(EVENTS.BOOTSTRAP_COMPLETED, () => {
            this.game.state.start('LoadingState');
        });

        this.game.on(EVENTS.LOADING_COMPLETED, () => {
            this.game.state.start('MenuState');
        });

        this.game.on(EVENTS.START_GAME, () => {
            this.game.state.start('CityState');
        });
    }

    start() {
        this.game.state.start('BootstrapState');
    }
}

module.exports = GameStateManager;
