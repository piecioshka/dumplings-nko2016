'use strict';

class Game extends Phaser.Game {
    constructor(...args) {
        super(...args);
    }
}

let game = new Game(1024, 600, Phaser.Canvas, 'game');
console.log(game);
